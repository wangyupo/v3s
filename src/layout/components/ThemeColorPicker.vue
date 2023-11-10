<template>
  <!-- 主题颜色选择器 -->
  <el-tooltip effect="dark" :content="`切换主题色`" placement="bottom" :show-after="250">
    <div class="px-3 flex items-center h-full">
      <el-color-picker
        popper-class="mt-3"
        v-model="colorPrimaryBg"
        :predefine="predefineColors"
        @change="changeThemeColor"
      />
    </div>
  </el-tooltip>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { TinyColor } from "@ctrl/tinycolor";
import { useLayout } from "@/hooks/useLayout.js";

const {
  layoutStore,
  colorPrimaryBg,
  colorPrimaryLight2,
  colorPrimaryLight9,
  colorPrimaryLight7,
  colorPrimaryLight4,
  colorPrimaryLight5,
  colorPrimaryDark2,
} = useLayout();
const predefineColors = ref(["#385DE3", "#6935AD", "#925F69", "#558748", "#7B1E10", "#695770", "#515a6e"]);

// 加载主题色
onMounted(() => {
  setElementUIThemeColor();
});

// 修改主题色
const changeThemeColor = color => {
  if (!color) {
    layoutStore.resetColors();
    setElementUIThemeColor();
    return;
  }
  const colorPrimaryLight2 = new TinyColor(color).tint(20).toHexString();
  const colorPrimaryLight4 = new TinyColor(color).tint(40).toHexString();
  const colorPrimaryLight5 = new TinyColor(color).tint(50).toHexString();
  const colorPrimaryLight7 = new TinyColor(color).tint(70).toHexString();
  const colorPrimaryLight9 = new TinyColor(color).tint(90).toHexString();
  const colorPrimaryDark2 = new TinyColor(color).mix("#141414", 20).toHexString();

  layoutStore.$patch(state => {
    state.colorPrimaryBg = color;
    state.colorPrimaryLight2 = colorPrimaryLight2;
    state.colorPrimaryLight9 = colorPrimaryLight9;
    state.colorPrimaryLight7 = colorPrimaryLight7;
    state.colorPrimaryLight5 = colorPrimaryLight5;
    state.colorPrimaryLight4 = colorPrimaryLight4;
    state.colorPrimaryDark2 = colorPrimaryDark2;
  });

  setElementUIThemeColor();
};

// 设置 css 变量
const setElementUIThemeColor = () => {
  const el = document.documentElement;

  el.style.setProperty("--el-color-primary", colorPrimaryBg.value); // el-button primary 背景色
  el.style.setProperty("--el-color-primary-light-3", colorPrimaryLight2.value); // el-button primary hover 背景色
  el.style.setProperty("--el-color-primary-light-4", colorPrimaryLight4.value); // el-button link primary hover色
  el.style.setProperty("--el-color-primary-light-5", colorPrimaryLight5.value); // el-button primary disabled 背景色
  el.style.setProperty("--el-color-primary-light-7", colorPrimaryLight7.value); // el-button default border 激活色
  el.style.setProperty("--el-color-primary-light-9", colorPrimaryLight9.value); // el-button default hover 背景色
  el.style.setProperty("--el-color-primary-dark-2", colorPrimaryDark2.value); // el-button primary acitve 背景色
};
</script>

<style lang="scss" scoped></style>
