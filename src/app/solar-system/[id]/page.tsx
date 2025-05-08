
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import solarSystemData from '../solarSystemData.json';
import solarSystemMissionsData from '../solarSystemMissions.json';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Globe, Sun, Orbit, Sparkles, ArrowRight, ExternalLink, Info, Users, Thermometer, Sigma, CalendarDays, Clock, Satellite, Scale, Mountain, Telescope, BookOpen, Palette
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface SolarBody {
  id: string;
  name: string;
  tagline: string;
  description: string;
  type: string;
  category: string;
  diameter?: string;
  mass?: string;
  moons?: string;
  orbitalPeriod?: string;
  dayLength?: string;
  surfaceTemperature?: string;
  atmosphere?: string;
  notableFeatures?: string[];
  image?: string;
  articles?: { title: string; description: string }[];
  relatedSolarSystemBodies?: string[];
  location?: string;
  majorComponents?: string;
  estimatedObjects?: string;
  composition?: string;
  age?: string;
  examples?: string;
  aiHint?: string;
}

interface Mission {
  name: string;
  url: string;
  launchDate: string;
  owner: string;
  rocket: string;
  description?: string;
  status?: string;
}

interface SolarSystemMissions {
  target: string;
  missions: Mission[];
}

const categoryIcons: { [key: string]: LucideIcon } = {
  Star: Sun,
  Planet: Globe,
  Moon: Globe,
  Region: Orbit,
  'Dwarf Planet': Sparkles,
  'Small Bodies': Mountain,
  default: Orbit,
};

const DetailItem: React.FC<{label: string, value?: string | number | string[], Icon: LucideIcon}> = ({ label, value, Icon }) => {
  if (!value && value !== 0) return null; // Allow 0 for moons count
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-800/50 dark:bg-black/50 rounded-lg shadow-sm">
      <Icon className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs font-semibold text-teal-300 uppercase tracking-wider">{label}</p>
        {Array.isArray(value) ? (
          <ul className="list-disc list-inside text-sm text-gray-300 dark:text-gray-200 mt-1">
            {value.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        ) : (
          <p className="text-sm text-gray-200 dark:text-gray-100">{value.toString()}</p>
        )}
      </div>
    </div>
  );
};


