<template>
  <!-- 弹窗-添加图片 -->
  <el-dialog v-model="dialogVisible" v-bind="$attrs" @opened="opened" @closed="closed">
    <div class="min-h-[120px]" v-loading="loading" element-loading-text="图片加载中...">
      <RhImg :srcList="srcList" :selectedSrcList="selectedSrcList" layout="['view','check']" ref="rhImgRef" />
    </div>

    <template #footer>
      <el-button type="danger" link @click="handleCancelSelect">全不选</el-button>
      <el-button type="primary" link @click="handleSelectAll">全选</el-button>
      <el-divider direction="vertical" />
      <el-button type="primary" @click="handleConfirm">确认</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, useTemplateRef } from "vue";

const props = defineProps({
  selectedSrcList: {
    type: Array,
    default: () => [],
  },
});

const rhImgRef = useTemplateRef("rhImgRef");
const srcList = ref([]);
const loading = ref(false); // 加载状态

// 全选
const handleSelectAll = () => {
  rhImgRef.value.selectAll();
};

// 全不选
const handleCancelSelect = () => {
  rhImgRef.value.cancelSelect();
};

// 确认
const handleConfirm = () => {
  emits("confirm", rhImgRef.value.getCheckedImages());
  closed();
};

/** dialog START **/
const emits = defineEmits(["opened", "closed", "confirm"]);
const dialogVisible = defineModel();

// 弹窗开启
const opened = () => {
  emits("opened");
  /** 模仿API请求图片 START **/
  loading.value = true;
  setTimeout(() => {
    srcList.value = [
      "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
      "https://tb2.bdstatic.com/tb/img/search_logo_big_v2_d84d082.png",
      "https://webmap0.bdimg.com/wolfman/static/common/images/new/newlogo-new_3c175be.png",
      "https://fanyi-cdn.cdn.bcebos.com/static/cat/asset/logo.2481f256.png",
    ];
    loading.value = false;
  }, 1000);
  /** 模仿API请求图片 END **/
};

// 弹窗关闭
const closed = () => {
  resetData();
  emits("closed");
  dialogVisible.value = false;
};

// 重置数据
const resetData = () => {
  srcList.value = [];
};
/** dialog END **/
</script>

<style lang="scss" scoped></style>
