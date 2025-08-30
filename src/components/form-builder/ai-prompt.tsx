"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';

interface AiPromptProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

export default function AiPrompt({ onGenerate, isLoading }: AiPromptProps) {
  const [prompt, setPrompt] = useState('');

  const handleGenerateClick = () => {
    if (prompt.trim()) {
      onGenerate(prompt.trim());
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-primary" />
          Create with AI
        </CardTitle>
        <CardDescription>
          Describe your form in 1-2 sentences. For example, "A customer feedback form for my restaurant."
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="e.g., An event registration form for a tech conference..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          rows={3}
        />
        <Button onClick={handleGenerateClick} disabled={isLoading || !prompt.trim()} className="w-full">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Sparkles className="mr-2" />
          )}
          Generate Form
        </Button>
      </CardContent>
    </Card>
  );
}
