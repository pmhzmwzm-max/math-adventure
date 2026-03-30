import React, { useEffect, useRef, useState } from 'react';
import { Play, Lock, User, Puzzle, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { levelsData } from '../data/questions';

export default function MapScreen({ gradeId, onStart, onOpenPokedex, onBackToGrades, unlockedLevels, puzzlePieces }: { gradeId: string, onStart: (levelId: number) => void, onOpenPokedex: () => void, onBackToGrades: () => void, unlockedLevels: number[], puzzlePieces: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const levels = [
    { id: 1, x: 50, y: 90 },
    { id: 2, x: 20, y: 75 },
    { id: 3, x: 80, y: 60 },
    { id: 4, x: 30, y: 45 },
    { id: 5, x: 70, y: 30 },
    { id: 6, x: 25, y: 15 },
    { id: 7, x: 50, y: 5 },
  ];

  const pathD = `M ${levels[0].x * 4} ${levels[0].y * 12} ` + levels.slice(1).map(l => `L ${l.x * 4} ${l.y * 12}`).join(' ');

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    if (scrollRef.current) {
      setScrollTop(scrollRef.current.scrollTop);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const walk = (e.clientY - startY) * 1.5; // Scroll speed multiplier
    scrollRef.current.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const highestLevelId = Math.max(...unlockedLevels);
      const targetLevel = levels.find(l => l.id === highestLevelId) || levels[0];
      const yPos = (targetLevel.y / 100) * 1200;
      const clientHeight = scrollRef.current.clientHeight;
      
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: yPos - clientHeight / 2 + 80,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlockedLevels]);

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#4facfe] to-[#00f2fe] relative flex flex-col overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] left-[10%] w-32 h-16 bg-white/40 blur-xl rounded-full pointer-events-none"></div>
      <div className="absolute top-[30%] right-[5%] w-40 h-20 bg-white/30 blur-xl rounded-full pointer-events-none"></div>
      <div className="absolute top-[60%] left-[20%] w-48 h-24 bg-white/40 blur-xl rounded-full pointer-events-none"></div>
      <div className="absolute top-[80%] right-[15%] w-36 h-18 bg-white/30 blur-xl rounded-full pointer-events-none"></div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20 pointer-events-none">
        <button onClick={onBackToGrades} className="bg-white/90 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2 shadow-sm pointer-events-auto border-2 border-white active:scale-95 transition-transform">
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
            {gradeId === 'k' ? '幼' : gradeId}
          </div>
          <span className="font-bold text-gray-700">返回年级</span>
        </button>
        <div className="flex flex-col gap-2 pointer-events-auto">
          <button onClick={onOpenPokedex} className="bg-white/90 backdrop-blur rounded-full px-4 py-1.5 flex items-center gap-2 text-gray-700 font-bold shadow-sm border-2 border-white active:scale-95 transition-transform">
            <Puzzle className="text-blue-400" size={20} fill="currentColor" />
            <span>{puzzlePieces % 5}/5</span>
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div 
        ref={scrollRef} 
        className={`flex-1 relative overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="w-full h-[1200px] relative mt-20 mb-20">
          {/* Simple Path - SVG */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 400 1200" preserveAspectRatio="none">
            <path d={pathD} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 30" />
          </svg>

          {/* Nodes */}
          {levels.map((level) => {
            const isUnlocked = unlockedLevels.includes(level.id);
            const isCurrent = Math.max(...unlockedLevels) === level.id;
            const levelInfo = levelsData[level.id];
            
            return (
              <div
                key={level.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-24 h-24"
                style={{ left: `${level.x}%`, top: `${level.y}%` }}
              >
                {/* Title positioned below the island */}
                <div className="absolute top-full mt-2 bg-white/95 px-4 py-1.5 rounded-full text-xs font-black text-gray-600 shadow-md whitespace-nowrap border-2 border-white/50 backdrop-blur-sm z-20">
                  {level.id}. {levelInfo?.title}
                </div>
                
                {isUnlocked ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStart(level.id)}
                    className="relative w-full h-full flex items-center justify-center group z-10"
                  >
                    {/* Character on unlocked node */}
                    {isCurrent && (
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
                        <motion.div
                          animate={{ y: [0, -12, 0] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className="relative z-10"
                        >
                          {/* Pin Container */}
                          <div className="relative w-14 h-20">
                            {/* Map Pin Background */}
                            <div className="absolute top-3 left-0 w-14 h-14 bg-white rounded-t-full rounded-bl-full rounded-br-none transform rotate-45 drop-shadow-md"></div>
                            {/* Inner Circle / Avatar */}
                            <div className="absolute top-4 left-1 z-10 w-12 h-12 bg-gradient-to-br from-indigo-50 to-white rounded-full flex items-center justify-center shadow-inner">
                              <span className="text-3xl">👾</span>
                            </div>
                          </div>
                        </motion.div>
                        {/* Floating Shadow */}
                        <motion.div 
                          animate={{ scale: [1, 0.7, 1], opacity: [0.3, 0.1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className="w-8 h-2 bg-black rounded-full blur-[1.5px] -mt-2 relative z-0"
                        />
                      </div>
                    )}
                    
                    {/* 3D Island Node */}
                    <div className={`relative w-20 h-20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] flex items-center justify-center shadow-[0_8px_0_rgba(0,0,0,0.15)] border-4 border-white/50 transition-all duration-300
                      ${isCurrent ? 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-[0_8px_0_#c2410c,0_0_30px_rgba(250,204,21,0.6)]' : 'bg-gradient-to-br from-green-300 to-green-500 shadow-[0_8px_0_#15803d]'}
                    `}>
                      <span className="text-3xl font-black text-white drop-shadow-md">{level.id}</span>
                    </div>
                  </motion.button>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center opacity-80 z-10">
                    <div className="relative w-16 h-16 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-[0_6px_0_#9ca3af] border-4 border-white/30">
                      <Lock className="text-gray-500" size={24} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
