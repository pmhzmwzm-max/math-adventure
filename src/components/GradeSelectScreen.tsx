import { motion } from 'motion/react';

// 横2竖4矩阵布局：斜角相连
// 行4: 三年级（右列）
// 行3: 二年级（左列）
// 行2: 一年级（右列）
// 行1: 幼儿园（左列）
const grades = [
  {
    id: 'k',
    name: '幼儿园',
    subtitle: '数感小镇',
    surface: 'bg-[#bef264]',
    shadow: 'shadow-[0_24px_0_#84cc16]',
    borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    elements: (
      <div className="flex items-end justify-center gap-3">
        <span className="text-7xl">🌲</span>
        <span className="text-8xl">🏡</span>
        <span className="text-7xl mb-8">☀️</span>
      </div>
    ),
    col: 'left',
    row: 1,
    zIndex: 40,
  },
  {
    id: '1',
    name: '一年级',
    subtitle: '运算乐园',
    surface: 'bg-[#f9a8d4]',
    shadow: 'shadow-[0_24px_0_#ec4899]',
    borderRadius: '50% 50% 40% 60% / 60% 40% 55% 45%',
    elements: (
      <div className="flex items-end justify-center gap-3">
        <span className="text-7xl">🎡</span>
        <span className="text-8xl">🎪</span>
        <span className="text-7xl">🎠</span>
      </div>
    ),
    col: 'right',
    row: 2,
    zIndex: 30,
  },
  {
    id: '2',
    name: '二年级',
    subtitle: '四则森林',
    surface: 'bg-[#86efac]',
    shadow: 'shadow-[0_24px_0_#22c55e]',
    borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
    elements: (
      <div className="flex items-end justify-center gap-2">
        <span className="text-7xl">🌲</span>
        <span className="text-8xl">🌳</span>
        <span className="text-6xl mb-2">🦉</span>
      </div>
    ),
    col: 'left',
    row: 3,
    zIndex: 20,
  },
  {
    id: '3',
    name: '三年级',
    subtitle: '符号山脉',
    surface: 'bg-[#fde08b]',
    shadow: 'shadow-[0_24px_0_#d9a05b]',
    borderRadius: '45% 55% 40% 60% / 55% 45% 60% 40%',
    elements: (
      <div className="flex items-end justify-center gap-3">
        <span className="text-7xl">🌵</span>
        <span className="text-8xl">⛰️</span>
        <span className="text-7xl mb-6">🏴‍☠️</span>
      </div>
    ),
    col: 'right',
    row: 4,
    zIndex: 10,
  },
];

export default function GradeSelectScreen({ onSelect, gameData }: { onSelect: (gradeId: string) => void, gameData: any }) {
  const activeGradeId = ['3', '2', '1', 'k'].find(id => (gameData[id]?.unlockedLevels?.length || 1) > 1) || 'k';

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#60A5FA] to-[#BAE6FD] relative flex flex-col overflow-hidden">
      {/* Background Clouds */}
      <div className="absolute top-12 left-8 text-5xl opacity-80 animate-pulse">☁️</div>
      <div className="absolute top-20 right-16 text-4xl opacity-60">☁️</div>
      <div className="absolute top-1/3 left-16 text-7xl opacity-90">☁️</div>
      <div className="absolute bottom-1/3 right-12 text-5xl opacity-70">☁️</div>

      {/* Version Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className="text-xs font-medium text-white/60">v1.0.0</span>
      </div>

      {/* Title */}
      <div className="text-center pt-6 pb-2 z-10">
        <h1 className="text-3xl font-black text-white drop-shadow-lg">选择你的冒险世界</h1>
      </div>

      {/* 蛇形路径布局 - 横2竖4 */}
      <div className="flex-1 flex items-center justify-center px-12 pb-6 z-10">
        <div className="relative w-full max-w-4xl" style={{ height: '640px' }}>

          {/* 岛屿节点 */}
          {grades.map((grade, index) => {
            const data = gameData[grade.id];
            const progress = data?.unlockedLevels?.length || 1;
            const isActive = activeGradeId === grade.id;

            // 斜角相连：左列在35%，右列在65%
            const isLeft = grade.col === 'left';
            const row = grade.row;
            const xPos = isLeft ? '35%' : '65%';
            const yPos = `${92 - (row * 20)}%`;

            return (
              <motion.div
                key={grade.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.15, type: 'spring', bounce: 0.4 }}
                whileHover={{ scale: 1.05, y: -6 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(grade.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: xPos,
                  top: yPos,
                  zIndex: isActive ? (grade.zIndex + 50) : grade.zIndex,
                }}
              >
                {/* 岛屿容器 - 放大 */}
                <div className="relative" style={{ width: '340px', height: '200px' }}>
                  {/* 角色标记 - 在岛屿上但不遮挡文字 */}
                  {isActive && (
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
                    >
                      <div className="relative flex flex-col items-center">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl border-3 border-white">
                          <span className="text-3xl">👾</span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[14px] border-t-white border-r-[8px] border-r-transparent"></div>
                        <div className="absolute -bottom-5 w-7 h-2.5 bg-black/25 rounded-full blur-sm"></div>
                      </div>
                    </motion.div>
                  )}

                  {/* Island 3D Base */}
                  <div className="absolute bottom-0 left-0 w-full" style={{ height: '150px' }}>
                    {/* Water ripple */}
                    <div
                      className="absolute -bottom-4 -left-4 w-[115%] h-[135%] bg-white/20 blur-lg"
                      style={{ borderRadius: grade.borderRadius }}
                    />

                    {/* Main Island Surface */}
                    <div
                      className={`absolute inset-0 ${grade.surface} ${grade.shadow} border-4 border-white/40 transition-colors`}
                      style={{ borderRadius: grade.borderRadius }}
                    >
                      <div className="absolute top-6 left-6 w-20 h-10 bg-white/20 rounded-full blur-sm transform -rotate-12"></div>
                      <div className="absolute bottom-6 right-8 w-24 h-12 bg-black/5 rounded-full blur-sm transform rotate-6"></div>
                    </div>
                  </div>

                  {/* Elements */}
                  <div className="absolute top-2 left-0 w-full flex justify-center z-10 pointer-events-none drop-shadow-2xl">
                    {grade.elements}
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-7 py-3 rounded-full shadow-xl border-2 border-white flex flex-col items-center">
                    <div className="text-xl font-black text-gray-800">{grade.name}</div>
                    <div className="text-sm font-bold text-gray-400">{grade.subtitle}</div>
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white text-sm font-black px-2.5 py-1 rounded-full border-2 border-white shadow-md">
                      {progress}/50
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}