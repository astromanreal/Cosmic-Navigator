'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import earthScienceMissions from './earth_science_missions.json';

interface Mission {
  name: string;
  url: string;
  launchDate: string;
  owner: string;
  rocket: string;
  target: string;
}

const EarthSubpage = () => {
  const params = useParams();
  const subpageId = params.id;

  const subpageData = {
    atmosphere: {
      title: 'Atmosphere',
      description:
        'Explore Earth\'s atmosphere, its layers, composition, and importance.',
      content:
        'Content about the atmosphere will be added here. Learn about its role in weather, climate, and life on Earth.',
    },
    'continental-drift': {
      title: 'Continental Drift & Geodynamics',
      description: 'Discover the concept of continental drift and the dynamic processes shaping Earth\'s surface.',
      content:
        'Content about continental drift and geodynamics will be added here. Learn about plate tectonics, earthquakes, volcanoes, and the formation of mountains.',
    },
    gravity: {
      title: 'Gravity',
      description: 'Understand the force of gravity and its effects on Earth.',
      content:
        'Content about gravity will be added here. Explore how gravity affects tides, the atmosphere, and the shape of the Earth.',
    },
    hurricanes: {
      title: 'Hurricanes',
      description: 'Explore the formation, dynamics, and impact of hurricanes.',
      content:
        'Content about hurricanes will be added here. Learn about the science behind these powerful storms and their effects on coastal regions.',
    },
    ice: {
      title: 'Ice',
      description: 'Study Earth\'s ice formations, glaciers, ice caps, and their role in the environment.',
      content:
        'Content about Earth\'s ice will be added here. Understand the importance of glaciers, ice sheets, and sea ice in regulating the climate and maintaining sea levels.',
    },
    'land-vegetation': {
      title: 'Land and Vegetation',
      description: 'Discover Earth\'s diverse landscapes and the importance of vegetation.',
      content:
        'Content about land and vegetation will be added here. Learn about different biomes, ecosystems, and the role of plants in supporting life.',
    },
    oceans: {
      title: 'Oceans',
      description: 'Explore Earth\'s oceans, their currents, ecosystems, and their role in the global climate.',
      content:
        'Content about the oceans will be added here. Understand ocean currents, marine life, and the impact of pollution on the marine environment.',
    },
    ozone: {
      title: 'Ozone',
      description: 'Study the ozone layer and its importance in protecting Earth from harmful radiation.',
      content:
        'Content about the ozone layer will be added here. Learn about the ozone depletion and efforts to protect and restore this vital atmospheric shield.',
    },
    'sun-influence': {
      title: 'Sun and Its Influence on Earth',
      description: 'Learn about the Sun\'s energy and its effects on Earth\'s climate and environment.',
      content:
        'Content about the Sun and its influence on Earth will be added here. Explore the relationship between solar activity and terrestrial weather patterns.',
    },
    'water-cycle': {
      title: 'Water Cycle',
      description: 'Understand the continuous movement of water on, above, and below the surface of the Earth.',
      content:
        'Content about the water cycle will be added here. Learn about evaporation, condensation, precipitation, and the importance of freshwater resources.',
    },
    weather: {
      title: 'Weather',
      description: 'Explore Earth\'s weather patterns, forecasting, and the science behind daily weather events.',
      content:
        'Content about the weather will be added here. Learn about weather forecasting, atmospheric conditions, and the impact of weather events on human activities.',
    },
    wildfires: {
      title: 'Wildfires',
      description: 'Study the causes, effects, and management of wildfires on Earth.',
      content:
        'Content about wildfires will be added here. Understand the role of climate, vegetation, and human activities in the occurrence and spread of wildfires.',
    },
  };

  const subpage = subpageData[subpageId as keyof typeof subpageData] || {
    title: 'Subpage Not Found',
    description: 'The requested subpage could not be found.',
    content: 'Content for this subpage will be added soon...',
  };

  const relevantMissions: Mission[] = (earthScienceMissions as any).find(item => item.target === subpageId)?.missions || [];

  return (
    <div className="container mx-auto py-10 px-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">{subpage.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{subpage.description}</p>
      </section>

      <section>
        <p className="dark:text-gray-300">{subpage.content}</p>
      </section>

      {relevantMissions && relevantMissions.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">
            Relevant Missions
          </h2>
          <ul>
            {relevantMissions.map((mission) => (
              <li key={mission.name} className="mb-2 dark:text-gray-300">
                <a
                  href={mission.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {mission.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default EarthSubpage;
