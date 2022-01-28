import * as ReactDOM from 'react-dom';
import {useEffect, useReducer} from 'react';
import SearchBox from './components/SearchBox';
import NodeList from './components/NodeList';
import {Jump} from './styles/ui';

type State = {
  data: any[];
  activeIndex: number;
};

type Action = {
  type: 'NEXT' | 'PREV' | 'SET';
  data?: any[];
  activeIndex?: number;
};

const initialState: State = {data: [], activeIndex: -1};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'NEXT':
      if (state.activeIndex + 1 < state.data.length) {
        return {...state, activeIndex: state.activeIndex + 1};
      }
      return state;
    case 'PREV':
      if (state.activeIndex > 0) {
        return {...state, activeIndex: state.activeIndex - 1};
      }
      return state;
    case 'SET':
      if (action.data) {
        return {
          ...state,
          data: action.data,
          activeIndex: initialState.activeIndex
        };
      }
      if (action.activeIndex !== undefined) {
        return {...state, activeIndex: action.activeIndex};
      }
      return state;
  }
};

const App = () => {
  const [node, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    window.addEventListener('message', onMessage);
    window.addEventListener('keydown', onKeyDown);
    return function cleanup() {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (node.activeIndex !== initialState.activeIndex) {
      const activeNode = node.data[node.activeIndex];
      parent.postMessage(
        {pluginMessage: {type: 'focus-node', node: activeNode}},
        '*'
      );
    }
  }, [node.activeIndex]);

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
    }

    // Figmaのショートカットキーを起動させない
    if ((e.key === 'n' && e.ctrlKey) || (e.key === 'p' && e.ctrlKey)) {
      e.preventDefault();
    }
  };

  return (
    <main css={Jump}>
      <SearchBox />
      <NodeList
        nodeData={node.data}
        activeNodeIndex={node.activeIndex}
        onClickNode={dispatch}
      />
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('react-page'));
