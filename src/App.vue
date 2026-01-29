<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>

  <!-- 页面刷新遮罩 -->
  <teleport to="#topSlot">
    <div v-if="isReloadMask" class="reload-mask">
      <div id="top-loader"></div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { useLayout } from "@/hooks/useLayout.js";
import { setLocalStorage, getLocalStorage, clearStorageAndCookies, compareVersions } from "@/utils/index.js";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

const MASK_DELAY = 1000; // 遮罩延迟隐藏时间（ms）
const { isZh, isGray, toggleGray } = useLayout();
const locale = computed(() => (isZh.value ? zhCn : en)); // 国际化
const isReloadMask = ref(true); // 页面刷新遮罩

// 全站置灰
watch(isGray, toggleGray, { immediate: true });

onMounted(() => {
  setTimeout(() => {
    isReloadMask.value = false;
  }, MASK_DELAY);
});

// 版本检测
checkVersion();

function checkVersion() {
  const cachedVersion = getLocalStorage("version");
  const isExpired = compareVersions(__APP_VERSION__, cachedVersion) === 1;

  if (!cachedVersion || isExpired) {
    ElMessage.info("检测到新版本，请重新登录！");
    clearStorageAndCookies();
    setLocalStorage("version", __APP_VERSION__);
  }

  // 控制台打印当前版本号
  console.log(`%c v${__APP_VERSION__} `, "background:#409eff;color:#fff;border-radius:3px;");
}
</script>

<style lang="scss" scoped>
.reload-mask {
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: var(--el-bg-color);
}
</style>
