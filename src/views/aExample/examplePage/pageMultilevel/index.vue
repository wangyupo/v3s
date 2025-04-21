<template>
  <!-- 示例-多级页面 -->
  <div>
    <el-button @click="toChildPage">跳转子页面</el-button>
    <el-button @click="handleView({ name: '测试名称' })">跨页面传参</el-button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCommon } from "@/hooks/useCommon.js";

const { toPage } = useCommon();
const router = useRouter();

const toChildPage = () => {
  router.push({
    path: "/examplePage/pageMultilevel/child",
    query: {
      id: "1",
      type: "2",
    },
  });
};

// 传参
const handleView = row => {
  toPage("examplePageChild", row);
};
</script>

<style lang="scss" scoped></style>
