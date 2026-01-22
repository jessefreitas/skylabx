/**
 * 🔒 VORTEX DESIGN SYSTEM - PROTECTED COMPONENT
 * 
 * Standard navbar based on VORTEX reference
 * DO NOT MODIFY - This is the official navbar for all pages
 */

'use client';

import { cn } from '@/lib/vortex-design';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Stack Auditor', href: '/stack-auditor' },
  { name: 'Code Analysis', href: '/code-analysis' },
  { name: 'Monitor', href: '/monitor' },
];

export function VortexNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-black text-lg font-bold">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight">SkyLabX</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors',
                pathname === item.href
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Log In
          </button>
          <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5">
            Start Free
          </button>
        </div>
      </div>
    </nav>
  );
}
