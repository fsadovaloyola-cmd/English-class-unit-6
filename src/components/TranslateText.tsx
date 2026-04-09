import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface TranslateTextProps {
  text: string;
  enabled: boolean;
}

export default function TranslateText({ text, enabled }: TranslateTextProps) {
  if (!enabled) return <span>{text}</span>;

  // Split text into words and punctuation
  const parts = text.split(/(\s+|[.,!?;:])/);

  return (
    <span>
      {parts.map((part, i) => {
        const cleanWord = part.toLowerCase().trim().replace(/[.,!?;:]/g, '');
        const translation = TRANSLATIONS[cleanWord];

        if (translation) {
          return <WordWithTooltip key={i} word={part} translation={translation} />;
        }

        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

function WordWithTooltip({ word, translation }: { word: string; translation: string; key?: React.Key }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className="relative inline-block cursor-help border-b border-dotted border-indigo-400 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="group-hover:text-indigo-600 transition-colors">{word}</span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap pointer-events-none"
          >
            {translation}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
