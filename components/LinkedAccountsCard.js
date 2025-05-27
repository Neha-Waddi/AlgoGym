import React from 'react';
import { XMarkIcon, CheckCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function LinkedAccountsCard({ handles }) {
  const hasHandles = Object.keys(handles).length > 0;

  return (
    <div className="w-100 p-6 bg-gray-800 rounded-xl  shadow-lg">
      <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-bold text-white">Linked Accounts</h3>
           <Link href="/profile" className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
          <PlusIcon className="h-4 w-4" />
          Edit Accounts
          </Link>
      </div>

      {hasHandles ? (
        <div className="space-y-4 mb-6">
          {Object.entries(handles).map(([platform, handle]) => (
            <div 
              key={platform} 
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors duration-150"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                  <span className="text-white font-medium uppercase text-sm">
                    {platform.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 capitalize">{platform}</p>
                  <a
                    href={`${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm hover:underline"
                  >
                    @{handle}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                <button className="text-gray-400 hover:text-gray-200">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-6 p-6 text-center bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-600">
          <p className="text-gray-400 mb-3">No accounts linked yet</p>
          <p className="text-sm text-gray-500">Link your social accounts to unlock more features</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500">
          {hasHandles ? `${Object.keys(handles).length} account(s) connected` : 'Get started by adding an account'}
        </p>
        <button className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
          Manage settings
        </button>
      </div>
    </div>
  );
}