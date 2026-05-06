import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LangProvider } from '@/lib/lang-context';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bhoomiputra OTT — Project Proposal',
  description: 'Professional project proposal for the Bhoomiputra OTT creator education platform.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ margin: 0, backgroundColor: '#0A0A0F', color: '#F0F0F5' }}>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
