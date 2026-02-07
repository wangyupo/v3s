import { formatDate } from "./date.js";

/**
 * 获取近 N 小时的时间范围
 * @param {number} hours 小时数，默认 1
 * @returns {[string, string]} [开始时间, 结束时间]
 */
export const getTimeRange = (hours = 1) => {
  const now = new Date();
  const start = new Date(now.getTime() - hours * 3600000);
  return [formatDate(start), formatDate(now)];
};

/**
 * 将秒数格式化为可读的时长字符串
 * @param {number} seconds 秒数
 * @param {string} minUnit 最小单位（"year" | "month" | "day" | "hour" | "minute" | "second"）
 * @returns {string} 如 "2天3小时" 或 "1年2月"
 */
export const formatSecondsToDuration = (seconds, minUnit = "second") => {
  const units = [
    { key: "year", label: "年", seconds: 31536000 },
    { key: "month", label: "月", seconds: 2628000 },
    { key: "day", label: "天", seconds: 86400 },
    { key: "hour", label: "小时", seconds: 3600 },
    { key: "minute", label: "分钟", seconds: 60 },
    { key: "second", label: "秒", seconds: 1 },
  ];

  // 找到最小单位的索引
  const minIndex = units.findIndex(u => u.key === minUnit);
  const displayUnits = units.slice(0, minIndex + 1);

  if (seconds === 0) {
    return `0${displayUnits[displayUnits.length - 1].label}`;
  }

  let remaining = seconds;
  const parts = displayUnits.reduce((acc, unit) => {
    const count = Math.floor(remaining / unit.seconds);
    remaining %= unit.seconds;
    if (count > 0) acc.push(`${count}${unit.label}`);
    return acc;
  }, []);

  return parts.length ? parts.join("") : `0${displayUnits[displayUnits.length - 1].label}`;
};

/**
 * 获取当前时间字符串
 * @param {string} format 格式，默认 "YYYY-MM-DD HH:mm:ss"
 * @returns {string} 格式化后的当前时间
 */
export const getCurrentTime = (format) => {
  return formatDate(new Date(), format);
};
