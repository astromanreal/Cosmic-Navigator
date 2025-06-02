
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = 'https://cosmic-navigator.vercel.app'; // Define base URL

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Recommended for resolving relative Open Graph image URLs
  title: {
    default: 'Cosmic Navigator - Explore the Universe',
    template: '%s | Cosmic Navigator',
  },
  description: 'Cosmic Navigator is your ultimate gateway to the universe. Explore powerful rockets, legendary telescopes, groundbreaking missions, celestial objects, and fascinating astronomical topics.',
  keywords: ['space exploration, universe, astronomy, cosmology, rockets, telescopes, space missions, planets, stars, galaxies, astrophysics, learn space, Cosmic Navigator,宇宙'],
  authors: [{ name: 'Cosmic Navigator Team', url: siteUrl }],
  creator: 'Cosmic Navigator Team',
  publisher: 'Cosmic Navigator',
  openGraph: {
    title: {
        default: 'Cosmic Navigator - Explore the Universe',
        template: '%s | Cosmic Navigator',
    },
    description: 'Your ultimate gateway to the universe. Explore rockets, telescopes, missions, and more.',
    url: siteUrl,
    siteName: 'Cosmic Navigator',
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Cosmic Navigator - Explore the Universe',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
        default: 'Cosmic Navigator - Explore the Universe',
        template: '%s | Cosmic Navigator',
    },
    description: 'Your ultimate gateway to the universe. Explore rockets, telescopes, missions, and more.',
    images: [`${siteUrl}/twitter-image.png`], // Replace with your actual Twitter image URL
    // site: '@YourTwitterHandle', // Optional: Add your Twitter handle
    // creator: '@YourTwitterHandle', // Optional: Add creator's Twitter handle
  },
  icons: {
    icon: '/space-icon.png', // Ensure this icon exists in your public folder
    shortcut: '/space-icon.png',
    apple: '/space-icon.png',
  },
  manifest: '/site.webmanifest', // Ensure this file exists in your public folder
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    // languages: {
    //   'en-US': `${siteUrl}/en-US`,
    // },
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Cosmic Navigator",
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/?search={search_term_string}` // Points to homepage search
    },
    "query-input": "required name=search_term_string"
  },
  "description": "Cosmic Navigator is your ultimate gateway to the universe. Explore powerful rockets, legendary telescopes, groundbreaking missions, celestial objects, and fascinating astronomical topics.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="mac7aLjz9hgBPOeatEJp8fZ6RL2GRi8PeWQfgcITzFU" />
        {/* Structured data for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
