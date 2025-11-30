import React, { useEffect, useState } from 'react';

interface Flake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
  size: number;
}

const Snowfall: React.FC = () => {
  const [flakes, setFlakes] = useState<Flake[]>([]);

  useEffect(() => {
    // Optimized: Reduced flake count from 75 to 40 to improve mobile frame rates
    const count = 40; 
    const newFlakes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position
      animationDuration: Math.random() * 15 + 10, // Slow fall between 10s and 25s
      animationDelay: Math.random() * 20 * -1, // Random start time
      opacity: Math.random() * 0.4 + 0.1, // Slightly more visible
      size: Math.random() * 4 + 2, // Varied sizes
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0px);
          }
          25% {
            transform: translateY(20vh) translateX(15px);
          }
          50% {
             transform: translateY(50vh) translateX(-15px);
          }
          75% {
             transform: translateY(80vh) translateX(15px);
          }
          100% {
            transform: translateY(110vh) translateX(0px);
          }
        }
      `}</style>
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full blur-[0.5px]"
          style={{
            left: `${flake.left}%`,
            top: `-20px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.animationDelay}s`,
            willChange: 'transform' // Explicit hint for compositor
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;