import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/solid'; 

export default function StreakCounter({ days }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <LightBulbIcon className="h-10 w-10 text-yellow-500 mb-3" />
      <h3 className="text-lg font-semibold text-white mb-1">Current Streak</h3>
      <p className="text-5xl font-extrabold text-pink-500">{days}</p>
      <p className="text-md text-gray-600">Consecutive Days</p>
      {days > 0 && (
        <p className="mt-3 text-sm text-gray-50">Keep up the great work!</p>
      )}
    </div>
  );
}