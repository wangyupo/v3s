<template>
  <!-- 搜索组件-支持传参配置搜索项、自动换行、插槽 -->
  <div ref="rhSearchRef" class="rh-search-wrapper mb-3" :class="[noBorder ? 'noBorder' : '']">
    <div
      class="rh-search-content flex items-center flex-wrap overflow-hidden"
      :class="[!toggle && searchInfo.length > toogleLength ? 'h-[88px]' : '']"
    >
      <el-form label-width="auto" class="w-full">
        <el-row :gutter="16" class="w-full">
          <el-col :span="searchItem.colSpan || 8" v-for="(searchItem, idx) in searchInfo" :key="idx">
            <el-form-item :label="searchItem.label">
              <!-- 输入框 -->
              <el-input
                v-if="searchItem.type === 'input'"
                class="rh-search-item"
                v-model="searchData[searchItem.key]"
                clearable
                :placeholder="searchItem.placeholder || `请输入${searchItem.label}`"
                :maxlength="searchItem.maxlength || 200"
                @blur="trimEmpty(searchItem)"
              />

              <!-- 单选 -->
              <el-select
                v-if="searchItem.type === 'select'"
                class="rh-search-item"
                v-model="searchData[searchItem.key]"
                clearable
                :placeholder="searchItem.placeholder || `请选择${searchItem.label}`"
                :filterable="searchItem.filterable"
                :options="searchItem.options"
                :props="searchItem.props"
                @change="searchItem.change"
              ></el-select>

              <!-- 多选 -->
              <el-select
                v-if="searchItem.type === 'selectMultiple'"
                class="rh-search-item"
                v-model="searchData[searchItem.key]"
                multiple
                clearable
                :placeholder="searchItem.placeholder || `请选择${searchItem.label}`"
                :collapse-tags="searchItem.collapseTags"
                :collapse-tags-tooltip="searchItem.collapseTagsTooltip"
                :filterable="searchItem.filterable"
                :options="searchItem.options"
                :props="searchItem.props"
              ></el-select>

              <!-- 远程搜索单选 -->
              <el-select
                v-if="searchItem.type === 'selectRemote'"
                class="rh-search-item"
                v-model="searchData[searchItem.key]"
                filterable
                remote
                reserve-keyword
                remote-show-suffix
                :placeholder="searchItem.placeholder || `请选择${searchItem.label}`"
                :remote-method="searchItem.remoteMethod"
                :loading="searchItem.loading || false"
                :clearable="searchItem.clearable ?? true"
                :options="searchItem.options"
                :props="searchItem.props"
              ></el-select>

              <!-- 级联选择 -->
              <el-cascader
                v-if="searchItem.type === 'cascader'"
                class="rh-search-item"
                v-model="searchData[searchItem.key]"
                :options="searchItem.options"
                :props="searchItem.props"
                :placeholder="searchItem.placeholder || `请选择${searchItem.label}`"
                clearable
              />

              <!-- 日期单选 -->
              <el-date-picker
                v-model="searchData[searchItem.key]"
                class="rh-search-item"
                :type="searchItem.type"
                :clearable="searchItem.clearable ?? true"
                :disabled-date="searchItem.disabledDate"
                :placeholder="searchItem.placeholder || `请选择${searchItem.label}`"
                :value-format="searchItem.valueFormat || 'YYYY-MM-DD'"
                :format="searchItem.format || 'YYYY-MM-DD'"
                v-if="['date', 'month'].includes(searchItem.type)"
              />

              <!-- 日期范围 -->
              <el-date-picker
                v-if="searchItem.type === 'daterange'"
                class="rh-search-item"
                v-model="searchData[searchItem.key]"
                type="daterange"
                value-format="YYYY-MM-DD"
                unlink-panels
                clearable
                :range-separator="searchItem.rangeSeparator || '至'"
                :start-placeholder="searchItem.startPlaceholder || '开始日期'"
                :end-placeholder="searchItem.endPlaceholder || '结束日期'"
                :shortcuts="searchItem.shortcuts || []"
                :disabled-date="getDisabledDate(searchItem)"
                @calendar-change="handleCalendarChange"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <!-- 行内搜索（搜索条件小于等于2个） -->
          <el-col class="mb-3" :span="8" v-if="searchInfo.length <= 2">
            <el-button icon="Search" type="primary" @click="handleSearch">搜索</el-button>
            <el-button icon="RefreshRight" @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 多行搜索（搜索条件大于3个） -->
    <div class="flex justify-center mb-3" :span="4" v-if="searchInfo.length > 2">
      <el-button type="primary" icon="Search" @click="handleSearch">查询</el-button>
      <el-button icon="RefreshRight" @click="handleReset">重置</el-button>
      <!-- 展开/收起（搜索条件大于6个） -->
      <el-button type="primary" link @click="handleToggle" v-if="searchInfo.length > toogleLength">
        <template v-if="!toggle">
          展开
          <el-icon><ArrowDown /></el-icon>
        </template>
        <template v-if="toggle">
          收起
          <el-icon><ArrowUp /></el-icon>
        </template>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from "vue";
