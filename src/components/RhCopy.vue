<template>
  <!-- 复制组件 -->
  <div class="flex items-center gap-3">
    <div class="break-words min-w-0">
      <slot>{{ content }}</slot>
      <el-icon class="ml-1 cursor-pointer" title="复制" @click="handleCopy" v-if="inline"><CopyDocument /></el-icon>
    </div>
    <el-icon class="cursor-pointer" title="复制" @click="handleCopy" v-if="!inline"><CopyDocument /></el-icon>
  </div>
</template>

<script setup>
import { copy } from "@/utils/index.js";

const props = defineProps({
  content: { type: String, default: "默认内容" },
  inline: { type: Boolean, default: false }, // copy图标是否跟随到文字末尾
});

// 复制内容
const handleCopy = () => {
  copy(props.content || "");
};
</script>

<style lang="scss" scoped></style>
