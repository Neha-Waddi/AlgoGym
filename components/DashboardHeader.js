import React from 'react';

export default function DashboardHeader({ name }) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-200 mb-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white leading-tight">
          Welcome, {name.split('@')[0]}!
        </h1>
        <p className="mt-1 text-md text-gray-50">
          Here's an overview of your progress and activities.
        </p>
      </div>
      
    </div>
  );
}