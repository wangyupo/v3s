<template>
  <!-- 主题颜色选择器 -->
  <div class="flex items-center">
    <template v-for="(item, index) in predefineColors" :key="index">
      <el-tooltip effect="dark" :content="item.name" placement="top" :show-after="250">
        <div
          class="flex items-center justify-center mr-3 first:ml-3 w-[30px] h-[20px] rounded cursor-pointer"
          :style="{ backgroundColor: item.color }"
          @click="changeThemeColor(item.color)"
        >
          <el-icon color="#ffffff" v-show="colorPrimaryBg == item.color"><Select /></el-icon>
        </div>
      </el-tooltip>
    </template>

    <el-tooltip effect="dark" :content="`自定义主题色`" placement="top" :show-after="250">
      <div class="flex items-center h-full">
        <el-color-picker popper-class="mt-3" v-model="colorPrimaryBg" @change="changeThemeColor" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref } from "vue";
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
const predefineColors = ref([
  { color: "#515a6e", name: "阴影灰（默认）" },
  { color: "#385DE3", name: "科技蓝" },
  { color: "#925F69", name: "樱花红" },
]);

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
