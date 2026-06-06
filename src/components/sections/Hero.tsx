'use client';

import dynamic from 'next/dynamic';
import { type Translations, type Lang } from '@/config/i18n';

// 动态导入3D组件，避免SSR问题
const SemanticManifold = dynamic(() => import('./SemanticManifold'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div className="text-muted-foreground">加载3D可视化...</div>
    </div>
  ),
});

interface HeroProps {
  t: Translations;
  lang: Lang;
}

export function Hero({ t, lang }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content - left side */}
          <div className="text-center lg:text-left">
            {/* Main title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6 leading-snug">
              <span className="whitespace-pre-line">{t.hero.title}</span>
            </h1>

            {/* Subtitle */}
            <div className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {Array.isArray(t.hero.subtitle) ? (
                t.hero.subtitle.map((line, index) => (
                  <p key={index} className={index > 0 ? 'mt-2' : ''}>
                    {line}
                  </p>
                ))
              ) : (
                <p>{t.hero.subtitle}</p>
              )}
            </div>
          </div>

          {/* 3D Illustration - right side */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* 3D Component - clean, no glow */}
              <SemanticManifold />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
