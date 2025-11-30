import React, { useState, useEffect } from 'react';
import DayCard from './components/DayCard';
import Modal from './components/Modal';
import Snowfall from './components/Snowfall';
import { DayChallenge } from './types';

const TOTAL_DAYS = 25;

const ACTIVITIES = [
  "2.5km - 2.5 points - walk/ 5 points - run",
  "20 minute bums and tums workout workout - 5 points",
  "5km run - 10 points",
  "Leg strength workout - 5 points per 15 mins",
  "Speed session - 10 points",
  "20 min yoga/stretch - 7 points",
  "7km long run - 10 points",
  "3km - 3 points - walk/ 7 points - run",
  "20 mins upper body workout - 5 points",
  "5km run - 10 points",
  "Leg strength workout - 5 points per 15 mins",
  "Speed session - 10 points",
  "20 min yoga/stretch - 7 points",
  "7km long run - 10 points",
  "3.5km - 3.5 points - walk/ 8 points - run",
  "20 mins HIIT workout - 5 points",
  "5km run - 10 points",
  "Leg strength workout - 5 points per 15 mins",
  "Speed session - 10 points",
  "20 min yoga/stretch - 7 points",
  "7.5km long run - 10 points",
  "5km - 10 points",
  "1000 rep challenge - 50 points",
  "10km run - 50 points",
  "Christmas Day run - distance = your choice - 50 points"
];

const App: React.FC = () => {
  // --- State ---
  // Initialize to actual date if we are in December, otherwise default to 1 (or handle generally as needed)
  const [currentDate] = useState<number>(() => {
    const now = new Date();
    // If it's December (month 11), use current date. Otherwise default to 1.
    return now.getMonth() === 11 ? now.getDate() : 1;
  });
  
  const [challenges, setChallenges] = useState<DayChallenge[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // --- Initialization ---
  useEffect(() => {
    // Initialize challenges with specific activities
    const initialChallenges: DayChallenge[] = Array.from({ length: TOTAL_DAYS }, (_, i) => ({
      day: i + 1,
      isOpen: false,
      content: ACTIVITIES[i] || "Rest Day", 
      isAiGenerated: false
    }));
    setChallenges(initialChallenges);
  }, []);

  // --- Helpers ---
  const checkIsLocked = (day: number, current: number) => {
    if (day <= 12) return false; // Days 1-12 always unlocked
    if (day >= 13 && day <= 18) return current < 13; // Batch 1: Unlocks Dec 13
    if (day >= 19 && day <= 24) return current < 19; // Batch 2: Unlocks Dec 19
    return current < day; // Day 25 unlocks on Dec 25
  };

  // --- Handlers ---

  const handleOpenDay = (day: number) => {
    const isLocked = checkIsLocked(day, currentDate);
    
    if (isLocked) return;

    setChallenges(prev => prev.map(c => 
      c.day === day ? { ...c, isOpen: true } : c
    ));
    setSelectedDay(day);
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
  };

  // --- Render ---

  // Find the selected challenge object for the modal
  const selectedChallenge = challenges.find(c => c.day === selectedDay);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-serif selection:bg-orange-500 selection:text-white relative overflow-hidden">
      
      {/* Optimized Background: Removed heavy blur-[120px] elements. Replaced with static gradient for mobile speed. */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_top_left,_#115e59_0%,_transparent_40%),_radial-gradient(circle_at_top_right,_#7f1d1d_0%,_transparent_40%),_radial-gradient(circle_at_bottom,_#451a03_0%,_transparent_50%)] opacity-30"></div>

      {/* Snowfall Effect */}
      <Snowfall />

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-24 pb-16 px-6 text-center">
          <div className="mb-6 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.3em] text-orange-500/80 uppercase">
             <i className="fas fa-star text-[8px] animate-pulse"></i>
             <span>Duchy Winter Training</span>
             <i className="fas fa-star text-[8px] animate-pulse"></i>
          </div>
          
          <h1 className="text-6xl md:text-9xl brand-font font-light italic text-white mb-4 drop-shadow-lg">
            NADVENT
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-lg md:text-2xl brand-font text-neutral-400 italic">
            <span className="hidden md:block h-px w-8 bg-gradient-to-r from-transparent to-neutral-600"></span>
            <span>Nadias fabulous fitness frolicking fun!</span>
            <span className="hidden md:block h-px w-8 bg-gradient-to-l from-transparent to-neutral-600"></span>
          </div>
        </header>

        {/* Grid */}
        <main className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {challenges.map((challenge) => {
              const isLocked = checkIsLocked(challenge.day, currentDate);
              
              return (
                <div key={challenge.day} className="relative group/wrapper">
                  {challenge.day === 13 && isLocked && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 text-center z-20 pointer-events-none">
                      <div className="inline-block bg-orange-900/90 text-orange-100 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border border-orange-500/40 shadow-xl backdrop-blur-md animate-pulse">
                        <i className="fas fa-gift mr-1 text-orange-400"></i>
                        Next Release: Days 13-18
                      </div>
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-orange-500/40 mx-auto -mt-[1px]"></div>
                    </div>
                  )}
                  {challenge.day === 19 && isLocked && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 text-center z-20 pointer-events-none">
                      <div className="inline-block bg-orange-900/90 text-orange-100 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border border-orange-500/40 shadow-xl backdrop-blur-md animate-pulse">
                        <i className="fas fa-gift mr-1 text-orange-400"></i>
                        Next Release: Days 19-24
                      </div>
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-orange-500/40 mx-auto -mt-[1px]"></div>
                    </div>
                  )}
                  {challenge.day === 25 && isLocked && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 text-center z-20 pointer-events-none">
                      <div className="inline-block bg-orange-900/90 text-orange-100 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border border-orange-500/40 shadow-xl backdrop-blur-md animate-pulse">
                        <i className="fas fa-gift mr-1 text-orange-400"></i>
                        Next Release: Day 25
                      </div>
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-orange-500/40 mx-auto -mt-[1px]"></div>
                    </div>
                  )}
                  <DayCard 
                    day={challenge.day}
                    isOpen={challenge.isOpen}
                    isLocked={isLocked}
                    onOpen={handleOpenDay}
                  />
                </div>
              );
            })}
          </div>
        </main>

        {/* Simple Footer */}
        <footer className="text-center pb-12 text-neutral-700 text-[10px] uppercase tracking-[0.3em]">
          <p className="flex items-center justify-center gap-2">
            <i className="fas fa-snowflake text-xs"></i> 
            Nadvent Hockey 
            <i className="fas fa-snowflake text-xs"></i>
          </p>
        </footer>
      </div>

      {/* Modal */}
      <Modal 
        day={selectedDay}
        challenge={selectedChallenge}
        onClose={handleCloseModal}
      />

    </div>
  );
};

export default App;