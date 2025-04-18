import type React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'zzon Playground',
  description: 'A playground for converting between JSON and ZON formats',
  generator: 'v0.dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} light`}>{children}</body>
    </html>
  );
}