import { typeOf, on, off } from "@/utils/index";
import { debounce, cloneDeep } from "lodash-es";
import { useLayout } from "@/hooks/useLayout.js";
import { shortcuts } from "@/enums/index.js";
import { dayjs } from "element-plus";

const rhSearchRef = ref();
const tempStartDate = ref(null);
const toogleLength = 6; // 搜索项超出显示“展开/收起”
const emits = defineEmits(["search", "toggle"]); // 对外暴露 search 事件
const props = defineProps({
  // 搜索配置
  searchInfo: { type: Array, default: () => [] },
  // 不显示底部分割线
  noBorder: { type: Boolean, default: false },
  // 不使用键盘事件
  noKeyBoard: { type: Boolean, default: false },
});
const searchData = ref({}); // 搜索绑定对象
const toggle = ref(false); // 展开/收起搜索栏目
const canSearch = ref(false); // 开关-回车是否能触发搜索。只有搜索值改变时，才能触发。

const searchInfoMap = computed(() => {
  const map = new Map();
  (props.searchInfo || []).forEach(item => map.set(item.key, item));
  return map;
});

/**
 * 初始化searchData
 * 源数据：[{ key: 'key1', defaultValue: 'defaultValue1' }, { key: 'key2', defaultValue: 'defaultValue2'}]
 * 目标数据：{ key1: defaultValue1, key2: defaultValue2 }
 */
const initSearchData = () => {
  const searchInfo = cloneDeep(props.searchInfo);
  searchData.value = searchInfo.reduce((accumulator, current) => {
    accumulator[current.key] = current.defaultValue;
    return accumulator;
  }, {});
};

// 只监听字段结构（key / defaultValue），避免动态请求更新 options 时重置已选值
watch(
  () => (props.searchInfo || []).map(({ key, defaultValue }) => ({ key, defaultValue })),
  () => {
    canSearch.value = true;
    initSearchData();
  },
  { immediate: true, deep: true }
);

// select 的 options 变化后，若当前选中值不在新选项中则清空
watch(
  () =>
    (props.searchInfo || [])
      .filter(item => item.type === "select")
      .map(item => ({ key: item.key, options: item.options, props: item.props })),
  () => {
    (props.searchInfo || []).forEach(item => {
      if (item.type !== "select") return;
      const value = searchData.value[item.key];
      if (value == null || value === "") return;

      const options = item.options || [];
      // 选项尚未加载时不清空，避免异步请求前误清 defaultValue
      if (!options.length) {
        searchData.value[item.key] = undefined;
        return;
      }

      const valueKey = item.props?.value || "value";
      const exists = options.some(opt => opt?.[valueKey] === value);
      if (!exists) searchData.value[item.key] = undefined;
    });
  },
  { deep: true }
);