const SolarSystemDetailPage = () => {
  const params = useParams();
  const solarBodyId = params.id as string;

  const solarBody: SolarBody | undefined = solarSystemData.solarSystemObjects.find(
    body => body.id === solarBodyId
  );

  const relevantMissions: Mission[] | undefined = solarSystemMissionsData.find(
    (item: SolarSystemMissions) => item.target.toLowerCase().replace(/\s+/g, '-') === solarBodyId
  )?.missions;

  if (!solarBody) {
    return (
      <div className="container mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
        <Card className="dark:bg-gray-800 bg-white shadow-xl border dark:border-gray-700 w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-destructive dark:text-red-500">
              Celestial Object Not Found
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground dark:text-gray-400 mt-2">
              Sorry, the celestial object you're searching for seems to have drifted beyond our sensors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/solar-system">
              <Button variant="outline" className="mt-4">
                Back to Solar System
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const CategoryIcon = categoryIcons[solarBody.category] || categoryIcons.default;

  const relatedBodiesData = solarSystemData.solarSystemObjects.filter(
    (related) =>
      solarBody.relatedSolarSystemBodies?.includes(related.id) && related.id !== solarBody.id
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-12 text-center animate-fade-in">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6">
            <Image
              src={solarBody.image || `https://picsum.photos/seed/${solarBody.id}/400/400`}
              alt={solarBody.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full shadow-2xl border-4 border-teal-500/50 animate-pulse"
              data-ai-hint={solarBody.aiHint || `${solarBody.name} ${solarBody.type}`}
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mb-3">
            {solarBody.name}
          </h1>
          <p className="text-lg sm:text-xl text-cyan-200/80 dark:text-cyan-300/80 max-w-3xl mx-auto italic font-mono">
            {solarBody.tagline}
          </p>
           <Badge variant="secondary" className="mt-4 bg-teal-500/20 text-teal-300 border-teal-500/50 text-sm py-1 px-3">
              {solarBody.type}
           </Badge>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <main className="lg:w-2/3 space-y-8">
            {/* Overview Content */}
            <Card className="bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                  <Info className="mr-2 h-6 w-6 text-cyan-400" />
                  About {solarBody.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 dark:text-gray-200 leading-relaxed prose prose-invert prose-base max-w-none">
                <p>{solarBody.description}</p>
              </CardContent>
            </Card>

            {/* Key Facts Section */}
             <Card className="bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                    <Sigma className="mr-2 h-6 w-6 text-cyan-400" />
                    Key Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailItem label="Diameter" value={solarBody.diameter} Icon={Orbit} />
                  <DetailItem label="Mass" value={solarBody.mass} Icon={Scale} />
                  {solarBody.moons !== undefined && <DetailItem label="Moons" value={solarBody.moons} Icon={Satellite} />}
                  <DetailItem label="Orbital Period" value={solarBody.orbitalPeriod} Icon={CalendarDays} />
                  <DetailItem label="Day Length" value={solarBody.dayLength} Icon={Clock} />
                  <DetailItem label="Surface Temperature" value={solarBody.surfaceTemperature} Icon={Thermometer} />
                  {solarBody.atmosphere && <DetailItem label="Atmosphere" value={solarBody.atmosphere} Icon={Globe} />}
                  {solarBody.composition && <DetailItem label="Composition" value={solarBody.composition} Icon={Palette} />}
                  {solarBody.age && <DetailItem label="Age" value={solarBody.age} Icon={CalendarDays} />}
                  {solarBody.location && <DetailItem label="Location" value={solarBody.location} Icon={Globe} />}
                  {solarBody.majorComponents && <DetailItem label="Major Components" value={solarBody.majorComponents} Icon={Info} />}
                  {solarBody.estimatedObjects && <DetailItem label="Estimated Objects" value={solarBody.estimatedObjects} Icon={Sigma} />}
                  {solarBody.examples && <DetailItem label="Examples" value={solarBody.examples} Icon={Sparkles} />}
                </CardContent>
            </Card>


            {solarBody.notableFeatures && solarBody.notableFeatures.length > 0 && (
              <Card className="bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                    <Sparkles className="mr-2 h-6 w-6 text-cyan-400" />
                    Notable Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 dark:text-gray-200">
                    {solarBody.notableFeatures.map((feature, index) => (
                      <li key={index} className="ml-4">{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Articles Section */}
            {solarBody.articles && solarBody.articles.length > 0 && (
              <Card className="bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                    <BookOpen className="mr-2 h-6 w-6 text-cyan-400" />
                    Learn More
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {solarBody.articles.map((article, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-700/40 dark:bg-black/50 border border-gray-600/50 dark:border-gray-700/60 hover:shadow-md transition-shadow hover:border-cyan-500/50">
                      <h3 className="text-lg font-semibold text-pink-400 mb-1">{article.title}</h3>
                      <p className="text-sm text-gray-300 dark:text-gray-400 line-clamp-3">{article.description}</p>
                       {/* Placeholder for actual article link */}
                       <Button variant="link" className="text-orange-400 hover:text-orange-300 p-0 mt-2 h-auto text-xs">Read full article (coming soon)</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}


            {/* Missions Section */}
            {relevantMissions && relevantMissions.length > 0 && (
              <Card className="bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                    <Telescope className="mr-2 h-6 w-6 text-cyan-400" />
                    Missions to {solarBody.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relevantMissions.map((mission) => (
                    <Card key={mission.name} className="bg-gray-700/40 dark:bg-black/50 border border-gray-600/50 dark:border-gray-700/60 shadow-md hover:shadow-lg hover:border-teal-500/50 transition-all duration-300 flex flex-col">
                      <CardHeader className="pb-3 pt-4">
                        <CardTitle className="text-lg font-semibold text-teal-300">{mission.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs text-gray-300 dark:text-gray-400 space-y-1.5 flex-grow">
                        {mission.description && <p className="line-clamp-3 mb-2">{mission.description}</p>}
                        <p><span className="font-medium text-gray-400">Owner:</span> {mission.owner}</p>
                        <p><span className="font-medium text-gray-400">Launch:</span> {mission.launchDate}</p>
                        <p><span className="font-medium text-gray-400">Rocket:</span> {mission.rocket}</p>
                        {mission.status && <p><span className="font-medium text-gray-400">Status:</span> <Badge variant="outline" className={`${mission.status.toLowerCase().includes('active') || mission.status.toLowerCase().includes('extended') ? 'border-green-500/70 text-green-300 bg-green-900/30' : 'border-gray-500/70 text-gray-300 bg-gray-800/30'} text-xs`}>{mission.status}</Badge></p>}
                      </CardContent>
                      <div className="p-4 pt-2 flex justify-end">
                        <Button asChild variant="link" size="sm" className="text-orange-400 hover:text-orange-300 p-0 h-auto text-xs">
                          <a href={mission.url} target="_blank" rel="noopener noreferrer">
                            Explore Mission <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}
          </main>

          {/* Related Solar System Bodies Sidebar */}
          {relatedBodiesData.length > 0 && (
            <aside className="lg:w-1/3 space-y-6">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-4">
                Explore Nearby
              </h2>
              <div className="space-y-4">
                {relatedBodiesData.map((relatedBody) => {
                  const RelatedIcon = categoryIcons[relatedBody.category] || categoryIcons.default;
                  return (
                  <Link
                    href={`/solar-system/${relatedBody.id}`}
                    key={relatedBody.id}
                    className="group perspective block"
                    style={{ perspective: '1000px' }}
                  >
                    <Card
                      className="
                        bg-gray-700/40 dark:bg-black/50 dark:hover:bg-gray-800/70
                        border border-gray-600/50 dark:border-gray-700/60
                        shadow-lg hover:shadow-pink-500/30
                        transition-all duration-300 transform-style-3d
                        group-hover:scale-105 group-hover:-rotate-y-1 group-hover:-translate-z-1
                        overflow-hidden
                      "
                    >
                       <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-pink-300 group-hover:text-pink-200 transition-colors">{relatedBody.name}</CardTitle>
                        <RelatedIcon className="h-5 w-5 text-pink-400/70 group-hover:text-pink-300 transition-colors" />
                      </CardHeader>
                      <CardContent className="px-4 pb-4">
                        <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 mb-2">{relatedBody.tagline}</p>
                        <Badge variant="secondary" className="bg-gray-600/50 text-gray-300 text-xs">{relatedBody.type}</Badge>
                         <div className="flex justify-end mt-2">
                            <span className="inline-flex items-center text-orange-400 group-hover:text-orange-300 text-xs font-medium">
                                Explore <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </span>
                         </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
                })}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarSystemDetailPage;
