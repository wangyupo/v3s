// 日期范围快捷操作
import dayjs from "dayjs";

/**
 * 生成日期范围快捷选项
 * @param {number} amount 数量
 * @param {string} unit 单位 (day/week/month/year)
 */
const createShortcut = (text, amount, unit) => ({
  text,
  value: () => [dayjs().subtract(amount, unit).toDate(), dayjs().toDate()],
});

export const shortcuts = [
  createShortcut("今天", 0, "day"),
  createShortcut("昨天", 1, "day"),
  createShortcut("过去一周", 1, "week"),
  createShortcut("过去一月", 1, "month"),
  createShortcut("过去三月", 3, "month"),
  createShortcut("过去一年", 1, "year"),
];
