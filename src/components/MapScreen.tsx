import { useRef, useEffect } from 'react';
import { Lock, Puzzle } from 'lucide-react';
import { motion } from 'motion/react';
import { allLevelsData } from '../data/questions';

const MAX_LEVELS = 50;

export default function MapScreen({
  gradeId,
  onStart,
  onOpenPokedex,
  onBackToGrades,
  unlockedLevels,
  puzzlePieces,
  maxLevels = MAX_LEVELS
}: {
  gradeId: string;
  onStart: (levelId: number) => void;
  onOpenPokedex: () => void;
  onBackToGrades: () => void;
  unlockedLevels: number[];
  puzzlePieces: number;
  maxLevels?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const gradeNames: Record<string, string> = {
    'k': '幼儿园',
    '1': '一年级',
    '2': '二年级',
    '3': '三年级'
  };

  const gradeData = allLevelsData[gradeId as keyof typeof allLevelsData];

  // 纵向拉开的蜿蜒路径 - 每个关卡之间间距更大
  const levels = [
    // 第1行 (1-4)
    { id: 1, top: 96, left: 50 },
    { id: 2, top: 92, left: 28 },
    { id: 3, top: 88, left: 68 },
    { id: 4, top: 84, left: 40 },

    // 第2行 (5-8)
    { id: 5, top: 80, left: 72 },
    { id: 6, top: 76, left: 35 },
    { id: 7, top: 72, left: 55 },
    { id: 8, top: 68, left: 22 },

    // 第3行 (9-12)
    { id: 9, top: 64, left: 62 },
    { id: 10, top: 60, left: 42 },
    { id: 11, top: 56, left: 78 },
    { id: 12, top: 52, left: 30 },

    // 第4行 (13-16)
    { id: 13, top: 48, left: 52 },
    { id: 14, top: 44, left: 72 },
    { id: 15, top: 40, left: 38 },
    { id: 16, top: 36, left: 58 },

    // 第5行 (17-20)
    { id: 17, top: 32, left: 25 },
    { id: 18, top: 28, left: 48 },
    { id: 19, top: 24, left: 68 },
    { id: 20, top: 20, left: 35 },

    // 第6行 (21-24)
    { id: 21, top: 16, left: 55 },
    { id: 22, top: 12, left: 75 },
    { id: 23, top: 8, left: 42 },
    { id: 24, top: 4, left: 62 },

    // 第7行 (25-28)
    { id: 25, top: 0, left: 30 },
    { id: 26, top: -4, left: 52 },
    { id: 27, top: -8, left: 70 },
    { id: 28, top: -12, left: 40 },

    // 第8行 (29-32)
    { id: 29, top: -16, left: 58 },
    { id: 30, top: -20, left: 25 },
    { id: 31, top: -24, left: 48 },
    { id: 32, top: -28, left: 72 },

    // 第9行 (33-36)
    { id: 33, top: -32, left: 38 },
    { id: 34, top: -36, left: 62 },
    { id: 35, top: -40, left: 32 },
    { id: 36, top: -44, left: 55 },

    // 第10行 (37-40)
    { id: 37, top: -48, left: 75 },
    { id: 38, top: -52, left: 42 },
    { id: 39, top: -56, left: 22 },
    { id: 40, top: -60, left: 58 },

    // 第11行 (41-44)
    { id: 41, top: -64, left: 38 },
    { id: 42, top: -68, left: 68 },
    { id: 43, top: -72, left: 48 },
    { id: 44, top: -76, left: 28 },

    // 第12行 (45-48)
    { id: 45, top: -80, left: 62 },
    { id: 46, top: -84, left: 42 },
    { id: 47, top: -88, left: 72 },
    { id: 48, top: -92, left: 52 },

    // 终点 (49-50)
    { id: 49, top: -96, left: 35 },
    { id: 50, top: -100, left: 50 },
  ];

  // 滚动到最新解锁的关卡
  useEffect(() => {
    if (scrollRef.current && unlockedLevels.length > 0) {
      const highestLevel = Math.max(...unlockedLevels);
      const targetLevel = levels.find(l => l.id === highestLevel);
      if (targetLevel) {
        setTimeout(() => {
          if (scrollRef.current) {
            // 计算目标位置 (top是百分比，负数表示在顶部以上)
            const totalHeight = scrollRef.current.scrollHeight;
            const clientHeight = scrollRef.current.clientHeight;
            // 将 top 转换为实际位置 (top=96 在底部, top=-100 在顶部)
            const normalizedTop = 96 - targetLevel.top; // 转换为正向值
            const targetY = (normalizedTop / 200) * totalHeight; // 200是总范围
            scrollRef.current.scrollTo({
              top: targetY - clientHeight / 2,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    }
  }, [unlockedLevels]);

  // 生成连接每个关卡的直线路径
  const generatePath = () => {
    const unlocked = levels.filter(l => unlockedLevels.includes(l.id));
    if (unlocked.length === 0) return '';

    let path = `M ${unlocked[0].left} ${unlocked[0].top}`;
    for (let i = 1; i < unlocked.length; i++) {
      path += ` L ${unlocked[i].left} ${unlocked[i].top}`;
    }
    return path;
  };

  // 生成完整路径（包含未解锁的虚线部分）
  const generateFullPath = () => {
    let path = `M ${levels[0].left} ${levels[0].top}`;
    for (let i = 1; i < levels.length; i++) {
      path += ` L ${levels[i].left} ${levels[i].top}`;
    }
    return path;
  };

  // 获取最高解锁关卡的索引
  const highestUnlockedIndex = levels.findIndex(l => l.id === Math.max(...unlockedLevels, 0));

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#4facfe] to-[#00f2fe] relative flex flex-col overflow-hidden">
      {/* 顶部导航栏 */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20 pointer-events-none">
        <button
          onClick={onBackToGrades}
          className="bg-white/95 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2 shadow-lg pointer-events-auto border-2 border-white active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
            {gradeId === 'k' ? '幼' : gradeId}
          </div>
          <span className="font-bold text-gray-700">{gradeNames[gradeId] || '一年级'}</span>
        </button>
        <button
          onClick={onOpenPokedex}
          className="bg-white/95 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2 text-gray-700 font-bold shadow-lg pointer-events-auto border-2 border-white active:scale-95 transition-transform"
        >
          <Puzzle className="text-blue-400" size={20} fill="currentColor" />
          <span>{puzzlePieces % 5}/5</span>
        </button>
      </div>

      {/* 地图区域 - 可滚动 */}
      <div
        ref={scrollRef}
        className="flex-1 relative overflow-y-auto overflow-x-hidden mt-16"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        <div className="w-full relative" style={{ height: '250%' }}>
          {/* SVG路径 */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 200"
            preserveAspectRatio="none"
          >
            {/* 未解锁路径（虚线） */}
            {highestUnlockedIndex < levels.length - 1 && (
              <path
                d={`M ${levels[highestUnlockedIndex].left} ${levels[highestUnlockedIndex].top} ${levels.slice(highestUnlockedIndex + 1).map(l => `L ${l.left} ${l.top}`).join(' ')}`}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2 4"
              />
            )}

            {/* 已解锁路径 */}
            <path
              d={generatePath()}
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 路径高光 */}
            <path
              d={generatePath()}
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="0.5 3"
            />
          </svg>

          {/* 关卡节点 */}
          {levels.map((level) => {
            const isUnlocked = unlockedLevels.includes(level.id);
            const isCurrent = Math.max(...unlockedLevels, 0) === level.id && isUnlocked;
            const isCompleted = unlockedLevels.includes(level.id + 1);
            const levelInfo = gradeData?.[level.id];

            return (
              <div
                key={level.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{
                  left: `${level.left}%`,
                  top: `${(96 - level.top) / 2}%`, // 转换坐标
                  zIndex: 10,
                }}
              >
                {/* 标题（每隔5关显示） */}
                {(level.id === 1 || level.id % 5 === 0) && levelInfo && (
                  <div className="absolute top-full mt-2 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-lg whitespace-nowrap border border-white/80 z-20">
                    {level.id}. {levelInfo.title.length > 6 ? levelInfo.title.slice(0, 6) + '..' : levelInfo.title}
                  </div>
                )}

                {isUnlocked ? (
                  <motion.button
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onStart(level.id)}
                    className="relative flex flex-col items-center cursor-pointer"
                  >
                    {/* 完成标记 */}
                    {isCompleted && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md z-10">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}

                    {/* 当前关卡标记 */}
                    {isCurrent && (
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        className="absolute -top-7"
                      >
                        <span className="text-xl">👾</span>
                      </motion.div>
                    )}

                    {/* 关卡按钮 */}
                    <div
                      className={`relative flex items-center justify-center transition-all duration-300 ${
                        isCurrent ? 'drop-shadow-[0_0_15px_rgba(255,193,7,0.7)]' : ''
                      }`}
                    >
                      {/* 底座阴影 */}
                      <div
                        className={`absolute top-2 w-12 h-2.5 rounded-full ${
                          isCurrent ? 'bg-orange-600/40' : isCompleted ? 'bg-green-700/30' : 'bg-blue-700/30'
                        }`}
                      />
                      {/* 主体 */}
                      <div
                        className={`relative flex items-center justify-center border-3 border-white shadow-lg ${
                          isCurrent
                            ? 'bg-gradient-to-br from-yellow-300 to-orange-400'
                            : isCompleted
                            ? 'bg-gradient-to-br from-green-300 to-green-500'
                            : 'bg-gradient-to-br from-blue-300 to-blue-500'
                        }`}
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '40% 60% 65% 35% / 45% 50% 55% 50%',
                          boxShadow: isCurrent
                            ? '0 6px 0 #E65100, 0 8px 15px rgba(0,0,0,0.2)'
                            : isCompleted
                            ? '0 6px 0 #2E7D32, 0 8px 15px rgba(0,0,0,0.15)'
                            : '0 6px 0 #1976D2, 0 8px 15px rgba(0,0,0,0.15)'
                        }}
                      >
                        <span className="text-xl font-black text-white drop-shadow-md">{level.id}</span>
                      </div>
                      {/* 高光 */}
                      <div className="absolute top-1.5 left-2 w-3 h-1.5 bg-white/40 rounded-full" />
                    </div>
                  </motion.button>
                ) : (
                  <div className="relative flex items-center justify-center opacity-60">
                    {/* 锁定的关卡 */}
                    <div
                      className="bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border-2 border-white/50 shadow-md"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '35% 65% 70% 30% / 40% 55% 50% 45%',
                        boxShadow: '0 5px 0 #9ca3af'
                      }}
                    >
                      <Lock className="text-gray-500" size={20} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* 终点旗帜 */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${(96 - levels[49].top) / 2 + 1}%` }}
          >
            <motion.div
              animate={{ rotate: [0, 8, 0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-2xl"
            >
              🏆
            </motion.div>
          </div>
        </div>
      </div>

      {/* 底部进度条 */}
      <div className="px-4 pb-3 pt-2 bg-white/20 backdrop-blur-sm">
        <div className="flex items-center justify-between text-white text-sm font-medium mb-1">
          <span>进度</span>
          <span>{unlockedLevels.length} / {maxLevels}</span>
        </div>
        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(unlockedLevels.length / maxLevels) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}