// src/app/programmes/layout.tsx
import type { Metadata } from 'next';

const siteUrl = 'https://cosmic-navigator.vercel.app'; // Ensure this is your production URL

export const metadata: Metadata = {
  title: 'Groundbreaking Space Programmes - From Apollo to Artemis | Cosmic Navigator',
  description: 'Explore the history and achievements of major space programmes like Apollo, Vostok, Space Shuttle, Artemis, and more. Discover humanity\'s milestones in space exploration.',
  keywords: ['space programmes, space exploration history, Apollo program, Artemis program, NASA missions, ISRO missions, ESA missions, Roscosmos, CNSA, space race, human spaceflight, space history'],
  alternates: {
    canonical: `${siteUrl}/programmes`,
  },
  openGraph: {
    title: 'Groundbreaking Space Programmes | Cosmic Navigator',
    description: 'Discover the pivotal space programmes that have shaped our journey to the stars, from early endeavors to modern missions.',
    url: `${siteUrl}/programmes`,
    siteName: 'Cosmic Navigator',
    images: [
      {
        url: `${siteUrl}/og-image-programmes.png`, // Consider creating a specific OG image for this portal
        width: 1200,
        height: 630,
        alt: 'Cosmic Navigator - Space Programmes Portal',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Groundbreaking Space Programmes | Cosmic Navigator',
    description: 'Explore humanity\'s major space exploration programmes and their historic achievements.',
    images: [`${siteUrl}/twitter-image-programmes.png`], // Consider creating a specific Twitter image
  },
};

export default function ProgrammesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
