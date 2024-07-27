/**
 * 获取指定年月日后指定个天组成的"年月日"数组
 * @param {Number} year 年
 * @param {Number} month 月
 * @param {Number} day 日
 * @param {Number} count 天数
 * @returns {Array} eg: ["2021.10.05","2021.10.06","2021.10.07",...]
 */
export function getRandomDateAfterDay(year, month, day, count = 12) {
  const dates = [];
  const startDate = new Date(year, month - 1, day);

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    let formattedDate = `${year}${month}${day}`;
    dates.push(formattedDate);
  }

  return dates;
}

/**
 * 获取指定年月后指定个月组成的"年月"数组
 * @param {Number} year 年
 * @param {Number} month 月
 * @param {Number} count 月份数目
 * @returns {Array} eg: ["2021.11","2021,12","2022.01",...]
 */
export function getRandomDateAfterMonth(year, month, count = 12) {
  const months = [];
  const startDate = new Date(year, month - 1, 1);

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const formattedMonth = `${year}${month}`;
    months.push(formattedMonth);
  }

  return months;
}

/**
 * 获取开始日期至结束日期的所有日期
 * @param {*} starDay 开始日期 2023-05-10
 * @param {*} endDay 结束日期 2023-06-09
 * @returns {Array} eg: ["2023-05-10", "2023-05-11", "2023-05-12", ... , "2023-06-09"]
 */
export const getAllDay = (starDay, endDay) => {
  let arr = [];
  let dates = [];

  // 设置两个日期UTC时间
  let db = new Date(starDay);
  let de = new Date(endDay);

  // 获取两个日期GTM时间
  let s = db.getTime() - 24 * 60 * 60 * 1000;
  let d = de.getTime() - 24 * 60 * 60 * 1000;

  // 获取到两个日期之间的每一天的毫秒数
  for (let i = s; i <= d; ) {
    i = i + 24 * 60 * 60 * 1000;
    arr.push(parseInt(i));
  }

  // 获取每一天的时间  YY-MM-DD
  for (let j in arr) {
    let time = new Date(arr[j]);
    let year = time.getFullYear(time);
    let mouth = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : "0" + (time.getMonth() + 1);
    let day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
    let YYMMDD = year + "-" + mouth + "-" + day;
    dates.push(YYMMDD);
  }

  return dates;
};

/**
 * 返回当天日期
 * @param {*} format 日期格式
 * @param {*} dateSeperator 日期分隔符
 * @param {*} timeSeperator 时间分隔符
 * @returns
 */
export const getTodayDate = (format = "YYYY-MM-DD", dateSeperator = "-", timeSeperator = ":") => {
  // 获取当前日期
  let today = new Date();
  // 获取当前年份
  let year = today.getFullYear();
  // 获取当前月份
  let nowMonth = today.getMonth() + 1;
  // 获取当前是日期
  let strDate = today.getDate();
  // 获取当前时分秒
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  // 对月份进行处理，1-9在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth < 10) nowMonth = "0" + nowMonth;
  // 对日期进行处理，1-9在前面添加一个“0”
  if (strDate >= 0 && strDate < 10) strDate = "0" + strDate;
  // 对小时进行处理，1-9在前面添加一个“0”
  if (hours >= 0 && hours < 10) hours = "0" + hours;
  // 对分钟进行处理，1-9在前面添加一个“0”
  if (minutes >= 0 && minutes < 10) minutes = "0" + minutes;
  // 对秒数进行处理，1-9在前面添加一个“0”
  if (seconds >= 0 && seconds < 10) seconds = "0" + seconds;
  // 最后拼接字符串，得到一个对应格式的日期
  let nowDate = "";
  if (format == "YYYY-MM-DD") {
    nowDate = year + dateSeperator + nowMonth + dateSeperator + strDate;
  } else if (format == "YYYY-MM") {
    nowDate = year + dateSeperator + nowMonth;
  } else if (format == "YYYY-MM-DD HH:mm") {
    nowDate = year + dateSeperator + nowMonth + dateSeperator + strDate + " " + hours + timeSeperator + minutes;
  } else if (format == "YYYY-MM-DD HH:mm:ss") {
    nowDate =
      year +
      dateSeperator +
      nowMonth +
      dateSeperator +
      strDate +
      " " +
      hours +
      timeSeperator +
      minutes +
      timeSeperator +
      seconds;
  } else if (format == "yyyymmddhhmm") {
    nowDate =
      year + dateSeperator + nowMonth + dateSeperator + strDate + dateSeperator + hours + timeSeperator + minutes;
  } else if (format == "yyyymmddhhmmss") {
    nowDate =
      year +
      dateSeperator +
      nowMonth +
      dateSeperator +
      strDate +
      dateSeperator +
      hours +
      timeSeperator +
      minutes +
      timeSeperator +
      seconds;
  }
  return nowDate;
};

