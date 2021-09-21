import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./ui.scss";

const App = () => {
  const [nodeList, setNodeList] = useState([]);

  useEffect(() => {
    window.addEventListener("message", onMessage);

    return function cleanup() {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  const onMessage = (e: any) => {
    const nodeList = e.data.pluginMessage.nodeList;
    setNodeList(nodeList);
  };

  const onClickNode = (node) => {
    parent.postMessage({ pluginMessage: { type: "focus-node", node } }, "*");
  };

  const onChangeQuery = (e) => {
    const query = e.target.value;
    parent.postMessage({ pluginMessage: { type: "update-query", query } }, "*");
  };

  return (
    <main className="Jump">
      <div className="SearchBox">
        <input
          className="SearchBoxInput"
          type="text"
          name=""
          id=""
          onChange={onChangeQuery}
          autoFocus
        />
      </div>
      <ul className="NodeList">
        {nodeList.map((node) => (
          <li
            className="NodeListItem"
            key={node.node.id}
            onClick={() => onClickNode(node)}
          >
            <span className="NodeListItem_frameName">{node.name}</span>
            <span className="NodeListItem_pageName">{node.pageName}</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("react-page"));
