import React from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  percentage: number;
  label: string;
  color: keyof typeof colorClasses;
  size?: number;
}

const colorClasses = {
  green: '#10B981',
  pink: '#EC4899',
  cyan: '#06B6D4',
  purple: '#8B5CF6'
};

export function CircularProgress({ percentage, label, color, size = 120 }: CircularProgressProps) {
  // Clamp percentage between 0 and 100
  const safePercentage = Math.max(0, Math.min(percentage, 100));
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (safePercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{ width: size, height: size }}
        role="progressbar"
        aria-label={label}
        aria-valuenow={safePercentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(156, 163, 175, 0.2)"
            strokeWidth="6"
            fill="transparent"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorClasses[color]}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${colorClasses[color]}40)`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{safePercentage}%</span>
        </div>
      </div>
      <p className="text-gray-300 text-sm mt-2 text-center">{label}</p>
    </div>
  );
} 