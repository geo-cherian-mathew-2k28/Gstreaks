'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  Sparkles,
  Palette,
  Terminal,
  Zap,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  ArrowRight,
  Smile,
  Layers,
  Heart,
} from 'lucide-react';
import { THEMES } from '@/lib/themes';
import { MASCOTS } from '@/lib/mascots/mascots';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'classic' | 'terminal' | 'glass' | 'graph' | 'compact'>('classic');
  const [activeTheme, setActiveTheme] = useState('tokyo-night');
  const [previewUser, setPreviewUser] = useState('torvalds');

  const cardUrl = `/api?user=${previewUser}&theme=${activeTheme}&layout=${activeTab}&animation=true`;
  const markdownSnippet = `![${previewUser}'s GeoStreak](https://geostreak.vercel.app/api?user=${previewUser}&theme=${activeTheme}&layout=${activeTab})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-16 sm:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Ambient background glow orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-purple-600/20 via-pink-600/15 to-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs sm:text-sm font-medium mb-8">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Next-Generation Animated GitHub Streak Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="text-purple-400/80">100% Free &amp; Open Source</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Your GitHub Journey,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">
            Beautifully Visualized.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-streak-muted max-w-2xl mx-auto leading-relaxed">
          Turn your daily contributions into beautiful, customizable, animated SVG streak cards and cute mascots that embed seamlessly into your GitHub profile README.
        </p>

        {/* Hero CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-5 h-5" />
            Create Your Card
          </Link>
          <Link
            href="/themes"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-semibold text-streak-text bg-streak-surface hover:bg-streak-surfaceHover border border-streak-border transition-all"
          >
            <Palette className="w-5 h-5 text-purple-400" />
            Explore 15+ Themes
          </Link>
        </div>

        {/* Interactive Live Hero Showcase */}
        <div className="mt-16 max-w-4xl mx-auto">
          {/* Layout Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-streak-surface/70 border border-streak-border/80 rounded-2xl backdrop-blur-md mb-6 w-fit mx-auto">
            {(['classic', 'terminal', 'glass', 'graph', 'compact'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-streak-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Theme Quick Bar */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-xs text-streak-muted">Quick Theme:</span>
            {['tokyo-night', 'cyberpunk', 'dracula', 'sakura', 'midnight-galaxy', 'nord'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTheme(t)}
                className={`w-6 h-6 rounded-full border transition-all ${
                  activeTheme === t ? 'scale-125 border-white ring-2 ring-purple-500' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
                style={{ backgroundColor: THEMES[t]?.primary || '#8B5CF6' }}
                title={THEMES[t]?.name}
              />
            ))}
          </div>

          {/* Live Card Render Box */}
          <div className="p-4 sm:p-8 rounded-3xl bg-streak-surface/40 border border-streak-border/80 shadow-2xl backdrop-blur-xl relative group">
            <div className="flex items-center justify-center overflow-x-auto py-4">
              <img
                src={cardUrl}
                alt="GeoStreak Live Preview"
                className="max-w-full drop-shadow-2xl rounded-xl transition-all duration-300"
              />
            </div>

            {/* Quick Markdown Copy Floating Bar */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-streak-border/40 text-xs">
              <div className="flex items-center gap-2 text-streak-muted font-mono truncate max-w-md">
                <span className="text-purple-400 font-bold">$</span>
                <span className="truncate">{markdownSnippet}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied Snippet!' : 'Copy Markdown'}
                </button>
                <a
                  href={cardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-streak-muted hover:text-white bg-streak-surface border border-streak-border/80"
                  title="Open SVG in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MASCOTS INTRO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Smile className="w-3.5 h-3.5" />
            Signature Mascots
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Meet the GeoStreak Squad
          </h2>
          <p className="mt-3 text-base sm:text-lg text-streak-muted">
            Original, animated characters that dynamically react to your streak length with sleeping, smiling, celebrating, and legendary expressions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {Object.values(MASCOTS).map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-streak-surface/50 border border-streak-border/70 hover:border-purple-500/40 transition-all flex flex-col items-center text-center group hover:-translate-y-1"
            >
              <div className="w-20 h-20 mb-3 flex items-center justify-center">
                <img
                  src={`/api?user=torvalds&mascot=${m.id}&layout=compact&hide_border=true&hide_title=true`}
                  alt={m.name}
                  className="w-16 h-16 object-contain filter group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="font-bold text-white text-base">{m.name}</h3>
              <p className="text-xs text-purple-400 font-medium mb-1.5">{m.tagline}</p>
              <p className="text-[11px] text-streak-muted line-clamp-2 leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineered for Modern Developers
          </h2>
          <p className="mt-3 text-base sm:text-lg text-streak-muted">
            High performance, zero dependencies for users, and rock-solid compatibility with GitHub README image caching proxies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-streak-surface/60 border border-streak-border/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Accurate Streak Algorithms</h3>
            <p className="text-sm text-streak-muted leading-relaxed">
              Independently calculates current consecutive active days, longest historical streaks, and total contributions, correctly accounting for multi-timezone buffers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-streak-surface/60 border border-streak-border/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">GitHub Camo Proxy Safe</h3>
            <p className="text-sm text-streak-muted leading-relaxed">
              Generates standalone, sanitized SVG markup with embedded keyframes. No external script dependencies or unsafe elements. Works flawlessly in README files.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-streak-surface/60 border border-streak-border/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">7 Distinct Card Layouts</h3>
            <p className="text-sm text-streak-muted leading-relaxed">
              From the iconic Classic card to Developer Terminal, Minimalist bar, GitHub Heatmap Graph, Glassmorphism, and Ultra-Compact horizontal header cards.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-streak-surface to-streak-dark border border-streak-border/80 relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-10">
            How It Works In 3 Simple Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-white text-base">Enter Your Username</h4>
              <p className="text-xs sm:text-sm text-streak-muted">
                Type any valid public GitHub username. No signups, API keys, or personal tokens needed.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 text-pink-400 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-white text-base">Pick Layout &amp; Theme</h4>
              <p className="text-xs sm:text-sm text-streak-muted">
                Choose your favorite layout, cute mascot companion, colors, and toggle animations.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 text-amber-400 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-white text-base">Paste in README</h4>
              <p className="text-xs sm:text-sm text-streak-muted">
                Copy the generated Markdown snippet directly into your GitHub profile `README.md`.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/25"
            >
              Open Studio Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
