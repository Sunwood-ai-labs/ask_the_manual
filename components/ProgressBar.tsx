/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  message: string;
  fileName?: string;
  icon?: React.ReactNode;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total, message, fileName, icon }) => {
  const percentage = total > 0 ? (progress / total) * 100 : 0;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        {icon && <div className="mb-8">{icon}</div>}
        <h2 className="text-2xl font-bold mb-2">{message}</h2>
        <p className="text-gem-offwhite/70 mb-4 h-6 truncate max-w-full px-4" title={fileName}>{fileName || ''}</p>
        <div className="w-full max-w-md bg-gem-mist rounded-full h-4 overflow-hidden">
            <div
                className="bg-gem-blue h-4 rounded-full transition-all duration-300 ease-in-out animate-progress-stripes"
                style={{ 
                    width: `${percentage}%`,
                    backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)',
                    backgroundSize: '1rem 1rem'
                }}
            ></div>
        </div>
        <p className="mt-4 text-lg">{`${progress} / ${total}`}</p>
    </div>
  );
};

export default ProgressBar;