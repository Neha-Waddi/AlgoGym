import React from 'react';


export default function XPProgressBar({ xp, level }) {
  const maxXPForLevel = level * 100 + 50; 
  const progressPercentage = (xp / maxXPForLevel) * 100;

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Experience Progress</h3>
      <div className="flex items-center justify-between text-sm text-gray-50 mb-2">
        <span>Level {level}</span>
        <span>{xp} / {maxXPForLevel} XP</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-indigo-500 to-pink-600 h-3 rounded-full shadow-inner"
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        ></div>
      </div>
      {progressPercentage >= 100 && (
        <p className="mt-2 text-sm text-green-600 font-medium">Ready for Level Up!</p>
      )}
    </div>
  );
}