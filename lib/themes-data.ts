export interface Theme {
  id: string;
  name: string;
  category: 'business' | 'creative' | 'ecommerce' | 'portfolio' | 'saas';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export const THEMES: Theme[] = [
  {
    id: '1',
    name: 'Obsidian Pro',
    category: 'saas',
    colors: { primary: '#00ff88', secondary: '#0a0e27', accent: '#00d4ff', background: '#0f1419' }
  },
  {
    id: '2',
    name: 'Neon Rush',
    category: 'creative',
    colors: { primary: '#00d4ff', secondary: '#1a1f2e', accent: '#ff006e', background: '#0a0e27' }
  },
  {
    id: '3',
    name: 'Quantum',
    category: 'saas',
    colors: { primary: '#00ff88', secondary: '#0f1419', accent: '#6366f1', background: '#0a0e27' }
  },
  {
    id: '4',
    name: 'Ethereal',
    category: 'creative',
    colors: { primary: '#a78bfa', secondary: '#1e1b4b', accent: '#60a5fa', background: '#0f0a1f' }
  },
  {
    id: '5',
    name: 'Blaze',
    category: 'ecommerce',
    colors: { primary: '#ff6b35', secondary: '#1a0f08', accent: '#ffb700', background: '#0d0603' }
  },
  {
    id: '6',
    name: 'Frost Edge',
    category: 'business',
    colors: { primary: '#38bdf8', secondary: '#082f49', accent: '#7dd3fc', background: '#051e34' }
  },
  {
    id: '7',
    name: 'Crimson Tide',
    category: 'portfolio',
    colors: { primary: '#ef4444', secondary: '#3f0f0f', accent: '#fca5a5', background: '#1a0606' }
  },
  {
    id: '8',
    name: 'Mint Zen',
    category: 'business',
    colors: { primary: '#10b981', secondary: '#0d2d21', accent: '#6ee7b7', background: '#031e13' }
  },
  {
    id: '9',
    name: 'Cyber Chrome',
    category: 'saas',
    colors: { primary: '#00ff88', secondary: '#0a0e27', accent: '#00d4ff', background: '#0f1419' }
  },
  {
    id: '10',
    name: 'Violet Dream',
    category: 'creative',
    colors: { primary: '#c084fc', secondary: '#2e1065', accent: '#d8b4fe', background: '#1f0f3d' }
  },
  {
    id: '11',
    name: 'Solar Flare',
    category: 'ecommerce',
    colors: { primary: '#fbbf24', secondary: '#2b1e06', accent: '#fcd34d', background: '#1a1006' }
  },
  {
    id: '12',
    name: 'Ocean Deep',
    category: 'portfolio',
    colors: { primary: '#06b6d4', secondary: '#0c4a6e', accent: '#22d3ee', background: '#051e2b' }
  },
  {
    id: '13',
    name: 'Ember Core',
    category: 'business',
    colors: { primary: '#f97316', secondary: '#3f1f0b', accent: '#fdba74', background: '#1a0f05' }
  },
  {
    id: '14',
    name: 'Slate Nexus',
    category: 'saas',
    colors: { primary: '#64748b', secondary: '#1e293b', accent: '#cbd5e1', background: '#0f172a' }
  },
  {
    id: '15',
    name: 'Pearl Luxury',
    category: 'ecommerce',
    colors: { primary: '#e5e7eb', secondary: '#1f2937', accent: '#d1d5db', background: '#111827' }
  },
  {
    id: '16',
    name: 'Forest Trail',
    category: 'portfolio',
    colors: { primary: '#059669', secondary: '#0d3d25', accent: '#6ee7b7', background: '#041e14' }
  },
  {
    id: '17',
    name: 'Neo Tokyo',
    category: 'creative',
    colors: { primary: '#ec4899', secondary: '#3f0f1f', accent: '#f472b6', background: '#1f0513' }
  },
  {
    id: '18',
    name: 'Data Flow',
    category: 'saas',
    colors: { primary: '#0ea5e9', secondary: '#0c2d44', accent: '#38bdf8', background: '#082344' }
  },
  {
    id: '19',
    name: 'Velvet Touch',
    category: 'business',
    colors: { primary: '#8b5cf6', secondary: '#2e1065', accent: '#a78bfa', background: '#1e0f3d' }
  },
  {
    id: '20',
    name: 'Neon Nights',
    category: 'creative',
    colors: { primary: '#00ff88', secondary: '#0a0e27', accent: '#ff006e', background: '#0f1419' }
  }
];

export function getThemeById(id: string): Theme | undefined {
  return THEMES.find(theme => theme.id === id);
}

export function getThemesByCategory(category: Theme['category']): Theme[] {
  return THEMES.filter(theme => theme.category === category);
}
