import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';
import SearchBox from './components/SearchBox';
import './ui.scss';

const App = () => {
  const [nodeList, setNodeList] = useState([]);
  const [nodeIndex, setNodeIndex] = useState(-1);
  const [listClassNames, setListClassNames] = useState([]);

  useEffect(() => {
    window.addEventListener('message', onMessage);

    return function cleanup() {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  useEffect(() => {
    if (0 <= nodeIndex && nodeIndex < nodeList.length) {
      const node = nodeList[nodeIndex];
      parent.postMessage({pluginMessage: {type: 'focus-node', node}}, '*');
      setListClassNames(
        nodeList.map((node, index) => (index === nodeIndex ? 'active' : ''))
      );
    }
  }, [nodeIndex]);

  const onMessage = (e: any) => {
    const nodeListData = e.data.pluginMessage.nodeList;
    if (nodeListData) {
      setNodeList(nodeListData);
      setNodeIndex(-1);
      setListClassNames(nodeListData.map(() => ''));
    }
  };

  const onKeyDown = (e) => {
    if (nodeList.length === 0) {
      return false;
    }

    if (e.key === 'ArrowDown' || (e.key === 'n' && e.ctrlKey)) {
      if (nodeIndex < nodeList.length - 1) {
        setNodeIndex((prevIndex) => prevIndex + 1);
      }
    } else if (e.key === 'ArrowUp' || (e.key === 'p' && e.ctrlKey)) {
      if (nodeIndex > 0) {
        setNodeIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const onClickNode = (node, index) => {
    parent.postMessage({pluginMessage: {type: 'focus-node', node}}, '*');
    setNodeIndex(index);
  };

  return (
    <main className="Jump" onKeyDown={onKeyDown}>
      <SearchBox />
      <ul className="NodeList">
        {nodeList.map((node, index) => (
          <li
            className={`NodeListItem ` + listClassNames[index]}
            key={index}
            onClick={() => onClickNode(node, index)}
          >
            <span className="NodeListItem_frameName">{node.name}</span>
            <span className="NodeListItem_pageName">{node.pageName}</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('react-page'));
