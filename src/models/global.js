import { createStore } from '../utils/store';

// 定义reducer
const reducer = (state, { type, payload }) => {
  // you must return a new state value when a reducer is being used.
  switch (type) {
    case 'updateState':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default createStore('global', { user: {}, permissions: [] }, reducer);
