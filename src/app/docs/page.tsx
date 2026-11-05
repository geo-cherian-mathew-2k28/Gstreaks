import Link from 'next/link';
import { BookOpen, Terminal, Code2, Cpu, HelpCircle, ShieldCheck, ExternalLink } from 'lucide-react';

export default function DocsPage() {
  const parameters = [
    { name: 'user', type: 'string', required: 'Yes', default: '-', desc: 'Target GitHub username (e.g. torvalds, geo-cherian-mathew-2k28)' },
    { name: 'theme', type: 'string', required: 'No', default: 'tokyo-night', desc: 'Predefined visual theme (15+ options like dracula, cyberpunk, nord)' },
    { name: 'layout', type: 'string', required: 'No', default: 'classic', desc: 'Card layout: classic, minimal, graph, mascot, terminal, glass, compact' },
    { name: 'mascot', type: 'string', required: 'No', default: 'streaky', desc: 'Mascot companion: streaky, gitty, mochi, byte, spark, blob' },
    { name: 'expression', type: 'string', required: 'No', default: 'auto', desc: 'Override expression: idle, happy, excited, sleeping, surprised, celebrating, determined' },
    { name: 'animation', type: 'boolean', required: 'No', default: 'true', desc: 'Enable CSS keyframe animations (set to false for static SVG fallback)' },
    { name: 'hide_border', type: 'boolean', required: 'No', default: 'false', desc: 'Hides the card outer boundary border' },
    { name: 'hide_title', type: 'boolean', required: 'No', default: 'false', desc: 'Hides the top header title and username banner' },
    { name: 'hide_current_streak', type: 'boolean', required: 'No', default: 'false', desc: 'Hides the current streak column' },
    { name: 'hide_longest_streak', type: 'boolean', required: 'No', default: 'false', desc: 'Hides the longest streak column' },
    { name: 'hide_total_contributions', type: 'boolean', required: 'No', default: 'false', desc: 'Hides total commits / contributions' },
    { name: 'background', type: 'hex', required: 'No', default: 'theme.bg', desc: 'Custom background color (hex, e.g. 0d1117 or #0d1117)' },
    { name: 'border', type: 'hex', required: 'No', default: 'theme.border', desc: 'Custom border color' },
    { name: 'text', type: 'hex', required: 'No', default: 'theme.text', desc: 'Custom text color' },
    { name: 'radius', type: 'number', required: 'No', default: '14', desc: 'Card corner radius in pixels (0 to 32)' },
    { name: 'compact', type: 'boolean', required: 'No', default: 'false', desc: 'Shortcut for layout=compact' },
    { name: 'show_graph', type: 'boolean', required: 'No', default: 'false', desc: 'Shortcut for layout=graph (heatmap grid)' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Documentation &amp; API Reference
        </div>
        <h1 className="text-4xl font-extrabold text-white">
          GeoStreak Documentation
        </h1>
        <p className="text-streak-muted text-base leading-relaxed">
          Everything you need to know to integrate animated streak cards into your GitHub profile README, explore the public API, or self-host your own instance.
        </p>
      </div>

      {/* Quick Start */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-purple-400" />
          Quick Start (Embed in 10 Seconds)
        </h2>
        <p className="text-sm text-streak-muted">
          Add the following line to your GitHub profile `README.md`, replacing `YOUR_USERNAME` with your GitHub handle:
        </p>

        <div className="p-4 rounded-2xl bg-streak-surface/70 border border-streak-border font-mono text-xs text-purple-200 overflow-x-auto">
          <code>
            [![GeoStreak](https://geostreak.vercel.app/api?user=YOUR_USERNAME)](https://github.com/geo-cherian-mathew-2k28/geostreak)
          </code>
        </div>
      </section>

      {/* URL Parameters Reference Table */}
      <section id="api-reference" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-pink-400" />
            API Query Parameters Reference
          </h2>
          <p className="text-sm text-streak-muted">
            Endpoint: <code className="text-purple-300 font-mono bg-purple-950/40 px-2 py-0.5 rounded">GET /api?user=&lt;username&gt;</code>
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-streak-border/80">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-streak-surface/90 border-b border-streak-border text-white">
                <th className="p-3 font-bold">Parameter</th>
                <th className="p-3 font-bold">Type</th>
                <th className="p-3 font-bold">Required</th>
                <th className="p-3 font-bold">Default</th>
                <th className="p-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-streak-border/50 bg-streak-dark/50">
              {parameters.map((p) => (
                <tr key={p.name} className="hover:bg-streak-surface/30">
                  <td className="p-3 font-mono font-bold text-purple-400">{p.name}</td>
                  <td className="p-3 font-mono text-streak-muted">{p.type}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.required === 'Yes' ? 'bg-pink-500/20 text-pink-300' : 'bg-gray-800 text-gray-400'
                    }`}>
                      {p.required}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-streak-muted">{p.default}</td>
                  <td className="p-3 text-streak-text">{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Streak Calculation Rules */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          Contribution Counting Rules
        </h2>
        <div className="p-6 rounded-2xl bg-streak-surface/50 border border-streak-border space-y-3 text-sm text-streak-muted leading-relaxed">
          <p>
            <strong className="text-white">Current Streak:</strong> Consecutive days of coding ending on today. If you have not committed yet today, your streak remains active through yesterday (giving you until midnight in your local timezone to commit before it breaks).
          </p>
          <p>
            <strong className="text-white">Longest Streak:</strong> The all-time maximum sequence of consecutive days with at least 1 contribution in your recorded calendar.
          </p>
          <p>
            <strong className="text-white">Total Contributions:</strong> The exact sum of commits, pull requests, issues, and code reviews recorded by GitHub.
          </p>
        </div>
      </section>

      {/* Self-Hosting Guide */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          Self-Hosting with Docker
        </h2>
        <p className="text-sm text-streak-muted">
          GeoStreak can be self-hosted anywhere with Docker in seconds:
        </p>

        <div className="p-4 rounded-2xl bg-streak-surface/70 border border-streak-border font-mono text-xs text-streak-text space-y-2">
          <p className="text-streak-muted"># 1. Clone repository</p>
          <p className="text-purple-300">git clone https://github.com/geo-cherian-mathew-2k28/geostreak.git</p>
          <p className="text-purple-300">cd geostreak</p>
          <p className="text-streak-muted mt-2"># 2. Configure environment</p>
          <p className="text-purple-300">cp .env.example .env</p>
          <p className="text-streak-muted mt-2"># 3. Run with Docker Compose</p>
          <p className="text-cyan-300">docker compose up -d</p>
        </div>
      </section>
    </div>
  );
}
