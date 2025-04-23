'use client';

import Link from 'next/link';
import React from 'react';

interface SubpageLinkProps {
  id: string;
  name: string;
}

const SubpageLink: React.FC<SubpageLinkProps> = ({id, name}) => {
  return (
    <Link
      href={`/earth/${id}`}
      className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Learn more about {name.toLowerCase()}...
      </p>
    </Link>
  );
};

export default SubpageLink;
