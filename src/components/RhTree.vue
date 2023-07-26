<template>
  <!-- 树形筛选器 -->
  <div class="rh-tree border flex flex-col flex-shrink-0">
    <div class="rh-tree-title mb-3">{{ title }}</div>
    <div class="rh-tree-input mb-3">
      <el-input v-model="input" placeholder="请输入关键字进行过滤" clearable @input="filterTree" />
    </div>
    <div class="flex-1 overflow-y-auto">
      <el-tree ref="rhTreeRef" v-bind="$attrs" :props="defaultProps" :filter-node-method="filterNode" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const porps = defineProps({
  title: {
    type: String,
    default: "默认标题",
  },
});

const input = ref();
const rhTreeRef = ref();

const filterTree = inputVal => {
  rhTreeRef.value.filter(inputVal);
};

const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

const defaultProps = {
  children: "children",
  label: "label",
};
</script>

<style lang="scss" scoped>
.rh-tree {
  width: 280px;
  height: 100%;
  &.border {
    padding: 12px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 3px;
  }
}
</style>
