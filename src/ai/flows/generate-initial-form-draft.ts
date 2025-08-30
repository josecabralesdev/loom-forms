'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an initial form draft based on a user's description.
 *
 * - generateInitialFormDraft - A function that takes a form description and returns a JSON structure representing the initial form.
 * - GenerateInitialFormDraftInput - The input type for the generateInitialFormDraft function.
 * - GenerateInitialFormDraftOutput - The return type for the generateInitialFormDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialFormDraftInputSchema = z.object({
  formDescription: z
    .string()
    .describe('A brief description of the form the user needs (e.g., collect customer feedback for a restaurant).'),
});
export type GenerateInitialFormDraftInput = z.infer<typeof GenerateInitialFormDraftInputSchema>;

const GenerateInitialFormDraftOutputSchema = z.object({
  formStructure: z.string().describe('A JSON structure representing the initial form draft, including fields and their types.'),
});
export type GenerateInitialFormDraftOutput = z.infer<typeof GenerateInitialFormDraftOutputSchema>;

export async function generateInitialFormDraft(input: GenerateInitialFormDraftInput): Promise<GenerateInitialFormDraftOutput> {
  return generateInitialFormDraftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialFormDraftPrompt',
  input: {schema: GenerateInitialFormDraftInputSchema},
  output: {schema: GenerateInitialFormDraftOutputSchema},
  prompt: `You are an AI assistant that helps users quickly create form structures.

  Based on the user's description, generate a JSON structure representing an initial form draft.
  Include relevant fields, their types (e.g., text, email, number, rating, comments), and a helpful placeholder.

  User's description: {{{formDescription}}}

  Ensure that the generated JSON structure is valid and well-formatted.
  Return the form structure as a string.
  Example:
  {
    "fields": [
      { "name": "name", "type": "text", "label": "Name", "placeholder": "Enter your full name", "required": true },
      { "name": "email", "type": "email", "label": "Email", "placeholder": "you@example.com", "required": true },
      { "name": "rating", "type": "number", "label": "Rating (1-5)", "placeholder": "3", "required": true },
      { "name": "comments", "type": "text", "label": "Comments", "placeholder": "Any additional feedback?", "required": false }
    ]
  }
  `,
});

const generateInitialFormDraftFlow = ai.defineFlow(
  {
    name: 'generateInitialFormDraftFlow',
    inputSchema: GenerateInitialFormDraftInputSchema,
    outputSchema: GenerateInitialFormDraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
