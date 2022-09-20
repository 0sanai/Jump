import {useState, useEffect, useContext, useRef} from 'react';
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
  const activeListItem = useRef(null);

  useEffect(() => {
    setIsActive(node.data.map(() => false));
  }, [node.data]);

  useEffect(() => {
    setIsActive(
      node.data.map((n, index) => (index === node.activeIndex ? true : false))
    );    
  }, [node.activeIndex]);

  useEffect(() => {
    if (activeListItem.current) {
      scrollController(activeListItem.current);
    }
  }, [isActive])

  return (
    <ul css={NodeListWrapper}>
      {node.data.map((node, index) => (
        
        <li
          css={isActive[index] ? ActiveNodeListItem : NodeListItem}
          key={index}
          onClick={(e) => {
            onClickNode(index);
          }}
          ref={isActive[index] ? activeListItem : null}
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

const scrollController = (activeListItem) => {
  const item = {
    top: activeListItem.offsetTop,
    bottom: activeListItem.offsetTop + activeListItem.clientHeight
  }
  const body = {
    top: document.body.scrollTop,
    bottom: document.body.scrollTop + document.body.clientHeight
  }
  
  const headerHeight = 66;
  const padding = 80;

  const topOverflow = item.top - body.top - headerHeight - padding;
  const bottomOverflow = item.bottom - body.bottom + padding;

  if (topOverflow < 0) {
    document.body.scrollTop += topOverflow;
  }
  if (bottomOverflow > 0) {
    document.body.scrollTop += bottomOverflow;
  }
}

export default NodeList;
