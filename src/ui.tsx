import * as ReactDOM from 'react-dom';
import {useEffect} from 'react';
import {useNodeReducer, createNodeContext} from './hooks/useNode';
import SearchBox from './components/SearchBox';
import NodeList from './components/NodeList';
import {Jump} from './styles/ui';

export const NodeContext = createNodeContext();

const App = () => {
  const [node, dispatch] = useNodeReducer();

  useEffect(() => {
    const activeNode = node.data[node.activeIndex];
    if (activeNode) {
      parent.postMessage(
        {pluginMessage: {type: 'focus-node', node: activeNode}},
        '*'
      );
    }
  }, [node.activeIndex]);

  useEffect(() => {
    window.addEventListener('message', onMessage);
    window.addEventListener('keydown', onKeyDown);
    return function cleanup() {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const onMessage = (e: any) => {
    const nodeListData = e.data.pluginMessage.nodeList;
    if (nodeListData) {
      dispatch({type: 'SET', data: nodeListData});
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || (e.key === 'n' && e.ctrlKey)) {
      dispatch({type: 'NEXT'});
    } else if (e.key === 'ArrowUp' || (e.key === 'p' && e.ctrlKey)) {
      dispatch({type: 'PREV'});
    } else if (e.key === 'Escape') {
      parent.postMessage(
        {pluginMessage: {type: 'close'}},
        '*'
      );
    }

    // Figmaのショートカットキーを起動させない
    if ((e.key === 'n' && e.ctrlKey) || (e.key === 'p' && e.ctrlKey)) {
      e.preventDefault();
    }
  };

  return (
    <NodeContext.Provider value={node}>
      <main css={Jump}>
        <SearchBox />
        <NodeList
          onClickNode={(index) => {
            dispatch({type: 'SET', activeIndex: index});
          }}
        />
      </main>
    </NodeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('react-page'));
