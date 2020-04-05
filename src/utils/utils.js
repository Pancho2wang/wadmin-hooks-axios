/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16);
  });
}

/**
 * 对象值转换成字符串拼接
 * @param {*} obj
 */
export function getValue(obj) {
  return Object.keys(obj)
    .map(key => obj[key])
    .join(',');
}
