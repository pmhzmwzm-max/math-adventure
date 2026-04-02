# Math Adventure 数学冒险

一个面向儿童的趣味数学学习游戏，通过关卡挑战和宠物收集激发学习兴趣。

## v1.0.0 功能概览

### 核心功能

- **年级选择**: 支持幼儿园、一年级、二年级、三年级四个年级
- **关卡系统**: 每个年级 50 关，循序渐进的数学挑战
- **答题界面**: 清晰的题目展示和答题交互
- **宠物系统**: 收集拼图碎片解锁可爱的伙伴
- **图鉴系统**: 查看已解锁的宠物，选择喜欢的伙伴陪伴学习
- **进度保存**: 使用 localStorage 自动保存游戏进度

### 游戏流程

1. 选择年级开始冒险
2. 在地图上选择关卡
3. 完成数学题目挑战
4. 获得拼图碎片奖励
5. 解锁新宠物伙伴
6. 继续下一关挑战

### 技术栈

- **React 19** - 前端框架
- **Vite 6** - 构建工具
- **Tailwind CSS 4** - 样式系统
- **Motion** - 动画效果
- **Lucide React** - 图标库
- **TypeScript** - 类型安全

## 运行项目

### 前置要求

- Node.js 18+

### 安装步骤

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

开发服务器运行在 http://localhost:3000

## 项目结构

```
src/
├── App.tsx              # 主应用组件
├── main.tsx             # 入口文件
├── components/
│   ├── GradeSelectScreen.tsx  # 年级选择界面
│   ├── MapScreen.tsx          # 关卡地图界面
│   ├── QuizScreen.tsx         # 答题界面
│   ├── ResultScreen.tsx       # 结果界面
│   ├── PokedexScreen.tsx      # 宠物图鉴界面
│   ├── PetUnlockModal.tsx     # 宠物解锁弹窗
│   └── mapScroll.ts           # 地图滚动工具函数
├── data/
│   ├── pets.ts               # 宠物数据
│   ├── questions.ts          # 题目数据
│   └── questionsV2.ts        # 题目数据 V2
└── index.css                 # 全局样式
```

## 版本历史

### v1.0.6
- 修复坐标映射，关卡50在顶部，关卡1在底部

### v1.0.5
- 添加游戏启动器 HTML 页面
- 添加手动滚动按钮用于调试

### v1.0.4
- 增强自动滚动功能
- 增加验证日志

## License

Apache-2.0