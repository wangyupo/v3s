<template>
  <div class="flex">
    <RhTree title="示例列表（单选）" default-expand-all :data="data" @node-click="handleNodeClick" />
    <RhTree class="ml-3" title="示例列表（多选）" default-expand-all show-checkbox :data="data" @check="handleCheck" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const handleNodeClick = params => {
  console.log("单选：", params);
};

const handleCheck = params => {
  console.log("多选：", params);
};

const data = ref([
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
]);
</script>

<style lang="scss" scoped></style>
