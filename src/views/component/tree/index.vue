<template>
  <div class="flex gap-3">
    <!-- 单选树 -->
    <RhWrapper title="单选模式" class="w-[280px]">
      <RhTree default-expand-all fixSearch :data="data" @node-click="handleNodeClick" />
    </RhWrapper>

    <!-- 多选树 -->
    <RhWrapper title="多选模式" class="w-[280px]">
      <RhTree default-expand-all show-checkbox :data="data" @check="handleCheck" />
    </RhWrapper>

    <!-- 自定义节点 -->
    <RhWrapper title="自定义节点" class="w-[280px]">
      <RhTree default-expand-all show-checkbox :data="data" @check="handleCheck">
        <template #default="{ node }">
          <span class="flex items-center">
            {{ node.label }}
            <el-icon class="ml-1 text-gray-400"><Link /></el-icon>
          </span>
        </template>
      </RhTree>
    </RhWrapper>
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
    label: "研发部",
    children: [
      { label: "前端组", children: [{ label: "张三" }, { label: "李四" }] },
      { label: "后端组", children: [{ label: "王五" }] },
    ],
  },
  {
    label: "产品部",
    children: [
      { label: "设计组", children: [{ label: "赵六" }] },
      { label: "运营组", children: [{ label: "钱七" }, { label: "孙八" }] },
    ],
  },
  {
    label: "市场部",
    children: [{ label: "销售组", children: [{ label: "周九" }] }],
  },
]);
</script>

<style lang="scss" scoped></style>
