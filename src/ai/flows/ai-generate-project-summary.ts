
'use server';
/**
 * @fileOverview A Genkit flow for generating concise project summaries and achievement bullet points from raw notes.
 *
 * - generateProjectSummary - A function that handles the generation process.
 * - GenerateProjectSummaryInput - The input type for the generateProjectSummary function.
 * - GenerateProjectSummaryOutput - The return type for the generateProjectSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectSummaryInputSchema = z.object({
  rawNotes: z
    .string()
    .describe(
      'Raw, unformatted notes about a project, including details about its goals, technologies, challenges, and outcomes.'
    ),
});
export type GenerateProjectSummaryInput = z.infer<
  typeof GenerateProjectSummaryInputSchema
>;

const GenerateProjectSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise and engaging summary of the project, suitable for a portfolio.'
    ),
  achievements: z
    .array(z.string())
    .describe(
      'A list of key achievements or outcomes of the project, presented as bullet points.'
    ),
});
export type GenerateProjectSummaryOutput = z.infer<
  typeof GenerateProjectSummaryOutputSchema
>;

export async function generateProjectSummary(
  input: GenerateProjectSummaryInput
): Promise<GenerateProjectSummaryOutput> {
  try {
    const result = await generateProjectSummaryFlow(input);
    return result;
  } catch (error) {
    console.error('Genkit Flow Error:', error);
    throw new Error('Could not process project summary. Please try again.');
  }
}

const projectSummaryPrompt = ai.definePrompt({
  name: 'projectSummaryPrompt',
  input: {schema: GenerateProjectSummaryInputSchema},
  output: {schema: GenerateProjectSummaryOutputSchema},
  prompt: `You are an expert portfolio content writer. Your task is to transform raw project notes into a concise, engaging project summary and a list of key achievements suitable for a professional portfolio.

Raw Project Notes:
{{{rawNotes}}}

Based on the notes provided, generate:
1. A brief, compelling project summary (1-3 sentences).
2. A list of 3-5 achievement bullet points highlighting the most significant outcomes or contributions. Focus on quantifiable results or unique challenges overcome.`,
});

const generateProjectSummaryFlow = ai.defineFlow(
  {
    name: 'generateProjectSummaryFlow',
    inputSchema: GenerateProjectSummaryInputSchema,
    outputSchema: GenerateProjectSummaryOutputSchema,
  },
  async input => {
    const {output} = await projectSummaryPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate a valid response.');
    }
    return output;
  }
);
