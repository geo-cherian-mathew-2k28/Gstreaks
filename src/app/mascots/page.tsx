'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Smile, Sparkles, ArrowRight, Award, Flame, Heart } from 'lucide-react';
import { MASCOTS } from '@/lib/mascots/mascots';
import { MascotId, MascotExpression } from '@/lib/mascots/types';

export default function MascotsPage() {
  const [selectedExpression, setSelectedExpression] = useState<MascotExpression>('happy');
  const expressions: MascotExpression[] = ['idle', 'happy', 'excited', 'sleeping', 'surprised', 'celebrating', 'determined'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider">
          <Smile className="w-3.5 h-3.5" />
          The Mascot System
        </div>
        <h1 className="text-4xl font-extrabold text-white">
          Meet Your Coding Companions
        </h1>
        <p className="text-streak-muted text-base">
          Original animated characters that cheer for your daily progress, celebrate milestones, and unlock legendary crowns as your streak grows.
        </p>

        {/* Global Expression Switcher */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-streak-muted font-semibold uppercase mr-2">Preview Expression:</span>
          {expressions.map((exp) => (
            <button
              key={exp}
              onClick={() => setSelectedExpression(exp)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                selectedExpression === exp
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                  : 'bg-streak-surface border border-streak-border text-streak-muted hover:text-white'
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Mascot Squad Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(MASCOTS).map((m) => (
          <div
            key={m.id}
            className="p-6 rounded-3xl bg-streak-surface/60 border border-streak-border/80 hover:border-pink-500/40 transition-all flex flex-col justify-between group shadow-xl hover:shadow-pink-500/10 relative overflow-hidden"
          >
            <div className="space-y-6">
              {/* Mascot Interactive Showcase */}
              <div className="p-8 rounded-2xl bg-black/30 border border-streak-border/40 flex items-center justify-center min-h-[160px]">
                <img
                  src={`/api?user=torvalds&mascot=${m.id}&expression=${selectedExpression}&layout=compact&hide_border=true&hide_title=true`}
                  alt={m.name}
                  className="w-24 h-24 object-contain filter group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Bio */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl font-extrabold text-white">{m.name}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/15 text-pink-400 font-semibold border border-pink-500/30">
                    {m.tagline}
                  </span>
                </div>
                <p className="text-sm text-streak-muted leading-relaxed mt-2">
                  {m.description}
                </p>
              </div>

              {/* Signature Colors */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-streak-muted">Identity:</span>
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: m.color }} title="Primary" />
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: m.secondaryColor }} title="Secondary" />
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: m.accentColor }} title="Accent" />
              </div>
            </div>

            {/* CTA to Studio */}
            <div className="mt-8 pt-4 border-t border-streak-border/50">
              <Link
                href={`/studio?mascot=${m.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-pink-600 hover:bg-pink-500 transition-colors shadow-md shadow-pink-600/20"
              >
                <Sparkles className="w-4 h-4" />
                Choose {m.name} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Streak Reactivity Breakdown */}
      <div className="p-8 sm:p-12 rounded-3xl bg-streak-surface/40 border border-streak-border/80 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            Dynamic Streak Level Behaviors
          </h2>
          <p className="text-sm text-streak-muted">
            GeoStreak mascots evolve their visual behavior based on your consecutive day count:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-streak-dark/60 border border-streak-border space-y-1">
            <span className="text-xs font-bold text-streak-muted">0 Days</span>
            <h4 className="font-bold text-white text-sm">Sleepy Expression</h4>
            <p className="text-xs text-streak-muted">Mascot is curled up asleep with floating Zzz particles awaiting your next commit.</p>
          </div>

          <div className="p-4 rounded-xl bg-streak-dark/60 border border-streak-border space-y-1">
            <span className="text-xs font-bold text-amber-400">1 – 3 Days</span>
            <h4 className="font-bold text-white text-sm">Smiling &amp; Cheerful</h4>
            <p className="text-xs text-streak-muted">Warms up with happy blushing cheeks as you initiate your coding streak.</p>
          </div>

          <div className="p-4 rounded-xl bg-streak-dark/60 border border-streak-border space-y-1">
            <span className="text-xs font-bold text-purple-400">4 – 7 Days</span>
            <h4 className="font-bold text-white text-sm">Excited Sparks</h4>
            <p className="text-xs text-streak-muted">Eyes light up with starry highlights celebrating a full week of consistent building.</p>
          </div>

          <div className="p-4 rounded-xl bg-streak-dark/60 border border-streak-border space-y-1">
            <span className="text-xs font-bold text-pink-400">8 – 30 Days</span>
            <h4 className="font-bold text-white text-sm">Celebrating Party</h4>
            <p className="text-xs text-streak-muted">Surrounded by festive sparkle particles and celebration confetti.</p>
          </div>

          <div className="p-4 rounded-xl bg-streak-dark/60 border border-streak-border space-y-1">
            <span className="text-xs font-bold text-cyan-400">31 – 99 Days</span>
            <h4 className="font-bold text-white text-sm">Glowing Celestial Aura</h4>
            <p className="text-xs text-streak-muted">Radiates a luminous cyan celestial halo above the character.</p>
          </div>

          <div className="p-4 rounded-xl bg-streak-dark/60 border border-streak-border space-y-1">
            <span className="text-xs font-bold text-yellow-400">100+ Days</span>
            <h4 className="font-bold text-white text-sm">Legendary Royal Crown</h4>
            <p className="text-xs text-streak-muted">Unlocks a magnificent golden crown with jewel insets for master streaks.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
