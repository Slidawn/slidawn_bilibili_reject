/*
 * Bilibili Search Keyword Rewrite for Quantumult X
 * 作用：替换 B 站搜索栏默认提示词 / 热搜提示词
 */

let body = $response.body;

const myKeyword = "长期主义";
const myKeywords = [
  "只搜索真正需要的",
  "深度工作",
  "长期主义"
];

try {
  let obj = JSON.parse(body);

  function replaceStringFields(target) {
    if (!target || typeof target !== "object") return;

    for (const key of Object.keys(target)) {
      const value = target[key];

      if (typeof value === "string") {
        const lowerKey = key.toLowerCase();

        if (
          lowerKey.includes("word") ||
          lowerKey.includes("keyword") ||
          lowerKey.includes("show") ||
          lowerKey.includes("hint") ||
          lowerKey.includes("name") ||
          lowerKey.includes("title")
        ) {
          target[key] = myKeyword;
        }
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "string") {
            value[index] = myKeywords[index % myKeywords.length];
          } else {
            replaceStringFields(item);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        replaceStringFields(value);
      }
    }
  }

  replaceStringFields(obj);

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body });
}