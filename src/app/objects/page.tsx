'use client';

import Link from 'next/link';

const ObjectsPage = () => {
  const object = [
    { id: 'black-holes', name: 'Black Holes', description: 'Explore the mysteries of black holes and their impact on the cosmos.' },
    { id: 'galaxies', name: 'Galaxies', description: 'Explore the different types of galaxies and their formation.' },
    { id: 'gravity', name: 'Gravity', description: 'Understand the fundamental force that shapes the universe.' },
    { id: 'interstellar-medium', name: 'Interstellar Medium', description: 'Learn about the matter and radiation that exist between stars.' },
    { id: 'gamma-ray-bursts', name: 'Gamma-Ray Bursts', description: 'Uncover the secrets of these powerful cosmic explosions.' },
    { id: 'nebulae', name: 'Nebulae', description: 'Witness the beauty of nebulae, stellar nurseries, and cosmic clouds.' },
    { id: 'planets-beyond', name: 'Planets Beyond the Solar System', description: 'Discover the exoplanets that orbit distant stars.' },
    { id: 'stars', name: 'Stars', description: 'Study the life cycle of stars, from birth to death.' },
    { id: 'supernovae', name: 'Supernovae', description: 'Investigate the explosive demise of stars and their role in the universe.' },
    { id: 'types-of-stars', name: 'Types of Stars', description: 'Explore the different classifications and characteristics of stars.' },
    { id: 'types-of-planets', name: 'Types of Planets', description: 'Discover the diverse categories and properties of planets in our universe.' },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">Explore Space Objects</h1>
        <p className="text-gray-500 mb-4 dark:text-gray-400">
          "The universe is full of magical things, patiently waiting for our wits to grow sharper." - Eden Phillpotts
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Delve into a variety of fascinating subjects that unravel the mysteries of the cosmos.
        </p>
      </section>

      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {object.map((object) => (
            <div key={object.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{object.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{object.description}</p>
                           <Link
                  href={`/objects/${object.id}`}
                  className="inline-block mt-4 text-blue-500 hover:text-blue-700 dark:text-teal-300 dark:hover:text-teal-200"
                >
                  Know More...
                </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Add more content related to Space Topics here */}
      <p className="dark:text-gray-300">Content about Space Topics will be added soon...</p>
    </div>
  );
};

export default ObjectsPage;
