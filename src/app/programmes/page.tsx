'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
    <div className="container mx-auto py-10">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900 font-exo">
          From Mercury to Artemis: The Legacy of Global Space Exploration Programmes
        </h1>
        <p className="text-gray-500 mb-4 dark:text-gray-400">
          Discover the programmes that have shaped our understanding of space.
        </p>
      </section>

      <ScrollArea className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="dark:text-white text-black">Program</TableHead>
            <TableHead className="dark:text-white text-black">Country</TableHead>
            <TableHead className="dark:text-white text-black">Start Date</TableHead>
            <TableHead className="dark:text-white text-black">First Crewed Flight</TableHead>
            <TableHead className="dark:text-white text-black">End Date</TableHead>
            <TableHead className="dark:text-white text-black">Crewed Missions Launched</TableHead>
            <TableHead className="dark:text-white text-black">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spaceProgramsData.map((program, index) => (
            <TableRow key={index} className={program.ongoing ? "bg-accent-foreground/10 hover:bg-accent-foreground/20 dark:bg-accent/10 dark:hover:bg-accent/20" : index % 2 === 0 ? "bg-secondary/50 dark:bg-secondary/20" : ""}>
              <TableCell className="font-medium dark:text-white text-black">{program.program}</TableCell>
              <TableCell className="dark:text-white text-black">{program.country}</TableCell>
              <TableCell className="dark:text-white text-black">{program.startDate}</TableCell>
              <TableCell className="dark:text-white text-black">{program.firstCrewedFlight}</TableCell>
              <TableCell className="dark:text-white text-black">{program.endDate === 'Ongoing' ? <Badge variant="outline">Ongoing</Badge> : program.endDate}</TableCell>
              <TableCell className="dark:text-white text-black">{program.crewedMissionsLaunched}</TableCell>
              <TableCell className="dark:text-white text-black">{program.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </ScrollArea>
    </div>
  );
};

export default ProgrammesPage;
