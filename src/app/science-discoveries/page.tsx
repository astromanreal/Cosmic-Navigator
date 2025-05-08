// src/app/science-discoveries/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, CalendarDays, RadioTower } from 'lucide-react'; 
import breakthroughData from './breakthroughData.json';
import timelineData from './timelineData.json';

interface Discovery {
  title: string;
  mission: string;
  year: number;
  description: string;
  image: string;
  source: string;
  aiHint?: string;
}

interface TimelineEvent {
  decade: string;
  events: {
    year: number;
    discovery: string;
    impact: string;
    icon?: string;
  }[];
}

const ScienceDiscoveriesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
           <div className="flex justify-center mb-6">
            <BookOpen className="w-16 h-16 text-cyan-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
            Space Science & Discoveries
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 max-w-3xl mx-auto">
            Explore pivotal breakthroughs, track the timeline of cosmic progress, and visualize the fundamental physics governing our universe.
          </p>
        </section>

        {/* Breakthrough Discoveries Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400">
            Rewriting the Universe: Key Discoveries from Space Missions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {breakthroughData.map((discovery: Discovery, index: number) => (
              <Link
                href={`/science-discoveries/${discovery.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}
                key={index}
                className="group perspective block h-full"
                style={{ perspective: '1000px' }}
              >
                <Card
                  className="
                    bg-gray-800/50 dark:bg-black/60 hover:bg-gray-700/70 dark:hover:bg-gray-900/70
                    border border-gray-700/50 dark:border-gray-800/60
                    shadow-xl hover:shadow-cyan-500/40
                    transition-all duration-500 ease-out
                    transform-style-3d
                    group-hover:scale-105 group-hover:-rotate-y-2 group-hover:-translate-z-2
                    relative overflow-hidden flex flex-col h-full
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
                  <CardHeader className="relative p-0">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={discovery.image || `https://picsum.photos/seed/${discovery.title.replace(/\s+/g, '-')}/400/225`}
                        alt={discovery.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={discovery.aiHint || 'space science discovery'}
                      />
                    </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 p-4 w-full">
                       <CardTitle className="text-lg font-bold text-white line-clamp-2 leading-tight">
                         {discovery.title}
                       </CardTitle>
                     </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2 mb-4">
                       <div className="flex items-center text-xs text-teal-300/90">
                          <RadioTower className="w-3.5 h-3.5 mr-1.5" />
                          <span>{discovery.mission}</span>
                          <span className="mx-1.5">·</span>
                          <CalendarDays className="w-3.5 h-3.5 mr-1" />
                          <span>{discovery.year}</span>
                       </div>
                      <p className="text-gray-300 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
                        {discovery.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500 dark:text-gray-600">Source: {discovery.source}</p>
                        <span className="inline-flex items-center text-cyan-300 group-hover:text-cyan-200 font-medium text-sm transition-colors">
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Timeline of Space Discoveries Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Decades of Discovery: Timeline of Cosmic Progress
          </h2>
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
            {timelineData.map((decadeData: TimelineEvent) => (
              <div key={decadeData.decade} className="pl-10 relative">
                <div className="absolute left-0 top-1 h-10 w-10 bg-indigo-700 rounded-full flex items-center justify-center text-sm font-semibold text-indigo-100 shadow-md">
                  {decadeData.decade}
                </div>
                <div className="ml-4 space-y-4">
                  {decadeData.events.map((event, idx) => (
                    <Card key={idx} className="bg-gray-800/70 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 p-4 rounded-lg shadow-md transition-transform hover:scale-[1.02]">
                      <p className="font-semibold text-teal-300 mb-1">{event.year}: {event.discovery}</p>
                      <p className="text-sm text-gray-300 dark:text-gray-400">{event.impact}</p>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScienceDiscoveriesPage;
