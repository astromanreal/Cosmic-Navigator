// src/ai/flows/generate-telescope-summary.ts
'use server';
/**
 * @fileOverview Generates a summary of a telescope's details.
 *
 * - generateTelescopeSummary - A function that generates a summary of a telescope.
 * - GenerateTelescopeSummaryInput - The input type for the generateTelescopeSummary function.
 * - GenerateTelescopeSummaryOutput - The return type for the generateTelescopeSummary function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getTelescope, Telescope} from '@/services/telescope';

const GenerateTelescopeSummaryInputSchema = z.object({
  telescopeName: z.string().describe('The name of the telescope to summarize.'),
});
export type GenerateTelescopeSummaryInput = z.infer<
  typeof GenerateTelescopeSummaryInputSchema
>;

const GenerateTelescopeSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the telescope details.'),
});
export type GenerateTelescopeSummaryOutput = z.infer<
  typeof GenerateTelescopeSummaryOutputSchema
>;

export async function generateTelescopeSummary(
  input: GenerateTelescopeSummaryInput
): Promise<GenerateTelescopeSummaryOutput> {
  return generateTelescopeSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTelescopeSummaryPrompt',
  input: {
    schema: z.object({
      telescopeName: z.string().describe('The name of the telescope.'),
      telescopeDetails: z
        .string()
        .describe('Details about the telescope including its technologies, data captured, and future upgrades.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of the telescope details.'),
    }),
  },
  prompt: `You are an expert in space exploration and telescopes.  Generate a concise summary about the {{{telescopeName}}} telescope, using the following details:

{{{telescopeDetails}}}`,
});

const generateTelescopeSummaryFlow = ai.defineFlow<
  typeof GenerateTelescopeSummaryInputSchema,
  typeof GenerateTelescopeSummaryOutputSchema
>(
  {
    name: 'generateTelescopeSummaryFlow',
    inputSchema: GenerateTelescopeSummaryInputSchema,
    outputSchema: GenerateTelescopeSummaryOutputSchema,
  },
  async input => {
    const telescope: Telescope = await getTelescope(input.telescopeName);
    const telescopeDetails = `Name: ${telescope.name}\nType: ${telescope.type}\nKey Technologies: ${telescope.keyTechnologies}\nData Captured: ${telescope.dataCaptured}\nFuture Upgrades: ${telescope.futureUpgrades}`;

    const {output} = await prompt({
      telescopeName: input.telescopeName,
      telescopeDetails,
    });
    return output!;
  }
);

