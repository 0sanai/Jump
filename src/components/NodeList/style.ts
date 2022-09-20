import {css} from '@emotion/react';
import {space, color, borderRadius} from '../../styles/variable';

export const NodeListWrapper = css`
  list-style: none;
  text-align: left;
  cursor: pointer;
  margin-top: 66px;
`;

export const NodeListItem = css`
  border-radius: ${borderRadius.defalut};
  padding: ${space.small} ${space.medium};
  transition: background-color 0.2s ease, color 0.2s ease;
  word-break: break-all;

  &:hover {
    background-color: ${color.secondary};
  }
`;

export const ActiveNodeListItem = css`
  ${NodeListItem}
  background-color: ${color.primary};
  color: rgba(255, 255, 255, 1);
  &:hover {
    background-color: ${color.primary};
  }
`;

export const PageName = css`
  margin-left: ${space.medium};
  color: ${color.lightText};
`;

export const PageNameActive = css`
  ${PageName}
  color: rgba(255, 255, 255, 0.75);
`;
