<template>
  <!-- 示例-弹窗 -->
  <el-dialog v-model="dialogVisible" v-bind="$attrs" width="30%" @opened="opened" @closed="closed">
    <div class="text-center text-2xl font-bold">基础弹窗</div>
    <div class="text-center text-sm text-gray-500">这是一个基础弹窗，用于展示一些基础信息。</div>
    <div class="text-center text-sm text-gray-500">这是一个基础弹窗，用于展示一些基础信息。</div>
  </el-dialog>
</template>

<script setup>
/** dialog START **/
const emits = defineEmits(["opened", "closed"]);
const dialogVisible = defineModel();

// 弹窗开启
const opened = () => {
  emits("opened");
};

// 弹窗关闭
const closed = () => {
  resetData();
  emits("closed");
};

// 重置数据
const resetData = () => {};
/** dialog END **/
</script>

<style lang="scss" scoped></style>
