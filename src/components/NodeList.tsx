import * as React from 'react';
import {useState, useEffect} from 'react';

type Props = {
  nodeData: any[];
  activeNodeIndex: number;
  onClickNode: (number) => void;
};

const NodeList = ({nodeData, activeNodeIndex, onClickNode}: Props) => {
  const [listClassNames, setListClassNames] = useState([]);

  useEffect(() => {
    setListClassNames(nodeData.map(() => ''));
  }, [nodeData]);

  useEffect(() => {
    setListClassNames(
      nodeData.map((node, index) => (index === activeNodeIndex ? 'active' : ''))
    );
  }, [activeNodeIndex]);

  return (
    <ul className="NodeList">
      {nodeData.map((node, index) => (
        <li
          className={`NodeListItem ` + listClassNames[index]}
          key={index}
          onClick={(e) => {
            onClickNode(index);
          }}
        >
          <span className="NodeListItem_frameName">{node.name}</span>
          <span className="NodeListItem_pageName">{node.pageName}</span>
        </li>
      ))}
    </ul>
  );
};

export default NodeList;
