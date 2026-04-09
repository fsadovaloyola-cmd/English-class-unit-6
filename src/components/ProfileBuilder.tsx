import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  CheckCircle, 
  Info, 
  Briefcase,
  FileText,
  Download
} from 'lucide-react';
import { HIRING_STEPS } from '../constants';
import { UserProfile } from '../types';

import TranslateText from './TranslateText';

export default function ProfileBuilder({ translationEnabled }: { translationEnabled: boolean }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    roleName: '',
    steps: {}
  });
  const [isExporting, setIsExporting] = useState(false);

  const currentStepData = HIRING_STEPS[step];

  const handleInputChange = (value: string) => {
    setProfile(prev => ({
      ...prev,
      steps: { ...prev.steps, [step]: value }
    }));
  };

  const handleNext = () => {
    if (step < HIRING_STEPS.length - 1) setStep(s => s + 1);
    else setIsExporting(true);
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  if (isExporting) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
      >
        <div className="flex items-center justify-between mb-8 border-b pb-6">
          <div>
            <h2 className="text-3xl font-bold font-display text-slate-900">Job Profile Summary</h2>
            <p className="text-slate-500">Role: <span className="font-semibold text-indigo-600">{profile.roleName || 'Untitled Role'}</span></p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Briefcase className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="space-y-8">
          {HIRING_STEPS.map((s) => (
            <div key={s.id} className="relative pl-8 border-l-2 border-slate-100">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
              <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                Step {s.id}: {s.title}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl text-slate-700 whitespace-pre-wrap">
                {profile.steps[s.id] || <span className="text-slate-400 italic">No information provided.</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4">
          <button 
            onClick={() => setIsExporting(false)}
            className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" /> Back to Edit
          </button>
          <button 
            onClick={() => window.print()}
            className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" /> Export PDF
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar Progress */}
      <div className="lg:col-span-4 space-y-2">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-4">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Role Name</label>
          <input 
            type="text"
            placeholder="e.g. Senior Software Engineer"
            value={profile.roleName}
            onChange={(e) => setProfile(p => ({ ...p, roleName: e.target.value }))}
            className="w-full bg-transparent text-lg font-bold text-slate-800 outline-none placeholder:text-slate-300"
          />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 mb-4 px-2">Progress</h3>
          <div className="space-y-1">
            {HIRING_STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  step === s.id 
                    ? 'bg-indigo-50 text-indigo-700 font-bold' 
                    : profile.steps[s.id] 
                      ? 'text-emerald-600 hover:bg-slate-50' 
                      : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 ${
                  step === s.id 
                    ? 'border-indigo-600 bg-indigo-600 text-white' 
                    : profile.steps[s.id]
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-slate-200'
                }`}>
                  {profile.steps[s.id] ? <CheckCircle className="w-3 h-3" /> : s.id}
                </div>
                <span className="truncate">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 min-h-[500px] flex flex-col"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <FileText className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Step {step}</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 font-display mb-3">{currentStepData.title}</h2>
              <p className="text-slate-600 leading-relaxed">
                <TranslateText text={currentStepData.description} enabled={translationEnabled} />
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl mb-8">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-600 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-indigo-900 mb-2">Grammar Guide (Passive Modals)</h4>
                  <ul className="space-y-2">
                    {currentStepData.enhancedPoints.map((p, i) => (
                      <li key={i} className="text-sm text-indigo-800 italic leading-snug">
                        "<TranslateText text={p} enabled={translationEnabled} />"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Your Profile Content</label>
              <textarea
                value={profile.steps[step] || ''}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentStepData.placeholder}
                className="flex-1 w-full p-6 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-800 resize-none leading-relaxed"
              />
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition-all flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              
              <div className="flex gap-3">
                <button className="p-3 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all">
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
                >
                  {step === HIRING_STEPS.length - 1 ? 'Finish Profile' : 'Next Step'} <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
