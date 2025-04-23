'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    document.title = '404: Page Not Found';
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Image
        src="https://images.pexels.com/photos/2152/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Lost in Space"
        width={400}
        height={300}
        className="rounded-lg mb-4 shadow-md"
      />
      <h1 className="text-4xl font-bold mb-4">404 - Lost in Space</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Oops! It seems like you've wandered off into the unknown.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Go Back
        </button>
        <Link
          href="/"
          className="bg-blue-500 dark:bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}


