
import type { Metadata } from 'next';

const siteUrl = 'https://cosmic-navigator.vercel.app'; // Ensure this is your production URL

export const metadata: Metadata = {
  title: 'Space Encyclopedia (A-Z) - Cosmic Terms & Concepts | Cosmic Navigator',
  description: 'Explore a comprehensive A-Z space encyclopedia. Find clear definitions and summaries for astronomy terms, celestial objects, space missions, and fundamental cosmic concepts on Cosmic Navigator.',
  keywords: [
    'space encyclopedia', 
    'astronomy dictionary', 
    'cosmology terms', 
    'space science A-Z', 
    'celestial objects glossary', 
    'space missions explained', 
    'astrophysics concepts', 
    'Cosmic Navigator',
    'learn space terms'
  ],
  alternates: {
    canonical: `${siteUrl}/space-encyclopedia`,
  },
  openGraph: {
    title: 'Space Encyclopedia (A-Z) | Cosmic Navigator',
    description: 'Your comprehensive A-Z guide to space terms, celestial bodies, missions, and cosmic concepts. Dive deep into the universe with Cosmic Navigator.',
    url: `${siteUrl}/space-encyclopedia`,
    siteName: 'Cosmic Navigator',
    images: [
      {
        url: `${siteUrl}/og-image-encyclopedia.png`, // Create a specific OG image for this portal
        width: 1200,
        height: 630,
        alt: 'Cosmic Navigator - Space Encyclopedia A-Z',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Space Encyclopedia (A-Z) | Cosmic Navigator',
    description: 'Explore a comprehensive A-Z of space knowledge. Definitions, summaries, and more.',
    images: [`${siteUrl}/twitter-image-encyclopedia.png`], // Create a specific Twitter image
  },
};

export default function SpaceEncyclopediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
