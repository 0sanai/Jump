const nodeList = [];
let parentPage = null;

init();

figma.ui.onmessage = (msg) => {
  if (msg.type === "focus-node") {
    const node = msg.node;
    figma.currentPage = node.page;
    figma.viewport.scrollAndZoomIntoView([node.node]);
  } else if (msg.type === "update-query") {
    const queryArray = [...new Set(msg.query.split(/ |　/))].filter(Boolean);
    const newNodeList = [];
    for (let i in nodeList) {
      if (isMatchQuery(nodeList[i].name, queryArray)) {
        newNodeList.push(nodeList[i]);
      }
    }
    figma.ui.postMessage({ nodeList: newNodeList });
  }
};

function init() {
  traverse(figma.root);

  figma.showUI(__html__, { width: 520, height: 480 });
  figma.ui.postMessage({ nodeList: nodeList });
}

function traverse(node) {
  if (node.type.toLowerCase() == "page") {
    parentPage = node;
  } else if (node.type.toLowerCase() == "frame") {
    nodeList.push({
      node: node,
      type: node.type,
      name: node.name,
      page: parentPage,
      pageName: parentPage.name,
    });
  }

  if (node.children && node.type.toLowerCase() != "frame") {
    node.children.forEach(traverse);
  }
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
