import { motion } from 'motion/react';

const grades = [
  {
    id: 'k',
    name: '幼儿园',
    subtitle: '数感小镇',
    islandImage: '/images/幼儿园岛屿icon.png',
    col: 'left',
    row: 1,
    zIndex: 40,
  },
  {
    id: '1',
    name: '一年级',
    subtitle: '运算乐园',
    islandImage: '/images/一年级岛屿icon.png',
    col: 'right',
    row: 2,
    zIndex: 30,
  },
  {
    id: '2',
    name: '二年级',
    subtitle: '四则森林',
    islandImage: '/images/二年级岛屿icon.png',
    col: 'left',
    row: 3,
    zIndex: 20,
  },
  {
    id: '3',
    name: '三年级',
    subtitle: '符号山脉',
    islandImage: '/images/三年级岛屿icon.png',
    col: 'right',
    row: 4,
    zIndex: 10,
  },
];

// 角色头像
const avatarImage = '/images/我的头像.png';

export default function GradeSelectScreen({ onSelect, gameData }: { onSelect: (gradeId: string) => void, gameData: any }) {
  const activeGradeId = ['3', '2', '1', 'k'].find(id => (gameData[id]?.unlockedLevels?.length || 1) > 1) || 'k';

  return (
    <div className="w-full h-full relative flex flex-col overflow-hidden">
      {/* 背景图 */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/岛屿背景.png"
          alt="背景"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 漂浮云朵 - 已在屏幕内，向右飘动 */}
      <div className="absolute inset-0 z-[50] overflow-hidden pointer-events-none">
        {/* 云朵1 - 大白云，初始在屏幕左侧 */}
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 1200 }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
            repeatDelay: 5
          }}
          className="absolute top-[12%]"
        >
          <svg width="160" height="70" viewBox="0 0 160 70" className="opacity-75">
            <defs>
              <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#F0F8FF" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M25,50 Q15,50 15,40 Q15,28 28,28 Q32,15 52,15 Q68,8 88,15 Q102,12 116,24 Q130,20 140,35 Q150,35 150,48 Q150,58 136,58 L35,58 Q25,58 25,50Z"
              fill="url(#cloudGrad1)"
            />
          </svg>
        </motion.div>

        {/* 云朵2 - 中等，初始在屏幕中间 */}
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: 1400 }}
          transition={{
            duration: 65,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
            repeatDelay: 3
          }}
          className="absolute top-[35%]"
        >
          <svg width="130" height="55" viewBox="0 0 130 55" className="opacity-65">
            <defs>
              <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#E8F4FF" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <path
              d="M22,42 Q12,42 12,32 Q12,22 24,22 Q28,12 46,12 Q58,6 74,12 Q86,10 96,20 Q108,16 116,28 Q124,28 124,38 Q124,46 112,46 L26,46 Q22,42 22,42Z"
              fill="url(#cloudGrad2)"
            />
          </svg>
        </motion.div>

        {/* 云朵3 - 小云朵，初始在屏幕右侧 */}
        <motion.div
          initial={{ x: 750 }}
          animate={{ x: 1500 }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
            repeatDelay: 8
          }}
          className="absolute top-[58%]"
        >
          <svg width="90" height="42" viewBox="0 0 90 42" className="opacity-55">
            <defs>
              <linearGradient id="cloudGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#F5FAFF" stopOpacity="0.65" />
              </linearGradient>
            </defs>
            <path
              d="M15,34 Q10,34 10,26 Q10,18 18,18 Q22,10 34,10 Q44,6 54,12 Q64,8 70,18 Q78,18 78,26 Q78,32 68,32 L18,32 Q15,34 15,34Z"
              fill="url(#cloudGrad3)"
            />
          </svg>
        </motion.div>
      </div>

      {/* Version Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className="text-xs font-medium text-white/60">v1.0.0</span>
      </div>

      {/* Title - 最高图层 */}
      <div className="text-center pt-6 pb-2 z-[200] relative">
        <h1 className="text-3xl font-black text-white drop-shadow-lg">选择你的冒险世界</h1>
      </div>

      {/* 蛇形路径布局 - 横2竖4 */}
      <div className="flex-1 flex items-center justify-center px-12 pb-6 z-10">
        <div className="relative w-full max-w-4xl" style={{ height: '640px' }}>

          {/* 岛屿节点 */}
          {grades.map((grade, index) => {
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
                {/* 岛屿容器 - 放大40% */}
                <div className="relative" style={{ width: '392px', height: '252px' }}>
                  {/* 角色头像标记 - 放大10%并居中 */}
                  {isActive && (
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none"
                    >
                      <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-3 border-white overflow-hidden">
                          <img
                            src={avatarImage}
                            alt="我的头像"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[14px] border-t-white border-r-[8px] border-r-transparent"></div>
                        <div className="absolute -bottom-5 w-7 h-2.5 bg-black/25 rounded-full blur-sm"></div>
                      </div>
                    </motion.div>
                  )}

                  {/* 岛屿切图 */}
                  <div className="absolute inset-0 flex justify-center items-center">
                    <img
                      src={grade.islandImage}
                      alt={grade.name}
                      className="w-full h-full object-contain"
                    />
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
