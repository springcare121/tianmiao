'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { languages, type Lang } from '@/config/i18n';
import { getTranslation } from '@/config/i18n';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const params = useParams();
  const pathname = usePathname();
  const lang = (params.lang as Lang) || 'cn';
  const t = getTranslation(lang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  // 监听 hash 变化
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const otherLang = lang === 'en' ? 'cn' : 'en';
  const langSwitchHref = pathname.replace(`/${lang}`, `/${otherLang}`);

  const getIsActive = (href: string) => {
    if (href === '#') {
      return activeHash === '' || activeHash === '#';
    }
    return activeHash === href;
  };

  // 导航项配置
  const navItems = [
    { href: '#services', label: t.nav.services },
    { href: '#audience', label: t.nav.audience },
    { href: '#thoughts', label: t.nav.thoughts },
    { href: '#beliefs', label: t.nav.beliefs },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
                {lang === 'cn' ? '天' : 'SC'}
              </span>
            </div>
            <div className="hidden sm:inline-flex flex-col items-start">
              <span className={cn(
                "text-sm font-bold leading-none",
                lang === 'cn' ? "italic tracking-tight" : "tracking-[0.02em]"
              )}>
                {t.brand.name}
              </span>
              <span className={cn(
                "font-['JetBrains_Mono',monospace] italic text-muted-foreground leading-none",
                lang === 'en'
                  ? "text-[11px]"
                  : "text-[9px] tracking-widest"
              )}>
                {t.brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Tag/Pill style */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-1 text-xs font-bold rounded-full border transition-all',
                  getIsActive(item.href)
                    ? 'text-primary-foreground bg-primary border-primary'
                    : 'text-muted-foreground bg-background border-border hover:border-primary/50 hover:text-primary'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher & Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <Link
              href={langSwitchHref}
              className="flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{languages[otherLang]}</span>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-border/50">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    getIsActive(item.href)
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}