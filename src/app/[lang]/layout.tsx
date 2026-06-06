import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { languages, type Lang } from '@/config/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import '../globals.css';

export function generateStaticParams() {
  return Object.keys(languages).map(lang => ({ lang }));
}

export const metadata: Metadata = {
  title: {
    default: 'SpringCare Semantics | AI Semantic Design',
    template: '%s | SpringCare Semantics',
  },
  description:
    'SpringCare Semantics - AI Semantic Design. We help knowledge workers structure their domains, roles, and themes for long-term alignment between humans and AI.',
  keywords: [
    'Semantic Design',
    'ART Design',
    'Semantic Alignment',
    'Knowledge Architecture',
    'AI Systems',
    'SpringCare Semantics',
    '天淼语义',
    '语义设计',
  ],
  authors: [{ name: 'SpringCare Semantics' }],
  openGraph: {
    title: 'SpringCare Semantics | AI Semantic Design',
    description: 'Design semantic architecture for knowledge workers & AI systems.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // 验证语言参数
  if (lang !== 'en' && lang !== 'cn') {
    notFound();
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer lang={lang} />
        </ThemeProvider>
      </body>
    </html>
  );
}
