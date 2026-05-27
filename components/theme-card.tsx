'use client';

import { Theme } from '@/lib/themes';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface ThemeCardProps {
  theme: Theme;
  onSelect: (theme: Theme) => void;
}

export function ThemeCard({ theme, onSelect }: ThemeCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-105"
      onClick={() => onSelect(theme)}
    >
      {/* Theme Preview */}
      <div
        className="h-40 relative overflow-hidden"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-2">
            <div
              className="w-12 h-12 rounded"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <div
              className="w-12 h-12 rounded"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <div
              className="w-12 h-12 rounded"
              style={{ backgroundColor: theme.colors.secondary }}
            />
          </div>
        </div>
      </div>

      {/* Theme Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{theme.name}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {theme.description}
            </p>
          </div>
          {theme.popular && (
            <Badge variant="secondary" className="text-xs whitespace-nowrap">
              Popular
            </Badge>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {theme.features.slice(0, 2).map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground">{theme.category}</span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}
