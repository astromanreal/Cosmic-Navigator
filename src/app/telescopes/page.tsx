
// src/app/telescopes/page.tsx
'use client';

import {useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table"
import {Button}
from "@/components/ui/button";
import Link from 'next/link';
import {Eye, Rocket, TelescopeIcon, ExternalLink} from 'lucide-react';
import activeTelescopesData from './activeTelescopesData.json';
import futureTelescopesData from './futureTelescopesData.json';

interface Telescope {
  name: string;
  owner: string;
  wavelength: string;
  target: string;
  goals: string;
  status?: string;
  launch_date?: string;
  type?: string;
}

const TelescopesPage = () => {
  const [activeTelescopes, setActiveTelescopes] = useState<Telescope[]>([]);
  const [futureTelescopes, setFutureTelescopes] = useState<Telescope[]>([]);
  const [showFuture, setShowFuture] = useState(false);

  useEffect(() => {
    setActiveTelescopes(activeTelescopesData);
    setFutureTelescopes(futureTelescopesData);
  }, []);

  const toggleTelescopeView = () => {
    setShowFuture(!showFuture);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/80 to-indigo-900 text-gray-100">
      <div className="container mx-auto py-10 px-4">
        <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-500 mb-3">
              Cosmic Observatories
            </h1>
            <p className="text-sm text-gray-300 dark:text-gray-400 max-w-2xl mx-auto">
              Gaze into the depths of space with active and upcoming telescopes. These instruments are humanity's eyes on the universe, revealing distant galaxies, exoplanets, and cosmic phenomena.
            </p>
             <p className="text-sm text-gray-300 dark:text-gray-400 max-w-2xl mx-auto mt-3">
              For a more interactive journey through humanity's cosmic eyes, visit our specialized{' '}
              <a
                href="https://cosmic-eyes.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                Cosmic Eyes Project <ExternalLink className="inline-block h-3.5 w-3.5 ml-0.5" />
              </a>.
            </p>
        </div>

      <div className="mb-8 flex justify-center">
        <Button
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-3 rounded-full font-semibold flex items-center gap-2"
          onClick={toggleTelescopeView}
        >
          {showFuture ? <Eye className="w-5 h-5" /> : <Rocket className="w-5 h-5" />}
          {showFuture ? 'Show Active Telescopes' : 'Show Future Telescopes'}
        </Button>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white text-gray-900 text-center">
          {showFuture ? 'Upcoming & Planned Space Telescopes' : 'Currently Active Space Telescopes'}
        </h2>
        <div className="rounded-lg border overflow-hidden shadow-md bg-card dark:bg-gray-800/50">
          <Table>
             <TableCaption className="mt-4 text-sm text-muted-foreground dark:text-gray-400">
              A list of {showFuture ? 'future' : 'active'} space telescopes and their key details.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-muted/50 dark:bg-gray-700/50">
                <TableHead className="font-semibold dark:text-gray-200 text-gray-700 px-4 py-3">Name</TableHead>
                <TableHead className="font-semibold dark:text-gray-200 text-gray-700 px-4 py-3">Owner</TableHead>
                <TableHead className="font-semibold dark:text-gray-200 text-gray-700 px-4 py-3 hidden md:table-cell">Wavelength</TableHead>
                <TableHead className="font-semibold dark:text-gray-200 text-gray-700 px-4 py-3 hidden lg:table-cell">Target</TableHead>
                <TableHead className="font-semibold dark:text-gray-200 text-gray-700 px-4 py-3">Goals</TableHead>
                 {showFuture && <TableHead className="font-semibold dark:text-gray-200 text-gray-700 px-4 py-3 hidden sm:table-cell">Launch Date</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(showFuture ? futureTelescopes : activeTelescopes).map((telescope, index) => (
                <TableRow key={index} className="border-b dark:border-gray-700 hover:bg-muted/30 dark:hover:bg-gray-700/30 transition-colors">
                  <TableCell className="font-medium dark:text-white text-black px-4 py-3">
                   <Link href={`/telescopes/${telescope.name.replace(/[^a-zA-Z0-9]/g, '-')}`} className="text-blue-500 hover:underline dark:text-teal-400 dark:hover:text-teal-300">
                      {telescope.name}
                    </Link>
                  </TableCell>
                  <TableCell className="dark:text-gray-300 text-gray-600 px-4 py-3">{telescope.owner}</TableCell>
                  <TableCell className="dark:text-gray-300 text-gray-600 px-4 py-3 hidden md:table-cell">{telescope.wavelength}</TableCell>
                  <TableCell className="dark:text-gray-300 text-gray-600 px-4 py-3 hidden lg:table-cell">{telescope.target}</TableCell>
                  <TableCell className="dark:text-gray-300 text-gray-600 px-4 py-3 text-sm">{telescope.goals}</TableCell>
                   {showFuture && <TableCell className="dark:text-gray-300 text-gray-600 px-4 py-3 hidden sm:table-cell">{telescope.launch_date || 'TBD'}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
    </div>
  );
};

export default TelescopesPage;

