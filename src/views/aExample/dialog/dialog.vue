<template>
  <!-- 示例-弹窗 -->
  <el-dialog v-model="dialogVisible" v-bind="$attrs" width="30%" @opened="opened" @closed="closed">示例弹窗</el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

/** dialog START **/
const emits = defineEmits(["update:modelValue", "opened", "closed"]);
const dialogVisible = ref(false);

const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
    default: false,
  },
});

watch(
  () => props.modelValue,
  val => {
    dialogVisible.value = val;
  }
);

// 弹窗开启
const opened = () => {
  emits("opened");
};

// 弹窗关闭
const closed = () => {
  resetData();
  dialogVisible.value = false;
  emits("update:modelValue", false);
  emits("closed");
};

// 重置数据
const resetData = () => {};
/** dialog END **/
</script>

<style lang="scss" scoped></style>
