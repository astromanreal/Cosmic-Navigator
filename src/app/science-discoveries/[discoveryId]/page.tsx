// src/app/science-discoveries/[discoveryId]/page.tsx
// SERVER COMPONENT

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import breakthroughData from '../breakthroughData.json';
import DiscoveryDetailClientPage from './DiscoveryDetailClientPage'; // Ensure this path is correct
import type { Discovery } from './DiscoveryDetailClientPage'; // Import type

const siteUrl = 'https://cosmic-navigator.vercel.app';

export async function generateMetadata({ params }: { params: { discoveryId: string } }): Promise<Metadata> {
  const slug = params.discoveryId;
  const discovery = breakthroughData.find(
    (item): item is Discovery => item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === slug
  );

  if (!discovery) {
    return {
      title: 'Discovery Not Found - Cosmic Navigator',
      description: 'Detailed information for the requested scientific discovery could not be found.',
    };
  }

  const title = `${discovery.title} - Science Discovery | Cosmic Navigator`;
  const description = discovery.longDescription?.substring(0, 160) || discovery.description.substring(0, 160) || `Learn about the significant scientific discovery: ${discovery.title}.`;
  const pageUrl = `${siteUrl}/science-discoveries/${slug}`;
  const imageUrl = discovery.image || `https://placehold.co/1200x630.png?text=${encodeURIComponent(discovery.title)}`;
  const keywordsList = [discovery.title, discovery.mission, discovery.source, 'science discovery', 'space breakthrough', 'astronomy', 'cosmology', 'Cosmic Navigator'];

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
      images: [{ url: imageUrl, width: 1200, height: 630, alt: discovery.title }],
      type: 'article',
      section: 'Science & Technology',
      publishedTime: discovery.year ? new Date(discovery.year, 0, 1).toISOString() : new Date().toISOString(), // Assuming year only, use Jan 1st
      modifiedTime: new Date().toISOString(),
      authors: [discovery.source || `${siteUrl}/about`], // Use source or a general about page
      tags: [discovery.mission, discovery.source, "Science"],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DiscoveryDetailPageServer({ params }: { params: { discoveryId: string } }) {
  const discoveryIdSlug = params.discoveryId;
  
  const discovery = breakthroughData.find(
    (item): item is Discovery => item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === discoveryIdSlug
  );

  if (!discovery) {
    notFound();
  }
  
  const pageUrl = `${siteUrl}/science-discoveries/${discoveryIdSlug}`;
  const imageUrl = discovery.image || `https://placehold.co/1200x630.png?text=${encodeURIComponent(discovery.title)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article", // or NewsArticle, TechArticle
    "headline": discovery.title,
    "name": discovery.title,
    "description": discovery.longDescription || discovery.description,
    "image": imageUrl,
    "author": {
      "@type": "Organization", // Or Person if applicable
      "name": discovery.source || "Cosmic Navigator Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cosmic Navigator",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/space-icon.png`
      }
    },
    "datePublished": discovery.year ? new Date(discovery.year, 0, 1).toISOString() : new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
       "@type": "WebPage",
       "@id": pageUrl
    },
    "keywords": [discovery.title, discovery.mission, discovery.source, "science discovery", "space breakthrough"].join(", ")
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        key="discovery-article-jsonld"
      />
      <DiscoveryDetailClientPage discovery={discovery} />
    </>
  );
}
