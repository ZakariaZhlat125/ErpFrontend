import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../globals.css';
import { ThemeProvider } from '@/lib/theme/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ERP Platform - Transform Your Business',
  description: 'Streamline operations, boost productivity, and drive growth with our comprehensive ERP platform designed for modern businesses.',
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
