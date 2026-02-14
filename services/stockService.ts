// 1. 环境变量名必须和 Netlify 里的 VITE_DEEPSEEK_API_KEY 一致
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY; 
const BASE_URL = "https://api.deepseek.com/v1/chat/completions";

/**
 * 对应 App.tsx 第 7 行的引用
 */
export const analyzeStock = async (data: any) => {
  if (!API_KEY) return "未检测到 DeepSeek 能量模块，请检查配置。";

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat", 
        messages: [
          { role: "system", content: "你是一个来自22世纪的资深股票分析助手，请用多啦A梦的语气分析数据。" },
          { role: "user", content: `分析个股：${JSON.stringify(data)}` }
        ]
      })
    });
    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    return "时空乱流影响，DeepSeek 连接失败。";
  }
};

/**
 * 对应 App.tsx 第 7 行的引用
 */
export const analyzeMarket = async (marketData: any) => {
  if (!API_KEY) return "大盘分析模块缺少能量。";

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "请用多啦A梦的语气简要总结大盘。" },
          { role: "user", content: `分析大盘：${JSON.stringify(marketData)}` }
        ]
      })
    });
    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    return "宏观雷达探测失败。";
  }
};
