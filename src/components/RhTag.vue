<template>
  <!-- 枚举值标签展示 -->
  <el-tag v-if="matchedOption?.tagType" :type="matchedOption.tagType">
    {{ getLabel(options, value) }}
  </el-tag>
  <template v-else-if="matchedOption">{{ getLabel(options, value) }}</template>
  <template v-else>--</template>
</template>

<script setup>
import { computed } from 'vue'
import { getLabel } from '@/utils/index.js'

const props = defineProps({
  options: { type: Array, default: () => [] },
  value: { type: [Number, String], default: '' }
})

// 匹配选项
const matchedOption = computed(() => props.options.find((i) => i.value == props.value))
</script>

<style lang="scss" scoped></style>
