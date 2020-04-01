import { createStore } from '../utils/store';

// 定义reducer
const reducer = (state, action) => {
  // you must return a new state value when a reducer is being used.
  switch (action.type) {
    case 'updateState':
      return { ...state, ...action.payload };
    case 'add':
      return { count: state.count + 1 };
    case 'minus':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default createStore('demo', { count: 0 }, reducer);
