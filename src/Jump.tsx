const nodeList = [];
let parentPage = null;

const Jump = {
  init() {
    traverse(figma.root);
    figma.showUI(__html__, { width: 520, height: 480 });
    figma.ui.postMessage({ nodeList: nodeList });
  },

  focusNode(node) {
    figma.currentPage = node.page;
    figma.viewport.scrollAndZoomIntoView([node.node]);
  },

  updateQuery(query) {
    const queryArray = [...new Set(query.split(/ |　/))].filter(Boolean);
    const newNodeList = [];
    for (let i in nodeList) {
      if (isMatchQuery(nodeList[i].name, queryArray)) {
        newNodeList.push(nodeList[i]);
      }
    }
    figma.ui.postMessage({ nodeList: newNodeList });
  },
};

function traverse(node) {
  const nodeType = node.type.toLowerCase();
  if (nodeType == "document" || nodeType == "page") {
    if (nodeType == "page") {
      parentPage = node;
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  } else if (nodeType == "frame") {
    nodeList.push({
      node: node,
      type: node.type,
      name: node.name,
      page: parentPage,
      pageName: parentPage.name,
    });
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

export default Jump;
