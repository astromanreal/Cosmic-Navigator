'use client';

import spaceAgenciesData from './space_agencies.json';

interface SpaceAgency {
  id: number;
  name: string;
  country: string;
  details: string;
  url: string;
  type: string;
  founded: string;
  owner: string;
  headquarters: string;
  notable_missions: string[];
}

const SpaceAgenciesPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">Leading Space Agencies</h1>
        <p className="text-gray-500 mb-4 dark:text-gray-400">
          "Exploration is in our nature. We began as wanderers, and we are wanderers still." - Carl Sagan
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Learn about the pioneering space agencies that are driving humanity's exploration of the universe.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">Agencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaceAgenciesData.map((agency: SpaceAgency) => (
            <div key={agency.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-2">{agency.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{agency.details}</p>

              <div className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                <p>
                  <span className="font-semibold">Type:</span> <span className="text-blue-500">{agency.type}</span>
                </p>
                <p>
                  <span className="font-semibold">Founded:</span> <span className="text-green-500">{agency.founded}</span>
                </p>
                <p>
                  <span className="font-semibold">Owner:</span> <span className="text-purple-500">{agency.owner}</span>
                </p>
                <p>
                  <span className="font-semibold">Headquarters:</span> <span className="text-orange-500">{agency.headquarters}</span>
                </p>
                <p>
                  <span className="font-semibold">Notable Missions:</span>
                  {agency.notable_missions.map((mission, index) => (
                    <span key={index}>
                      {mission}
                      {index < agency.notable_missions.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>

              <a href={agency.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-500 hover:text-blue-700 dark:text-teal-300 dark:hover:text-teal-200">
                Explore
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpaceAgenciesPage;
