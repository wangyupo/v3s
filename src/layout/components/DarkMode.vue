<template>
  <!-- 切换夜间模式 -->
  <el-switch
    v-model="isDark"
    :active-action-icon="Moon"
    :inactive-action-icon="Sunny"
    class="night-switch"
    @change="toggleDark"
  />
</template>

<script setup>
import { Sunny, Moon } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style lang="scss" scoped>
.night-switch {
  & :deep(.el-switch__core) {
    border-color: var(--el-border-color);
  }
}
</style>
