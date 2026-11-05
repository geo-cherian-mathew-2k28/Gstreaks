'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Sparkles, Palette, Smile, BookOpen, Info } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/studio', label: 'Studio', icon: Sparkles },
    { href: '/themes', label: 'Themes', icon: Palette },
    { href: '/mascots', label: 'Mascots', icon: Smile },
    { href: '/docs', label: 'Docs', icon: BookOpen },
    { href: '/about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-streak-border/80 bg-streak-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
            Geo<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Streak</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-white bg-streak-surface border border-purple-500/30'
                    : 'text-streak-muted hover:text-white hover:bg-streak-surface/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-purple-400' : 'text-streak-muted'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md shadow-purple-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4" />
            Create Card
          </Link>
          <a
            href="https://github.com/geo-cherian-mathew-2k28/geostreak"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-streak-muted hover:text-white hover:bg-streak-surface transition-colors"
            title="GitHub Repository"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
