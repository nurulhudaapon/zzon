import type React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'zzon Playground',
  description: 'Online converter for ZON and JSON formats - convert instantly between ZON and JSON. Powered by zzon.',
  keywords:
    'zon to json, json to zon, zon converter, json converter, zon format, json format, online converter, free converter, developer tools, data format conversion',
  authors: [{ name: 'Nurul Huda (Apon)' }],
  creator: 'Nurul Huda (Apon)', 
  publisher: 'Nurul Huda (Apon)',
  openGraph: {
    title: 'zzon Playground - ZON to JSON Converter',
    description: 'Online converter for ZON and JSON formats - convert instantly between ZON and JSON.',
    type: 'website',
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'zzon Playground - ZON to JSON Converter', 
  //   description: 'Online converter for ZON and JSON formats - convert instantly between ZON and JSON.',
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} light`}>{children}</body>
    </html>
  );
}
