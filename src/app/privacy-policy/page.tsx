// src/app/privacy-policy/page.tsx
'use client';

import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-teal-300 hover:text-teal-200 hover:bg-gray-700/50">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <Card className="bg-gray-800/50 dark:bg-black/60 border border-gray-700/50 dark:border-gray-800/60 shadow-2xl">
          <CardHeader className="text-center border-b border-gray-700/30 dark:border-gray-800/40 pb-6">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-teal-400" />
            </div>
            <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 dark:text-gray-200 leading-relaxed">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">1. Introduction</h2>
            <p>
              Welcome to Cosmic Navigator! We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">2. Information We Collect</h2>
            <p>
              As Cosmic Navigator is primarily a content-based informational website, we collect minimal personal information. The information we may collect includes:
            </p>
            <ul>
              <li>
                <strong>Usage Data:</strong> We may automatically collect standard web log information, such as your browser type, access times, pages viewed, and your IP address. This data is used for analytical purposes to improve our website.
              </li>
              <li>
                <strong>Cookies:</strong> We may use cookies to enhance your experience. You can control cookie settings through your browser. Currently, cookies are primarily used for remembering your theme and appearance preferences.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">3. Use of Your Information</h2>
            <p>
              Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul>
              <li>Improve our website and offerings.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Respond to your comments, questions, and requests if you contact us directly.</li>
            </ul>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">4. Disclosure of Your Information</h2>
            <p>
              We do not sell, trade, rent, or otherwise share your personal information with third parties for their marketing purposes. We may share information we have collected about you in certain situations if required by law or to protect our rights.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
            
            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">6. Third-Party Websites</h2>
            <p>
              The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">7. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">8. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us via the methods provided on our <Link href="/contact" className="text-orange-400 hover:underline">Contact page</Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
