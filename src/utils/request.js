import axios from "axios";
import { ElMessage } from "element-plus";
import { debounce } from "lodash-es";
import { removeAllLoginInfo } from "@/utils/index";
import router from "@/router";

// 登出逻辑（接口返回 401 时调用这个函数，用于清空登录信息，然后跳转登录页）
function loginOut() {
  if (window.location.href.indexOf("/login") !== -1) return;
  router.replace({ path: "/login" });
  removeAllLoginInfo();
}
// 报错提示（接口返回非 2xx 时使用该函数显示错误）
const debounceErr = debounce(msg => {
  ElMessage.error(msg);
}, 200);

/* Axios配置 START */
const request = axios.create({
  timeout: 60 * 1000, // 请求超时秒数
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
/* Axios配置 END */

export default request;
