<template>
  <!-- 切换夜间模式 -->
  <el-tooltip effect="dark" :content="`切换${isDark ? '亮色' : '暗色'}`" placement="bottom" :show-after="250">
    <div class="flex items-center h-full hover:bg-[--el-color-primary-dark-2]">
      <el-switch
        v-model="isDark"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        class="night-switch px-3"
        @change="toggleDark"
      />
    </div>
  </el-tooltip>
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
