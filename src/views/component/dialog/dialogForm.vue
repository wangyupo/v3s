<template>
  <!-- 弹窗-业务/功能描述 -->
  <el-dialog v-model="dialogVisible" v-bind="$attrs" :close-on-click-modal="false" @opened="opened" @closed="closed">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" status-icon>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="submitForm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, useTemplateRef } from "vue";

/** el-form START **/
const ruleFormRef = useTemplateRef("ruleFormRef");
const getInitialForm = () => ({
  name: "",
});
const ruleForm = reactive(getInitialForm());
const rules = reactive({
  name: [{ required: true, message: "请输入名称", trigger: ["blur", "change"] }],
});
const getInitialState = () => ({
  list: [],
});
const state = reactive(getInitialState());
const submitLoading = ref(false);

// 提交表单
const submitForm = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      // do something
      emits("success");
      dialogVisible.value = false;
    }
  });
};
/** el-form END **/

/** dialog START **/
const emits = defineEmits(["opened", "closed", "success"]);
const dialogVisible = defineModel();

// 弹窗开启
const opened = () => {
  emits("opened");
};

// 弹窗关闭
const closed = () => {
  resetForm();
  emits("closed");
  dialogVisible.value = false;
};

// 重置数据
const resetForm = () => {
  ruleFormRef.value?.resetFields();
  Object.assign(ruleForm, getInitialForm());
  Object.assign(state, getInitialState());
};
/** dialog END **/
</script>

<style lang="scss" scoped></style>
