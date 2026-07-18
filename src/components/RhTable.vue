<template>
  <!-- 表格 -->
  <el-table
    ref="elTableRef"
    class="rh-table"
    v-bind="$attrs"
    v-loading="loading"
    :class="[border ? '' : '_border']"
    :border="border"
    :data="_tableData.data"
  >
    <template v-for="(column, index) in _tableData.columns">
      <template v-if="column.type">
        <!-- 展开&收起 -->
        <el-table-column
          :key="`col_${index}`"
          fixed="left"
          type="expand"
          :width="column.width"
          v-if="column.type === 'expand'"
        >
          <template #default="scope">
            <slot name="expand" :scope="scope"></slot>
          </template>
        </el-table-column>
        <!-- 多选 -->
        <el-table-column
          :key="`col_${index}`"
          fixed="left"
          type="selection"
          reserve-selection
          width="50"
          :selectable="column.selectable"
          v-if="column.type === 'selection'"
        />
        <!-- 序号 -->
        <el-table-column
          :label="column.label"
          :key="`col_${index}`"
          fixed="left"
          type="index"
          width="60"
          align="center"
          v-if="column.type === 'index'"
        >
          <template #default="scope">
            <div class="flex items-center">
              <el-icon class="rh-table-dragcursor mr-2 hover:cursor-grab" v-if="_tableData.draggable">
                <Rank />
              </el-icon>
              {{ column.index ? column.index : indexMethod(scope.$index) }}
            </div>
          </template>
        </el-table-column>
      </template>

      <!-- 数据列 -->
      <el-table-column
        v-bind="column"
        :key="`col_${index}`"
        :show-overflow-tooltip="
          _tableData.showOverflowTooltip === undefined
            ? true
            : column.showOverflowTooltip === false || column.showOverflowTooltip === true
            ? column.showOverflowTooltip
            : _tableData.showOverflowTooltip
        "
        :align="column.align"
        v-else-if="column.hasOwnProperty('show') ? column.show : true"
      >
        <!-- 自定义表头 -->
        <template #header="scope">
          <slot name="RhTableHeader" :scope="scope" v-if="!column.diyHeader">
            {{ scope.column.label }}
          </slot>
          <slot :name="column.prop + 'Header'" :scope="scope" v-else></slot>
        </template>
        <!-- 自定义列 -->
        <template #default="scope">
          <div class="inline">
            <slot :name="column.prop" :scope="scope" :table-data="_tableData.data">
              <template v-if="column.prop != 'operate'">
                <!-- 自定义前缀 -->
                <span v-html="column.prefix" v-if="scope.row[column.prop] && column.prefix"></span>
                <!-- 识别并格式化手机号 -->
                <span v-if="column.phoneFormat && /^1[3-9][0-9]{9}$/.test(scope.row[column.prop])">
                  {{ epyReturn(formatPhone(getValueByPath(scope.row, column.prop))) }}
                </span>
                <!-- 数字格式化千分位符 -->
                <span v-if="column.numberFormat">
                  {{ epyReturn(numberFormat(getValueByPath(scope.row, column.prop))) }}
                </span>
                <!-- 枚举value映射label -->
                <span v-else-if="column.enum && column.enum.length">
                  <RhTag :options="column.enum" :value="getValueByPath(scope.row, column.prop)" v-if="column.tag" />
                  <template v-else>
                    {{ getLabel(column.enum, getValueByPath(scope.row, column.prop)) }}
                  </template>
                </span>
                <!-- 复制 -->
                <span class="flex items-center" v-else-if="column.copy">
                  {{ epyReturn(scope.row[column.prop]) }}
                  <el-icon
                    class="ml-2 cursor-pointer"
                    title="复制"
                    @click="handleCopy(scope.$index, scope.row, column)"
                    v-show="column.copyCB ? column.copyCB(scope.row) : true"
                  >
                    <CopyDocument />
                  </el-icon>
                </span>
                <!-- 空值默认返回 -- -->
                <component :is="getShowOverflowTooltip(column) ? 'span' : 'div'" v-else>
                  {{ epyReturn(getValueByPath(scope.row, column.prop)) }}
                </component>
                <!-- 自定义后缀 -->
                <span v-html="column.suffix" v-if="scope.row[column.prop] && column.suffix"></span>
              </template>
            </slot>
          </div>
        </template>
      </el-table-column>
    </template>

    <!-- 当数据为空时自定义的内容 -->
    <template #empty>
      <RhNoData v-if="!$slots.empty" />
      <slot name="empty"></slot>
    </template>
  </el-table>

  <!-- 分页器 -->
  <el-pagination
    class="mt-3 flex justify-end"
    :layout="_tableData.pages.layout || 'total, sizes, prev, pager, next, jumper'"
    :current-page="currentPage"
    :page-size="currentPageSize"
    :page-sizes="[10, 20, 50, 100]"
    :total="_tableData.pages.total"
    :hide-on-single-page="_tableData.pages.hideOnSinglePage"
    @size-change="handleSizeChange"
    @current-change="handlePageChange"
    v-if="_tableData.pages"
  />
