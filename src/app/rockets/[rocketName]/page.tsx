// src/app/rockets/[rocketName]/page.tsx
// THIS IS NOW A SERVER COMPONENT

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import rocketDataJson from '@/app/rockets/rocketData.json';
import RocketDetailClientPage from './RocketDetailClientPage'; // Import the new client component

interface Rocket {
  id: number;
  name: string;
  country: string;
  owner: string;
  type: string;
  status: string;
  launchYear: number;
  thrust: string;
  capacity: string;
  agencyType: string;
  successfulLaunches: number;
  description: string;
  wikiLink: string;
}

const siteUrl = 'https://cosmic-navigator.vercel.app';

// Dynamically generate metadata
export async function generateMetadata({ params }: { params: { rocketName: string } }): Promise<Metadata> {
  const slug = params.rocketName;
  const rocket = rocketDataJson.find(
    (r: Rocket) => r.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() === slug.toLowerCase()
  );

  if (!rocket) {
    return {
      title: 'Rocket Not Found - Cosmic Navigator',
      description: 'Detailed information for the requested rocket could not be found.',
    };
  }

  const title = `${rocket.name} - Rocket Details | Cosmic Navigator`;
  const description = `Discover details about the ${rocket.name} launch vehicle, including its country of origin (${rocket.country}), type (${rocket.type}), launch history, and capabilities. ${rocket.description.substring(0, 120)}...`;
  const pageUrl = `${siteUrl}/rockets/${slug}`;
  // Placeholder - Ideally, each rocket would have its own image URL or a consistent placeholder generation strategy
  const imageUrl = `https://placehold.co/1200x630.png?text=${encodeURIComponent(rocket.name)}`;


  return {
    title: title,
    description: description,
    keywords: [rocket.name, rocket.type, rocket.country, rocket.owner, 'rocket', 'launch vehicle', 'spacecraft specs', 'rocket history', 'space launch systems'],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: title,
      description: description,
      url: pageUrl,
      images: [{ url: imageUrl, width:1200, height:630, alt: `${rocket.name} rocket` }],
      type: 'article',
      publishedTime: `${rocket.launchYear}-01-01T00:00:00Z`,
      modifiedTime: new Date().toISOString(),
      authors: [`${siteUrl}/contact`], // Link to an about page or team page
    },
    twitter: {
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

// Server Component: Page
export default async function RocketPageServer({ params }: { params: { rocketName: string } }) {
  const rocketNameSlug = params.rocketName;

  const rocket: Rocket | undefined = rocketDataJson.find(
    (r: Rocket) => r.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() === rocketNameSlug.toLowerCase()
  );

  if (!rocket) {
    notFound();
  }
  
  const pageUrl = `${siteUrl}/rockets/${rocketNameSlug}`;
  const imageUrl = `https://placehold.co/1200x630.png?text=${encodeURIComponent(rocket.name)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": rocket.name,
    "description": rocket.description,
    "image": imageUrl, 
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
    "datePublished": `${rocket.launchYear}-01-01T00:00:00Z`,
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
        key="rocket-article-jsonld-server"
      />
      <RocketDetailClientPage rocket={rocket} />
    </>
  );
}
