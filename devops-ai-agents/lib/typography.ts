/**
 * 📝 TYPOGRAPHY UTILITIES - CRYPTGEN DESIGN SYSTEM
 * 
 * Utility classes for consistent typography hierarchy
 * @see /brain/cryptgen_ui_documentation.md
 */


/**
 * Typography variants following CryptGen hierarchy
 */
export const typography = {
  // Display (Hero titles - largest)
  display: `text-6xl md:text-8xl font-bold leading-tight`,

  // Headings
  h1: `text-4xl font-semibold leading-tight`,
  h2: `text-3xl font-semibold leading-tight`,
  h3: `text-2xl font-semibold leading-normal`,
  h4: `text-xl font-semibold leading-normal`,

  // Body text
  body: `text-base font-normal leading-normal`,
  bodyLarge: `text-lg font-normal leading-relaxed`,

  // Small text
  caption: `text-sm font-normal leading-normal text-zinc-400`,
  tiny: `text-xs font-normal leading-normal text-zinc-500`,

  // Special
  code: `font-mono text-sm bg-zinc-800/50 px-2 py-1 rounded`,
} as const;

/**
 * Gradient text effect (CryptGen signature style)
 */
export const gradientText = `bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent`;

/**
 * Responsive text sizes
 */
export const responsiveText = {
  hero: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`,
  title: `text-2xl sm:text-3xl md:text-4xl`,
  subtitle: `text-lg sm:text-xl md:text-2xl`,
} as const;

/**
 * Helper function to combine typography with custom classes
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
