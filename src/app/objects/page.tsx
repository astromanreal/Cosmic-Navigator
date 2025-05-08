'use client';

import Link from 'next/link';
import objectData from './objectData.json'; // Assuming objectData.json is in the correct location
import { Atom, ArrowRight, BrainCircuit, Waves, Sigma, Microscope, Infinity } from 'lucide-react';
import type React from 'react'; // Import React type for ComponentType
import { Badge } from '@/components/ui/badge';

interface SpaceObject {
  id: string;
  name: string;
  description: string;
  category: string; // Assuming category exists, add if needed in JSON
  difficulty: string; // Assuming difficulty exists, add if needed in JSON
}

// Map category to icons (similar to Topics page, adjust as needed)
const categoryIcons: { [key: string]: React.ComponentType } = {
  Cosmology: BrainCircuit,
  Relativity: Waves,
  'Quantum Physics': Atom,
  'Theoretical Physics': Sigma,
  Astrobiology: Microscope,
  'Philosophy of Science': Infinity,
  Astrophysics: Atom, // Default or specific icon
  Astronomy: Atom, // Default or specific icon
  // Add more categories and icons if present in objectData.json
};


const ObjectsPage = () => {
  // Use the imported JSON data directly
  const objects: SpaceObject[] = objectData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
       <div className="container mx-auto py-16 px-4">
         {/* Enhanced Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mb-6">
             Celestial Wonders
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-6 max-w-3xl mx-auto font-mono">
            "Somewhere, something incredible is waiting to be known." - Carl Sagan
          </p>
          <p className="text-base text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the diverse and mysterious objects that populate our universe, from stars and planets to black holes and nebulae.
          </p>
        </section>

        {/* Redesigned Object Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {objects.map((obj: SpaceObject) => {
            const IconComponent = categoryIcons[obj.category] || Atom; // Default icon if category doesn't match
            return (
              <Link
                href={`/objects/${obj.id}`}
                key={obj.id}
                className="group perspective block" // Added perspective for 3D effect
                style={{ perspective: '1000px' }} // Set perspective distance
              >
                <div
                  className="
                    bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
                    p-6 rounded-xl shadow-lg dark:shadow-cyan-900/30 /* Adjusted shadow color */
                    transition-all duration-500 ease-out
                    transform-style-3d
                    group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-cyan-500/50 /* Adjusted shadow color */
                    group-hover:-rotate-y-1 group-hover:-translate-z-2
                    border border-transparent dark:border-gray-700/50 dark:hover:border-cyan-500/60 /* Adjusted border color */
                    relative overflow-hidden h-full flex flex-col justify-between
                  "
                >
                  {/* Subtle gradient background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>

                  <div className="relative z-10"> {/* Content container */}
                    <div className="mb-4 flex justify-between items-start">
                       <div className="p-3 rounded-full bg-cyan-900/50 inline-block"> {/* Adjusted icon background */ }
                          <IconComponent className="h-6 w-6 text-cyan-300" /> {/* Adjusted icon color */}
                       </div>
                       {obj.difficulty && (
                         <Badge variant="outline" className="border-cyan-400/50 text-cyan-300 text-xs"> {/* Adjusted badge color */}
                           {obj.difficulty}
                         </Badge>
                       )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100 dark:text-white mb-2">{obj.name}</h3>
                    <p className="text-gray-400 dark:text-gray-300 text-sm flex-grow mb-4 line-clamp-3">{obj.description}</p>
                    {obj.category && (
                       <Badge variant="secondary" className="bg-gray-700/70 text-gray-300 text-xs">
                         {obj.category}
                       </Badge>
                    )}
                  </div>

                  <div className="relative z-10 mt-5 flex justify-end items-center">
                    <span className="inline-flex items-center text-cyan-300 group-hover:text-cyan-200 font-medium text-sm transition-colors"> {/* Adjusted text color */}
                      Know More
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

export default ObjectsPage;
