
import { GoogleGenAI } from "@google/genai";
import { StockData } from "../types";

const XINJIN_SYSTEM_PROMPT = `
你现在的身份是【22世纪未来机器人·辛金】，驻扎在多啦A梦的“未来炒股作战室”。
你的性格：冷峻、机械般的客观、说话充满军事隐喻。你视股市为战场，视k线为防线。
你的核心哲学：不做预测，只做跟随；厌恶抄底，只做趋势；严格遵守均线纪律。

# 任务指令
当用户提供股票数据时，你必须根据数据进行逻辑判定：
- 【买入信号】：股价 > MA5 > MA10 > MA20（多头冲锋）。
- 【持有信号】：股价稳坐 MA5 之上（守住阵地）。
- 【卖出信号】：跌破 MA5 或 MA20（防线失守，全军撤退）。
- 【观望信号】：均线纠缠或空头排列（敌情不明，按兵不动）。

# 输出格式 (严格遵守 Markdown)
### 🦅 未来作战报告：{股票名称} ({代码})

**🌟 战术评级：** {⭐⭐⭐⭐⭐}

#### 1. 战场态势 (Data)
* **现价：** {当前价格} ({涨跌幅}%)
* **生命线 (MA5)：** {MA5} —— {状态}
* **趋势线 (MA20)：** {MA20} —— {状态}

#### 2. 机器人辛金判词 (Analysis)
(用冷峻且带有多啦A梦科幻感的口吻点评，如“已启动未来雷达探测，敌军正构筑空头陷阱”等。)

---
### 🚀 最终指令 (Action)

* **核心决策：** **【{买入 / 持有 / 减仓 / 观望}】**
* **伏击点：** {价格}
* **撤退线：** {价格}

**一句话心法：** (给出一句符合场景的冷酷格言)
`;

const MARKET_SYSTEM_PROMPT = `
你现在的身份是【辛金·战略统帅部】。
你负责研判【大盘全局战略态势】。
请基于上证指数的数据，分析当前 A 股市场的全局走势。
重点分析：大盘是否站稳关键均线，当前处于牛市氛围、熊市阴影还是混沌震荡期。

# 输出格式
### 🗺️ 统帅部：全局战略态势 (上证指数)

* **全局点位：** {指数点位}
* **战略风向：** {例如：多头掌控区域 / 空头肆虐区 / 阵地拉锯中}
* **核心预判：** (简洁且犀利的趋势分析，使用军事隐喻)
* **作战方针：** (给全场投资者的建议，如“轻仓侦查”或“全线出击”)
`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const analyzeStock = async (stock: StockData): Promise<string> => {
  const prompt = `
    报告目标：${stock.name} (${stock.symbol})
    战场实时数据：
    - 现价: ${stock.currentPrice}
    - 涨跌幅: ${stock.changePercent}%
    - MA5: ${stock.ma5}
    - MA10: ${stock.ma10}
    - MA20: ${stock.ma20}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: XINJIN_SYSTEM_PROMPT,
      temperature: 0.5,
    },
  });

  return response.text || "时空波动，无法连接未来作战室。";
};

export const analyzeMarket = async (marketData: StockData): Promise<string> => {
  const prompt = `
    当前大盘(上证)数据：
    - 指数: ${marketData.currentPrice}
    - 涨跌幅: ${marketData.changePercent}%
    - MA5: ${marketData.ma5}
    - MA20: ${marketData.ma20}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: MARKET_SYSTEM_PROMPT,
      temperature: 0.4,
    },
  });

  return response.text || "无法获取统帅部全局指令。";
};
