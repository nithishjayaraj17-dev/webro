'use client';

import { Theme } from '@/lib/themes-data';
import { Check } from 'lucide-react';

interface ThemeCardProps {
  theme: Theme;
  isSelected: boolean;
  onClick: () => void;
}

export function ThemeCard({ theme, isSelected, onClick }: ThemeCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col rounded-lg overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
    >
      {/* Color Preview */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-br flex items-end justify-end p-3" 
           style={{ 
             backgroundImage: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 50%, ${theme.colors.background} 100%)`
           }}>
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        )}
        
        {!isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-colors"></div>
        )}
      </div>

      {/* Theme Info */}
      <div className="flex-1 p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-sm">{theme.name}</h3>
          <p className="text-xs text-muted-foreground capitalize">{theme.category}</p>
        </div>

        {/* Color Swatches */}
        <div className="flex gap-2">
          <div 
            className="w-4 h-4 rounded-sm border border-border/50"
            style={{ backgroundColor: theme.colors.primary }}
            title="Primary"
          />
          <div 
            className="w-4 h-4 rounded-sm border border-border/50"
            style={{ backgroundColor: theme.colors.secondary }}
            title="Secondary"
          />
          <div 
            className="w-4 h-4 rounded-sm border border-border/50"
            style={{ backgroundColor: theme.colors.accent }}
            title="Accent"
          />
          <div 
            className="w-4 h-4 rounded-sm border border-border/50"
            style={{ backgroundColor: theme.colors.background }}
            title="Background"
          />
        </div>
      </div>
    </button>
  );
}
