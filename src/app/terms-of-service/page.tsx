// src/app/terms-of-service/page.tsx
'use client';

import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          </CardHeader>
          <CardContent className="pt-6 prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 dark:text-gray-200 leading-relaxed">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Cosmic Navigator (the "Site"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Site's particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this Site will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this Site.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">2. Description of Service</h2>
            <p>
              Cosmic Navigator provides users with access to information and educational content related to space exploration, astronomy, and related sciences. The Site is provided "as is" and "as available" without any warranties of any kind, express or implied.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">3. User Conduct</h2>
            <p>
              You agree to use the Site only for lawful purposes. You are prohibited from posting on or transmitting through the Site any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, fraudulent, racially, ethnically, or otherwise objectionable, including, but not limited to, any material that encourages conduct that would constitute a criminal offense, give rise to civil liability, or otherwise violate any applicable local, state, national, or international law.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">4. Intellectual Property</h2>
            <p>
              The Site and its original content, features, and functionality are owned by Cosmic Navigator and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. Certain content, such as images and data from space agencies (e.g., NASA, ESA), is used under their respective usage guidelines and remains the property of those agencies.
            </p>

             <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">5. Accuracy of Information</h2>
            <p>
             While we strive to provide accurate and up-to-date information, Cosmic Navigator makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">6. Links to Other Websites</h2>
            <p>
              Our Site may contain links to third-party web sites or services that are not owned or controlled by Cosmic Navigator. Cosmic Navigator has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Cosmic Navigator shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">7. Limitation of Liability</h2>
            <p>
              In no event shall Cosmic Navigator, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Site; (ii) any conduct or content of any third party on the Site; (iii) any content obtained from the Site; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="text-xl font-semibold text-teal-300 mt-6 mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us via the methods provided on our <Link href="/contact" className="text-orange-400 hover:underline">Contact page</Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
