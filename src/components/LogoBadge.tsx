import React, { useState } from 'react';
import logoImage from '../assets/images/baro_quran_clean_logo_1787399746160.jpg';

interface LogoBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LogoBadge: React.FC<LogoBadgeProps> = ({ size = 'md', className = '' }) => {
  const [imageError, setImageError] = useState(false);

  const dim = {
    sm: 'w-10 h-10',
    md: 'w-13 h-13',
    lg: 'w-16 h-16'
  }[size];

  return (
    <div className={`${dim} rounded-2xl bg-white p-0.5 flex items-center justify-center shadow-md border-2 border-emerald-600 overflow-hidden group-hover:scale-105 transition-transform duration-200 shrink-0 ${className}`}>
      {!imageError ? (
        <img
          src={logoImage}
          alt="Baro Quran Academy Logo"
          className="w-full h-full object-contain rounded-xl"
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Crisp inline vector emblem fallback */
        <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crescent and Star */}
          <path d="M50 8 C47 8 44 11 44 15 C44 19 47 22 50 22 C48 21 47 18 47 15 C47 12 48 9 50 8Z" fill="#16a34a" />
          <polygon points="52,13 53.5,15.5 56,15.5 54,17 55,19.5 52.5,18 50,19.5 51,17 49,15.5 51.5,15.5" fill="#16a34a" />
          {/* Dome & Frame */}
          <path d="M30 42 C30 26 40 18 50 18 C60 18 70 26 70 42" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 20 L76 46 L50 72 L24 46 Z" stroke="#16a34a" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Letter B */}
          <text x="50" y="44" textAnchor="middle" fill="#15803d" fontSize="16" fontWeight="bold" fontFamily="serif">B</text>
          {/* Open Quran Book */}
          <path d="M22 54 C35 48 44 52 50 56 C56 52 65 48 78 54 L78 64 C65 58 56 62 50 66 C44 62 35 58 22 64 Z" fill="#22c55e" />
          <path d="M20 64 C34 58 44 62 50 66 C56 62 66 58 80 64 L80 68 C66 62 56 66 50 70 C44 66 34 62 20 68 Z" fill="#16a34a" />
          <rect x="18" y="69" width="64" height="3" rx="1.5" fill="#15803d" />
        </svg>
      )}
    </div>
  );
};
