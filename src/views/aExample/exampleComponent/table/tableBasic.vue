<template>
  <!-- 示例-基本表格 -->
  <div class="flex items-center justify-end mb-3">
    <span class="mr-2 text-sm">超出省略</span>
    <el-switch v-model="tableData.showOverflowTooltip" />
  </div>
  <RhTable border stripe :table-data="tableData">
    <template #name="{ scope }">
      <el-link type="primary">{{ scope.row.name }}</el-link>
    </template>
  </RhTable>
</template>

<script setup>
import { reactive } from "vue";
import tableDataJson from "./data.json";

const tableData = reactive({
  showOverflowTooltip: true,
  columns: [
    { label: "序号", type: "index" },
    { label: "日期", prop: "date", width: "150px" },
    { label: "姓名", prop: "name" },
    { label: "地址", prop: "address" },
  ],
  data: tableDataJson,
  pages: { total: tableDataJson.length, pageNumber: 1, pageSize: 10 },
});
</script>

<style lang="scss" scoped></style>
