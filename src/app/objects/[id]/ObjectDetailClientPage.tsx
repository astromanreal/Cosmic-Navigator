
// src/app/objects/[id]/ObjectDetailClientPage.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, BrainCircuit, CheckCircle, FlaskConical, Info, Lightbulb, LinkIcon, Microscope, Sigma, Sparkles, Waves, Atom, Star, Rocket, ExternalLink, Target, ThumbsUp, Quote, Tags, BookMarked, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SpaceObject, CoreConcept, NotableExample, Resources } from './page'; // Import types from server component

// Category Icons
const categoryIcons: { [key: string]: LucideIcon } = {
  Astrophysics: Sparkles,
  Cosmology: BrainCircuit,
  Relativity: Waves,
  'Quantum Physics': Atom,
  'Theoretical Physics': Sigma,
  Astrobiology: Microscope,
  'Philosophy of Science': Lightbulb,
  Astronomy: Sparkles,
  default: Atom,
};

const difficultyColors: { [key: string]: string } = {
  Beginner: 'bg-green-500/20 text-green-300 border-green-500/50',
  Intermediate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
  Advanced: 'bg-red-500/20 text-red-300 border-red-500/50',
};

const statusIcons: { [key: string]: LucideIcon } = {
  Established: CheckCircle,
  Observed: CheckCircle,
  Theoretical: FlaskConical,
  Hypothetical: Lightbulb,
  Speculative: Lightbulb,
  default: Info,
};

interface ObjectDetailClientPageProps {
  spaceObject: SpaceObject;
  relatedObjectsData: SpaceObject[];
  objectId: string;
  siteUrl: string;
}

