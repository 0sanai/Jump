import Jump from './Jump';

Jump.init();

figma.ui.onmessage = (msg) => {
  if (msg.type === 'focus-node') {
    Jump.focusNode(msg.node);
  } else if (msg.type === 'search-node') {
    Jump.searchNode(msg.query);
  }
};
