<template>
  <!-- 数字输入框 -->
  <div>
    <RhInputDigital :value="value" />
    <p class="mt-4 text-[14px] text-gray-500">
      适用场景：仅能输入数字的金融场景。可以输入小数点，直接补0，也可以限制最大小数位、是否只能输入整数、是否允许使用0值。
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref(0);
</script>

<style lang="scss" scoped></style>
