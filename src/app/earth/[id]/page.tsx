// src/app/earth/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import earthScienceMissionsData from './earth_science_missions.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ExternalLink, Info } from 'lucide-react';
import MissionCard from './MissionCard'; // Import the new MissionCard component

// Icons for subpages
import { Waves, Mountain, Wind, Droplets, Sun, Cloud, Flame, Thermometer, Globe, LucideIcon } from 'lucide-react';

interface MissionEntry {
  name: string;
  url: string;
  launchDate?: string;
  owner?: string;
  rocket?: string;
  description?: string;
  status?: string;
}

interface EarthScienceMissionCategory {
  target: string;
  missions: MissionEntry[];
}

const subpageIcons: { [key: string]: LucideIcon } = {
  atmosphere: Wind,
  climate: Thermometer,
  'continental-drift': Mountain,
  gravity: Droplets,
  hurricanes: Wind,
  ice: Cloud,
  'land-vegetation': Mountain,
  oceans: Waves,
  ozone: Cloud,
  'sun-influence': Sun,
  'water-cycle': Droplets,
  weather: Cloud,
  wildfires: Flame,
  default: Globe,
};


const EarthSubpage = () => {
  const params = useParams();
  const subpageId = params.id as string;

  const subpageDataMap: { [key: string]: { title: string; description: string; content: string } } = {
    atmosphere: {
      title: 'Atmosphere',
      description: "Explore Earth's atmosphere, its layers, composition, and vital importance for life and climate.",
      content: "Earth's atmosphere is a complex system of gases that surrounds our planet, protecting us from harmful solar radiation, regulating temperature, and enabling life as we know it. It consists of several layers, including the troposphere, stratosphere, mesosphere, thermosphere, and exosphere, each with unique characteristics. Key components include nitrogen, oxygen, argon, and trace gases like carbon dioxide and water vapor, which play crucial roles in weather patterns, climate change, and atmospheric phenomena like auroras and meteor showers.",
    },
    climate: {
      title: 'Climate',
      description: "Delve into Earth's climate system, the long-term weather patterns, and the factors influencing climate change.",
      content: "Earth's climate is the long-term average of weather, typically averaged over a period of 30 years. It is a complex system influenced by solar radiation, the atmosphere, oceans, land surfaces, and ice. Key aspects include temperature, precipitation, wind patterns, and the frequency of extreme weather events. Understanding natural climate variability and the impacts of human activities, such as greenhouse gas emissions leading to global warming, is crucial for predicting future climate scenarios and mitigating their effects.",
    },
    'continental-drift': {
      title: 'Continental Drift & Geodynamics',
      description: "Discover the concept of continental drift and the dynamic processes shaping Earth's surface.",
      content: "Continental drift theory, now part of the broader theory of plate tectonics, describes how Earth's continents have moved over geological time relative to each other. This movement is driven by the slow convection currents in the Earth's mantle. Geodynamics encompasses the study of these plate movements, which lead to phenomena like earthquakes, volcanic eruptions, mountain formation, and the creation of ocean basins. Understanding these processes is key to deciphering Earth's geological history and predicting future changes.",
    },
    gravity: {
      title: 'Gravity',
      description: "Understand the fundamental force of gravity and its profound effects on Earth and the cosmos.",
      content: "Gravity is one of the four fundamental forces of nature, responsible for the attraction between objects with mass. On Earth, it keeps us grounded, governs the tides, influences the shape of our planet, and holds our atmosphere. In the broader cosmos, gravity dictates the orbits of planets, stars, and galaxies, and plays a critical role in the formation and evolution of large-scale structures. Earth's gravitational field is not uniform, varying slightly due to differences in mass distribution and topography.",
    },
    hurricanes: {
      title: 'Hurricanes',
      description: 'Explore the formation, dynamics, and significant impact of hurricanes on coastal regions and global weather.',
      content: "Hurricanes, also known as typhoons or cyclones in different parts of the world, are powerful tropical storms characterized by strong winds, heavy rainfall, and storm surges. They form over warm ocean waters and are fueled by the heat and moisture from the sea. Understanding their complex dynamics, tracking their paths, and predicting their intensity are crucial for mitigating their devastating impacts on coastal communities and ecosystems. Climate change is also believed to influence the frequency and intensity of these storms.",
    },
    ice: {
      title: 'Ice',
      description: "Study Earth's vast ice formations, including glaciers, ice caps, and sea ice, and their critical role in the global environment.",
      content: "Earth's cryosphere, which includes all forms of ice such as glaciers, ice sheets in Greenland and Antarctica, sea ice, and permafrost, plays a vital role in regulating global climate and sea levels. These icy regions reflect solar radiation, influence ocean currents, and store vast amounts of fresh water. The melting of glaciers and ice sheets due to climate change is a major concern, contributing to rising sea levels and impacting ecosystems and human populations worldwide.",
    },
    'land-vegetation': {
      title: 'Land and Vegetation',
      description: "Discover Earth's diverse landscapes, terrestrial ecosystems, and the critical importance of vegetation for life.",
      content: "Earth's land surfaces host an incredible diversity of ecosystems, from lush rainforests and vast grasslands to arid deserts and towering mountain ranges. Vegetation, including forests, plants, and crops, is fundamental to these ecosystems. It produces oxygen, absorbs carbon dioxide, provides habitats for countless species, supports agriculture, and influences soil health and water cycles. Understanding land use change, deforestation, and the impact of climate on vegetation is crucial for environmental sustainability.",
    },
    oceans: {
      title: 'Oceans',
      description: "Explore Earth's vast oceans, their currents, diverse ecosystems, and their integral role in the global climate system.",
      content: "Oceans cover over 70% of Earth's surface and are essential to life on our planet. They regulate global climate by absorbing and distributing heat, drive weather patterns, produce a significant portion of the oxygen we breathe, and host an immense biodiversity. Ocean currents, like the Gulf Stream, transport heat around the globe. However, oceans face threats from pollution, overfishing, and climate change, leading to issues like ocean acidification and rising sea levels.",
    },
    ozone: {
      title: 'Ozone Layer',
      description: "Study the ozone layer, its importance in protecting Earth from harmful ultraviolet (UV) radiation, and efforts to preserve it.",
      content: "The ozone layer is a region of Earth's stratosphere that absorbs most of the Sun's ultraviolet (UV) radiation. This protective shield is crucial for life on Earth, as excessive UV radiation can cause skin cancer, cataracts, and harm ecosystems. The discovery of the ozone hole, primarily caused by human-produced chemicals like chlorofluorocarbons (CFCs), led to international agreements like the Montreal Protocol to phase out these substances, showing a successful example of global environmental cooperation.",
    },
    'sun-influence': {
      title: 'Sun and Its Influence on Earth',
      description: "Learn about the Sun's energy, its profound effects on Earth's climate, environment, and the phenomenon of space weather.",
      content: "The Sun, our nearest star, is the primary source of energy for Earth, driving our climate, weather systems, and supporting all life through photosynthesis. Solar radiation warms the planet, and variations in solar activity, such as sunspots and solar flares, can influence space weather. Space weather events, like coronal mass ejections, can impact satellite operations, power grids, and even produce beautiful auroras. Understanding the Sun's behavior is vital for predicting its influence on Earth and our technological systems.",
    },
    'water-cycle': {
      title: 'Water Cycle',
      description: "Understand the continuous movement of water on, above, and below the surface of the Earth, a process fundamental to life.",
      content: "The water cycle, or hydrological cycle, describes the continuous movement of water on, above, and below the surface of the Earth. This vital process involves evaporation, transpiration, condensation, precipitation, and runoff. It ensures the availability of fresh water for drinking, agriculture, and ecosystems. The water cycle plays a critical role in shaping Earth's weather, climate, and geological features. Human activities and climate change can significantly impact the balance of the water cycle.",
    },
    weather: {
      title: 'Weather',
      description: "Explore Earth's complex weather patterns, the science behind daily atmospheric events, and the methods of forecasting.",
      content: "Weather refers to the state of the atmosphere at a particular place and time, encompassing variables like temperature, humidity, wind speed, and precipitation. It is driven by energy from the Sun and interactions between the atmosphere, oceans, and land. Understanding atmospheric science, including phenomena like fronts, storms, and jet streams, is key to weather forecasting. Accurate forecasts are crucial for agriculture, transportation, disaster preparedness, and daily life.",
    },
    wildfires: {
      title: 'Wildfires',
      description: "Study the causes, ecological effects, and management strategies for wildfires on Earth, a growing global concern.",
      content: "Wildfires are uncontrolled fires that burn in wildland areas, often fueled by dry vegetation. They can be caused by natural events like lightning or by human activities. Wildfires have significant ecological impacts, both destructive and regenerative, and can severely affect air quality, human health, and property. Climate change, leading to hotter and drier conditions, is increasing the frequency and intensity of wildfires in many regions, making their study and management more critical than ever.",
    },
  };

  const subpage = subpageDataMap[subpageId] || {
    title: 'Subpage Not Found',
    description: 'The requested subpage could not be found.',
    content: 'Content for this subpage will be added soon...',
  };

  const relevantMissions: MissionEntry[] = (earthScienceMissionsData as EarthScienceMissionCategory[]).find(
    (item: EarthScienceMissionCategory) => item.target.toLowerCase().replace(/\s+/g, '-') === subpageId
  )?.missions || [];


  const IconComponent = subpageIcons[subpageId] || subpageIcons.default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-12 text-center animate-fade-in py-10 bg-gray-800/30 dark:bg-black/40 rounded-xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-teal-600/30 rounded-full inline-block shadow-lg">
              <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 text-teal-300" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mb-4 px-2">
            {subpage.title}
          </h1>
          <p className="text-md sm:text-lg text-gray-300 dark:text-gray-400 max-w-3xl mx-auto italic px-4">
            {subpage.description}
          </p>
        </section>

        {/* Main Content Card */}
        <Card className="mb-12 bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
              <Info className="mr-2 h-6 w-6 text-cyan-400" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 dark:text-gray-200 leading-relaxed prose prose-invert prose-base max-w-none prose-p:text-gray-300 dark:prose-p:text-gray-200">
            <p>{subpage.content}</p>
          </CardContent>
        </Card>

        {/* Relevant Missions Section */}
        {relevantMissions && relevantMissions.length > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
              Relevant Missions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantMissions.map((mission) => (
                <MissionCard key={mission.name} mission={mission} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default EarthSubpage;

