import {useReducer, createContext} from 'react';

type State = {
  data: any[];
  activeIndex: number;
};

type Action = {
  type: 'NEXT' | 'PREV' | 'SET';
  data?: any[];
  activeIndex?: number;
};

const initialState: State = {data: [], activeIndex: -1};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'NEXT':
      if (state.activeIndex + 1 < state.data.length) {
        return {...state, activeIndex: state.activeIndex + 1};
      }
      return state;
    case 'PREV':
      if (state.activeIndex > 0) {
        return {...state, activeIndex: state.activeIndex - 1};
      }
      return state;
    case 'SET':
      if (action.data) {
        return {
          ...state,
          data: action.data,
          activeIndex: initialState.activeIndex
        };
      }
      if (action.activeIndex !== undefined) {
        return {...state, activeIndex: action.activeIndex};
      }
      return state;
  }
};

export const useNodeReducer = () => useReducer(reducer, initialState);
export const createNodeContext = () => createContext(initialState);
