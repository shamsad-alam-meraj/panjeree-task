import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Panjeree Exam – Smart Exam Preparation',
  description:
    'Test your knowledge with our comprehensive exam platform. Get instant results, review answers, and track your progress.',
  keywords: ['exam', 'quiz', 'test', 'knowledge', 'panjeree'],
  authors: [{ name: 'Panjeree' }],
  openGraph: {
    title: 'Panjeree Exam',
    description: 'Smart Exam Preparation Platform',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
