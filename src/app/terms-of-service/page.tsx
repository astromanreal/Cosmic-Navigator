// src/app/terms-of-service/page.tsx
'use client';

import { FileText, ArrowLeft, BookOpen, CopyrightIcon, Info, Users, Globe, ShieldCheck, AlertTriangle, Scale, Mail } from 'lucide-react'; // Added Mail icon here
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const TermsOfServicePage = () => {
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
              <FileText className="w-12 h-12 text-teal-400" />
            </div>
            <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              Terms of Service
            </CardTitle>
            <CardDescription className="text-gray-400 dark:text-gray-300 mt-1">
              Please read these terms carefully before using Cosmic Navigator.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 dark:text-gray-200 leading-relaxed">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400"><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><Info className="mr-2 h-5 w-5" />1. Acceptance of Terms</h2>
              <p>
                By accessing and using Cosmic Navigator (the "Site"), you accept and agree to be bound by the terms and provisions of this agreement. Your use of this Site signifies your understanding and acceptance of these Terms of Service. If you do not agree to abide by these terms, please do not use this Site.
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><BookOpen className="mr-2 h-5 w-5" />2. Educational Purpose & Scope of Service</h2>
              <p>
                Cosmic Navigator is an educational and informational platform dedicated to making space exploration, astronomy, and related sciences accessible and engaging for everyone. The content provided on this Site is for general informational and educational purposes only. While we strive for accuracy, the Site is provided "as is" and "as available" without any warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of the information.
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><Users className="mr-2 h-5 w-5" />3. User Conduct</h2>
              <p>
                You agree to use the Site only for lawful and educational purposes. You are prohibited from using the Site in any way that could damage, disable, overburden, or impair the Site or interfere with any other party's use and enjoyment of the Site. Prohibited behavior includes, but is not limited to, transmitting any material that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><CopyrightIcon className="mr-2 h-5 w-5" />4. Intellectual Property & Content Usage</h2>
              <p>
                The Site and its original content (text, graphics, logos, layout), features, and functionality are owned by Cosmic Navigator or its licensors and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                Much of the educational content, including images, data, and information regarding space missions, celestial bodies, and scientific discoveries, may originate from public domain sources or be provided by space agencies such as NASA, ESA, JAXA, ISRO, CNSA, Roscosmos, and other research institutions. Such content is used on this Site for educational and informational purposes. Copyright for these materials, where applicable, remains with the original owners (e.g., NASA, ESA, specific researchers or institutions). We make an effort to attribute content to its source where appropriate and possible. If you believe any content on this Site infringes upon your copyright, please contact us.
              </p>
              <p>
                You may use the content on Cosmic Navigator for personal, non-commercial, educational purposes, provided that you maintain all copyright and other proprietary notices.
              </p>
            </section>

             <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><ShieldCheck className="mr-2 h-5 w-5" />5. Accuracy of Information & Disclaimer</h2>
              <p>
               While Cosmic Navigator strives to provide accurate, up-to-date, and engaging educational information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Space science is a constantly evolving field, and new discoveries may alter previous understandings. Any reliance you place on such information is therefore strictly at your own risk. The content is not intended to be a substitute for professional scientific advice.
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><Globe className="mr-2 h-5 w-5" />6. Links to Other Websites</h2>
              <p>
                Our Site may contain links to third-party websites or services (e.g., official space agency sites, research papers, educational resources) that are not owned or controlled by Cosmic Navigator. We provide these links for further exploration and educational enrichment. Cosmic Navigator has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><AlertTriangle className="mr-2 h-5 w-5" />7. Limitation of Liability</h2>
              <p>
                In no event shall Cosmic Navigator, nor its creators or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Site. The information is provided for educational purposes, and users should verify critical information from primary sources.
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><Scale className="mr-2 h-5 w-5" />8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will endeavor to provide notice of material changes. By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="my-6 p-4 bg-gray-700/30 dark:bg-black/40 rounded-lg border border-gray-600/50 dark:border-gray-700/60">
              <h2 className="flex items-center text-xl font-semibold text-teal-300 mt-0 mb-3"><Mail className="mr-2 h-5 w-5" />9. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us via the methods provided on our <Link href="/contact" className="text-orange-400 hover:underline">Contact page</Link>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
