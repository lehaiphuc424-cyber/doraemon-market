
import React from 'react';

const WalkingMascots: React.FC = () => {
  return (
    <div className="walking-container">
      {/* Sakura Mascot (Simplified CSS Art) */}
      <div className="walking-mascot relative flex flex-col items-center">
         <div className="w-16 h-16 bg-pink-100 rounded-full border-2 border-black relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#FFD1DC] rounded-full border border-black/10"></div>
            {/* Sakura Eyes */}
            <div className="absolute top-6 left-4 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-6 right-4 w-2 h-2 bg-black rounded-full"></div>
            {/* Smile */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-full"></div>
         </div>
         <div className="w-14 h-14 bg-pink-200 rounded-t-xl border-2 border-black -mt-1"></div>
         <p className="text-[10px] font-black text-pink-600 bg-white/80 px-1 rounded">百变小樱</p>
      </div>

      {/* Hand holding line */}
      <div className="w-8 h-1 bg-black self-center mb-10"></div>

      {/* Doraemon Mascot */}
      <div className="walking-mascot relative flex flex-col items-center">
         <div className="w-16 h-16 bg-[#00A0E9] rounded-full border-2 border-black relative overflow-hidden">
            <div className="absolute bottom-0 w-14 h-12 bg-white rounded-full left-1/2 -translate-x-1/2 border border-black/20"></div>
            <div className="absolute top-4 left-4 w-3 h-4 bg-white border border-black rounded-full"></div>
            <div className="absolute top-4 right-4 w-3 h-4 bg-white border border-black rounded-full"></div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full border border-black"></div>
         </div>
         <div className="w-14 h-14 bg-[#00A0E9] rounded-t-xl border-2 border-black -mt-1 flex items-center justify-center">
             <div className="w-8 h-8 bg-white rounded-full border border-black/20 -mb-4"></div>
         </div>
         <p className="text-[10px] font-black text-sky-600 bg-white/80 px-1 rounded">多啦A梦</p>
      </div>
    </div>
  );
};

export default WalkingMascots;
