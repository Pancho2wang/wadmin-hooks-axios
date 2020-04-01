import { get, post, put } from '../utils/request';

let demo = {};

demo.getDemo = () => {
  return get('https://5cea41c50c871100140bf437.mockapi.io/api/v1/todos/2');
};

demo.postDemo = body => {
  return post('https://5cea41c50c871100140bf437.mockapi.io/api/v1/todos/2', body);
};

demo.putDemo = body => {
  return put(`https://5cea41c50c871100140bf437.mockapi.io/api/v1/todos/${body?.id}`, body);
};

demo.getApiDemo = () => {
  return get('/api/demo');
};

export default demo;
