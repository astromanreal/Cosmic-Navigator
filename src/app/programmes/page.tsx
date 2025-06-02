// src/app/programmes/page.tsx
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from '@/components/ui/badge';
import spaceProgramsData from './spaceProgramsData.json';
import { Rocket } from 'lucide-react'; // Using Rocket icon

interface SpaceProgram {
  program: string;
  country: string;
  startDate: string;
  firstCrewedFlight: string;
  endDate: string | 'Ongoing';
  crewedMissionsLaunched: number;
  notes: string;
  ongoing: boolean;
}

const ProgrammesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {/* Enhanced Hero Section */}
        <section className="relative text-center mb-16 py-12 md:py-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/70 to-indigo-900/80 shadow-2xl transform-style-3d perspective">
          <div className="absolute inset-0 opacity-10 bg-[url('/star-pattern.svg')] bg-repeat animate-pulse"></div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full animate-fade-in">
            <Rocket className="w-16 h-16 md:w-20 md:h-20 text-purple-400 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-pulse" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 mb-4">
              From Mercury to Artemis: A Legacy of Space Programmes
            </h1>
            <p className="text-md sm:text-lg text-gray-300 dark:text-gray-200 italic mb-6 max-w-2xl mx-auto font-mono">
               "The important thing is to never stop questioning." - Albert Einstein
            </p>
            <p className="text-sm sm:text-base text-gray-300 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover the pivotal space programmes from around the globe that have defined humanity's journey beyond Earth, marking milestones in exploration, science, and technology. These endeavors represent our collective ambition to reach for the stars and understand our place in the cosmos.
            </p>
          </div>
        </section>

        {/* Table Section with Enhanced Styling */}
        <div className="rounded-lg border border-gray-700/50 dark:border-gray-800/60 shadow-xl dark:shadow-purple-900/40 overflow-hidden perspective bg-gray-800/50 dark:bg-black/60" style={{ perspective: '1000px' }}>
          <ScrollArea className="w-full">
            <Table>
              <TableCaption className="mt-4 text-sm text-muted-foreground dark:text-gray-400 py-4">
                A timeline of significant space exploration programmes.
              </TableCaption>
              <TableHeader>
                <TableRow className="border-b border-gray-700/50 dark:border-gray-800/60 bg-gray-700/60 dark:bg-black/70 hover:bg-gray-700/80 dark:hover:bg-gray-900/80">
                  <TableHead className="font-semibold text-purple-300 px-4 py-3.5">Program</TableHead>
                  <TableHead className="font-semibold text-purple-300 px-4 py-3.5">Country</TableHead>
                  <TableHead className="font-semibold text-purple-300 px-4 py-3.5 hidden sm:table-cell">Start Date</TableHead>
                  <TableHead className="font-semibold text-purple-300 px-4 py-3.5 hidden md:table-cell">First Crewed</TableHead>
                  <TableHead className="font-semibold text-purple-300 px-4 py-3.5 hidden sm:table-cell">Status</TableHead>
                  <TableHead className="font-semibold text-purple-300 px-4 py-3.5 hidden lg:table-cell text-right">Crewed Missions</TableHead>
                  <TableHead className="font-semibold text-purple-300 px-4 py-3.5 hidden xl:table-cell">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {spaceProgramsData.map((program, index) => (
                  <TableRow
                    key={index}
                    className={`
                      border-b border-gray-800/50 dark:border-gray-700/40
                      transition-all duration-300 ease-out transform-style-3d group
                      hover:bg-gray-700/70 dark:hover:bg-purple-900/30 
                      hover:scale-[1.01] hover:shadow-lg dark:hover:shadow-purple-700/40 hover:-translate-z-1
                      ${program.ongoing ? "bg-purple-900/10 dark:bg-purple-800/10" : "odd:bg-gray-800/20 dark:odd:bg-black/30 even:bg-gray-800/40 dark:even:bg-black/50"}
                    `}
                  >
                    <TableCell className="font-medium text-gray-100 px-4 py-3">{program.program}</TableCell>
                    <TableCell className="text-gray-300 px-4 py-3">{program.country}</TableCell>
                    <TableCell className="text-gray-400 px-4 py-3 hidden sm:table-cell">{program.startDate}</TableCell>
                    <TableCell className="text-gray-400 px-4 py-3 hidden md:table-cell">{program.firstCrewedFlight || 'N/A'}</TableCell>
                    <TableCell className="px-4 py-3 hidden sm:table-cell">
                      {program.endDate === 'Ongoing' ?
                        <Badge variant="outline" className="border-green-400/60 text-green-300 bg-green-700/30 text-xs py-0.5 px-2">Ongoing</Badge> :
                        <Badge variant="outline" className="border-red-400/60 text-red-300 bg-red-700/30 text-xs py-0.5 px-2">{program.endDate}</Badge>
                      }
                    </TableCell>
                    <TableCell className="text-gray-400 px-4 py-3 hidden lg:table-cell text-right">{program.crewedMissionsLaunched}</TableCell>
                    <TableCell className="text-gray-400 px-4 py-3 text-xs hidden xl:table-cell">{program.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ProgrammesPage;