/**
 * 获取当前天起，接下来7天的日期、周数组成的对象数组
 * @param {*} day 需要获取未来 n 天的数据，默认7天
 * @returns {Array} [{ week: "周一", date: "07-01", fullDate: "2025-07-01" }, ...]
 */
export const getNext7Day = (day = 7) => {
  let arr = [];
  for (let i = 0; i < day; i++) {
    let weekDayArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    let myDate = new Date();
    let milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24 * i;
    let newMyDate = new Date(milliseconds);
    let weekDay = newMyDate.getDay();
    let year = newMyDate.getFullYear();
    let month = newMyDate.getMonth() + 1;
    let day = newMyDate.getDate();
    arr.push({
      week: weekDayArr[weekDay],
      date: (month < 10 ? "0" + month : month + "") + "-" + (day < 10 ? "0" + day : day + ""),
      fullDate: year + "-" + (month < 10 ? "0" + month : month + "") + "-" + (day < 10 ? "0" + day : day + ""),
    });
  }
  return arr;
};

/**
 * 获取指定日期的一整周日期、周数组成的对象数组
 * @param {*} date 指定日期（随便指定，会自动计算其所属周的周一到周日的全部数据）
 * @returns {Array} [{ week: "周一", date: "07-01", fullDate: "2025-07-01" }, ...]
 */
export const getWeekTime = date => {
  let new_Date = new Date(date ? date : getTodayDate());
  let timesStamp = new_Date.getTime();
  let currenDay = new_Date.getDay();
  let arr = [];
  let weekDayArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  for (let i = 0; i < 7; i++) {
    let newMyDate = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7)));
    let weekDay = newMyDate.getDay();
    let year = newMyDate.getFullYear();
    let month = newMyDate.getMonth() + 1;
    let day = newMyDate.getDate();
    arr.push({
      week: weekDayArr[weekDay],
      date: (month < 10 ? "0" + month : month + "") + "-" + (day < 10 ? "0" + day : day + ""),
      fullDate: year + "-" + (month < 10 ? "0" + month : month + "") + "-" + (day < 10 ? "0" + day : day + ""),
    });
  }
  return arr;
};

// 格式化日期
export const formatDate = (dateInput, format) => {
  let date;

  // 如果 dateInput 是字符串，则尝试解析为 Date 对象
  if (typeof dateInput === "string") {
    date = new Date(dateInput);
    if (isNaN(date)) {
      // 如果解析失败，返回空字符串或其他合适的默认值
      return "";
    }
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    // 如果传入的既不是字符串也不是 Date 对象，返回空字符串或其他合适的默认值
    return "";
  }

  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  // 使用对象映射来简化格式选择
  const formatMapping = {
    "YYYY-MM-DD": `${YYYY}-${MM}-${DD}`,
    "MM-DD": `${MM}-${DD}`,
    "HH:mm:ss": `${HH}:${mm}:${ss}`,
    "HH:mm": `${HH}:${mm}`,
  };

  // 默认格式为 'YYYY-MM-DD HH:mm:ss'
  return formatMapping[format] || `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
};

// 获取从当天起，过去 N 天的时间
export const getPastNDaysRange = days => {
  const currentTime = new Date();
  const endOfDay = new Date(currentTime);
  // endOfDay.setHours(23, 59, 59);

  const startOfDay = new Date(currentTime);
  // startOfDay.setHours(23, 59, 59);
  const startTime = new Date(startOfDay.getTime() - days * 24 * 60 * 60 * 1000);

  return [formatDate(startTime), formatDate(endOfDay)];
};

// 获取上一天开始、结束时间
export const getPreviousDayRange = () => {
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setDate(today.getDate() - 1);
  startOfDay.setHours(0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(23, 59, 59);

  return [formatDate(startOfDay), formatDate(endOfDay)];
};

// 获取上一周开始、结束时间
export const getPreviousWeekRange = () => {
  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() - 7);
  startOfWeek.setHours(0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59);

  return [formatDate(startOfWeek), formatDate(endOfWeek)];
};

// 获取上一月开始、结束时间
export const getPreviousMonthRange = () => {
  const today = new Date();

  const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  startOfMonth.setHours(0, 0, 0);

  const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  endOfMonth.setHours(23, 59, 59);

  return [formatDate(startOfMonth), formatDate(endOfMonth)];
};

// 获取上一年开始、结束时间
export const getPreviousYearRange = () => {
  const today = new Date();

  const startOfYear = new Date(today.getFullYear() - 1, 0, 1);
  startOfYear.setHours(0, 0, 0);

  const endOfYear = new Date(today.getFullYear() - 1, 11, 31);
  endOfYear.setHours(23, 59, 59);

  return [formatDate(startOfYear), formatDate(endOfYear)];
};

// 获取两个日期相差天数
export const getDaysBetweenDates = (date1, date2) => {
  // 创建日期对象
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // 获取两个日期的时间戳
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  // 计算时间差，单位为毫秒
  const timeDiff = Math.abs(endTime - startTime);

  // 将时间差转换为天数
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return dayDiff;
};
