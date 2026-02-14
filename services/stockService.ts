import { StockData } from '../types';

/**
 * 获取 A 股实时行情与历史数据 (接入东方财富公开接口)
 * 关键点：必须使用具名导出 export const
 */
export const fetchStockData = async (symbol: string): Promise<StockData> => {
  // 1. 自动识别市场前缀
  let secid = '';
  const firstChar = symbol[0];
  if (['6', '5', '9'].includes(firstChar)) {
    secid = `1.${symbol}`; // 沪市
  } else {
    secid = `0.${symbol}`; // 深市
  }

  // 2. 获取 K 线数据
  const klineUrl = `https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=${secid}&ut=fa5fd1943c40a8d55d2153df71d83707&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&klt=101&fqt=1&end=20500101&lmt=40`;
  
  // 3. 获取实时盘口数据
  const spotUrl = `https://push2.eastmoney.com/api/qt/stock/get?secid=${secid}&ut=fa5fd1943c40a8d55d2153df71d83707&fields=f57,f58,f43,f170,f46,f44,f45,f47,f48,f60,f19,f20,f39,f161`;

  try {
    const [klineRes, spotRes] = await Promise.all([
      fetch(klineUrl).then(res => res.json()),
      fetch(spotUrl).then(res => res.json())
    ]);

    if (!klineRes.data || !spotRes.data) {
      throw new Error('未能识别该股票代码或接口繁忙');
    }

    const name = spotRes.data.f58;
    const currentPrice = spotRes.data.f43 / 100;
    const changePercent = spotRes.data.f170 / 100;
    const rawKlines = klineRes.data.klines;

    const history = rawKlines.map((line: string) => {
      const parts = line.split(',');
      return {
        date: parts[0],
        price: parseFloat(parts[2])
      };
    });

    const calculateMA = (data: any[], period: number) => {
      return data.map((item, index) => {
        if (index < period - 1) return null;
        const slice = data.slice(index - period + 1, index + 1);
        const sum = slice.reduce((acc, curr) => acc + curr.price, 0);
        return parseFloat((sum / period).toFixed(2));
      });
    };

    const ma5List = calculateMA(history, 5);
    const ma10List = calculateMA(history, 10);
    const ma20List = calculateMA(history, 20);

    const finalHistory = history.map((h: any, i: number) => ({
      ...h,
      ma5: ma5List[i],
      ma10: ma10List[i],
      ma20: ma20List[i],
    }));

    const lastMA = finalHistory[finalHistory.length - 1];

    return {
      symbol,
      name,
      currentPrice,
      changePercent,
      ma5: lastMA.ma5 || currentPrice,
      ma10: lastMA.ma10 || currentPrice,
      ma20: lastMA.ma20 || currentPrice,
      history: finalHistory.slice(-25)
    };
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};