</template>

<script setup>
import { formatPhone, copy, epyReturn, getValueByPath, getLabel, numberFormat } from "@/utils/index";
import { onMounted, onUpdated, reactive, ref, useAttrs, useTemplateRef, watch } from "vue";
import { debounce, cloneDeep } from "lodash-es";
import Sortable from "sortablejs";

const props = defineProps({
  border: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  tableData: {
    type: Object,
    default(rawProps) {
      return {
        columns: [],
        data: [],
        pages: { total: 0, pageNumber: 1, pageSize: 10, hideOnSinglePage: false },
      };
    },
  },
});
const elTableRef = useTemplateRef("elTableRef");
let _tableData = ref({});
// 分页器展示用本地状态：父组件常在接口返回后才更新 pageNumber，
// 若直接绑定 props，jumper 回车后会先闪回旧页码再跳到目标页
const currentPage = ref(1);
const currentPageSize = ref(10);

// 仅同步页码/每页条数，避免 tableData.data 等字段变化时重置分页展示
watch(
  () => [props.tableData?.pages?.pageNumber, props.tableData?.pages?.pageSize],
  ([pageNumber, pageSize]) => {
    if (pageNumber != null) currentPage.value = pageNumber;
    if (pageSize != null) currentPageSize.value = pageSize;
  },
  { immediate: true }
);

watch(
  () => props.tableData,
  val => {
    _tableData.value = cloneDeep(val);
  },
  { immediate: true, deep: true }
);

// 分页器事件
const emits = defineEmits(["page-change", "page-size-change", "drag-end"]);

// 分页事件 START
const handlePageChange = pageNumber => {
  // 用户操作时立即更新展示，不等待父组件接口返回
  currentPage.value = pageNumber;
  emits("page-change", pageNumber);
};
const handleSizeChange = pageSize => {
  currentPageSize.value = pageSize;
  emits("page-size-change", pageSize);
};
// 分页事件 END

// el-table事件 START
onMounted(() => {
  if (props.tableData.draggable) rowDrop();
});

//序号
const indexMethod = idx => {
  let pageNumber = 1;
  let pageSize = 10;
  if (_tableData.value.pages) {
    pageNumber = currentPage.value;
    pageSize = currentPageSize.value;
  }
  return (pageNumber - 1) * pageSize + idx + 1;
};

// 获取列的showOverflowTooltip的值
const getShowOverflowTooltip = column => {
  if (_tableData.value.showOverflowTooltip === undefined) {
    return true;
  }
  if (column.showOverflowTooltip === false || column.showOverflowTooltip === true) {
    return column.showOverflowTooltip;
  }
  return _tableData.value.showOverflowTooltip;
};

// 复制column内容
const handleCopy = debounce(
  (index, row, column) => {
    if (!column.copy) return;
    const { copyPrefix = "", copySuffix = "" } = column;
    copy(copyPrefix + row[column.prop] + copySuffix);
  },
  1000,
  {
    leading: true,
    trailing: false,
  }
);

// 行拖拽
const rowDrop = function () {
  // 要拖拽元素的父容器
  const tbody = elTableRef.value.$el.querySelector(".el-table__body-wrapper tbody");
  Sortable.create(tbody, {
    //  可被拖拽的子元素
    handle: ".rh-table .rh-table-dragcursor",
    onEnd({ newIndex, oldIndex }) {
      let data = cloneDeep(_tableData.value.data);
      const currRow = data.splice(oldIndex, 1)[0];
      data.splice(newIndex, 0, currRow);
      emits("drag-end", data);
    },
  });
};
// el-table事件 END

defineExpose({
  elTableRef,
});
</script>

<style lang="scss" scoped>
.rh-table {
  position: relative;
  &._border {
    border-top: 1px solid var(--el-table-border-color);
    &::before {
      content: "";
      position: absolute;
      top: -1px;
      right: 0;
      width: 1px;
      height: 100%;
      background-color: var(--el-table-border-color);
      z-index: 10;
    }
    &::after {
      content: "";
      position: absolute;
      top: -1px;
      left: 0;
      width: 1px;
      height: 100%;
      background-color: var(--el-table-border-color);
      z-index: 10;
    }
  }
}
</style>
