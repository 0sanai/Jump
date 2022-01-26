let nodeList = [];

const Jump = {
  createNodeList() {
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
      .reduce((previousNodeList, currentNodeList) => {
        return previousNodeList.concat(currentNodeList);
      })
      .filter(Boolean);
    return nodeList;
  },

  searchNode(query) {
    const queryArray = [...new Set(query.split(/ |　/))].filter(Boolean);
    const newNodeList = nodeList
      .map((node) => (isMatchQuery(node.name, queryArray) ? node : null))
      .filter(Boolean);
    return newNodeList;
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
