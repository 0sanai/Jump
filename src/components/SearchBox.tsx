import * as React from 'react';

type Props = {
  nodeList: any[];
  nodeIndex: number;
  onChangeIndex: (value: number) => void;
};

const SearchBox = ({nodeList, nodeIndex, onChangeIndex}: Props) => {
  const onChangeQuery = (e) => {
    const query = e.target.value;
    parent.postMessage({pluginMessage: {type: 'search-node', query}}, '*');
  };

  const onKeyDown = (e) => {
    if (nodeList.length === 0) {
      return false;
    }

    if (e.key === 'ArrowDown' || (e.key === 'n' && e.ctrlKey)) {
      if (nodeIndex < nodeList.length - 1) {
        onChangeIndex(1);
      }
    } else if (e.key === 'ArrowUp' || (e.key === 'p' && e.ctrlKey)) {
      if (nodeIndex > 0) {
        onChangeIndex(-1);
      }
    }
  };

  return (
    <div className="SearchBox">
      <input
        className="SearchBoxInput"
        type="text"
        onChange={onChangeQuery}
        onKeyDown={onKeyDown}
        autoFocus
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
