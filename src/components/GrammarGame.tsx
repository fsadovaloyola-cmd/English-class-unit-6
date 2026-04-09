import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { GRAMMAR_CHALLENGES } from '../constants';

import TranslateText from './TranslateText';

export default function GrammarGame({ onComplete, translationEnabled }: { onComplete: () => void, translationEnabled: boolean }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentChallenge = GRAMMAR_CHALLENGES[currentIdx];

  // Generate options: correct one + 2 random ones from other challenges
  const options = React.useMemo(() => {
    const others = GRAMMAR_CHALLENGES.filter(c => c.enhanced !== currentChallenge.enhanced)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(c => c.enhanced);
    return [currentChallenge.enhanced, ...others].sort(() => Math.random() - 0.5);
  }, [currentIdx]);

  const handleSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    const correct = option === currentChallenge.enhanced;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIdx < GRAMMAR_CHALLENGES.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl text-center border border-slate-100"
      >
        <div className="mb-6 flex justify-center">
          <div className="bg-yellow-100 p-4 rounded-full">
            <Trophy className="w-12 h-12 text-yellow-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2 font-display">Challenge Complete!</h2>
        <p className="text-slate-600 mb-8">
          You mastered {score} out of {GRAMMAR_CHALLENGES.length} passive modal structures.
        </p>
        <div className="space-y-3">
          <button 
            onClick={onComplete}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            Start Building Profiles <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              setCurrentIdx(0);
              setScore(0);
              setShowResult(false);
              setSelectedOption(null);
              setIsCorrect(null);
            }}
            className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-1">Grammar Challenge</h2>
          <p className="text-slate-500 text-sm">Step {currentIdx + 1} of {GRAMMAR_CHALLENGES.length}</p>
        </div>
        <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / GRAMMAR_CHALLENGES.length) * 100}%` }}
          />
        </div>
      </div>

      <motion.div
        key={currentIdx}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
      >
        <div className="mb-6">
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded mb-2 inline-block">Original Sentence</span>
          <h3 className="text-xl font-medium text-slate-800 italic">
            "<TranslateText text={currentChallenge.original} enabled={translationEnabled} />"
          </h3>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-500 mb-2">Choose the enhanced passive modal version:</p>
          {options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isThisCorrect = option === currentChallenge.enhanced;
            
            let bgClass = "bg-white border-slate-200 hover:border-indigo-300";
            if (selectedOption) {
              if (isThisCorrect) bgClass = "bg-emerald-50 border-emerald-500 text-emerald-700";
              else if (isSelected) bgClass = "bg-rose-50 border-rose-500 text-rose-700";
              else bgClass = "bg-white border-slate-100 opacity-50";
            }

            return (
              <button
                key={idx}
                disabled={!!selectedOption}
                onClick={() => handleSelect(option)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all flex items-center justify-between group ${bgClass}`}
              >
                <span className="font-medium">
                  <TranslateText text={option} enabled={translationEnabled} />
                </span>
                {selectedOption && isThisCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {selectedOption && isSelected && !isThisCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedOption && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-6 pt-6 border-t border-slate-100"
            >
              <div className="bg-indigo-50 p-4 rounded-xl mb-6">
                <p className="text-sm text-indigo-800">
                  <span className="font-bold">Grammar Point:</span> {currentChallenge.point}
                </p>
              </div>
              <button
                onClick={handleNext}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                {currentIdx === GRAMMAR_CHALLENGES.length - 1 ? 'Finish' : 'Next Challenge'} <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
