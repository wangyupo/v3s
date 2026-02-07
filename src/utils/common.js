import cookies from "js-cookie";
import { ElMessage } from "element-plus";
import { useUser } from "@/hooks/useUser.js";

// ==================== 登录 & 存储 ====================

/**
 * 清除所有登录信息（菜单、用户信息、cookie 等）
 */
export function removeAllLoginInfo() {
  try {
    const { userStore } = useUser();
    userStore.$reset();
  } catch (error) {
    console.error("[removeAllLoginInfo]", error);
  }
  cookies.remove("Authorization");
  removeLocalStorage("user");
}

/**
 * 清除所有 localStorage、sessionStorage 和 cookies
 */
export function clearStorageAndCookies() {
  localStorage.clear();
  sessionStorage.clear();
  deleteAllCookies();
}

/**
 * 删除所有 cookie
 */
export function deleteAllCookies() {
  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

/**
 * 存储 localStorage
 * @param {string} name 键名
 * @param {*} content 值（非字符串会自动 JSON.stringify）
 */
export function setLocalStorage(name, content) {
  if (!name) return;
  const value = typeof content === "string" ? content : JSON.stringify(content);
  localStorage.setItem(name, value);
}

/**
 * 获取 localStorage
 * @param {string} name 键名
 * @returns {string|null} 值
 */
export function getLocalStorage(name) {
  if (!name) return null;
  return localStorage.getItem(name);
}

/**
 * 删除 localStorage
 * @param {string} name 键名
 */
export function removeLocalStorage(name) {
  if (!name) return;
  localStorage.removeItem(name);
}

// ==================== 数据处理 ====================

/**
 * 去除对象中所有字符串值的首尾空格（递归处理嵌套对象）
 * @param {Object} data 传入的对象数据
 */
export function trimData(data) {
  if (!data || typeof data !== "object") return;
  for (const key in data) {
    if (typeof data[key] === "string") {
      data[key] = data[key].trim();
    } else if (typeof data[key] === "object") {
      trimData(data[key]);
    }
  }
}

/**
 * 移除对象中的空值（空字符串、null、undefined、空数组、空对象）
 * 保留 0 和 false
 * @param {Object} obj 传入的对象
 * @returns {Object} 移除空值后的新对象
 */
export function removeEmptyInObj(obj) {
  if (typeof obj === "string") {
    try {
      obj = JSON.parse(obj);
    } catch {
      return obj;
    }
  }

  if (Array.isArray(obj)) {
    return obj.map(item => removeEmptyInObj(item));
  }

  if (obj && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      // 保留 0 和 false
      if (value === 0 || value === false) {
        acc[key] = value;
        return acc;
      }
      // 过滤空值
      if (value === "" || value === null || value === undefined) return acc;
      // 递归处理对象和数组
      if (typeof value === "object") {
        const isEmpty = Array.isArray(value) ? !value.length : !Object.keys(value).length;
        if (isEmpty) return acc;
        acc[key] = removeEmptyInObj(value);
        return acc;
      }
      acc[key] = value;
      return acc;
    }, {});
  }

  return obj;
}

// ==================== 格式化 ====================

/**
 * 手机号格式化：18312345678 → 183 1234 5678
 * @param {string|number} phone 手机号
 * @returns {string} 格式化后的手机号
 */
export const formatPhone = phone => {
  const str = String(phone);
  return `${str.slice(0, 3)} ${str.slice(3, 7)} ${str.slice(7, 11)}`;
};

/**
 * 银行卡号格式化：每4位一空格
 * @param {string|number} val 银行卡号
 * @returns {string} 格式化后的卡号，如 4114 0201 5368 4210
 */
export const formatBank = val => {
  if (!val) return "";
  return String(val).replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
};

/**
 * 数字千分位格式化：20000 → 20,000
 * @param {number|string} num 数字
 * @returns {string} 千分位格式的字符串
 */
