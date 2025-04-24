'use client';

import Link from 'next/link';
import {Home as HomeIcon} from 'lucide-react';
import {Sun, Moon, Globe, BookOpen, Atom, Rocket, Telescope, Compass} from 'lucide-react';
import featureData from './featureData.json';

interface FeatureItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType;
}

const ExplorePage = () => {
  const featureIcons: {[key: string]: React.ComponentType} = {
    Rocket,
    Telescope,
    Compass,
    Globe,
    Atom,
    BookOpen,
    Sun,
    Moon,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="p-6 max-w-4xl mx-auto">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Explore Cosmic Navigator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Discover humanity's greatest achievements and future possibilities in space.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureData.map((feature, index) => (
            <FeatureCard key={index} {...feature} featureIcons={featureIcons} />
          ))}
        </div>
      </main>
    </div>
  );
};

interface FeatureCardProps extends FeatureItem {
  featureIcons: {[key: string]: React.ComponentType};
}

function FeatureCard({title, description, href, icon, featureIcons}: FeatureCardProps) {
  const IconComponent = featureIcons[icon as keyof typeof featureIcons] || HomeIcon;
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition-transform transform hover:scale-105">
      <div className="mb-3">
        <IconComponent className="h-6 w-6 text-blue-500 dark:text-teal-300"/>
      </div>
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

export default ExplorePage;
