/**
 * /router/menu.json 是一个接口返回的菜单组织示例，一般情况下，你可以要求后端按这个json格式返回。但是在一些项目中，可能会遇到字段
 * 与示例数据不一致的情况，这时候，只需要修改本文件中对应的 key 即可保证项目正常运行。比如：接口返回 PId，则对应 parentId: "pId"。
 */
export const menuKey = {
  id: "id", // id
  parentId: "parentId", // parentId
  url: "url", // 路由跳转
  title: "title", // 菜单名称
  icon: "icon", // 菜单icon
  hidden: "hidden", // 是否菜单
};
