'use client';

import SubpageLink from './SubpageLink';
import Image from 'next/image'; // Import Image component
import { Waves, Mountain, Wind, Droplets, Sun, Cloud, Flame, Thermometer, Globe } from 'lucide-react'; // Changed Fire to Flame, Added Globe
import type React from 'react';

const EarthPage = () => {
  const subpages = [
    { id: 'atmosphere', name: 'Atmosphere', icon: Wind },
    { id: 'climate', name: 'Climate', icon: Thermometer }, // Kept climate for now, might remove later based on user request
    { id: 'continental-drift', name: 'Continental Drift & Geodynamics', icon: Mountain },
    { id: 'gravity', name: 'Gravity', icon: Droplets }, // Placeholder icon
    { id: 'hurricanes', name: 'Hurricanes', icon: Wind }, // Placeholder icon
    { id: 'ice', name: 'Ice', icon: Cloud }, // Placeholder icon, maybe Snowflake?
    { id: 'land-vegetation', name: 'Land and Vegetation', icon: Mountain }, // Placeholder icon
    { id: 'oceans', name: 'Oceans', icon: Waves },
    { id: 'ozone', name: 'Ozone', icon: Cloud }, // Placeholder icon
    { id: 'sun-influence', name: 'Sun and Its Influence', icon: Sun },
    { id: 'water-cycle', name: 'Water Cycle', icon: Droplets },
    { id: 'weather', name: 'Weather', icon: Cloud },
    { id: 'wildfires', name: 'Wildfires', icon: Flame }, // Changed Fire to Flame
  ];

  return (
     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {/* Enhanced Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
           <div className="flex justify-center mb-8">
             {/* Simple animated Earth representation */}
             <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
               <Globe className="w-16 h-16 text-blue-100" />
             </div>
           </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-500 mb-6">
             Our Pale Blue Dot
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-6 max-w-3xl mx-auto font-mono">
            "Look again at that dot. That's here. That's home. That's us." - Carl Sagan
          </p>
          <p className="text-base text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the intricate systems and breathtaking beauty of our home planet. Explore its atmosphere, oceans, landforms, and the delicate balance that sustains life.
          </p>
        </section>

        {/* Redesigned Subpage Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-8 dark:text-white text-gray-900 text-center">
            Explore Earth's Features
          </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {subpages.map((subpage) => (
              // Pass icon to SubpageLink
              <SubpageLink key={subpage.id} id={subpage.id} name={subpage.name} Icon={subpage.icon} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EarthPage;
