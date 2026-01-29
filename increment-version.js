/**
 * 版本号自动递增脚本
 *
 * 功能：
 * - 自动递增版本号（支持 major/minor/patch）
 * - 更新 version.json
 * - 记录打包时间
 *
 * 使用方式：
 * - node increment-version.js          # 默认递增 patch 版本
 * - node increment-version.js patch    # 递增补丁版本号 (0.0.x)
 * - node increment-version.js minor    # 递增次版本号 (0.x.0)
 * - node increment-version.js major    # 递增主版本号 (x.0.0)
 */

const fs = require("fs");
const path = require("path");

// 配置
const CONFIG = {
  versionFile: "version.json",
  patchMax: 100, // patch 版本号上限，达到后进位到 minor
  minorMax: 10, // minor 版本号上限，达到后进位到 major
};

/**
 * 获取格式化的当前时间
 * @returns {string} YYYY-MM-DD HH:mm:ss 格式的时间字符串
 */
function getFormattedDate() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  return [
    [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join("-"),
    [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join(":"),
  ].join(" ");
}

/**
 * 读取 JSON 文件
 * @param {string} filePath 文件路径
 * @returns {object} 解析后的 JSON 对象
 */
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ 读取文件失败: ${filePath}`);
    console.error(`   错误信息: ${error.message}`);
    process.exit(1);
  }
}

/**
 * 写入 JSON 文件
 * @param {string} filePath 文件路径
 * @param {object} data 要写入的数据
 */
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
  } catch (error) {
    console.error(`❌ 写入文件失败: ${filePath}`);
    console.error(`   错误信息: ${error.message}`);
    process.exit(1);
  }
}

/**
 * 解析版本号字符串
 * @param {string} version 版本号字符串 (如 "1.2.3")
 * @returns {{major: number, minor: number, patch: number}} 版本号对象
 */
function parseVersion(version) {
  const parts = version.split(".").map((n) => parseInt(n, 10) || 0);
  return {
    major: parts[0] || 0,
    minor: parts[1] || 0,
    patch: parts[2] || 0,
  };
}

/**
 * 格式化版本号对象为字符串
 * @param {{major: number, minor: number, patch: number}} version 版本号对象
 * @returns {string} 版本号字符串
 */
function formatVersion({ major, minor, patch }) {
  return `${major}.${minor}.${patch}`;
}

/**
 * 递增版本号
 * @param {{major: number, minor: number, patch: number}} version 当前版本号
 * @param {string} type 递增类型 (major/minor/patch)
 * @returns {{major: number, minor: number, patch: number}} 新版本号
 */
function incrementVersion(version, type = "patch") {
  let { major, minor, patch } = version;

  switch (type) {
    case "major":
      major += 1;
      minor = 0;
      patch = 0;
      break;

    case "minor":
      minor += 1;
      patch = 0;
      // 检查 minor 进位
      if (minor >= CONFIG.minorMax) {
        minor = 0;
        major += 1;
      }
      break;

    case "patch":
    default:
      patch += 1;
      // 检查 patch 进位
      if (patch >= CONFIG.patchMax) {
        patch = 0;
        minor += 1;
        // 检查 minor 进位
        if (minor >= CONFIG.minorMax) {
          minor = 0;
          major += 1;
        }
      }
      break;
  }

  return { major, minor, patch };
}

// 主逻辑
function main() {
  // 解析命令行参数
  const args = process.argv.slice(2);
  const incrementType = ["major", "minor", "patch"].includes(args[0]) ? args[0] : "patch";

  // 文件路径
  const versionFilePath = path.join(__dirname, CONFIG.versionFile);

  // 读取当前版本信息
  const versionData = readJsonFile(versionFilePath);

  // 解析并递增版本号
  const currentVersion = parseVersion(versionData.version);
  const newVersion = incrementVersion(currentVersion, incrementType);
  const newVersionStr = formatVersion(newVersion);

  // 更新打包时间
  const buildTime = getFormattedDate();

  // 更新 version.json
  versionData.version = newVersionStr;
  versionData.buildTime = buildTime;
  writeJsonFile(versionFilePath, versionData);

  // 输出结果
  console.log("");
  console.log("┌─────────────────────────────────────────┐");
  console.log("│           📦 版本更新成功！             │");
  console.log("├─────────────────────────────────────────┤");
  console.log(`│  类型:     ${incrementType.padEnd(28)}│`);
  console.log(`│  版本:     ${formatVersion(currentVersion)} → ${newVersionStr.padEnd(19)}│`);
  console.log(`│  时间:     ${buildTime.padEnd(28)}│`);
  console.log("├─────────────────────────────────────────┤");
  console.log("│  ✅ version.json                        │");
  console.log("└─────────────────────────────────────────┘");
  console.log("");
}

// 执行主函数
main();
