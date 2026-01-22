/**
 * 🎨 VORTEX DESIGN SYSTEM - IMMUTABLE STANDARDS
 * 
 * ⚠️ PROTECTED: These are the definitive design tokens for OmniForge DevOps
 * Based on VORTEX platform reference (21 Jan 2026)
 * 
 * DO NOT MODIFY without explicit approval
 */

export const vortexColors = {
  // Primary (White-based system)
  primary: '#ffffff',

  // Backgrounds
  backgroundLight: '#f8fafc',
  backgroundDark: '#0a0a0a',

  // Surfaces (Glass cards)
  surface: 'rgba(17, 17, 17, 0.8)',
  surfaceBorder: 'rgba(255, 255, 255, 0.08)',

  // Text hierarchies
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.4)',
  textMuted: '#64748b', // slate-500

  // Status colors
  success: '#10b981', // emerald-500
  warning: '#f59e0b', // amber-500
  error: '#ef4444',   // red-500
  info: '#3b82f6',    // blue-500
} as const;

export const vortexRadius = {
  sm: '0.5rem',    // 8px
  DEFAULT: '0.75rem', // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  full: '9999px',
} as const;

export const vortexSpacing = {
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem',     // 48px
  '2xl': '4rem',  // 64px
} as const;

/**
 * VORTEX Typography System
 */
export const vortexTypography = {
  // Display (Hero titles)
  display: 'text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1]',

  // Headings
  h1: 'text-4xl md:text-5xl font-bold tracking-tight',
  h2: 'text-3xl md:text-4xl font-bold',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-semibold',

  // Body
  body: 'text-base leading-relaxed',
  bodyLarge: 'text-lg md:text-xl leading-relaxed',

  // Small
  caption: 'text-sm text-slate-400',
  tiny: 'text-xs text-slate-500',

  // Special
  mono: 'font-mono text-xs',
  uppercase: 'text-xs font-bold uppercase tracking-wider',
} as const;

/**
 * VORTEX Gradient Definitions
 */
export const vortexGradients = {
  // Main text gradient (white fade)
  text: 'bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent',

  // Surface gradients
  surfaceLight: 'bg-gradient-to-b from-white/10 to-transparent',

  // Glow effects
  glowWhite: 'shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]',
} as const;

/**
 * VORTEX Glass Effects
 */
export const vortexGlass = {
  card: 'bg-[rgba(17,17,17,0.8)] backdrop-blur-xl border border-white/8',
  navbar: 'bg-black/80 backdrop-blur-md border-b border-white/5',
  button: 'bg-white/5 border border-white/10 backdrop-blur-sm',
  icon: 'bg-white/5 border border-white/10 backdrop-blur-lg',
} as const;

/**
 * VORTEX Background Patterns
 */
export const vortexPatterns = {
  grid: {
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
  },
  dots: {
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  },
} as const;

/**
 * Utility function for className concatenation
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Helper to apply VORTEX gradient text
 */
export function vortexGradientText(customClasses?: string): string {
  return cn(vortexGradients.text, customClasses);
}
