/**
 * 🔘 UNIFIED BUTTON COMPONENT - CRYPTGEN STANDARD
 * 
 * Componente unificado seguindo design system CryptGen
 * Status: PROTECTED
 */

import { cn } from '@/lib/typography';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    glow = false,
    className,
    children,
    ...props
  }, ref) => {

    // Base styles (sempre aplicados)
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium
      rounded-lg
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    // Variant styles
    const variantStyles = {
      primary: `
        bg-blue-600 hover:bg-blue-500
        text-white
        border border-transparent
        ${glow ? 'hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105' : ''}
      `,
      secondary: `
        bg-white/10 hover:bg-white/20
        text-white
        border border-white/20 hover:border-white/30
        backdrop-blur-sm
      `,
      ghost: `
        bg-transparent hover:bg-white/10
        text-zinc-300 hover:text-white
        border border-transparent
      `,
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
