import React from 'react';
import { ModalProps } from '../types';

const FieldHockeyStick = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M45 10 C 45 5, 55 5, 55 10 L 55 70 C 55 85, 65 85, 75 80 C 80 78, 82 75, 80 70 L 78 65 L 85 62 L 90 70 C 95 80, 85 95, 65 95 C 45 95, 45 80, 45 70 Z" />
    <circle cx="35" cy="85" r="6" />
  </svg>
);

const HighlightedContent = ({ text }: { text: string }) => {
  // Regex to match "X points" or "X.X points" (case insensitive)
  const regex = /(\d+(?:\.\d+)?\s*points)/gi;
  
  const parts = text.split(regex);

  return (
    <p className="text-3xl md:text-4xl brand-font font-normal text-neutral-100 leading-tight">
      {parts.map((part, index) => {
        if (part.match(regex)) {
          return (
            <span key={index} className="inline-block mx-1.5 px-3 py-0.5 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-300 text-2xl md:text-3xl align-middle shadow-[0_0_15px_rgba(249,115,22,0.2)] whitespace-nowrap">
              <i className="fas fa-star text-[0.6em] mr-1.5 align-middle text-orange-400 mb-[2px]"></i>
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
};

const Modal: React.FC<ModalProps> = ({ day, challenge, onClose }) => {
  if (day === null || !challenge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-950/90 backdrop-blur-md transition-opacity duration-500" 
        onClick={onClose}
      ></div>

      {/* Modal Content - Update: removed unconditional animate-fade-in-scale, added md: prefix */}
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden md:animate-fade-in-scale">
        
        {/* Stylish Header */}
        <div className="relative h-40 bg-orange-600 flex items-center justify-center overflow-hidden">
          {/* Abstract Pattern */}
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] border-[20px] border-white/20 rounded-full"></div>
             <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] border-[10px] border-white/20 rounded-full"></div>
          </div>
          
          <div className="z-10 text-center">
            <h2 className="text-9xl brand-font italic text-orange-900/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none">
              {day}
            </h2>
            <div className="relative">
              <span className="block text-xs font-serif tracking-[0.4em] text-orange-100 uppercase mb-2">Dec {day}</span>
              <h3 className="text-3xl brand-font text-white italic">Training Session</h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-orange-200 hover:text-white transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-10 text-center bg-neutral-900 relative">
          
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mb-8 opacity-50">
             <div className="h-px w-12 bg-orange-500"></div>
             <FieldHockeyStick className="w-6 h-6 text-orange-500" />
             <div className="h-px w-12 bg-orange-500"></div>
          </div>

          <div className="mb-10">
             <HighlightedContent text={challenge.content} />
          </div>

          <div className="flex flex-col gap-2 items-center justify-center">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-transparent border border-orange-600 text-orange-500 hover:bg-orange-600 hover:text-white transition-all duration-300 font-serif italic text-lg rounded-none uppercase tracking-widest"
            >
              Close Window
            </button>
            <span className="text-[10px] text-neutral-600 uppercase tracking-widest mt-4">Field Hockey Club</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;