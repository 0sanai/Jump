import {css} from '@emotion/react';
import {space, color} from './variable';

export const Jump = css`
  &,
  & * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  font: 12px sans-serif;
  padding: ${space.large};
  color: ${color.dartText};
`;
