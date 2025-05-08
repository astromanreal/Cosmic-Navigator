// src/app/page.tsx
'use client';

import Link from 'next/link';
import {useEffect, useState, useRef} from 'react';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";
import {Rocket, Telescope, Compass, ArrowRight, Sun, Moon, Globe, BookOpen, Atom, FlaskConical, GraduationCap, Orbit } from 'lucide-react';
import type React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import SearchFilter from '@/components/SearchFilter'; // Import the SearchFilter component
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import JSON data
import spaceMissionsData from './missions/spaceMissions.json';
import activeTelescopesData from './telescopes/activeTelescopesData.json';
import rocketData from './rockets/rocketData.json';


interface Mission {
  name: string;
  link: string;
  goals?: string;
}
interface TelescopeData {
  name: string;
  url?: string;
  goals?: string;
}

interface RocketData {
  name: string;
  wikiLink: string;
  description?: string;
}

const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const getDailyItem = <T,>(data: T[]): T => {
  if (!data || data.length === 0) {
    // Return a default structure or handle error appropriately
    // For now, returning an empty object cast to T, which might not be ideal for all T
    return {} as T;
  }
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  const index = dayOfYear % data.length;
  return data[index];
};

export default function HomePage() {
  const [dailyMission, setDailyMission] = useState<Mission | null>(null);
  const [dailyTelescope, setDailyTelescope] = useState<TelescopeData | null>(null);
  const [dailyRocket, setDailyRocket] = useState<RocketData | null>(null);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    // Ensure data arrays are not empty before calling getDailyItem
    if (spaceMissionsData && spaceMissionsData.length > 0) {
        setDailyMission(getDailyItem<Mission>(spaceMissionsData as Mission[]));
    }
    if (activeTelescopesData && activeTelescopesData.length > 0) {
        setDailyTelescope(getDailyItem<TelescopeData>(activeTelescopesData as TelescopeData[]));
    }
    if (rocketData && rocketData.length > 0) {
        setDailyRocket(getDailyItem<RocketData>(rocketData as RocketData[]));
    }
  }, []);

  const sliderImages = [
    { src: "https://i.pinimg.com/736x/22/e1/7e/22e17e832a1f1274932d65b9f836430d.jpg", alt: "Cosmic Landscape 1", aiHint: "galaxy nebula" },
    { src: "https://i.pinimg.com/736x/da/6f/1f/da6f1fce35e9b89dd298c6d6285dae48.jpg", alt: "Nebula Cloud", aiHint: "nebula stars" },
    { src: "https://i.pinimg.com/736x/51/ed/79/51ed79f6ad05d2e77cfd937b629a48d3.jpg", alt: "Planet Earth from Space", aiHint: "earth space" },
    { src: "https://i.pinimg.com/736x/8d/49/f7/8d49f7d2acf5af71af2746e076aff204.jpg", alt: "Rocket Launch", aiHint: "rocket launch" },
    { src: "https://i.pinimg.com/736x/91/22/58/9122586aa52579200042819e0931af8a.jpg", alt: "Astronaut on Moon", aiHint: "astronaut moon" },
  ];

  return (
     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-background text-gray-100 dark:from-background dark:via-gray-900 dark:to-black">
      {/* Hero Section with Search */}
      <section className="relative py-16 md:py-24 text-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/star-pattern.svg')] bg-repeat animate-pulse"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mb-6 animate-fade-in">
            Explore the Cosmos
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-10 max-w-2xl mx-auto font-mono animate-fade-in animation-delay-200">
            "The universe is a pretty big place. If it's just us, seems like an awful waste of space." - Carl Sagan
          </p>
          <div className="animate-fade-in animation-delay-400">
            <SearchFilter />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Image Slider Section */}
        <section className="mb-12">
          <Carousel
            plugins={[autoplayPlugin.current]}
            className="w-full max-w-4xl mx-auto"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {sliderImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-video relative overflow-hidden rounded-lg shadow-xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={image.aiHint}
                      priority={index === 0} // Prioritize loading the first image
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <h2 className="text-2xl md:text-4xl font-bold text-white text-center p-4">
                        {image.alt}
                      </h2>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white border-none" />
            <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white border-none" />
          </Carousel>
        </section>


        {/* Featured Content Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {dailyMission && (
             <div className="group perspective block" style={{ perspective: '1000px' }}>
              <Card className="
                bg-gray-800/60 dark:bg-black/70 
                border border-transparent dark:border-gray-700/50 dark:hover:border-blue-500/60
                shadow-lg dark:shadow-blue-900/30 
                transition-all duration-500 ease-out
                transform-style-3d 
                group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-blue-500/50 
                group-hover:-rotate-y-1 group-hover:-translate-z-2 
                relative overflow-hidden h-full flex flex-col justify-between
              ">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
               <CardHeader className="relative z-10">
                 <div className="flex items-center gap-3 mb-2">
                    <Compass className="w-7 h-7 text-teal-400" />
                    <CardTitle className="text-xl font-bold text-gray-100">Mission of the Day</CardTitle>
                 </div>
                 <CardDescription className="text-teal-300 text-md font-semibold">{dailyMission.name}</CardDescription>
               </CardHeader>
               <CardContent className="relative z-10 flex-grow">
                 <p className="text-gray-300 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                   {dailyMission.goals || 'Explore the objectives and discoveries of this fascinating space mission.'}
                 </p>
                </CardContent>
                <div className="relative z-10 p-4 pt-0 mt-auto flex justify-end">
                   <a href={dailyMission.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-400 hover:text-blue-300 dark:text-teal-300 dark:hover:text-teal-200 transition-colors font-medium text-sm">
                     Learn More <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
             </Card>
             </div>
          )}

          {dailyTelescope && (
             <div className="group perspective block" style={{ perspective: '1000px' }}>
            <Card className="
              bg-gray-800/60 dark:bg-black/70 
              border border-transparent dark:border-gray-700/50 dark:hover:border-purple-500/60
              shadow-lg dark:shadow-purple-900/30 
              transition-all duration-500 ease-out
              transform-style-3d 
              group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-purple-500/50 
              group-hover:rotate-y-1 group-hover:-translate-z-2 
              relative overflow-hidden h-full flex flex-col justify-between
            ">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
              <CardHeader className="relative z-10">
                 <div className="flex items-center gap-3 mb-2">
                   <Telescope className="w-7 h-7 text-purple-400" />
                   <CardTitle className="text-xl font-bold text-gray-100">Telescope of the Day</CardTitle>
                 </div>
                <CardDescription className="text-purple-300 text-md font-semibold">{dailyTelescope.name}</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 flex-grow">
                <p className="text-gray-300 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {dailyTelescope.goals || 'Discover the universe through the eyes of this powerful space observatory.'}
                </p>
              </CardContent>
              <div className="relative z-10 p-4 pt-0 mt-auto flex justify-end">
                <Link href={dailyTelescope.url || `/telescopes/${dailyTelescope.name.replace(/[^a-zA-Z0-9]/g, '-')}`} passHref legacyBehavior={!dailyTelescope.url?.startsWith('/')}>
                  <a target={dailyTelescope.url && !dailyTelescope.url.startsWith('/') ? "_blank" : "_self"} rel="noopener noreferrer" className="inline-flex items-center text-blue-400 hover:text-blue-300 dark:text-purple-300 dark:hover:text-purple-200 transition-colors font-medium text-sm">
                    Learn More <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Link>
              </div>
            </Card>
            </div>
          )}

          {dailyRocket && (
             <div className="group perspective block" style={{ perspective: '1000px' }}>
             <Card className="
                bg-gray-800/60 dark:bg-black/70 
                border border-transparent dark:border-gray-700/50 dark:hover:border-orange-500/60
                shadow-lg dark:shadow-orange-900/30 
                transition-all duration-500 ease-out
                transform-style-3d 
                group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-orange-500/50 
                group-hover:-rotate-y-1 group-hover:-translate-z-2 
                relative overflow-hidden h-full flex flex-col justify-between
              ">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
              <CardHeader className="relative z-10">
                 <div className="flex items-center gap-3 mb-2">
                   <Rocket className="w-7 h-7 text-orange-400" />
                   <CardTitle className="text-xl font-bold text-gray-100">Rocket of the Day</CardTitle>
                 </div>
                <CardDescription className="text-orange-300 text-md font-semibold">{dailyRocket.name}</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 flex-grow">
                <p className="text-gray-300 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                   {dailyRocket.description || 'Learn about the powerful launch vehicles that make space exploration possible.'}
                </p>
                </CardContent>
                <div className="relative z-10 p-4 pt-0 mt-auto flex justify-end">
                <Link href={`/rockets/${dailyRocket.name.replace(/[^a-zA-Z0-9]/g, '-')}`} className="inline-flex items-center text-blue-400 hover:text-blue-300 dark:text-orange-300 dark:hover:text-orange-200 transition-colors font-medium text-sm">
                     Learn More <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                   </Link>
                </div>
            </Card>
            </div>
          )}
        </section>

        {/* Explore Button Section */}
         <section className="text-center mb-12">
          <Link href="/explore" className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg">
             Explore All Features
          </Link>
         </section>
      </main>
    </div>
  );
}
