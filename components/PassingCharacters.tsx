
import React, { useState, useEffect } from 'react';

interface CharacterInstance {
  id: number;
  type: 'nobita' | 'shizuka';
  direction: 'left' | 'right';
  top: number;
  duration: number;
}

const PassingCharacters: React.FC = () => {
  const [instances, setInstances] = useState<CharacterInstance[]>([]);

  useEffect(() => {
    const spawnCharacter = () => {
      const id = Date.now();
      const type = Math.random() > 0.5 ? 'nobita' : 'shizuka';
      const direction = Math.random() > 0.5 ? 'left' : 'right';
      // Spawn occasionally between 20% and 80% of screen height to avoid header/footer overlap
      const top = 20 + Math.random() * 50;
      const duration = 12 + Math.random() * 8;

      const newInstance: CharacterInstance = { id, type, direction, top, duration };
      setInstances(prev => [...prev, newInstance]);

      // Cleanup instance after animation finished
      setTimeout(() => {
        setInstances(prev => prev.filter(i => i.id !== id));
      }, duration * 1000 + 1000);

      // Schedule next spawn
      const nextSpawn = 15000 + Math.random() * 25000;
      setTimeout(spawnCharacter, nextSpawn);
    };

    const initialTimeout = setTimeout(spawnCharacter, 5000);
    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {instances.map(char => (
        <div
          key={char.id}
          className={`absolute flex flex-col items-center transition-all`}
          style={{
            top: `${char.top}%`,
            animationName: char.direction === 'left' ? 'move-right' : 'move-left',
            animationDuration: `${char.duration}s`,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards'
          }}
        >
          {char.type === 'nobita' ? (
            <div className="relative group scale-75 md:scale-100">
              {/* Nobita Head */}
              <div className="w-16 h-16 bg-[#FFE0BD] rounded-full border-2 border-black relative">
                {/* Hair */}
                <div className="absolute top-0 w-full h-6 bg-black rounded-t-full"></div>
                {/* Glasses */}
                <div className="absolute top-6 left-1 w-6 h-6 border-2 border-black rounded-full bg-white/20"></div>
                <div className="absolute top-6 right-1 w-6 h-6 border-2 border-black rounded-full bg-white/20"></div>
                {/* Eyes */}
                <div className="absolute top-8 left-3 w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="absolute top-8 right-3 w-1.5 h-1.5 bg-black rounded-full"></div>
                {/* Smile */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-full"></div>
              </div>
              {/* Nobita Body */}
              <div className="w-12 h-14 bg-yellow-400 rounded-t-lg border-2 border-black mx-auto -mt-1 relative">
                <div className="w-10 h-10 bg-blue-600 rounded-b-lg border-2 border-black absolute -bottom-8 left-1/2 -translate-x-1/2"></div>
              </div>
              <p className="text-[10px] font-black text-yellow-600 bg-white/80 px-2 py-0.5 rounded-full border border-yellow-200 mt-8 whitespace-nowrap shadow-sm">野比大雄</p>
            </div>
          ) : (
            <div className="relative group scale-75 md:scale-100">
              {/* Shizuka Head */}
              <div className="w-16 h-16 bg-[#FFE0BD] rounded-full border-2 border-black relative">
                {/* Pigtails */}
                <div className="absolute -left-4 top-4 w-6 h-10 bg-black rounded-full -rotate-12"></div>
                <div className="absolute -right-4 top-4 w-6 h-10 bg-black rounded-full rotate-12"></div>
                {/* Hair bang */}
                <div className="absolute top-0 w-full h-5 bg-black rounded-t-full"></div>
                {/* Eyes */}
                <div className="absolute top-7 left-4 w-2 h-2 bg-black rounded-full"></div>
                <div className="absolute top-7 right-4 w-2 h-2 bg-black rounded-full"></div>
                {/* Smile */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-full"></div>
              </div>
              {/* Shizuka Body */}
              <div className="w-14 h-16 bg-pink-400 rounded-t-2xl border-2 border-black mx-auto -mt-1"></div>
              <p className="text-[10px] font-black text-pink-500 bg-white/80 px-2 py-0.5 rounded-full border border-pink-200 mt-2 whitespace-nowrap shadow-sm">源静香</p>
            </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes move-right {
          0% { left: -150px; transform: scaleX(1); }
          100% { left: calc(100vw + 150px); transform: scaleX(1); }
        }
        @keyframes move-left {
          0% { left: calc(100vw + 150px); transform: scaleX(-1); }
          100% { left: -150px; transform: scaleX(-1); }
        }
      `}</style>
    </div>
  );
};

export default PassingCharacters;
