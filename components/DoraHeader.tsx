import React from 'react';

const DoraHeader: React.FC = () => {
  return (
    <header className="flex flex-col items-center py-10 gap-2">
      <div className="relative group">
        {/* 竹蜻蜓动画 */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="w-24 h-2 bg-yellow-500 rounded-full animate-spin flex justify-between px-1 border border-black/10 shadow-sm">
            <div className="w-10 h-1.5 bg-yellow-300 rounded-full"></div>
            <div className="w-10 h-1.5 bg-yellow-300 rounded-full"></div>
          </div>
          <div className="w-1.5 h-6 bg-yellow-700 border-x border-black/10"></div>
        </div>

        {/* 经典多啦A梦头像 */}
        <div className="w-36 h-36 dora-blue rounded-full border-4 border-black relative overflow-hidden flex items-center justify-center shadow-2xl transition-transform hover:scale-105">
            <div className="absolute bottom-0 w-32 h-28 bg-white rounded-[50%_50%_40%_40%] border-2 border-black left-1/2 -translate-x-1/2"></div>
            
            {/* 胡须 */}
            <div className="absolute left-4 top-18 w-8 h-[1.5px] bg-black rotate-12"></div>
            <div className="absolute left-4 top-21 w-8 h-[1.5px] bg-black"></div>
            <div className="absolute left-4 top-24 w-8 h-[1.5px] bg-black -rotate-12"></div>
            <div className="absolute right-4 top-18 w-8 h-[1.5px] bg-black -rotate-12"></div>
            <div className="absolute right-4 top-21 w-8 h-[1.5px] bg-black"></div>
            <div className="absolute right-4 top-24 w-8 h-[1.5px] bg-black rotate-12"></div>

            {/* 眼睛 */}
            <div className="absolute top-6 left-1/2 -translate-x-full w-10 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center">
                <div className="w-2.5 h-4 bg-black rounded-full mb-1"></div>
            </div>
            <div className="absolute top-6 left-1/2 w-10 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center">
                <div className="w-2.5 h-4 bg-black rounded-full mb-1"></div>
            </div>
            
            {/* 鼻子 */}
            <div className="absolute top-15 left-1/2 -translate-x-1/2 w-5 h-5 dora-red border-2 border-black rounded-full z-10 shadow-sm">
                <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 left-1 opacity-80"></div>
            </div>
            
            {/* 嘴巴 */}
            <div className="absolute bottom-6 w-20 h-10 border-b-2 border-black rounded-full"></div>
        </div>

        {/* 铃铛 */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-12 dora-yellow border-4 border-black rounded-full flex items-center justify-center shadow-xl z-30 animate-bounce">
            <div className="w-full h-1 bg-black absolute top-1/2 -translate-y-full"></div>
            <div className="w-3 h-3 bg-[#444] rounded-full mt-2 relative">
                <div className="absolute w-1 h-3 bg-[#444] -bottom-2 left-1/2 -translate-x-1/2"></div>
            </div>
        </div>
      </div>
      
      <h1 className="text-4xl font-black text-sky-600 mt-10 tracking-tight drop-shadow-sm">
        多啦A梦 · <span className="text-sky-500">超级行情</span>作战室
      </h1>
      <div className="flex items-center gap-2 mt-2">
        <span className="h-1 w-8 bg-sky-200 rounded-full"></span>
        <p className="text-sky-500 font-bold bg-white/80 px-4 py-0.5 rounded-full border border-sky-100 text-xs tracking-widest">
          22ND CENTURY REAL-TIME ANALYSIS
        </p>
        <span className="h-1 w-8 bg-sky-200 rounded-full"></span>
      </div>
    </header>
  );
};

export default DoraHeader;