import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'pluma.',
  description: 'Speak to your PDFs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <Providers>
        <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
