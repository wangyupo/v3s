<template>
  <!-- 无数据占位组件 -->
  <div class="rh-noData flex items-center justify-center relative w-full h-full">
    <!-- 这是一个罩子，目的是不让用户选中文字、拖动图片，优化体验 -->
    <div class="absolute top-0 left-0 right-0 bottom-0 z-10"></div>
    <div class="rh-noData-main relative">
      <el-empty :description="description" v-if="!$slots.empty" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  description: {
    type: String,
    default: "暂无数据",
  },
});
</script>

<style lang="scss" scoped>
.rh-noData {
  &-main {
    min-width: 300px;
    height: 200px;
  }
  &-img {
    width: 100%;
    height: 100%;
  }
  &-txt {
    bottom: 16px;
    text-align: center;
    width: 100%;
    line-height: 20px;
    color: #909399;
  }
}
</style>
