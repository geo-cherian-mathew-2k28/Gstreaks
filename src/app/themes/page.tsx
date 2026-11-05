import Link from 'next/link';
import { Palette, Sparkles, ArrowRight } from 'lucide-react';
import { THEMES } from '@/lib/themes';

export default function ThemesPage() {
  const themesList = Object.values(THEMES);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <Palette className="w-3.5 h-3.5" />
          Theme Collection
        </div>
        <h1 className="text-4xl font-extrabold text-white">
          Handcrafted Visual Themes
        </h1>
        <p className="text-streak-muted text-base">
          Explore over 15 carefully curated color palettes designed for developer aesthetics, cyberpunk vibes, pastel minimalism, and vibrant gradients.
        </p>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {themesList.map((theme) => (
          <div
            key={theme.id}
            className="p-5 rounded-3xl bg-streak-surface/60 border border-streak-border/80 hover:border-purple-500/40 transition-all flex flex-col justify-between group shadow-lg hover:shadow-purple-500/10"
          >
            <div className="space-y-4">
              {/* Live Preview of Theme */}
              <div className="overflow-hidden rounded-2xl bg-black/30 p-2 flex items-center justify-center">
                <img
                  src={`/api?user=torvalds&theme=${theme.id}&layout=compact&hide_border=true`}
                  alt={`${theme.name} theme preview`}
                  loading="lazy"
                  className="w-full max-w-full drop-shadow-md rounded-xl group-hover:scale-102 transition-transform"
                />
              </div>

              {/* Theme Details */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                    {theme.name}
                  </h3>
                  <span className="text-xs uppercase font-mono tracking-wider text-streak-muted">
                    {theme.category} • {theme.isDark ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-streak-muted uppercase font-semibold">Palette:</span>
                <div className="flex items-center gap-2">
                  {[theme.background, theme.surface, theme.primary, theme.secondary, theme.accent, theme.flame].map(
                    (color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-streak-border/50">
              <Link
                href={`/studio?theme=${theme.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-md shadow-purple-600/20"
              >
                <Sparkles className="w-4 h-4" />
                Use {theme.name} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
