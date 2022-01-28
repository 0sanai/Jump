import {useState, useEffect, useContext} from 'react';
import {NodeContext} from '../../ui';
import {
  NodeListWrapper,
  NodeListItem,
  PageName,
  PageNameActive,
  ActiveNodeListItem
} from './style';

type Props = {
  onClickNode: (number) => void;
};

const NodeList = ({onClickNode}: Props) => {
  const [isActive, setIsActive] = useState([]);
  const node = useContext(NodeContext);

  useEffect(() => {
    setIsActive(node.data.map(() => false));
  }, [node.data]);

  useEffect(() => {
    setIsActive(
      node.data.map((n, index) => (index === node.activeIndex ? true : false))
    );
  }, [node.activeIndex]);

  return (
    <ul css={NodeListWrapper}>
      {node.data.map((node, index) => (
        <li
          css={isActive[index] ? ActiveNodeListItem : NodeListItem}
          key={index}
          onClick={(e) => {
            onClickNode(index);
          }}
        >
          {node.name}
          <span css={isActive[index] ? PageNameActive : PageName}>
            {node.pageName}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default NodeList;
