'use client';

import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SubpageLinkProps {
  id: string;
  name: string;
  Icon: React.ComponentType<{ className?: string }>; // Accept Icon component
}

const SubpageLink: React.FC<SubpageLinkProps> = ({ id, name, Icon }) => {
  return (
    <Link
      href={`/earth/${id}`}
      className="group perspective block" // Added perspective for 3D effect
      style={{ perspective: '1000px' }} // Set perspective distance
    >
      <div
        className="
          bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
          p-6 rounded-xl shadow-lg dark:shadow-teal-900/30 /* Adjusted shadow color */
          transition-all duration-500 ease-out
          transform-style-3d
          group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-teal-500/50 /* Adjusted shadow color */
          group-hover:-rotate-y-1 group-hover:-translate-z-2
          border border-transparent dark:border-gray-700/50 dark:hover:border-teal-500/60 /* Adjusted border color */
          relative overflow-hidden h-full flex flex-col justify-between
        "
      >
        {/* Subtle gradient background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-green-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>

        <div className="relative z-10"> {/* Content container */}
          <div className="mb-4">
             <div className="p-3 rounded-full bg-teal-900/50 inline-block"> {/* Adjusted icon background */}
                <Icon className="h-6 w-6 text-teal-300" /> {/* Adjusted icon color */}
             </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-100 dark:text-white mb-2">{name}</h3>
          <p className="text-gray-400 dark:text-gray-300 text-sm flex-grow">
            Learn more about Earth's {name.toLowerCase()}.
          </p>
        </div>

        <div className="relative z-10 mt-5 flex justify-end items-center">
          <span className="inline-flex items-center text-teal-300 group-hover:text-teal-200 font-medium text-sm transition-colors"> {/* Adjusted text color */}
            Explore
            <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SubpageLink;