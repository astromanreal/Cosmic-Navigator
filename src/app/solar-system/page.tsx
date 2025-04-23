'use client';

import Link from 'next/link';
import solarSystemData from './solarSystemData.json';

interface SolarSystemBody {
  id: string;
  name: string;
  description: string;
}

const SolarSystemPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">Explore the Solar System</h1>
        <p className="text-gray-500 mb-4 dark:text-gray-400">
          "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself." - Carl Sagan
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Journey through our solar system, from the fiery Sun to the icy reaches of the Kuiper Belt. Click on a celestial body below to learn more!
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">Solar System Bodies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {solarSystemData.map((body: SolarSystemBody) => (
            <Link
              href={`/solar-system/${body.id}`}
              key={body.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{body.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{body.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SolarSystemPage;