export const numberFormat = num => {
  return String(num).replace(/\d+/, n => n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"));
};

/**
 * 空值显示占位符
 * @param {*} val 字段值
 * @param {string} placeholder 占位符，默认 "--"
 * @returns {*} 空值返回占位符，否则返回原值
 */
export const epyReturn = (val, placeholder = "--") => {
  if (val === 0 || val === false) return val;
  if (Array.isArray(val)) return val.length ? val : placeholder;
  if (val && typeof val === "object") return Object.keys(val).length ? val : placeholder;
  return val || placeholder;
};

// ==================== 字符串 & 文本 ====================

/**
 * 按指定长度截断字符串并插入分隔符
 * @param {string} str 原始字符串
 * @param {number} length 截断长度
 * @param {string} separator 分隔符，默认 "\n"
 * @returns {string} 处理后的字符串
 */
export function breakStringByLength(str, length, separator = "\n") {
  if (!str || !length) return str;
  return str.match(new RegExp(`.{1,${length}}`, "g")).join(separator);
}

/**
 * 复制文本到剪贴板
 * @param {string} text 要复制的文本
 * @param {string} label 提示中的名称标签
 */
export const copy = async (text, label = "") => {
  try {
    await navigator.clipboard.writeText(String(text));
    ElMessage.success((label ? `"${label}" ` : "") + "复制成功");
  } catch {
    // 降级方案
    const input = document.createElement("input");
    input.value = String(text);
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    input.remove();
    ElMessage.success((label ? `"${label}" ` : "") + "复制成功");
  }
};

// ==================== 类型 & 工具 ====================

/**
 * 判断数据类型
 * @param {*} value 任意值
 * @returns {string} 类型字符串（小写），如 "string"、"array"、"object"
 */
export function typeOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

/**
 * 生成 UUID（基于 crypto API）
 * @returns {string} UUID 字符串
 */
export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

/**
 * 从对象中根据路径安全取值（支持 "a.b.c" 嵌套路径）
 * @param {Object} obj 目标对象
 * @param {string} path 属性路径，如 "user.info.name"
 * @returns {*} 对应路径的值，不存在则返回 undefined
 */
export const getValueByPath = (obj, path) => {
  if (!obj || !path) return undefined;
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
};

/**
 * 对象转 FormData
 * @param {Object} obj 源对象
 * @returns {FormData}
 */
export const toFormData = obj => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

// ==================== 业务工具 ====================

/**
 * 根据 value 从选项列表中获取对应的 label
 * @param {Array<{label: string, value: *}>} options 选项数组
 * @param {*} value 要查找的值
 * @returns {string} 对应的 label，未找到返回 "--"
 */
export const getLabel = (options, value) => {
  return options.find(i => i.value == value)?.label ?? "--";
};

/**
 * 通过 searchInfo 配置初始化搜索数据
 * @param {Array} searchInfo 搜索配置数组
 * @returns {Object} 初始化后的搜索数据（已移除空值）
 */
export const initSearchData = searchInfo => {
  const data = searchInfo.reduce((acc, item) => {
    if (item.type === "daterange" && item.startKey && item.endKey) {
      acc[item.startKey] = item.defaultValue[0];
      acc[item.endKey] = item.defaultValue[1];
    } else {
      acc[item.key] = item.defaultValue;
    }
    return acc;
  }, {});
  return removeEmptyInObj(data);
};

/**
 * 比较版本号
 * @param {string} v1 版本号，如 "1.2.3"
 * @param {string} v2 版本号，如 "1.2.0"
 * @returns {number} 1（v1 > v2）；-1（v1 < v2）；0（v1 === v2）
 */
export const compareVersions = (v1, v2) => {
  if (!v1 || !v2) return 1;

  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);
  const len = Math.max(parts1.length, parts2.length);

  for (let i = 0; i < len; i++) {
    const diff = (parts1[i] || 0) - (parts2[i] || 0);
    if (diff > 0) return 1;
    if (diff < 0) return -1;
  }
  return 0;
};
