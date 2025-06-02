'use server';
/**
 * @fileOverview AI flow for generating a summary of the Big Bang theory and cosmology.
 *
 * - generateBigBangSummary - A function that generates a summary about the Big Bang.
 * - GenerateBigBangSummaryOutput - The return type for the generateBigBangSummary function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateBigBangSummaryOutputSchema = z.object({
  summary: z.string().describe('A comprehensive yet accessible summary of the Big Bang theory, its evidence, and key cosmological concepts related to the origin and evolution of the universe.'),
});
export type GenerateBigBangSummaryOutput = z.infer<
  typeof GenerateBigBangSummaryOutputSchema
>;

export async function generateBigBangSummary(): Promise<GenerateBigBangSummaryOutput> {
  return generateBigBangSummaryFlow();
}

const generateBigBangSummaryPrompt = ai.definePrompt({
  name: 'generateBigBangSummaryPrompt',
  output: {
    schema: GenerateBigBangSummaryOutputSchema,
  },
  prompt: `You are an expert cosmologist and science communicator. 
  Generate a concise yet comprehensive summary (around 200-300 words) explaining the Big Bang theory. 
  
  The summary should cover:
  1.  The fundamental concept of the Big Bang: the universe's expansion from an extremely hot, dense state.
  2.  Key evidence supporting the theory (e.g., cosmic microwave background radiation, redshift of galaxies, abundance of light elements).
  3.  Briefly touch upon what the theory describes about the universe's origin and its subsequent evolution (e.g., formation of atoms, stars, and galaxies).
  4.  Mention that it's the leading cosmological model but also acknowledge areas of ongoing research or limitations (e.g., what happened at the very instant of the Big Bang).

  Aim for clarity and accessibility for a general audience interested in space and cosmology.
  Avoid overly technical jargon where possible, or briefly explain it.
  The tone should be informative and engaging.`,
});

const generateBigBangSummaryFlow = ai.defineFlow(
  {
    name: 'generateBigBangSummaryFlow',
    outputSchema: GenerateBigBangSummaryOutputSchema,
  },
  async () => {
    const {output} = await generateBigBangSummaryPrompt();
    return output!;
  }
);
