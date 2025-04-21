<template>
  <div>
    <div>
      <div>主页面的二级页面。你可以刷新页面，或者通过历史标签刷新，主要验证以下功能：</div>
      <div>1、左侧菜单、历史标签仍保持父级菜单的激活状态。</div>
      <div>
        2、左侧菜单不会出现子页面名称的菜单，例如：编辑页、内容页，这些页面涉及特定页面的特定业务，不应该在菜单中出现。
      </div>
      <div>3、刷新后，浏览器地址栏仍然保持当前子页面路由及url参数。</div>
      <div>4、关闭tab，页面关闭并跳转到最近一个页面。</div>
      <div v-if="detail">
        5、
        <span class="text-red-500">{{ detail }}</span>
        如果上级页面使用common的hook中的toPage方法跳转，并携带参数，在子页面就可以使用common的hook中的getRouteParams方法获取到该参数，
        这个参数是存储在commonStore中的，以子页面的name为key，不会随着页面的刷新消失（注：router每次跳转会清除该key下的store内容）。
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommon } from "@/hooks/useCommon.js";
import { onMounted, ref } from "vue";

const { getRouteParams } = useCommon();
const detail = ref({}); // 跨页面传参

onMounted(() => {
  detail.value = getRouteParams();
});
</script>

<style lang="scss" scoped></style>