export default function ObjectDetailClientPage({ spaceObject, relatedObjectsData, objectId, siteUrl }: ObjectDetailClientPageProps) {
  const router = useRouter();

  if (!spaceObject) {
    return (
      <div className="container mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
        <Card className="dark:bg-gray-800 bg-white shadow-xl border dark:border-gray-700 w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-destructive dark:text-red-500">
              Object Not Found
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground dark:text-gray-400 mt-2">
              Sorry, the cosmic entity you're searching for seems to have drifted beyond our sensors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="mt-4" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Objects
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const CategoryIcon = categoryIcons[spaceObject.category] || categoryIcons.default;
  const StatusIcon = statusIcons[spaceObject.status || 'default'] || statusIcons.default;
  
  let objectImage = `https://placehold.co/1200x400.png?text=${encodeURIComponent(spaceObject.name)}`;
  if (spaceObject.image && spaceObject.image.startsWith('http')) {
    objectImage = spaceObject.image;
  } else if (spaceObject.image) {
    // Placeholder for local images in /public/images/objects/
    // objectImage = `/images/objects/${spaceObject.image}`; 
  }

  const pageUrl = `${siteUrl}/objects/${objectId}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": spaceObject.name,
    "name": spaceObject.name,
    "description": spaceObject.description,
    "keywords": spaceObject.keywords?.join(", ") || spaceObject.name,
    "image": objectImage.startsWith('http') ? objectImage : `${siteUrl}${objectImage.startsWith('/') ? objectImage : '/' + objectImage}`,
    "author": {
      "@type": "Organization",
      "name": "Cosmic Navigator Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cosmic Navigator",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/space-icon.png`
      }
    },
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
       "@type": "WebPage",
       "@id": pageUrl
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        key="object-article-jsonld"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="mb-12 text-center animate-fade-in">
            {spaceObject.image && (
              <div className="relative w-full max-w-3xl mx-auto h-64 md:h-80 rounded-lg overflow-hidden mb-6 shadow-2xl border-2 border-purple-500/30">
                <Image
                  src={objectImage}
                  alt={spaceObject.name}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-90"
                  data-ai-hint={spaceObject.aiHint || spaceObject.category.toLowerCase()}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10"></div>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4">
              {spaceObject.name}
            </h1>
            {spaceObject.quote && (
              <blockquote className="text-lg sm:text-xl text-purple-300/90 dark:text-purple-400/90 max-w-2xl mx-auto italic mb-6 font-mono flex items-center justify-center">
                <Quote className="w-6 h-6 mr-2 opacity-70 transform scale-x-[-1]" />
                {spaceObject.quote}
                <Quote className="w-6 h-6 ml-2 opacity-70" />
              </blockquote>
            )}
            <p className="text-md sm:text-lg text-gray-300 dark:text-gray-400 max-w-3xl mx-auto">
              {spaceObject.description}
            </p>
          </section>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <main className="lg:w-2/3 space-y-8">
              {/* Key Details Card */}
              <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                    <Info className="mr-2 h-6 w-6 text-cyan-400" />
                    Key Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-base">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="h-5 w-5 text-purple-400" />
                    <span className="font-medium text-gray-400">Category:</span>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/50 text-sm py-1 px-3">{spaceObject.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium text-gray-400">Difficulty:</span>
                    <Badge variant="outline" className={`${difficultyColors[spaceObject.difficulty] || 'border-gray-500/50'} text-sm py-1 px-3`}>{spaceObject.difficulty}</Badge>
                  </div>
                  {spaceObject.status && (
                    <div className="flex items-center gap-2">
                      <StatusIcon className="h-5 w-5 text-green-400" />
                      <span className="font-medium text-gray-400">Status:</span>
                      <Badge variant="outline" className={`${spaceObject.status === 'Established' || spaceObject.status === 'Observed' ? 'bg-green-500/20 text-green-300 border-green-500/50' : 'bg-orange-500/20 text-orange-300 border-orange-500/50'} text-sm py-1 px-3`}>{spaceObject.status}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Overview Content */}
              <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
                    <BookOpen className="mr-2 h-6 w-6 text-cyan-400" />
                    Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 dark:text-gray-200 leading-relaxed prose prose-invert prose-base max-w-none">
                  <p>{spaceObject.content || spaceObject.description}</p>
                </CardContent>
              </Card>

              {/* Keywords Section */}
              {spaceObject.keywords && spaceObject.keywords.length > 0 && (
                <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-100 flex items-center">
                      <Tags className="mr-2 h-5 w-5 text-cyan-400" />
                      Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {spaceObject.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-cyan-700/30 text-cyan-200 border-cyan-600/50">
                        {keyword}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Core Concepts Section */}
              {spaceObject.coreConcepts && spaceObject.coreConcepts.length > 0 && (
                <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-100 flex items-center">
                      <FlaskConical className="mr-2 h-5 w-5 text-cyan-400" />
                      Core Concepts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {spaceObject.coreConcepts.map((concept, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className="border-gray-700/70">
                          <AccordionTrigger className="text-md text-pink-300 hover:text-pink-200 focus:text-pink-200 [&[data-state=open]]:text-pink-200">
                            {concept.name}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-gray-300 dark:text-gray-400 prose prose-sm prose-invert max-w-none">
                            {concept.description}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )}

              {/* Notable Examples Section */}
              {spaceObject.notableExamples && spaceObject.notableExamples.length > 0 && (
                <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-100 flex items-center">
                      <Star className="mr-2 h-5 w-5 text-yellow-400" />
                      Notable Examples
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {spaceObject.notableExamples.map((example, index) => (
                      <Card key={index} className="bg-gray-700/50 dark:bg-black/50 p-4 rounded-md border border-gray-600/70">
                        <h4 className="text-md font-semibold text-yellow-300">{example.name}</h4>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">{example.type}</p>
                        {example.location && <p className="text-sm text-gray-300 mt-1"><strong>Location:</strong> {example.location}</p>}
                        {example.achievement && <p className="text-sm text-gray-300 mt-1"><strong>Key Achievement:</strong> {example.achievement}</p>}
                        {example.description && <p className="text-sm text-gray-300 mt-1">{example.description}</p>}
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Applications/Significance Section */}
              {spaceObject.applications && spaceObject.applications.length > 0 && (
                <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-100 flex items-center">
                      <Target className="mr-2 h-5 w-5 text-green-400" />
                      Significance & Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 dark:text-gray-200">
                      {spaceObject.applications.map((app, index) => (
                        <li key={index}>{app}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Resources / Further Reading Section */}
              {spaceObject.resources && Object.keys(spaceObject.resources).length > 0 && (
                <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-100 flex items-center">
                      <BookMarked className="mr-2 h-5 w-5 text-orange-400" />
                      Resources & Further Reading
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(spaceObject.resources).map(([key, value]) => {
                        if (!value) return null;
                        let label = "Learn More";
                        if (key === 'video') label = "Watch Video Explainer";
                        else if (key === 'nasa') label = `NASA: ${spaceObject.name}`;
                        else if (key === 'esa') label = `ESA: ${spaceObject.name}`;
                        else if (key === 'learnMore') label = `Learn More (Wikipedia)`;
                        
                        return (
                           <Button variant="link" asChild key={key} className="text-orange-300 hover:text-orange-200 p-0 justify-start h-auto">
                            <a href={value as string} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              <ExternalLink className="mr-2 h-4 w-4" /> {label}
                            </a>
                           </Button>
                        );
                    })}
                  </CardContent>
                </Card>
              )}
            </main>

            {/* Related Objects Sidebar */}
            {relatedObjectsData && relatedObjectsData.length > 0 && (
              <aside className="lg:w-1/3 space-y-6">
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-4">
                  Related Cosmic Wonders
                </h2>
                <div className="space-y-4">
                  {relatedObjectsData.map((relatedObj) => {
                    const RelatedIcon = categoryIcons[relatedObj.category] || categoryIcons.default;
                    return (
                    <Link
                      href={`/objects/${relatedObj.id}`}
                      key={relatedObj.id}
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
                          <CardTitle className="text-lg font-semibold text-pink-300 group-hover:text-pink-200 transition-colors">{relatedObj.name}</CardTitle>
                          <RelatedIcon className="h-5 w-5 text-pink-400/70 group-hover:text-pink-300 transition-colors" />
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                          <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 mb-2">{relatedObj.description}</p>
                          <Badge variant="outline" className={`${difficultyColors[relatedObj.difficulty] || 'border-gray-500/50'} text-xs mr-1`}>{relatedObj.difficulty}</Badge>
                          <Badge variant="secondary" className="bg-gray-600/50 text-gray-300 text-xs">{relatedObj.category}</Badge>
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
    </>
  );
}
