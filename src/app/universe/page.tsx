'use client';

import Link from 'next/link';

const UniversePage = () => {
  const universeTopics = [
    { id: 'missions', name: 'Universe Missions' },
    { id: 'big-bang', name: 'Big Bang and Cosmology' },
    { id: 'black-holes', name: 'Black Holes' },
    { id: 'galaxies', name: 'Galaxies' },
    { id: 'gamma-ray-bursts', name: 'Gamma-Ray Bursts' },
    { id: 'gravity', name: 'Gravity' },
    { id: 'interstellar-medium', name: 'Interstellar Medium' },
    { id: 'life-in-universe', name: 'Life in the Universe' },
    { id: 'nebulae', name: 'Nebulae' },
    { id: 'planets-beyond', name: 'Planets Beyond the Solar System' },
    { id: 'stars', name: 'Stars' },
    { id: 'supernovae', name: 'Supernovae' },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">Delving into the Universe</h1>
        <p className="text-gray-500 mb-4 dark:text-gray-400">
          "Somewhere, something incredible is waiting to be known." - Carl Sagan
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Explore the vastness of the universe, from galaxies to black holes, and unravel its deepest mysteries.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">Explore Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {universeTopics.map((topic) => (
            <Link href={`/universe/${topic.id}`} key={topic.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{topic.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Add more content related to the Universe here */}
      <p className="dark:text-gray-300">Content about the Universe will be added soon...</p>
    </div>
  );
};

export default UniversePage;

