/**
 * 🎨 CRYPTGEN DESIGN TOKENS - OMNIFORGE ECOSYSTEM
 * 
 * Design System de Referência: Aceternity UI - CryptGen Template
 * Status: PROTECTED (Não modificar sem ADR)
 * 
 * @see /brain/cryptgen_ui_documentation.md
 */

export const tokens = {
  colors: {
    // Backgrounds
    bg: {
      primary: '#000000',              // Deep Black - Base
      secondary: '#111111',            // Neutral Dark - Cards
      tertiary: '#0A0A0A',            // Subtle variation
      card: 'rgb(17 17 17 / 0.5)',    // With backdrop-blur
      cardSolid: '#111111',
    },

    // Text
    text: {
      primary: '#FFFFFF',              // Chalk White
      secondary: '#A1A1AA',            // Muted Silver/Gray
      tertiary: '#71717A',             // Dimmed for captions
    },

    // Accents
    accent: {
      primary: '#3B82F6',              // Blue
      hover: '#60A5FA',                // Blue-400
      gradientStart: '#4F46E5',        // Indigo
      gradientEnd: '#06B6D4',          // Cyan
    },

    // Borders
    border: {
      default: 'rgb(255 255 255 / 0.1)',
      hover: 'rgb(255 255 255 / 0.2)',
      highlight: '#3F3F46',
      subtle: '#27272A',
    },

    // Special Effects
    glow: {
      primary: 'rgba(59, 130, 246, 0.5)',
      strong: 'rgba(59, 130, 246, 0.8)',
    },

    // Status Colors (aligned with blue palette)
    status: {
      active: {
        bg: 'rgb(59 130 246 / 0.2)',
        text: '#60A5FA',
        border: 'rgb(59 130 246 / 0.3)',
      },
      pending: {
        bg: 'rgb(113 113 122 / 0.5)',
        text: '#A1A1AA',
        border: 'rgb(113 113 122 / 0.3)',
      },
    }
  },

  spacing: {
    // Base unit: 4px
    px: {
      '1': '0.25rem',   // 4px
      '2': '0.5rem',    // 8px
      '3': '0.75rem',   // 12px
      '4': '1rem',      // 16px
      '6': '1.5rem',    // 24px
      '8': '2rem',      // 32px
      '12': '3rem',     // 48px
      '16': '4rem',     // 64px
      '24': '6rem',     // 96px
      '32': '8rem',     // 128px
    },

    // Semantic spacing
    card: {
      padding: '2rem',        // 32px
      gap: '1.5rem',          // 24px
    },
    section: {
      py: '8rem',             // 128px
      pyMobile: '4rem',       // 64px
    },
    hero: {
      py: '12rem',            // 192px
      pyMobile: '6rem',       // 96px
    },
  },

  radius: {
    sm: '0.375rem',   // 6px - Small elements
    md: '0.5rem',     // 8px - Buttons
    lg: '0.75rem',    // 12px - Medium containers
    xl: '1rem',       // 16px - Large containers
    '2xl': '1.5rem',  // 24px - Cards (PADRÃO)
    full: '9999px',   // Fully rounded
  },

  effects: {
    blur: {
      sm: 'blur(8px)',
      md: 'blur(12px)',
      lg: 'blur(16px)',
    },
    shadow: {
      glow: '0 0 30px rgba(59, 130, 246, 0.6)',
      glowStrong: '0 0 40px rgba(59, 130, 246, 0.8)',
      card: '0 0 20px rgba(0, 0, 0, 0.3)',
      cardHover: '0 10px 40px rgba(59, 130, 246, 0.1)',
    },
  },

  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },

  typography: {
    fontFamily: {
      sans: "'Inter', 'Geist', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    fontSize: {
      display: 'clamp(3rem, 8vw, 5rem)',  // Hero titles
      h1: '2.25rem',                      // 36px - Section headers
      h2: '1.875rem',                     // 30px - Subsections
      h3: '1.5rem',                       // 24px - Card titles
      body: '1rem',                       // 16px - Paragraph
      caption: '0.875rem',                // 14px - Helper text
      tiny: '0.75rem',                    // 12px - Badges
    },
    lineHeight: {
      tight: '1.1',      // Display
      normal: '1.5',     // Body
      relaxed: '1.75',   // Long-form
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
} as const;

// Type exports for TypeScript
export type Tokens = typeof tokens;
export type ColorPalette = typeof tokens.colors;
export type SpacingScale = typeof tokens.spacing;
