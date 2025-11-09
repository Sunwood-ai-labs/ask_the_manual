/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const CarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 100 70">
        <defs>
            <linearGradient id="car-shadow-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#9FBBD7" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#9FBBD7" stopOpacity="0" />
            </linearGradient>
        </defs>
        {/* Shadow */}
        <ellipse cx="50" cy="62" rx="30" ry="4" fill="url(#car-shadow-gradient)" />
        {/* Body */}
        <path
            d="M95,40 C94,36 90,34 87,34 L78,34 L72,23 C70.5,20.5 67,19 64,19 L30,19 C27,19 23.5,20.5 22,23 L16,34 L7,34 C4,34 -0.5,36 -1.8,40 L-3,44 C-3.5,46 -2,49 1,49 L5,49 L15.5,49 L78.5,49 L93,49 C96,49 97.5,46 97,44 Z"
            fill="#a1bee0"
        />
        {/* Windows */}
        <path
            d="M71,24 L64,20 L30,20 L23,24 L26,33 L68,33 Z"
            fill="#d3e3f3"
        />
        {/* Wheels */}
        <circle cx="21" cy="48" r="8" fill="#34495e" />
        <circle cx="21" cy="48" r="4" fill="#ecf0f1" />
        <circle cx="73" cy="48" r="8" fill="#34495e" />
        <circle cx="73" cy="48" r="4" fill="#ecf0f1" />
    </svg>
);

export default CarIcon;
