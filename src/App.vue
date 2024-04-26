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
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
import { ref, computed, onMounted, watch } from "vue";
import { useLayout } from "@/hooks/useLayout.js";
import {
  setLocalStorage,
  removeLocalStorage,
  getLocalStorage,
  removeAllLoginInfo,
  compareVersions,
} from "@/utils/index.js";

// 遮罩
const isReloadMask = ref(true);
onMounted(() => {
  setTimeout(() => {
    isReloadMask.value = false;
  }, 1000);
});

const { isZh, isGray, toggleGray } = useLayout();

// 国际化
const locale = computed(() => (isZh.value ? zhCn : en));

// 全站置灰
watch(
  isGray,
  () => {
    toggleGray();
  },
  { immediate: true }
);

/* 检测版本号 START */
const version = getLocalStorage("version"); // 获取当前缓存版本号
const isVersionExpired = compareVersions(__APP_VERSION__, version) == 1 ? true : false; // 当前缓存版本号是否过期
// 当前缓存版本号过期时，则删除缓存，重新登录
if (!version || isVersionExpired) {
  removeAllLoginInfo();
  removeLocalStorage("layout");
  removeLocalStorage("version");
  setLocalStorage("version", __APP_VERSION__);
}
console.log(`%cv${getLocalStorage("version")}`, "color:#0f0;"); // 控制台打印当前版本号
/* 检测版本号 END */
</script>

<style lang="scss"></style>
