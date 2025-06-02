// src/app/solar-system/[id]/page.tsx
// THIS IS NOW A SERVER COMPONENT

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import solarSystemDataJson from '../solarSystemData.json';
import solarSystemMissionsDataJson from '../solarSystemMissions.json';

// Import the new client component
import SolarSystemDetailClientPage from './SolarSystemDetailClientPage';
import type { SolarBody, Mission } from './SolarSystemDetailClientPage'; // Import types from client component

const siteUrl = 'https://cosmic-navigator.vercel.app';

interface SolarSystemData {
  solarSystemObjects: SolarBody[];
}

interface SolarSystemMissionsFile { // Renamed to avoid conflict with Mission type
  target: string;
  missions: Mission[];
}

// Type assertion for loaded JSON data
const solarSystemData: SolarSystemData = solarSystemDataJson as SolarSystemData;
const solarSystemMissionsData: SolarSystemMissionsFile[] = solarSystemMissionsDataJson as SolarSystemMissionsFile[];


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const solarBodyId = params.id;
  const solarBody = solarSystemData.solarSystemObjects.find(
    (body) => body.id === solarBodyId
  );

  if (!solarBody) {
    return {
      title: 'Celestial Object Not Found - Cosmic Navigator',
      description: 'Information for the requested solar system object could not be found.',
    };
  }

  const title = `${solarBody.name} - ${solarBody.type} | Solar System | Cosmic Navigator`;
  const description = `Explore ${solarBody.name}, a ${solarBody.type} in our solar system. Learn about its features, characteristics, and relevant space missions. ${solarBody.tagline?.substring(0,100)}...`;
  const pageUrl = `${siteUrl}/solar-system/${solarBodyId}`;
  const imageUrl = solarBody.image || `${siteUrl}/og-solar-system-placeholder.png`;

  return {
    title,
    description,
    keywords: [solarBody.name, solarBody.type, solarBody.category, 'solar system', 'astronomy', 'space exploration', 'planets', 'moons', 'stars', 'Cosmic Navigator'],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: solarBody.name }],
      type: 'article',
    },
    twitter: {
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Server Component: Page
export default async function SolarSystemObjectPage({ params }: { params: { id: string } }) {
  const solarBodyId = params.id;

  const solarBody = solarSystemData.solarSystemObjects.find(
    (body) => body.id === solarBodyId
  );

  if (!solarBody) {
    notFound();
  }

  const relevantMissions = solarSystemMissionsData.find(
    (item) => item.target.toLowerCase().replace(/\s+/g, '-') === solarBodyId
  )?.missions;

  const relatedBodiesData = solarSystemData.solarSystemObjects.filter(
    (related) =>
      solarBody.relatedSolarSystemBodies?.includes(related.id) && related.id !== solarBody.id
  );

  const pageUrl = `${siteUrl}/solar-system/${solarBody.id}`;
  const imageUrl = solarBody.image || `${siteUrl}/og-solar-system-placeholder.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": solarBody.name,
    "name": solarBody.name,
    "description": solarBody.description,
    "image": imageUrl,
    "author": { "@type": "Organization", "name": "Cosmic Navigator Team" },
    "publisher": { "@type": "Organization", "name": "Cosmic Navigator", "logo": { "@type": "ImageObject", "url": `${siteUrl}/space-icon.png` }},
    "dateModified": new Date().toISOString(), // Generated on the server, consistent for initial render
    "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        key="solarbody-article-jsonld-server"
      />
      <SolarSystemDetailClientPage
        solarBody={solarBody}
        relevantMissions={relevantMissions}
        relatedBodiesData={relatedBodiesData}
        siteUrl={siteUrl}
        solarBodyId={solarBodyId}
      />
    </>
  );
}
