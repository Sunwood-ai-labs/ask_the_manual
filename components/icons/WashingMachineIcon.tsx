/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const WashingMachineIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="washer-body-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a7c4e4" />
                <stop offset="100%" stopColor="#87b3d1" />
            </linearGradient>
            <radialGradient id="washer-glass-gradient" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d4e3f3" stopOpacity="0.8" />
            </radialGradient>
        </defs>
        
        <rect x="15" y="10" width="70" height="85" rx="5" fill="url(#washer-body-gradient)" />
        
        {/* Control Panel */}
        <rect x="20" y="15" width="25" height="10" rx="2" fill="#7896b8" fillOpacity="0.6"/>
        <rect x="50" y="15" width="30" height="10" rx="2" fill="#7896b8" fillOpacity="0.6"/>
        
        {/* Dials and buttons */}
        <circle cx="65" cy="20" r="3" fill="#cde1f3" />
        <circle cx="56" cy="20" r="1.5" fill="#cde1f3" />
        <circle cx="74" cy="20" r="1.5" fill="#cde1f3" />

        {/* Door */}
        <circle cx="50" cy="55" r="25" fill="#394a60" />
        <circle cx="50" cy="55" r="22" fill="url(#washer-glass-gradient)" />
        <circle cx="50" cy="55" r="19" fill="#394a60" opacity="0.3" />


        {/* Feet */}
        <rect x="20" y="95" width="10" height="3" rx="1" fill="#7896b8" />
        <rect x="70" y="95" width="10" height="3" rx="1" fill="#7896b8" />
    </svg>
);

export default WashingMachineIcon;
