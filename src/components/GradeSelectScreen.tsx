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
