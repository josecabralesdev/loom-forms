'use server';

/**
 * @fileOverview Suggests validation rules for a given form field based on its type and purpose.
 *
 * - suggestValidationRules - A function that suggests validation rules for a form field.
 * - SuggestValidationRulesInput - The input type for the suggestValidationRules function.
 * - SuggestValidationRulesOutput - The return type for the suggestValidationRules function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestValidationRulesInputSchema = z.object({
  fieldDescription: z.string().describe('The description of the form field, including its purpose and expected data type.'),
});
export type SuggestValidationRulesInput = z.infer<typeof SuggestValidationRulesInputSchema>;

const SuggestValidationRulesOutputSchema = z.object({
  suggestedRules: z.array(z.string()).describe('An array of suggested validation rules for the field.'),
});
export type SuggestValidationRulesOutput = z.infer<typeof SuggestValidationRulesOutputSchema>;

export async function suggestValidationRules(input: SuggestValidationRulesInput): Promise<SuggestValidationRulesOutput> {
  return suggestValidationRulesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestValidationRulesPrompt',
  input: {schema: SuggestValidationRulesInputSchema},
  output: {schema: SuggestValidationRulesOutputSchema},
  prompt: `You are an AI assistant that suggests validation rules for form fields.

  Based on the following field description, suggest a list of validation rules that would be appropriate to ensure data quality and correctness.

  Field Description: {{{fieldDescription}}}

  Consider rules related to data type, format, required status, length constraints, and acceptable values.

  Respond with a JSON array of strings, where each string is a suggested validation rule.
  `,
});

const suggestValidationRulesFlow = ai.defineFlow(
  {
    name: 'suggestValidationRulesFlow',
    inputSchema: SuggestValidationRulesInputSchema,
    outputSchema: SuggestValidationRulesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
