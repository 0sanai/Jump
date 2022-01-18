let nodeList = [];

const Jump = {
  init() {
    figma.showUI(__html__, {width: 400, height: 480});
    this.updateNodes();
  },

  updateNodes() {
    nodeList = figma.root.children
      .map((p) =>
        p.type === 'PAGE'
          ? p.children.map((n) =>
              n.type === 'FRAME' || n.type === 'COMPONENT'
                ? {
                    node: n,
                    type: n.type,
                    name: n.name,
                    page: p,
                    pageName: p.name
                  }
                : null
            )
          : null
      )
      .reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      })
      .filter(Boolean);
    figma.ui.postMessage({nodeList: nodeList});
  },

  focusNode(node) {
    figma.currentPage = node.page;
    figma.viewport.scrollAndZoomIntoView([node.node]);
  },

  searchNode(query) {
    const queryArray = [...new Set(query.split(/ |　/))].filter(Boolean);
    const newNodeList = [];
    for (let i in nodeList) {
      if (isMatchQuery(nodeList[i].name, queryArray)) {
        newNodeList.push(nodeList[i]);
      }
    }
    figma.ui.postMessage({nodeList: newNodeList});
  }
};

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

export default Jump;
