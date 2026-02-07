// ==================== 内部工具 ====================

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * 生成指定范围内的随机整数（包含 min 和 max）
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number}
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 生成指定长度的随机字符序列
 * @param {number} length 长度
 * @param {string} chars 字符集
 * @returns {string}
 */
const randomChars = (length, chars = CHARS) =>
  Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

// ==================== 导出函数 ====================

/**
 * 生成随机字符串
 * @param {number} minLength 最小长度，默认 5
 * @param {number} maxLength 最大长度，默认 50
 * @returns {string} 随机字符串
 */
export function generateRandomString(minLength = 5, maxLength = 50) {
  return randomChars(randomInt(minLength, maxLength));
}

/**
 * 生成随机整数
 * @param {number} min 最小值，默认 1
 * @param {number} max 最大值，默认 50000
 * @returns {number} 随机整数
 */
export function generateRandomNumber(min = 1, max = 50000) {
  return randomInt(min, max);
}

/**
 * 生成指定长度的随机数数组
 * @param {number} length 数组长度，默认 7
 * @param {number} min 最小值（包含），默认 130
 * @param {number} max 最大值（包含），默认 550
 * @returns {number[]} 随机数数组
 */
export function generateRandomArray(length = 7, min = 130, max = 550) {
  return Array.from({ length }, () => randomInt(min, max));
}

/**
 * 生成随机 email 地址
 * @param {string} domain 域名，默认 "example.com"
 * @returns {string} 如 "aBc123@example.com"
 */
export function generateRandomEmail(domain = "example.com") {
  return `${randomChars(randomInt(5, 14))}@${domain}`;
}

/**
 * 生成随机日期字符串（YYYYMMDD）
 * @param {Date} startDate 开始日期，默认当年 1 月 1 日
 * @param {Date} endDate 结束日期，默认当年 12 月 31 日
 * @returns {string} 如 "20250815"
 */
export function getRandomDate(startDate, endDate) {
  if (!startDate || !endDate) {
    const year = new Date().getFullYear();
    startDate = new Date(`${year}-01-01`);
    endDate = new Date(`${year}-12-31`);
  }

  const randomMs = randomInt(startDate.getTime(), endDate.getTime());
  return new Date(randomMs).toISOString().slice(0, 10).replace(/-/g, "");
}
