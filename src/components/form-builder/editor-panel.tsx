import type { FormField } from '@/lib/types';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import FieldEditor from './field-editor';

interface EditorPanelProps {
  fields: FormField[];
  onAddField: () => void;
  onUpdateField: (id: string, updatedField: Partial<FormField>) => void;
  onDeleteField: (id: string) => void;
  onReorderField: (id: string, direction: 'up' | 'down') => void;
  onSuggestValidation: (id: string) => void;
}

export default function EditorPanel({
  fields,
  onAddField,
  ...rest
}: EditorPanelProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Form Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.length > 0 ? (
          <Accordion type="single" collapsible className="w-full"
          defaultValue={fields[0]?.id}>
            {fields.map((field, index) => (
              <FieldEditor
                key={field.id}
                field={field}
                isFirst={index === 0}
                isLast={index === fields.length - 1}
                {...rest}
              />
            ))}
          </Accordion>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <p>Your form has no fields yet.</p>
            <p>Generate a form with AI or add a field to get started.</p>
          </div>
        )}
        <Button onClick={onAddField} variant="outline" className="w-full">
          <Plus className="mr-2" />
          Add Field
        </Button>
      </CardContent>
    </Card>
  );
}
