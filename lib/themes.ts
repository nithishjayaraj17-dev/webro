export interface Theme {
  id: string;
  name: string;
  description: string;
  category: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  preview: string;
  features: string[];
  popular: boolean;
}

export const themes: Theme[] = [
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    description: 'Clean and minimal design with dark background',
    category: 'Minimal',
    colors: {
      primary: '#000000',
      secondary: '#1a1a1a',
      accent: '#ffffff',
      background: '#0f0f0f',
      text: '#ffffff',
    },
    preview: 'minimal-dark',
    features: ['Dark Mode', 'Responsive', 'Fast Loading'],
    popular: true,
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Calm blue tones inspired by the ocean',
    category: 'Nature',
    colors: {
      primary: '#0066cc',
      secondary: '#00a8ff',
      accent: '#ffcc00',
      background: '#e6f2ff',
      text: '#003366',
    },
    preview: 'ocean-breeze',
    features: ['Gradient Effects', 'Smooth Animations', 'Mobile Friendly'],
    popular: true,
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    description: 'Warm gradient design with sunset vibes',
    category: 'Warm',
    colors: {
      primary: '#ff6b35',
      secondary: '#ff8c42',
      accent: '#ffd700',
      background: '#ffe8cc',
      text: '#333333',
    },
    preview: 'sunset-glow',
    features: ['Gradient Background', 'Hero Section', 'CTA Buttons'],
    popular: true,
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Natural green theme for eco-friendly brands',
    category: 'Nature',
    colors: {
      primary: '#2d5016',
      secondary: '#558b2f',
      accent: '#76ff03',
      background: '#f1f8e9',
      text: '#1b5e20',
    },
    preview: 'forest-green',
    features: ['Eco-friendly', 'Organic Feel', 'High Contrast'],
    popular: false,
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Elegant purple design for premium brands',
    category: 'Elegant',
    colors: {
      primary: '#6a1b9a',
      secondary: '#8e24aa',
      accent: '#ce93d8',
      background: '#f3e5f5',
      text: '#4a148c',
    },
    preview: 'royal-purple',
    features: ['Premium Feel', 'Gold Accents', 'Luxury Look'],
    popular: false,
  },
  {
    id: 'tech-noir',
    name: 'Tech Noir',
    description: 'Modern dark theme for tech companies',
    category: 'Tech',
    colors: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#0f3460',
      background: '#0f0f0f',
      text: '#eaeaea',
    },
    preview: 'tech-noir',
    features: ['Futuristic', 'Code Snippets', 'Dark Theme'],
    popular: true,
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    description: 'Modern rose gold design for beauty brands',
    category: 'Fashion',
    colors: {
      primary: '#b76b7d',
      secondary: '#d4949f',
      accent: '#f0c8d1',
      background: '#fdf8f5',
      text: '#5a3a42',
    },
    preview: 'rose-gold',
    features: ['Elegant Typography', 'Image Gallery', 'Smooth Transitions'],
    popular: false,
  },
  {
    id: 'business-blue',
    name: 'Business Blue',
    description: 'Professional blue for corporate websites',
    category: 'Corporate',
    colors: {
      primary: '#003366',
      secondary: '#0066cc',
      accent: '#3399ff',
      background: '#f0f4f8',
      text: '#1a1a1a',
    },
    preview: 'business-blue',
    features: ['Professional', 'Trust Building', 'Clean Layout'],
    popular: true,
  },
  {
    id: 'vibrant-red',
    name: 'Vibrant Red',
    description: 'Bold red design for energetic brands',
    category: 'Bold',
    colors: {
      primary: '#d32f2f',
      secondary: '#f44336',
      accent: '#ffeb3b',
      background: '#ffebee',
      text: '#b71c1c',
    },
    preview: 'vibrant-red',
    features: ['Eye-catching', 'Dynamic Content', 'High Energy'],
    popular: false,
  },
  {
    id: 'monochrome-chic',
    name: 'Monochrome Chic',
    description: 'Stylish black and white minimalist design',
    category: 'Minimal',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#cccccc',
      background: '#ffffff',
      text: '#333333',
    },
    preview: 'monochrome-chic',
    features: ['Timeless', 'Professional', 'Accessible'],
    popular: false,
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    description: 'Soft pastel colors for creative projects',
    category: 'Creative',
    colors: {
      primary: '#ffb3d9',
      secondary: '#b3e5fc',
      accent: '#c5e1a5',
      background: '#f3e5f5',
      text: '#5a5a5a',
    },
    preview: 'pastel-dream',
    features: ['Playful', 'Friendly Feel', 'Modern Design'],
    popular: true,
  },
  {
    id: 'midnight-sky',
    name: 'Midnight Sky',
    description: 'Deep blue dark theme inspired by night sky',
    category: 'Dark',
    colors: {
      primary: '#0a1929',
      secondary: '#1a237e',
      accent: '#42a5f5',
      background: '#121212',
      text: '#e3f2fd',
    },
    preview: 'midnight-sky',
    features: ['Eye-friendly', 'Starry Effects', 'Modern Feel'],
    popular: false,
  },
  {
    id: 'vintage-cream',
    name: 'Vintage Cream',
    description: 'Retro vintage design with warm cream tones',
    category: 'Retro',
    colors: {
      primary: '#8b6f47',
      secondary: '#a0826d',
      accent: '#c9a876',
      background: '#f5f1e8',
      text: '#3e3428',
    },
    preview: 'vintage-cream',
    features: ['Nostalgic', 'Elegant', 'Timeless'],
    popular: false,
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Futuristic neon colors with dark background',
    category: 'Tech',
    colors: {
      primary: '#000000',
      secondary: '#1a1a2e',
      accent: '#00ff88',
      background: '#0a0e27',
      text: '#00ff88',
    },
    preview: 'cyber-neon',
    features: ['Futuristic', 'Gaming Feel', 'High Contrast'],
    popular: true,
  },
  {
    id: 'earthy-brown',
    name: 'Earthy Brown',
    description: 'Natural earth tones for organic brands',
    category: 'Nature',
    colors: {
      primary: '#5d4037',
      secondary: '#795548',
      accent: '#d7ccc8',
      background: '#efebe9',
      text: '#3e2723',
    },
    preview: 'earthy-brown',
    features: ['Natural', 'Warm Feeling', 'Rustic Touch'],
    popular: false,
  },
  {
    id: 'mint-fresh',
    name: 'Mint Fresh',
    description: 'Fresh mint green for health and wellness',
    category: 'Health',
    colors: {
      primary: '#00897b',
      secondary: '#26a69a',
      accent: '#80cbc4',
      background: '#e0f2f1',
      text: '#004d40',
    },
    preview: 'mint-fresh',
    features: ['Health-focused', 'Calming', 'Clean Design'],
    popular: true,
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    description: 'Premium black and gold design for luxury',
    category: 'Luxury',
    colors: {
      primary: '#1a1a1a',
      secondary: '#2a2a2a',
      accent: '#d4af37',
      background: '#f5f5f0',
      text: '#1a1a1a',
    },
    preview: 'luxury-gold',
    features: ['Premium', 'Elegant', 'High-end'],
    popular: true,
  },
  {
    id: 'gradient-pop',
    name: 'Gradient Pop',
    description: 'Vibrant gradient colors for modern brands',
    category: 'Modern',
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      background: '#f5f7fa',
      text: '#2d3748',
    },
    preview: 'gradient-pop',
    features: ['Vibrant Gradients', 'Modern UI', 'Animated Elements'],
    popular: true,
  },
  {
    id: 'slate-gray',
    name: 'Slate Gray',
    description: 'Professional gray tones for corporate brands',
    category: 'Corporate',
    colors: {
      primary: '#455a64',
      secondary: '#546e7a',
      accent: '#90a4ae',
      background: '#eceff1',
      text: '#263238',
    },
    preview: 'slate-gray',
    features: ['Professional', 'Trustworthy', 'Neutral Tones'],
    popular: false,
  },
];

export function getThemeById(id: string): Theme | undefined {
  return themes.find(theme => theme.id === id);
}

export function getThemesByCategory(category: string): Theme[] {
  return themes.filter(theme => theme.category === category);
}

export function getPopularThemes(): Theme[] {
  return themes.filter(theme => theme.popular).slice(0, 6);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(themes.map(theme => theme.category)));
}
