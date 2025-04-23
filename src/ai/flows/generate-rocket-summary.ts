'use server';
/**
 * @fileOverview A rocket summary generator AI agent.
 *
 * - generateRocketSummary - A function that handles the rocket summary generation process.
 * - GenerateRocketSummaryInput - The input type for the generateRocketSummary function.
 * - GenerateRocketSummaryOutput - The return type for the generateRocketSummary function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getRocket, Rocket} from '@/services/rocket';

const GenerateRocketSummaryInputSchema = z.object({
  rocketName: z.string().describe('The name of the rocket to summarize.'),
});
export type GenerateRocketSummaryInput = z.infer<typeof GenerateRocketSummaryInputSchema>;

const GenerateRocketSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the rocket, including its origin, launch history, and notable missions.'),
});
export type GenerateRocketSummaryOutput = z.infer<typeof GenerateRocketSummaryOutputSchema>;

export async function generateRocketSummary(input: GenerateRocketSummaryInput): Promise<GenerateRocketSummaryOutput> {
  return generateRocketSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRocketSummaryPrompt',
  input: {
    schema: z.object({
      rocketName: z.string().describe('The name of the rocket to summarize.'),
      rocketInfo: z.object({
        name: z.string(),
        country: z.string(),
        type: z.string(),
        launchHistory: z.string(),
        notableMissions: z.string(),
      }).describe('Rocket information'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of the rocket, including its origin, launch history, and notable missions.'),
    }),
  },
  prompt: `You are an expert in space exploration and are tasked with summarizing key information about a given rocket.\

  Using the following rocket information, generate a concise summary that covers its origin, launch history, and notable missions. The summary should be easy to understand for someone with a general interest in space.

  Rocket Name: {{{rocketName}}}
  Country of Origin: {{{rocketInfo.country}}}
  Type: {{{rocketInfo.type}}}
  Launch History: {{{rocketInfo.launchHistory}}}
  Notable Missions: {{{rocketInfo.notableMissions}}}
  `,
});

const generateRocketSummaryFlow = ai.defineFlow<
  typeof GenerateRocketSummaryInputSchema,
  typeof GenerateRocketSummaryOutputSchema
>({
  name: 'generateRocketSummaryFlow',
  inputSchema: GenerateRocketSummaryInputSchema,
  outputSchema: GenerateRocketSummaryOutputSchema,
}, async input => {
  const rocketInfo: Rocket = await getRocket(input.rocketName);
  const {output} = await prompt({
    rocketName: input.rocketName,
    rocketInfo: rocketInfo,
  });
  return output!;
});
