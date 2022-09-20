const nodeList = createNodeList();

figma.showUI(__html__, {width: 400, height: 480});
figma.ui.postMessage({nodeList: nodeList});

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case 'focus-node':
      figma.currentPage = msg.node.page;
      figma.viewport.scrollAndZoomIntoView([msg.node.node]);
      break;
    case 'search-node':
      const newNodeList = searchNode(msg.query);
      figma.ui.postMessage({nodeList: newNodeList});
      break;
    case 'close':
      figma.closePlugin();
      break;
    }
};

function createNodeList() {
  const nodeList = figma.root.children
    .map((page) =>
      page.type === 'PAGE'
        ? page.children.map((node) =>
            node.type === 'FRAME' || node.type === 'COMPONENT'
              ? {
                  node: node,
                  name: node.name,
                  page: page,
                  pageName: page.name
                }
              : null
          )
        : null
    )
    .reduce((previousNodeList, currentNodeList) => {
      return previousNodeList.concat(currentNodeList);
    })
    .filter(Boolean);
  return nodeList;
}

function searchNode(query) {
  const queryArray = [...new Set(query.split(/ |　/))].filter(Boolean);
  const newNodeList = nodeList
    .map((node) => (isMatchQuery(node.name, queryArray) ? node : null))
    .filter(Boolean);
  return newNodeList;
}

function isMatchQuery(name, queryArray) {
  for (let i = 0; i < queryArray.length; i++) {
    const lowerName = name.toLowerCase();
    const lowerQuery = queryArray[i].toLowerCase();
    if (lowerName.indexOf(lowerQuery) < 0) {
      return false;
    }
  }
  return true;
}
