"use client";

import { useState } from 'react';
import type { FormField, FieldType } from '@/lib/types';
import { generateInitialFormDraft } from '@/ai/flows/generate-initial-form-draft';
import { suggestValidationRules } from '@/ai/flows/suggest-validation-rules';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import AiPrompt from '@/components/form-builder/ai-prompt';
import EditorPanel from '@/components/form-builder/editor-panel';
import PreviewPanel from '@/components/form-builder/preview-panel';
import ExportControls from '@/components/form-builder/export-controls';
import Header from '@/components/form-builder/header';
import ThemeSelector from '@/components/form-builder/theme-selector';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Helper to safely parse JSON
const safeJsonParse = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
};

export default function Home() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState(
    'This is a preview of your form.'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('theme-default');
  const { toast } = useToast();

  const handleGenerateDraft = async (prompt: string) => {
    setIsLoading(true);
    try {
      const result = await generateInitialFormDraft({ formDescription: prompt });
      const formStructure = safeJsonParse(result.formStructure);

      if (formStructure && formStructure.fields) {
        setFormTitle(formStructure.title || 'Generated Form');
        setFormDescription(
          formStructure.description || 'Your generated form preview.'
        );
        const newFields = formStructure.fields.map((field: any) => ({
          ...field,
          id: uuidv4(),
          placeholder: field.placeholder || 'Enter your answer',
        }));
        setFields(newFields);
        toast({
          title: 'Form Generated!',
          description: 'Your new form draft is ready for editing.',
        });
      } else {
        throw new Error('AI did not return a valid form structure.');
      }
    } catch (error) {
      console.error('Error generating form draft:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate form. Please try again.',
      });
    }
    setIsLoading(false);
  };

  const handleUpdateField = (id: string, updatedField: Partial<FormField>) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      )
    );
  };

  const handleAddField = () => {
    const newField: FormField = {
      id: uuidv4(),
      name: `new_field_${fields.length + 1}`,
      label: 'New Question',
      type: 'text',
      placeholder: 'Enter your answer',
      required: false,
    };
    setFields([...fields, newField]);
  };

  const handleDeleteField = (id: string) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  const handleReorderField = (id: string, direction: 'up' | 'down') => {
    setFields((prevFields) => {
      const newFields = [...prevFields];
      const index = newFields.findIndex((f) => f.id === id);
      if (index === -1) return newFields;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newFields.length) return newFields;

      [newFields[index], newFields[newIndex]] = [
        newFields[newIndex],
        newFields[index],
      ]; // Swap
      return newFields;
    });
  };

  const handleSuggestValidation = async (id: string) => {
    const field = fields.find((f) => f.id === id);
    if (!field) return;

    toast({
      title: 'Thinking...',
      description: 'AI is suggesting validation rules.',
    });
    try {
      const result = await suggestValidationRules({
        fieldDescription: `This is a field named "${field.label}" of type "${field.type}".`,
      });
      handleUpdateField(id, {
        suggestedValidations: result.suggestedRules,
      });
      toast({
        title: 'Suggestions Ready!',
        description: `Validation ideas for "${field.label}" are here.`,
      });
    } catch (error) {
      console.error('Error suggesting validation rules:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not get suggestions.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <AiPrompt onGenerate={handleGenerateDraft} isLoading={isLoading} />
            <ThemeSelector onThemeChange={setTheme} />
            <EditorPanel
              fields={fields}
              onAddField={handleAddField}
              onUpdateField={handleUpdateField}
              onDeleteField={handleDeleteField}
              onReorderField={handleReorderField}
              onSuggestValidation={handleSuggestValidation}
            />
            <ExportControls
              form={{ title: formTitle, description: formDescription, fields }}
            />
          </div>

          <div className="lg:sticky lg:top-8">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Live Preview
            </h2>
            <Card className="w-full max-w-2xl mx-auto shadow-lg">
              <CardContent className="p-6">
                <div className={theme}>
                  <PreviewPanel
                    title={formTitle}
                    description={formDescription}
                    fields={fields}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
