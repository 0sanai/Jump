import {css} from '@emotion/react';
import {space, color, borderRadius} from '../../styles/variable';

export const SearchBoxWrapper = css`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: ${space.large};
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
`;

export const SearchBoxInput = css`
  width: 100%;
  border: 1px solid ${color.activeBorder};
  border-radius: ${borderRadius.defalut};
  outline: none;
  padding: ${space.small};

  &:hover {
    border: 1px solid ${color.activeBorder};
  }
`;
