'use client';

import { Theme } from '@/lib/themes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ThemePreviewModalProps {
  theme: Theme | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBook: (theme: Theme) => void;
}

export function ThemePreviewModal({
  theme,
  open,
  onOpenChange,
  onBook,
}: ThemePreviewModalProps) {
  const [copied, setCopied] = useState(false);

  if (!theme) return null;

  const handleCopyColors = () => {
    const colorString = Object.entries(theme.colors)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    navigator.clipboard.writeText(colorString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{theme.name}</DialogTitle>
          <DialogDescription>{theme.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Color Palette */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Color Palette</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Object.entries(theme.colors).map(([name, color]) => (
                <div key={name} className="space-y-2">
                  <div
                    className="h-24 rounded-lg border shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                  <div className="text-center">
                    <p className="text-xs font-medium capitalize">{name}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {color}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Layout */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Preview</h3>
            <div
              className="rounded-lg p-6 space-y-4"
              style={{ backgroundColor: theme.colors.background }}
            >
              <h2
                className="text-2xl font-bold"
                style={{ color: theme.colors.primary }}
              >
                Sample Heading
              </h2>
              <p style={{ color: theme.colors.text }} className="text-sm leading-relaxed">
                This is a preview of how your content would look with the {theme.name}{' '}
                theme. The colors are carefully chosen to create a cohesive and professional
                design.
              </p>
              <div className="flex gap-3 pt-4">
                <button
                  className="px-4 py-2 rounded font-medium text-sm transition-colors"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.background,
                  }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded font-medium text-sm transition-colors border"
                  style={{
                    borderColor: theme.colors.accent,
                    color: theme.colors.accent,
                  }}
                >
                  Secondary Button
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Features</h3>
            <div className="flex flex-wrap gap-2">
              {theme.features.map((feature, idx) => (
                <Badge key={idx} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyColors}
              className="gap-2"
            >
              <Copy className="size-4" />
              {copied ? 'Copied!' : 'Copy Colors'}
            </Button>
            <Button
              onClick={() => onBook(theme)}
              className="gap-2"
            >
              <ExternalLink className="size-4" />
              Book This Theme
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
