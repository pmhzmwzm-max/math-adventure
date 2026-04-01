/**
 * Math Adventure 题目数据
 * 基于《人教版小学数学》知识点体系
 * 4个年级 × 50关 × 10题 = 2000题
 */

export type QuestionType =
  | 'vertical_addition'  // 竖式计算
  | 'number_comparison'  // 比较大小
  | 'text_to_number'     // 读作写作
  | 'counting'           // 数物对应
  | 'choice'             // 选择题
  | 'input';             // 输入题

export interface Question {
  id: string;
  type: QuestionType;
  text?: string;
  label?: string;
  num1?: number;
  num2?: number;
  num3?: number;  // 多重竖式用
  operator?: '+' | '-' | '×' | '÷';
  question?: string;
  emoji?: string;
  count?: number;
  options?: string[];
  answer: string;
  answerLength: number;
}

export interface LevelData {
  title: string;
  questions: Question[];
}

// ============================================
// 幼儿园 50关
// ============================================
const kindergartenLevels: Record<number, LevelData> = {};

// 单元1：数字认识（1-10关）
for (let i = 1; i <= 10; i++) {
  kindergartenLevels[i] = {
    title: `数字认识 ${i}`,
    questions: generateKindergartenNumberQuestions(i)
  };
}

// 单元2：比较大小（11-20关）
for (let i = 11; i <= 20; i++) {
  kindergartenLevels[i] = {
    title: `比较大小 ${i - 10}`,
    questions: generateKindergartenComparisonQuestions(i)
  };
}

// 单元3：简单加法（21-35关）
for (let i = 21; i <= 35; i++) {
  kindergartenLevels[i] = {
    title: `简单加法 ${i - 20}`,
    questions: generateKindergartenAdditionQuestions(i)
  };
}

// 单元4：简单减法（36-50关）
for (let i = 36; i <= 50; i++) {
  kindergartenLevels[i] = {
    title: `简单减法 ${i - 35}`,
    questions: generateKindergartenSubtractionQuestions(i)
  };
}

// ============================================
// 一年级 50关
// ============================================
const grade1Levels: Record<number, LevelData> = {};

// 单元1：1-5加减（1-8关）
for (let i = 1; i <= 8; i++) {
  grade1Levels[i] = {
    title: `1-5加减 ${i}`,
    questions: generateGrade1_1to5Questions(i)
  };
}

// 单元2：6-10加减（9-16关）
for (let i = 9; i <= 16; i++) {
  grade1Levels[i] = {
    title: `6-10加减 ${i - 8}`,
    questions: generateGrade1_6to10Questions(i)
  };
}

// 单元3：凑十练习（17-22关）
for (let i = 17; i <= 22; i++) {
  grade1Levels[i] = {
    title: `凑十练习 ${i - 16}`,
    questions: generateGrade1MakeTenQuestions(i)
  };
}

// 单元4：20以内进位加（23-32关）
for (let i = 23; i <= 32; i++) {
  grade1Levels[i] = {
    title: `进位加法 ${i - 22}`,
    questions: generateGrade1CarryAdditionQuestions(i)
  };
}

// 单元5：20以内退位减（33-42关）
for (let i = 33; i <= 42; i++) {
  grade1Levels[i] = {
    title: `退位减法 ${i - 32}`,
    questions: generateGrade1BorrowSubtractionQuestions(i)
  };
}

// 单元6：综合运算（43-50关）
for (let i = 43; i <= 50; i++) {
  grade1Levels[i] = {
    title: `综合练习 ${i - 42}`,
    questions: generateGrade1MixedQuestions(i)
  };
}

// ============================================
// 二年级 50关
// ============================================
const grade2Levels: Record<number, LevelData> = {};

// 单元1：100以内加减（1-8关）
for (let i = 1; i <= 8; i++) {
  grade2Levels[i] = {
    title: `100以内加减 ${i}`,
    questions: generateGrade2_100AddSubQuestions(i)
  };
}

