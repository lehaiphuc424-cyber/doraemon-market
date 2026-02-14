
import React from 'react';
import { Target, ShieldCheck, Map } from 'lucide-react';

interface Props {
  analysis: string;
}

const MarketOverview: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="mt-12 glass-card border-sky-400 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-sky-900/10 p-4 border-b-2 border-sky-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Map className="text-sky-600 w-6 h-6" />
          <h2 className="text-xl font-black text-sky-800 tracking-tighter uppercase">Global Command Center</h2>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-sky-400 tracking-widest uppercase">Encryption Active</span>
        </div>
      </div>
      
      <div className="p-8 bg-white/40">
        <div className="prose prose-sky max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans text-lg">
            {analysis.split('\n').map((line, i) => {
              if (line.startsWith('###')) return <h3 key={i} className="text-2xl font-black text-sky-900 mt-2 mb-6 border-l-8 border-sky-500 pl-4">{line.replace('###', '').trim()}</h3>;
              if (line.startsWith('*')) {
                const [label, ...content] = line.replace('*', '').split(':');
                return (
                  <div key={i} className="flex items-start gap-4 mb-4 group">
                    <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-sky-500 group-hover:scale-150 transition-transform"></div>
                    <p className="font-bold text-gray-800">
                      <span className="text-sky-600">{label}:</span> 
                      <span className="ml-2 font-medium">{content.join(':')}</span>
                    </p>
                  </div>
                );
              }
              return line.trim() ? <p key={i} className="mb-4 text-gray-600 font-semibold italic border-b border-sky-50 pb-2">{line}</p> : null;
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4 border-t-2 border-dotted border-sky-100 pt-6">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-black uppercase">
                <ShieldCheck size={16} />
                Strategic Stability: Verified
            </div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-black uppercase">
                <Target size={16} />
                Future Projection: Locked
            </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
