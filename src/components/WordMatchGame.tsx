import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, RotateCcw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { WORD_PAIRS } from '../constants';

interface WordMatchGameProps {
  onComplete: () => void;
}

export default function WordMatchGame({ onComplete }: WordMatchGameProps) {
  const [leftWords, setLeftWords] = useState([...WORD_PAIRS].sort(() => Math.random() - 0.5));
  const [rightWords, setRightWords] = useState([...WORD_PAIRS].sort(() => Math.random() - 0.5));
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState<number[]>([]);
  const [wrongMatch, setWrongMatch] = useState<{left: number, right: number} | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      if (selectedLeft === selectedRight) {
        setMatches(prev => [...prev, selectedLeft]);
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        setWrongMatch({ left: selectedLeft, right: selectedRight });
        setTimeout(() => {
          setWrongMatch(null);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 1000);
      }
    }
  }, [selectedLeft, selectedRight]);

  useEffect(() => {
    if (matches.length === WORD_PAIRS.length) {
      setTimeout(() => setShowResult(true), 500);
    }
  }, [matches]);

  const resetGame = () => {
    setLeftWords([...WORD_PAIRS].sort(() => Math.random() - 0.5));
    setRightWords([...WORD_PAIRS].sort(() => Math.random() - 0.5));
    setMatches([]);
    setSelectedLeft(null);
    setSelectedRight(null);
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
          <div className="bg-indigo-100 p-4 rounded-full animate-bounce">
            <Sparkles className="w-12 h-12 text-indigo-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2 font-display">Vocabulary Master!</h2>
        <p className="text-slate-600 mb-8">
          You successfully matched all HR terms and their translations.
        </p>
        <div className="space-y-3">
          <button 
            onClick={onComplete}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            Next Game <ArrowRight className="w-5 h-5" />
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
        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-1">Word Match</h2>
        <h3 className="text-3xl font-bold text-slate-900 font-display">Connect the HR Terms</h3>
        <p className="text-slate-500 mt-2">Match the English term with its professional translation.</p>
      </div>

      <div className="grid grid-cols-2 gap-12 relative">
        {/* Left Column */}
        <div className="space-y-4">
          {leftWords.map((word) => {
            const isMatched = matches.includes(word.id);
            const isSelected = selectedLeft === word.id;
            const isWrong = wrongMatch?.left === word.id;

            return (
              <motion.button
                key={`left-${word.id}`}
                whileHover={!isMatched ? { x: 5 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => !isMatched && setSelectedLeft(word.id)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                  isMatched 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default' 
                    : isWrong
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                    : 'bg-white border-slate-100 text-slate-700 hover:border-indigo-200 hover:bg-slate-50'
                }`}
              >
                <span className="font-semibold">{word.left}</span>
                {isMatched && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />}
                {isWrong && <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />}
              </motion.button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {rightWords.map((word) => {
            const isMatched = matches.includes(word.id);
            const isSelected = selectedRight === word.id;
            const isWrong = wrongMatch?.right === word.id;

            return (
              <motion.button
                key={`right-${word.id}`}
                whileHover={!isMatched ? { x: -5 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => !isMatched && setSelectedRight(word.id)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                  isMatched 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default' 
                    : isWrong
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                    : 'bg-white border-slate-100 text-slate-700 hover:border-indigo-200 hover:bg-slate-50'
                }`}
              >
                <span className="font-semibold">{word.right}</span>
                {isMatched && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />}
                {isWrong && <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="bg-slate-100 px-6 py-3 rounded-full flex items-center gap-3">
          <div className="flex -space-x-2">
            {[...Array(WORD_PAIRS.length)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full border-2 border-white ${i < matches.length ? 'bg-indigo-600' : 'bg-slate-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {matches.length} of {WORD_PAIRS.length} matched
          </span>
        </div>
      </div>
    </div>
  );
}
