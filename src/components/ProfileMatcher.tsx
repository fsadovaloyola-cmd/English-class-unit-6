import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Trophy, UserCheck } from 'lucide-react';
import { PROFILE_CHALLENGES } from '../constants';
import TranslateText from './TranslateText';

export default function ProfileMatcher({ onComplete, translationEnabled }: { onComplete: () => void, translationEnabled: boolean }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentChallenge = PROFILE_CHALLENGES[currentIdx];

  const handleSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    if (option === currentChallenge.correctPassive) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < PROFILE_CHALLENGES.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
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
          <div className="bg-emerald-100 p-4 rounded-full">
            <Trophy className="w-12 h-12 text-emerald-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2 font-display">Recruitment Master!</h2>
        <p className="text-slate-600 mb-8">
          You matched {score} out of {PROFILE_CHALLENGES.length} professional profiles correctly.
        </p>
        <button 
          onClick={onComplete}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          Continue to Builder <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-1">Profile Matcher</h2>
          <p className="text-slate-500 text-sm">Challenge {currentIdx + 1} of {PROFILE_CHALLENGES.length}</p>
        </div>
        <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / PROFILE_CHALLENGES.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <motion.div
          key={`card-${currentIdx}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
        >
          <div className="h-64 relative">
            <img 
              src={currentChallenge.image} 
              alt={currentChallenge.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white font-display">{currentChallenge.name}</h3>
              <p className="text-white/80 text-sm">Hiring Manager</p>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-2 text-emerald-600 mb-4">
              <UserCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Active Need</span>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed italic">
              "<TranslateText text={currentChallenge.activeDescription} enabled={translationEnabled} />"
            </p>
          </div>
        </motion.div>

        {/* Options */}
        <div className="space-y-4">
          <p className="text-sm font-bold text-slate-500 mb-4 px-2 uppercase tracking-wider">Select the correct Passive Modal Profile:</p>
          {currentChallenge.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentChallenge.correctPassive;
            
            let bgClass = "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md";
            if (selectedOption) {
              if (isCorrect) bgClass = "bg-emerald-50 border-emerald-500 text-emerald-700 ring-4 ring-emerald-50";
              else if (isSelected) bgClass = "bg-rose-50 border-rose-500 text-rose-700 ring-4 ring-rose-50";
              else bgClass = "bg-white border-slate-100 opacity-50";
            }

            return (
              <motion.button
                key={idx}
                disabled={!!selectedOption}
                onClick={() => handleSelect(option)}
                whileHover={!selectedOption ? { scale: 1.02 } : {}}
                className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex items-start justify-between gap-4 ${bgClass}`}
              >
                <span className="font-medium leading-snug">
                  <TranslateText text={option} enabled={translationEnabled} />
                </span>
                {selectedOption && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />}
                {selectedOption && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-600 shrink-0" />}
              </motion.button>
            );
          })}

          <AnimatePresence>
            {selectedOption && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4"
              >
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {currentIdx === PROFILE_CHALLENGES.length - 1 ? 'Finish Challenge' : 'Next Profile'} <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
