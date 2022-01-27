import * as ReactDOM from 'react-dom';
import {useState, useEffect, useReducer} from 'react';
import SearchBox from './components/SearchBox';
import NodeList from './components/NodeList';
import {Jump} from './styles/ui';

type State = {
  activeIndex: number;
};

type Action = {
  type?: 'NEXT' | 'PREV' | 'RESET';
  activeIndex?: number;
};

const initialState: State = {activeIndex: -1};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'NEXT':
      return {...state, activeIndex: state.activeIndex + 1};
    case 'PREV':
      return {...state, activeIndex: state.activeIndex - 1};
    case 'RESET':
      return initialState;
    default:
      return {...state, activeIndex: action.activeIndex};
  }
};

const App = () => {
  const [nodeData, setNodeData] = useState([]);
  const [node, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return function cleanup() {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  useEffect(() => {
    if (0 <= node.activeIndex && node.activeIndex < nodeData.length) {
      const activeNode = nodeData[node.activeIndex];
      parent.postMessage(
        {pluginMessage: {type: 'focus-node', node: activeNode}},
        '*'
      );
    }
  }, [node.activeIndex]);

  const onMessage = (e: any) => {
    const nodeListData = e.data.pluginMessage.nodeList;
    if (nodeListData) {
      setNodeData(nodeListData);
      dispatch({type: 'RESET'});
    }
  };

  const onKeyDown = (e) => {
    if (nodeData.length === 0) {
      return false;
    }

    if (e.key === 'ArrowDown' || (e.key === 'n' && e.ctrlKey)) {
      if (node.activeIndex < nodeData.length - 1) {
        dispatch({type: 'NEXT'});
      }
    } else if (e.key === 'ArrowUp' || (e.key === 'p' && e.ctrlKey)) {
      if (node.activeIndex > 0) {
        dispatch({type: 'PREV'});
      }
    }
  };

  return (
    <main css={Jump} onKeyDown={onKeyDown}>
      <SearchBox />
      <NodeList
        nodeData={nodeData}
        activeNodeIndex={node.activeIndex}
        onClickNode={dispatch}
      />
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('react-page'));
