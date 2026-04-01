import React, { useState } from 'react';
import { ChevronLeft, Lock, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { petsData } from '../data/pets';

export default function PokedexScreen({ puzzlePieces, selectedPetId, onSelectPet, onBack }: { puzzlePieces: number, selectedPetId: number, onSelectPet: (id: number) => void, onBack: () => void }) {
  const [selectedPet, setSelectedPet] = useState<number | null>(null);

  const renderPetCard = (pet: typeof petsData[0], index: number) => {
    // 布丁史莱姆（id=0）永远是解锁的
    const isUnlocked = pet.id === 0 || puzzlePieces >= pet.requiredPieces;
    const progress = Math.max(0, Math.min(5, puzzlePieces - (pet.requiredPieces - 5)));
    const isPartner = selectedPetId === pet.id;

    return (
      <motion.div
        key={pet.id}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => isUnlocked && setSelectedPet(pet.id)}
        className={`relative rounded-3xl p-4 flex flex-col items-center justify-center cursor-pointer shadow-lg border-4 transition-all
          ${isUnlocked ? `${pet.color} border-white ${pet.shadow}` : 'bg-gray-200 border-gray-300 shadow-inner'}
        `}
      >
        {isPartner && (
          <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full border-2 border-white z-20 shadow-md pointer-events-none">
            伙伴
          </div>
        )}
        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-6xl mb-3 bg-white/20 shadow-inner
          ${!isUnlocked && 'grayscale brightness-0 opacity-30'}
        `}>
          {pet.emoji}
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full w-full text-center shadow-sm">
          <span className={`font-bold text-sm ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
            {isUnlocked ? pet.name : '未知伙伴'}
          </span>
        </div>

        {!isUnlocked && (
          <div className="absolute top-3 right-3 bg-gray-500/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
            <Lock size={16} className="text-white" />
          </div>
        )}

        {/* Progress Bar for Locked Pets */}
        {!isUnlocked && pet.requiredPieces > 0 && progress > 0 && (
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1 text-xs font-bold text-blue-500 shadow-md border-2 border-blue-100 whitespace-nowrap">
            碎片 {progress}/5
          </div>
        )}
      </motion.div>
    );
  };

  const selectedPetData = selectedPet ? petsData.find(p => p.id === selectedPet) : null;

  return (
    <div className="w-full h-full bg-[#f0f9ff] flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex flex-wrap gap-8 justify-center items-center">
         {[...Array(20)].map((_, i) => <span key={i} className="text-6xl">🌟</span>)}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 z-10 bg-white/50 backdrop-blur-md shadow-sm">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <div className="font-black text-xl text-gray-800 tracking-wider">伙伴图鉴</div>
        <div className="w-10 h-10"></div> {/* Spacer */}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6 z-10 pb-24">
        <div className="grid grid-cols-2 gap-6">
          {petsData.map((pet, index) => renderPetCard(pet, index))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPetData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedPet(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-[2rem] p-6 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setSelectedPet(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 z-10"
              >
                <X size={20} />
              </button>

              <div className={`w-full h-48 rounded-3xl ${selectedPetData.color} flex items-center justify-center text-8xl mb-6 shadow-inner relative overflow-hidden`}>
                {/* Decorative background elements */}
                <div className="absolute top-4 left-4 text-white/20 text-4xl">✨</div>
                <div className="absolute bottom-4 right-4 text-white/20 text-5xl">⭐</div>
                
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  {selectedPetData.emoji}
                </motion.div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-gray-800 mb-2">{selectedPetData.name}</h2>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />)}
                </div>
                <p className="text-gray-600 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  {selectedPetData.description}
                </p>
              </div>

              <div className="flex gap-4">
                {selectedPetId !== selectedPetData.id ? (
                  <button 
                    onClick={() => {
                      onSelectPet(selectedPetData.id);
                      setSelectedPet(null);
                    }}
                    className={`flex-1 bg-green-500 text-white text-xl font-bold py-4 rounded-full shadow-[0_6px_0_#22c55e] active:shadow-none active:translate-y-[6px] transition-all`}
                  >
                    设为出战伙伴
                  </button>
                ) : (
                  <button 
                    disabled
                    className={`flex-1 bg-gray-300 text-gray-500 text-xl font-bold py-4 rounded-full shadow-[0_6px_0_#d1d5db] cursor-not-allowed`}
                  >
                    当前出战中
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
