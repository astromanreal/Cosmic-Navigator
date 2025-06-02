
// src/app/objects/[id]/page.tsx
// This is a SERVER COMPONENT

import type { Metadata } from 'next';
import objectData from '../objectData.json';
import type { LucideIcon } from 'lucide-react'; 
import ObjectDetailClientPage from './ObjectDetailClientPage';
import { notFound } from 'next/navigation';

// Interface definitions
export interface CoreConcept { name: string; description: string; }
export interface NotableExample { name: string; type: string; location?: string; achievement?: string; description?: string; }
export interface Resources { learnMore?: string; video?: string; nasa?: string; esa?: string; [key: string]: string | undefined; }

export interface SpaceObject {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  quote?: string;
  keywords?: string[];
  coreConcepts?: CoreConcept[];
  notableExamples?: NotableExample[];
  applications?: string[];
  resources?: Resources;
  content?: string;
  status?: string;
  relatedTopics?: string[];
  articles?: { title: string; description: string; }[];
  image?: string;
  aiHint?: string;
}

const siteUrl = 'https://cosmic-navigator.vercel.app';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const objectId = params.id;
  const spaceObject = objectData.find(
    (item): item is SpaceObject => item.id === objectId
  );

  if (!spaceObject) {
    return {
      title: 'Object Not Found - Cosmic Navigator',
      description: 'Detailed information for the requested cosmic object could not be found.',
    };
  }

  const title = `${spaceObject.name} - ${spaceObject.category} | Cosmic Navigator`;
  const description = spaceObject.description || `Learn about ${spaceObject.name}, a fascinating object in the category of ${spaceObject.category}. Discover its core concepts, notable examples, and significance.`;
  
  let imageUrl = `${siteUrl}/og-image.png`; 
  if (spaceObject.image) {
    if (spaceObject.image.startsWith('http')) {
        imageUrl = spaceObject.image;
    } else {
        imageUrl = `https://placehold.co/1200x630.png?text=${encodeURIComponent(spaceObject.name)}`;
    }
  } else {
    imageUrl = `https://placehold.co/1200x630.png?text=${encodeURIComponent(spaceObject.name)}`;
  }
  
  const pageUrl = `${siteUrl}/objects/${objectId}`;
  const keywordsList = [
    spaceObject.name,
    spaceObject.category,
    'Cosmic Navigator',
    'space exploration',
    'astronomy',
    ...(spaceObject.keywords || [])
  ];

  return {
    title,
    description,
    keywords: keywordsList,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Cosmic Navigator',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: spaceObject.name,
        },
      ],
      locale: 'en_US',
      type: 'article', 
      section: spaceObject.category,
      tags: spaceObject.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ObjectDetailPageServer({ params }: { params: { id: string } }) {
  const objectId = params.id;
  const spaceObject = objectData.find(
    (item): item is SpaceObject => item.id === objectId
  );

  if (!spaceObject) {
    notFound();
  }

  const relatedObjectsData = objectData.filter(
    (related) =>
      spaceObject.relatedTopics?.includes(related.id) && related.id !== spaceObject.id
  ) as SpaceObject[];

  return (
    <ObjectDetailClientPage
      spaceObject={spaceObject}
      relatedObjectsData={relatedObjectsData}
      objectId={objectId}
      siteUrl={siteUrl}
    />
  );
}
