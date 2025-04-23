// src/ai/flows/generate-mission-summary.ts
'use server';

/**
 * @fileOverview AI flow for generating a summary of a space mission.
 *
 * - generateMissionSummary - A function that generates a summary of a space mission.
 * - GenerateMissionSummaryInput - The input type for the generateMissionSummary function.
 * - GenerateMissionSummaryOutput - The return type for the generateMissionSummary function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getMission, Mission} from '@/services/mission';

const GenerateMissionSummaryInputSchema = z.object({
  missionName: z.string().describe('The name of the mission to summarize.'),
});
export type GenerateMissionSummaryInput = z.infer<
  typeof GenerateMissionSummaryInputSchema
>;

const GenerateMissionSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the space mission.'),
});
export type GenerateMissionSummaryOutput = z.infer<
  typeof GenerateMissionSummaryOutputSchema
>;

export async function generateMissionSummary(
  input: GenerateMissionSummaryInput
): Promise<GenerateMissionSummaryOutput> {
  return generateMissionSummaryFlow(input);
}

const generateMissionSummaryPrompt = ai.definePrompt({
  name: 'generateMissionSummaryPrompt',
  input: {
    schema: z.object({
      missionName: z.string().describe('The name of the mission to summarize.'),
      missionDetails: z
        .object({
          name: z.string(),
          target: z.string(),
          objectives: z.string(),
          launchDate: z.string(),
          status: z.string(),
        })
        .describe('Details about the mission'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of the space mission.'),
    }),
  },
  prompt: `You are an expert in space exploration. Generate a concise yet comprehensive summary of the following space mission, including its objectives, timeline, and key findings.\n\nMission Name: {{{missionName}}}\nTarget: {{{missionDetails.target}}}\nObjectives: {{{missionDetails.objectives}}}\nLaunch Date: {{{missionDetails.launchDate}}}\nStatus: {{{missionDetails.status}}}`,
});

const generateMissionSummaryFlow = ai.defineFlow<
  typeof GenerateMissionSummaryInputSchema,
  typeof GenerateMissionSummaryOutputSchema
>(
  {
    name: 'generateMissionSummaryFlow',
    inputSchema: GenerateMissionSummaryInputSchema,
    outputSchema: GenerateMissionSummaryOutputSchema,
  },
  async input => {
    const missionDetails: Mission = await getMission(input.missionName);
    const {output} = await generateMissionSummaryPrompt({
      missionName: input.missionName,
      missionDetails: missionDetails,
    });
    return output!;
  }
);
