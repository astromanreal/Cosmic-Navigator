'use client';

import Link from 'next/link';
import solarSystemData from './solarSystemData.json';
import { Globe, Sun, Orbit, Sparkles, ArrowRight, Mountain } from 'lucide-react'; // Added Mountain, removed Asteroid
import type React from 'react';
import { Badge } from '@/components/ui/badge';

interface SolarSystemBody {
  id: string;
  name: string;
  description: string;
  tagline?: string; // Added tagline to match new solarSystemData structure
  type?: string; // Added type to match new solarSystemData structure
  icon?: string; // Optional icon identifier
}

// Map body type to icons (example)
const bodyIcons: { [key: string]: React.ComponentType } = {
  star: Sun,
  planet: Globe,
  belt: Orbit, // Example for belts
  dwarf: Sparkles, // Example for dwarf planets/other objects
  moon: Globe, // Added moon
  region: Orbit, // Added region
  'small bodies': Mountain, // Added small bodies and using Mountain
  default: Orbit, // Default icon
};


const SolarSystemPage = () => {
  // Assign icons based on name or a potential future 'type' property
  const solarSystemBodiesWithIcons: SolarSystemBody[] = solarSystemData.solarSystemObjects.map(body => {
    let iconName = 'default';
    if (body.name.toLowerCase().includes('sun')) iconName = 'star';
    else if (['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'].includes(body.id)) iconName = 'planet';
    else if (body.name.toLowerCase().includes('belt')) iconName = 'belt';
    else if (body.id.toLowerCase().includes('moon')) iconName = 'moon';
    else if (body.id.toLowerCase().includes('pluto') || body.name.toLowerCase().includes('dwarf')) iconName = 'dwarf';
    else if (body.id.toLowerCase().includes('asteroids')) iconName = 'small bodies';


    return { ...body, icon: iconName };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {/* Enhanced Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-6">
            Journey Through Our Solar System
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-6 max-w-3xl mx-auto font-mono">
            "We are all connected; To each other, biologically. To the earth, chemically. To the rest of the universe atomically." - Neil deGrasse Tyson
          </p>
          <p className="text-base text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Embark on a voyage from the fiery heart of the Sun to the icy outer reaches. Explore the planets, moons, and mysterious objects that share our cosmic neighborhood.
          </p>
        </section>

        {/* Redesigned Solar Body Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solarSystemBodiesWithIcons.map((body: SolarSystemBody) => {
            const IconComponent = bodyIcons[body.icon || 'default'] || Orbit; // Default icon
            return (
              <Link
                href={`/solar-system/${body.id}`}
                key={body.id}
                className="group perspective block" // Added perspective for 3D effect
                style={{ perspective: '1000px' }} // Set perspective distance
              >
                <div
                  className="
                    bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
                    p-6 rounded-xl shadow-lg dark:shadow-orange-900/30 /* Adjusted shadow color */
                    transition-all duration-500 ease-out
                    transform-style-3d
                    group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-orange-500/50 /* Adjusted shadow color */
                    group-hover:-rotate-y-1 group-hover:-translate-z-2
                    border border-transparent dark:border-gray-700/50 dark:hover:border-orange-500/60 /* Adjusted border color */
                    relative overflow-hidden h-full flex flex-col justify-between
                  "
                >
                  {/* Subtle gradient background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>

                  <div className="relative z-10"> {/* Content container */}
                    <div className="mb-4 flex justify-between items-start">
                       <div className="p-3 rounded-full bg-orange-900/50 inline-block"> {/* Adjusted icon background */}
                          <IconComponent className="h-6 w-6 text-orange-300" /> {/* Adjusted icon color */}
                       </div>
                       {body.type && ( // Display type if available
                         <Badge variant="outline" className="border-orange-400/50 text-orange-300 text-xs">
                           {body.type}
                         </Badge>
                       )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100 dark:text-white mb-2">{body.name}</h3>
                    <p className="text-gray-400 dark:text-gray-300 text-sm flex-grow mb-4 line-clamp-3">{body.tagline || body.description}</p> {/* Use tagline or description */}
                  </div>

                  <div className="relative z-10 mt-5 flex justify-end items-center">
                    <span className="inline-flex items-center text-orange-300 group-hover:text-orange-200 font-medium text-sm transition-colors"> {/* Adjusted text color */}
                      Explore
                      <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default SolarSystemPage;
