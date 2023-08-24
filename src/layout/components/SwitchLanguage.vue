<template>
  <!-- 国际化 -->
  <el-switch
    v-model="isZh"
    inline-prompt
    style="--el-switch-on-color: #ee1c25; --el-switch-off-color: #002164"
    active-text="中"
    inactive-text="EN"
  />
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/stores/layout.js";

const layoutStore = useLayoutStore();
const { isZh } = storeToRefs(layoutStore);
</script>

<style lang="scss" scoped></style>
