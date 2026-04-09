import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  ArrowRight,
  LayoutDashboard,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import GrammarGame from './components/GrammarGame';
import ProfileMatcher from './components/ProfileMatcher';
import ProfileBuilder from './components/ProfileBuilder';
import WordMatchGame from './components/WordMatchGame';
import MemoryMatchGame from './components/MemoryMatchGame';

type AppMode = 'landing' | 'grammar' | 'matcher' | 'wordmatch' | 'memory' | 'builder';

export default function App() {
  const [mode, setMode] = useState<AppMode>('landing');
  const [translationEnabled, setTranslationEnabled] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 group"
          >
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold font-display tracking-tight text-slate-900">
              Hiring<span className="text-indigo-600">Master</span>
            </h1>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setMode('grammar')}
              className={`text-sm font-semibold transition-colors ${mode === 'grammar' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Grammar
            </button>
            <button 
              onClick={() => setMode('matcher')}
              className={`text-sm font-semibold transition-colors ${mode === 'matcher' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Matcher
            </button>
            <button 
              onClick={() => setMode('wordmatch')}
              className={`text-sm font-semibold transition-colors ${mode === 'wordmatch' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              WordMatch
            </button>
            <button 
              onClick={() => setMode('memory')}
              className={`text-sm font-semibold transition-colors ${mode === 'memory' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Memory
            </button>
            <button 
              onClick={() => setMode('builder')}
              className={`text-sm font-semibold transition-colors ${mode === 'builder' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Builder
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTranslationEnabled(!translationEnabled)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border-2 ${
                translationEnabled 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
              }`}
            >
              {translationEnabled ? 'Translation ON' : 'Translation OFF'}
            </button>
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-600">Passive Modals Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {mode === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="mb-6 inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold">
                  <GraduationCap className="w-4 h-4" />
                  Master Professional HR Communication
                </div>
                <h2 className="text-5xl md:text-6xl font-bold font-display text-slate-900 mb-6 leading-tight">
                  Enhance Your Hiring Process with <span className="text-indigo-600">Precision</span>
                </h2>
                <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Learn to use passive modals for professional job profiles while following a proven 8-step hiring framework.
                </p>

                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <button 
                    onClick={() => setMode('grammar')}
                    className="group bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100 transition-all text-left"
                  >
                    <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Grammar</h3>
                    <p className="text-slate-500 mb-6">Master passive modals by transforming active sentences into professional standards.</p>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold">
                      Start <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button 
                    onClick={() => setMode('matcher')}
                    className="group bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100 transition-all text-left"
                  >
                    <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <UserCheck className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Matcher</h3>
                    <p className="text-slate-500 mb-6">Match real hiring needs with the correct professional passive modal profile.</p>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold">
                      Play <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button 
                    onClick={() => setMode('wordmatch')}
                    className="group bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100 transition-all text-left"
                  >
                    <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <LayoutDashboard className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Word Match</h3>
                    <p className="text-slate-500 mb-6">Connect HR terms with their professional translations in a fast-paced matching game.</p>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold">
                      Match <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button 
                    onClick={() => setMode('memory')}
                    className="group bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100 transition-all text-left"
                  >
                    <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Memory Match</h3>
                    <p className="text-slate-500 mb-6">Test your memory by finding pairs of active instructions and passive modal enhancements.</p>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold">
                      Find <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button 
                    onClick={() => setMode('builder')}
                    className="group bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100 transition-all text-left"
                  >
                    <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Builder</h3>
                    <p className="text-slate-500 mb-6">Create a real-life job profile using our interactive 8-step professional framework.</p>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold">
                      Build <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>

                <div className="mt-16 pt-12 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-1">8</div>
                    <div className="text-sm text-slate-500 font-medium">Strategic Steps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-1">7+</div>
                    <div className="text-sm text-slate-500 font-medium">Grammar Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
                    <div className="text-sm text-slate-500 font-medium">Interactive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-1">PDF</div>
                    <div className="text-sm text-slate-500 font-medium">Export Ready</div>
                  </div>
                </div>
              </motion.div>
            )}

            {mode === 'grammar' && (
              <motion.div
                key="grammar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GrammarGame onComplete={() => setMode('matcher')} translationEnabled={translationEnabled} />
              </motion.div>
            )}

            {mode === 'matcher' && (
              <motion.div
                key="matcher"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ProfileMatcher onComplete={() => setMode('wordmatch')} translationEnabled={translationEnabled} />
              </motion.div>
            )}

            {mode === 'wordmatch' && (
              <motion.div
                key="wordmatch"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <WordMatchGame onComplete={() => setMode('memory')} />
              </motion.div>
            )}

            {mode === 'memory' && (
              <motion.div
                key="memory"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <MemoryMatchGame onComplete={() => setMode('builder')} translationEnabled={translationEnabled} />
              </motion.div>
            )}

            {mode === 'builder' && (
              <motion.div
                key="builder"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ProfileBuilder translationEnabled={translationEnabled} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-500 font-medium">Professional HR Training Tool</span>
          </div>
          <div className="text-sm text-slate-400">
            Based on Gabriel's Grammar Feedback & Strategic Hiring Process
          </div>
        </div>
      </footer>
    </div>
  );
}
