
import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Gift, Zap } from 'lucide-react';

interface Gadget {
  id: number;
  left: number;
  duration: number;
  delay: number;
  type: 'copter' | 'bread' | 'door' | 'light' | 'goldbag';
  isClicked: boolean;
  emoji: string;
  color: string;
}

const GADGET_TYPES = [
  { type: 'copter', label: '竹蜻蜓', color: 'bg-yellow-400', emoji: '🚁' },
  { type: 'bread', label: '记忆面包', color: 'bg-amber-100', emoji: '🍞' },
  { type: 'door', label: '任意门', color: 'bg-pink-500', emoji: '🚪' },
  { type: 'light', label: '缩小灯', color: 'bg-blue-400', emoji: '🔦' },
  { type: 'goldbag', label: '金袋', color: 'bg-red-500', emoji: '💰' },
];

const FallingGadgets: React.FC = () => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [messages, setMessages] = useState<{id: number, text: string}[]>([]);

  const spawnGadget = useCallback(() => {
    const typeInfo = GADGET_TYPES[Math.floor(Math.random() * GADGET_TYPES.length)];
    const newGadget: Gadget = {
      id: Math.random(),
      left: 5 + Math.random() * 85,
      duration: 4 + Math.random() * 6,
      delay: 0,
      type: typeInfo.type as any,
      emoji: typeInfo.emoji,
      color: typeInfo.color,
      isClicked: false,
    };
    setGadgets(prev => [...prev.slice(-10), newGadget]);
  }, []);

  useEffect(() => {
    // Random initial delay and then regular intervals
    const timers: number[] = [];
    
    const startSpawning = () => {
      spawnGadget();
      const nextSpawn = 2000 + Math.random() * 3000;
      timers.push(window.setTimeout(startSpawning, nextSpawn));
    };

    startSpawning();
    return () => timers.forEach(t => clearTimeout(t));
  }, [spawnGadget]);

  const handleClick = (id: number) => {
    setGadgets(prev => 
      prev.map(g => g.id === id ? { ...g, isClicked: true } : g)
    );

    const rewards = [
      "22世纪科技注入，信心大增！",
      "财富金袋开启，财运滚滚！",
      "竹蜻蜓带你飞越牛熊！",
      "记忆面包生效，看穿主力意图！",
      "任意门开启，直达获利终点！"
    ];
    const newMsg = { id: Date.now(), text: rewards[Math.floor(Math.random() * rewards.length)] };
    setMessages(prev => [newMsg, ...prev].slice(0, 3));

    // Remove gadget after animation
    setTimeout(() => {
      setGadgets(prev => prev.filter(g => g.id !== id));
    }, 600);

    // Auto-remove message
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== newMsg.id));
    }, 3000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {gadgets.map((g) => (
        <div
          key={g.id}
          className={`gadget-fall pointer-events-auto ${g.isClicked ? 'transform-to-head' : ''}`}
          style={{
            left: `${g.left}%`,
            animationDuration: `${g.duration}s`,
          }}
          onClick={() => !g.isClicked && handleClick(g.id)}
        >
          {g.isClicked ? (
            <div className="mini-dora-head">
               <div className="mini-eye left"></div>
               <div className="mini-eye right"></div>
               <div className="mini-nose"></div>
            </div>
          ) : (
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-black shadow-xl text-3xl
              ${g.color} transition-all hover:rotate-12`}>
              {g.type === 'goldbag' ? (
                <div className="relative">
                  <span>💰</span>
                  <Sparkles className="absolute -top-1 -right-1 text-yellow-200 w-4 h-4" />
                </div>
              ) : (
                <span>{g.emoji}</span>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Reward Popups */}
      <div className="fixed top-32 right-10 flex flex-col gap-3 pointer-events-none items-end">
        {messages.map((m) => (
          <div key={m.id} className="bg-white/90 border-2 border-sky-400 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-10 fade-in duration-500">
            <div className="w-8 h-8 dora-blue rounded-full flex items-center justify-center border border-black/20">
               <Zap className="text-yellow-400 w-4 h-4 fill-yellow-400" />
            </div>
            <span className="text-sm font-black text-sky-800 tracking-tight">{m.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FallingGadgets;
