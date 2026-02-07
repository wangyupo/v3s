<template>
  <!-- 示例-弹窗使用 -->
  <div>
    <el-button type="primary" @click="showDialog">基础弹窗</el-button>
    <el-button type="primary" @click="showDialogOperate">添加/编辑弹窗</el-button>

    <Dialog v-model="dialogVisible" title="基础弹窗" />
    <DialogOperate v-model="dialogOperateVisible" title="添加/编辑弹窗" />
  </div>
</template>

<script setup>
import Dialog from "./dialog.vue";
import DialogOperate from "./dialogOperate.vue";
import { ref } from "vue";

const dialogVisible = ref(false);
const dialogOperateVisible = ref(false);
const showDialog = () => {
  dialogVisible.value = true;
};
const showDialogOperate = () => {
  dialogOperateVisible.value = true;
};
</script>

<style lang="scss" scoped></style>
