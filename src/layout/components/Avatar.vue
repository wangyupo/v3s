<template>
  <!-- 个人信息 -->
  <el-dropdown trigger="click" class="h-full">
    <div class="avatar flex items-center cursor-pointer flex-shrink-0 px-3 h-full" :class="headerToolHoverClasses">
      <el-avatar :size="30" icon="UserFilled" />
      <span class="ml-2">管理员</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleV3s">
          <el-icon class="mr-1"><Link /></el-icon>
          项目地址
        </el-dropdown-item>
        <el-dropdown-item divided @click="handleLoginOut">
          <el-icon class="mr-1"><SwitchButton /></el-icon>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { Link } from "@element-plus/icons-vue";
import { removeAllLoginInfo } from "@/utils/index";
import { useLayout } from "@/hooks/useLayout.js";

const router = useRouter();
const { headerToolHoverClasses } = useLayout();

// 跳转项目地址
const handleV3s = () => {
  window.open("https://github.com/wangyupo/v3s", "_blank");
};

// 退出登录
const handleLoginOut = () => {
  ElMessageBox.confirm("确认退出系统吗?", "提示", {
    type: "warning",
  }).then(() => {
    router.replace({ path: "/login" });
    removeAllLoginInfo();
    ElMessage.success("登出成功！");
  });
};
</script>

<style lang="scss" scoped>
.avatar {
  height: 100%;
}
</style>
