import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const grades = [
  {
    id: '3',
    name: '三年级',
    subtitle: '符号山脉',
    surface: 'bg-[#fde08b]',
    shadow: 'shadow-[0_24px_0_#d9a05b]',
    borderRadius: '45% 55% 40% 60% / 55% 45% 60% 40%',
    elements: (
      <div className="flex items-end justify-center gap-2">
        <span className="text-6xl">🌵</span>
        <span className="text-8xl">⛰️</span>
        <span className="text-6xl mb-4">🏴‍☠️</span>
      </div>
    ),
    zIndex: 10,
    marginTop: 'mt-0'
  },
  {
    id: '2',
    name: '二年级',
    subtitle: '四则森林',
    surface: 'bg-[#86efac]',
    shadow: 'shadow-[0_24px_0_#22c55e]',
    borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
    elements: (
      <div className="flex items-end justify-center gap-1">
        <span className="text-6xl">🌲</span>
        <span className="text-8xl">🌳</span>
        <span className="text-5xl mb-2">🦉</span>
      </div>
    ),
    zIndex: 20,
    marginTop: '-mt-12'
  },
  {
    id: '1',
    name: '一年级',
    subtitle: '运算乐园',
    surface: 'bg-[#f9a8d4]',
    shadow: 'shadow-[0_24px_0_#ec4899]',
    borderRadius: '50% 50% 40% 60% / 60% 40% 55% 45%',
    elements: (
      <div className="flex items-end justify-center gap-2">
        <span className="text-6xl">🎡</span>
        <span className="text-8xl">🎪</span>
        <span className="text-6xl">🎠</span>
      </div>
    ),
    zIndex: 30,
    marginTop: '-mt-12'
  },
  {
    id: 'k',
    name: '幼儿园',
    subtitle: '数感小镇',
    surface: 'bg-[#bef264]',
    shadow: 'shadow-[0_24px_0_#84cc16]',
    borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    elements: (
      <div className="flex items-end justify-center gap-2">
        <span className="text-6xl">🌲</span>
        <span className="text-8xl">🏡</span>
        <span className="text-6xl mb-6">☀️</span>
      </div>
    ),
    zIndex: 40,
    marginTop: '-mt-12'
  }
];

export default function GradeSelectScreen({ onSelect, gameData }: { onSelect: (gradeId: string) => void, gameData: any }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on mount so Kindergarten is visible if it overflows
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  // Find the highest grade with progress to place the marker
  const activeGradeId = ['3', '2', '1', 'k'].find(id => gameData[id]?.unlockedLevels?.length > 1) || '1';

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#60A5FA] to-[#BAE6FD] relative flex flex-col overflow-hidden">
      {/* Background Clouds */}
      <div className="absolute top-10 left-4 text-6xl opacity-80 animate-pulse">☁️</div>
      <div className="absolute top-40 right-8 text-5xl opacity-60">☁️</div>
      <div className="absolute top-1/3 left-10 text-7xl opacity-90">☁️</div>
      <div className="absolute bottom-1/4 right-12 text-6xl opacity-70">☁️</div>

      {/* Header */}
      <div className="pt-12 pb-2 px-6 z-50 text-center pointer-events-none">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-black text-white tracking-wider mb-2 drop-shadow-md"
          style={{ textShadow: '0 4px 0 #3B82F6' }}
        >
          冒险区域
        </motion.h1>
      </div>

      {/* Map Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden pb-20 pt-10 px-4 z-10 flex flex-col items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {grades.map((grade, index) => {
          const data = gameData[grade.id];
          const progress = data?.unlockedLevels?.length || 1;
          const isActive = activeGradeId === grade.id;
          
          return (
            <motion.div
              key={grade.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.15, type: 'spring', bounce: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(grade.id)}
              className={`relative w-80 h-56 cursor-pointer flex flex-col items-center ${grade.marginTop}`}
              style={{ zIndex: grade.zIndex }}
            >
              {/* Path to next island */}
              {index < grades.length - 1 && (
                <div className="absolute -bottom-12 w-2 h-24 border-l-8 border-dashed border-white/40 z-0"></div>
              )}

              {/* Island 3D Base */}
              <div className="absolute bottom-12 w-72 h-32 pointer-events-none z-0">
                {/* Water ripple effect around the island */}
                <div 
                  className="absolute -bottom-4 -left-4 w-[110%] h-[120%] bg-white/20 blur-md"
                  style={{ borderRadius: grade.borderRadius }}
                ></div>
                
                {/* Main Island Surface */}
                <div 
                  className={`absolute inset-0 ${grade.surface} ${grade.shadow} border-4 border-white/40 transition-colors`}
                  style={{ borderRadius: grade.borderRadius }}
                >
                  {/* Decorative terrain details */}
                  <div className="absolute top-4 left-6 w-16 h-8 bg-white/20 rounded-full blur-sm transform -rotate-12"></div>
                  <div className="absolute bottom-6 right-8 w-20 h-10 bg-black/5 rounded-full blur-sm transform rotate-6"></div>
                  <div className="absolute top-1/2 left-1/2 w-24 h-12 bg-white/10 rounded-full blur-md transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                {/* Floating mini islands */}
                <div className={`absolute top-4 -left-12 w-16 h-8 ${grade.surface} ${grade.shadow} border-2 border-white/40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-90 animate-bounce`} style={{ animationDuration: '4s' }}></div>
                <div className={`absolute bottom-4 -right-8 w-10 h-5 ${grade.surface} ${grade.shadow} border-2 border-white/40 rounded-[60%_40%_55%_45%/45%_55%_40%_60%] opacity-80 animate-bounce`} style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
              </div>

              {/* Elements on top of island */}
              <div className="absolute bottom-20 flex items-end justify-center w-full z-10 pointer-events-none drop-shadow-2xl">
                {grade.elements}
              </div>

              {/* Pin Marker (Current Character) */}
              {isActive && (
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full rounded-br-none transform -rotate-45 flex items-center justify-center shadow-2xl border-4 border-white">
                      <div className="transform rotate-45 text-4xl">👾</div>
                    </div>
                    {/* Pin Shadow */}
                    <div className="absolute -bottom-4 w-8 h-3 bg-black/30 rounded-full blur-sm"></div>
                  </div>
                </motion.div>
              )}

              {/* Label */}
              <div className="absolute -bottom-2 bg-white/95 backdrop-blur-sm px-8 py-2 rounded-full shadow-xl border-4 border-white text-center z-20 flex flex-col items-center">
                <div className="text-2xl font-black text-gray-800">{grade.name}</div>
                <div className="text-sm font-bold text-gray-400">{grade.subtitle}</div>
                
                {/* Progress indicator */}
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-black px-3 py-1 rounded-full border-2 border-white shadow-md">
                  {progress}/7
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}