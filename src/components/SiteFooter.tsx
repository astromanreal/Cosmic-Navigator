// src/components/SiteFooter.tsx
'use client';

import Link from 'next/link';
import { Shield, FileText, Copyright } from 'lucide-react';

const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800/30 dark:bg-black/40 text-gray-400 dark:text-gray-500 border-t border-gray-700/50 dark:border-gray-800/60 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-sm">
              <Copyright className="h-4 w-4" />
              <span>{currentYear} Cosmic Navigator. All rights reserved.</span>
            </div>
            <p className="text-xs mt-1">
              Exploring the universe, one discovery at a time.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="text-xs hover:text-teal-400 dark:hover:text-teal-300 transition-colors flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" /> Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs hover:text-teal-400 dark:hover:text-teal-300 transition-colors flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" /> Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
