// src/app/telescopes/[telescopeName]/page.tsx
// SERVER COMPONENT

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import activeTelescopesData from '@/app/telescopes/activeTelescopesData.json';
import futureTelescopesData from '@/app/telescopes/futureTelescopesData.json';
import TelescopeDetailClientPage from './TelescopeDetailClientPage';
import type { Telescope } from './TelescopeDetailClientPage';

const siteUrl = 'https://cosmic-navigator.vercel.app';

export async function generateMetadata({ params }: { params: { telescopeName: string } }): Promise<Metadata> {
  const slug = params.telescopeName;
  const allTelescopes: Telescope[] = [...activeTelescopesData, ...futureTelescopesData] as Telescope[];
  const telescope = allTelescopes.find(
    (t: Telescope) => t.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() === slug.toLowerCase()
  );

  if (!telescope) {
    return {
      title: 'Telescope Not Found - Cosmic Navigator',
      description: 'Detailed information for the requested telescope could not be found.',
    };
  }

  const title = `${telescope.name} - Telescope Details | Cosmic Navigator`;
  const description = `Discover details about the ${telescope.name}, including its owner (${telescope.owner}), primary targets (${telescope.target}), and scientific goals. ${telescope.goals.substring(0, 120)}...`;
  const pageUrl = `${siteUrl}/telescopes/${slug}`;
  
  // Use a placeholder image or a specific one if available in your telescope data
  const imageUrl = telescope.image || `https://placehold.co/1200x630.png?text=${encodeURIComponent(telescope.name)}`;

  return {
    title,
    description,
    keywords: [telescope.name, telescope.wavelength, telescope.target, telescope.owner, 'telescope', 'observatory', 'astronomy', 'space science', 'cosmic exploration'],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Cosmic Navigator',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: telescope.name }],
      type: 'article', // More specific type for a detail page
      section: 'Technology & Science', // Example category
      publishedTime: telescope.launch_date ? new Date(telescope.launch_date).toISOString() : new Date().toISOString(),
      modifiedTime: new Date().toISOString(), // Placeholder for last modified date
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function TelescopeDetailPageServer({ params }: { params: { telescopeName: string } }) {
  const telescopeNameSlug = params.telescopeName;
  const allTelescopes: Telescope[] = [...activeTelescopesData, ...futureTelescopesData] as Telescope[];
  
  const telescope = allTelescopes.find(
    (t: Telescope) => t.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() === telescopeNameSlug.toLowerCase()
  );

  if (!telescope) {
    notFound();
  }

  // Construct JSON-LD data on the server
  const pageUrl = `${siteUrl}/telescopes/${telescopeNameSlug}`;
  const imageUrl = telescope.image || `https://placehold.co/1200x630.png?text=${encodeURIComponent(telescope.name)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article", // Could also be TechArticle or Product based on how you view telescopes
    "headline": telescope.name,
    "name": telescope.name,
    "description": telescope.goals, // Or a more detailed description if available
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
    "datePublished": telescope.launch_date ? new Date(telescope.launch_date).toISOString() : new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
       "@type": "WebPage",
       "@id": pageUrl
    },
    // Add more specific properties if applicable, e.g., manufacturer, model
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        key="telescope-article-jsonld"
      />
      <TelescopeDetailClientPage telescope={telescope} />
    </>
  );
}
