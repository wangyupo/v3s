// increment-version.js
const fs = require("fs");
const path = require("path");

// 获取打包时间函数
function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const versionFilePath = path.join(__dirname, "version.json");
const versionData = require(versionFilePath);

const versionIncrement = 10; // 版本号进位阈值变量

// 分解版本号为 major（主版本号）, minor（次版本号）, patch（补丁版本号）
let [major, minor, patch] = versionData.version.split(".").map(num => parseInt(num, 10));

// 补丁版本号递增
patch += 1;
// 检查补丁版本号进位
if (patch >= versionIncrement) {
  patch = 0;
  minor += 1;
  // 检查次版本号进位
  if (minor >= versionIncrement) {
    minor = 0;
    major += 1;
    // 如果有需要，在这里可以检查主版本号进位的逻辑
  }
}

// 添加打包时间到 versionData
versionData.buildTime = getFormattedDate();

// 组合新版本号
const newVersion = [major, minor, patch].map(num => String(num)).join(".");
versionData.version = newVersion;

// 将新版本号写入文件
fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2), "utf8");

console.log('Version updated to:', newVersion);
console.log('Build time updated to:', versionData.buildTime);
