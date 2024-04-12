/**
 * 选项、单选、多选的示例代码在这里维护，方便快速搭建示例页面时填充。
 * 注意：组件内使用 v3s-imdenums 命令，快速创建引入代码。
 */

// 树结构示例数据
export const treeData_example = [
  {
    id: "1",
    label: "Level one 1",
    children: [{ id: "1-1", label: "Level two 1-1", children: [{ id: "1-1-1", label: "Level three 1-1-1" }] }],
  },
  {
    id: "2",
    label: "Level one 2",
    children: [
      { id: "2-1", label: "Level two 2-1", children: [{ id: "2-1-1", label: "Level three 2-1-1" }] },
      { id: "2-2", label: "Level two 2-2", children: [{ id: "2-2-1", label: "Level three 2-2-1" }] },
    ],
  },
  {
    id: "3",
    label: "Level one 3",
    children: [
      { id: "3-1", label: "Level two 3-1", children: [{ id: "3-1-1", label: "Level three 3-1-1" }] },
      { id: "3-2", label: "Level two 3-2", children: [{ id: "3-2-1", label: "Level three 3-2-1" }] },
    ],
  },
];

// 下拉示例数据
export const selectData_example = [
  { value: "Option1", label: "Option1" },
  { value: "Option2", label: "Option2" },
  { value: "Option3", label: "Option3" },
  { value: "Option4", label: "Option4" },
  { value: "Option5", label: "Option5" },
];

// 级联示例数据
export const cascaderData_example = [
  {
    value: "guide",
    label: "Guide",
    children: [
      { value: "disciplines", label: "Disciplines" },
      { value: "navigation", label: "Navigation" },
    ],
  },
];
