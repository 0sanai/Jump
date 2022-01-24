import {useState, useEffect} from 'react';
import {
  NodeListWrapper,
  NodeListItem,
  PageName,
  PageNameActive,
  ActiveNodeListItem
} from './style';

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
      nodeData.map((node, index) => (index === activeNodeIndex ? true : false))
    );
  }, [activeNodeIndex]);

  return (
    <ul css={NodeListWrapper}>
      {nodeData.map((node, index) => (
        <li
          css={listClassNames[index] ? ActiveNodeListItem : NodeListItem}
          key={index}
          onClick={(e) => {
            onClickNode(index);
          }}
        >
          {node.name}
          <span css={listClassNames[index] ? PageNameActive : PageName}>
            {node.pageName}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default NodeList;
