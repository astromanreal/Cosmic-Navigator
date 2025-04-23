'use client';

import { Home as HomeIcon, Rocket, Telescope, Compass, Atom } from 'lucide-react';
import Link from 'next/link';
import { Sun, Moon, Globe, Cloud, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex items-center justify-between p-4 bg-white shadow dark:bg-gray-800">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-teal-300 flex items-center gap-2">
          <HomeIcon className="w-6 h-6" />
          Cosmic Navigator
        </Link>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Welcome to Cosmic Navigator</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Explore humanity's greatest achievements and future possibilities in space.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Rocket className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />}
            title="Rockets"
            description="Discover the launch vehicles that make space exploration possible. Explore detailed data on each rocket."
            href="/rockets"
          />
          <FeatureCard
            icon={<Telescope className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />}
            title="Telescopes"
            description="Uncover the tools that let us see deep into the cosmos. Learn about Earth-based and space telescopes."
            href="/telescopes"
          />
          <FeatureCard
            icon={<Compass className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />}
            title="Missions"
            description="Track the journeys of spacecraft across our solar system—and beyond. Browse all major missions."
            href="/missions"
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />}
            title="Solar System"
            description="Journey through our solar system, from the fiery Sun to the icy reaches of the Kuiper Belt."
            href="/solar-system"
          />
           <FeatureCard
            icon={<Globe className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />}
            title="Earth"
            description="Discover the beauty and complexity of our planet, its diverse ecosystems, and its place in the cosmos."
            href="/earth"
          />
           <FeatureCard
            icon={<Compass className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />}
            title="Space Agencies"
            description="Learn about the pioneering space agencies that are driving humanity's exploration of the universe."
            href="/space-agencies"
          />
            <FeatureCard
            icon={<Atom className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />}
            title="Objects"
            description="Discover the groundbreaking programmes that have shaped our understanding of space and pushed the boundaries of human achievement."
            href="/objects"
          />
           <FeatureCard
            icon={<Compass className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />}
            title="Programmes"
            description="Discover the groundbreaking programmes that have shaped our understanding of space and pushed the boundaries of human achievement."
            href="/programmes"
          />
           <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />}
            title="Topics"
            description="Discover the groundbreaking programmes that have shaped our understanding of space and pushed the boundaries of human achievement."
            href="/topics"
          />

        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description, href }: { icon?: React.ReactNode; title: string; description: string; href?: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition-transform transform hover:scale-105">
      {icon && <div className="mb-3">{icon}</div>}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      {href && (
        <Link href={href} className="inline-block mt-4 text-blue-500 hover:text-blue-700 dark:text-teal-300 dark:hover:text-teal-200">
          Know More...
        </Link>
      )}
    </div>
  );
}
