import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Trophy, ArrowRight, Volume2, VolumeX, 
  Sparkles, Music, Compass
} from 'lucide-react';
import { 
  wordBuilderLevels, mathMatchPairs, phonicsRounds, 
  memoryAnimals, patternColors, alphabetPath 
} from '../data/games';
import GameContainer from '../components/interactive/GameContainer';
import Confetti from '../components/decorative/Confetti';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import { sounds } from '../utils/soundEffects';

const AnimalEmblem = ({ name, color }) => {
  switch (name) {
    case 'Owl':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <ellipse cx="24" cy="26" rx="16" ry="18" fill="#7C3AED" />
          <ellipse cx="24" cy="28" rx="11" ry="13" fill="#DDD6FE" />
          <circle cx="18" cy="20" r="6" fill="#FFFFFF" />
          <circle cx="30" cy="20" r="6" fill="#FFFFFF" />
          <circle cx="18" cy="20" r="3" fill="#1E1B4B" />
          <circle cx="30" cy="20" r="3" fill="#1E1B4B" />
          <polygon points="24,24 21,29 27,29" fill="#F59E0B" />
          <path d="M12 12L18 16M36 12L30 16" stroke="#5B21B6" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'Fox':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <path d="M24 38L10 20L14 10L24 18L34 10L38 20L24 38Z" fill="#EA580C" />
          <path d="M24 38L16 24L24 28L32 24L24 38Z" fill="#FFF7ED" />
          <circle cx="19" cy="22" r="2.5" fill="#18181B" />
          <circle cx="29" cy="22" r="2.5" fill="#18181B" />
          <circle cx="24" cy="34" r="2" fill="#09090B" />
        </svg>
      );
    case 'Lion':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="24" cy="24" r="18" fill="#D97706" />
          <circle cx="24" cy="25" r="13" fill="#FDE68A" />
          <circle cx="19" cy="23" r="2.5" fill="#451A03" />
          <circle cx="29" cy="23" r="2.5" fill="#451A03" />
          <polygon points="24,27 21,31 27,31" fill="#78350F" />
          <path d="M21 34Q24 36 27 34" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'Bunny':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <ellipse cx="17" cy="14" rx="4" ry="12" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
          <ellipse cx="31" cy="14" rx="4" ry="12" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
          <ellipse cx="17" cy="15" rx="2" ry="8" fill="#FDA4AF" />
          <ellipse cx="31" cy="15" rx="2" ry="8" fill="#FDA4AF" />
          <circle cx="24" cy="28" r="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="20" cy="26" r="2" fill="#1E293B" />
          <circle cx="28" cy="26" r="2" fill="#1E293B" />
          <ellipse cx="24" cy="30" rx="2" ry="1.5" fill="#F43F5E" />
        </svg>
      );
    case 'Dolphin':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <path d="M10 32C12 24 18 16 30 16C36 16 40 20 40 24C40 28 32 30 26 30C20 30 14 36 10 32Z" fill="#0284C7" />
          <path d="M24 16L28 10L30 16Z" fill="#0369A1" />
          <circle cx="34" cy="21" r="2" fill="#FFFFFF" />
          <circle cx="34" cy="21" r="1" fill="#0C4A6E" />
          <path d="M12 30L6 26L8 34Z" fill="#0284C7" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="15" cy="16" r="5" fill="#18181B" />
          <circle cx="33" cy="16" r="5" fill="#18181B" />
          <circle cx="24" cy="26" r="14" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1.5" />
          <ellipse cx="19" cy="25" rx="3.5" ry="4" fill="#18181B" />
          <ellipse cx="29" cy="25" rx="3.5" ry="4" fill="#18181B" />
          <circle cx="19" cy="24" r="1.5" fill="#FFFFFF" />
          <circle cx="29" cy="24" r="1.5" fill="#FFFFFF" />
          <ellipse cx="24" cy="31" rx="2.5" ry="2" fill="#27272A" />
        </svg>
      );
  }
};

const GamePlayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateGameScore } = useUser();

  const isMathMatch = id === 'math-match' || id === 'g3';
  const isPhonicsPop = id === 'phonics-pop' || id === 'g4';
  const isMemoryQuest = id === 'memory-quest' || id === 'g5';
  const isPatternQuest = id === 'pattern-quest' || id === 'g6';
  const isAlphabetAdventure = id === 'alphabet-adventure' || id === 'g1';
  const isWordBuilder = !isMathMatch && !isPhonicsPop && !isMemoryQuest && !isPatternQuest && !isAlphabetAdventure;

  const [soundEnabled, setSoundEnabled] = useState(true);
  const toggleSound = () => {
    const next = sounds.toggle();
    setSoundEnabled(next);
  };

  const [score, setScore] = useState(0);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [placedLetters, setPlacedLetters] = useState([]);
  const [isWrongWord, setIsWrongWord] = useState(false);
  const [wordLevelComplete, setWordLevelComplete] = useState(false);
  const [wordGameComplete, setWordGameComplete] = useState(false);

  const [mathCards, setMathCards] = useState([]);
  const [flippedMathCards, setFlippedMathCards] = useState([]);
  const [matchedMathIds, setMatchedMathIds] = useState([]);
  const [mathMoves, setMathMoves] = useState(0);
  const [mathComplete, setMathComplete] = useState(false);

  const [phonicsRoundIndex, setPhonicsRoundIndex] = useState(0);
  const [activeBubbles, setActiveBubbles] = useState([]);
  const [poppedBubbleIds, setPoppedBubbleIds] = useState([]);
  const [phonicsComplete, setPhonicsComplete] = useState(false);

  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedMemoryCards, setFlippedMemoryCards] = useState([]);
  const [matchedMemoryAnimalIds, setMatchedMemoryAnimalIds] = useState([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryComplete, setMemoryComplete] = useState(false);

  const [patternSequence, setPatternSequence] = useState([]);
  const [playerInputSequence, setPlayerInputSequence] = useState([]);
  const [activePadId, setActivePadId] = useState(null);
  const [patternRound, setPatternRound] = useState(1);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [patternComplete, setPatternComplete] = useState(false);

  const [currentStoneIndex, setCurrentStoneIndex] = useState(0);
  const [riverChoices, setRiverChoices] = useState([]);
  const [alphabetComplete, setAlphabetComplete] = useState(false);

  const currentWordData = wordBuilderLevels?.[currentWordIndex] || wordBuilderLevels[0];
  const targetWord = currentWordData.word.toUpperCase();

  useEffect(() => {
    if (!isWordBuilder || wordGameComplete) return;
    const raw = currentWordData.letters || targetWord.split('');
    const letters = [...raw].sort(() => Math.random() - 0.5).map((char, index) => ({
      id: `wb-${index}-${char}-${Math.random()}`,
      char,
    }));
    setAvailableLetters(letters);
    setPlacedLetters(Array(targetWord.length).fill(null));
    setIsWrongWord(false);
    setWordLevelComplete(false);
  }, [currentWordIndex, isWordBuilder, wordGameComplete]);

  const handlePlaceWordLetter = (letter) => {
    if (wordLevelComplete || isWrongWord) return;
    sounds.playPop();
    const firstEmpty = placedLetters.findIndex(s => s === null);
    if (firstEmpty === -1) return;
    const nextPlaced = [...placedLetters];
    nextPlaced[firstEmpty] = letter;
    setPlacedLetters(nextPlaced);
    setAvailableLetters(availableLetters.filter(l => l.id !== letter.id));
  };

  const handleRemoveWordLetter = (letter, index) => {
    if (wordLevelComplete || isWrongWord || !letter) return;
    sounds.playPop();
    const nextPlaced = [...placedLetters];
    nextPlaced[index] = null;
    setPlacedLetters(nextPlaced);
    setAvailableLetters(prev => [...prev, letter]);
  };

  useEffect(() => {
    if (!isWordBuilder || wordLevelComplete || isWrongWord || wordGameComplete) return;
    if (placedLetters.length === 0 || placedLetters.some(s => s === null)) return;
    const spelled = placedLetters.map(l => l.char).join('').toUpperCase();
    if (spelled === targetWord) {
      sounds.playCorrect();
      setWordLevelComplete(true);
      setScore(s => s + 25);
      setTimeout(() => {
        if (currentWordIndex < wordBuilderLevels.length - 1) {
          setCurrentWordIndex(i => i + 1);
        } else {
          sounds.playFanfare();
          setWordGameComplete(true);
          updateGameScore('word-builder', score + 50);
        }
      }, 1400);
    } else {
      sounds.playWrong();
      setIsWrongWord(true);
      setTimeout(() => {
        setIsWrongWord(false);
        setAvailableLetters(prev => [...prev, ...placedLetters.filter(Boolean)]);
        setPlacedLetters(Array(targetWord.length).fill(null));
      }, 850);
    }
  }, [placedLetters, isWordBuilder]);

  useEffect(() => {
    if (isMathMatch) {
      const shuffled = [...mathMatchPairs].sort(() => Math.random() - 0.5);
      setMathCards(shuffled);
      setFlippedMathCards([]);
      setMatchedMathIds([]);
      setMathMoves(0);
      setMathComplete(false);
    }
  }, [isMathMatch]);

  const handleMathCardClick = (card) => {
    if (flippedMathCards.length >= 2 || flippedMathCards.includes(card.id) || matchedMathIds.includes(card.matchId) || mathComplete) return;
    sounds.playPop();
    const newFlipped = [...flippedMathCards, card.id];
    setFlippedMathCards(newFlipped);
    if (newFlipped.length === 2) {
      setMathMoves(m => m + 1);
      const c1 = mathCards.find(c => c.id === newFlipped[0]);
      const c2 = mathCards.find(c => c.id === newFlipped[1]);
      if (c1.matchId === c2.matchId) {
        sounds.playCorrect();
        setMatchedMathIds(prev => {
          const updated = [...prev, c1.matchId];
          setScore(s => s + 25);
          if (updated.length === mathMatchPairs.length / 2) {
            sounds.playFanfare();
            setMathComplete(true);
            updateGameScore('math-match', 150);
          }
          return updated;
        });
        setFlippedMathCards([]);
      } else {
        sounds.playWrong();
        setTimeout(() => setFlippedMathCards([]), 900);
      }
    }
  };

  const currentPhonicsRound = phonicsRounds[phonicsRoundIndex] || phonicsRounds[0];
  useEffect(() => {
    if (isPhonicsPop) {
      setPoppedBubbleIds([]);
      const bubbles = currentPhonicsRound.bubbles.map((letter, idx) => ({
        id: `bubble-${idx}-${letter}-${Math.random()}`,
        letter,
        isTarget: letter === currentPhonicsRound.targetLetter,
        color: ['bg-purple-400', 'bg-blue-400', 'bg-emerald-400', 'bg-amber-400', 'bg-pink-400', 'bg-indigo-400'][idx % 6],
      }));
      setActiveBubbles(bubbles);
    }
  }, [isPhonicsPop, phonicsRoundIndex]);

  const handlePopBubble = (bubble) => {
    if (poppedBubbleIds.includes(bubble.id) || phonicsComplete) return;
    if (bubble.isTarget) {
      sounds.playPop();
      sounds.playCorrect();
      setPoppedBubbleIds(prev => {
        const next = [...prev, bubble.id];
        setScore(s => s + 20);
        const remainingTargets = activeBubbles.filter(b => b.isTarget && !next.includes(b.id));
        if (remainingTargets.length === 0) {
          setTimeout(() => {
            if (phonicsRoundIndex < phonicsRounds.length - 1) {
              setPhonicsRoundIndex(i => i + 1);
            } else {
              sounds.playFanfare();
              setPhonicsComplete(true);
              updateGameScore('phonics-pop', 140);
            }
          }, 1000);
        }
        return next;
      });
    } else {
      sounds.playWrong();
    }
  };

  useEffect(() => {
    if (isMemoryQuest) {
      const cardDeck = [...memoryAnimals, ...memoryAnimals].map((item, idx) => ({
        uniqueId: `mem-${idx}-${item.id}-${Math.random()}`,
        animalId: item.id,
        name: item.name,
      })).sort(() => Math.random() - 0.5);
      setMemoryCards(cardDeck);
      setFlippedMemoryCards([]);
      setMatchedMemoryAnimalIds([]);
      setMemoryMoves(0);
      setMemoryComplete(false);
    }
  }, [isMemoryQuest]);

  const handleMemoryCardClick = (card) => {
    if (flippedMemoryCards.length >= 2 || flippedMemoryCards.includes(card.uniqueId) || matchedMemoryAnimalIds.includes(card.animalId) || memoryComplete) return;
    sounds.playPop();
    const newFlipped = [...flippedMemoryCards, card.uniqueId];
    setFlippedMemoryCards(newFlipped);
    if (newFlipped.length === 2) {
      setMemoryMoves(m => m + 1);
      const c1 = memoryCards.find(c => c.uniqueId === newFlipped[0]);
      const c2 = memoryCards.find(c => c.uniqueId === newFlipped[1]);
      if (c1.animalId === c2.animalId) {
        sounds.playCorrect();
        setMatchedMemoryAnimalIds(prev => {
          const updated = [...prev, c1.animalId];
          setScore(s => s + 30);
          if (updated.length === memoryAnimals.length) {
            sounds.playFanfare();
            setMemoryComplete(true);
            updateGameScore('memory-quest', 180);
          }
          return updated;
        });
        setFlippedMemoryCards([]);
      } else {
        sounds.playWrong();
        setTimeout(() => setFlippedMemoryCards([]), 850);
      }
    }
  };

  const playPatternStep = (colorItem) => {
    setActivePadId(colorItem.id);
    sounds.playTone(colorItem.freq, 0.35);
    setTimeout(() => setActivePadId(null), 350);
  };

  const startNewPatternRound = (roundNum) => {
    setIsShowingPattern(true);
    setPlayerInputSequence([]);
    const padIds = patternColors.map(p => p.id);
    const newSeq = Array.from({ length: roundNum + 2 }, () => padIds[Math.floor(Math.random() * padIds.length)]);
    setPatternSequence(newSeq);
    newSeq.forEach((padId, index) => {
      setTimeout(() => {
        const color = patternColors.find(p => p.id === padId);
        if (color) playPatternStep(color);
        if (index === newSeq.length - 1) setTimeout(() => setIsShowingPattern(false), 400);
      }, (index + 1) * 600);
    });
  };

  useEffect(() => {
    if (isPatternQuest) {
      setPatternRound(1);
      setPatternComplete(false);
      startNewPatternRound(1);
    }
  }, [isPatternQuest]);

  const handlePadClick = (colorItem) => {
    if (isShowingPattern || patternComplete) return;
    playPatternStep(colorItem);
    const nextPlayerSeq = [...playerInputSequence, colorItem.id];
    setPlayerInputSequence(nextPlayerSeq);
    const stepIndex = nextPlayerSeq.length - 1;
    if (colorItem.id !== patternSequence[stepIndex]) {
      sounds.playWrong();
      setTimeout(() => startNewPatternRound(patternRound), 1000);
      return;
    }
    if (nextPlayerSeq.length === patternSequence.length) {
      sounds.playCorrect();
      setScore(s => s + 35);
      if (patternRound >= 4) {
        sounds.playFanfare();
        setPatternComplete(true);
        updateGameScore('pattern-quest', 200);
      } else {
        setPatternRound(r => r + 1);
        setTimeout(() => startNewPatternRound(patternRound + 1), 1200);
      }
    }
  };

  const currentStoneLetter = alphabetPath[currentStoneIndex];
  const nextTargetLetter = alphabetPath[currentStoneIndex + 1];

  useEffect(() => {
    if (isAlphabetAdventure) {
      if (!nextTargetLetter) {
        sounds.playFanfare();
        setAlphabetComplete(true);
        updateGameScore('alphabet-adventure', 160);
        return;
      }
      const alphabetPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l => l !== nextTargetLetter);
      const wrong1 = alphabetPool[Math.floor(Math.random() * alphabetPool.length)];
      const wrong2 = alphabetPool[(Math.floor(Math.random() * alphabetPool.length) + 5) % alphabetPool.length];
      const choices = [nextTargetLetter, wrong1, wrong2].sort(() => Math.random() - 0.5);
      setRiverChoices(choices);
    }
  }, [isAlphabetAdventure, currentStoneIndex]);

  const handleStoneChoice = (letter) => {
    if (alphabetComplete) return;
    if (letter === nextTargetLetter) {
      sounds.playPop();
      sounds.playCorrect();
      setScore(s => s + 20);
      setCurrentStoneIndex(i => i + 1);
    } else {
      sounds.playWrong();
    }
  };

  const gameMeta = useMemo(() => {
    if (isMathMatch) return { title: 'Math Match Arcade', level: 'Math Level 1' };
    if (isPhonicsPop) return { title: 'Phonics Bubble Pop', level: `Round ${phonicsRoundIndex + 1}/5` };
    if (isMemoryQuest) return { title: 'Animal Memory Quest', level: 'Memory Grid' };
    if (isPatternQuest) return { title: 'Color Rhythm Quest', level: `Level ${patternRound}/4` };
    if (isAlphabetAdventure) return { title: 'Alphabet Stepping Stones', level: `Step ${currentStoneIndex + 1}/10` };
    return { title: 'Word Builder Quest', level: `Word ${currentWordIndex + 1}/${wordBuilderLevels.length}` };
  }, [isMathMatch, isPhonicsPop, isMemoryQuest, isPatternQuest, isAlphabetAdventure, phonicsRoundIndex, patternRound, currentStoneIndex, currentWordIndex]);

  const isAnyGameComplete = wordGameComplete || mathComplete || phonicsComplete || memoryComplete || patternComplete || alphabetComplete;

  return (
    <GameContainer game={{ title: gameMeta.title }} score={score} level={gameMeta.level} onBack={() => navigate('/games')}>
      <Confetti active={isAnyGameComplete} duration={3500} />
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 min-h-[75vh]">
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-display font-extrabold text-white flex items-center gap-1.5 border border-white/10 shadow-xs">
              <Star className="w-4 h-4 text-brand-yellow fill-current" />
              <span>Score: {score} XP</span>
            </span>
          </div>
          <button onClick={toggleSound} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10">
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-300" />}
          </button>
        </div>

        {isWordBuilder && !wordGameComplete && (
          <div className="w-full flex flex-col items-center space-y-6">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">Spell the Word!</h2>
            <p className="text-purple-200 text-sm font-body">{currentWordData.hint}</p>
            <div className="flex justify-center items-center gap-2.5 my-2">
              {placedLetters.map((letter, idx) => (
                <button key={idx} onClick={() => handleRemoveWordLetter(letter, idx)} className={`w-14 h-16 rounded-2xl flex items-center justify-center font-display font-black text-2xl border-3 ${letter ? 'bg-white text-neutral-900 border-white' : 'bg-white/10 border-dashed border-white/30'}`}>
                  {letter?.char || ''}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {availableLetters.map((letter) => (
                <motion.button 
                  key={letter.id} 
                  onClick={() => handlePlaceWordLetter(letter)} 
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-13 h-15 rounded-2xl bg-white text-neutral-900 font-display font-black text-2xl shadow-lg border-2 border-white hover:border-brand-yellow cursor-pointer"
                >
                  {letter.char}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* 2. MATH MATCH GAME VIEW */}
        {isMathMatch && !mathComplete && (
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-200 text-xs font-display font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Arithmetic Pair Quest</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Match the Math Pairs!
              </h2>
              <p className="text-purple-200 text-sm font-body max-w-md">
                Tap two cards to match an equation with its correct answer value.
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl">
              {mathCards.map((card) => {
                const isFlipped = flippedMathCards.includes(card.id);
                const isMatched = matchedMathIds.includes(card.matchId);
                return (
                  <motion.button 
                    key={card.id} 
                    onClick={() => handleMathCardClick(card)}
                    whileHover={!isMatched && !isFlipped ? { scale: 1.05, y: -3 } : {}}
                    whileTap={!isMatched && !isFlipped ? { scale: 0.95 } : {}}
                    className={`aspect-[4/3] rounded-2xl font-display font-black text-xl sm:text-2xl transition-all duration-300 flex items-center justify-center p-2 border-3 cursor-pointer ${
                      isMatched 
                        ? 'bg-emerald-500/90 border-emerald-300 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
                        : isFlipped 
                        ? 'bg-white text-neutral-900 border-white shadow-xl' 
                        : 'bg-white/15 border-white/25 text-white/50 hover:bg-white/25 hover:border-white/40'
                    }`}
                  >
                    {isFlipped || isMatched ? card.label : '?'}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. PHONICS BUBBLE POP GAME VIEW */}
        {isPhonicsPop && !phonicsComplete && (
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-display font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Phonics Round {phonicsRoundIndex + 1} of {phonicsRounds.length}</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                {currentPhonicsRound.soundPrompt}
              </h2>
              <p className="text-purple-200 text-sm font-body">
                Pop all floating bubbles with the matching sound before time runs out!
              </p>
            </div>

            <div className="relative w-full max-w-xl min-h-[280px] rounded-[2.5rem] bg-gradient-to-b from-indigo-900/50 via-purple-900/50 to-indigo-950/70 border-2 border-white/25 p-8 flex flex-wrap items-center justify-around gap-4 overflow-hidden shadow-inner">
              {activeBubbles.map((b) => {
                const isPopped = poppedBubbleIds.includes(b.id);
                return (
                  <motion.button 
                    key={b.id} 
                    onClick={() => handlePopBubble(b)}
                    animate={isPopped ? { scale: [1, 1.4, 0], opacity: 0 } : { y: [0, -14, 0], x: [0, 8, 0] }}
                    transition={{ duration: 2.2, repeat: isPopped ? 0 : Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    disabled={isPopped}
                    className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full font-display font-black text-2xl sm:text-3xl text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] border-3 border-white/60 flex items-center justify-center relative cursor-pointer ${b.color} ${isPopped ? 'pointer-events-none' : ''}`}
                  >
                    <div className="absolute top-2 left-3 w-4 h-2.5 rounded-full bg-white/60 rotate-[-25deg]" />
                    <span>{b.letter}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. ANIMAL MEMORY QUEST GAME VIEW */}
        {isMemoryQuest && !memoryComplete && (
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-display font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Wildlife Safari Memory</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Find the Matching Animals!
              </h2>
              <p className="text-purple-200 text-sm font-body">
                Flip two cards to discover pairs of cute animal buddies!
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-xl">
              {memoryCards.map((card) => {
                const isFlipped = flippedMemoryCards.includes(card.uniqueId);
                const isMatched = matchedMemoryAnimalIds.includes(card.animalId);
                return (
                  <motion.button 
                    key={card.uniqueId} 
                    onClick={() => handleMemoryCardClick(card)}
                    whileHover={!isMatched && !isFlipped ? { scale: 1.05 } : {}}
                    whileTap={!isMatched && !isFlipped ? { scale: 0.95 } : {}}
                    className={`aspect-square rounded-2xl p-2 transition-all duration-300 flex items-center justify-center border-3 relative overflow-hidden cursor-pointer ${
                      isMatched 
                        ? 'bg-emerald-500/90 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
                        : isFlipped 
                        ? 'bg-white border-white shadow-xl' 
                        : 'bg-white/15 border-white/20 hover:bg-white/25 hover:border-white/40'
                    }`}
                  >
                    {isFlipped || isMatched ? (
                      <AnimalEmblem name={card.name} />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/50 text-sm font-display font-black">★</div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. COLOR RHYTHM SIMON GAME VIEW */}
        {isPatternQuest && !patternComplete && (
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-display font-bold">
                <Music className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Melody Simon Level {patternRound} of 4</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                {isShowingPattern ? "Listen & Watch Melody..." : "Your Turn: Tap the Sequence!"}
              </h2>
              <p className="text-purple-200 text-sm font-body">
                Repeat the sound melody in the exact musical order!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-sm">
              {patternColors.map((color) => {
                const isActive = activePadId === color.id;
                return (
                  <motion.button 
                    key={color.id} 
                    onClick={() => handlePadClick(color)}
                    disabled={isShowingPattern}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square rounded-3xl p-4 flex flex-col items-center justify-center text-white font-display font-black text-lg border-4 transition-all duration-200 shadow-xl cursor-pointer ${
                      isActive ? `${color.activeBg} scale-105 shadow-[0_0_35px_rgba(255,255,255,0.8)]` : color.bg
                    } ${color.border}`}
                  >
                    <Music className="w-8 h-8 mb-2" />
                    <span>{color.name}</span>
                    <span className="text-xs opacity-75 font-body">Note {color.note}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. ALPHABET STEPPING STONES GAME VIEW */}
        {isAlphabetAdventure && !alphabetComplete && (
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-display font-bold">
                <Compass className="w-3.5 h-3.5 text-brand-yellow" />
                <span>River Stepping Stones Quest</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Which letter comes after '{currentStoneLetter}'?
              </h2>
              <p className="text-purple-200 text-sm font-body">
                Hop across the sparkling river in alphabetical order to reach the magical castle!
              </p>
            </div>

            <div className="w-full max-w-lg p-6 bg-blue-900/40 rounded-[2.5rem] border-2 border-blue-400/30 flex items-center justify-around shadow-inner">
              <div className="flex items-center gap-3">
                <span className="text-xs font-display font-bold text-blue-200 uppercase">Current:</span>
                <div className="w-16 h-16 rounded-2xl bg-brand-yellow text-neutral-900 font-display font-black text-3xl flex items-center justify-center shadow-lg border-3 border-white">
                  {currentStoneLetter}
                </div>
              </div>
              <ArrowRight className="w-8 h-8 text-blue-300 animate-pulse" />
              <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-dashed border-white/40 flex items-center justify-center text-white/60 font-display font-black text-2xl">
                ?
              </div>
            </div>

            <div className="w-full max-w-md text-center pt-2">
              <p className="text-xs uppercase tracking-wider text-purple-300 font-display font-bold mb-3">
                Tap the next stone:
              </p>
              <div className="flex justify-center gap-4">
                {riverChoices.map((choice, i) => (
                  <motion.button 
                    key={i} 
                    onClick={() => handleStoneChoice(choice)}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-18 sm:w-20 sm:h-22 rounded-2xl bg-gradient-to-b from-white to-neutral-100 text-neutral-900 font-display font-black text-3xl shadow-xl border-3 border-white hover:border-brand-yellow transition-all flex items-center justify-center cursor-pointer"
                  >
                    {choice}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* UNIVERSAL VICTORY BANNER */}
        {isAnyGameComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-[3rem] p-8 text-center shadow-2xl space-y-6 border-4 border-amber-300"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-brand-orange shadow-md">
              <Trophy className="w-10 h-10 text-amber-500" />
            </div>

            <div>
              <h2 className="font-display font-black text-3xl text-neutral-900">Quest Champion!</h2>
              <p className="font-body text-neutral-600 mt-1">
                You mastered {gameMeta.title} with flying colors!
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl flex justify-around border border-amber-200">
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase block font-body">Total Score</span>
                <span className="font-display font-black text-2xl text-brand-orange">+{score} XP</span>
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase block font-body">Reward Badge</span>
                <span className="font-display font-black text-xl text-brand-purple flex items-center justify-center gap-1 mt-0.5">
                  <Sparkles className="w-4 h-4 text-brand-yellow fill-current" />
                  <span>Gold Medal</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                variant="game" 
                size="lg" 
                className="w-full" 
                onClick={() => {
                  setScore(0);
                  setWordGameComplete(false);
                  setCurrentWordIndex(0);
                  setMathComplete(false);
                  setPhonicsComplete(false);
                  setPhonicsRoundIndex(0);
                  setMemoryComplete(false);
                  setPatternComplete(false);
                  setAlphabetComplete(false);
                  setCurrentStoneIndex(0);
                }}
              >
                Play Again
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full" 
                onClick={() => navigate('/games')}
              >
                All Games
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </GameContainer>
  );
};

export default GamePlayPage;
