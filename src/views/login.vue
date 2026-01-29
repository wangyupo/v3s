<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <!-- 登录卡片 -->
    <div class="login-card">
      <!-- 标题区域 -->
      <div class="login-header">
        <h1 class="title">欢迎回来</h1>
        <p class="subtitle">请登录您的账户</p>
      </div>

      <!-- 表单区域 -->
      <div class="login-form">
        <div class="form-item">
          <div class="input-wrapper" :class="{ focused: nameInputFocus, filled: form.username }">
            <User class="input-icon" />
            <input
              v-model="form.username"
              type="text"
              class="input-field"
              placeholder="请输入用户名"
              @focus="nameInputFocus = true"
              @blur="nameInputFocus = false"
            />
          </div>
        </div>

        <div class="form-item">
          <div class="input-wrapper" :class="{ focused: passwordInputFocus, filled: form.password }">
            <Lock class="input-icon" />
            <input
              v-model="form.password"
              type="password"
              class="input-field"
              placeholder="请输入密码"
              @focus="passwordInputFocus = true"
              @blur="passwordInputFocus = false"
            />
          </div>
        </div>

        <div class="form-options">
          <el-checkbox v-model="checked">记住我</el-checkbox>
          <a href="javascript:;" class="forgot-link">忘记密码？</a>
        </div>

        <button class="login-btn" :class="{ loading: isNavigating }" @click="handleLogin">
          <span v-if="!isNavigating">登 录</span>
          <span v-else class="loading-text">
            <i class="loading-spinner"></i>
            登录中...
          </span>
        </button>
      </div>

      <!-- 底部提示 -->
      <div class="login-footer">
        <div class="divider">
          <span>示例提示</span>
        </div>
        <p class="tip">
          <el-icon class="tip-icon"><InfoFilled /></el-icon>
          点击登录即可，示例版本无需校验
        </p>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="copyright">© 2024 V3S Admin. All rights reserved.</div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";
import { arr2tree } from "@/utils/index.js";
import menuJson from "@/router/menu.json";
import { menuKey } from "@/router/menuConfig.js";
import { useLayoutStore } from "@/stores/layout.js";
import { User, Lock, InfoFilled } from "@element-plus/icons-vue";

const layoutStore = useLayoutStore();
const { isNavigating } = storeToRefs(layoutStore);
const router = useRouter();
const nameInputFocus = ref(false);
const passwordInputFocus = ref(false);
const checked = ref(false);
const form = reactive({
  username: "",
  password: "",
});

const handleLogin = () => {
  const userStore = useUserStore();
  userStore.$patch((state) => {
    state.menu = arr2tree(menuJson, {
      id: menuKey.id,
      parentId: menuKey.parentId,
      children: menuKey.children,
    });
  });
  router.replace({ path: "/" });
};
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4ecf7 50%, #d9e4f5 100%);
  overflow: hidden;
}

// 背景装饰
.bg-decoration {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  .circle {
    position: absolute;
    border-radius: 50%;
    opacity: 0.4;
  }

  .circle-1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    top: -200px;
    right: -100px;
    animation: float 20s ease-in-out infinite;
  }

  .circle-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #f093fb, #f5576c);
    bottom: -100px;
    left: -100px;
    animation: float 15s ease-in-out infinite reverse;
  }

  .circle-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 10s ease-in-out infinite;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(5deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.5;
  }
}

// 登录卡片
.login-card {
  position: relative;
  width: 420px;
  padding: 48px 40px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 头部
.login-header {
  text-align: center;
  margin-bottom: 36px;

  .title {
    font-size: 28px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 8px;
    letter-spacing: 2px;
  }

  .subtitle {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
  }
}

// 表单
.login-form {
  .form-item {
    margin-bottom: 20px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      border-color: #d1d5db;
    }

    &.focused {
      border-color: #667eea;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
    }

    &.filled .input-icon {
      color: #667eea;
    }
  }

  .input-icon {
    width: 20px;
    height: 20px;
    margin-left: 16px;
    color: #9ca3af;
    transition: color 0.3s ease;
  }

  .input-field {
    flex: 1;
    padding: 16px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 15px;
    color: #1f2937;

    &::placeholder {
      color: #9ca3af;
    }
  }

  .form-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    :deep(.el-checkbox) {
      --el-checkbox-text-color: #6b7280;
      --el-checkbox-input-border: 1px solid #d1d5db;
    }

    .forgot-link {
      font-size: 13px;
      color: #6b7280;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #667eea;
      }
    }
  }
}

// 登录按钮
.login-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &.loading {
    pointer-events: none;
    opacity: 0.8;
  }

  .loading-text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .loading-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// 底部
.login-footer {
  margin-top: 32px;

  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #e5e7eb;
    }

    span {
      padding: 0 16px;
      font-size: 12px;
      color: #9ca3af;
    }
  }

  .tip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin: 0;
    font-size: 13px;
    color: #6b7280;

    .tip-icon {
      color: #667eea;
    }
  }
}

// 版权信息
.copyright {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #9ca3af;
}
</style>
