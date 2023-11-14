<template>
  <!-- 示例-行编辑的表格 -->
  <RhWrapper>
    <template #head-right>
      <el-button type="primary" @click="handleAddRow()" v-if="!tableData.data.length">新增</el-button>
      <el-button type="primary" :disabled="!tableData.data.length">保存</el-button>
    </template>
    <RhTable border stripe :table-data="tableData">
      <template #date="{ scope }">
        <el-input v-model="scope.row.date" placeholder="Please input date" />
      </template>
      <template #name="{ scope }">
        <el-input v-model="scope.row.name" placeholder="Please input name" />
      </template>
      <template #address="{ scope }">
        <el-input v-model="scope.row.address" placeholder="Please input address" />
      </template>
      <template #operate="{ scope, tableData }">
        <div class="flex items-center">
          <el-icon size="20" class="cursor-pointer" title="添加行" @click="handleAddRow(tableData)">
            <Plus />
          </el-icon>
          <el-icon size="20" class="ml-3 cursor-pointer" title="删除行" @click="handleDelRow(tableData, scope.$index)">
            <Minus />
          </el-icon>
        </div>
      </template>
    </RhTable>
  </RhWrapper>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const tableData = reactive({
  showOverflowTooltip: true,
  columns: [
    {
      label: "序号",
      type: "index",
    },
    {
      label: "日期",
      prop: "date",
    },
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "地址",
      prop: "address",
    },
    {
      label: "操作",
      prop: "operate",
      width: "200px",
    },
  ],
  data: [
    {
      date: "2016-05-03",
      name: "Joe",
      address: "No. 189, Grove St, Los Angeles",
    },
  ],
  pages: {
    total: 100,
    pageNum: 1,
    pageSize: 10,
  },
});

// 动态添加行
const handleAddRow = data => {
  if (data) tableData.data = data;
  tableData.data.push({
    date: "",
    name: "",
    address: "",
  });
};

// 动态删除行
const handleDelRow = (data, idx) => {
  tableData.data = data;
  tableData.data.splice(idx, 1);
};
</script>

<style lang="scss" scoped></style>
