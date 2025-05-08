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
        <section className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6 font-exo">
            From Mercury to Artemis: A Legacy of Space Programmes
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-6 max-w-3xl mx-auto font-mono">
             "The important thing is to never stop questioning." - Albert Einstein
          </p>
          <p className="text-base text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the pivotal space programmes from around the globe that have defined humanity's journey beyond Earth, marking milestones in exploration, science, and technology.
          </p>
        </section>

        {/* Table Section with 3D hover effect */}
        <ScrollArea className="w-full rounded-lg border border-gray-700/50 dark:border-gray-800/60 shadow-lg dark:shadow-purple-900/30 perspective" style={{ perspective: '1000px' }}>
          <Table>
            <TableCaption className="mt-4 text-sm text-muted-foreground dark:text-gray-400">
              A timeline of significant space exploration programmes.
            </TableCaption>
            <TableHeader>
              <TableRow className="border-b border-gray-700/50 dark:border-gray-800/60 bg-gray-800/50 dark:bg-black/60">
                <TableHead className="font-semibold dark:text-purple-300 text-gray-300 px-4 py-3">Program</TableHead>
                <TableHead className="font-semibold dark:text-purple-300 text-gray-300 px-4 py-3">Country</TableHead>
                <TableHead className="font-semibold dark:text-purple-300 text-gray-300 px-4 py-3 hidden sm:table-cell">Start Date</TableHead>
                <TableHead className="font-semibold dark:text-purple-300 text-gray-300 px-4 py-3 hidden md:table-cell">First Crewed</TableHead>
                <TableHead className="font-semibold dark:text-purple-300 text-gray-300 px-4 py-3 hidden sm:table-cell">End Date</TableHead>
                <TableHead className="font-semibold dark:text-purple-300 text-gray-300 px-4 py-3 hidden lg:table-cell text-right">Crewed Missions</TableHead>
                <TableHead className="font-semibold dark:text-purple-300 text-gray-300 px-4 py-3 hidden xl:table-cell">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spaceProgramsData.map((program, index) => (
                <TableRow
                  key={index}
                  className={`
                    border-b border-gray-800/50 dark:border-gray-700/40
                    transition-all duration-300 ease-out transform-style-3d group
                    hover:bg-gray-700/70 dark:hover:bg-gray-800/80
                    hover:scale-[1.01] hover:shadow-lg dark:hover:shadow-purple-500/30 hover:-translate-z-1
                    ${program.ongoing ? "bg-purple-900/20 dark:bg-purple-800/10" : index % 2 === 0 ? "bg-gray-800/30 dark:bg-black/40" : "bg-gray-800/40 dark:bg-black/50"}
                  `}
                >
                  <TableCell className="font-medium dark:text-white text-gray-100 px-4 py-3">{program.program}</TableCell>
                  <TableCell className="dark:text-gray-300 text-gray-300 px-4 py-3">{program.country}</TableCell>
                  <TableCell className="dark:text-gray-400 text-gray-400 px-4 py-3 hidden sm:table-cell">{program.startDate}</TableCell>
                  <TableCell className="dark:text-gray-400 text-gray-400 px-4 py-3 hidden md:table-cell">{program.firstCrewedFlight || 'N/A'}</TableCell>
                  <TableCell className="px-4 py-3 hidden sm:table-cell">
                    {program.endDate === 'Ongoing' ?
                      <Badge variant="outline" className="border-green-400/50 text-green-300 text-xs">Ongoing</Badge> :
                      <span className="dark:text-gray-400 text-gray-400">{program.endDate}</span>
                    }
                  </TableCell>
                  <TableCell className="dark:text-gray-400 text-gray-400 px-4 py-3 hidden lg:table-cell text-right">{program.crewedMissionsLaunched}</TableCell>
                  <TableCell className="dark:text-gray-400 text-gray-400 px-4 py-3 text-xs hidden xl:table-cell">{program.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProgrammesPage;