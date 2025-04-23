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
    // Replace with actual data fetching or API call
    const dummyMissions: Mission[] = spaceMissionsData;

    setMissions(dummyMissions);
  }, []);

  const sortedMissions = [...missions].sort((a, b) => {
    if (sortBy === 'year') {
      return b.launchYear - a.launchYear;
    } else if (sortBy === 'country') {
      return a.country.localeCompare(b.country);
    } else {
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
      } else {
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

  // Extract unique years for jump links
  const uniqueYears = Array.from(new Set(filteredMissions.map(mission => mission.launchYear))).sort((a, b) => b - a);

   // Extract unique mission types for navigation links
  const uniqueMissionTypes = Array.from(new Set(missions.map(mission => mission.missionType))).sort();


  return (
    <div className="container mx-auto py-10">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">Active Missions</h1>
        <p className="text-gray-500 mb-4 dark:text-gray-400">
          "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself." - Carl Sagan
        </p>
        <p className="text-gray-600 dark:text-gray-300">
        Track the journeys of spacecraft across our solar system—and beyond.
        </p>
      </section>

       {sortBy === 'type' && (
        <div className="mb-4">
          <ScrollArea className="max-w-full overflow-x-auto">
          <div className="flex space-x-2">
            {uniqueMissionTypes.map((type) => (
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
          onChange={(e) => setSortBy(e.target.value as 'type' | 'year' | 'country')}
        >
          <option value="type">Type</option>
          <option value="year">By Year</option>
          <option value="country">By Country</option>
        </select>

        {sortBy === 'country' && (
          <Input
            type="text"
            placeholder="Filter by country..."
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


      {Object.entries(groupedMissions).map(([groupKey, missions], index) => {
        if (sortBy === 'year') {
          return (
            <div key={index} className="mb-6" id={`year-${groupKey}`}>
              <h2 className="text-2xl font-semibold mb-2 dark:text-white text-black">{groupKey}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-white text-black">Name</TableHead>
                    <TableHead className="dark:text-white text-black">Owner</TableHead>
                    <TableHead className="dark:text-white text-black">Wavelength</TableHead>
                    <TableHead className="dark:text-white text-black">Target</TableHead>
                    <TableHead className="dark:text-white text-black">Goals</TableHead>
                    <TableHead className="dark:text-white text-black">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {missions.map((mission, missionIndex) => (
                    <TableRow key={missionIndex}>
                      <TableCell className="dark:text-white text-black">
                        <a href={mission.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {mission.name}
                        </a>
                      </TableCell>
                      <TableCell className="dark:text-white text-black">{mission.owner}</TableCell>
                      <TableCell className="dark:text-white text-black">{mission.wavelength}</TableCell>
                      <TableCell className="dark:text-white text-black">{mission.target}</TableCell>
                      <TableCell className="dark:text-white text-black">{mission.goals}</TableCell>
                      <TableCell><Badge>{mission.missionType}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        }
         if (sortBy === 'country') {
          return (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 dark:text-white text-black">{groupKey}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-white text-black">Name</TableHead>
                    <TableHead className="dark:text-white text-black">Owner</TableHead>
                    <TableHead className="dark:text-white text-black">Wavelength</TableHead>
                    <TableHead className="dark:text-white text-black">Target</TableHead>
                    <TableHead className="dark:text-white text-black">Goals</TableHead>
                    <TableHead className="dark:text-white text-black">Type</TableHead>
                    <TableHead className="dark:text-white text-black">Launch Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {missions.map((mission, missionIndex) => (
                    <TableRow key={missionIndex}>
                      <TableCell className="dark:text-white text-black">
                        <a href={mission.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {mission.name}
                        </a>
                      </TableCell>
                      <TableCell className="dark:text-white text-black">{mission.owner}</TableCell>
                      <TableCell className="dark:text-white text-black">{mission.wavelength}</TableCell>
                      <TableCell className="dark:text-white text-black">{mission.target}</TableCell>
                      <TableCell className="dark:text-white text-black">{mission.goals}</TableCell>
                       <TableCell><Badge>{mission.missionType}</Badge></TableCell>
                        <TableCell className="dark:text-white text-black">{mission.launchYear}</TableCell>
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
                  <TableHead className="dark:text-white text-black">Owner</TableHead>
                  <TableHead className="dark:text-white text-black">Wavelength</TableHead>
                  <TableHead className="dark:text-white text-black">Target</TableHead>
                  <TableHead className="dark:text-white text-black">Goals</TableHead>
                  <TableHead className="dark:text-white text-black">Launch Year</TableHead>
                  <TableHead className="dark:text-white text-black">Country</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {missions.map((mission, missionIndex) => (
                  <TableRow key={missionIndex}>
                    <TableCell className="dark:text-white text-black">
                      <a href={mission.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {mission.name}
                      </a>
                    </TableCell>
                    <TableCell className="dark:text-white text-black">{mission.owner}</TableCell>
                    <TableCell className="dark:text-white text-black">{mission.wavelength}</TableCell>
                    <TableCell className="dark:text-white text-black">{mission.target}</TableCell>
                    <TableCell className="dark:text-white text-black">{mission.goals}</TableCell>
                     <TableCell className="dark:text-white text-black">{mission.launchYear}</TableCell>
                    <TableCell className="dark:text-white text-black">{mission.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}

      {/* Add more content related to Missions here */}
      <p className="dark:text-gray-300">Content about Space Programmes will be added soon...</p>
    </div>
  );
};

export default MissionsPage;
