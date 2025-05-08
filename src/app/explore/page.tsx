// src/app/explore/page.tsx
'use client';

import Link from 'next/link';
import { Home as HomeIcon, GraduationCap } from 'lucide-react'; // Added GraduationCap
import { Sun, Moon, Globe, BookOpen, Atom, Rocket, Telescope, Compass } from 'lucide-react';
import featureData from './featureData.json';
import type React from 'react';

interface FeatureItem {
  title: string;
  description: string;
  href: string;
  icon: string; // Changed to string to match JSON
}

const ExplorePage = () => {
  const featureIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Rocket,
    Telescope,
    Compass,
    Globe,
    Atom,
    BookOpen,
    Sun,
    Moon,
    GraduationCap, // Added GraduationCap
    HomeIcon, // Default
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900/80 to-indigo-900 text-gray-100">
      <main className="p-6 max-w-6xl mx-auto">
        <section className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 dark:text-white mb-4">Explore Cosmic Navigator</h1>
          <p className="text-lg text-gray-300 dark:text-gray-400 mb-6">
            Discover humanity's greatest achievements and future possibilities in space.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureData.map((feature, index) => (
            <FeatureCard key={index} {...feature} featureIcons={featureIcons} />
          ))}
        </div>
      </main>
    </div>
  );
};

interface FeatureCardProps extends FeatureItem {
  featureIcons: { [key: string]: React.ComponentType<{ className?: string }> };
}

// Updated FeatureCard with 3D effect and modern styling
function FeatureCard({ title, description, href, icon, featureIcons }: FeatureCardProps) {
  const IconComponent = featureIcons[icon] || HomeIcon; // Use string key
  return (
    <Link
      href={href || '#'}
      className="group perspective block h-full" // Added perspective for 3d effect and h-full
      style={{ perspective: '1000px' }} // Set perspective distance
    >
      <div
        className="
          bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
          p-6 rounded-xl shadow-lg dark:shadow-cyan-900/30
          transition-all duration-500 ease-out
          transform-style-3d
          group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-cyan-500/50
          group-hover:-rotate-y-1 group-hover:-translate-z-2
          border border-transparent dark:border-gray-700/50 dark:hover:border-cyan-500/60
          relative overflow-hidden h-full flex flex-col justify-between
        "
      >
        {/* Subtle gradient background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>

        <div className="relative z-10 flex flex-col flex-grow"> {/* Content container */}
          <div className="mb-4">
             <div className="p-3 rounded-full bg-cyan-900/50 inline-block">
                <IconComponent className="h-6 w-6 text-cyan-300" />
             </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-100 dark:text-white mb-2">{title}</h2>
          <p className="text-gray-400 dark:text-gray-300 text-sm flex-grow mb-4">{description}</p>
        </div>

        <div className="relative z-10 mt-auto flex justify-end items-center"> {/* Ensure button is at the bottom */}
           <span className="inline-flex items-center text-cyan-300 group-hover:text-cyan-200 font-medium text-sm transition-colors">
            Know More...
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
           </span>
        </div>
      </div>
    </Link>
  );
}

export default ExplorePage;
