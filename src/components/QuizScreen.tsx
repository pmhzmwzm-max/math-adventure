import React, { useState, useEffect } from 'react';
import { ChevronLeft, Delete, Check, Flame, Zap, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { levelsData } from '../data/questions';

const ParticleBurst = ({ tier = 1 }: { tier?: number }) => {
  const outerCount = tier === 3 ? 48 : tier === 2 ? 36 : 24;
  const innerCount = tier === 3 ? 24 : tier === 2 ? 18 : 12;
  const colors = tier === 3 
    ? ['#FBBF24', '#F87171', '#60A5FA', '#34D399', '#A78BFA', '#F472B6']
    : tier === 2
    ? ['#F472B6', '#A78BFA', '#C084FC', '#E879F9', '#FBCFE8']
    : ['#FBBF24', '#F87171', '#FCA5A5', '#FDE047', '#FEF08A'];

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
      {/* Outer burst */}
      {[...Array(outerCount)].map((_, i) => {
        const angle = (i / outerCount) * Math.PI * 2;
        const radius = (tier === 3 ? 160 : tier === 2 ? 140 : 120) + Math.random() * 40;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <motion.div
            key={`outer-${i}`}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ x, y, scale: Math.random() * (tier === 3 ? 2 : 1.5) + 0.5, opacity: 0 }}
            transition={{ duration: tier === 3 ? 1 : 0.8, ease: "easeOut" }}
            className="absolute w-5 h-5 rounded-full"
            style={{
              backgroundColor: colors[i % colors.length],
              boxShadow: '0 0 10px currentColor'
            }}
          />
        );
      })}
      {/* Inner burst */}
      {[...Array(innerCount)].map((_, i) => {
        const angle = (i / innerCount) * Math.PI * 2;
        const radius = (tier === 3 ? 80 : tier === 2 ? 70 : 60) + Math.random() * 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <motion.div
            key={`inner-${i}`}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ x, y, scale: Math.random() * 1 + 0.5, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: ['#FFFBEB', '#FEF2F2', '#EFF6FF', '#ECFDF5'][i % 4]
            }}
          />
        );
      })}
    </div>
  );
};

