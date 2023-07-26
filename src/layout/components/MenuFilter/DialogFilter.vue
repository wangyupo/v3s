<template>
  <!-- 弹窗-搜索菜单 -->
  <el-dialog v-model="dialogVisible" width="30%" :show-close="false" @opened="opened" @closed="closed">
    <template #header="{ close, titleId, titleClass }">
      <div class="flex items-center justify-between">
        <h4 :id="titleId" :class="titleClass">搜索菜单</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          关闭
        </el-button>
      </div>
    </template>

    <div class="main">
      <el-input
        v-model="searchVal"
        size="large"
        placeholder="请输入关键词搜索"
        ref="searchInputRef"
        :suffix-icon="Search"
      />
      <div class="mt-4" ref="menuListRef" v-if="searchVal && filterMenuList.length">
        <div
          class="flex items-center justify-between mt-2 p-3 h-[60px] rounded text-base cursor-pointer hover:bg-blue-500 hover:text-white"
          :class="[listSelectIdx === idx ? 'bg-blue-500 text-white' : 'bg-gray-200']"
          v-for="(item, idx) in filterMenuList"
          :key="item.id"
        >
          <div class="flex items-center">
            <el-icon class="mr-2"><Document /></el-icon>
            {{ item.title }}
          </div>
          <i class="iconfont icon-enter text-xl"></i>
        </div>
      </div>
      <RhNoData v-else />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <div class="board-key flex items-center flex-shrink-0">
          <div class="board-key-btn flex items-center justify-center w-10 h-8 rounded-md mr-3">
            <i class="iconfont icon-enter"></i>
          </div>
          确认
        </div>
        <div class="board-key flex items-center flex-shrink-0 ml-6">
          <div class="board-key-btn flex items-center justify-center w-8 h-8 rounded-md mr-1">
            <el-icon><Top /></el-icon>
          </div>
          <div class="board-key-btn flex items-center justify-center w-8 h-8 rounded-md mr-3">
            <el-icon><Bottom /></el-icon>
          </div>
          切换
        </div>
        <div class="board-key flex items-center flex-shrink-0 ml-6">
          <div class="board-key-btn flex items-center justify-center w-10 h-8 rounded-md mr-3">Esc</div>
          关闭
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import pinyin from "pinyin";
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useLayoutStore } from "@/stores/layout.js";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { on, off } from "@/utils/dom";

/** dialog START **/
const layoutStore = useLayoutStore();
const emits = defineEmits(["update:modelValue"]);
const dialogVisible = ref(false);

watch(
  () => props.modelValue,
  val => {
    dialogVisible.value = val;
  }
);

const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
    default: false,
  },
});

// 弹窗开启
const opened = () => {
  if (searchInputRef.value) searchInputRef.value.focus();
};

// 弹窗关闭
const closed = () => {
  resetData();
  dialogVisible.value = false;
  emits("update:modelValue", false);
};
/** dialog END **/

/** menu filter START **/
const userStore = useUserStore();
const router = useRouter();
const searchVal = ref("");
const searchInputRef = ref(null);
const listSelectIdx = ref(0);
const filterMenuList = ref([]);

const chinese2Pinyin = chinese => {
  const _PY = pinyin(chinese, { style: "normal", heteronym: true, compact: true }).map(i => i.flat().join(""));
  return _PY;
};
watch(searchVal, val => {
  const valPinyinArr = chinese2Pinyin(val);
  filterMenuList.value = userStore.menuArrWithoutEmptyUrl.filter(i => {
    let filterRes = chinese2Pinyin(i.title).filter(p => {
      return valPinyinArr.find(o => p.indexOf(o) !== -1);
    });
    if (filterRes.length) return i;
  });
});

onMounted(() => {
  on(document, "keydown", selectMenuByKeyboard);
});

onUnmounted(() => {
  off(document, "keydown", selectMenuByKeyboard);
});

// 通过键盘选择菜单（选择菜单 & 回车跳转 & 搜索快捷键）
const selectMenuByKeyboard = e => {
  const { ctrlKey, key } = e;
  if (ctrlKey && key === " ") emits("update:modelValue", true); // ctrl+空格 打开弹窗
  if (!filterMenuList.value.length) return;
  if (["ArrowDown", "ArrowUp", "Enter"].includes(key)) searchInputRef.value.blur();
  if (key === "ArrowDown") {
    // 向下
    if (listSelectIdx.value === filterMenuList.value.length - 1) return;
    listSelectIdx.value += 1;
  } else if (key === "ArrowUp") {
    // 向上
    if (listSelectIdx.value === 0) return;
    listSelectIdx.value -= 1;
  } else if (key === "Enter") {
    // 回车
    const selectedMenu = filterMenuList.value[parseInt(listSelectIdx.value)];
    router.push({
      path: selectedMenu.url,
    });
    resetData();
    closed();
  }
};

// 重置数据
const resetData = () => {
  searchVal.value = "";
  listSelectIdx.value = 0;
  filterMenuList.value = [];
};
/** menu filter END **/
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
}
.board-key {
  color: var(--el-text-color-primary);
  &-btn {
    color: #969faf;
    background: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, 0.4);
  }
}
</style>
