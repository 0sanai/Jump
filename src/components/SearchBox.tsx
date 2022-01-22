import * as React from 'react';

const SearchBox = () => {
  const onChangeQuery = (e) => {
    const query = e.target.value;
    parent.postMessage({pluginMessage: {type: 'search-node', query}}, '*');
  };

  return (
    <div className="SearchBox">
      <input
        className="SearchBoxInput"
        type="text"
        onChange={onChangeQuery}
        autoFocus
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
