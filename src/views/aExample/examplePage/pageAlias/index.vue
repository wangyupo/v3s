<template>
  <div>
    <div class="flex gap-3">
      <el-button type="primary" @click="handleAdd">添加</el-button>
      <el-button type="primary" @click="handleEdit">编辑</el-button>
    </div>
    <p class="mt-4 text-[14px] text-gray-500">
      适用场景：新增/编辑跳转同一页面，但需显示不同的面包屑名称
    </p>
  </div>
</template>

<script setup>
import { useRouter, onBeforeRouteLeave } from "vue-router";

const router = useRouter();

// 离开页面时设置下级页面别名
onBeforeRouteLeave((to, from) => {
  if (to.path === "/examplePage/pageAlias/operate") {
    to.meta.alias = to.query.id ? "编辑页面（编辑别名）" : "添加页面（添加别名）";
  }
});

const handleAdd = () => {
  router.push({ path: "/examplePage/pageAlias/operate" });
};

const handleEdit = () => {
  router.push({ path: "/examplePage/pageAlias/operate", query: { id: 1 } });
};
</script>

<style lang="scss" scoped></style>
