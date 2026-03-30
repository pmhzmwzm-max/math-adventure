export type QuestionType = 'text_to_number' | 'vertical_addition' | 'number_comparison';

export interface Question {
  id: string;
  type: QuestionType;
  text?: string;
  label?: string;
  num1?: number;
  num2?: number;
  operator?: '+' | '-';
  answer: string;
  answerLength: number;
}

export const levelsData: Record<number, { title: string; questions: Question[] }> = {
  1: {
    title: '综合演示关卡',
    questions: [
      { id: 'l1_q1', type: 'vertical_addition', num1: 1, num2: 2, operator: '+', answer: '3', answerLength: 1 },
      { id: 'l1_q2', type: 'vertical_addition', num1: 5, num2: 3, operator: '-', answer: '2', answerLength: 1 },
      { id: 'l1_q3', type: 'text_to_number', text: '读作：十五', label: '写作：', answer: '15', answerLength: 2 },
      { id: 'l1_q4', type: 'number_comparison', num1: 15, num2: 12, answer: '>', answerLength: 1 },
      { id: 'l1_q5', type: 'vertical_addition', num1: 6, num2: 4, operator: '+', answer: '10', answerLength: 2 },
      { id: 'l1_q6', type: 'vertical_addition', num1: 10, num2: 2, operator: '-', answer: '8', answerLength: 1 },
      { id: 'l1_q7', type: 'text_to_number', text: '读作：二十', label: '写作：', answer: '20', answerLength: 2 },
      { id: 'l1_q8', type: 'number_comparison', num1: 8, num2: 11, answer: '<', answerLength: 1 },
      { id: 'l1_q9', type: 'vertical_addition', num1: 10, num2: 8, operator: '+', answer: '18', answerLength: 2 },
      { id: 'l1_q10', type: 'number_comparison', num1: 17, num2: 17, answer: '=', answerLength: 1 },
    ]
  },
  2: {
    title: '5 以内的减法',
    questions: [
      { id: 'l2_q1', type: 'vertical_addition', num1: 3, num2: 1, operator: '-', answer: '2', answerLength: 1 },
      { id: 'l2_q2', type: 'vertical_addition', num1: 4, num2: 2, operator: '-', answer: '2', answerLength: 1 },
      { id: 'l2_q3', type: 'vertical_addition', num1: 5, num2: 1, operator: '-', answer: '4', answerLength: 1 },
      { id: 'l2_q4', type: 'vertical_addition', num1: 4, num2: 3, operator: '-', answer: '1', answerLength: 1 },
      { id: 'l2_q5', type: 'vertical_addition', num1: 5, num2: 3, operator: '-', answer: '2', answerLength: 1 },
    ]
  },
  3: {
    title: '6-10 的加法',
    questions: [
      { id: 'l3_q1', type: 'vertical_addition', num1: 4, num2: 3, operator: '+', answer: '7', answerLength: 1 },
      { id: 'l3_q2', type: 'vertical_addition', num1: 5, num2: 4, operator: '+', answer: '9', answerLength: 1 },
      { id: 'l3_q3', type: 'vertical_addition', num1: 6, num2: 2, operator: '+', answer: '8', answerLength: 1 },
      { id: 'l3_q4', type: 'vertical_addition', num1: 3, num2: 7, operator: '+', answer: '10', answerLength: 2 },
      { id: 'l3_q5', type: 'vertical_addition', num1: 5, num2: 5, operator: '+', answer: '10', answerLength: 2 },
    ]
  },
  4: {
    title: '6-10 的减法',
    questions: [
      { id: 'l4_q1', type: 'vertical_addition', num1: 8, num2: 3, operator: '-', answer: '5', answerLength: 1 },
      { id: 'l4_q2', type: 'vertical_addition', num1: 9, num2: 4, operator: '-', answer: '5', answerLength: 1 },
      { id: 'l4_q3', type: 'vertical_addition', num1: 10, num2: 2, operator: '-', answer: '8', answerLength: 1 },
      { id: 'l4_q4', type: 'vertical_addition', num1: 7, num2: 6, operator: '-', answer: '1', answerLength: 1 },
      { id: 'l4_q5', type: 'vertical_addition', num1: 10, num2: 5, operator: '-', answer: '5', answerLength: 1 },
    ]
  },
  5: {
    title: '20 以内数的认识',
    questions: [
      { id: 'l5_q1', type: 'text_to_number', text: '读作：十五', label: '写作：', answer: '15', answerLength: 2 },
      { id: 'l5_q2', type: 'text_to_number', text: '读作：十八', label: '写作：', answer: '18', answerLength: 2 },
      { id: 'l5_q3', type: 'text_to_number', text: '读作：二十', label: '写作：', answer: '20', answerLength: 2 },
      { id: 'l5_q4', type: 'text_to_number', text: '读作：十一', label: '写作：', answer: '11', answerLength: 2 },
      { id: 'l5_q5', type: 'text_to_number', text: '读作：十九', label: '写作：', answer: '19', answerLength: 2 },
    ]
  },
  6: {
    title: '11-20 各数的认识、组成',
    questions: [
      { id: 'l6_q1', type: 'vertical_addition', num1: 10, num2: 5, operator: '+', answer: '15', answerLength: 2 },
      { id: 'l6_q2', type: 'text_to_number', text: '读作：十三', label: '写作：', answer: '13', answerLength: 2 },
      { id: 'l6_q3', type: 'vertical_addition', num1: 10, num2: 8, operator: '+', answer: '18', answerLength: 2 },
      { id: 'l6_q4', type: 'text_to_number', text: '读作：十六', label: '写作：', answer: '16', answerLength: 2 },
      { id: 'l6_q5', type: 'vertical_addition', num1: 10, num2: 2, operator: '+', answer: '12', answerLength: 2 },
    ]
  },
  7: {
    title: '20 以内数的大小比较',
    questions: [
      { id: 'l7_q1', type: 'number_comparison', num1: 15, num2: 12, answer: '>', answerLength: 1 },
      { id: 'l7_q2', type: 'number_comparison', num1: 18, num2: 20, answer: '<', answerLength: 1 },
      { id: 'l7_q3', type: 'number_comparison', num1: 11, num2: 14, answer: '<', answerLength: 1 },
      { id: 'l7_q4', type: 'number_comparison', num1: 19, num2: 16, answer: '>', answerLength: 1 },
      { id: 'l7_q5', type: 'number_comparison', num1: 17, num2: 17, answer: '=', answerLength: 1 },
    ]
  }
};
