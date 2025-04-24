'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {Home as HomeIcon} from 'lucide-react';
import featureData from './explore/featureData.json';

interface FeatureItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType;
}

interface Mission {
  name: string;
  link: string;
}
interface Telescope {
  name: string;
  url: string;
}

interface Rocket {
  name: string;
  wikiLink: string;
}

const getDailyMission = (): Mission => {
  const today = new Date();
  const dayOfYear = (date => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
  })(today);

  //Import spaceMissionsData here because of build issues
  const spaceMissionsData = require('./missions/spaceMissions.json');
  const missionIndex = dayOfYear % spaceMissionsData.length;
  return spaceMissionsData[missionIndex];
};

const getDailyTelescope = (): Telescope => {
  const today = new Date();
  const dayOfYear = (date => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
  })(today);

  //Import activeTelescopesData here because of build issues
  const activeTelescopesData = require('./telescopes/activeTelescopesData.json');
  const telescopeIndex = dayOfYear % activeTelescopesData.length;
  return activeTelescopesData[telescopeIndex];
};

const getDailyRocket = (): Rocket => {
   const today = new Date();
  const dayOfYear = (date => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
  })(today);

  const rocketData = require('./rockets/rocketData.json');
  const rocketIndex = dayOfYear % rocketData.length;
  return rocketData[rocketIndex];
};


export default function HomePage() {
  const [dailyMission, setDailyMission] = useState<Mission>(getDailyMission());
  const [dailyTelescope, setDailyTelescope] = useState<Telescope>(getDailyTelescope());
  const [dailyRocket, setDailyRocket] = useState<Rocket>(getDailyRocket());

  useEffect(() => {
    setDailyMission(getDailyMission());
    setDailyTelescope(getDailyTelescope());
    setDailyRocket(getDailyRocket());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm dark:bg-gray-800">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-teal-300 flex items-center gap-2">
          <HomeIcon className="w-6 h-6"/>
          Cosmic Navigator
        </Link>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Welcome to Cosmic Navigator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Explore humanity's greatest achievements and future possibilities in space.
          </p>

          {/* Daily Featured Mission */}
          <div className="mb-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-900 mb-2">Featured Space Mission of the Day</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Today's featured mission is:
              <a href={dailyMission.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-700 dark:text-teal-300 dark:hover:text-teal-200 ml-1">
                {dailyMission.name}
              </a>
            </p>
          </div>

           {/* Daily Featured Telescope */}
           <div className="mb-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-900 mb-2">Featured Space Telescope of the Day</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Today's featured  Telescope is:
              <a href={`/telescopes/${dailyTelescope.name.replace(/[^a-zA-Z0-9]/g, '-')}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-700 dark:text-teal-300 dark:hover:text-teal-200 ml-1">
                {dailyTelescope.name}
              </a>
            </p>
          </div>

            {/* Daily Featured Rocket */}
          <div className="mb-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-900 mb-2">Featured Rocket of the Day</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Today's featured Rocket is:
              <a href={`/rockets/${dailyRocket.name.replace(/[^a-zA-Z0-9]/g, '-')}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-700 dark:text-teal-300 dark:hover:text-teal-200 ml-1">
                {dailyRocket.name}
              </a>
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 dark:bg-teal-500 dark:hover:bg-teal-700"
          >
            Explore All Features
          </Link>
        </section>
      </main>
    </div>
  );
}

