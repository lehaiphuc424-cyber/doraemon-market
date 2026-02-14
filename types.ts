
export interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  changePercent: number;
  ma5: number;
  ma10: number;
  ma20: number;
  history: Array<{
    date: string;
    price: number;
    ma5: number;
    ma10: number;
    ma20: number;
  }>;
}

export interface XinjinReport {
  rating: string;
  situation: string;
  analysis: string;
  action: string;
  ambushPoint: string;
  retreatLine: string;
  motto: string;
  rawText: string;
}

export enum SignalType {
  BUY = '买入',
  HOLD = '持有',
  SELL = '减仓',
  WAIT = '观望'
}