// 单元2：乘法初步（9-14关）
for (let i = 9; i <= 14; i++) {
  grade2Levels[i] = {
    title: `乘法初步 ${i - 8}`,
    questions: generateGrade2MultiplicationIntroQuestions(i)
  };
}

// 单元3：2-6乘法口诀（15-22关）
for (let i = 15; i <= 22; i++) {
  grade2Levels[i] = {
    title: `2-6乘法口诀 ${i - 14}`,
    questions: generateGrade2Multiply2to6Questions(i)
  };
}

// 单元4：7-9乘法口诀（23-30关）
for (let i = 23; i <= 30; i++) {
  grade2Levels[i] = {
    title: `7-9乘法口诀 ${i - 22}`,
    questions: generateGrade2Multiply7to9Questions(i)
  };
}

// 单元5：表内除法（31-38关）
for (let i = 31; i <= 38; i++) {
  grade2Levels[i] = {
    title: `表内除法 ${i - 30}`,
    questions: generateGrade2DivisionQuestions(i)
  };
}

// 单元6：混合运算（39-50关）
for (let i = 39; i <= 50; i++) {
  grade2Levels[i] = {
    title: `混合运算 ${i - 38}`,
    questions: generateGrade2MixedQuestions(i)
  };
}

// ============================================
// 三年级 50关
// ============================================
const grade3Levels: Record<number, LevelData> = {};

// 单元1：万以内加减（1-10关）
for (let i = 1; i <= 10; i++) {
  grade3Levels[i] = {
    title: `万以内加减 ${i}`,
    questions: generateGrade3_10000AddSubQuestions(i)
  };
}

// 单元2：测量单位（11-18关）
for (let i = 11; i <= 18; i++) {
  grade3Levels[i] = {
    title: `单位换算 ${i - 10}`,
    questions: generateGrade3UnitQuestions(i)
  };
}

// 单元3：倍的认识（19-24关）
for (let i = 19; i <= 24; i++) {
  grade3Levels[i] = {
    title: `倍的认识 ${i - 18}`,
    questions: generateGrade3MultipleQuestions(i)
  };
}

// 单元4：多位乘一位（25-32关）
for (let i = 25; i <= 32; i++) {
  grade3Levels[i] = {
    title: `多位乘一位 ${i - 24}`,
    questions: generateGrade3MultiplyQuestions(i)
  };
}

// 单元5：除数一位数（33-40关）
for (let i = 33; i <= 40; i++) {
  grade3Levels[i] = {
    title: `除数一位数 ${i - 32}`,
    questions: generateGrade3DivisionQuestions(i)
  };
}

// 单元6：综合运算（41-50关）
for (let i = 41; i <= 50; i++) {
  grade3Levels[i] = {
    title: `综合练习 ${i - 40}`,
    questions: generateGrade3MixedQuestions(i)
  };
}

// ============================================
// 生成函数 - 幼儿园
// ============================================

function generateKindergartenNumberQuestions(level: number): Question[] {
  const questions: Question[] = [];
  const emojis = ['🍎', '⭐', '🌸', '🐱', '🌈', '🟦', '🔶', '🟢', '🔵', '🟡'];

  for (let q = 1; q <= 10; q++) {
    const count = (level * 10 + q) % 10 + 1; // 1-10
    const emoji = emojis[(level + q) % emojis.length];

    // 数物对应题
    questions.push({
      id: `k_${level}_${q}`,
      type: 'counting',
      emoji: emoji,
      count: count,
      answer: count.toString(),
      answerLength: 1
    });
  }
  return questions;
}

function generateKindergartenComparisonQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const num1 = ((level - 11) * 10 + q) % 10 + 1;
    const num2 = ((level - 11) * 10 + q + 3) % 10 + 1;

    questions.push({
      id: `k_${level}_${q}`,
      type: 'number_comparison',
      num1: num1,
      num2: num2,
      answer: num1 > num2 ? '>' : num1 < num2 ? '<' : '=',
      answerLength: 1
    });
  }
  return questions;
}

function generateKindergartenAdditionQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    // 10以内加法
    const a = ((level - 21) * 10 + q) % 5 + 1;
    const b = Math.min(10 - a, ((level - 21) * 10 + q + 2) % 5 + 1);
    const sum = a + b;

    questions.push({
      id: `k_${level}_${q}`,
      type: 'vertical_addition',
      num1: a,
      num2: b,
      operator: '+',
      answer: sum.toString(),
      answerLength: sum >= 10 ? 2 : 1
    });
  }
  return questions;
}

function generateKindergartenSubtractionQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    // 10以内减法
    const a = ((level - 36) * 10 + q) % 5 + 5; // 5-9
    const b = ((level - 36) * 10 + q + 1) % (a - 1) + 1; // 1到a-1
    const diff = a - b;

    questions.push({
      id: `k_${level}_${q}`,
      type: 'vertical_addition',
      num1: a,
      num2: b,
      operator: '-',
      answer: diff.toString(),
      answerLength: 1
    });
  }
  return questions;
}

// ============================================
// 生成函数 - 一年级
// ============================================

function generateGrade1_1to5Questions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const a = ((level - 1) * 10 + q) % 5 + 1;
    const b = ((level - 1) * 10 + q + 1) % 5 + 1;
    const isAdd = ((level - 1) * 10 + q) % 2 === 0;

    if (isAdd) {
      questions.push({
        id: `g1_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '+',
        answer: (a + b).toString(),
        answerLength: a + b >= 10 ? 2 : 1
      });
    } else {
      const bigger = Math.max(a, b);
      const smaller = Math.min(a, b);
      questions.push({
        id: `g1_${level}_${q}`,
        type: 'vertical_addition',
        num1: bigger,
        num2: smaller,
        operator: '-',
        answer: (bigger - smaller).toString(),
        answerLength: 1
      });
    }
  }
  return questions;
}

function generateGrade1_6to10Questions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const a = ((level - 9) * 10 + q) % 5 + 6; // 6-10
    const b = ((level - 9) * 10 + q + 1) % 5 + 1; // 1-5
    const isAdd = ((level - 9) * 10 + q) % 2 === 0;

    if (isAdd) {
      const sum = a + b;
      questions.push({
        id: `g1_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '+',
        answer: sum.toString(),
        answerLength: sum >= 10 ? 2 : 1
      });
    } else {
      questions.push({
        id: `g1_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '-',
        answer: (a - b).toString(),
        answerLength: 1
      });
    }
  }
  return questions;
}

function generateGrade1MakeTenQuestions(level: number): Question[] {
  const questions: Question[] = [];
  const pairs = [[1,9], [2,8], [3,7], [4,6], [5,5], [6,4], [7,3], [8,2], [9,1]];

  for (let q = 1; q <= 10; q++) {
    const pair = pairs[(q - 1) % pairs.length];

    questions.push({
      id: `g1_${level}_${q}`,
      type: 'vertical_addition',
      num1: pair[0],
      num2: pair[1],
      operator: '+',
      answer: '10',
      answerLength: 2
    });
  }
  return questions;
}

function generateGrade1CarryAdditionQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    // 20以内进位加：9+几、8+几、7+几
    const bigs = [9, 8, 7, 6];
    const big = bigs[((level - 23) * 10 + q) % bigs.length];
    const small = ((level - 23) * 10 + q) % 5 + 2; // 2-6
    const sum = big + small;

    questions.push({
      id: `g1_${level}_${q}`,
      type: 'vertical_addition',
      num1: big,
      num2: small,
      operator: '+',
      answer: sum.toString(),
      answerLength: 2
    });
  }
  return questions;
}

function generateGrade1BorrowSubtractionQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    // 20以内退位减：十几减几
    const tens = [11, 12, 13, 14, 15, 16, 17, 18];
    const minuend = tens[((level - 33) * 10 + q) % tens.length];
    const subtrahend = ((level - 33) * 10 + q) % 8 + 3; // 3-10
    const diff = minuend - subtrahend;

    questions.push({
      id: `g1_${level}_${q}`,
      type: 'vertical_addition',
      num1: minuend,
      num2: subtrahend,
      operator: '-',
      answer: diff.toString(),
      answerLength: diff >= 10 ? 2 : 1
    });
  }
  return questions;
}

function generateGrade1MixedQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const type = ((level - 43) * 10 + q) % 3;

    if (type === 0) {
      // 加法
      const a = ((level - 43) * 10 + q) % 10 + 5;
      const b = ((level - 43) * 10 + q + 2) % 10 + 1;
      const sum = a + b;
      questions.push({
        id: `g1_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '+',
        answer: sum.toString(),
        answerLength: 2
      });
    } else if (type === 1) {
      // 减法
      const a = ((level - 43) * 10 + q) % 8 + 12; // 12-19
      const b = ((level - 43) * 10 + q + 1) % 9 + 2; // 2-10
      const diff = a - b;
      questions.push({
        id: `g1_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '-',
        answer: diff.toString(),
        answerLength: diff >= 10 ? 2 : 1
      });
    } else {
      // 比较
      const num1 = ((level - 43) * 10 + q) % 15 + 5;
      const num2 = ((level - 43) * 10 + q + 3) % 15 + 5;
      questions.push({
        id: `g1_${level}_${q}`,
        type: 'number_comparison',
        num1: num1,
        num2: num2,
        answer: num1 > num2 ? '>' : num1 < num2 ? '<' : '=',
        answerLength: 1
      });
    }
  }
  return questions;
}

// ============================================
// 生成函数 - 二年级
// ============================================

function generateGrade2_100AddSubQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const isAdd = ((level - 1) * 10 + q) % 2 === 0;

    if (isAdd) {
      const a = ((level - 1) * 10 + q) * 7 % 50 + 20; // 20-69
      const b = ((level - 1) * 10 + q) * 3 % 30 + 10; // 10-39
      const sum = a + b;
      questions.push({
        id: `g2_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '+',
        answer: sum.toString(),
        answerLength: sum >= 100 ? 3 : 2
      });
    } else {
      const a = ((level - 1) * 10 + q) * 5 % 50 + 50; // 50-99
      const b = ((level - 1) * 10 + q) * 3 % 30 + 10; // 10-39
      const diff = a - b;
      questions.push({
        id: `g2_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '-',
        answer: diff.toString(),
        answerLength: diff >= 10 ? 2 : 1
      });
    }
  }
  return questions;
}

function generateGrade2MultiplicationIntroQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    // 2-5的乘法
    const a = ((level - 9) * 10 + q) % 4 + 2; // 2-5
    const b = ((level - 9) * 10 + q + 1) % 5 + 1; // 1-5
    const product = a * b;

    questions.push({
      id: `g2_${level}_${q}`,
      type: 'input',
      question: `${a} × ${b} =`,
      answer: product.toString(),
      answerLength: product >= 10 ? 2 : 1
    });
  }
  return questions;
}

function generateGrade2Multiply2to6Questions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const a = ((level - 15) / 8 * 2 + 2) % 5 + 2; // 2-6
    const b = ((level - 15) * 10 + q) % 9 + 1; // 1-9
    const product = a * b;

    questions.push({
      id: `g2_${level}_${q}`,
      type: 'input',
      question: `${a} × ${b} =`,
      answer: product.toString(),
      answerLength: product >= 10 ? 2 : 1
    });
  }
  return questions;
}

function generateGrade2Multiply7to9Questions(level: number): Question[] {
  const questions: Question[] = [];
  const sevens = [7, 8, 9];

  for (let q = 1; q <= 10; q++) {
    const a = sevens[((level - 23) * 10 + q) % 3];
    const b = ((level - 23) * 10 + q) % 9 + 1;
    const product = a * b;

    questions.push({
      id: `g2_${level}_${q}`,
      type: 'input',
      question: `${a} × ${b} =`,
      answer: product.toString(),
      answerLength: product >= 10 ? 2 : 1
    });
  }
  return questions;
}

function generateGrade2DivisionQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    // 表内除法
    const b = ((level - 31) * 10 + q) % 9 + 1; // 除数 1-9
    const quotient = ((level - 31) * 10 + q) % 9 + 1; // 商 1-9
    const a = b * quotient; // 被除数

    questions.push({
      id: `g2_${level}_${q}`,
      type: 'input',
      question: `${a} ÷ ${b} =`,
      answer: quotient.toString(),
      answerLength: quotient >= 10 ? 2 : 1
    });
  }
  return questions;
}

function generateGrade2MixedQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const type = ((level - 39) * 10 + q) % 4;

    if (type === 0) {
      // 乘法
      const a = ((level - 39) * 10 + q) % 9 + 1;
      const b = ((level - 39) * 10 + q + 1) % 9 + 1;
      const product = a * b;
      questions.push({
        id: `g2_${level}_${q}`,
        type: 'input',
        question: `${a} × ${b} =`,
        answer: product.toString(),
        answerLength: product >= 10 ? 2 : 1
      });
    } else if (type === 1) {
      // 除法
      const b = ((level - 39) * 10 + q) % 9 + 1;
      const quotient = ((level - 39) * 10 + q + 2) % 9 + 1;
      const a = b * quotient;
      questions.push({
        id: `g2_${level}_${q}`,
        type: 'input',
        question: `${a} ÷ ${b} =`,
        answer: quotient.toString(),
        answerLength: 1
      });
    } else if (type === 2) {
      // 加减
      const a = ((level - 39) * 10 + q) * 7 % 50 + 30;
      const b = ((level - 39) * 10 + q) * 3 % 30 + 10;
      const sum = a + b;
      questions.push({
        id: `g2_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '+',
        answer: sum.toString(),
        answerLength: sum >= 100 ? 3 : 2
      });
    } else {
      // 比较
      const num1 = ((level - 39) * 10 + q) * 5 + 10;
      const num2 = ((level - 39) * 10 + q) * 4 + 15;
      questions.push({
        id: `g2_${level}_${q}`,
        type: 'number_comparison',
        num1: num1,
        num2: num2,
        answer: num1 > num2 ? '>' : num1 < num2 ? '<' : '=',
        answerLength: 1
      });
    }
  }
  return questions;
}

