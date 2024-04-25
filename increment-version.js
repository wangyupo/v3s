// increment-version.js
const fs = require('fs');
const path = require('path');

const versionFilePath = path.join(__dirname, 'version.json');
const versionData = require(versionFilePath);

const versionIncrement = 10; // 版本号进位阈值变量

// 分解版本号为 major（主版本号）, minor（次版本号）, patch（补丁版本号）
let [major, minor, patch] = versionData.version.split('.').map(num => parseInt(num, 10));

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

// 组合新版本号
const newVersion = [major, minor, patch].map(num => String(num)).join('.');
versionData.version = newVersion;

// 将新版本号写入文件
fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2), 'utf8');

console.log('Version updated to:', newVersion);
