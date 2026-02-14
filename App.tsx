import React, { useState } from 'react';
import DoraHeader from './components/DoraHeader';
import StockChart from './components/StockChart';
import FallingGadgets from './components/FallingGadgets';
import MarketOverview from './components/MarketOverview';
// 下面这两行是关键，确保路径与你的文件夹结构（图 3c96e3）完全匹配
import { fetchStockData } from './services/stockService';
import { analyzeStock, analyzeMarket } from './services/geminiService';
import { StockData } from './types';
import { Search, Map as AnywhereDoor, ShieldAlert, Zap, Loader2, Sparkles, Target } from 'lucide-react';

const App: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [marketAnalysis, setMarketAnalysis] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
   if (loading) return; 

    const cleanSymbol = symbol.trim();
    if (!cleanSymbol || cleanSymbol.length < 6) {
      setError('请输入有效的 6 位股票代码');
      return;
    }

    setLoading(true);

    setLoading(true);
    setError(null);
    setAnalysis(null);
    setMarketAnalysis(null);

    try {
      // 同时获取个股数据和上证指数数据 (000001)
      const [data, marketData] = await Promise.all([
        fetchStockData(cleanSymbol),
        fetchStockData('000001')
      ]);
      
      setStockData(data);
      
      const [report, macroReport] = await Promise.all([
        analyzeStock(data),
        analyzeMarket(marketData)
      ]);

      setAnalysis(report);
      setMarketAnalysis(macroReport);
    } catch (err: any) {
      setError(err.message || '时空乱流影响，任意门连接失败。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20 relative">
      <FallingGadgets />
      
      <DoraHeader />

      {/* 搜索框 - 任意门风格 */}
      <div className="relative mt-8 max-w-2xl mx-auto group">
        <div className="glass-card p-2 flex items-stretch border-sky-400 shadow-xl relative z-10 transition-all hover:shadow-2xl">
          <div className="bg-white flex-1 rounded-2xl flex items-center px-4 shadow-inner">
            <Search className="text-sky-300 w-6 h-6" />
            <input
              type="text"
              maxLength={6}
              placeholder="输入代码开启未来之门..."
              className="w-full py-4 px-3 bg-transparent focus:outline-none text-xl font-black text-gray-700 placeholder:text-gray-200 tracking-wider"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="ml-2 dora-blue hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-lg border-b-4 border-sky-700"
          >
            {loading ? <Loader2 className="animate-spin" /> : <AnywhereDoor className="w-6 h-6" />}
            <span className="hidden md:inline">传送情报</span>
          </button>
        </div>
        <div className="absolute -inset-1 dora-blue opacity-5 rounded-[2.2rem] blur-xl group-hover:opacity-10 transition-opacity"></div>
      </div>

      {error && (
        <div className="mt-8 bg-white border-4 border-red-500 text-red-500 p-6 rounded-3xl shadow-2xl flex items-center gap-4 animate-bounce mx-auto max-w-2xl">
          <div className="w-10 h-10 dora-red rounded-full flex items-center justify-center shrink-0 border-2 border-black">
            <ShieldAlert className="text-white" />
          </div>
          <span className="font-black text-lg">{error}</span>
        </div>
      )}

      {/* 主分析区域 */}
      {stockData && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* 实时行情卡片 */}
            <div className="glass-card p-8 border-sky-400 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                  <Target size={100} className="text-sky-400" />
              </div>
              
              <div className="flex justify-between items-start mb-8 border-b-4 border-dotted border-sky-100 pb-6 relative z-10">
                <div>
                  <h2 className="text-4xl font-black text-gray-800 tracking-tight">{stockData.name}</h2>
                  <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-lg border-2 border-sky-200 font-mono">{stockData.symbol}</span>
                      <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-[10px] text-sky-400 font-black uppercase tracking-widest">Live Terminal</span>
                      </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-5xl font-black font-mono leading-none ${stockData.changePercent >= 0 ? 'text-red-500' : 'text-green-600'}`}>
                    {stockData.currentPrice.toFixed(2)}
                  </div>
                  <div className={`text-xl font-black flex items-center justify-end gap-1 mt-2 ${stockData.changePercent >= 0 ? 'text-red-500' : 'text-green-600'}`}>
                    {stockData.changePercent > 0 ? '▲' : '▼'} {stockData.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-8 relative z-10">
                {[
                  { label: 'MA5 生命线', val: stockData.ma5, color: 'red' },
                  { label: 'MA10 操盘线', val: stockData.ma10, color: 'yellow' },
                  { label: 'MA20 趋势线', val: stockData.ma20, color: 'green' }
                ].map((item, idx) => (
                  <div key={idx} className={`bg-white p-3 rounded-2xl border-4 border-${item.color}-100 text-center shadow-md hover:-translate-y-1 transition-transform`}>
                    <p className={`text-[10px] text-${item.color}-500 font-black mb-1`}>{item.label}</p>
                    <p className={`text-xl font-black text-${item.color}-600 font-mono`}>{item.val.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <StockChart data={stockData} />
            </div>

            {/* 机器人辛金分析报告 */}
            <div className="glass-card p-0 overflow-hidden border-sky-400 flex flex-col shadow-2xl relative">
              <div className="dora-blue p-5 flex items-center justify-between border-b-4 border-black/10">
                <div className="flex items-center gap-3 text-white font-black italic text-xl tracking-widest">
                  <Zap className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  22ND CENTURY BATTLE REPORT
                </div>
                <div className="w-4 h-4 bg-red-400 rounded-full animate-ping border border-white/20"></div>
              </div>

              <div className="p-8 h-[550px] overflow-y-auto scrollbar-hide flex-1 bg-white/40">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                      <Loader2 className="w-16 h-16 text-sky-500 animate-spin" />
                      <Sparkles className="absolute -top-4 -right-4 text-yellow-400 w-8 h-8 animate-pulse" />
                    </div>
                    <p className="text-sky-600 font-black text-2xl tracking-[0.2em] animate-pulse">辛金正在破译主力电报...</p>
                  </div>
                ) : analysis ? (
                  <div className="prose prose-sky max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans text-lg">
                      {analysis.split('\n').map((line, i) => {
                        if (line.startsWith('###')) return <h3 key={i} className="text-3xl font-black text-sky-700 mt-4 mb-6 border-b-4 border-sky-100 inline-block pb-2">{line.replace('###', '')}</h3>;
                        if (line.startsWith('####')) return <h4 key={i} className="text-xl font-black text-sky-600 mt-6 mb-3 flex items-center gap-2">▶ {line.replace('####', '')}</h4>;
                        if (line.includes('**')) {
                          const parts = line.split('**');
                          return (
                            <p key={i} className="mb-4">
                              {parts.map((part, pi) => pi % 2 === 1 ? <strong key={pi} className="text-sky-900 font-black bg-sky-100/50 px-1 rounded">{part}</strong> : part)}
                            </p>
                          );
                        }
                        if (line.startsWith('*')) return <li key={i} className="ml-4 list-none text-gray-700 font-bold border-l-4 border-sky-300 pl-4 my-3 py-1">{line.replace('*', '').trim()}</li>;
                        if (line.trim() === '---') return <hr key={i} className="my-8 border-dashed border-sky-200" />;
                        return <p key={i} className="mb-3 font-semibold">{line}</p>;
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="absolute bottom-4 right-4 w-12 h-12 dora-yellow border-2 border-black rounded-full opacity-10 pointer-events-none"></div>
            </div>
          </div>

          {/* 大盘分析汇总 */}
          {marketAnalysis && <MarketOverview analysis={marketAnalysis} />}
        </div>
      )}

      {/* 初始状态界面 */}
      {!stockData && !loading && (
        <div className="mt-20 text-center">
          <div className="relative inline-block animate-float">
            <div className="w-56 h-56 dora-blue rounded-full border-4 border-black relative overflow-hidden shadow-2xl flex items-center justify-center">
                {/* 脸部设计：去掉了嘴巴和分割线 */}
                <div className="absolute bottom-0 w-52 h-44 bg-white rounded-[50%_50%_40%_40%] left-1/2 -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black text-sky-100 opacity-30 -rotate-12 pointer-events-none uppercase tracking-widest">Future</div>
            </div>
            <div className="absolute -top-8 -right-8 bg-white p-5 rounded-full border-4 border-yellow-400 shadow-xl animate-pulse">
                <Sparkles className="text-yellow-500 w-10 h-10" />
            </div>
          </div>
          <p className="text-sky-500 font-black text-3xl mt-16 tracking-widest bg-white/60 inline-block px-10 py-3 rounded-full border-2 border-sky-100 shadow-sm">
            “快输入代码，带你飞跃 K 线阵地！”
          </p>
          <p className="mt-4 text-sky-400 font-bold text-sm">提示：捕捉天空中掉落的道具会有惊喜哦！</p>
        </div>
      )}

      <footer className="mt-32 text-center text-sky-400 text-sm pb-10 font-black uppercase tracking-widest opacity-60 border-t-2 border-sky-100 pt-10">
        <p>A-STOCK INTELLIGENCE GATEWAY | 22ND CENTURY TECH</p>
        <p className="mt-2">股市有风险，入场需谨慎。本报告由 AI 生成，不构成投资建议。</p>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
