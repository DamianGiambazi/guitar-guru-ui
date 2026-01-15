import React from 'react';

interface ProgressOrbProps {
  percentage: number;
  label?: string;
  size?: number;
}

export const ProgressOrb: React.FC<ProgressOrbProps> = ({ 
  percentage, 
  label = "Course Progress", 
  size = 200 
}) => {
  const radius = (size / 2) - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center animate-in fade-in duration-1000">
      <div className="relative" style={{ width: size, height: size }}>
        {/* The Core: Background Shadow */}
        <div className="absolute inset-0 rounded-full bg-mine-shaft shadow-[0_0_30px_rgba(130,89,239,0.15)]"></div>
        
        <svg width={size} height={size} className="transform -rotate-90 relative z-10">
          {/* Static Substrate Artery (The 100% path) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Active Vascular Artery (The Progress path) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#orb-gradient)"
            strokeWidth="8"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' 
            }}
            strokeLinecap="round"
            fill="transparent"
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="orb-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8259ef" />
              <stop offset="100%" stopColor="#2d84eb" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central Intelligence: Data Projection */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span className="text-4xl font-light tracking-tighter text-white">
            {Math.round(percentage)}%
          </span>
          <span className="text-[9px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-1">
            Reified
          </span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs font-bold tracking-widest text-hedera-blue uppercase mb-1">{label}</p>
        <div className="flex gap-1 justify-center">
           <div className="w-1 h-1 rounded-full bg-hedera-purple"></div>
           <div className="w-1 h-1 rounded-full bg-hedera-blue"></div>
           <div className="w-1 h-1 rounded-full bg-white/20"></div>
        </div>
      </div>
    </div>
  );
};
