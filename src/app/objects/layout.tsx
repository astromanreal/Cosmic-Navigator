import type { Metadata } from 'next';

const siteUrl = 'https://cosmic-navigator.vercel.app'; // Ensure this is your production URL

export const metadata: Metadata = {
  title: 'Explore Celestial Objects - Black Holes, Galaxies, Stars | Cosmic Navigator',
  description: 'Dive into the wonders of the cosmos. Discover detailed information about celestial objects like black holes, galaxies, stars, nebulae, and more. Your guide to understanding the universe.',
  keywords: ['celestial objects, astronomy, space, universe, black holes, galaxies, stars, nebulae, astrophysics, Cosmic Navigator, space objects, cosmology, deep sky objects'],
  alternates: {
    canonical: `${siteUrl}/objects`,
  },
  openGraph: {
    title: 'Explore Celestial Objects | Cosmic Navigator',
    description: 'Discover detailed information about celestial objects like black holes, galaxies, stars, and nebulae. Your ultimate guide to the wonders of the universe.',
    url: `${siteUrl}/objects`,
    siteName: 'Cosmic Navigator',
    images: [
      {
        url: `${siteUrl}/og-image-objects.png`, // Consider creating a specific OG image for this portal
        width: 1200,
        height: 630,
        alt: 'Cosmic Navigator - Celestial Objects Portal',
      },
    ],
    locale: 'en_US',
    type: 'website', // Using 'website' as it's a collection/portal page
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Celestial Objects | Cosmic Navigator',
    description: 'Discover detailed information about celestial objects like black holes, galaxies, stars, and nebulae.',
    images: [`${siteUrl}/twitter-image-objects.png`], // Consider creating a specific Twitter image
    // site: '@YourTwitterHandle', // Optional: Add your Twitter handle
  },
};

export default function ObjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
