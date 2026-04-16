export const themeTokens = {
  light: {
    primary: '#6366f1',
    secondary: '#f3f4f6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
    surface: '#f8fafc',
    background: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    shadowLight: '#ffffff',
    shadowDark: '#cbd5e1',
  },
  dark: {
    primary: '#818cf8',
    secondary: '#1f2937',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
    info: '#60a5fa',
    surface: '#1e293b',
    background: '#0f172a',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#374151',
    shadowLight: '#334155',
    shadowDark: '#020617',
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
};

export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
};

export const neumorphicShadows = {
  light: {
    default: '8px 8px 16px #C5C5C5, -8px -8px 16px #FFFFFF',
    hover: '12px 12px 20px #C5C5C5, -12px -12px 20px #FFFFFF',
    pressed: 'inset 6px 6px 12px #C5C5C5, inset -6px -6px 12px #FFFFFF',
  },
  dark: {
    default: '8px 8px 16px #0A0A0A, -8px -8px 16px #2A2A2A',
    hover: '12px 12px 20px #0A0A0A, -12px -12px 20px #2A2A2A',
    pressed: 'inset 6px 6px 12px #0A0A0A, inset -6px -6px 12px #2A2A2A',
  },
};

export type ThemeMode = 'light' | 'dark';
export type ThemeTokens = typeof themeTokens.light;
