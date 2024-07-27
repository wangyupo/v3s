import { formatDate } from "./date.js";

// 获取近 N 小时时间
export const getTimeRange = (hours = 1) => {
  const currentTime = new Date();
  const onHourAgo = new Date(currentTime.getTime() - hours * 60 * 60 * 1000);
  return [formatDate(onHourAgo), formatDate(currentTime)];
};
