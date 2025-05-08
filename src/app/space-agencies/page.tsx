'use client';

import spaceAgenciesData from './space_agencies.json';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Calendar, Flag, MapPin, Target } from 'lucide-react'; // Added more icons
import type React from 'react';

interface SpaceAgency {
  id: number;
  name: string;
  country: string;
  details: string;
  url: string;
  type: string;
  founded: string;
  owner: string;
  headquarters: string;
  notable_missions: string[];
}

// Map agency type to icons (example)
const agencyIcons: { [key: string]: React.ComponentType } = {
  governmental: Building,
  private: Target, // Or another icon like Rocket
  default: Building,
};

const SpaceAgenciesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {/* Enhanced Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 mb-6">
            Architects of Exploration
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-6 max-w-3xl mx-auto font-mono">
            "The exploration of space will go ahead, whether we join in it or not, and it is one of the great adventures of all time." - John F. Kennedy
          </p>
          <p className="text-base text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the organizations, both public and private, driving humanity's reach for the stars. Learn about their histories, missions, and contributions to space science and technology.
          </p>
        </section>

        {/* Redesigned Agency Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spaceAgenciesData.map((agency: SpaceAgency) => {
            const IconComponent = agencyIcons[agency.type] || agencyIcons.default;
            return (
              <div
                key={agency.id}
                className="group perspective block bg-gray-800/50 dark:bg-black/60 rounded-xl shadow-lg dark:shadow-blue-900/30 transition-all duration-500 ease-out transform-style-3d border border-transparent dark:border-gray-700/50 hover:shadow-2xl dark:hover:shadow-blue-500/50 hover:border-blue-500/60 relative overflow-hidden flex flex-col"
                style={{ perspective: '1000px' }}
              >
                <div className="p-6 flex-grow group-hover:scale-[1.03] transition-transform duration-500">
                  {/* Subtle gradient background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>

                  <div className="relative z-10"> {/* Content container */}
                    <div className="mb-4 flex justify-between items-start">
                       <div className="p-3 rounded-full bg-blue-900/50 inline-block">
                          <IconComponent className="h-6 w-6 text-blue-300" />
                       </div>
                       <Badge variant="outline" className="border-blue-400/50 text-blue-300 text-xs capitalize">
                         {agency.type}
                       </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100 dark:text-white mb-1">{agency.name}</h3>
                    <p className="text-sm text-gray-400 dark:text-gray-300 mb-4 flex items-center"><Flag className="w-4 h-4 mr-1.5 text-gray-500"/> {agency.country}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-300 mb-4 line-clamp-3">{agency.details}</p>

                    <div className="space-y-1 text-xs text-gray-400 dark:text-gray-500 mb-4">
                        <p className="flex items-center"><Calendar className="w-3 h-3 mr-1.5"/>Founded: {agency.founded}</p>
                        <p className="flex items-center"><MapPin className="w-3 h-3 mr-1.5"/>{agency.headquarters}</p>
                    </div>

                     <p className="text-xs text-gray-500 dark:text-gray-600 mb-1">Notable Missions:</p>
                     <div className="flex flex-wrap gap-1 mb-4">
                         {agency.notable_missions.slice(0, 3).map((mission, index) => ( // Show max 3 missions
                           <Badge key={index} variant="secondary" className="text-xs bg-gray-700/70 text-gray-300">{mission}</Badge>
                         ))}
                         {agency.notable_missions.length > 3 && <Badge variant="secondary" className="text-xs bg-gray-700/70 text-gray-300">...</Badge>}
                     </div>
                  </div>
                </div>
                {/* Footer for the button */}
                 <div className="relative z-10 p-4 pt-0 mt-auto flex justify-end items-center">
                     <Button
                         variant="link"
                         size="sm"
                         asChild
                         className="text-blue-300 group-hover:text-blue-200 font-medium text-sm transition-colors p-0 h-auto"
                     >
                         <a href={agency.url} target="_blank" rel="noopener noreferrer">
                             Explore
                             <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                         </a>
                     </Button>
                 </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default SpaceAgenciesPage;