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
import {Eye, Rocket, TelescopeIcon, ExternalLink, ChevronRight} from 'lucide-react'; // Import icons
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
      <div className="container mx-auto py-16 px-4">
      {/* New Hero Section for Telescopes */}
      <section className="relative text-center mb-20 py-20 md:py-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/60 to-purple-900/70 shadow-2xl transform-style-3d perspective">
        <div className="absolute inset-0 opacity-15 bg-[url('/star-pattern.svg')] bg-repeat animate-pulse"></div>
        <div className="absolute inset-0 bg-black/40"></div> {/* Dark overlay for better text contrast */}

        <div className="relative z-10 flex flex-col items-center justify-center h-full animate-fade-in">
          <TelescopeIcon className="w-20 h-20 md:w-28 md:h-28 text-cyan-400 mb-8 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse" />
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-500 mb-6">
            Gazing into the Infinite: The Realm of Telescopes
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-200 italic mb-8 max-w-3xl mx-auto font-mono">
            "Equipped with his five senses, man explores the universe around him and calls the adventure Science." - Edwin Hubble
          </p>
          <p className="text-base text-gray-300 dark:text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            Telescopes are our windows to the cosmos, extending human vision across unimaginable distances and back through time. From ground-based giants peering through Earth's atmosphere to sophisticated space observatories capturing light from the universe's dawn, these instruments unveil celestial wonders, probe the nature of distant worlds, and help us unravel the deepest cosmic mysteries.
          </p>

          <a
            href="https://cosmic-eyes.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold
              text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg
              shadow-2xl hover:shadow-blue-500/50
              transition-all duration-300 ease-out
              transform hover:scale-105 active:scale-95
              focus:outline-none focus:ring-4 focus:ring-blue-500/50
              overflow-hidden transform-style-3d hover:-translate-y-1
            "
            style={{ perspective: '1000px' }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></span>
            <span className="relative z-10 flex items-center">
              Discover Cosmic Eyes Project <ExternalLink className="ml-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            {/* 3D Button Effect Elements */}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-700/50 transform-style-3d group-hover:h-2 transition-all duration-300"></span>
            <span className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent group-hover:animate-pulse"></span>
          </a>
        </div>
      </section>


      {/* Toggle Button Section */}
      <div className="mb-8 flex justify-center">
        <Button
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-3 rounded-full font-semibold flex items-center gap-2"
          onClick={toggleTelescopeView}
        >
          {showFuture ? <Eye className="w-5 h-5" /> : <Rocket className="w-5 h-5" />}
          {showFuture ? 'Show Active Telescopes' : 'Show Future Telescopes'}
        </Button>
      </div>

      {/* Table Section */}
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
