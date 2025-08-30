import type { FormField, FieldType } from '@/lib/types';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, GripVertical, MoveUp, MoveDown, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';

interface FieldEditorProps {
  field: FormField;
  isFirst: boolean;
  isLast: boolean;
  onUpdateField: (id: string, updatedField: Partial<FormField>) => void;
  onDeleteField: (id: string) => void;
  onReorderField: (id: string, direction: 'up' | 'down') => void;
  onSuggestValidation: (id: string) => void;
}

const fieldTypes: FieldType[] = ['text', 'email', 'number', 'textarea', 'date', 'rating', 'select', 'checkbox'];

export default function FieldEditor({
  field,
  isFirst,
  isLast,
  onUpdateField,
  onDeleteField,
  onReorderField,
  onSuggestValidation,
}: FieldEditorProps) {
  
  const handleOptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const options = e.target.value.split('\n');
    onUpdateField(field.id, { options });
  };
  
  return (
    <AccordionItem value={field.id}>
      <AccordionTrigger className="hover:bg-secondary/50 px-2 rounded-md">
        <div className="flex items-center gap-2 flex-1">
          <GripVertical className="size-5 text-muted-foreground" />
          <span>{field.label || 'New Question'}</span>
          <Badge variant="outline" className="ml-2">{field.type}</Badge>
        </div>
      </AccordionTrigger>
      <div className="flex items-center gap-1 justify-end px-2 -mt-10 mb-2">
         <Button
            variant="ghost"
            size="icon"
            onClick={() => onReorderField(field.id, 'up')}
            disabled={isFirst}
            aria-label="Move up"
          >
            <MoveUp className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onReorderField(field.id, 'down')}
            disabled={isLast}
            aria-label="Move down"
          >
            <MoveDown className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteField(field.id)}
            className="text-destructive hover:text-destructive"
            aria-label="Delete field"
          >
            <Trash2 className="size-4" />
          </Button>
      </div>
      <AccordionContent className="p-4 space-y-4 border rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`label-${field.id}`}>Label</Label>
              <Input
                id={`label-${field.id}`}
                value={field.label}
                onChange={(e) => onUpdateField(field.id, { label: e.target.value })}
              />
            </div>
            <div>
                <Label htmlFor={`type-${field.id}`}>Type</Label>
                <Select
                    value={field.type}
                    onValueChange={(value) => onUpdateField(field.id, { type: value as FieldType })}
                >
                    <SelectTrigger id={`type-${field.id}`}>
                        <SelectValue placeholder="Select a field type" />
                    </SelectTrigger>
                    <SelectContent>
                        {fieldTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div>
          <Label htmlFor={`placeholder-${field.id}`}>Placeholder</Label>
          <Input
            id={`placeholder-${field.id}`}
            value={field.placeholder || ''}
            onChange={(e) => onUpdateField(field.id, { placeholder: e.target.value })}
          />
        </div>

        {(field.type === 'select') && (
            <div>
                <Label htmlFor={`options-${field.id}`}>Options (one per line)</Label>
                <textarea
                    id={`options-${field.id}`}
                    value={field.options?.join('\n') || ''}
                    onChange={handleOptionChange}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
            </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id={`required-${field.id}`}
            checked={field.required}
            onCheckedChange={(checked) => onUpdateField(field.id, { required: !!checked })}
          />
          <Label htmlFor={`required-${field.id}`}>Required</Label>
        </div>
        
        <div className='pt-2'>
            <Button variant="outline" onClick={() => onSuggestValidation(field.id)}>
                <Sparkles className="mr-2 h-4 w-4" />
                Suggest Validation
            </Button>
            {field.suggestedValidations && (
                <div className="mt-3 space-y-2">
                    <p className='text-sm font-medium'>AI Suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                        {field.suggestedValidations.map((rule, index) => (
                            <Badge key={index} variant="secondary">{rule}</Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
