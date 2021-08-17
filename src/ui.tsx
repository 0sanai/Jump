import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./ui.css";

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
    <div>
      <input
        className="SearchBox"
        type="text"
        name=""
        id=""
        onChange={onChangeQuery}
        autoFocus
      />
      <ul className="NodeList">
        {nodeList.map((node) => (
          <li key={node.node.id} onClick={() => onClickNode(node)}>
            <span className="FrameName">{node.name}</span>
            <span className="PageName">{node.pageName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("react-page"));
