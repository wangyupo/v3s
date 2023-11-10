<template>
  <!-- 个性化配置 -->
  <el-tooltip effect="dark" content="个性化" placement="bottom" :show-after="250">
    <div class="flex items-center px-3 h-full cursor-pointer hover:bg-[--el-color-primary-dark-2]" @click="openDrawer">
      <el-icon color="#fff" size="20"><Setting /></el-icon>
    </div>
  </el-tooltip>

  <el-drawer v-model="drawerVisible" title="个性化配置" direction="rtl" append-to-body :size="400">
    <div class="">
      <RhTitle title="切换布局"></RhTitle>
      <div class="flex">
        <el-radio-group v-model="layoutType" @change="changeLayoutStyle">
          <el-radio v-for="(item, index) in layouts" :key="index" class="layout-item" :label="item.layout">
            <div class="flex flex-col justify-center items-center ml-[30px] mb-3 first:ml-0">
              <i class="iconfont text-4xl" :class="item.icon"></i>
              <span class="mt-2">{{ item.name }}</span>
            </div>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="mt-6">
      <RhTitle title="切换主题色">
        <template #title-right></template>
      </RhTitle>
      <div class="flex items-center">
        当前主题色：
        <span :style="{ color: colorPrimaryBg }">{{ colorPrimaryBg }}</span>
        <ThemeColorPicker class="ml-4"></ThemeColorPicker>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useLayout } from "@/hooks/useLayout.js";
import ThemeColorPicker from "./ThemeColorPicker.vue";

const { layoutStore, layoutType, colorPrimaryBg } = useLayout();
const drawerVisible = ref(false);
const layouts = ref([
  { name: "经典布局", icon: "icon-a-bianzu2", layout: "LayoutClassic" },
  { name: "菜单标题一体布局", icon: "icon-a-bianzu3", layout: "LayoutSideMenu" },
  { name: "顶部菜单布局", icon: "icon-bianzu", layout: "LayoutHeadMenu" },
]);

// 展开抽屉
const openDrawer = () => {
  drawerVisible.value = true;
};

// 切换布局
const changeLayoutStyle = type => {
  console.log(123, type);
  return;
  layoutStore.changeLayoutType(type);
};
</script>

<style lang="scss" scoped>
.layout-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  :deep(.el-radio__input) {
    order: 2;
  }
  :deep(.el-radio__label) {
    order: 1;
    padding-left: 0;
  }
}
</style>
