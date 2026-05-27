'use client';

import { useState, useMemo } from 'react';
import { themes, getAllCategories, Theme } from '@/lib/themes';
import { ThemeCard } from './theme-card';
import { ThemePreviewModal } from './theme-preview-modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ThemeGalleryProps {
  onSelectTheme: (theme: Theme) => void;
}

export function ThemeGallery({ onSelectTheme }: ThemeGalleryProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewOpen, setPreviewOpen] = useState(false);

  const categories = useMemo(() => {
    return ['all', ...getAllCategories()];
  }, []);

  const filteredThemes = useMemo(() => {
    if (selectedCategory === 'all') {
      return themes;
    }
    return themes.filter(theme => theme.category === selectedCategory);
  }, [selectedCategory]);

  const handleSelectTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setPreviewOpen(true);
  };

  const handleBook = (theme: Theme) => {
    setPreviewOpen(false);
    onSelectTheme(theme);
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Theme Results */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">
          {filteredThemes.length} {selectedCategory === 'all' ? 'Themes' : `${selectedCategory} Themes`}
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredThemes.map(theme => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              onSelect={handleSelectTheme}
            />
          ))}
        </div>
      </div>

      {/* Theme Preview Modal */}
      <ThemePreviewModal
        theme={selectedTheme}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        onBook={handleBook}
      />
    </div>
  );
}
