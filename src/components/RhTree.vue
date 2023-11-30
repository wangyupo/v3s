<template>
  <!-- 树形筛选器 -->
  <div>
    <div class="rh-tree-input mb-3">
      <el-input v-model="input" :placeholder="placeholder" clearable @input="filterTree" />
    </div>
    <div class="flex-1 overflow-y-auto">
      <el-tree ref="rhTreeRef" v-bind="$attrs" :filter-node-method="filterNode">
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data">{{ data.node.label }}</slot>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, useAttrs } from "vue";

const attrs = useAttrs();
const porps = defineProps({
  width: {
    type: String,
    default: "300px",
  },
  title: {
    type: String,
    default: "默认标题",
  },
  placeholder: {
    type: String,
    default: "请输入关键字进行过滤",
  },
});

const input = ref();
const rhTreeRef = ref();

const filterTree = inputVal => {
  rhTreeRef.value.filter(inputVal);
};

const filterNode = (value, data) => {
  if (!value) return true;
  return data[attrs.props.label].includes(value);
};

defineExpose({
  rhTreeRef,
});
</script>

<style lang="scss" scoped>
.rh-tree {
  height: 100%;
  &.border {
    padding: 12px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 3px;
  }
}
</style>
