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

// 资源树  -  资源列表转成树
export function dataChangeToTree(data) {
  let comment_list = {};
  data.forEach(obj => {
    comment_list[obj['menuId']] = obj;
  });
  const func = item => {
    for (let key in comment_list) {
      const temp = comment_list[key];
      const comment = { ...temp, key: `${key}`, title: temp.name };
      if (comment.parentId && comment.parentId === item.menuId) {
        if (!item['children']) {
          item['children'] = [];
        }
        item['children'].push(comment);
      }
    }
    if (item['children'] && item['children'].length > 0) {
      item['children'].map(nextItem => {
        return func(nextItem);
      });
    }
    return item;
  };
  let ret = [];
  for (let key in comment_list) {
    const temp = comment_list[key];
    const comment = { ...temp, key: `${key}`, title: temp.name };
    if (!comment.parentId) {
      ret.push(func(comment));
    }
  }
  return ret;
}
// 资源树  -  多选
export function getCheckAndHalfCheck(list, resources) {
  let checked = [];
  let halfChecked = [];
  let num = 0;
  list.forEach(obj => {
    if (resources.includes(obj.menuId)) {
      let children = obj.children || [];
      let res = {};
      if (children.length > 0) {
        res = getCheckAndHalfCheck(children, resources);
        if (res.num === children.length) {
          num += 1;
          checked.push(`${obj.menuId}`);
        } else {
          halfChecked.push(`${obj.menuId}`);
        }
      } else {
        num += 1;
        checked.push(`${obj.menuId}`);
      }
      checked = [...checked, ...(res.checked || [])];
      halfChecked = [...halfChecked, ...(res.halfChecked || [])];
    }
  });
  return { checked, halfChecked, num };
}
