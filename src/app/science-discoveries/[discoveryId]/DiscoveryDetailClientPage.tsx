// src/app/science-discoveries/[discoveryId]/DiscoveryDetailClientPage.tsx
'use client';

import React from 'react';
import { useRouter } // No longer need useParams here as discovery is passed as prop
from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, CheckCircle, ExternalLink, Info, Microscope, RadioTower, Users } from 'lucide-react'; 
// Removed Link import, as navigation back is handled by router.back()

// Interface Definition (if not already shared/imported)
export interface Discovery {
  title: string;
  mission: string;
  year: number;
  description: string;
  image: string; 
  source: string;
  aiHint?: string;
  longDescription?: string; 
  externalLink?: string; 
}

interface DiscoveryDetailClientPageProps {
  discovery: Discovery | undefined;
}

const DiscoveryDetailClientPage: React.FC<DiscoveryDetailClientPageProps> = ({ discovery }) => {
  const router = useRouter();

  if (!discovery) {
    // This case should ideally be handled by the server component's notFound()
    // but as a fallback:
    return (
      <div className="container mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
        <Card className="dark:bg-gray-800 bg-white shadow-xl border dark:border-gray-700 w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-destructive dark:text-red-500">
              Discovery Not Found
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground dark:text-gray-400 mt-2">
              Sorry, the cosmic breakthrough you're searching for is still a mystery to us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="mt-4" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-800 to-purple-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-8 text-teal-300 hover:text-teal-200 hover:bg-gray-700/50">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Discoveries
        </Button>

        {/* Hero Section */}
        <section className="mb-12 text-center animate-fade-in p-8 bg-gray-800/50 dark:bg-black/60 rounded-xl shadow-2xl border border-gray-700/50 dark:border-gray-800/60">
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6 shadow-lg">
            <Image
              src={discovery.image || `https://placehold.co/1200x400.png?text=${encodeURIComponent(discovery.title)}`}
              alt={discovery.title}
              layout="fill"
              objectFit="cover"
              className="opacity-90"
              data-ai-hint={discovery.aiHint || 'scientific discovery space'}
              priority
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mb-3">
            {discovery.title}
          </h1>
          <p className="text-md sm:text-lg text-cyan-200/80 dark:text-cyan-300/80 max-w-3xl mx-auto italic font-mono">
            A pivotal moment in our understanding of the cosmos.
          </p>
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Key Details */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-100 flex items-center">
                  <Info className="mr-2 h-5 w-5 text-teal-400" />
                  Key Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center">
                  <RadioTower className="mr-2 h-4 w-4 text-teal-400/80" />
                  <span className="font-medium text-gray-400">Mission/Instrument:</span>
                  <span className="ml-1.5 text-gray-200">{discovery.mission}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-teal-400/80" />
                  <span className="font-medium text-gray-400">Year of Discovery:</span>
                  <span className="ml-1.5 text-gray-200">{discovery.year}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-teal-400/80" />
                  <span className="font-medium text-gray-400">Primary Source/Agency:</span>
                  <span className="ml-1.5 text-gray-200">{discovery.source}</span>
                </div>
                 {discovery.externalLink && (
                  <div className="pt-2">
                     <a href={discovery.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors font-medium text-xs">
                      Official Source <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
             <Card className="bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-100 flex items-center">
                  <Microscope className="mr-2 h-5 w-5 text-teal-400" />
                  Impact & Significance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 dark:text-gray-200 leading-relaxed">
                  {discovery.description} 
                </p>
              </CardContent>
            </Card>
          </aside>

          {/* Right Column: Detailed Description */}
          <main className="lg:col-span-2">
            <Card className="bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                  <CheckCircle className="mr-2 h-6 w-6 text-teal-400" />
                  Detailed Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 dark:text-gray-200 leading-relaxed prose prose-invert prose-base max-w-none prose-p:text-gray-300 dark:prose-p:text-gray-200">
                <p>{discovery.longDescription || discovery.description}</p>
                <p className="mt-4 italic">
                  This discovery opened new avenues for research and significantly advanced our understanding of {discovery.title.toLowerCase().includes('mars') ? 'Martian geology and potential habitability' : discovery.title.toLowerCase().includes('exoplanet') ? 'planetary systems beyond our own' : discovery.title.toLowerCase().includes('gravitational') ? 'the fabric of spacetime and extreme cosmic events' : 'the early universe and its fundamental properties'}.
                </p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryDetailClientPage;
