import type { FormField } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Rating } from './rating';

interface PreviewPanelProps {
  title: string;
  description: string;
  fields: FormField[];
}

export default function PreviewPanel({ title, description, fields }: PreviewPanelProps) {
  const renderField = (field: FormField) => {
    const { id, type, label, placeholder, required, options } = field;
    const requiredSpan = required ? <span className="text-destructive"> *</span> : null;

    return (
      <div key={id} className="space-y-2">
        <Label htmlFor={id}>
          {label}
          {requiredSpan}
        </Label>
        {type === 'text' && <Input id={id} placeholder={placeholder} />}
        {type === 'email' && <Input type="email" id={id} placeholder={placeholder} />}
        {type === 'number' && <Input type="number" id={id} placeholder={placeholder} />}
        {type === 'textarea' && <Textarea id={id} placeholder={placeholder} />}
        {type === 'checkbox' && (
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id={id} />
            <label htmlFor={id} className="text-sm font-medium leading-none">
              {placeholder || 'Accept'}
            </label>
          </div>
        )}
        {type === 'date' && (
           <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Pick a date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                disabled
              />
            </PopoverContent>
          </Popover>
        )}
        {type === 'select' && (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {type === 'rating' && <Rating readOnly />}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <form className="space-y-4">
        {fields.map(renderField)}
        {fields.length > 0 && <Button className="w-full" type="submit">Submit</Button>}
      </form>
    </div>
  );
}
