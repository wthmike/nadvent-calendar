import React from 'react';
import { DayCardProps } from '../types';

// Optimized Icon: Removed the complex <mask> for better rendering performance on mobile lists
const FieldHockeyStick = ({ className, simple = false }: { className?: string, simple?: boolean }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    {simple ? (
      // Simple version for watermarks (no mask calculation needed)
      <>
        <path d="M45 10 C 45 5, 55 5, 55 10 L 55 70 C 55 85, 65 85, 75 80 C 80 78, 82 75, 80 70 L 78 65 L 85 62 L 90 70 C 95 80, 85 95, 65 95 C 45 95, 45 80, 45 70 Z" />
        <circle cx="35" cy="85" r="6" />
      </>
    ) : (
      // Detailed version for featured spots
      <>
        <mask id="stripes">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <path d="M0 0 L100 100" stroke="black" strokeWidth="5" />
          <path d="M20 0 L120 100" stroke="black" strokeWidth="5" />
          <path d="M-20 0 L80 100" stroke="black" strokeWidth="5" />
          <path d="M40 0 L140 100" stroke="black" strokeWidth="5" />
          <path d="M-40 0 L60 100" stroke="black" strokeWidth="5" />
        </mask>
        <path 
          d="M45 10 C 45 5, 55 5, 55 10 L 55 70 C 55 85, 65 85, 75 80 C 80 78, 82 75, 80 70 L 78 65 L 85 62 L 90 70 C 95 80, 85 95, 65 95 C 45 95, 45 80, 45 70 Z" 
          mask="url(#stripes)"
        />
        <circle cx="35" cy="85" r="6" />
      </>
    )}
  </svg>
);

