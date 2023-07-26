import { typeOf } from "@/utils/common";

/**
 * 空字段串显示--
 * @param {*} obj 字段
 * @returns 字段为空返回 --，否则返回字段本身
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
 * @returns 千分位逗号格式 20000->20,000
 */
export const numberFormat = num => {
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  });
};
