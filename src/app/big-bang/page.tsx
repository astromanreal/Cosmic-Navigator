// src/app/big-bang/page.tsx
import { generateBigBangSummary, GenerateBigBangSummaryOutput } from '@/ai/flows/generate-big-bang-summary';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';

// Make this a server component to fetch data
export default async function BigBangPage() {
  let summaryData: GenerateBigBangSummaryOutput | null = null;
  let error: string | null = null;

  try {
    summaryData = await generateBigBangSummary();
  } catch (e) {
    console.error("Failed to generate Big Bang summary:", e);
    error = "Failed to load summary. Please try again later.";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-gray-100 py-12">
      <div className="container mx-auto py-10 px-4">
        <section className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 mb-4">
            The Big Bang & Cosmology
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 italic mb-6 max-w-3xl mx-auto font-mono">
            "The most incomprehensible thing about the world is that it is comprehensible." - Albert Einstein
          </p>
          <p className="text-base text-gray-400 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the origins of our universe, from its explosive beginning to its ongoing evolution, and delve into the fundamental laws that govern the cosmos.
          </p>
        </section>

        <Card className="mb-12 bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-100 flex items-center">
              Understanding the Big Bang
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 dark:text-gray-200 leading-relaxed prose prose-invert prose-base max-w-none">
            {error && <p className="text-destructive dark:text-red-400">{error}</p>}
            {summaryData && <p>{summaryData.summary}</p>}
            {!summaryData && !error && <p>Loading summary...</p>}
          </CardContent>
        </Card>

        <section className="mb-8">
          <Card className="bg-gray-800/60 dark:bg-black/70 border border-gray-700/50 dark:border-gray-800/60 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-100">Missions Studying Cosmology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 dark:text-gray-300 mb-4">
                Several space missions have provided crucial data for understanding the Big Bang and the evolution of the universe:
              </p>
              <ul className="list-disc list-inside text-gray-300 dark:text-gray-200 space-y-1">
                <li><b>Cosmic Background Explorer (COBE):</b> Mapped the CMB, providing strong evidence for the Big Bang.</li>
                <li><b>Wilkinson Microwave Anisotropy Probe (WMAP):</b> Made more precise measurements of the CMB.</li>
                <li><b>Planck Satellite:</b> Provided the most detailed map of the CMB to date.</li>
                <li><b>Hubble Space Telescope (HST):</b> Observed distant galaxies, measuring the universe's expansion rate.</li>
                <li><b>James Webb Space Telescope (JWST):</b> Aims to see the first stars and galaxies forming after the Big Bang.</li>
                <li><b>Euclid:</b> Designed to map the geometry of the dark Universe.</li>
                <li><b>Chandra X-ray Observatory & XMM-Newton:</b> Study galaxy clusters and supermassive black holes, which are key to understanding cosmic structure.</li>
                <li><b>Fermi Gamma-ray Space Telescope:</b> Observes high-energy phenomena that can provide insights into extreme cosmic events and early universe physics.</li>
              </ul>
              <p className="text-gray-400 dark:text-gray-300 mt-4">
                Missions listed on other pages such as <Link href="/missions" className="text-teal-400 hover:underline">Missions</Link> and <Link href="/telescopes" className="text-teal-400 hover:underline">Telescopes</Link> may also contribute to cosmological studies.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
