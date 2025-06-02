
'use client';

import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import spaceEncyclopediaData from './space-encyclopedia-data.json';
import { BookOpen, ArrowRight } from 'lucide-react'; // Added icons

interface EncyclopediaEntry {
  title: string;
  type: string;
  summary: string;
  image: string; 
  related: string[];
  glossary: string[];
}

const SpaceEncyclopedia = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 mb-6">
            Space Encyclopedia (A-Z)
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-6 max-w-3xl mx-auto font-mono">
            "The universe is a vast and complex place, full of wonders and mysteries." - Anonymous Astronomer
          </p>
          <p className="text-base text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Navigate through an organized compendium of cosmic knowledge. Explore space science topics, missions, celestial bodies, and fundamental concepts from A to Z.
          </p>
        </section>

        {/* A-Z Index */}
        <section className="sticky top-16 md:top-20 bg-gray-900/80 dark:bg-black/70 backdrop-blur-sm py-4 z-40 mb-10 rounded-lg shadow-md">
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 px-2">
            {alphabet.map((letter) => (
              <Link
                key={letter}
                href={`#${letter}`}
                className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-md text-sm font-medium bg-gray-700/50 text-gray-300 hover:bg-purple-600/70 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-110"
              >
                {letter}
              </Link>
            ))}
          </div>
        </section>

        {/* Encyclopedia Entries */}
        <section>
          {alphabet.map((letter) => {
            const entriesForLetter = spaceEncyclopediaData.filter(entry => entry.title.toUpperCase().startsWith(letter));
            if (entriesForLetter.length === 0) {
              return null; // Don't render section if no entries for this letter
            }
            return (
              <div key={letter} id={letter} className="mb-12 scroll-mt-32 md:scroll-mt-36"> {/* Adjusted scroll-mt for better visibility */}
                <h2 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 border-b-2 border-purple-500/30 pb-2">
                  {letter}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {entriesForLetter.map((entry) => (
                     <Card key={entry.title} className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden flex flex-col">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-bold text-gray-100">{entry.title}</CardTitle>
                        <CardDescription className="text-sm text-purple-300">{entry.type}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-gray-300 dark:text-gray-400 text-sm mb-4 line-clamp-4">
                          {entry.summary}
                        </p>
                        {/* Placeholder for image if available */}
                        {/* {entry.image && (
                          <div className="aspect-video relative overflow-hidden rounded-md mb-3">
                            <Image src={`/images/encyclopedia/${entry.image}`} alt={entry.title} layout="fill" objectFit="cover" />
                          </div>
                        )} */}
                      </CardContent>
                       <div className="p-4 pt-0 mt-auto">
                         {/* Placeholder for "Read More" or related links if entry detail pages are implemented */}
                         {/* <Link href={`/space-encyclopedia/${entry.title.toLowerCase().replace(/\s+/g, '-')}`} passHref>
                           <Button variant="link" size="sm" className="text-purple-300 hover:text-purple-200 p-0 h-auto">
                             Read More <ArrowRight className="ml-1 h-4 w-4" />
                           </Button>
                         </Link> */}
                       </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default SpaceEncyclopedia;
