<template>
  <!-- 示例-图片展示 -->
  <div>
    <RhTitle title="图片展示（支持预览、删除、追加、弹框保留已选项）" />
    <div class="flex mt-3">
      <el-button type="primary" @click="showDialog">添加图片</el-button>
    </div>
    <RhImg class="mt-3" :srcList="imageUrls" @delete="handleDelete" />
    <div class="mt-3 whitespace-pre">
      <code>
        {{ imageUrls }}
      </code>
    </div>

    <!-- 弹窗-选择图片 -->
    <DialogImages
      v-model="dialogVisible"
      title="选择图片"
      width="1000px"
      :selectedSrcList="imageUrls"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup>
import DialogImages from "./components/dialogImages.vue";
import { ref } from "vue";

/** 弹窗 START **/
const dialogVisible = ref(false); // 弹窗显示/隐藏

// 显示弹窗
const showDialog = () => {
  dialogVisible.value = true;
};
/** 弹窗 END **/

const imageUrls = ref(["https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"]);

// 删除图片
const handleDelete = index => {
  imageUrls.value.splice(index, 1);
};

// 弹框确认
const handleConfirm = urls => {
  imageUrls.value = urls;
};
</script>

<style lang="scss" scoped></style>
