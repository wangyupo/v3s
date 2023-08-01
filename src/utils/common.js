import { isArray, cloneDeep } from "lodash-es";
import cookies from "js-cookie";
import { ElMessage, ElMessageBox } from "element-plus";

/**
 * 去掉所有的登录信息（菜单、用户信息、cookie等）
 * 登出业务需要
 */
export function removeAllLoginInfo() {
  cookies.remove("Authorization");
  removeLocalStorage("user");
}

/**
 * 存储localStorage
 * @param {String} name 名称
 * @param {*} content 值
 */
export function setLocalStorage(name, content) {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 * @param {String} name 名称
 * @returns 值
 */
export function getLocalStorage(name) {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 * @param {String} name 名称
 */
export function removeLocalStorage(name) {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 去除对象中的空格
 * @param {Object} data 传入的对象数据
 */
export function trimData(data) {
  for (let field in data) {
    if (typeof data[field] === "string") {
      data[field] = data[field].trim();
    }
    if (typeof data[field] === "object") {
      trimData(data[field]);
    }
  }
}

/**
 * 去掉对象中的空字符串、空数组、空对象
 * @param {Object} obj 传入的对象数据 eg: {a:1,b:''}
 * @returns {Object} egBck: {a:1}
 */
export function removeEmptyInObj(obj) {
  let newObj = {};
  if (typeof obj === "string") {
    obj = JSON.parse(obj);
  }
  if (obj instanceof Array) {
    newObj = [];
  }
  if (obj instanceof Object) {
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr) && obj[attr] !== "" && obj[attr] !== null && obj[attr] !== undefined) {
        if (obj[attr] instanceof Object) {
          if (JSON.stringify(obj[attr]) === "{}" || JSON.stringify(obj[attr]) === "[]") {
            continue;
          }
          newObj[attr] = removeEmptyInObj(obj[attr]);
        } else if (
          typeof obj[attr] === "string" &&
          ((obj[attr].indexOf("{") > -1 && obj[attr].indexOf("}") > -1) ||
            (obj[attr].indexOf("[") > -1 && obj[attr].indexOf("]") > -1))
        ) {
          try {
            let attrObj = JSON.parse(obj[attr]);
            if (attrObj instanceof Object) {
              newObj[attr] = removeEmptyInObj(attrObj);
            }
          } catch (e) {
            newObj[attr] = obj[attr];
          }
        } else {
          newObj[attr] = obj[attr];
        }
      }
    }
  }
  return newObj;
}

/**
 * 数组转树结构
 * @param {Array} list 数组
 * @param {String} id 自定义id字段
 * @param {String} pId 自定义parentId字段
 * @returns {Array} 树结构数据
 */
export function arr2tree(list, id = "id", pId = "parentId") {
  const result = [];
  const map = list.reduce((pre, cur) => {
    pre[cur[id]] = cur;
    return pre;
  }, {});
  for (let item of list) {
    if (item[pId] == "0") {
      result.push(item);
      continue;
    }
    if (item[pId] in map) {
      const parent = map[item[pId]];
      parent.children = parent.children || [];
      if (!parent.children.some(i => i[id] === item[id])) parent.children.push(item);
    }
  }
  return result;
}

/**
 * 树结构转数组
 * @param {Array} list 树结构数据
 * @returns {Array} 数组
 */
export function tree2arr(data) {
  if (!isArray(data)) {
    data = [data];
  }
  // 去除可能存在children字段，但是值为 null 或 undefined 的情况
  let _data = data.map(item => {
    if (item.children === null || item.children === undefined) {
      delete item.children;
    }
    return item;
  });
  return _data.reduce((pre, cur) => {
    let obj = {};
    for (let key in cur) {
      if (key !== "children") {
        obj[key] = cur[key];
      }
    }
    const { children = [] } = cur;
    return pre.concat([obj], tree2arr(children));
  }, []);
}

