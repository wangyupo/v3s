<template>
  <!-- tab刷新中转页 -->
  <div
    v-loading="loading"
    :element-loading-text="contentAreaLoadingText"
    :element-loading-spinner="contentAreaLoadingSvg"
    class="absolute left-0 right-0 bottom-0 top-0"
  ></div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLayout } from "@/hooks/useLayout.js";

const { contentAreaLoadingText, contentAreaLoadingSvg } = useLayout();
const loading = ref(true);
const router = useRouter();
const route = useRoute();

/* 页面中转功能 START */
// 1、拆分 url 携带参数，并赋值 query ，拱 router 的 query 传参使用
let query = {};
const pathArr = route.query.refreshPath.split("?");
if (pathArr.length > 1) {
  const queryArr = pathArr[1].split("&");
  queryArr.forEach(i => {
    let iArr = i.split("=");
    query[iArr[0]] = iArr[1];
  });
}
// 2、等待一秒钟后重新跳转回原页面，并携带参数 query
setTimeout(() => {
  router.replace({
    path: route.query.refreshPath,
    query,
  });
}, 1000);
/* 页面中转功能 END */
</script>

<style lang="scss" scoped></style>
