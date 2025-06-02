// src/app/privacy-policy/page.tsx
'use client';

import { Shield, ArrowLeft, Info, Database, Users, ExternalLinkIcon, Edit, MessageSquare, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
            <CardDescription className="text-gray-400 dark:text-gray-300 mt-1">
              Your privacy is important to us at Cosmic Navigator.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 dark:text-gray-200 leading-relaxed">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400"><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><Info className="mr-2 h-5 w-5" />1. Introduction</h2>
              <p>
                Welcome to Cosmic Navigator! We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Cosmic Navigator is primarily an educational and informational platform about space exploration. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><Database className="mr-2 h-5 w-5" />2. Information We Collect</h2>
              <p>
                Given that Cosmic Navigator serves primarily as an educational and content-based informational website, our collection of personal information is minimal. The types of information we may collect include:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>
                  <strong>Usage Data:</strong> We may automatically collect standard web log information, such as your browser type, Internet Protocol (IP) address, access times, pages viewed, and referring website addresses. This data is collected for analytical purposes to understand how our website is used and to improve its functionality and content. This data is typically aggregated and anonymized.
                </li>
                <li>
                  <strong>Cookies & Local Storage:</strong> We may use cookies and browser local storage to enhance your experience. For example, we use local storage to remember your preferred appearance settings (like theme and font size). You can control cookie settings through your browser.
                </li>
                <li>
                  <strong>Contact Information:</strong> If you choose to contact us directly (e.g., via email or a contact form), we will collect the information you provide, such as your name and email address, solely for the purpose of responding to your inquiry.
                </li>
              </ul>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><Users className="mr-2 h-5 w-5" />3. Use of Your Information</h2>
              <p>
                We use the information we collect in the following ways:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>To operate and maintain our Site, ensuring it functions correctly and provides a good user experience.</li>
                <li>To improve our website content, features, and offerings based on user engagement and feedback.</li>
                <li>To monitor and analyze usage patterns and trends to enhance your experience with the Site.</li>
                <li>To respond to your comments, questions, and requests if you contact us directly.</li>
                <li>To remember your preferences, such as theme settings, for a personalized experience.</li>
              </ul>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><Shield className="mr-2 h-5 w-5" />4. Disclosure of Your Information</h2>
              <p>
                We do not sell, trade, rent, or otherwise share your personal information with third parties for their marketing purposes. We may share anonymized and aggregated usage data with third-party analytics services to help us understand how our Site is used. We may also disclose your information if required by law or in response to valid requests by public authorities (e.g., a court or a government agency).
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><ShieldCheck className="mr-2 h-5 w-5" />5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties.
              </p>
            </section>
            
            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><ExternalLinkIcon className="mr-2 h-5 w-5" />6. Third-Party Websites & Content</h2>
              <p>
                The Site may contain links to third-party websites and applications of interest (e.g., space agencies, research institutions, educational resources). These links are provided for informational and educational purposes. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
              <p>
                Some content on Cosmic Navigator, such as images or data, may be sourced from third parties (e.g., NASA, ESA). While we strive to adhere to their usage policies, we are not responsible for the privacy practices of these original content providers.
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><Edit className="mr-2 h-5 w-5" />7. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><MessageSquare className="mr-2 h-5 w-5" />8. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, or if you have any concerns about how we handle your data, please contact us via the methods provided on our <Link href="/contact" className="text-orange-400 hover:underline">Contact page</Link>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
