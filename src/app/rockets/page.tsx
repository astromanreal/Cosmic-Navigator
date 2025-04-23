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
import { Button } from "@/components/ui/button"; // Import Button component

interface Rocket {
  id: number;
  name: string;
  country: string;
  owner: string;
  type: string;
  launchYear: number;
  thrust: string;
  capacity: string;
  details: string;
  agencyType: string;
  successfulLaunches: number;
  description: string;
  wikiLink: string;
}

const RocketsPage = () => {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [sortBy, setSortBy] = useState<'type' | 'year' | 'owner'>('type');
  const [filterCountry, setFilterCountry] = useState('');

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

  const filteredRockets = filterCountry
    ? sortedRockets.filter(rocket =>
        rocket.country.toLowerCase().includes(filterCountry.toLowerCase())
      )
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

  // Extract unique years for jump links
  const uniqueYears = Array.from(new Set(filteredRockets.map(rocket => rocket.launchYear))).sort((a, b) => b - a);

   // Extract unique mission types for navigation links
  const uniqueRocketTypes = Array.from(new Set(rockets.map(rocket => rocket.type))).sort();


  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        
          Explore Rockets
        
        
          "A rocket will never be finished. It will be outdated the day it leaves the factory."
        
        
          Rockets are the vehicles that enable us to explore the vast universe, pushing the boundaries
          of human knowledge and discovery.
        
      </div>

       {sortBy === 'type' && (
        <div className="mb-4">
          <ScrollArea className="max-w-full overflow-x-auto">
          <div className="flex space-x-2">
            {uniqueRocketTypes.map((type) => (
              <a
                key={type}
                href={`#type-${type.replace(/[^a-zA-Z0-9]/g, '-')}`}
                className="inline-block px-3 py-1 rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:text-black"
              >
                {type}
              </a>
            ))}
          </div>
          </ScrollArea>
        </div>
      )}

      <div className="mb-4 flex items-center space-x-4">
        <label htmlFor="sort" className="dark:text-white text-black">Sort by:</label>
        <select
          id="sort"
          className="p-2 border rounded bg-background text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 dark:bg-gray-700 dark:text-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'type' | 'year' | 'owner')}
        >
          <option value="type">Type</option>
          <option value="year">By Year</option>
          <option value="owner">By Owner</option>
        </select>

        {sortBy === 'owner' && (
          <Input
            type="text"
            placeholder="Filter by owner..."
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="dark:bg-gray-700 dark:text-white"
          />
        )}
      </div>
       {sortBy === 'year' && (
        <div className="mb-4">
          <ScrollArea className="max-w-full overflow-x-auto">
          <div className="flex space-x-2">
            {uniqueYears.map((year) => (
              <a
                key={year}
                href={`#year-${year}`}
                className="inline-block px-3 py-1 rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:text-black"
              >
                {year}
              </a>
            ))}
          </div>
          </ScrollArea>
        </div>
      )}

      {/* Rocket List */}
      <div>
      {Object.entries(groupedRockets).map(([groupKey, rockets], index) => {
        if (sortBy === 'year') {
          return (
            <div key={index} className="mb-6" id={`year-${groupKey}`}>
              <h2 className="text-2xl font-semibold mb-2 dark:text-white text-black">{groupKey}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-white text-black">Name</TableHead>
                    <TableHead className="dark:text-white text-black">Country</TableHead>
                    <TableHead className="dark:text-white text-black">Type</TableHead>
                    <TableHead className="dark:text-white text-black">Thrust</TableHead>
                    <TableHead className="dark:text-white text-black">Capacity</TableHead>
                    <TableHead className="dark:text-white text-black">WikiLink</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rockets.map((rocket) => (
                    <TableRow key={rocket.id}>
                      <TableCell className="dark:text-white text-black">
                        <Link href={`/rockets/${rocket.name.replace(/[^a-zA-Z0-9]/g, '-')}`} className="text-blue-500 hover:underline">
                          {rocket.name}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-white text-black">{rocket.country}</TableCell>
                      <TableCell className="dark:text-white text-black"><Badge>{rocket.type}</Badge></TableCell>
                      <TableCell className="dark:text-white text-black">{rocket.thrust}</TableCell>
                      <TableCell className="dark:text-white text-black">{rocket.capacity}</TableCell>
                      <TableCell className="dark:text-white text-black">
                       <Button
                            size="sm"
                            className="bg-blue-500 text-white hover:bg-blue-700"
                            onClick={() => window.open(rocket.wikiLink, '_blank')}
                          >
                            Wiki
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        }
         if (sortBy === 'owner') {
          return (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 dark:text-white text-black">{groupKey}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-white text-black">Name</TableHead>
                    <TableHead className="dark:text-white text-black">Type</TableHead>
                    <TableHead className="dark:text-white text-black">Launch Year</TableHead>
                    <TableHead className="dark:text-white text-black">Thrust</TableHead>
                    <TableHead className="dark:text-white text-black">Capacity</TableHead>
                    <TableHead className="dark:text-white text-black">WikiLink</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rockets.map((rocket) => (
                    <TableRow key={rocket.id}>
                      <TableCell className="dark:text-white text-black">
                        <Link href={`/rockets/${rocket.name.replace(/[^a-zA-Z0-9]/g, '-')}`} className="text-blue-500 hover:underline">
                          {rocket.name}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-white text-black"><Badge>{rocket.type}</Badge></TableCell>
                      <TableCell className="dark:text-white text-black">{rocket.launchYear}</TableCell>
                      <TableCell className="dark:text-white text-black">{rocket.thrust}</TableCell>
                      <TableCell className="dark:text-white text-black">{rocket.capacity}</TableCell>
                      <TableCell className="dark:text-white text-black">
                       <Button
                            size="sm"
                            className="bg-blue-500 text-white hover:bg-blue-700"
                            onClick={() => window.open(rocket.wikiLink, '_blank')}
                          >
                            Wiki
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        }

        return (
          <div key={index} className="mb-6" id={sortBy === 'type' ? `type-${groupKey.replace(/[^a-zA-Z0-9]/g, '-')}` : undefined}>
            {sortBy === 'type' && <h2 className="text-2xl font-semibold mb-2 dark:text-white text-black">{groupKey}</h2>}
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-white text-black">Name</TableHead>
                  <TableHead className="dark:text-white text-black">Country</TableHead>
                  <TableHead className="dark:text-white text-black">Launch Year</TableHead>
                  <TableHead className="dark:text-white text-black">Thrust</TableHead>
                  <TableHead className="dark:text-white text-black">Capacity</TableHead>
                  <TableHead className="dark:text-white text-black">WikiLink</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rockets.map((rocket) => (
                  <TableRow key={rocket.id}>
                    <TableCell className="dark:text-white text-black">
                      <Link href={`/rockets/${rocket.name.replace(/[^a-zA-Z0-9]/g, '-')}`} className="text-blue-500 hover:underline">
                        {rocket.name}
                      </Link>
                    </TableCell>
                    <TableCell className="dark:text-white text-black">{rocket.country}</TableCell>
                    <TableCell className="dark:text-white text-black">{rocket.launchYear}</TableCell>
                    <TableCell className="dark:text-white text-black">{rocket.thrust}</TableCell>
                    <TableCell className="dark:text-white text-black">{rocket.capacity}</TableCell>
                    <TableCell className="dark:text-white text-black">
                         <Button
                            size="sm"
                            className="bg-blue-500 text-white hover:bg-blue-700"
                            onClick={() => window.open(rocket.wikiLink, '_blank')}
                          >
                            Wiki
                          </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default RocketsPage;