// 去除两端空格&&限制长度
const trimEmpty = searchItem => {
  const { key, maxlength } = searchItem;
  const inputValue = searchData.value[key];
  if (typeof inputValue === "string") {
    const trimmed = inputValue.trim();
    searchData.value[key] = maxlength ? trimmed.slice(0, maxlength) : trimmed;
  }
};

/* el-date-picker 日期范围限制 START */
const getDisabledDate = searchItem => {
  return time => {
    const current = dayjs(time);
    const { maxRangeDate, disabledDate, disableFuture = false } = searchItem || {};

    // 默认可选未来日期；searchItem.disableFuture === true 时可开启不可选未来日期
    if (disableFuture) {
      const todayEnd = dayjs().endOf("day");
      if (current.isAfter(todayEnd)) return true;
    }

    // 兼容 searchItem 自定义 disabledDate
    if (typeof disabledDate === "function" && disabledDate(time)) {
      return true;
    }

    // 没有 maxRangeDate 限制，或尚未选择开始日期
    if (!maxRangeDate || !tempStartDate.value) return false;

    const start = dayjs(tempStartDate.value);
    const min = start.subtract(maxRangeDate - 1, "day").startOf("day");
    let max = start.add(maxRangeDate - 1, "day").endOf("day");

    // 范围上限不超过今天
    if (disableFuture !== false) {
      const todayEnd = dayjs().endOf("day");
      if (max.isAfter(todayEnd)) max = todayEnd;
    }

    return current.isBefore(min) || current.isAfter(max);
  };
};

const handleCalendarChange = val => {
  // val 是数组：[start, end]
  if (Array.isArray(val) && val[0] && !val[1]) {
    tempStartDate.value = val[0];
  }

  // 选完结束日期或清空时，重置
  if (!val || (val[0] && val[1])) {
    tempStartDate.value = null;
  }
};
/* el-date-picker 日期范围限制 END */

// 搜索
const handleSearch = debounce(searchConfig => {
  let params = {};
  const keys = Object.keys(searchData.value);
  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx];
    const val = searchData.value[key];
    if (val == null) continue;

    const emptyArr = Array.isArray(val) && val.length === 0;
    const emptyStr = typeOf(searchData.value[key]) === "string" && val.trim() === "";
    if (emptyArr || emptyStr) {
      // 过滤空值
      continue;
    } else {
      const searchCfg = searchInfoMap.value.get(key);
      // 组装日期范围。由“数组”组装成“startKey”、“endKey”两个值。
      if (searchCfg.type === "daterange" && searchCfg.startKey && searchCfg.endKey && searchData.value[key]) {
        params[searchCfg.startKey] = searchCfg.withTime
          ? dayjs(searchData.value[key][0]).startOf("day").format("YYYY-MM-DD HH:mm:ss")
          : dayjs(searchData.value[key][0]).format("YYYY-MM-DD");
        params[searchCfg.endKey] = searchCfg.withTime
          ? dayjs(searchData.value[key][1]).endOf("day").format("YYYY-MM-DD HH:mm:ss")
          : dayjs(searchData.value[key][1]).format("YYYY-MM-DD");
      } else {
        params[key] = searchData.value[key];
      }
    }
  }
  emits("search", params);
}, 200);

// 重置
const handleReset = debounce(() => {
  initSearchData();
  tempStartDate.value = null;
  handleSearch();
}, 200);

// 展开/收起
const handleToggle = () => {
  toggle.value = !toggle.value;
  emits("toggle");
};

/* 回车触发搜索事件 START */
const { menuFilterDialogVisible } = useLayout();
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

defineExpose({
  rhSearchRef,
  handleReset,
});
</script>

<style lang="scss" scoped>
.rh-search-wrapper {
  border-bottom: 1px solid var(--el-border-color-light);
  &.noBorder {
    border-bottom: none;
  }
  :deep(.el-form-item) {
    margin-bottom: initial;
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
