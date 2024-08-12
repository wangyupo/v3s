import { formatDate } from "./date.js";

// 获取近 N 小时时间
export const getTimeRange = (hours = 1) => {
  const currentTime = new Date();
  const onHourAgo = new Date(currentTime.getTime() - hours * 60 * 60 * 1000);
  return [formatDate(onHourAgo), formatDate(currentTime)];
};

/**
 * 将秒数格式化为带有最小单位的可读字符串。
 * @param {number} seconds - 要格式化的持续时间，单位为秒。
 * @param {string} minUnit - 最小时间单位（"year"、"month"、"day"、"hour"、"minute"、"second"）。
 * @returns {string} - 格式化后的持续时间字符串。
 */
export const formatSecondsToDuration = (seconds, minUnit) => {
  const timeUnits = {
    year: "年",
    month: "月",
    day: "天",
    hour: "小时",
    minute: "分钟",
    second: "秒",
  };

  if (seconds === 0) {
    return `0${timeUnits[minUnit]}`;
  }

  const secondsInUnit = {
    year: 31536000,
    month: 2628000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  // 计算每个时间单位的数量
  const years = Math.floor(seconds / secondsInUnit.year);
  const months = Math.floor((seconds % secondsInUnit.year) / secondsInUnit.month);
  const days = Math.floor((seconds % secondsInUnit.month) / secondsInUnit.day);
  const hours = Math.floor((seconds % secondsInUnit.day) / secondsInUnit.hour);
  const minutes = Math.floor((seconds % secondsInUnit.hour) / secondsInUnit.minute);
  const secs = seconds % secondsInUnit.minute;

  let result = "";

  // 拼接格式化结果
  if (years > 0) result += `${years}${timeUnits.year}`;
  if (months > 0) result += `${months}${timeUnits.month}`;
  if (days > 0) result += `${days}${timeUnits.day}`;
  if (hours > 0) result += `${hours}${timeUnits.hour}`;
  if (minutes > 0) result += `${minutes}${timeUnits.minute}`;
  if (secs > 0 || result === "") result += `${secs}${timeUnits.second}`;

  // 根据最小单位截断输出结果
  switch (minUnit) {
    case "year":
      return years > 0 ? `${years}${timeUnits.year}` : `0${timeUnits.year}`;
    case "month":
      return result.split(timeUnits.day)[0] || `0${timeUnits.month}`;
    case "day":
      return result.split(timeUnits.hour)[0] || `0${timeUnits.day}`;
    case "hour":
      return result.split(timeUnits.minute)[0] || `0${timeUnits.hour}`;
    case "minute":
      return result.split(timeUnits.second)[0] || `0${timeUnits.minute}`;
    default:
      return result;
  }
};
