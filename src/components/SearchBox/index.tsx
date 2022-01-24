import {SearchBoxWrapper, SearchBoxInput} from './style';

const SearchBox = () => {
  const onChangeQuery = (e) => {
    const query = e.target.value;
    parent.postMessage({pluginMessage: {type: 'search-node', query}}, '*');
  };

  return (
    <div css={SearchBoxWrapper}>
      <input
        css={SearchBoxInput}
        type="text"
        onChange={onChangeQuery}
        autoFocus
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
