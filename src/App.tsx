/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import GradeSelectScreen from './components/GradeSelectScreen';
import MapScreen from './components/MapScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import PokedexScreen from './components/PokedexScreen';
import { petsData } from './data/pets';

type Screen = 'grade_select' | 'map' | 'quiz' | 'result' | 'pokedex';
type GradeKey = 'k' | '1' | '2' | '3';

interface GradeData {
  unlockedLevels: number[];
  puzzlePieces: number;
}

type GameData = Record<GradeKey, GradeData>;

const defaultData: GameData = {
  k: { unlockedLevels: [1], puzzlePieces: 0 },
  '1': { unlockedLevels: [1], puzzlePieces: 0 },
  '2': { unlockedLevels: [1], puzzlePieces: 0 },
  '3': { unlockedLevels: [1], puzzlePieces: 0 },
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('grade_select');
  const [currentGrade, setCurrentGrade] = useState<GradeKey>('1');
  const [stats, setStats] = useState({ accuracy: 0, time: 0, maxCombo: 0 });
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [selectedPetId, setSelectedPetId] = useState<number>(() => {
    const saved = localStorage.getItem('selectedPetId');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('selectedPetId', selectedPetId.toString());
  }, [selectedPetId]);

  const [gameData, setGameData] = useState<GameData>(() => {
    const saved = localStorage.getItem('gameDataV2');
    if (saved) return JSON.parse(saved);
    
    // Migration from old data
    const oldUnlocked = localStorage.getItem('unlockedLevels');
    if (oldUnlocked) {
      return {
        ...defaultData,
        '1': {
          unlockedLevels: JSON.parse(oldUnlocked),
          puzzlePieces: parseInt(localStorage.getItem('puzzlePieces') || '0', 10)
        }
      };
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('gameDataV2', JSON.stringify(gameData));
  }, [gameData]);

  const handleLevelComplete = (levelStats: any) => {
    setStats(levelStats);
    
    setGameData(prev => {
      const currentData = prev[currentGrade];
      const newUnlocked = [...currentData.unlockedLevels];
      if (!newUnlocked.includes(currentLevelId + 1) && currentLevelId < 7) {
        newUnlocked.push(currentLevelId + 1);
      }
      
      return {
        ...prev,
        [currentGrade]: {
          unlockedLevels: newUnlocked,
          puzzlePieces: currentData.puzzlePieces + 1
        }
      };
    });

    setCurrentScreen('result');
  };

  const currentGradeData = gameData[currentGrade];

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center overflow-hidden font-sans">
      <div className="w-full max-w-md h-full bg-white relative shadow-xl overflow-hidden">
        {currentScreen === 'grade_select' && (
          <GradeSelectScreen 
            gameData={gameData}
            onSelect={(gradeId) => {
              setCurrentGrade(gradeId as GradeKey);
              setCurrentScreen('map');
            }}
          />
        )}
        {currentScreen === 'map' && (
          <MapScreen 
            gradeId={currentGrade}
            unlockedLevels={currentGradeData.unlockedLevels}
            puzzlePieces={currentGradeData.puzzlePieces}
            onStart={(levelId) => {
              setCurrentLevelId(levelId);
              setCurrentScreen('quiz');
            }} 
            onOpenPokedex={() => setCurrentScreen('pokedex')}
            onBackToGrades={() => setCurrentScreen('grade_select')}
          />
        )}
        {currentScreen === 'quiz' && (
          <QuizScreen 
            levelId={currentLevelId}
            selectedPet={petsData.find(p => p.id === selectedPetId) || petsData[0]}
            onFinish={handleLevelComplete} 
            onBack={() => setCurrentScreen('map')} 
          />
        )}
        {currentScreen === 'result' && (
          <ResultScreen 
            stats={stats}
            puzzlePieces={currentGradeData.puzzlePieces}
            onBack={() => setCurrentScreen('map')} 
            onNextLevel={() => {
              if (currentLevelId < 7) {
                setCurrentLevelId(currentLevelId + 1);
                setCurrentScreen('quiz');
              } else {
                setCurrentScreen('map');
              }
            }}
            onOpenPokedex={() => setCurrentScreen('pokedex')}
            hasNextLevel={currentLevelId < 7}
          />
        )}
        {currentScreen === 'pokedex' && (
          <PokedexScreen 
            puzzlePieces={currentGradeData.puzzlePieces}
            selectedPetId={selectedPetId}
            onSelectPet={setSelectedPetId}
            onBack={() => setCurrentScreen('map')} 
          />
        )}
      </div>
    </div>
  );
}
