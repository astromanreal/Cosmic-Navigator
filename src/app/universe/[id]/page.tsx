'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import universeMissionsData from '@/app/universe/universeMissions.json';

interface Mission {
  id: string;
  name: string;
  url: string;
}

interface CategoryMapping {
  [category: string]: string[];
}

interface UniverseMissionsData {
  missions: Mission[];
  categories: CategoryMapping;
}

const UniverseTopicPage = () => {
  const params = useParams();
  const topicId = params.id;

  const topicData = {
    'missions': {
      name: 'Universe Missions',
      description: 'Explore past, present, and future missions related to the universe.',
      content: (
        <>
          <p className="mb-4">
            These missions have expanded our understanding of the universe.
          </p>
          
          <MissionList category={topicId} />
          <p>
            More content about Universe Missions will be added soon...
          </p>
        </>
      ),
    },
    'big-bang': {
      name: 'Big Bang and Cosmology',
      description: 'Learn about the origins and evolution of the universe.',
      content: (
        <>
          <p className="mb-4">Explore the missions related to the Big Bang and Cosmology:</p>
           <MissionList category={topicId} />
        </>
      ),
    },
    'black-holes': {
      name: 'Black Holes',
      description: 'Discover the mysteries of black holes and their impact on the cosmos.',
      content: (
        <>
          <p className="mb-4">
            Black holes are regions of spacetime with such strong gravitational effects that nothing, not even particles and electromagnetic radiation such as light, can escape from inside it.
          </p>
          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Findings and Missions:</h3>
          <MissionList category={topicId} />
          <p>
            More content about Black Holes will be added soon...
          </p>
        </>
      ),
    },
    'galaxies': {
      name: 'Galaxies',
      description: 'Explore the different types of galaxies and their formation.',
      content: (
        <>
          <p className="mb-4">
            Galaxies are vast collections of stars, gas, dust, and dark matter bound together by gravity. They come in various shapes and sizes, ranging from dwarf galaxies with a few million stars to giant ellipticals with trillions.
          </p>
          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Types of Galaxies:</h3>
          <ul className="list-disc list-inside">
            <li>
              <b>Spiral Galaxies:</b> Characterized by a central bulge surrounded by a flattened disk with spiral arms. Our own Milky Way is a spiral galaxy.
            </li>
            <li>
              <b>Elliptical Galaxies:</b> Smooth, oval-shaped galaxies with little gas or dust. They are typically composed of older stars.
            </li>
            <li>
              <b>Irregular Galaxies:</b> Galaxies with no defined shape, often formed through gravitational interactions with other galaxies.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Findings and Missions:</h3>
           <MissionList category={topicId} />
          <p>
            More content about Galaxies will be added soon...
          </p>
        </>
      ),
    },
    'gravity': {
      name: 'Gravity',
      description: 'Understand the fundamental force that shapes the universe.',
      content: (
        <>
          <p className="mb-4">
            Gravity is the fundamental force of attraction that governs the motion of objects in the universe. It is responsible for holding planets in orbit around stars, forming galaxies, and shaping the large-scale structure of the cosmos.
          </p>
          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Concepts:</h3>
          <ul className="list-disc list-inside">
            <li>
              <b>Newton's Law of Universal Gravitation:</b> Describes the gravitational force between two objects as proportional to the product of their masses and inversely proportional to the square of the distance between them.
            </li>
            <li>
              <b>Einstein's Theory of General Relativity:</b> Describes gravity as a curvature of spacetime caused by mass and energy. Objects follow the curves in spacetime, which we perceive as gravity.
            </li>
            <li>
              <b>Gravitational Waves:</b> Ripples in spacetime caused by accelerating massive objects, such as black hole mergers.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Missions and Findings:</h3>
           <MissionList category={topicId} />
          <p>
            More content about Gravity will be added soon...
          </p>
        </>
      ),
    },
    'interstellar-medium': {
      name: 'Interstellar Medium',
      description: 'Learn about the matter and radiation that exist between stars.',
      content: (
        <>
          <p className="mb-4">
            The interstellar medium (ISM) is the matter and radiation that exist in the space between the star systems in a galaxy. It includes gas in ionic, atomic, and molecular form, dust, cosmic rays, and magnetic fields.
          </p>
          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Components:</h3>
          <ul className="list-disc list-inside">
            <li>
              <b>Gas:</b> Primarily hydrogen and helium, with trace amounts of heavier elements.
            </li>
            <li>
              <b>Dust:</b> Tiny solid particles composed of elements such as carbon, silicon, and oxygen.
            </li>
            <li>
              <b>Cosmic Rays:</b> High-energy particles that travel through space at nearly the speed of light.
            </li>
            <li>
              <b>Magnetic Fields:</b> Play a crucial role in the dynamics and structure of the ISM.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Missions and Findings:</h3>
            <MissionList category={topicId} />
        </>
      ),
    },
    'gamma-ray-bursts': {
      name: 'Gamma-Ray Bursts',
      description: 'Uncover the secrets of these powerful cosmic explosions.',
      content: (
        <>
          <p className="mb-4">
            Gamma-ray bursts (GRBs) are the most luminous electromagnetic events known to occur in the universe. They are characterized by intense bursts of gamma rays, which are the most energetic form of light. GRBs typically last from a few milliseconds to several minutes.
          </p>
          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Properties:</h3>
          <ul className="list-disc list-inside">
            <li>
              <b>Extremely Energetic:</b> GRBs release an enormous amount of energy, equivalent to the energy the Sun will emit over its entire 10-billion-year lifetime, but in a matter of seconds.
            </li>
            <li>
              <b>Distant Origins:</b> Most GRBs originate from distant galaxies, billions of light-years away.
            </li>
            <li>
              <b>Afterglows:</b> Following the initial burst, GRBs often exhibit afterglows in X-ray, optical, and radio wavelengths, which can last for days or weeks.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Possible Causes:</h3>
          <ul className="list-disc list-inside">
            <li>
              <b>Core-Collapse Supernovae:</b> Some GRBs are associated with the explosive death of massive stars, known as core-collapse supernovae.
            </li>
            <li>
              <b>Neutron Star Mergers:</b> Other GRBs are believed to result from the merger of two neutron stars or a neutron star and a black hole.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Missions and Findings:</h3>
           <MissionList category={topicId} />
        </>
      ),
    },
    'life-in-universe': {
      name: 'Life in the Universe',
      description: 'Explore the possibilities of life beyond Earth.',
      content: <p>Content about Life in the Universe will be added soon...</p>,
    },
    'nebulae': {
      name: 'Nebulae',
      description: 'Witness the beauty of nebulae, stellar nurseries, and cosmic clouds.',
      content: (
        <>
          <p className="mb-4">
            Nebulae are vast clouds of gas and dust in space, often illuminated by the light of nearby stars. They are the birthplaces of stars, where gravity causes the gas and dust to collapse and form new suns. Nebulae also represent the remnants of dying stars, enriching the interstellar medium with heavy elements.
          </p>
          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Types of Nebulae:</h3>
          <ul className="list-disc list-inside">
            <li>
              <b>Emission Nebulae:</b> Glowing clouds of ionized gas that emit their own light, often pink or red due to hydrogen recombination. Examples include the Orion Nebula and the Lagoon Nebula.
            </li>
            <li>
              <b>Reflection Nebulae:</b> Clouds of dust that reflect the light of nearby stars, typically appearing blue. An example is the Witch Head Nebula.
            </li>
            <li>
              <b>Dark Nebulae:</b> Dense clouds of dust that block the light from objects behind them, appearing as dark patches against a brighter background. The Horsehead Nebula is a well-known example.
            </li>
            <li>
              <b>Planetary Nebulae:</b> The ejected outer layers of dying stars, glowing brightly due to the central star's ultraviolet radiation. Examples include the Ring Nebula and the Dumbbell Nebula.
            </li>
            <li>
              <b>Supernova Remnants:</b> The expanding remains of a supernova explosion, composed of hot gas and energetic particles. The Crab Nebula is a famous example.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Findings and Missions:</h3>
             <MissionList category={topicId} />
        </>
      ),
    },
    'planets-beyond': {
      name: 'Planets Beyond the Solar System',
      description: 'Discover the exoplanets that orbit distant stars.',
      content: (
        <>
        <p className="mb-4">
          Planets beyond our solar system, known as exoplanets, are revolutionizing our understanding of planetary systems and the potential for life beyond Earth. These distant worlds exhibit a wide range of characteristics, from gas giants orbiting close to their stars to rocky planets in the habitable zones.
        </p>

        <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Methods of Detection:</h3>
        <ul className="list-disc list-inside">
          <li>
            <b>Transit Method:</b> Detecting exoplanets by observing the slight dimming of a star's light as a planet passes in front of it.
          </li>
          <li>
            <b>Radial Velocity Method:</b> Measuring the wobble of a star caused by the gravitational pull of an orbiting planet.
          </li>
          <li>
            <b>Direct Imaging:</b> Capturing images of exoplanets directly, which is challenging due to their faintness and proximity to their stars.
          </li>
        </ul>

          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Missions and Findings:</h3>
             <MissionList category={topicId} />
      </>
      ),
    },
    'stars': {
      name: 'Stars',
      description: 'Study the life cycle of stars, from birth to death.',
      content: (
        <>
          <p className="mb-4">
            Stars are the fundamental building blocks of galaxies and the universe. They are massive, luminous spheres of plasma held together by their own gravity. Stars are born in nebulae, undergo various stages of evolution, and eventually die, often enriching the interstellar medium with heavy elements.
          </p>
          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Concepts:</h3>
          <ul className="list-disc list-inside">
            <li>
              <b>Stellar Evolution:</b> Stars go through different stages of life depending on their mass, from protostars to main sequence stars, giants, supergiants, and eventually white dwarfs, neutron stars, or black holes.
            </li>
            <li>
              <b>Hertzsprung-Russell Diagram:</b> A plot of stars showing the relationship between their luminosity and temperature, which reveals different stages of stellar evolution.
            </li>
            <li>
              <b>Nuclear Fusion:</b> Stars generate energy through nuclear fusion in their cores, converting hydrogen into helium and heavier elements.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Missions and Findings:</h3>
           <MissionList category={topicId} />
            
            
          
        </>
          ),
        },
        'supernovae': {
          name: 'Supernovae',
          description: 'Investigate the explosive demise of stars and their role in the universe.',
          content: (
            <>
              <p className="mb-4">
                Supernovae are among the most energetic events in the universe, marking the explosive death of a star. These cataclysmic events play a crucial role in the cosmos, dispersing heavy elements into the interstellar medium and triggering the formation of new stars and planetary systems.
              </p>
              <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Concepts:</h3>
              <ul className="list-disc list-inside">
                <li>
                  <b>Type Ia Supernovae:</b> Occur in binary systems when a white dwarf star accretes matter from a companion star, eventually reaching a critical mass and exploding. These supernovae are used as standard candles to measure distances in the universe.
                </li>
                <li>
                  <b>Type II Supernovae:</b> Result from the core collapse of massive stars, typically more than 8 times the mass of the Sun. These events leave behind neutron stars or black holes.
                </li>
                <li>
                  <b>Supernova Remnants:</b> The expanding debris clouds left behind after a supernova explosion. These remnants can interact with the surrounding interstellar medium, creating complex structures and accelerating particles to high energies.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Key Missions and Findings:</h3>
               <MissionList category={topicId} />
            </>
          ),
        },
      };

      const topic = topicData[topicId as keyof typeof topicData] || {
        name: 'Topic Not Found',
        description: 'The requested topic could not be found.',
        content: <p>The requested topic could not be found.</p>,
      };

      return (
        <div className="container mx-auto py-10 px-4">
          <section className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">{topic.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
          </section>

          {topic.content}
        </div>
      );
    };

    interface MissionListProps {
      category: string;
    }

    const MissionList: React.FC<MissionListProps> = ({ category }) => {
      const missions: Mission[] = React.useMemo(() => {
        const categoryMissionIds = (universeMissionsData.categories as any)[category] || [];
        return universeMissionsData.missions.filter(mission =>
          categoryMissionIds.includes(mission.id)
        );
      }, [category]);
    
      return (
        <>
          {missions.length > 0 ? (
            <ul className="list-disc list-inside">
              {missions.map((mission) => (
                <li key={mission.id} className="mb-2 dark:text-gray-300">
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
          ) : (
            <p className="dark:text-gray-300">No relevant missions found for this topic.</p>
          )}
        </>
      );
    };

    export default UniverseTopicPage;
