import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Clock, Zap, Puzzle, BookOpen } from 'lucide-react';

export default function ResultScreen({ stats, puzzlePieces, onBack, onNextLevel, onOpenPokedex, hasNextLevel }: { stats: any, puzzlePieces: number, onBack: () => void, onNextLevel: () => void, onOpenPokedex: () => void, hasNextLevel: boolean }) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getEmotionalText = () => {
    if (stats.accuracy === 100 && stats.maxCombo >= 10) return '超神！';
    if (stats.accuracy === 100) return '完美过关！';
    if (stats.time < 30) return '快如闪电！';
    return '闯关成功！';
  };

  return (
    <div className="w-full h-full bg-[#a881f3] flex flex-col items-center py-12 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-wrap gap-8 justify-center items-center">
         {[...Array(20)].map((_, i) => <span key={i} className="text-6xl">⭐</span>)}
      </div>

      {/* Core Reward: Puzzle Piece */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
        className="mt-4 mb-6 flex flex-col items-center z-10"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400 blur-xl opacity-50 rounded-full"></div>
          <div className="w-24 h-24 bg-gradient-to-br from-blue-300 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white relative z-10 transform rotate-12">
            <Puzzle size={48} className="text-white" fill="currentColor" />
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 font-black text-xl px-3 py-1 rounded-full border-2 border-white z-20 shadow-md">
            +1
          </div>
        </div>
        <div className="text-white font-bold mt-4 text-lg drop-shadow-md">获得角色碎片</div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="text-4xl font-black text-white text-shadow-lg mb-2 tracking-wider text-center"
        style={{ textShadow: '0 4px 0 #ff7a7a, 0 8px 10px rgba(0,0,0,0.2)' }}
      >
        {getEmotionalText()}
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full flex flex-col gap-4 z-10"
      >
        <div className="bg-white/90 backdrop-blur rounded-2xl p-4 flex items-center justify-between shadow-lg relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
              <CheckCircle />
            </div>
            <span className="text-gray-600 font-bold text-lg">正确率</span>
          </div>
          <span className="text-3xl font-black text-orange-500">{stats.accuracy}%</span>
          {stats.accuracy === 100 && (
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-white text-xs font-black px-3 py-1 rounded-full transform rotate-12 border-2 border-white shadow-md">
              Perfect!
            </div>
          )}
        </div>

        <div className="bg-white/90 backdrop-blur rounded-2xl p-4 flex items-center justify-between shadow-lg relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
              <Clock />
            </div>
            <span className="text-gray-600 font-bold text-lg">闯关时间</span>
          </div>
          <span className="text-3xl font-black text-orange-500">{formatTime(stats.time)}</span>
          {stats.time < 30 && (
            <div className="absolute -top-4 -right-4 bg-red-400 text-white text-xs font-black px-3 py-1 rounded-full transform rotate-12 border-2 border-white shadow-md">
              快如闪电
            </div>
          )}
        </div>

        <div className="bg-white/90 backdrop-blur rounded-2xl p-4 flex items-center justify-between shadow-lg relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
              <Zap />
            </div>
            <span className="text-gray-600 font-bold text-lg">最高连击</span>
          </div>
          <span className="text-3xl font-black text-orange-500">{stats.maxCombo}连击</span>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-auto mb-8 w-full flex flex-col gap-3 z-10 px-4"
      >
        {hasNextLevel && (
          <button
            onClick={onNextLevel}
            className="w-full bg-[#2cc4f5] text-white text-2xl font-black py-5 rounded-full shadow-[0_8px_0_#1ba4d0] active:shadow-none active:translate-y-[8px] transition-all"
          >
            下一关
          </button>
        )}
        <button
          onClick={onBack}
          className="w-full bg-white text-gray-700 text-xl font-bold py-4 rounded-full shadow-[0_6px_0_#e5e7eb] active:shadow-none active:translate-y-[6px] transition-all border-2 border-gray-100"
        >
          返回路线
        </button>
        <button
          onClick={onOpenPokedex}
          className="w-full text-white/80 text-lg font-bold py-2 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
        >
          查看图鉴 <BookOpen size={18} />
        </button>
      </motion.div>
    </div>
  );
}