// ============================================
// 生成函数 - 三年级
// ============================================

function generateGrade3_10000AddSubQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const isAdd = ((level - 1) * 10 + q) % 2 === 0;

    if (isAdd) {
      const a = ((level - 1) * 10 + q) * 127 % 500 + 200; // 200-699
      const b = ((level - 1) * 10 + q) * 89 % 300 + 100; // 100-399
      const sum = a + b;
      questions.push({
        id: `g3_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '+',
        answer: sum.toString(),
        answerLength: sum >= 1000 ? 4 : 3
      });
    } else {
      const a = ((level - 1) * 10 + q) * 97 % 500 + 500; // 500-999
      const b = ((level - 1) * 10 + q) * 53 % 300 + 100; // 100-399
      const diff = a - b;
      questions.push({
        id: `g3_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '-',
        answer: diff.toString(),
        answerLength: diff >= 100 ? 3 : diff >= 10 ? 2 : 1
      });
    }
  }
  return questions;
}

function generateGrade3UnitQuestions(level: number): Question[] {
  const questions: Question[] = [];
  const unitConversions = [
    { from: '厘米', to: '毫米', factor: 10 },
    { from: '米', to: '厘米', factor: 100 },
    { from: '千米', to: '米', factor: 1000 },
    { from: '吨', to: '千克', factor: 1000 },
    { from: '千克', to: '克', factor: 1000 },
  ];

  for (let q = 1; q <= 10; q++) {
    const conv = unitConversions[((level - 11) * 10 + q) % unitConversions.length];
    const value = ((level - 11) * 10 + q) % 9 + 1;
    const result = value * conv.factor;

    questions.push({
      id: `g3_${level}_${q}`,
      type: 'input',
      question: `${value}${conv.from} = `,
      answer: result.toString(),
      answerLength: result.toString().length
    });
  }
  return questions;
}

