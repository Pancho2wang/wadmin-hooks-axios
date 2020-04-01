import demo from './demo';
import sys from './system';

const http = { demo, sys };

export function fetch(key, body) {
  if (http[key]) return http[key](body);
  const keys = key.split('.');
  return http[keys[0]] && http[keys[0]][keys[1]] && http[keys[0]][keys[1]](body);
}
