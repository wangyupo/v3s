<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>

  <!-- 刷新页面遮罩 -->
  <teleport to="#topSlot">
    <div class="fixed top-0 bottom-0 w-full h-full bg-white z-10" v-if="isReloadMask">
      <div id="top-loader"></div>
    </div>
  </teleport>
</template>

<script setup>
import NProgress from "@/utils/nProgress.js";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/stores/layout.js";
import { ref, computed, onMounted } from "vue";

// 遮罩
const isReloadMask = ref(true);
onMounted(() => {
  setTimeout(() => {
    isReloadMask.value = false;
  }, 1000);
});

// 国际化
const layoutStore = useLayoutStore();
const { isZh } = storeToRefs(layoutStore);
const locale = computed(() => (isZh.value ? zhCn : en));
</script>

<style lang="scss">
html,
body,
#app {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif;
}
</style>