export default function QuizScreen({ levelId, selectedPet, onFinish, onBack }: { levelId: number, selectedPet: any, onFinish: (stats: any) => void, onBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [combo, setCombo] = useState(0);
  const [showPetCombo, setShowPetCombo] = useState(false);
  const [petComboTimeout, setPetComboTimeout] = useState<NodeJS.Timeout | null>(null);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime] = useState(Date.now());

  const levelInfo = levelsData[levelId];
  const questions = levelInfo.questions;
  const question = questions[currentIndex];

  useEffect(() => {
    setAnswers(Array(question.answerLength).fill(''));
    setFeedback(null);
  }, [currentIndex, question]);

  const handleKeyPress = (key: string) => {
    if (feedback === 'correct' || feedback === 'wrong') return;

    if (key === 'delete') {
      setAnswers(prev => {
        const next = [...prev];
        if (question.type === 'vertical_addition') {
          const filledIdx = next.findIndex(val => val !== '');
          if (filledIdx !== -1) {
            next[filledIdx] = '';
          }
        } else {
          for (let i = next.length - 1; i >= 0; i--) {
            if (next[i] !== '') {
              next[i] = '';
              break;
            }
          }
        }
        return next;
      });
      setFeedback(null);
    } else {
      setAnswers(prev => {
        const next = [...prev];
        if (question.type === 'vertical_addition') {
          for (let i = next.length - 1; i >= 0; i--) {
            if (next[i] === '') {
              next[i] = key;
              break;
            }
          }
        } else {
          const emptyIdx = next.findIndex(val => val === '');
          if (emptyIdx !== -1) {
            next[emptyIdx] = key;
          }
        }
        return next;
      });
      setFeedback(null);
    }
  };

  const checkAnswer = () => {
    const userAnswerStr = answers.join('');
    if (userAnswerStr.length < question.answerLength) return;

    if (userAnswerStr === question.answer) {
      setFeedback('correct');
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(m => Math.max(m, newCombo));
      if (newCombo > 0 && newCombo % 3 === 0) {
        setShowPetCombo(true);
        if (petComboTimeout) clearTimeout(petComboTimeout);
        const timeout = setTimeout(() => setShowPetCombo(false), 2500);
        setPetComboTimeout(timeout);
      }
      setCorrectCount(c => c + 1);

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(i => i + 1);
        } else {
          const timeTaken = Math.floor((Date.now() - startTime) / 1000);
          onFinish({
            accuracy: Math.round(((correctCount + 1) / questions.length) * 100),
            time: timeTaken,
            maxCombo: Math.max(maxCombo, newCombo)
          });
        }
      }, 1000); // Slightly faster transition to next question
    } else {
      setFeedback('wrong');
      setCombo(0);
      setTimeout(() => {
        setAnswers(Array(question.answerLength).fill(''));
        setFeedback(null);
      }, 500); // Faster clear on wrong answer
    }
  };

  useEffect(() => {
    if (answers.length > 0 && answers.every(a => a !== '') && feedback === null) {
      checkAnswer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, feedback]);

  const getActiveIndex = () => {
    if (feedback !== null) return -1;
    if (question.type === 'vertical_addition') {
      for (let i = answers.length - 1; i >= 0; i--) {
        if (answers[i] === '') return i;
      }
    } else {
      return answers.findIndex(val => val === '');
    }
    return -1;
  };

  const activeIndex = getActiveIndex();

  const renderNumberComparison = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="text-3xl font-bold text-white mb-8 tracking-wider">比大小</div>
        <div className="flex items-center justify-center gap-6 w-full px-4">
          <div className="flex-1 text-right text-6xl font-bold text-white">{question.num1}</div>
          <motion.div
            animate={
              feedback === 'wrong' && answers[0] !== question.answer 
                ? { x: [-5, 5, -5, 5, 0] } 
                : 0 === activeIndex 
                  ? { scale: [1, 1.15, 1], boxShadow: ["0 0 10px rgba(253,224,71,0.4)", "0 0 35px rgba(253,224,71,1)", "0 0 10px rgba(253,224,71,0.4)"] }
                  : { scale: 1, boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" }
            }
            transition={
              feedback === 'wrong' && answers[0] !== question.answer 
                ? { duration: 0.4 } 
                : 0 === activeIndex 
                  ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                  : { duration: 0.2 }
            }
            className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center text-5xl font-bold transition-colors
              ${answers[0] ? 'bg-white text-blue-500' : 'bg-white/50 text-white/50'}
              ${feedback === 'wrong' && answers[0] !== question.answer && answers[0] !== '' ? 'bg-red-100 text-red-500' : ''}
              ${0 === activeIndex ? 'ring-4 ring-yellow-300 bg-white/90' : ''}
            `}
          >
            {answers[0] || '?'}
          </motion.div>
          <div className="flex-1 text-left text-6xl font-bold text-white">{question.num2}</div>
        </div>
      </div>
    );
  };

  const renderVerticalMath = () => {
    if (!question.num1 || !question.num2) return null;
    const maxLen = Math.max(question.num1.toString().length, question.num2.toString().length);
    const str1 = question.num1.toString().padStart(maxLen, ' ');
    const str2 = question.num2.toString().padStart(maxLen, ' ');

    return (
      <div className="text-center flex flex-col items-end">
        <div className="flex justify-end gap-4 text-5xl font-bold text-white tracking-widest font-mono">
          {str1.split('').map((char, i) => <span key={i} className="w-8 text-center">{char}</span>)}
        </div>
        <div className="flex justify-end gap-4 text-5xl font-bold text-white mt-4 relative tracking-widest font-mono">
          <span className="absolute -left-12">{question.operator || '+'}</span>
          {str2.split('').map((char, i) => <span key={i} className="w-8 text-center">{char}</span>)}
        </div>
        <div className="w-full h-1 bg-white my-6"></div>
        <div className="flex gap-2 justify-end">
          {answers.map((ans, i) => (
            <motion.div
              key={i}
              animate={
                feedback === 'wrong' && ans !== question.answer[i] 
                  ? { x: [-5, 5, -5, 5, 0] } 
                  : i === activeIndex 
                    ? { scale: [1, 1.15, 1], boxShadow: ["0 0 10px rgba(253,224,71,0.4)", "0 0 35px rgba(253,224,71,1)", "0 0 10px rgba(253,224,71,0.4)"] }
                    : { scale: 1, boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" }
              }
              transition={
                feedback === 'wrong' && ans !== question.answer[i] 
                  ? { duration: 0.4 } 
                  : i === activeIndex 
                    ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                    : { duration: 0.2 }
              }
              className={`w-14 h-16 rounded-xl flex items-center justify-center text-3xl font-bold transition-colors
                ${ans ? 'bg-white text-blue-500' : 'bg-white/50 text-white/50'}
                ${feedback === 'wrong' && ans !== question.answer[i] && ans !== '' ? 'bg-red-100 text-red-500' : ''}
                ${i === activeIndex ? 'ring-4 ring-yellow-300 bg-white/90' : ''}
              `}
            >
              {ans || '?'}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-[#5cb3f2] flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 mx-4">
          <div className="h-4 bg-white/30 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-300 to-blue-500"
              initial={{ width: `${(currentIndex / questions.length) * 100}%` }}
              animate={{ width: `${((currentIndex) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="font-bold">{currentIndex + 1}/{questions.length}</div>
      </div>

      {/* Combo Display */}
      <AnimatePresence>
        {combo >= 3 && (
          <motion.div
            key={combo}
            initial={{ opacity: 0, y: -20, scale: 0.5, rotate: -15 }}
            animate={
              combo >= 10 
                ? { opacity: 1, y: 0, scale: [1, 1.2, 1], rotate: [-5, 5, -5, 5, 0], filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }
                : combo >= 5
                  ? { opacity: 1, y: 0, scale: [1, 1.1, 1], rotate: 0 }
                  : { opacity: 1, y: 0, scale: 1, rotate: 0 }
            }
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.7 }}
            className={`absolute top-16 right-4 flex items-center gap-2 z-20 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl border-4 ${
              combo >= 10 ? 'border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.6)]' :
              combo >= 5 ? 'border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)]' :
              'border-orange-300 shadow-[0_0_15px_rgba(253,186,116,0.5)]'
            }`}
          >
            <ParticleBurst tier={combo >= 10 ? 3 : combo >= 5 ? 2 : 1} />
            <div className="relative z-10 flex items-center gap-2">
              {combo >= 10 ? <Crown className="text-purple-500 w-12 h-12 animate-bounce" fill="currentColor" /> :
               combo >= 5 ? <Zap className="text-pink-500 w-10 h-10 animate-bounce" fill="currentColor" /> :
               <Flame className="text-orange-500 w-8 h-8 animate-bounce" fill="currentColor" />}
              <span className={`font-black italic drop-shadow-md ${
                combo >= 10 ? 'text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500' :
                combo >= 5 ? 'text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500' :
                'text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'
              }`}>
                {combo} 连击!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        {/* Pet Combo Animation */}
        <AnimatePresence mode="wait">
          {showPetCombo && selectedPet && (
            <motion.div
              key={`pet-${combo}`}
              initial={{ x: 200, opacity: 0, scale: 0.5, rotate: 30 }}
              animate={{ x: 0, opacity: 1, scale: 0.8, rotate: -5 }}
              exit={{ x: 200, opacity: 0, scale: 0.5, rotate: 30 }}
              transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
              className="absolute -bottom-16 -right-4 z-50 flex flex-col items-end pointer-events-none"
            >
              {/* Speech Bubble */}
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', bounce: 0.6 }}
                className="relative bg-white text-orange-500 font-black px-4 py-2 rounded-[2rem] rounded-br-sm shadow-2xl mb-2 text-lg border-4 border-orange-200"
              >
                {combo >= 12 ? "你简直是天才！" : combo >= 9 ? "太不可思议了！" : combo >= 6 ? "哇！手速太快了！" : "干得漂亮！"}
                {/* Tail */}
                <div className="absolute -bottom-4 right-6 w-0 h-0 border-l-[10px] border-l-transparent border-t-[16px] border-t-white border-r-[10px] border-r-transparent drop-shadow-md"></div>
              </motion.div>
              
              {/* Pet */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className={`w-24 h-24 rounded-full ${selectedPet.color} flex items-center justify-center text-6xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] border-4 border-white`}
              >
                {selectedPet.emoji}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full bg-[#82cbf9] rounded-3xl p-8 pb-16 shadow-lg min-h-[250px] flex flex-col items-center justify-center relative"
        >
            {question.type === 'text_to_number' ? (
              <div className="text-center w-full">
              <div className="text-3xl font-bold text-white mb-8 tracking-wider">{question.text}</div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl font-bold text-white">{question.label}</span>
                <div className="flex gap-2">
                  {answers.map((ans, i) => (
                    <motion.div
                      key={i}
                      animate={
                        feedback === 'wrong' && ans !== question.answer[i] 
                          ? { x: [-5, 5, -5, 5, 0] } 
                          : i === activeIndex 
                            ? { scale: [1, 1.15, 1], boxShadow: ["0 0 10px rgba(253,224,71,0.4)", "0 0 35px rgba(253,224,71,1)", "0 0 10px rgba(253,224,71,0.4)"] }
                            : { scale: 1, boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" }
                      }
                      transition={
                        feedback === 'wrong' && ans !== question.answer[i] 
                          ? { duration: 0.4 } 
                          : i === activeIndex 
                            ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                            : { duration: 0.2 }
                      }
                      className={`w-14 h-16 rounded-xl flex items-center justify-center text-3xl font-bold transition-colors
                        ${ans ? 'bg-white text-blue-500' : 'bg-white/50 text-white/50'}
                        ${feedback === 'wrong' && ans !== question.answer[i] && ans !== '' ? 'bg-red-100 text-red-500' : ''}
                        ${i === activeIndex ? 'ring-4 ring-yellow-300 bg-white/90' : ''}
                      `}
                    >
                      {ans || '?'}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : question.type === 'number_comparison' ? (
            renderNumberComparison()
          ) : (
            renderVerticalMath()
          )}

          {/* Correct Checkmark */}
          {feedback === 'correct' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute bottom-4"
            >
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
                <Check className="w-8 h-8 text-green-500" strokeWidth={4} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Numpad */}
      <div className="bg-white/20 backdrop-blur-md rounded-t-3xl p-4 pb-8">
        {question.type === 'number_comparison' ? (
          <div className="grid grid-cols-3 gap-4 px-2 py-2">
            {['>', '=', '<'].map((sym) => (
              <button
                key={sym}
                onClick={() => handleKeyPress(sym)}
                className="bg-white rounded-3xl h-28 flex items-center justify-center text-blue-500 shadow-[0_6px_0_#e5e7eb] active:shadow-none active:translate-y-1.5 transition-all"
              >
                <span className="text-6xl font-bold">{sym}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleKeyPress(num.toString())}
                  className="bg-white rounded-2xl h-16 text-3xl font-bold text-gray-700 shadow-[0_4px_0_#e5e7eb] active:shadow-none active:translate-y-1 transition-all"
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-3">
              {[6, 7, 8, 9, 0].map(num => (
                <button
                  key={num}
                  onClick={() => handleKeyPress(num.toString())}
                  className="bg-white rounded-2xl h-16 text-3xl font-bold text-gray-700 shadow-[0_4px_0_#e5e7eb] active:shadow-none active:translate-y-1 transition-all"
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleKeyPress('delete')}
              className="w-full bg-white rounded-2xl h-16 flex items-center justify-center text-red-400 shadow-[0_4px_0_#e5e7eb] active:shadow-none active:translate-y-1 transition-all mt-1"
            >
              <Delete size={32} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
