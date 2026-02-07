<template>
  <!-- 弹窗-添加/编辑 -->
  <el-dialog v-model="dialogVisible" v-bind="$attrs" :close-on-click-modal="false" @opened="opened" @closed="closed">
    <el-alert type="info" :closable="false" show-icon class="mb-4">
      <template #title>
        <span>切换「类型」下拉框，观察表单项的动态显隐（v-if）。</span>
        <span>弹窗关闭后重新打开，所有字段会被重置——包括被 v-if 销毁的字段。</span>
      </template>
    </el-alert>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" status-icon v-loading="loading">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择类型" class="w-full">
          <el-option label="产品" value="product" />
          <el-option label="服务" value="service" />
          <el-option label="其他" value="other" />
        </el-select>
      </el-form-item>
      <!--
        v-if 的表单项在条件为 false 时会被销毁，弹窗关闭重置数据后，
        这些字段对应的 DOM 不存在，因此 resetFields 无法重置它们。
        这里通过 getInitialForm() + Object.assign 手动重置所有字段来解决。
      -->
      <el-form-item label="规格" prop="spec" v-if="ruleForm.type === 'product'">
        <el-input v-model="ruleForm.spec" placeholder="请输入产品规格" />
      </el-form-item>
      <el-form-item label="服务周期" prop="period" v-if="ruleForm.type === 'service'">
        <el-date-picker
          v-model="ruleForm.period"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="w-full"
        />
      </el-form-item>
      <el-form-item label="数量" prop="count" v-if="ruleForm.type">
        <el-input-number v-model="ruleForm.count" :min="1" :max="9999" class="w-full" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="ruleForm.remark" type="textarea" :rows="3" placeholder="请输入备注（选填）" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="submitForm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, useTemplateRef } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({
  detail: { type: Object, default: () => ({}) },
});

const isEdit = computed(() => !!props.detail?.id);

/** el-form START **/
const ruleFormRef = useTemplateRef('ruleFormRef');
const getInitialForm = () => ({
  name: "",
  type: "",
  spec: "",
  period: [],
  count: 1,
  remark: "",
});
const ruleForm = reactive(getInitialForm());
const rules = reactive({
  name: [{ required: true, message: "请输入名称", trigger: ["blur", "change"] }],
  type: [{ required: true, message: "请选择类型", trigger: "change" }],
  spec: [{ required: true, message: "请输入产品规格", trigger: "blur" }],
  period: [{ required: true, message: "请选择服务周期", trigger: "change" }],
  count: [{ required: true, message: "请输入数量", trigger: "change" }],
});
const loading = ref(false);
const submitLoading = ref(false);

// 提交表单
const submitForm = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      const params = { ...ruleForm };
      isEdit.value ? handleEdit(params) : handleAdd(params);
    }
  });
};

// 添加
const handleAdd = (params) => {
  submitLoading.value = true;
  addApi(params)
    .then(res => {
      if (res.code == 200) {
        ElMessage({ message: "添加成功", type: "success" });
        emits("success");
        dialogVisible.value = false;
      }
    })
    .catch(() => {})
    .finally(() => {
      submitLoading.value = false;
    });
};

// 编辑
const handleEdit = (params) => {
  submitLoading.value = true;
  editApi({ id: props.detail.id, ...params })
    .then(res => {
      if (res.code == 200) {
        ElMessage({ message: "编辑成功", type: "success" });
        emits("success");
        dialogVisible.value = false;
      }
    })
    .catch(() => {})
    .finally(() => {
      submitLoading.value = false;
    });
};

// 获取详情
const getDetail = async () => {
  const params = { id: props.detail.id };
  await detailApi(params)
    .then(res => {
      if (res.code == 200) {
        Object.keys(ruleForm).forEach(key => {
          if (key in res.detail) ruleForm[key] = res.detail[key];
        });
      }
    })
    .catch(() => {})
    .finally(() => {});
};
/** el-form END **/

/** dialog START **/
const emits = defineEmits(["opened", "closed", "success"]);
const dialogVisible = defineModel();

// 弹窗开启
const opened = async () => {
  loading.value = true;
  if (isEdit.value) await getDetail();
  loading.value = false;
  emits("opened");
};

// 弹窗关闭
const closed = () => {
  resetForm();
  emits("closed");
};

// 重置数据
// resetFields 只能重置当前 DOM 中存在的字段，v-if="false" 的字段已被销毁，无法被重置。
// 因此需要额外通过 Object.assign(ruleForm, getInitialForm()) 将所有字段恢复为初始值。
const resetForm = () => {
  ruleFormRef.value?.resetFields();
  Object.assign(ruleForm, getInitialForm());
};
/** dialog END **/
</script>

<style lang="scss" scoped></style>