/**
 * 树结构增加level层级
 * @param {Array} array 树结构
 * @param {String} levelName 层级字段
 * @param {String} childrenName 子节点字段
 * @param {Function} fn 自定义函数，默认返回单个节点的对象
 * @returns {Array} 增加level字段后的树结构
 */
export function treeAddLevel(array, levelName = "level", childrenName = "children", fn = () => {}) {
  if (!isArray(array)) {
    array = [array];
  }
  const recursive = (array, level = 0) => {
    level++;
    return array.map(v => {
      v[levelName] = level;
      fn(v);
      const child = v[childrenName];
      if (child && child.length) recursive(child, level);
      return v;
    });
  };
  return recursive(array);
}

/**
 * 根据长度截断字符，并添加换行符\n
 * @param {String} string 原始字符串
 * @param {Number} breakLength 需要截断得长度
 * @param {String} breakSymbol 自定义换行符，默认为\n
 */
export function breakStringByLength(string, breakLength, breakSymbol = "\n") {
  let strs = string.split("");
  let str = "";
  for (let i = 0, s; (s = strs[i++]); ) {
    str += s;
    if (!(i % breakLength) && i !== strs.length) str += breakSymbol;
  }
  return str;
}

/**
 * 判断元素类型
 * @param {Dom} obj 元素本身
 * @returns {String} 元素类型
 */
export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  return map[toString.call(obj)];
}

/**
 * 生成uuid
 * @returns {String} uuid
 */
export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

/**
 * 手机号格式化
 * @param {String} phone
 * @returns {String} 183 1114 3263
 */
export const formatPhone = phone => {
  phone = phone.toString();
  return phone.substring(0, 3) + " " + phone.substring(3, 7) + " " + phone.substring(7, 11);
};

/**
 * 4位一空格（格式化银行卡）
 * @param {String} val
 * @returns {String} 4114 0201 5368 4210 213
 */
export const formatBank = val => {
  if (val) {
    return val
      .toString()
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ");
  }
};

/**
 * 复制文字至剪切板
 * @param {*} data 文字内容
 * @param {*} label 提示内容名称
 */
export const copy = (data, label = "") => {
  let url = data;
  let oInput = document.createElement("input");
  oInput.value = url;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象;
  document.execCommand("Copy"); // 执行浏览器复制命令
  ElMessage({
    type: "success",
    message: (label ? `“${label}” ` : "") + `复制成功`,
  });
  oInput.remove();
};

/**
 * 获取开始日期至结束日期的所有日期
 * @param {*} starDay 开始日期 2023-05-10
 * @param {*} endDay 结束日期 2023-06-09
 * @returns {Array} ["2023-05-10", "2023-05-11", "2023-05-12", ... , "2023-06-09"]
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
 * @returns {String} 2025-07-01
 */
export const getTodayDate = () => {
  // 获取当前日期
  let date = new Date();
  // 获取当前月份
  let nowMonth = date.getMonth() + 1;
  // 获取当前是几号
  let strDate = date.getDate();
  // 添加分隔符“-”
  let seperator = "-";
  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
  }
  // 对日期进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  let nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
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

/**
 * 对象转FormData
 * @param {*} obj
 * @returns {formdata}
 */
export const toFormData = obj => {
  const formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};

/**
 * 空字段串显示--
 * @param {*} obj 字段
 * @returns {String} 字段为空返回 --，否则返回字段本身
 */
export const epyReturn = obj => {
  const emptyStr = "--";
  let result;
  if (typeOf(obj) === "array") {
    result = obj.length ? obj : emptyStr;
  } else if (typeOf(obj) === "object") {
    result = Object.keys(obj).length ? obj : emptyStr;
  } else {
    result = obj ? obj : emptyStr;
  }
  return result;
};

/**
 * 数字格式化
 * @param {*} num 金额
 * @returns {String} 千分位逗号格式 20000->20,000
 */
export const numberFormat = num => {
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  });
};
