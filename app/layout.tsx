import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://durgesh-v.vercel.app'),
  title: 'Manoj Kumar | Full Stack Developer & AI Engineer for Hire',
  description: 'Freelance Full Stack Developer specializing in React, Next.js, Node.js, and AI/ML solutions. 25+ projects delivered. Building scalable web applications for startups and enterprises. Available for hire.',
  keywords: ['Manoj Kumar', 'Full Stack Developer', 'React Developer', 'Next.js Expert', 'Freelance Developer', 'AI Engineer', 'Machine Learning Developer', 'Web Development', 'Hire Developer', 'MLSC', 'Microsoft Learn Student Ambassador'],
  authors: [{ name: 'Manoj Kumar' }],
  openGraph: {
    type: 'website',
    url: 'https://durgesh-v.vercel.app',
    title: 'Manoj Kumar | Full Stack Developer & AI Engineer for Hire',
    description: 'Freelance Full Stack Developer specializing in React, Next.js, Node.js, and AI/ML solutions. 25+ projects delivered. Available for hire.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Manoj Kumar Portfolio'
    }],
    siteName: 'Manoj Kumar Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manoj Kumar | Full Stack Developer & AI Engineer for Hire',
    description: 'Freelance Full Stack Developer specializing in React, Next.js, Node.js, and AI/ML solutions. 25+ projects delivered. Available for hire.',
    images: ['/og-image.png'],
    creator: '@durgeshvaigandla',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/og-image.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#00f0ff" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-space text-gray-200 selection:bg-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
