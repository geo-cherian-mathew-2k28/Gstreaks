import Link from 'next/link';
import { Flame, Heart } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';

export default function Footer() {
  return (
    <footer className="border-t border-streak-border/80 bg-streak-surface/30 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-amber-500 flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">GeoStreak</span>
            </div>
            <p className="text-xs text-streak-muted leading-relaxed">
              An open-source, animated GitHub contribution streak visualization platform. Crafted for developers worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-streak-muted">
              <li><Link href="/studio" className="hover:text-purple-400 transition-colors">Card Studio</Link></li>
              <li><Link href="/themes" className="hover:text-purple-400 transition-colors">Theme Collection</Link></li>
              <li><Link href="/mascots" className="hover:text-purple-400 transition-colors">Mascot Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-streak-muted">
              <li><Link href="/docs" className="hover:text-purple-400 transition-colors">Documentation</Link></li>
              <li><Link href="/docs#api-reference" className="hover:text-purple-400 transition-colors">API Reference</Link></li>
              <li><Link href="/about" className="hover:text-purple-400 transition-colors">About GeoStreak</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Community &amp; Source</h4>
            <ul className="space-y-2 text-sm text-streak-muted">
              <li>
                <a
                  href="https://github.com/geo-cherian-mathew-2k28/geostreak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-purple-400 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/geo-cherian-mathew-2k28/geostreak/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-streak-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-streak-muted gap-4">
          <p>© {new Date().getFullYear()} GeoStreak. Open source under the MIT License.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for the global developer community.
          </p>
        </div>
      </div>
    </footer>
  );
}
