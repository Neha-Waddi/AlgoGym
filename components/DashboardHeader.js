import React from 'react';

export default function DashboardHeader({ name }) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-200 mb-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white leading-tight">
          Welcome, {name.split(' ')[0]}!
        </h1>
        <p className="mt-1 text-md text-gray-50">
          Here's an overview of your progress and activities.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
          Quick Action
        </button>
      </div>
    </div>
  );
}