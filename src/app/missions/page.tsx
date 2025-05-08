// src/app/missions/page.tsx
'use client';

import {useEffect, useState} from 'react';
import {Badge} from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import spaceMissionsData from './spaceMissions.json';
import Link from 'next/link';
import { Compass, ExternalLink } from 'lucide-react'; // Added Compass and ExternalLink

interface Mission {
  name: string;
  owner: string;
  wavelength?: string;
  target: string;
  goals: string;
  type: string;
  launchYear: number;
  country: string;
  missionType: string;
  link: string;
}

const MissionsPage = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [sortBy, setSortBy] = useState<'type' | 'year' | 'country'>('type');
  const [filterCountry, setFilterCountry] = useState('');

  useEffect(() => {
    const dummyMissions: Mission[] = spaceMissionsData;
    setMissions(dummyMissions);
  }, []);

  const sortedMissions = [...missions].sort((a, b) => {
    if (sortBy === 'year') {
      return b.launchYear - a.launchYear;
    } else if (sortBy === 'country') {
      return a.country.localeCompare(b.country);
    } else { // 'type'
      return a.missionType.localeCompare(b.missionType);
    }
  });

  const filteredMissions = filterCountry
    ? sortedMissions.filter(mission =>
        mission.country.toLowerCase().includes(filterCountry.toLowerCase())
      )
    : sortedMissions;

  const groupedMissions: { [groupKey: string]: Mission[] } = filteredMissions.reduce(
    (acc: { [groupKey: string]: Mission[] }, mission) => {
      let groupKey: string;
      if (sortBy === 'type') {
        groupKey = mission.missionType;
      } else if (sortBy === 'country') {
        groupKey = mission.country;
      } else { // 'year'
        groupKey = mission.launchYear.toString();
      }
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(mission);
      return acc;
    },
    {}
  );

  const uniqueYears = Array.from(new Set(filteredMissions.map(mission => mission.launchYear))).sort((a, b) => b - a);
  const uniqueMissionTypes = Array.from(new Set(missions.map(mission => mission.missionType))).sort();
  const uniqueCountries = Array.from(new Set(missions.map(mission => mission.country))).sort();


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
         {/* New Hero Section for Missions */}
        <section className="relative text-center mb-20 py-20 md:py-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-teal-900/70 to-cyan-900/80 shadow-2xl transform-style-3d perspective">
          <div className="absolute inset-0 opacity-10 bg-[url('/star-pattern.svg')] bg-repeat animate-pulse"></div>
          <div className="absolute inset-0 bg-black/30"></div> {/* Dark overlay */}

          <div className="relative z-10 flex flex-col items-center justify-center h-full animate-fade-in">
            <Compass className="w-20 h-20 md:w-28 md:h-28 text-teal-400 mb-8 drop-shadow-[0_0_15px_rgba(45,208,203,0.5)] animate-pulse" />
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-500 mb-6">
              Charting Cosmic Odysseys: A Universe of Missions
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-200 italic mb-8 max-w-3xl mx-auto font-mono">
              "Exploration is in our nature. We began as wanderers, and we are wanderers still." - Carl Sagan
            </p>
            <p className="text-base text-gray-300 dark:text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
              Space missions are humanity's bold ventures into the unknown, pushing the boundaries of science and technology. From robotic explorers uncovering planetary secrets to ambitious voyages carrying astronauts to distant worlds, each mission expands our understanding of the cosmos and our place within it. Journey through the history and future of these incredible endeavors.
            </p>

            <a
              href="https://astro-missions.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold
                text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg
                shadow-2xl hover:shadow-cyan-500/50
                transition-all duration-300 ease-out
                transform hover:scale-105 active:scale-95
                focus:outline-none focus:ring-4 focus:ring-cyan-500/50
                overflow-hidden transform-style-3d hover:-translate-y-1
              "
              style={{ perspective: '1000px' }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></span>
              <span className="relative z-10 flex items-center">
                Explore Astro Missions Project <ExternalLink className="ml-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-700/50 transform-style-3d group-hover:h-2 transition-all duration-300"></span>
              <span className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-300/50 to-transparent group-hover:animate-pulse"></span>
            </a>
          </div>
        </section>


       {/* Sorting Controls */}
       <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-gray-800/30 dark:bg-black/40 rounded-lg shadow-md">
         <label htmlFor="sort" className="dark:text-white text-gray-200 font-medium text-sm">Sort by:</label>
         <select
           id="sort"
           className="p-2.5 border border-gray-600/50 rounded-md bg-gray-700/50 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm"
           value={sortBy}
           onChange={(e) => setSortBy(e.target.value as 'type' | 'year' | 'country')}
         >
           <option value="type">Type</option>
           <option value="year">Year</option>
           <option value="country">Country</option>
         </select>

         {sortBy === 'country' && (
           <Input
             type="text"
             placeholder="Filter by country..."
             value={filterCountry}
             onChange={(e) => setFilterCountry(e.target.value)}
             className="p-2.5 border border-gray-600/50 rounded-md bg-gray-700/50 text-gray-100 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm max-w-xs w-full sm:w-auto"
           />
         )}
       </div>

        {/* Jump Links */}
      <div className="mb-8">
        <ScrollArea className="max-w-full overflow-x-auto pb-2">
          <div className="flex justify-center space-x-2 py-2">
             {sortBy === 'type' && uniqueMissionTypes.map((type) => (
              <a
                key={type}
                href={`#type-${type.replace(/[^a-zA-Z0-9]/g, '-')}`}
                 className="inline-block px-4 py-2 rounded-full bg-gray-700/60 text-gray-200 hover:bg-teal-600/80 hover:text-white transition-all duration-200 text-xs font-medium shadow-sm transform hover:scale-105"
              >
                {type}
              </a>
            ))}
             {sortBy === 'year' && uniqueYears.map((year) => (
              <a
                key={year}
                href={`#year-${year}`}
                 className="inline-block px-4 py-2 rounded-full bg-gray-700/60 text-gray-200 hover:bg-teal-600/80 hover:text-white transition-all duration-200 text-xs font-medium shadow-sm transform hover:scale-105"
              >
                {year}
              </a>
            ))}
             {sortBy === 'country' && uniqueCountries.map((country) => (
              <a
                key={country}
                href={`#country-${country.replace(/[^a-zA-Z0-9]/g, '-')}`}
                 className="inline-block px-4 py-2 rounded-full bg-gray-700/60 text-gray-200 hover:bg-teal-600/80 hover:text-white transition-all duration-200 text-xs font-medium shadow-sm transform hover:scale-105"
              >
                {country}
              </a>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Mission List */}
       <div className="space-y-12">
         {Object.entries(groupedMissions)
           .sort(([keyA], [keyB]) => {
             if (sortBy === 'year') return parseInt(keyB) - parseInt(keyA);
             return keyA.localeCompare(keyB);
           })
           .map(([groupKey, missionsInGroup]) => {
             const groupId = sortBy === 'country'
               ? `country-${groupKey.replace(/[^a-zA-Z0-9]/g, '-')}`
               : sortBy === 'type'
               ? `type-${groupKey.replace(/[^a-zA-Z0-9]/g, '-')}`
               : `year-${groupKey}`;

             return (
               <div key={groupKey} className="mb-8 scroll-mt-24" id={groupId}>
                 <h2 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 border-b-2 border-teal-500/30 pb-2">
                  {sortBy === 'country' ? `Country: ${groupKey}` : sortBy === 'type' ? `Type: ${groupKey}` : `Year: ${groupKey}`}
                  </h2>
                 <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700/50 bg-gray-800/50 dark:bg-black/60">
                   <Table>
                     <TableHeader>
                       <TableRow className="border-b border-gray-700/50 bg-gray-700/30 dark:bg-black/40">
                         <TableHead className="font-semibold text-teal-300 px-4 py-3">Name</TableHead>
                         <TableHead className="font-semibold text-teal-300 px-4 py-3 hidden sm:table-cell">Owner</TableHead>
                         <TableHead className="font-semibold text-teal-300 px-4 py-3 hidden md:table-cell">Wavelength</TableHead>
                         <TableHead className="font-semibold text-teal-300 px-4 py-3 hidden lg:table-cell">Target</TableHead>
                         <TableHead className="font-semibold text-teal-300 px-4 py-3">Goals</TableHead>
                          {sortBy !== 'type' && <TableHead className="font-semibold text-teal-300 px-4 py-3 hidden sm:table-cell">Type</TableHead>}
                          {sortBy !== 'year' && <TableHead className="font-semibold text-teal-300 px-4 py-3 hidden md:table-cell">Launch Year</TableHead>}
                          {sortBy !== 'country' && <TableHead className="font-semibold text-teal-300 px-4 py-3 hidden lg:table-cell">Country</TableHead>}
                       </TableRow>
                     </TableHeader>
                     <TableBody>
                       {missionsInGroup.map((mission, missionIndex) => (
                         <TableRow key={missionIndex} className="border-b border-gray-800/50 dark:border-gray-700/40 hover:bg-gray-700/40 dark:hover:bg-gray-800/50 transition-colors">
                           <TableCell className="font-medium text-gray-100 px-4 py-3">
                             <a href={mission.link} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                               {mission.name}
                             </a>
                           </TableCell>
                           <TableCell className="text-gray-300 px-4 py-3 hidden sm:table-cell">{mission.owner}</TableCell>
                           <TableCell className="text-gray-300 px-4 py-3 hidden md:table-cell">{mission.wavelength || 'N/A'}</TableCell>
                           <TableCell className="text-gray-300 px-4 py-3 hidden lg:table-cell">{mission.target}</TableCell>
                           <TableCell className="text-gray-300 px-4 py-3 text-sm">{mission.goals}</TableCell>
                            {sortBy !== 'type' && <TableCell className="px-4 py-3 hidden sm:table-cell"><Badge variant="secondary" className="bg-gray-700/70 text-gray-300">{mission.missionType}</Badge></TableCell>}
                            {sortBy !== 'year' && <TableCell className="text-gray-300 px-4 py-3 hidden md:table-cell">{mission.launchYear}</TableCell>}
                            {sortBy !== 'country' && <TableCell className="text-gray-300 px-4 py-3 hidden lg:table-cell">{mission.country}</TableCell>}
                         </TableRow>
                       ))}
                     </TableBody>
                   </Table>
                 </div>
               </div>
             );
         })}
       </div>
    </div>
    </div>
  );
};

export default MissionsPage;
