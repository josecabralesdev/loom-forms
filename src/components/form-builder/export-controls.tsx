"use client";

import type { FormStructure } from '@/lib/types';
import { exportToHtml, exportToJson } from '@/lib/export';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Code, FileJson, FileCode, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportControlsProps {
  form: FormStructure;
}

export default function ExportControls({ form }: ExportControlsProps) {
  const { toast } = useToast();
  const embedCode = `<iframe src="${
    typeof window !== 'undefined' ? window.location.origin : ''
  }/form/your-form-id" width="100%" height="600" frameborder="0"></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: 'Copied!',
      description: 'Embed code copied to clipboard.',
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Export & Share</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button variant="outline" onClick={() => exportToJson(form)}>
          <FileJson className="mr-2" />
          JSON
        </Button>
        <Button variant="outline" onClick={() => exportToHtml(form)}>
          <FileCode className="mr-2" />
          HTML
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Code className="mr-2" />
              Embed
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Embed Your Form</DialogTitle>
              <DialogDescription>
                Copy and paste this code into your website to embed the form.
              </DialogDescription>
            </DialogHeader>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                <code>{embedCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button">Close</Button>
                </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
