'use client';

import { useState, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Download,
  Palette,
  Smile,
  Sliders,
  Layers,
  Eye,
  RefreshCw,
  Code2,
  Terminal,
} from 'lucide-react';
import { THEMES } from '@/lib/themes';
import { MASCOTS } from '@/lib/mascots/mascots';
import { CardLayoutId } from '@/lib/svg/types';
import { MascotId, MascotExpression } from '@/lib/mascots/types';

export default function StudioPage() {
  // Primary configuration state
  const [username, setUsername] = useState('geo-cherian-mathew-2k28');
  const [inputUser, setInputUser] = useState('geo-cherian-mathew-2k28');
  const [layout, setLayout] = useState<CardLayoutId>('classic');
  const [theme, setTheme] = useState('tokyo-night');
  const [mascot, setMascot] = useState<MascotId>('streaky');
  const [expression, setExpression] = useState<string>('auto');
  const [animation, setAnimation] = useState(true);

  // Appearance controls
  const [hideBorder, setHideBorder] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);
  const [hideCurrentStreak, setHideCurrentStreak] = useState(false);
  const [hideLongestStreak, setHideLongestStreak] = useState(false);
  const [hideTotalContributions, setHideTotalContributions] = useState(false);
  const [radius, setRadius] = useState(14);

  // Custom colors
  const [useCustomColors, setUseCustomColors] = useState(false);
  const [customBg, setCustomBg] = useState('#0D1117');
  const [customBorder, setCustomBorder] = useState('#30363D');
  const [customText, setCustomText] = useState('#F8FAFC');

  // UI state
  const [activeCodeTab, setActiveCodeTab] = useState<'markdown' | 'html' | 'url'>('markdown');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Construct URL
  const queryParams = new URLSearchParams();
  queryParams.set('user', username.trim() || 'torvalds');
  if (theme !== 'tokyo-night') queryParams.set('theme', theme);
  if (layout !== 'classic') queryParams.set('layout', layout);
  if (mascot !== 'streaky') queryParams.set('mascot', mascot);
  if (expression !== 'auto') queryParams.set('expression', expression);
  if (!animation) queryParams.set('animation', 'false');
  if (hideBorder) queryParams.set('hide_border', 'true');
  if (hideTitle) queryParams.set('hide_title', 'true');
  if (hideCurrentStreak) queryParams.set('hide_current_streak', 'true');
  if (hideLongestStreak) queryParams.set('hide_longest_streak', 'true');
  if (hideTotalContributions) queryParams.set('hide_total_contributions', 'true');
  if (radius !== 14) queryParams.set('radius', String(radius));

  if (useCustomColors) {
    if (customBg) queryParams.set('background', customBg.replace('#', ''));
    if (customBorder) queryParams.set('border', customBorder.replace('#', ''));
    if (customText) queryParams.set('text', customText.replace('#', ''));
  }

  const queryString = queryParams.toString();
  const apiPath = `/api?${queryString}`;
  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${apiPath}`
    : `https://geostreak.vercel.app${apiPath}`;

  const markdownCode = `![${username}'s GeoStreak](${fullUrl})`;
  const htmlCode = `<img src="${fullUrl}" alt="${username}'s GitHub Streak" />`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUser.trim()) {
      setIsLoading(true);
      setUsername(inputUser.trim());
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-streak-border/60 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-purple-400" />
            GeoStreak Studio
          </h1>
          <p className="text-streak-muted text-sm mt-1">
            Customize, preview, and generate production-ready GitHub contribution streak cards.
          </p>
        </div>

        {/* Quick User Fetch Form */}
        <form onSubmit={handleUserSubmit} className="flex items-center gap-2 max-w-sm w-full">
          <input
            type="text"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
            placeholder="GitHub username..."
            className="flex-1 bg-streak-surface border border-streak-border rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Apply
          </button>
        </form>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Card Preview & Code Export (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-streak-surface/60 border border-streak-border shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-streak-border/40">
              <span className="text-xs font-semibold uppercase tracking-wider text-streak-muted flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-purple-400" />
                Live Card Preview
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={apiPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-streak-muted hover:text-white px-2.5 py-1 rounded-lg bg-streak-surface border border-streak-border"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open SVG
                </a>
                <a
                  href={apiPath}
                  download={`geostreak-${username}.svg`}
                  className="inline-flex items-center gap-1 text-xs text-streak-muted hover:text-white px-2.5 py-1 rounded-lg bg-streak-surface border border-streak-border"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
              </div>
            </div>

            {/* Rendered Live Card */}
            <div className="flex items-center justify-center p-4 min-h-[240px] overflow-x-auto bg-black/20 rounded-2xl">
              <img
                src={apiPath}
                alt="GeoStreak Live Preview"
                key={apiPath}
                className="max-w-full drop-shadow-xl transition-all"
              />
            </div>
          </div>

          {/* Snippet Export Box */}
          <div className="p-6 rounded-3xl bg-streak-surface/60 border border-streak-border shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-white">Embed in GitHub README</span>
              </div>
              <div className="flex items-center gap-1 bg-streak-surface p-1 rounded-xl border border-streak-border">
                {(['markdown', 'html', 'url'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      activeCodeTab === tab
                        ? 'bg-purple-600 text-white'
                        : 'text-streak-muted hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-xl bg-black/50 border border-streak-border/80 text-xs font-mono text-purple-200 overflow-x-auto break-all whitespace-pre-wrap">
                {activeCodeTab === 'markdown' ? markdownCode : activeCodeTab === 'html' ? htmlCode : fullUrl}
              </pre>
              <button
                onClick={() =>
                  handleCopy(
                    activeCodeTab === 'markdown' ? markdownCode : activeCodeTab === 'html' ? htmlCode : fullUrl
                  )
                }
                className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-md transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-streak-surface/60 border border-streak-border shadow-xl space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-streak-border/50 pb-3">
              <Sliders className="w-4 h-4 text-purple-400" />
              Card Settings
            </h2>

            {/* 1. Layout Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-streak-muted flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Card Layout
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'classic', label: 'Classic' },
                  { id: 'minimal', label: 'Minimal' },
                  { id: 'graph', label: 'Graph' },
                  { id: 'mascot', label: 'Mascot' },
                  { id: 'terminal', label: 'Terminal' },
                  { id: 'glass', label: 'Glass' },
                  { id: 'compact', label: 'Compact' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLayout(l.id as CardLayoutId)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      layout === l.id
                        ? 'bg-purple-600/20 border-purple-500 text-white font-bold'
                        : 'bg-streak-surface border-streak-border text-streak-muted hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Theme Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-streak-muted flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-purple-400" />
                Theme ({Object.keys(THEMES).length} Available)
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-streak-surface border border-streak-border rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {Object.values(THEMES).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Mascot & Expression Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-streak-muted flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-purple-400" />
                  Mascot
                </label>
                <select
                  value={mascot}
                  onChange={(e) => setMascot(e.target.value as MascotId)}
                  className="w-full bg-streak-surface border border-streak-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  {Object.values(MASCOTS).map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-streak-muted">
                  Expression
                </label>
                <select
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  className="w-full bg-streak-surface border border-streak-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="auto">Auto (Streak Reactive)</option>
                  <option value="idle">Idle</option>
                  <option value="happy">Happy</option>
                  <option value="excited">Excited</option>
                  <option value="sleeping">Sleeping</option>
                  <option value="surprised">Surprised</option>
                  <option value="celebrating">Celebrating</option>
                  <option value="determined">Determined</option>
                </select>
              </div>
            </div>

            {/* 4. Toggles & Visibility */}
            <div className="space-y-3 pt-2 border-t border-streak-border/40">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-medium">Animations</span>
                <input
                  type="checkbox"
                  checked={animation}
                  onChange={(e) => setAnimation(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 accent-purple-600"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-medium">Hide Border</span>
                <input
                  type="checkbox"
                  checked={hideBorder}
                  onChange={(e) => setHideBorder(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 accent-purple-600"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-medium">Hide Title Header</span>
                <input
                  type="checkbox"
                  checked={hideTitle}
                  onChange={(e) => setHideTitle(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 accent-purple-600"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-medium">Hide Current Streak</span>
                <input
                  type="checkbox"
                  checked={hideCurrentStreak}
                  onChange={(e) => setHideCurrentStreak(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 accent-purple-600"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-medium">Hide Longest Streak</span>
                <input
                  type="checkbox"
                  checked={hideLongestStreak}
                  onChange={(e) => setHideLongestStreak(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 accent-purple-600"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-medium">Hide Total Commits</span>
                <input
                  type="checkbox"
                  checked={hideTotalContributions}
                  onChange={(e) => setHideTotalContributions(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 accent-purple-600"
                />
              </div>
            </div>

            {/* 5. Corner Radius Slider */}
            <div className="space-y-2 pt-2 border-t border-streak-border/40">
              <div className="flex items-center justify-between text-xs">
                <span className="text-streak-muted font-semibold uppercase">Corner Radius</span>
                <span className="font-mono text-purple-400">{radius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value, 10))}
                className="w-full accent-purple-600"
              />
            </div>

            {/* 6. Custom Color Overrides */}
            <div className="space-y-3 pt-2 border-t border-streak-border/40">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-medium">Custom Color Overrides</span>
                <input
                  type="checkbox"
                  checked={useCustomColors}
                  onChange={(e) => setUseCustomColors(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 accent-purple-600"
                />
              </div>

              {useCustomColors && (
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div>
                    <label className="text-[10px] text-streak-muted uppercase font-bold block mb-1">BG</label>
                    <input
                      type="color"
                      value={customBg}
                      onChange={(e) => setCustomBg(e.target.value)}
                      className="w-full h-8 rounded bg-transparent cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-streak-muted uppercase font-bold block mb-1">Border</label>
                    <input
                      type="color"
                      value={customBorder}
                      onChange={(e) => setCustomBorder(e.target.value)}
                      className="w-full h-8 rounded bg-transparent cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-streak-muted uppercase font-bold block mb-1">Text</label>
                    <input
                      type="color"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="w-full h-8 rounded bg-transparent cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