const DayCard: React.FC<DayCardProps> = ({ day, isOpen, isLocked, onOpen }) => {
  
  const handleClick = () => {
    if (!isLocked) {
      onOpen(day);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`relative group h-64 w-full perspective-1000 ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* 
        Updates for Mobile Performance:
        - Removed `will-change-transform` to prevent high memory usage on 25 cards.
        - Mobile: No rotation on wrapper. Visibility toggle for faces.
        - Desktop: Standard 3D flip (wrapper rotates 180deg).
      */}
      <div className={`relative w-full h-full transform-style-3d transform-gpu ${isOpen ? 'md:rotate-y-180' : 'md:group-hover:-translate-y-2'} transition-transform duration-500 ease-in-out`}>
        
        {/* Front of Card */}
        {/* Mobile: Hidden instantly when open. Desktop: Visible (backface hidden handles it). */}
        <div className={`absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-sm md:shadow-2xl bg-neutral-900 border border-neutral-800 ${isOpen ? 'hidden md:block' : ''}`}>
          
          {/* Opacity Wrapper for Desktop visual polish (fades out content during flip) */}
          <div className={`w-full h-full transition-opacity ease-in-out ${isOpen ? 'md:opacity-0 md:duration-100' : 'md:opacity-100 md:duration-300 md:delay-150'}`}>
              
              {/* Background Design - Simplified for performance */}
              <div className="absolute inset-0 bg-neutral-900">
                {/* Subtle Pattern - Desktop only to save mobile painting */}
                <div className="hidden md:block absolute inset-0 opacity-[0.03]" 
                      style={{ backgroundImage: 'linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 50%, #ffffff 50%, #ffffff 75%, transparent 75%, transparent)', backgroundSize: '20px 20px' }}>
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 to-neutral-950"></div>
              </div>
              
              {/* Gift Ribbons (Locked Only) */}
              {isLocked && (
                <>
                  <div className="absolute inset-0 flex justify-center pointer-events-none z-10">
                    <div className="w-12 h-full bg-neutral-800/90 border-x border-orange-500/10 shadow-sm"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center pointer-events-none z-10">
                    <div className="w-full h-12 bg-neutral-800/90 border-y border-orange-500/10 shadow-sm"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-16 h-16 bg-neutral-800 border border-orange-500/20 rounded-full shadow-lg flex items-center justify-center">
                        <i className="fas fa-lock text-neutral-500 text-xs"></i>
                    </div>
                  </div>
                </>
              )}

              {/* Abstract Stick Watermark - Use Simple version for performance */}
              <div className="absolute -bottom-10 -right-10 text-neutral-800 transform rotate-12 opacity-30 md:transition-transform md:duration-500 md:group-hover:scale-110 md:group-hover:rotate-6 z-0">
                <FieldHockeyStick className="w-48 h-48" simple={true} />
              </div>

              {/* Status Indicator (Unlocked) */}
              {!isLocked && (
                <div className="absolute top-4 left-0 w-full flex justify-center z-20">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-star text-[8px] text-orange-400"></i>
                    <span className="text-[10px] tracking-[0.3em] font-serif text-orange-400 uppercase border-b border-orange-500/50 pb-1">
                      Open Gift
                    </span>
                    <i className="fas fa-star text-[8px] text-orange-400"></i>
                  </div>
                </div>
              )}

              {/* Date Number - Removed heavy drop-shadow on mobile */}
              <div className="relative flex flex-col items-center justify-center h-full z-30">
                <span className={`text-7xl brand-font italic font-light tracking-tighter transition-colors duration-300 md:drop-shadow-md ${isLocked ? 'text-neutral-300' : 'text-neutral-200 group-hover:text-orange-400'}`}>
                  {day}
                </span>
              </div>

              {/* Bottom Branding Line */}
              {!isLocked && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-700 transform scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              )}
          </div>
        </div>

        {/* Back of Card (Opened) */}
        {/* 
            Mobile Open: rotate-0 (Faces front immediately).
            Mobile Closed: rotate-y-180 (Faces back/hidden).
            Desktop Open: md:rotate-y-180 (Faces forward after wrapper rotates 180).
            Desktop Closed: rotate-y-180 (Faces back/hidden).
        */}
        <div className={`absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-sm md:shadow-xl bg-gradient-to-br from-orange-600 to-red-700 text-white border border-orange-500/30 ${isOpen ? 'rotate-y-0 md:rotate-y-180' : 'rotate-y-180'}`}>
           {day === 25 ? (
              // Special Image for Day 25 (Christmas Day)
              <div className="w-full h-full relative md:hover:scale-105 transition-transform duration-1000">
                 <img 
                   src="https://i.ibb.co/8nXwKrPX/Screenshot-2025-11-30-at-19-11-05.png" 
                   alt="Day 25 Special" 
                   className="w-full h-full object-cover"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                 <div className="absolute bottom-6 left-0 w-full text-center">
                   <p className="text-white font-serif italic tracking-widest text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Merry Christmas</p>
                 </div>
                 {/* Sparkles overlay */}
                 <div className="absolute top-2 right-2 text-yellow-200/50 animate-pulse">
                    <i className="fas fa-star text-xs"></i>
                 </div>
              </div>
           ) : (
              // Standard Card Back
              <>
                {/* Decorative Sparkle BG - Only on Desktop */}
                <div className="hidden md:block absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
                
                {/* Decorative Curve */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px] -z-0"></div>
                
                <div className="relative flex flex-col items-center justify-center h-full p-6 z-10">
                    <span className="text-6xl brand-font text-white/10 absolute top-2 left-4 italic">{day}</span>
                    
                    <div className="mb-4 text-orange-100/90">
                      <FieldHockeyStick className="w-16 h-16 drop-shadow-md" simple={false} />
                    </div>
                    
                    <div className="flex items-center gap-2 border-b border-orange-200/50 pb-1 mb-1">
                       <i className="fas fa-gift text-xs text-orange-200"></i>
                       <p className="text-[10px] font-serif italic tracking-widest text-orange-100">
                         SESSION UNLOCKED
                       </p>
                       <i className="fas fa-gift text-xs text-orange-200"></i>
                    </div>
                </div>
              </>
           )}
        </div>

      </div>
    </div>
  );
};

export default DayCard;