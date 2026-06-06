import Link from 'next/link';
import { type Lang, getTranslation } from '@/config/i18n';
import { cn } from '@/lib/utils';

interface FooterProps {
  lang: Lang;
}

export function Footer({ lang }: FooterProps) {
  const t = getTranslation(lang);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  {lang === 'cn' ? '天' : 'SC'}
                </span>
              </div>
              <div className="inline-flex flex-col items-start">
                <span className={cn(
                  "text-base font-bold leading-none",
                  lang === 'cn' ? "italic tracking-tight" : "tracking-[0.02em]"
                )}>
                  {t.brand.name}
                </span>
                <span className={cn(
                  "font-['JetBrains_Mono',monospace] italic text-muted-foreground leading-none",
                  lang === 'en'
                    ? "text-[13px]"
                    : "text-[10px] tracking-widest"
                )}>
                  {t.brand.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} {lang === 'cn' ? '上海天淼商务咨询有限公司' : 'Shanghai SpringCare Business Consulting Ltd'}. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
