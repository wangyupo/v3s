<template>
  <!-- 国际化 -->
  <el-tooltip effect="dark" :content="`${isZh ? 'English' : '中文'}`" placement="bottom" :show-after="250">
    <div class="flex items-center h-full hover:bg-[--el-color-primary-dark-2]">
      <el-switch
        class="px-3"
        v-model="isZh"
        inline-prompt
        style="--el-switch-on-color: #ee1c25; --el-switch-off-color: #002164"
        active-text="中"
        inactive-text="EN"
      />
    </div>
  </el-tooltip>
</template>

<script setup>
import { ref } from "vue";
import { useLayout } from "@/hooks/useLayout.js";

const { isZh } = useLayout();
</script>

<style lang="scss" scoped></style>
