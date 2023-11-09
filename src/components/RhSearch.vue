<template>
  <!-- 搜索 -->
  <div class="rh-search-wrapper mb-3" :class="[noBorder ? 'noBorder' : '']">
    <div class="rh-search-content flex items-center flex-wrap">
      <el-row :gutter="12" class="w-full">
        <el-col :span="searchItem.colSpan" v-for="(searchItem, idx) in searchInfo" :key="idx">
          <!-- 输入框 -->
          <el-input
            class="rh-search-item"
            v-model="_searchData[searchItem.key]"
            clearable
            :placeholder="searchItem.placeholder"
            :formatter="searchItem.formatter ? searchItem.formatter : value => value.replace(/\s*/g, '')"
            v-if="searchItem.type === 'input'"
          />
          <!-- 单选 -->
          <el-select
            class="rh-search-item"
            v-model="_searchData[searchItem.key]"
            clearable
            :placeholder="searchItem.placeholder"
            :filterable="searchItem.filterable"
            @change="searchItem.change"
            v-if="searchItem.type === 'select'"
          >
            <el-option
              v-for="item in searchItem.options"
              :key="item[searchItem.props && searchItem.props.value ? searchItem.props.value : 'value']"
              :label="item[searchItem.props && searchItem.props.label ? searchItem.props.label : 'label']"
              :value="item[searchItem.props && searchItem.props.value ? searchItem.props.value : 'value']"
            />
          </el-select>
          <!-- 多选 -->
          <el-select
            class="rh-search-item"
            v-model="_searchData[searchItem.key]"
            multiple
            clearable
            :placeholder="searchItem.placeholder"
            :collapse-tags="searchItem.collapseTags"
            :collapse-tags-tooltip="searchItem.collapseTagsTooltip"
            :filterable="searchItem.filterable"
            v-if="searchItem.type === 'selectMultiple'"
          >
            <el-option v-for="item in searchItem.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <!-- 级联选择 -->
          <el-cascader
            class="w-full"
            v-model="_searchData[searchItem.key]"
            :options="searchItem.options"
            :props="searchItem.props"
            :placeholder="searchItem.placeholder"
            clearable
            v-if="searchItem.type === 'cascader'"
          />
          <!-- 日期单选 -->
          <el-date-picker
            v-model="_searchData[searchItem.key]"
            type="date"
            clearable
            :placeholder="searchItem.placeholder"
            value-format="YYYY-MM-DD"
            v-if="searchItem.type === 'date'"
          />
          <!-- 日期范围 -->
          <el-date-picker
            v-model="_searchData[searchItem.key]"
            type="daterange"
            value-format="YYYY-MM-DD"
            unlink-panels
            clearable
            :range-separator="searchItem.rangeSeparator ? searchItem.rangeSeparator : '至'"
            :start-placeholder="searchItem.startPlaceholder ? searchItem.startPlaceholder : '开始日期'"
            :end-placeholder="searchItem.endPlaceholder ? searchItem.endPlaceholder : '结束日期'"
            :shortcuts="searchItem.shortcuts ? shortcuts : []"
            style="width: 100%"
            v-if="searchItem.type === 'daterange'"
          />
        </el-col>
        <el-col class="mb-3" :span="4">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="flex items-center mb-3">
      <slot name="right-slot"></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { removeEmptyInObj, typeOf } from "@/utils/index";
import { on, off } from "@/utils/index";
import { cloneDeep, debounce } from "lodash-es";
import { useLayout } from "@/hooks/useLayout.js";

const { menuFilterDialogVisible } = useLayout();
const emit = defineEmits(["search"]);
const props = defineProps({
  // 搜索配置
  searchInfo: {
    type: Array,
    default: () => [],
  },
  // 搜索值组成的对象
  searchData: {
    type: Object,
    default: () => {},
  },
  // 不显示底部分割线
  noBorder: {
    type: Boolean,
    default: false,
  },
  // 不使用键盘事件
  noKeyBoard: {
    type: Boolean,
    default: false,
  },
});
// 日期范围快捷操作
const shortcuts = [
  {
    text: "过于一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "过去一月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "过去一年",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
      return [start, end];
    },
  },
];

const _searchData = reactive(props.searchData || {});
watch(
  _searchData,
  () => {
    canSearch.value = true;
  },
  { deep: true }
);

/* 回车触发搜索事件 START */
const canSearch = ref(false); // 开关-回车是否能触发搜索。只有搜索值改变时，才能触发。
onMounted(() => {
  if (!props.noKeyBoard) on(document, "keydown", keyboardTrigger); // 键盘监听事件-添加
});
onUnmounted(() => {
  if (!props.noKeyBoard) off(document, "keydown", keyboardTrigger); // 键盘监听事件-销毁
});
// 键盘响应事件
const keyboardTrigger = e => {
  if (menuFilterDialogVisible.value) return;
  const { ctrlKey, key } = e;
  if (key === "Enter") {
    handleEnterSearch(); // 回车触发搜索
  } else if (ctrlKey && key === "Backspace") {
    // Ctrl+Backspace触发重置
    handleReset({
      isEnterSearch: true,
    });
  }
};
// 回车搜索事件-搜索值有改变时才能触发
const handleEnterSearch = () => {
  if (!canSearch.value) return;
  handleSearch({
    isEnterSearch: true,
  });
};
/* 回车触发搜索事件 END */

// 搜索
const handleSearch = debounce(searchConfig => {
  let params = {};
  const keys = Object.keys(_searchData);
  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx];
    const emptyArr = typeOf(_searchData[key]) === "array" && !_searchData[key].length;
    const emptyStr = typeOf(_searchData[key]) === "string" && !_searchData[key];
    if (emptyArr || emptyStr) {
      // 过滤空值
      continue;
    } else {
      const searchCfg = props.searchInfo.find(i => i.key === key);
      // 组装日期范围。由“数组”组装成“startKey”、“endKey”两个值。
      if (searchCfg.type === "daterange" && searchCfg.startKey && searchCfg.endKey) {
        params[searchCfg.startKey] = _searchData[key][0];
        params[searchCfg.endKey] = _searchData[key][1];
      } else {
        params[key] = _searchData[key];
      }
    }
  }
  emit("search", params);
  if (searchConfig && searchConfig.isEnterSearch) canSearch.value = false;
}, 200);

// 重置
const handleReset = debounce(searchConfig => {
  const keys = Object.keys(_searchData);
  keys.forEach(key => {
    if (typeOf(_searchData[key]) === "array") {
      _searchData[key] = [];
    } else if (_searchData[key]) {
      _searchData[key] = "";
    }
  });
  handleSearch();
}, 200);
</script>

<style lang="scss" scoped>
.rh-search-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid var(--el-border-color-light);
  &.noBorder {
    border-bottom: none;
  }
}

.rh-search-content {
  flex: 1;
  :deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
    width: 100%;
  }
}

.rh-search-item {
  margin-bottom: 12px;
  width: 100%;
}
</style>
