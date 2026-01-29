/**
 * 示例数据
 * 用于快速搭建示例页面，使用 v3s-imdenums 命令快速引入
 */

// 树结构示例
export const treeDataExample = [
  {
    id: "1",
    label: "一级菜单 1",
    children: [
      {
        id: "1-1",
        label: "二级菜单 1-1",
        children: [{ id: "1-1-1", label: "三级菜单 1-1-1" }],
      },
    ],
  },
  {
    id: "2",
    label: "一级菜单 2",
    children: [
      {
        id: "2-1",
        label: "二级菜单 2-1",
        children: [{ id: "2-1-1", label: "三级菜单 2-1-1" }],
      },
      {
        id: "2-2",
        label: "二级菜单 2-2",
        children: [{ id: "2-2-1", label: "三级菜单 2-2-1" }],
      },
    ],
  },
  {
    id: "3",
    label: "一级菜单 3",
    children: [
      {
        id: "3-1",
        label: "二级菜单 3-1",
        children: [{ id: "3-1-1", label: "三级菜单 3-1-1" }],
      },
      {
        id: "3-2",
        label: "二级菜单 3-2",
        children: [{ id: "3-2-1", label: "三级菜单 3-2-1" }],
      },
    ],
  },
];

// 下拉选项示例
export const selectDataExample = [
  { label: "选项一", value: "1" },
  { label: "选项二", value: "2" },
  { label: "选项三", value: "3" },
  { label: "选项四", value: "4" },
  { label: "选项五", value: "5" },
];

// 级联选项示例
export const cascaderDataExample = [
  {
    value: "frontend",
    label: "前端开发",
    children: [
      { value: "vue", label: "Vue" },
      { value: "react", label: "React" },
      { value: "angular", label: "Angular" },
    ],
  },
  {
    value: "backend",
    label: "后端开发",
    children: [
      { value: "java", label: "Java" },
      { value: "python", label: "Python" },
      { value: "go", label: "Go" },
    ],
  },
];

// 表格数据示例
export const tableDataExample = [
  { id: 1, name: "张三", age: 28, address: "北京市朝阳区" },
  { id: 2, name: "李四", age: 32, address: "上海市浦东新区" },
  { id: 3, name: "王五", age: 25, address: "广州市天河区" },
  { id: 4, name: "赵六", age: 30, address: "深圳市南山区" },
  { id: 5, name: "钱七", age: 27, address: "杭州市西湖区" },
];
