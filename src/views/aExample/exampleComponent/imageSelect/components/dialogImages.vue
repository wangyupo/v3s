<template>
  <!-- 弹窗-添加图片 -->
  <el-dialog v-model="dialogVisible" v-bind="$attrs" @opened="opened" @closed="closed">
    <div class="min-h-[120px]" v-loading="loading" element-loading-text="图片加载中...">
      <div class="image-grid">
        <div
          v-for="(item, index) in imageList"
          :key="index"
          class="image-item"
          :class="{ selected: item.isChecked }"
          @click="handleCheck(index)"
        >
          <img :src="item.url" class="image-item__img" />
          <!-- 选中遮罩 -->
          <div class="image-item__overlay" v-show="item.isChecked">
            <el-icon class="check-icon"><Check /></el-icon>
          </div>
          <!-- 预览按钮 -->
          <div class="image-item__preview" @click.stop="handleViewImage(index)">
            <el-icon><ZoomIn /></el-icon>
          </div>
        </div>
      </div>

      <!-- 图片预览 -->
      <el-image-viewer
        :url-list="srcList"
        :initial-index="imgPreviewIndex"
        @close="imageViewerVisible = false"
        v-if="imageViewerVisible"
      />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <div class="footer-left">
          <span class="selected-count">已选 {{ selectedCount }} 张</span>
        </div>
        <div class="footer-right">
          <el-button @click="handleCancelSelect">全不选</el-button>
          <el-button @click="handleSelectAll">全选</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { Check, ZoomIn } from "@element-plus/icons-vue";
import { cloneDeep } from "lodash-es";

const props = defineProps({
  selectedSrcList: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["opened", "closed", "confirm"]);
const dialogVisible = defineModel();

const srcList = ref([]);
const imageList = ref([]);
const loading = ref(false);
const imageViewerVisible = ref(false);
const imgPreviewIndex = ref(0);

// 模拟图片（实际项目替换为 API）
const MOCK_IMAGES = [
  "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
  "https://tb2.bdstatic.com/tb/img/search_logo_big_v2_d84d082.png",
  "https://webmap0.bdimg.com/wolfman/static/common/images/new/newlogo-new_3c175be.png",
  "https://fanyi-cdn.cdn.bcebos.com/static/cat/asset/logo.2481f256.png",
];

// 已选数量
const selectedCount = computed(() => imageList.value.filter(i => i.isChecked).length);

// 弹窗开启
const opened = () => {
  emits("opened");
  loading.value = true;
  setTimeout(() => {
    srcList.value = MOCK_IMAGES;
    // 根据 selectedSrcList 设置初始选中状态
    imageList.value = cloneDeep(MOCK_IMAGES).map(url => ({
      url,
      isChecked: props.selectedSrcList.includes(url),
    }));
    loading.value = false;
  }, 1000);
};

// 弹窗关闭
const closed = () => {
  srcList.value = [];
  imageList.value = [];
  emits("closed");
  dialogVisible.value = false;
};

// 选择/取消图片
const handleCheck = index => {
  imageList.value[index].isChecked = !imageList.value[index].isChecked;
};

// 预览图片
const handleViewImage = index => {
  imgPreviewIndex.value = index;
  imageViewerVisible.value = true;
};

// 全选
const handleSelectAll = () => imageList.value.forEach(i => (i.isChecked = true));

// 全不选
const handleCancelSelect = () => imageList.value.forEach(i => (i.isChecked = false));

// 确认
const handleConfirm = () => {
  const selected = imageList.value.filter(i => i.isChecked).map(i => i.url);
  emits("confirm", selected);
  closed();
};
</script>

<style lang="scss" scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.image-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  background: var(--el-fill-color-lighter);

  &:hover {
    border-color: var(--el-color-primary-light-5);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .image-item__preview {
      opacity: 1;
    }
  }

  &.selected {
    border-color: var(--el-color-primary);

    .image-item__overlay {
      opacity: 1;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(var(--el-color-primary-rgb), 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;

    .check-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--el-color-primary);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
  }

  &__preview {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.2s;

    &:hover {
      background: var(--el-color-primary);
      transform: scale(1.1);
    }
  }
}

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-left {
  .selected-count {
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}

.footer-right {
  display: flex;
  gap: 8px;
}
</style>
