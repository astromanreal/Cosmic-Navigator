'use client';

import {useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption, // Import TableCaption
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import Link from 'next/link';
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
    <div className="container mx-auto py-10">
      <div className="mb-4">
        <Button
          className="bg-teal-500 text-white shadow-md hover:bg-teal-700 transition-colors duration-200 text-lg px-6 py-3 rounded-md"
          onClick={toggleTelescopeView}
        >
          {showFuture ? 'Show Active Telescopes' : 'Show Future Telescopes'}
        </Button>
      </div>

      <section className="mb-8">
        <h1 className="text-3xl font-semibold mb-6 dark:text-white text-gray-900">
          {showFuture ? 'Future Space Telescopes' : 'Active Space Telescopes'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {showFuture
            ? 'These are the space telescopes currently in development, will explore the universe across a wide range of wavelengths.'
            : 'These are the space telescopes currently in operation, exploring the universe across a wide range of wavelengths.'}
        </p>
      </section>

      <div className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="dark:text-white text-black">Name</TableHead>
              <TableHead className="dark:text-white text-black">Owner</TableHead>
              <TableHead className="dark:text-white text-black">Wavelength</TableHead>
              <TableHead className="dark:text-white text-black">Target</TableHead>
              <TableHead className="dark:text-white text-black">Goals</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(showFuture ? futureTelescopes : activeTelescopes).map((telescope, index) => (
              <TableRow key={index}>
                <TableCell className="dark:text-white text-black">
                 <Link href={`/telescopes/${telescope.name.replace(/[^a-zA-Z0-9]/g, '-')}`} className="text-blue-500 hover:underline">
                    {telescope.name}
                  </Link>
                </TableCell>
                <TableCell className="dark:text-white text-black">{telescope.owner}</TableCell>
                <TableCell className="dark:text-white text-black">{telescope.wavelength}</TableCell>
                <TableCell className="dark:text-white text-black">{telescope.target}</TableCell>
                <TableCell className="dark:text-white text-black">{telescope.goals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className="dark:text-white text-black">A list of space telescopes and their details.</TableCaption>
        </Table>
      </div>
    </div>
  );
};

export default TelescopesPage;
