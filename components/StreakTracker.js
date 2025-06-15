import React from 'react';
import { LightBulbIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'; 
import Link from 'next/link';

export default function StreakCounter({ days }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <LightBulbIcon className="h-10 w-10 text-yellow-500 mb-3 animate-pulse" />
      
      <h3 className="text-lg font-semibold text-white mb-1">Current Streak 🔥</h3>
      <p className="text-5xl font-extrabold text-pink-500">{days}</p>
      <p className="text-md text-gray-400">Consecutive Days</p>

      {days > 0 && (
        <p className="mt-2 text-sm text-green-400 font-semibold">Keep up the great work! 💪</p>
      )}
      <Link
        href="/problems"
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-300 text-black font-semibold rounded-full hover:bg-yellow-400 transition duration-200 shadow-lg"
      >
        🎯 Solve Today’s Problems
        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
      </Link>

      <p className="text-xs text-gray-400 mt-2 italic">Stay consistent to maintain your streak</p>
    </div>
  );
}
