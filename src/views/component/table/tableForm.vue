<template>
  <!-- 示例-带搜索的表格 -->
  <div>
    <RhSearch :searchInfo="searchInfo" @search="handleSearch" />
    <RhTable
      border
      stripe
      :table-data="tableData"
      :loading="loading"
      @pageChange="fn_getList"
      @pageSizeChange="pageSizeChange"
      @selection-change="handleSelectionChange"
    >
      <template #dateHeader="{ scope }">{{ scope.column.label }}Diy</template>
      <template #expand="{ scope }">
        {{ scope.row.address }}
      </template>
      <template #name="{ scope }">
        <el-link type="primary">{{ scope.row.name }}</el-link>
      </template>
    </RhTable>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { selectDataExample } from "@/enums/index.js";
import { initSearchData } from "@/utils/index.js";
import tableDataJson from "./data.json";

const loading = ref(false);
const searchData = ref({});
const searchInfo = ref([
  {
    type: "input",
    label: "姓名",
    placeholder: "请输入姓名",
    key: "name",
    defaultValue: "",
    colSpan: 8,
  },
  {
    type: "select",
    label: "地址",
    placeholder: "请选择地址",
    key: "address",
    defaultValue: "",
    options: selectDataExample,
    colSpan: 8,
  },
  {
    type: "date",
    label: "日期",
    placeholder: "请选择日期",
    key: "date",
    defaultValue: "",
    colSpan: 8,
  },
  {
    type: "daterange",
    label: "日期范围",
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期",
    key: "time",
    startKey: "beginTime",
    endKey: "endTime",
    defaultValue: [],
    colSpan: 8,
  },
]);
const selectable = (row, index) => {
  if (index === 1) return false;
  return true;
};
const multipleSelection = ref([]);
const tableData = reactive({
  showOverflowTooltip: true,
  columns: [
    { type: "expand" },
    { type: "selection", selectable },
    { label: "序号", type: "index" },
    { label: "日期", prop: "date", width: "150px", diyHeader: true, sortable: true },
    { label: "姓名", prop: "name" },
    { label: "地址", prop: "address", prefix: "<span class='font-bold'>送货地址：</span>", suffix: "(not too spicy)" },
  ],
  data: tableDataJson,
  pages: { total: tableDataJson.length, pageNumber: 1, pageSize: 10 },
});

onMounted(() => {
  // searchForm.value = initSearchData(searchInfo.value);
  // fn_getList();
});

// 搜索
const handleSearch = params => {
  console.log(params);
  // if (dialogVisible.value) return; // 显示弹窗时，禁止回车触发页面搜索
  // searchData.value = params;
  // fn_getList(1);
};

// 列表查询
const fn_getList = (pageNumber = 1) => {
  loading.value = true;
  const params = Object.assign({}, searchData.value, {
    pageNumber: pageNumber ? pageNumber : tableData.pages.pageNumber,
    pageSize: tableData.pages.pageSize,
  });
  api(params)
    .then(res => {
      // 这里必须判断返回参数后再赋值，否则 table 序号与数据刷新不同步
      if (res.code === 200) {
        tableData.data = res.rows;
        tableData.pages.total = res.total;
        tableData.pages.pageNumber = params.pageNumber;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

// 更变每页条数
const pageSizeChange = pageSize => {
  tableData.pages.pageSize = pageSize;
  fn_getList(1);
};

// 多选表格行
const handleSelectionChange = val => {
  multipleSelection.value = val;
};
</script>

<style lang="scss" scoped></style>
