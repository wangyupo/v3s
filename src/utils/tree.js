/**
 * 数组转树结构
 * @param {Array} array 扁平数组
 * @param {Object} config 字段配置
 * @param {string} config.id id 字段名，默认 "id"
 * @param {string} config.parentId parentId 字段名，默认 "parentId"
 * @param {string} config.children children 字段名，默认 "children"
 * @returns {Array} 树结构数据
 */
export function arr2tree(array, config = {}) {
  const { id: idKey = "id", parentId: pidKey = "parentId", children: childKey = "children" } = config;

  // 使用 structuredClone 深拷贝，避免修改原数据（无需依赖 lodash）
  const list = structuredClone(array);
  const nodeMap = new Map();
  const tree = [];

  // 第一遍：建立索引
  list.forEach(item => nodeMap.set(item[idKey], item));

  // 第二遍：组装树
  list.forEach(item => {
    const parentId = item[pidKey];
    const parent = nodeMap.get(parentId);

    if (parent) {
      (parent[childKey] ??= []).push(item);
    } else {
      // parentId 为 "0"、0 或不在 nodeMap 中，视为根节点
      tree.push(item);
    }
  });

  return tree;
}

/**
 * 树结构转扁平数组
 * @param {Array} treeData 树结构数据
 * @param {Object} config 字段配置
 * @param {string} config.id id 字段名，默认 "id"
 * @param {string} config.parentId parentId 字段名，默认 "parentId"
 * @param {string} config.children children 字段名，默认 "children"
 * @returns {Array} 扁平数组（不含 children 字段）
 */
export function tree2arr(treeData, config = {}) {
  const { id: idKey = "id", parentId: pidKey = "parentId", children: childKey = "children" } = config;
  const result = [];

  const traverse = (node, parentId = "0") => {
    if (!node) return;
    const { [childKey]: children, ...rest } = node;
    result.push({ ...rest, [pidKey]: parentId });

    if (children?.length) {
      children.forEach(child => traverse(child, node[idKey]));
    }
  };

  treeData.forEach(root => traverse(root));
  return result;
}

/**
 * 为树结构的每个节点添加层级字段
 * @param {Array|Object} data 树结构数据（数组或单个节点）
 * @param {Object} options 配置项
 * @param {string} options.levelName 层级字段名，默认 "level"
 * @param {string} options.childrenName 子节点字段名，默认 "children"
 * @param {Function} options.callback 遍历每个节点时的回调函数
 * @returns {Array} 添加层级字段后的树结构
 */
export function treeAddLevel(data, { levelName = "level", childrenName = "children", callback } = {}) {
  const list = Array.isArray(data) ? data : [data];

  const traverse = (nodes, level = 1) =>
    nodes.map(node => {
      node[levelName] = level;
      callback?.(node);
      if (node[childrenName]?.length) {
        traverse(node[childrenName], level + 1);
      }
      return node;
    });

  return traverse(list);
}

/**
 * 增强树结构：添加 level（正向层级）、reverseLevel（反向层级）、path（路径）
 * @param {Object} options 配置项
 * @param {Array} options.tree 树结构数据
 * @param {string} options.idField id 字段名，默认 "id"
 * @param {string} options.parentIdField parentId 字段名，默认 "parentId"
 * @param {string} options.childrenField children 字段名，默认 "children"
 * @param {string} options.valueField 用作 id 值的字段名，默认 "value"
 * @returns {Array} 增强后的树结构
 */
export function transformTree({
  tree,
  idField = "id",
  parentIdField = "parentId",
  childrenField = "children",
  valueField = "value",
}) {
  let autoId = 1;

  // 构建节点：添加 id、parentId、level、path
  const buildNode = (node, parentId = null, level = 1, parentPath = []) => {
    const id = node[valueField] || autoId++;
    const path = [...parentPath, id];

    const newNode = {
      ...node,
      [idField]: id,
      [parentIdField]: parentId,
      level,
      path,
      [childrenField]: Array.isArray(node[childrenField]) && node[childrenField].length
        ? node[childrenField].map(child => buildNode(child, id, level + 1, path))
        : [],
    };

    return newNode;
  };

  // 计算反向层级：叶子节点为 1，逐层递增
  const calcReverseLevel = node => {
    if (!node[childrenField].length) {
      node.reverseLevel = 1;
    } else {
      node.reverseLevel = Math.max(...node[childrenField].map(calcReverseLevel)) + 1;
    }
    return node.reverseLevel;
  };

  const result = tree.map(root => buildNode(root));
  result.forEach(calcReverseLevel);
  return result;
}
