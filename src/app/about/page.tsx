import Link from 'next/link';
import { Info, Heart, Flame, Code2, Globe, ShieldCheck, Sparkles } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <Info className="w-3.5 h-3.5" />
          About GeoStreak
        </div>
        <h1 className="text-4xl font-extrabold text-white">
          Empowering Developers Worldwide
        </h1>
        <p className="text-streak-muted text-base max-w-2xl mx-auto">
          GeoStreak was built from the ground up as a modern, reliable, and delightful open-source alternative to existing streak statistics cards.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="p-8 rounded-3xl bg-streak-surface/60 border border-streak-border space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-500" />
          The Mission
        </h2>
        <p className="text-sm text-streak-muted leading-relaxed">
          Daily coding is a habit of persistence and passion. GitHub profile READMEs are a developer&apos;s digital identity and calling card.
          Too often, developers have had to rely on legacy generators that suffer from downtime, generic visuals, or lack character.
        </p>
        <p className="text-sm text-streak-muted leading-relaxed">
          GeoStreak was engineered to solve this by providing:
        </p>
        <ul className="list-disc list-inside text-sm text-streak-muted space-y-1.5 pl-2">
          <li><strong>Zero Mandatory Registration:</strong> Anyone on GitHub can embed their card with a single image URL.</li>
          <li><strong>Original Mascot Companions:</strong> 6 dynamic characters that react to your consistency.</li>
          <li><strong>High Reliability:</strong> In-memory and distributed caching, token rotation, and safe fallbacks.</li>
          <li><strong>Security First:</strong> Strict sanitization preventing XML/SVG injection and safe for GitHub Camo.</li>
        </ul>
      </div>

      {/* Tech Stack Highlights */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-400" />
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-streak-surface/40 border border-streak-border space-y-1">
            <h4 className="font-bold text-white text-sm">Next.js 15 &amp; React 19</h4>
            <p className="text-xs text-streak-muted">Full-stack App Router architecture unifying the SVG API and interactive studio.</p>
          </div>
          <div className="p-4 rounded-2xl bg-streak-surface/40 border border-streak-border space-y-1">
            <h4 className="font-bold text-white text-sm">Dynamic SVG Engine</h4>
            <p className="text-xs text-streak-muted">Pure vector graphics with embedded CSS keyframe animations and static fallback.</p>
          </div>
          <div className="p-4 rounded-2xl bg-streak-surface/40 border border-streak-border space-y-1">
            <h4 className="font-bold text-white text-sm">GitHub GraphQL API</h4>
            <p className="text-xs text-streak-muted">Official GraphQL query engine with token pooling and public scraping fallback.</p>
          </div>
          <div className="p-4 rounded-2xl bg-streak-surface/40 border border-streak-border space-y-1">
            <h4 className="font-bold text-white text-sm">Multi-Tier Caching</h4>
            <p className="text-xs text-streak-muted">LRU cache with in-flight deduplication and optional Upstash Redis integration.</p>
          </div>
        </div>
      </div>

      {/* Open Source & Community */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-500/30 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center mx-auto text-purple-400">
          <Globe className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">100% Free &amp; Open Source</h3>
        <p className="text-sm text-streak-muted max-w-lg mx-auto">
          GeoStreak is licensed under the MIT License and maintained for the open-source community by Geo Cherian Mathew.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <a
            href="https://github.com/geo-cherian-mathew-2k28/Gstreaks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30"
          >
            <GithubIcon className="w-4 h-4" /> View On GitHub
          </a>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-streak-text bg-streak-surface hover:bg-streak-surfaceHover border border-streak-border transition-colors"
          >
            <Sparkles className="w-4 h-4 text-purple-400" /> Open Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
