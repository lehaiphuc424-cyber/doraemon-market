// 1. 从环境变量读取 DeepSeek 能量模块
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY; 
const BASE_URL = "https://api.deepseek.com/v1/chat/completions";

/**
 * 【个股深度分析】
 * 逻辑：将 stockService 抓取到的数据发送给 DeepSeek，由它生成多啦A梦风格的报告
 */
export const analyzeStock = async (data: any) => {
  if (!API_KEY) return "未检测到 DeepSeek 能量模块，请在 Netlify 中配置 VITE_DEEPSEEK_API_KEY。";

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
          { 
            role: "system", 
            content: "你是一个来自22世纪的资深股票分析助手，请用多啦A梦的语气，结合 K 线、均线等数据，为用户提供犀利的作战报告。报告中多使用‘任意门’、‘竹蜻蜓’等词汇。注意保持辛金的精准特质。" 
          },
          { 
            role: "user", 
            content: `分析以下个股数据并生成报告：${JSON.stringify(data)}` 
          }
        ],
        temperature: 0.7
      })
    });

    const result = await response.json();
    if (result.error) throw new Error(result.error.message);
    return result.choices[0].message.content;
  } catch (error: any) {
    console.error("DeepSeek 传输故障:", error);
    return `时空乱流影响，DeepSeek 连接失败: ${error.message}`;
  }
};

/**
 * 【大盘宏观分析】
 * 逻辑：分析上证指数等宏观数据
 */
export const analyzeMarket = async (marketData: any) => {
  if (!API_KEY) return "大盘分析模块缺少 DeepSeek 能量。";

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
          { 
            role: "system", 
            content: "你是一个宏观经济专家，请简要分析当前大盘走势。用多啦A梦的口吻。建议简短有力。" 
          },
          { 
            role: "user", 
            content: `基于以下市场数据给出简短总结：${JSON.stringify(marketData)}` 
          }
        ]
      })
    });

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    return "宏观雷达探测失败。";
  }
};
