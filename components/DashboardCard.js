import React from 'react';

export default function DashboardCard({ children, className }) {
  return (
    <div className={`bg-gray-600 rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200 ease-in-out ${className}`}>
      {children}
    </div>
  );
}