import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'GeoStreak | Animated GitHub Contribution Cards & Mascot Visualizer',
  description:
    'Generate beautiful, customizable, animated GitHub contribution streak cards and cute mascots for your GitHub profile README.',
  keywords: ['github streak', 'github readme stats', 'contribution graph', 'github card', 'developer tools', 'svg generator'],
  openGraph: {
    title: 'GeoStreak - Animated GitHub Streak Cards',
    description: 'Transform your GitHub contributions into animated SVG cards with cute mascots for your profile README.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-streak-dark text-streak-text flex flex-col antialiased selection:bg-purple-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
