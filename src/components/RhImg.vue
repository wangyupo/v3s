<template>
  <!-- 图片展示&预览组件 -->
  <div
    class="relative mr-3 mb-3 w-[100px] h-[100px]"
    v-for="(item, index) in srcList"
    :key="index"
    @mouseover="hoverin(index)"
    @mouseleave="hoverout"
  >
    <!-- 图片 -->
    <img :src="item" class="w-full h-full" />
    <!-- hover蒙层 -->
    <div
      class="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-50 text-white"
      v-show="imagePreviewMaskShow == index"
    >
      <el-icon class="cursor-pointer" @click="handleViewImage(index)"><Search /></el-icon>
      <el-icon class="ml-3 cursor-pointer" @click="handleDelete(index)"><Delete /></el-icon>
    </div>
  </div>
  <!-- 预览图片 -->
  <el-image-viewer
    :url-list="srcList"
    :initial-index="imgPreviewIndex"
    @close="handleImageViewerClose"
    v-if="imageViewerVisible"
  />
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  srcList: {
    type: Array,
    default: () => [],
  },
});

const imagePreviewMaskShow = ref(null); // 鼠标当前移入的图片的下标
const imageViewerVisible = ref(false); // 预览图片-是否显示
const imgPreviewIndex = ref(0); // 预览图片-图片下标
const emits = defineEmits(["delete"]);

// 鼠标移入
const hoverin = index => {
  imagePreviewMaskShow.value = index;
};

// 鼠标移出
const hoverout = () => {
  imagePreviewMaskShow.value = null;
};

// 查看图片
const handleViewImage = index => {
  imgPreviewIndex.value = index;
  imageViewerVisible.value = true;
};

// 关闭图片
const handleImageViewerClose = () => {
  imageViewerVisible.value = false;
};

// 删除图片
const handleDelete = index => {
  emits("delete", index);
};
</script>

<style lang="scss" scoped></style>
