<template>
  <!-- 示例-弹窗使用 -->
  <div>
    <RhTitle title="基础示例" />
    <el-button type="primary" @click="showDialog">基础弹窗</el-button>
    <el-button type="primary" @click="showDialogOperate">添加/编辑弹窗</el-button>

    <Dialog v-model="dialogVisible" title="基础弹窗" />
    <DialogOperate v-model="dialogOperateVisible" title="添加/编辑弹窗" />

    <RhTitle title="弹窗传参" class="mt-6" />
    <!-- 示例-图片展示 -->
    <div class="flex gap-4">
      <!-- 左侧：图片操作区 -->
      <div class="flex-1">
        <el-button type="primary" class="mt-3" @click="showDialogImages">添加图片</el-button>
        <RhImg class="mt-3" :srcList="imageUrls" @delete="handleDelete" />
      </div>

      <!-- 右侧：数据预览 -->
      <RhPreviewJSON :data="imageUrls" title="已选图片" />

      <!-- 弹窗-选择图片 -->
      <DialogImages
        v-model="dialogImagesVisible"
        title="选择图片"
        width="1000px"
        :selectedSrcList="imageUrls"
        @confirm="handleConfirm"
      />
    </div>
  </div>
</template>

<script setup>
import Dialog from "./dialog.vue";
import DialogOperate from "./dialogOperate.vue";
import DialogImages from "./dialogImages.vue";
import { ref } from "vue";

const dialogVisible = ref(false);
const dialogOperateVisible = ref(false);
const dialogImagesVisible = ref(false);

const imageUrls = ref(["https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"]);

const showDialog = () => {
  dialogVisible.value = true;
};
const showDialogOperate = () => {
  dialogOperateVisible.value = true;
};
const showDialogImages = () => {
  dialogImagesVisible.value = true;
};

// 删除图片
const handleDelete = index => {
  imageUrls.value.splice(index, 1);
};

// 弹框确认
const handleConfirm = urls => {
  imageUrls.value = urls;
};
</script>

<style lang="scss" scoped></style>
