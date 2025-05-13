<template>
  <!-- 图片展示&预览组件 -->
  <div class="flex flex-wrap">
    <div
      class="relative mr-3 mb-3 w-[100px] h-[100px]"
      v-for="(item, index) in imageList"
      :key="index"
      @mouseover="hoverin(index)"
      @mouseleave="hoverout"
    >
      <!-- 图片 -->
      <img :src="item.url" class="w-full h-full" />
      <!-- 蒙层 -->
      <div
        class="absolute top-0 bottom-0 left-0 right-0 z-20 flex justify-center items-center bg-black bg-opacity-50 text-white"
        v-show="imagePreviewMaskShow == index"
      >
        <!-- 选择图片 -->
        <div
          class="absolute top-0 left-0 w-[20px] h-[20px] flex items-center justify-center border border-white cursor-pointer"
          @click="handleCheck(index)"
          v-if="layout.includes('check')"
        >
          <el-icon v-show="item.isChecked"><Check /></el-icon>
        </div>
        <!-- 查看图片 -->
        <el-icon class="cursor-pointer" @click="handleViewImage(index)"><Search /></el-icon>
        <!-- 删除图片 -->
        <el-icon class="ml-3 cursor-pointer" @click="handleDelete(index)" v-if="layout.includes('delete')">
          <Delete />
        </el-icon>
      </div>
      <!-- 选中图片后的文字 -->
      <div
        class="absolute top-0 left-0 right-0 z-10 flex justify-center items-center text-sm font-semibold bg-red-400 text-white"
        v-show="item.isChecked"
      >
        已选择
      </div>
    </div>

    <!-- 图片预览 -->
    <el-image-viewer
      :url-list="srcList"
      :initial-index="imgPreviewIndex"
      @close="handleImageViewerClose"
      v-if="imageViewerVisible"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { cloneDeep } from "lodash-es";

const props = defineProps({
  // 图片列表
  srcList: {
    type: Array,
    default: () => [], // eg. ['http://xxx/p.png']
  },
  // 默认选中的图片列表
  selectedSrcList: {
    type: Array,
    default: () => [], // eg. ['http://xxx/p.png']
  },
  // 组件布局，子组件名用逗号分隔
  layout: {
    type: Array,
    default: () => ["view", "delete"], // eg. ["view", "delete", "check"]
  },
});

const imageList = ref([]); // 组件实际使用的图片列表，对象数组，便于追加属性，eg. [{url: "http://xxx/p.png", isChecked: false}]
const imagePreviewMaskShow = ref(null); // 蒙层是否显示
const imageViewerVisible = ref(false); // 图片预览组件是否显示
const imgPreviewIndex = ref(0); // 当前预览图片的下标
const emits = defineEmits(["delete", "check"]);

watch(
  () => props.srcList,
  val => {
    if (!val || !val.length) {
      // 没有或清空图片列表时，重置内部数据
      imageList.value = [];
      imagePreviewMaskShow.value = null;
      imageViewerVisible.value = false;
      imgPreviewIndex.value = 0;
      return;
    }
    // 将 url 数组改为对象数组 ['http://xxx/p.png'] -> [{url: "http://xxx/p.png", isChecked: false}]
    imageList.value = cloneDeep(val).map(url => {
      const obj = { url, isChecked: false };
      return obj;
    });
    if (props.selectedSrcList.length) {
      // 将默认选中的图片的 isChecked 设为 true
      const imageMap = new Map(imageList.value.map(image => [image.url, image]));
      props.selectedSrcList.forEach(url => {
        const image = imageMap.get(url);
        if (image) {
          image.isChecked = true;
        }
      });
    }
  },
  { immediate: true, deep: true }
);

// 鼠标移入-显示功能蒙层
const hoverin = index => {
  imagePreviewMaskShow.value = index;
};

// 鼠标移出-隐藏功能蒙层
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

// 选择图片
const handleCheck = imgIndex => {
  imageList.value[imgIndex].isChecked = !imageList.value[imgIndex].isChecked;
  const selectedImages = imageList.value.filter(i => i.isChecked).map(i => i.url);
  emits("check", selectedImages);
};

// 全选图片
const selectAll = () => {
  imageList.value.map(i => {
    i.isChecked = true;
    return i;
  });
};

// 取消选中所有图片
const cancelSelect = () => {
  imageList.value.map(i => {
    i.isChecked = false;
    return i;
  });
};

// 获取已选中的图片
const getCheckedImages = () => {
  const arr = imageList.value.filter(i => i.isChecked).map(i => i.url);
  return arr;
};

// 重置勾选
const resetCheck = () => {
  imageList.value.map(i => (i.isChecked = false));
};

defineExpose({
  resetCheck,
  getCheckedImages,
  selectAll,
  cancelSelect,
});
</script>

<style lang="scss" scoped></style>
