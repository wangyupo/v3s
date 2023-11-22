<template>
  <!-- 弹窗-搜索菜单 -->
  <el-dialog
    class="filter-menu-dialog rounded-2xl"
    v-model="dialogVisible"
    width="632px"
    top="6vh"
    :show-close="false"
    @opened="opened"
    @closed="closed"
  >
    <div class="main">
      <el-input
        v-model="searchVal"
        class="filter-menu-dialog-input"
        size="large"
        placeholder="支持菜单全称|关键词|拼音搜索"
        ref="searchInputRef"
        :prefix-icon="Search"
      />
      <div class="mt-4" ref="menuListRef" v-if="searchVal && filterMenuList.length">
        <div
          class="flex items-center justify-between mt-2 p-3 h-[56px] rounded text-base cursor-pointer hover:bg-blue-500 hover:text-white"
          :class="[listSelectIdx === idx ? 'bg-blue-500 text-white' : '']"
          style="box-shadow: 0 1px 3px #d4d9e1"
          v-for="(item, idx) in filterMenuList"
          :key="item[menuKey.id]"
          @click="nav2Menu(item[menuKey.url])"
        >
          <div class="flex items-center">
            <el-icon class="mr-2"><Document /></el-icon>
            {{ item[menuKey.title] }}
          </div>
          <i class="iconfont icon-enter text-xl"></i>
        </div>
      </div>
      <RhNoData description="暂无搜索结果" v-else />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <div class="filter-menu-dialog-board-key flex items-center flex-shrink-0 w">
          <div
            class="filter-menu-dialog-board-key-btn flex items-center justify-center w-[31px] h-[26px] rounded-md mr-3"
          >
            <i class="iconfont icon-enter text-[15px] text-[#5a5a5a]"></i>
          </div>
          确认
        </div>
        <div class="filter-menu-dialog-board-key flex items-center flex-shrink-0 ml-6">
          <div
            class="filter-menu-dialog-board-key-btn flex items-center justify-center w-[26px] h-[26px] rounded-md mr-1"
          >
            <el-icon color="#5a5a5a"><Top /></el-icon>
          </div>
          <div
            class="filter-menu-dialog-board-key-btn flex items-center justify-center w-[26px] h-[26px] rounded-md mr-3"
          >
            <el-icon color="#5a5a5a"><Bottom /></el-icon>
          </div>
          切换
        </div>
        <div class="filter-menu-dialog-board-key flex items-center flex-shrink-0 ml-6">
          <div
            class="filter-menu-dialog-board-key-btn flex items-center justify-center w-[31px] h-[26px] text-[12px] text-[#5a5a5a] rounded-md mr-3"
          >
            Esc
          </div>
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
import { useUserStore } from "@/stores/user.js";
import { useLayout } from "@/hooks/useLayout.js";
import { useRouter } from "vue-router";
import { on, off } from "@/utils/index";
import { menuKey } from "@/router/menuConfig.js";

/** dialog START **/
const emits = defineEmits(["update:modelValue"]);
const dialogVisible = ref(false);

const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
    default: false,
  },
});

watch(
  () => props.modelValue,
  val => {
    dialogVisible.value = val;
  }
);

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
const { isDark } = useLayout();
const userStore = useUserStore();
const router = useRouter();
const searchVal = ref("");
const searchInputRef = ref(null);
const listSelectIdx = ref(0);
const filterMenuList = ref([]);

const chinese2Pinyin = chinese => {
  const _PY_NORMAL = pinyin(chinese, { style: "normal", heteronym: true, compact: true }).map(i => i.flat().join(""));
  const _PY_FIRST_LETTER = pinyin(chinese, { style: "first_letter", heteronym: true, compact: true }).map(i =>
    i.flat().join("")
  );
  const RES = _PY_NORMAL.concat(_PY_FIRST_LETTER);
  return RES;
};
watch(searchVal, val => {
  const valPinyinArr = chinese2Pinyin(val);
  filterMenuList.value = userStore.menuArrWithoutEmptyUrl.filter(i => {
    let filterRes = chinese2Pinyin(i[menuKey.title]).filter(p => {
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
  if (key === "ArrowDown") {
    // 向下
    if (listSelectIdx.value === filterMenuList.value.length - 1) return;
    listSelectIdx.value += 1;
  } else if (key === "ArrowUp") {
    // 向上
    e.preventDefault(); // 防止光标受到上键影响
    if (listSelectIdx.value === 0) return;
    listSelectIdx.value -= 1;
  } else if (key === "Enter") {
    // 回车
    const selectedMenu = filterMenuList.value[parseInt(listSelectIdx.value)];
    nav2Menu(selectedMenu[menuKey.url]);
  } else if (key == "Backspace") {
    // 删除文字
    listSelectIdx.value = 0;
  }
};

// To menu && close menu
const nav2Menu = path => {
  router.push({
    path,
  });
  resetData();
  closed();
};

// 重置数据
const resetData = () => {
  searchVal.value = "";
  listSelectIdx.value = 0;
  filterMenuList.value = [];
};
/** menu filter END **/
</script>

<style lang="scss">
.filter-menu-dialog {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 12px 14px;
  }
  .el-dialog__footer {
    padding: 18px 20px;
    line-height: initial;
  }
  .dialog-footer {
    display: flex;
  }
  &-input {
    height: 50px;
    font-size: 16px;
  }
  &-board-key {
    font-size: 14px;
    color: var(--el-text-color-primary);
    &-btn {
      background: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
      box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, 0.4);
    }
  }
}
</style>
