import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter'; // Import SiteFooter

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cosmic Navigator',
  description: 'Explore humanity’s greatest achievements and future possibilities in space.',
  icons: ['/space-icon.png'], 
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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <SiteFooter /> {/* Add SiteFooter here */}
      </body>
    </html>
  );
}
