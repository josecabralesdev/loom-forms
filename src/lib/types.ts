export type FieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'textarea'
  | 'date'
  | 'rating'
  | 'select'
  | 'checkbox';

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // for select/checkbox
  suggestedValidations?: string[];
}

export interface FormStructure {
  title: string;
  description: string;
  fields: FormField[];
}
