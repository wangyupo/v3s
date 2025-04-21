<template>
  <!-- 报告上传 -->
  <div class="h-full overflow-hidden">
    <RhSearch ref="rhSearchRef" :searchInfo="searchInfo" @search="handleSearch" @toggle="toggle" />
    <div ref="formActionButtonsRef" class="flex justify-end mb-3">
      <el-button type="primary">新增</el-button>
    </div>
    <div :style="tableStyleObject">
      <RhTable
        height="100%"
        border
        stripe
        row-key="id"
        :loading="loading"
        :table-data="tableData"
        @pageChange="fn_getList"
        @pageSizeChange="pageSizeChange"
        @selection-change="handleSelectionChange"
      >
        <template #operate="{ scope }">
          <el-button type="primary" link>查看</el-button>
        </template>
      </RhTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, useTemplateRef, nextTick } from "vue";
import { initSearchData } from "@/utils/index.js";
import { useDynamicTableHeight } from "@/hooks/useDynamicTableHeight.js";
import { selectData_example } from "@/enums/index.js";

// 条件配置
const searchForm = ref({});
const searchInfo = ref([
  {
    type: "input",
    label: "名称",
    placeholder: "请输入名称",
    key: "name",
    defaultValue: "",
    colSpan: 8,
  },
  {
    type: "select",
    label: "状态",
    placeholder: "请选择状态",
    key: "type",
    defaultValue: "",
    options: selectData_example,
    colSpan: 8,
  },
  {
    type: "daterange",
    label: "日期",
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期",
    key: "time",
    startKey: "create_time_start",
    endKey: "create_time_end",
    defaultValue: [],
    colSpan: 8,
  },
  {
    type: "input",
    label: "名称",
    placeholder: "请输入名称",
    key: "name",
    defaultValue: "",
    colSpan: 8,
  },
  {
    type: "input",
    label: "名称",
    placeholder: "请输入名称",
    key: "name",
    defaultValue: "",
    colSpan: 8,
  },
  {
    type: "input",
    label: "名称",
    placeholder: "请输入名称",
    key: "name",
    defaultValue: "",
    colSpan: 8,
  },
  {
    type: "input",
    label: "名称",
    placeholder: "请输入名称",
    key: "name",
    defaultValue: "",
    colSpan: 8,
  },
  {
    type: "input",
    label: "名称",
    placeholder: "请输入名称",
    key: "name",
    defaultValue: "",
    colSpan: 8,
  },
  {
    type: "input",
    label: "名称",
    placeholder: "请输入名称",
    key: "name",
    defaultValue: "",
    colSpan: 8,
  },
]);
// 表格配置
const tableData = reactive({
  showOverflowTooltip: true,
  columns: [
    { type: "selection" },
    { label: "序号", type: "index" },
    { label: "名称", prop: "name" },
    { label: "类型", prop: "type", enum: selectData_example },
    { label: "日期", prop: "date" },
    { label: "操作", prop: "operate", fixed: "right", width: "200px" },
  ],
  data: [{ name: "测试名称", type: "Option3", date: "2025-03-18 22:56:19" }],
  pages: { total: 0, pageNumber: 1, pageSize: 20 },
});
const multipleSelection = ref([]);
const loading = ref(false); // 加载状态

// 组件挂载完成后执行
onMounted(() => {
  searchForm.value = initSearchData(searchInfo.value);
  // fn_getList();
});

// 条件查询
const handleSearch = params => {
  searchForm.value = params;
  // fn_getList(1);
};

// 列表查询
const fn_getList = pageNumber => {
  // loading.value = true;
  // const params = Object.assign(
  //   {
  //     pageNumber: pageNumber ? pageNumber : tableData.pages.pageNumber,
  //     pageSize: tableData.pages.pageSize,
  //   },
  //   searchForm.value
  // );
  // getList(params)
  //   .then(res => {
  //     if (res.code == 200) {
  //       tableData.data = res.data.list;
  //       tableData.pages.total = res.total;
  //       tableData.pages.pageNumber = params.pageNumber;
  //     }
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });
};

// 更变每页条数
const pageSizeChange = pageSize => {
  tableData.pages.pageSize = pageSize;
  fn_getList(1);
};

// 多选
const handleSelectionChange = val => {
  multipleSelection.value = val;
};

/** table 固定表头 START */
const rhSearchRef = useTemplateRef("rhSearchRef");
const formActionButtonsRef = useTemplateRef("formActionButtonsRef");
const componentDomRef = ref([{ ref: rhSearchRef, innerRef: "rhSearchRef" }]);
const domRefs = ref([formActionButtonsRef]);
const { tableStyleObject, toggle } = useDynamicTableHeight({ domRefs, componentDomRef });
/** table 固定表头 END */
</script>

<style lang="scss" scoped></style>
