<template>
  <div class="text-[14px] text-gray-600 leading-7">
    <p class="mb-3">这是主页面的二级页面，刷新页面或通过历史标签刷新，验证以下功能：</p>
    <ul class="list-disc pl-5 space-y-2">
      <li>左侧菜单、历史标签保持父级菜单激活状态</li>
      <li>左侧菜单不显示子页面（如编辑页、详情页等业务页面）</li>
      <li>刷新后浏览器地址栏保持当前路由及参数</li>
      <li>关闭 Tab 后跳转到最近访问的页面</li>
      <li v-if="detail">
        <span>跨页面传参：</span>
        <span class="text-red-500 font-medium">{{ detail }}</span>
        <p class="text-gray-400 mt-1">
          使用 toPage() 跳转并携带参数，子页面通过 getRouteParams() 获取，参数以页面 name 为 key 存储在 commonStore 中
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCommon } from "@/hooks/useCommon.js";

const { getRouteParams } = useCommon();
const detail = ref(null);

onMounted(() => {
  detail.value = getRouteParams();
});
</script>

<style lang="scss" scoped></style>
