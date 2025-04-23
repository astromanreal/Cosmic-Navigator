'use client';

import SubpageLink from './SubpageLink';

const EarthPage = () => {
  const subpages = [
    { id: 'atmosphere', name: 'Atmosphere' },
    { id: 'climate', name: 'Climate' },
    { id: 'continental-drift', name: 'Continental Drift & Geodynamics' },
    { id: 'gravity', name: 'Gravity' },
    { id: 'hurricanes', name: 'Hurricanes' },
    { id: 'ice', name: 'Ice' },
    { id: 'land-vegetation', name: 'Land and Vegetation' },
    { id: 'oceans', name: 'Oceans' },
    { id: 'ozone', name: 'Ozone' },
    { id: 'sun-influence', name: 'Sun and Its Influence on Earth' },
    { id: 'water-cycle', name: 'Water Cycle' },
    { id: 'weather', name: 'Weather' },
    { id: 'wildfires', name: 'Wildfires' },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">Our Home: Earth</h1>
        <p className="text-gray-500 mb-4 dark:text-gray-400">
          "Look again at that dot. That's here. That's home. That's us." - Carl Sagan
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Discover the beauty and complexity of our planet, its diverse ecosystems, and its place in the cosmos.
        </p>
      </section>

      {/* Subpages */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900 text-center">
          Explore Earth's Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subpages.map((subpage) => (
            <SubpageLink key={subpage.id} id={subpage.id} name={subpage.name} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default EarthPage;
