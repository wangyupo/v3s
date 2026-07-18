<template>
  <!-- 小数点输入框，支持 el-input 的所有属性，并支持自定义插槽 -->
  <el-input v-bind="$attrs" v-model="modelValue" :placeholder="placeholder" @input="handleInput" @blur="handleBlur">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </el-input>
</template>

<script setup>
const emits = defineEmits(['blur'])

const props = defineProps({
  // 占位符
  placeholder: { type: String, default: '请输入' },
  // 最大小数位数
  maxDecimalPlaces: { type: Number, default: null },
  // 是否允许显示零值（0、0.00 等），true 时显示为 0，false 时清空
  allowZero: { type: Boolean, default: true },
  // 是否只能输入整数，不允许小数
  integerOnly: { type: Boolean, default: false },
  // 最大整数位数，超过则截断
  maxIntegerDigits: { type: Number, default: null },
  // 最大值，超过则在失焦时自动修正为最大值
  max: { type: Number, default: null }
})

const modelValue = defineModel()

/**
 * 处理输入，限制只能输入数字和小数点
 * @param {string|number} value - 输入的值
 */
const handleInput = (value) => {
  const prev = String(modelValue.value || '')
  let val = String(value || '')

  // 只保留数字和小数点
  val = val.replace(/[^\d.]/g, '')

  if (props.integerOnly) {
    val = val.replace(/\./g, '')
    if (props.maxIntegerDigits != null && val) {
      val = (val.replace(/^0+/, '') || '0').slice(0, props.maxIntegerDigits)
    }
    modelValue.value = val
    return
  }

  // 只允许一个小数点
  const dotIndex = val.indexOf('.')
  if (dotIndex !== -1) {
    val = val.slice(0, dotIndex + 1) + val.slice(dotIndex + 1).replace(/\./g, '')
  }

  // 以小数点开头（含清空后只输入 "."）一律补 0；须放在 isDotJustTyped 之前，
  // 避免 el-input 先同步 v-model 为 "." 导致 prev 已含点、误判为未「刚输入点」而不补 0
  if (val.startsWith('.')) {
    val = '0' + val
  }

  // 是否「相对上一次内容新出现了小数点」（用于整数部分前导零折叠）
  const isDotJustTyped = val.includes('.') && !prev.includes('.')

  if (isDotJustTyped) {
    const [intPart, decPart = ''] = val.split('.')

    // intPart 可能是 "00012" / "000"
    const normalizedInt = intPart.replace(/^0+/, '') || '0'

    val = normalizedInt + '.' + decPart
  }

  // 限制整数位（先去前导零，再截断，避免 "000456" 截成 "000"）
  if (props.maxIntegerDigits != null && val) {
    const [intPart, decPart] = val.split('.')
    const trimmedInt = (intPart.replace(/^0+/, '') || '0').slice(0, props.maxIntegerDigits)
    val = decPart !== undefined ? trimmedInt + '.' + decPart : trimmedInt
  }

  // 限制小数位
  if (props.maxDecimalPlaces != null && val.includes('.')) {
    const [i, d] = val.split('.')
    val = i + '.' + d.slice(0, props.maxDecimalPlaces)
  }

  modelValue.value = val
}

/**
 * 处理失焦，清理末尾的小数点和无效的零值
 * @param {Event} event - 失焦事件对象
 */
const handleBlur = (event) => {
  let value = String(modelValue.value || '')

  if (!value) {
    emits('blur', event)
    return
  }

  // 移除末尾孤立的小数点
  if (!props.integerOnly && value.endsWith('.')) {
    value = value.slice(0, -1)
  }

  // 去掉前导 0（如 "0123" → "123"，但保留 "0" 和 "0.xxx"）
  if (/^0+[1-9]/.test(value)) {
    value = value.replace(/^0+/, '')
  }

  // 处理 0 / 0.0 / 0.000
  if (/^0+(\.0+)?$/.test(value)) {
    value = props.allowZero ? '0' : ''
  }

  // 超过最大值时修正为最大值
  if (props.max != null && value !== '' && Number(value) > props.max) {
    value = String(props.max)
  }

  modelValue.value = value
  emits('blur', event)
}
</script>

<style lang="scss" scoped></style>