function generateGrade3MultipleQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const base = ((level - 19) * 10 + q) % 9 + 1;
    const multiple = ((level - 19) * 10 + q) % 5 + 2;
    const result = base * multiple;

    questions.push({
      id: `g3_${level}_${q}`,
      type: 'input',
      question: `${base}的${multiple}倍 =`,
      answer: result.toString(),
      answerLength: result >= 10 ? 2 : 1
    });
  }
  return questions;
}

function generateGrade3MultiplyQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    // 多位数乘一位数
    const a = ((level - 25) * 10 + q) * 37 % 900 + 100; // 100-999
    const b = ((level - 25) * 10 + q) % 9 + 1; // 1-9
    const product = a * b;

    questions.push({
      id: `g3_${level}_${q}`,
      type: 'input',
      question: `${a} × ${b} =`,
      answer: product.toString(),
      answerLength: product.toString().length
    });
  }
  return questions;
}

function generateGrade3DivisionQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const divisor = ((level - 33) * 10 + q) % 8 + 2; // 2-9
    const quotient = ((level - 33) * 10 + q) * 17 % 100 + 10; // 10-109
    const dividend = divisor * quotient;

    questions.push({
      id: `g3_${level}_${q}`,
      type: 'input',
      question: `${dividend} ÷ ${divisor} =`,
      answer: quotient.toString(),
      answerLength: quotient >= 100 ? 3 : quotient >= 10 ? 2 : 1
    });
  }
  return questions;
}

