import { isArray } from "lodash-es";

/**
 * 数组转树结构
 * @param {Array} list 数组
 * @param {String} id 自定义id字段
 * @param {String} pId 自定义parentId字段
 * @returns {Array} 树结构数据
 */
export function arr2tree(list, id = "id", pId = "parentId") {
  const result = [];
  const map = list.reduce((pre, cur) => {
    pre[cur[id]] = cur;
    return pre;
  }, {});
  for (let item of list) {
    if (item[pId] == "0") {
      result.push(item);
      continue;
    }
    if (item[pId] in map) {
      const parent = map[item[pId]];
      parent.children = parent.children || [];
      if (!parent.children.some(i => i[id] === item[id])) parent.children.push(item);
    }
  }
  return result;
}

/**
 * 树结构转数组
 * @param {Array} list 树结构数据
 * @param {String} children 指定子树为节点对象的某个属性值
 * @returns {Array} 数组
 */
export function tree2arr(data, children = "children") {
  if (!data) return;
  if (!isArray(data)) {
    data = [data];
  }
  // 去除可能存在children字段，但是值为 null 或 undefined 的情况
  let _data = data.map(item => {
    if (item[children] === null || item[children] === undefined) {
      delete item[children];
    }
    return item;
  });
  return _data.reduce((pre, cur) => {
    let obj = {};
    for (let key in cur) {
      if (key !== children) {
        obj[key] = cur[key];
      }
    }
    return pre.concat([obj], tree2arr(cur[children] ? cur[children] : []));
  }, []);
}

/**
 * 树结构增加level层级
 * @param {Array} array 树结构
 * @param {String} levelName 层级字段
 * @param {String} childrenName 子节点字段
 * @param {Function} fn 自定义函数，默认返回单个节点的对象
 * @returns {Array} 增加level字段后的树结构
 */
export function treeAddLevel(array, levelName = "level", childrenName = "children", fn = () => {}) {
  if (!isArray(array)) {
    array = [array];
  }
  const recursive = (array, level = 0) => {
    level++;
    return array.map(v => {
      v[levelName] = level;
      fn(v);
      const child = v[childrenName];
      if (child && child.length) recursive(child, level);
      return v;
    });
  };
  return recursive(array);
}
