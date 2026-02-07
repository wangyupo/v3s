// ==================== 常量 ====================

const DAY_MS = 86400000; // 一天的毫秒数
const WEEK_DAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

// ==================== 内部工具 ====================

/**
 * 数字补零
 * @param {number} n 数字
 * @returns {string} 补零后的字符串
 */
const pad = n => String(n).padStart(2, "0");

/**
 * 将 Date 对象格式化为日期部分对象
 * @param {Date} date Date 对象
 * @returns {{ YYYY: number, MM: string, DD: string, HH: string, mm: string, ss: string }}
 */
const getDateParts = date => ({
  YYYY: date.getFullYear(),
  MM: pad(date.getMonth() + 1),
  DD: pad(date.getDate()),
  HH: pad(date.getHours()),
  mm: pad(date.getMinutes()),
  ss: pad(date.getSeconds()),
});

// ==================== 日期格式化 ====================

/**
 * 格式化日期
 * @param {string|Date} dateInput 日期字符串或 Date 对象
 * @param {string} format 格式，支持 "YYYY-MM-DD"、"MM-DD"、"HH:mm:ss"、"HH:mm"，默认 "YYYY-MM-DD HH:mm:ss"
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (dateInput, format) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(date)) return "";

  const { YYYY, MM, DD, HH, mm, ss } = getDateParts(date);

  const formats = {
    "YYYY-MM-DD": `${YYYY}-${MM}-${DD}`,
    "YYYY-MM": `${YYYY}-${MM}`,
    "MM-DD": `${MM}-${DD}`,
    "HH:mm:ss": `${HH}:${mm}:${ss}`,
    "HH:mm": `${HH}:${mm}`,
  };

  return formats[format] || `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
};

/**
 * 获取当天日期字符串
 * @param {string} format 格式，默认 "YYYY-MM-DD"
 * @returns {string} 格式化后的日期
 */
export const getTodayDate = (format = "YYYY-MM-DD") => {
  return formatDate(new Date(), format);
};

// ==================== 日期序列生成 ====================

/**
 * 获取指定日期后连续 N 天的日期数组
 * @param {number} year 年
 * @param {number} month 月
 * @param {number} day 日
 * @param {number} count 天数，默认 12
 * @returns {string[]} 如 ["20211005", "20211006", ...]
 */
export function getRandomDateAfterDay(year, month, day, count = 12) {
  const start = new Date(year, month - 1, day);
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const { YYYY, MM, DD } = getDateParts(date);
    return `${YYYY}${MM}${DD}`;
  });
}

/**
 * 获取指定年月后连续 N 个月的年月数组
 * @param {number} year 年
 * @param {number} month 月
 * @param {number} count 月份数目，默认 12
 * @returns {string[]} 如 ["202111", "202112", "202201", ...]
 */
export function getRandomDateAfterMonth(year, month, count = 12) {
  const start = new Date(year, month - 1, 1);
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(start);
    date.setMonth(start.getMonth() + i);
    const { YYYY, MM } = getDateParts(date);
    return `${YYYY}${MM}`;
  });
}

/**
 * 获取开始日期至结束日期之间的所有日期
 * @param {string} startDay 开始日期，如 "2023-05-10"
 * @param {string} endDay 结束日期，如 "2023-06-09"
 * @returns {string[]} 如 ["2023-05-10", "2023-05-11", ..., "2023-06-09"]
 */
export const getAllDay = (startDay, endDay) => {
  const start = new Date(startDay);
  const end = new Date(endDay);
  const dates = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(formatDate(new Date(d), "YYYY-MM-DD"));
  }

  return dates;
};

// ==================== 周相关 ====================

/**
 * 将 Date 对象转为 { week, date, fullDate } 格式
 * @param {Date} date Date 对象
 * @returns {{ week: string, date: string, fullDate: string }}
 */
const toWeekItem = date => {
  const { YYYY, MM, DD } = getDateParts(date);
  return {
    week: WEEK_DAYS[date.getDay()],
    date: `${MM}-${DD}`,
    fullDate: `${YYYY}-${MM}-${DD}`,
  };
};

/**
 * 获取从当天起未来 N 天的日期和周信息
 * @param {number} days 天数，默认 7
 * @returns {Array<{ week: string, date: string, fullDate: string }>}
 */
export const getNext7Day = (days = 7) => {
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(today.getTime() + DAY_MS * i);
    return toWeekItem(date);
  });
};

/**
 * 获取指定日期所在整周（周一到周日）的日期和周信息
 * @param {string} date 日期字符串，默认今天
 * @returns {Array<{ week: string, date: string, fullDate: string }>}
 */
export const getWeekTime = date => {
  const target = new Date(date || getTodayDate());
  const dayOfWeek = target.getDay();
  // 计算周一的偏移量（周日为 0，需要特殊处理为 -6）
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(target.getTime() + DAY_MS * (mondayOffset + i));
    return toWeekItem(d);
  });
};

// ==================== 时间范围 ====================

/**
 * 获取从当前时间起过去 N 天的时间范围
 * @param {number} days 天数
 * @returns {[string, string]} [开始时间, 结束时间]
 */
export const getPastNDaysRange = days => {
  const now = new Date();
  const start = new Date(now.getTime() - days * DAY_MS);
  return [formatDate(start), formatDate(now)];
};

/**
 * 获取上一天的时间范围（00:00:00 ~ 23:59:59）
 * @returns {[string, string]} [开始时间, 结束时间]
 */
export const getPreviousDayRange = () => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 1);
  start.setHours(0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59);

  return [formatDate(start), formatDate(end)];
};

/**
 * 获取上一周的时间范围（周一 00:00:00 ~ 周日 23:59:59）
 * @returns {[string, string]} [开始时间, 结束时间]
 */
export const getPreviousWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay() || 7; // 周日为 7

  const start = new Date(today);
  start.setDate(today.getDate() - dayOfWeek - 6);
  start.setHours(0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59);

  return [formatDate(start), formatDate(end)];
};

/**
 * 获取上一月的时间范围（1日 00:00:00 ~ 末日 23:59:59）
 * @returns {[string, string]} [开始时间, 结束时间]
 */
export const getPreviousMonthRange = () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0, 0);
  const end = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59);
  return [formatDate(start), formatDate(end)];
};

/**
 * 获取上一年的时间范围（1月1日 00:00:00 ~ 12月31日 23:59:59）
 * @returns {[string, string]} [开始时间, 结束时间]
 */
export const getPreviousYearRange = () => {
  const lastYear = new Date().getFullYear() - 1;
  const start = new Date(lastYear, 0, 1, 0, 0, 0);
  const end = new Date(lastYear, 11, 31, 23, 59, 59);
  return [formatDate(start), formatDate(end)];
};

// ==================== 日期计算 ====================

/**
 * 计算两个日期之间相差的天数
 * @param {string|Date} date1 日期1
 * @param {string|Date} date2 日期2
 * @returns {number} 相差天数（取绝对值向上取整）
 */
export const getDaysBetweenDates = (date1, date2) => {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
  return Math.ceil(diff / DAY_MS);
};
