<template>
  <!-- 示例-特定容器包裹的表格 -->
  <RhWrapper>
    <template #title-right>
      <el-input placeholder="请输入" :suffix-icon="Search"></el-input>
    </template>
    <RhTable border stripe :table-data="tableData">
      <template #name="{ scope }">
        <el-link type="primary">{{ scope.row.name }}</el-link>
      </template>
    </RhTable>
  </RhWrapper>
</template>

<script setup>
import { reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import tableDataJson from "./data.json";

const tableData = reactive({
  showOverflowTooltip: true,
  columns: [
    { label: "序号", type: "index" },
    { label: "日期", prop: "date", width: "150px", sortable: true },
    { label: "姓名", prop: "name" },
    { label: "地址", prop: "address" },
  ],
  data: tableDataJson,
  pages: { total: tableDataJson.length, pageNumber: 1, pageSize: 10 },
});
</script>

<style lang="scss" scoped></style>
