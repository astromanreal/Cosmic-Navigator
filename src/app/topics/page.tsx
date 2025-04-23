'use client';

import Link from 'next/link';
import topicData from './topicData.json';

interface Topic {
  id: string;
  name: string;
  description: string;
}

const TopicsPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">Explore Cosmic Frontiers</h1>
        <p className="text-gray-500 mb-4 dark:text-gray-400">
          "The most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and true science." - Albert Einstein
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Delve into a variety of fascinating subjects that unravel the mysteries of the cosmos, from theoretical physics to the search for life beyond Earth.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">Explore Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicData.map((topic: Topic) => (
            <div key={topic.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{topic.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
                           <Link
                  href={`/topics/${topic.id}`}
                  className="inline-block mt-4 text-blue-500 hover:text-blue-700 dark:text-teal-300 dark:hover:text-teal-200"
                >
                  Know More...
                </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopicsPage;
