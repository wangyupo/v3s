<template>
  <!-- 页面别名 -->
  <div>
    <div>
      <el-button type="primary" @click="handleAdd">添加</el-button>
      <el-button type="primary" @click="handleEdit">编辑</el-button>
    </div>
    <p class="mt-3 font-bold">通常用在“新增”、“编辑”跳转同一个页面，但需要显示不同面包屑名称的情况。</p>
  </div>
</template>

<script setup>
import { useRouter, onBeforeRouteLeave } from "vue-router";

const router = useRouter();

onBeforeRouteLeave((to, from) => {
  // 必须判断下级页面，否则会导致跳转别的页面，别名赋值错误的问题
  if (to.path == "/examplePage/pageAlias/add") {
    to.meta.alias = to.query.id ? "编辑页面（这是编辑的别名）" : "添加页面（这是添加的别名）";
  }
});

// 添加页面
const handleAdd = () => {
  router.push({
    path: "/examplePage/pageAlias/add",
  });
};

// 编辑页面
const handleEdit = () => {
  router.push({
    path: "/examplePage/pageAlias/add",
    query: { id: 1 },
  });
};
</script>

<style lang="scss" scoped></style>
