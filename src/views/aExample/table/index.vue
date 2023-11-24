<template>
  <!-- 示例-table样式 -->
  <div>
    <RhTitle divider title="基础样式">
      <template #title-right>
        <el-button type="primary">新增</el-button>
      </template>
    </RhTitle>
    <tableBasic class="mt-3" />
    <RhTitle divider title="搜索样式" class="mt-3" />
    <tableForm class="mt-3" />
    <RhTitle divider title="线框样式" class="mt-3" />
    <tableWrapper class="mt-3" />
    <RhTitle divider title="行编辑" class="mt-3" />
    <tableRowEdit class="mt-3" />
    <RhTitle divider title="列字段配置（排序、显示/隐藏）" class="mt-3" />
    <tableColumnsDIY class="mt-3" />
    <RhTitle divider title="行拖拽（必须设置row-key，且保证是唯一不重复的）" class="mt-3" />
    <tableDragRow class="mt-3" />
  </div>
</template>

<script setup>
import tableBasic from "./tableBasic.vue";
import tableForm from "./tableForm.vue";
import tableWrapper from "./tableWrapper.vue";
import tableRowEdit from "./tableRowEdit.vue";
import tableColumnsDIY from "./tableColumnsDIY.vue";
import tableDragRow from "./tableDragRow.vue";
</script>

<style lang="scss" scoped></style>
