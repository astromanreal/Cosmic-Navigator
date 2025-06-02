
// src/app/rockets/page.tsx
'use client';

import {useEffect, useState} from 'react';
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import rocketData from './rocketData.json';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RocketIcon, ExternalLink } from 'lucide-react';

interface Rocket {
  id: number;
  name: string;
  country: string;
  owner: string;
  type: string;
  status: string;
  launchYear: number;
  thrust: string;
  capacity: string;
  agencyType: string;
  successfulLaunches: number;
  description: string;
  wikiLink: string;
}


const RocketsPage = () => {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [sortBy, setSortBy] = useState<'type' | 'year' | 'owner'>('type');
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    setRockets(rocketData);
  }, []);

  const sortedRockets = [...rockets].sort((a, b) => {
    if (sortBy === 'year') {
      return b.launchYear - a.launchYear;
    } else if (sortBy === 'owner') {
      return a.owner.localeCompare(b.owner);
    } else {
      return a.type.localeCompare(b.type);
    }
  });

  const filteredRockets = filterTerm
    ? sortedRockets.filter(rocket => {
        const term = filterTerm.toLowerCase();
        return (
          rocket.name.toLowerCase().includes(term) ||
          rocket.country.toLowerCase().includes(term) ||
          rocket.owner.toLowerCase().includes(term) ||
          rocket.type.toLowerCase().includes(term) ||
          rocket.status.toLowerCase().includes(term) ||
          rocket.agencyType.toLowerCase().includes(term)
        );
      })
    : sortedRockets;

  const groupedRockets: { [groupKey: string]: Rocket[] } = filteredRockets.reduce(
    (acc: { [groupKey: string]: Rocket[] }, rocket) => {
      let groupKey: string;
      if (sortBy === 'type') {
        groupKey = rocket.type;
      } else if (sortBy === 'owner') {
        groupKey = rocket.owner;
      } else { 
        groupKey = rocket.launchYear.toString();
      }
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(rocket);
      return acc;
    },
    {}
  );

  const uniqueYears = Array.from(new Set(filteredRockets.map(rocket => rocket.launchYear))).sort((a, b) => b - a);
  const uniqueRocketTypes = Array.from(new Set(rockets.map(rocket => rocket.type))).sort();
  const uniqueOwners = Array.from(new Set(rockets.map(rocket => rocket.owner))).sort();


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-10 px-4">
        <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 mb-3">
              Launch Vehicles
            </h1>
            <p className="text-sm text-gray-300 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the power behind space exploration with our catalog of rockets. From historic workhorses to cutting-edge launchers, delve into the specifications and stories of these magnificent machines.
            </p>
            <p className="text-sm text-gray-300 dark:text-gray-400 max-w-2xl mx-auto mt-3">
              For an even more interactive and detailed dive into rocket science and launch history, be sure to visit our specialized{' '}
              <a
                href="https://liftoff-lab.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-orange-400 hover:text-orange-300 hover:underline"
              >
                Liftoff Lab Project <ExternalLink className="inline-block h-3.5 w-3.5 ml-0.5" />
              </a>.
            </p>
        </div>

       <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-gray-800/30 dark:bg-black/40 rounded-lg shadow-md">
         <label htmlFor="sort" className="dark:text-white text-gray-200 font-medium text-sm">Sort by:</label>
         <select
           id="sort"
           className="p-2.5 border border-gray-600/50 rounded-md bg-gray-700/50 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
           value={sortBy}
           onChange={(e) => setSortBy(e.target.value as 'type' | 'year' | 'owner')}
         >
           <option value="type">Type</option>
           <option value="year">Year</option>
           <option value="owner">Owner / Country</option>
         </select>

        <Input
            type="text"
            placeholder="Filter rockets..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="p-2.5 border border-gray-600/50 rounded-md bg-gray-700/50 text-gray-100 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm max-w-xs w-full sm:w-auto"
        />
       </div>

      <div className="mb-8">
        <ScrollArea className="max-w-full overflow-x-auto pb-2">
          <div className="flex justify-center space-x-2 py-2">
             {sortBy === 'type' && uniqueRocketTypes.map((type) => (
              <a
                key={type}
                href={`#type-${type.replace(/[^a-zA-Z0-9]/g, '-')}`}
                 className="inline-block px-4 py-2 rounded-full bg-gray-700/60 text-gray-200 hover:bg-orange-600/80 hover:text-white transition-all duration-200 text-xs font-medium shadow-sm transform hover:scale-105"
              >
                {type}
              </a>
            ))}
             {sortBy === 'year' && uniqueYears.map((year) => (
              <a
                key={year}
                href={`#year-${year}`}
                 className="inline-block px-4 py-2 rounded-full bg-gray-700/60 text-gray-200 hover:bg-orange-600/80 hover:text-white transition-all duration-200 text-xs font-medium shadow-sm transform hover:scale-105"
              >
                {year}
              </a>
            ))}
            {sortBy === 'owner' && uniqueOwners.map((owner) => (
              <a
                key={owner}
                href={`#owner-${owner.replace(/[^a-zA-Z0-9]/g, '-')}`}
                className="inline-block px-4 py-2 rounded-full bg-gray-700/60 text-gray-200 hover:bg-orange-600/80 hover:text-white transition-all duration-200 text-xs font-medium shadow-sm transform hover:scale-105"
              >
                {owner}
              </a>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="space-y-12">
      {Object.entries(groupedRockets)
        .sort(([keyA], [keyB]) => {
          if (sortBy === 'year') return parseInt(keyB) - parseInt(keyA);
          if (sortBy === 'owner') return keyA.localeCompare(keyB);
          return keyA.localeCompare(keyB);
        })
        .map(([groupKey, rocketsInGroup]) => {
         const groupId = sortBy === 'owner'
           ? `owner-${groupKey.replace(/[^a-zA-Z0-9]/g, '-')}`
           : sortBy === 'type'
           ? `type-${groupKey.replace(/[^a-zA-Z0-9]/g, '-')}`
           : `year-${groupKey}`;

          return (
            <div key={groupKey} className="mb-8 scroll-mt-24" id={groupId}>
              <h2 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 border-b-2 border-orange-500/30 pb-2">
                {sortBy === 'owner' ? `Owner/Country: ${groupKey}` : sortBy === 'type' ? `Type: ${groupKey}` : `Year: ${groupKey}`}
              </h2>
               <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700/50 bg-gray-800/50 dark:bg-black/60">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-700/50 bg-gray-700/30 dark:bg-black/40">
                      <TableHead className="font-semibold text-orange-300 px-4 py-3 w-[200px]">Name</TableHead>
                       {sortBy !== 'owner' && <TableHead className="font-semibold text-orange-300 px-4 py-3 hidden sm:table-cell w-[150px]">Owner</TableHead>}
                       {sortBy !== 'type' && <TableHead className="font-semibold text-orange-300 px-4 py-3 hidden sm:table-cell w-[150px]">Type</TableHead>}
                       {sortBy !== 'year' && <TableHead className="font-semibold text-orange-300 px-4 py-3 hidden md:table-cell w-[100px]">Launch Year</TableHead>}
                      <TableHead className="font-semibold text-orange-300 px-4 py-3 w-[120px]">Country</TableHead>
                      <TableHead className="font-semibold text-orange-300 px-4 py-3 w-[100px]">Status</TableHead>
                      <TableHead className="font-semibold text-orange-300 px-4 py-3 hidden lg:table-cell w-[150px]">Thrust</TableHead>
                      <TableHead className="font-semibold text-orange-300 px-4 py-3 hidden lg:table-cell w-[150px]">Capacity</TableHead>
                      <TableHead className="font-semibold text-orange-300 px-4 py-3 hidden md:table-cell w-[150px]">Agency Type</TableHead>
                      <TableHead className="font-semibold text-orange-300 px-4 py-3 hidden sm:table-cell text-right w-[100px]">Successes</TableHead>
                      <TableHead className="font-semibold text-orange-300 px-4 py-3 text-center w-[100px]">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rocketsInGroup.map((rocket) => (
                      <TableRow key={rocket.id} className="border-b border-gray-800/50 dark:border-gray-700/40 hover:bg-gray-700/40 dark:hover:bg-gray-800/50 transition-colors">
                         <TableCell className="font-medium text-gray-100 px-4 py-3">
                          <Link href={`/rockets/${rocket.name.replace(/[^a-zA-Z0-9]/g, '-')}`} className="hover:text-orange-400 transition-colors">
                            {rocket.name}
                          </Link>
                        </TableCell>
                         {sortBy !== 'owner' && <TableCell className="text-gray-300 px-4 py-3 hidden sm:table-cell">{rocket.owner}</TableCell>}
                         {sortBy !== 'type' && <TableCell className="px-4 py-3 hidden sm:table-cell"><Badge variant={rocket.type.toLowerCase().includes('heavy') ? 'destructive' : rocket.type.toLowerCase().includes('medium') ? 'secondary' : 'outline'} className="border-orange-500/50 text-orange-200 bg-orange-900/30">{rocket.type}</Badge></TableCell>}
                         {sortBy !== 'year' && <TableCell className="text-gray-300 px-4 py-3 hidden md:table-cell">{rocket.launchYear}</TableCell>}
                        <TableCell className="text-gray-300 px-4 py-3">{rocket.country}</TableCell>
                        <TableCell className="px-4 py-3">
                           <Badge variant={rocket.status === 'Active' ? 'default' : rocket.status === 'Retired' ? 'secondary' : 'outline'} className={`${rocket.status === 'Active' ? 'bg-green-600/70 text-green-100 border-green-500/50' : rocket.status === 'Retired' ? 'bg-red-600/70 text-red-100 border-red-500/50' : 'bg-gray-600/70 text-gray-100 border-gray-500/50' }`}>
                            {rocket.status}
                          </Badge>
                         </TableCell>
                        <TableCell className="text-gray-300 px-4 py-3 hidden lg:table-cell">{rocket.thrust || 'N/A'}</TableCell>
                        <TableCell className="text-gray-300 px-4 py-3 hidden lg:table-cell">{rocket.capacity || 'N/A'}</TableCell>
                        <TableCell className="text-gray-300 px-4 py-3 hidden md:table-cell">{rocket.agencyType || 'N/A'}</TableCell>
                        <TableCell className="text-gray-300 px-4 py-3 hidden sm:table-cell text-right">{rocket.successfulLaunches}</TableCell>
                        <TableCell className="text-center px-4 py-3">
                         <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-colors"
                          >
                            <a href={rocket.wikiLink} target="_blank" rel="noopener noreferrer">
                              Explore <ExternalLink className="ml-1.5 h-3.5 w-3.5"/>
                            </a>
                          </Button>
                        </TableCell>
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

export default RocketsPage;

