import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, ArrowRight, Sparkles, Brain, CheckCircle2, XCircle } from 'lucide-react';
import { MEMORY_CARDS } from '../constants';
import TranslateText from './TranslateText';

interface MemoryMatchGameProps {
  onComplete: () => void;
  translationEnabled: boolean;
}

export default function MemoryMatchGame({ onComplete, translationEnabled }: MemoryMatchGameProps) {
  const [activeCards, setActiveCards] = useState([...MEMORY_CARDS.filter(c => c.content.startsWith('Active'))].sort(() => Math.random() - 0.5));
  const [passiveCards, setPassiveCards] = useState([...MEMORY_CARDS.filter(c => c.content.startsWith('Passive'))].sort(() => Math.random() - 0.5));
  const [selectedActive, setSelectedActive] = useState<number | null>(null);
  const [selectedPassive, setSelectedPassive] = useState<number | null>(null);
  const [matches, setMatches] = useState<number[]>([]);
  const [wrongMatch, setWrongMatch] = useState<{active: number, passive: number} | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (selectedActive !== null && selectedPassive !== null) {
      if (selectedActive === selectedPassive) {
        setMatches(prev => [...prev, selectedActive]);
        setSelectedActive(null);
        setSelectedPassive(null);
      } else {
        setWrongMatch({ active: selectedActive, passive: selectedPassive });
        setTimeout(() => {
          setWrongMatch(null);
          setSelectedActive(null);
          setSelectedPassive(null);
        }, 1000);
      }
    }
  }, [selectedActive, selectedPassive]);

  useEffect(() => {
    if (matches.length === MEMORY_CARDS.length / 2) {
      setTimeout(() => setShowResult(true), 500);
    }
  }, [matches]);

  const resetGame = () => {
    setActiveCards([...MEMORY_CARDS.filter(c => c.content.startsWith('Active'))].sort(() => Math.random() - 0.5));
    setPassiveCards([...MEMORY_CARDS.filter(c => c.content.startsWith('Passive'))].sort(() => Math.random() - 0.5));
    setMatches([]);
    setSelectedActive(null);
    setSelectedPassive(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="bg-emerald-100 p-4 rounded-full">
            <Brain className="w-12 h-12 text-emerald-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2 font-display">Grammar Master!</h2>
        <p className="text-slate-600 mb-8">
          You successfully matched all active instructions with their professional passive modal versions.
        </p>
        <div className="space-y-3">
          <button 
            onClick={onComplete}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            Go to Builder <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={resetGame}
            className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> Play Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-1">Sentence Match</h2>
        <h3 className="text-3xl font-bold text-slate-900 font-display">Active to Passive</h3>
        <p className="text-slate-500 mt-2">Connect the active instruction with its professional passive modal enhancement.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* Active Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Active Instructions</h4>
          {activeCards.map((card) => {
            const isMatched = matches.includes(card.pairId);
            const isSelected = selectedActive === card.pairId;
            const isWrong = wrongMatch?.active === card.pairId;

            return (
              <motion.button
                key={`active-${card.id}`}
                whileHover={!isMatched ? { x: 5 } : {}}
                onClick={() => !isMatched && setSelectedActive(card.pairId)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all relative ${
                  isMatched 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 opacity-60' 
                    : isWrong
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                    : 'bg-white border-slate-100 text-slate-700 hover:border-indigo-200'
                }`}
              >
                <span className="text-sm font-semibold">
                  <TranslateText text={card.content.replace('Active: ', '')} enabled={translationEnabled} />
                </span>
                {isMatched && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />}
                {isWrong && <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />}
              </motion.button>
            );
          })}
        </div>

        {/* Passive Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Passive Enhancements</h4>
          {passiveCards.map((card) => {
            const isMatched = matches.includes(card.pairId);
            const isSelected = selectedPassive === card.pairId;
            const isWrong = wrongMatch?.passive === card.pairId;

            return (
              <motion.button
                key={`passive-${card.id}`}
                whileHover={!isMatched ? { x: -5 } : {}}
                onClick={() => !isMatched && setSelectedPassive(card.pairId)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all relative ${
                  isMatched 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 opacity-60' 
                    : isWrong
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                    : 'bg-white border-slate-100 text-slate-700 hover:border-indigo-200'
                }`}
              >
                <span className="text-sm font-semibold">
                  <TranslateText text={card.content.replace('Passive: ', '')} enabled={translationEnabled} />
                </span>
                {isMatched && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />}
                {isWrong && <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button 
          onClick={resetGame}
          className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
        >
          <RotateCcw className="w-4 h-4" /> Reset Game
        </button>
      </div>
    </div>
  );
}
