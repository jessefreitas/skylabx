/**
 * 🧭 NAVBAR COMPONENT - CRYPTGEN STANDARD
 * 
 * Navigation bar with glassmorphism and blur effect
 * Status: PROTECTED
 */

'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/stack-auditor', label: 'Stack Auditor' },
    { href: '/code-analysis', label: 'Code Analysis' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              SkyLabX
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-blue-400'
                      : 'text-zinc-300 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button variant="primary" size="sm" glow>
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
