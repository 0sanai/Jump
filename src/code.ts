import Jump from './Jump';

figma.showUI(__html__, {width: 400, height: 480});

const nodeList = Jump.createNodeList();
figma.ui.postMessage({nodeList: nodeList});

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case 'focus-node':
      figma.currentPage = msg.node.page;
      figma.viewport.scrollAndZoomIntoView([msg.node.node]);
      break;
    case 'search-node':
      const newNodeList = Jump.searchNode(msg.query);
      figma.ui.postMessage({nodeList: newNodeList});
      break;
  }
};
