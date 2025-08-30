"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Paintbrush } from 'lucide-react';
import { useState } from 'react';

interface ThemeSelectorProps {
  onThemeChange: (themeClass: string) => void;
}

const themes = [
  { name: 'Default', class: 'theme-default', colors: ['#EDB3E5', '#EDE8F5', '#C4B5FD'] },
  { name: 'Forest', class: 'theme-forest', colors: ['#2A9D8F', '#E9C46A', '#F4A261'] },
  { name: 'Ocean', class: 'theme-ocean', colors: ['#3D5A80', '#98C1D9', '#E0FBFC'] },
  { name: 'Sunset', class: 'theme-sunset', colors: ['#E76F51', '#F4A261', '#E9C46A'] },
  { name: 'Rose', class: 'theme-rose', colors: ['#D81159', '#FFBC42', '#8F2D56'] },
];

export default function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState(themes[0].class);

  const handleThemeClick = (themeClass: string) => {
    setSelectedTheme(themeClass);
    onThemeChange(themeClass);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paintbrush className="text-primary" />
          Theme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.name}
              className="cursor-pointer space-y-2 text-center"
              onClick={() => handleThemeClick(theme.class)}
            >
              <div
                className={cn(
                  'h-16 w-full rounded-lg border-2 flex items-center justify-center transition-all',
                  selectedTheme === theme.class
                    ? 'border-primary ring-2 ring-primary ring-offset-2'
                    : 'border-muted'
                )}
              >
                <div className="flex gap-1">
                  {theme.colors.map((color, i) => (
                    <div
                      key={i}
                      className="h-8 w-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm font-medium">{theme.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
