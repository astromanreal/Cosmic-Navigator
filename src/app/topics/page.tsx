'use client';

import Link from 'next/link';
import topicData from './topicData.json';
import { BrainCircuit, Atom, Waves, Sigma, Microscope, Infinity } from 'lucide-react'; // Importing relevant icons
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type React from 'react'; // Import React type for ComponentType

interface Topic {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
}

// Map category to icons (example)
const categoryIcons: { [key: string]: React.ComponentType } = {
  Cosmology: BrainCircuit,
  Relativity: Waves,
  'Quantum Physics': Atom,
  'Theoretical Physics': Sigma,
  Astrobiology: Microscope,
  'Philosophy of Science': Infinity,
  Astrophysics: Atom, // Re-using Atom or choose another
  Thermodynamics: Waves, // Re-using Waves or choose another
};

const TopicsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {/* Enhanced Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 mb-6">
            Explore Cosmic Frontiers
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-6 max-w-3xl mx-auto font-mono">
            "The most beautiful experience we can have is the mysterious." - Albert Einstein
          </p>
          <p className="text-base text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Dive into the profound concepts shaping our understanding of the universe, from the fabric of spacetime to the enigma of dark matter.
          </p>
        </section>

        {/* Redesigned Topic Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topicData.map((topic: Topic) => {
            const IconComponent = categoryIcons[topic.category] || BrainCircuit; // Default icon
            return (
              <Link
                href={`/topics/${topic.id}`}
                key={topic.id}
                className="group perspective block" // Added perspective for 3D effect
                style={{ perspective: '1000px' }} // Set perspective distance
              >
                <div
                  className="
                    bg-gray-800/50 dark:bg-black/60 dark:hover:bg-gray-900/80
                    p-6 rounded-xl shadow-lg dark:shadow-purple-900/30
                    transition-all duration-500 ease-out
                    transform-style-3d
                    group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-purple-500/50
                    group-hover:-rotate-y-1 group-hover:-translate-z-2
                    border border-transparent dark:border-gray-700/50 dark:hover:border-purple-500/60
                    relative overflow-hidden h-full flex flex-col justify-between
                  "
                >
                  {/* Subtle gradient background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>

                  <div className="relative z-10"> {/* Content container */}
                    <div className="mb-4 flex justify-between items-start">
                       <div className="p-3 rounded-full bg-purple-900/50 inline-block">
                          <IconComponent className="h-6 w-6 text-purple-300" />
                       </div>
                       <Badge variant="outline" className="border-purple-400/50 text-purple-300 text-xs">
                         {topic.difficulty}
                       </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100 dark:text-white mb-2">{topic.name}</h3>
                    <p className="text-gray-400 dark:text-gray-300 text-sm flex-grow mb-4 line-clamp-3">{topic.description}</p>
                     <Badge variant="secondary" className="bg-gray-700/70 text-gray-300 text-xs">
                       {topic.category}
                     </Badge>
                  </div>

                  <div className="relative z-10 mt-5 flex justify-end items-center">
                    <span className="inline-flex items-center text-purple-300 group-hover:text-purple-200 font-medium text-sm transition-colors">
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

export default TopicsPage;
