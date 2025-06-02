
import type { Metadata } from 'next';

const siteUrl = 'https://cosmic-navigator.vercel.app'; // Ensure this is your production URL

export const metadata: Metadata = {
  title: 'Space Careers & Education Hub | Cosmic Navigator',
  description: 'Launch your career in the space industry. Explore diverse career paths like astronaut, aerospace engineer, astrophysicist, find relevant courses, and discover opportunities with leading space organizations.',
  keywords: ['space careers, aerospace jobs, astronomy courses, astronaut training, space industry, STEM careers, space education, NASA careers, ESA jobs, SpaceX opportunities, astrophysics careers, citizen science space'],
  alternates: {
    canonical: `${siteUrl}/career`,
  },
  openGraph: {
    title: 'Space Careers & Education Hub | Cosmic Navigator',
    description: 'Your ultimate guide to careers and education in the space sector. Find job paths, courses, and opportunities.',
    url: `${siteUrl}/career`,
    siteName: 'Cosmic Navigator',
    images: [
      {
        url: `${siteUrl}/og-image-career.png`, // Create a specific OG image for this page
        width: 1200,
        height: 630,
        alt: 'Cosmic Navigator - Space Careers & Education Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Space Careers & Education Hub | Cosmic Navigator',
    description: 'Discover career paths, courses, and opportunities in the exciting field of space exploration.',
    images: [`${siteUrl}/twitter-image-career.png`], // Create a specific Twitter image
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