function generateGrade3MixedQuestions(level: number): Question[] {
  const questions: Question[] = [];

  for (let q = 1; q <= 10; q++) {
    const type = ((level - 41) * 10 + q) % 4;

    if (type === 0) {
      // 乘法
      const a = ((level - 41) * 10 + q) * 43 % 900 + 100;
      const b = ((level - 41) * 10 + q) % 9 + 1;
      const product = a * b;
      questions.push({
        id: `g3_${level}_${q}`,
        type: 'input',
        question: `${a} × ${b} =`,
        answer: product.toString(),
        answerLength: product.toString().length
      });
    } else if (type === 1) {
      // 除法
      const b = ((level - 41) * 10 + q) % 8 + 2;
      const quotient = ((level - 41) * 10 + q) * 13 % 100 + 10;
      const a = b * quotient;
      questions.push({
        id: `g3_${level}_${q}`,
        type: 'input',
        question: `${a} ÷ ${b} =`,
        answer: quotient.toString(),
        answerLength: quotient.toString().length
      });
    } else if (type === 2) {
      // 加减
      const a = ((level - 41) * 10 + q) * 67 % 500 + 300;
      const b = ((level - 41) * 10 + q) * 31 % 200 + 100;
      const sum = a + b;
      questions.push({
        id: `g3_${level}_${q}`,
        type: 'vertical_addition',
        num1: a,
        num2: b,
        operator: '+',
        answer: sum.toString(),
        answerLength: sum.toString().length
      });
    } else {
      // 比较
      const num1 = ((level - 41) * 10 + q) * 47 + 100;
      const num2 = ((level - 41) * 10 + q) * 43 + 150;
      questions.push({
        id: `g3_${level}_${q}`,
        type: 'number_comparison',
        num1: num1,
        num2: num2,
        answer: num1 > num2 ? '>' : num1 < num2 ? '<' : '=',
        answerLength: 1
      });
    }
  }
  return questions;
}

// ============================================
// 导出数据
// ============================================

export const allLevelsData = {
  k: kindergartenLevels,
  '1': grade1Levels,
  '2': grade2Levels,
  '3': grade3Levels
};

// 兼容旧接口
export const levelsData = {
  ...kindergartenLevels[1],
  ...grade1Levels[1],
  ...grade1Levels[2],
  ...grade1Levels[3],
  ...grade1Levels[4],
  ...grade1Levels[5],
  ...grade1Levels[6],
  ...grade1Levels[7]
};