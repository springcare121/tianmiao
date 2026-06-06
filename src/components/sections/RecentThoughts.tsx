'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Share2, X } from 'lucide-react';
import { type Lang } from '@/config/i18n';
import { thoughts, thoughtTypeConfig, type Thought, type ThoughtType } from '@/data/thoughts';

interface RecentThoughtsProps {
  lang: Lang;
  title: string;
  loadMoreText: string;
  shareText: string;
}

// 格式化日期
function formatDate(dateStr: string, lang: Lang): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  if (lang === 'cn') {
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }
  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 详情弹窗
function ThoughtModal({ 
  thought, 
  lang, 
  onClose,
  shareText,
}: { 
  thought: Thought; 
  lang: Lang;
  onClose: () => void;
  shareText: string;
}) {
  const config = thoughtTypeConfig[thought.type];
  const content = lang === 'cn' ? thought.content : thought.contentEn;

  // 点击背景关闭
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ESC 关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // 分享功能
  const handleShare = () => {
    const text = lang === 'cn' ? thought.content : thought.contentEn;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg bg-card rounded-xl shadow-2xl border border-border/40 animate-in zoom-in-95 duration-200">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="p-6">
          {/* 头部：日期 + 类型 */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-muted-foreground font-tech">
              {formatDate(thought.date, lang)}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-xs text-primary font-medium">
              <span>{config.icon}</span>
              <span>{lang === 'cn' ? config.labelCn : config.labelEn}</span>
            </span>
          </div>

          {/* 完整内容 */}
          <div className="text-base leading-relaxed text-foreground whitespace-pre-line">
            {content}
          </div>

          {/* 标签 */}
          <div className="flex items-center gap-2 flex-wrap mt-5 pt-4 border-t border-border/20">
            {thought.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2.5 py-1 rounded-full bg-muted text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 底部操作栏 */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground">
              {thought.author}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title={shareText}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 单条思考卡片
function ThoughtCard({ 
  thought, 
  lang, 
  index,
  shareText,
  onClick,
}: { 
  thought: Thought; 
  lang: Lang;
  index: number;
  shareText: string;
  onClick: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const config = thoughtTypeConfig[thought.type];
  const content = lang === 'cn' ? thought.content : thought.contentEn;
  
  // 判断内容是否需要截断（超过100字符）
  const shouldTruncate = content.length > 100;
  const displayContent = shouldTruncate ? content.slice(0, 100) + '...' : content;

  // 进入视口动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`
        group relative cursor-pointer
        bg-card rounded-lg border border-border/40
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-lg hover:border-primary/30
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
      `}
    >
      {/* 底部渐变条（hover时显示） */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-lg bg-gradient-to-r from-[#F97316] to-[#FB923C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="p-5">
        {/* 日期 */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground font-tech">
            {formatDate(thought.date, lang)}
          </span>
        </div>
        
        {/* 内容预览 */}
        <div className="text-sm leading-relaxed text-foreground/90 line-clamp-4">
          {displayContent.split('\n').map((line, i) => (
            <p key={i} className={i > 0 ? 'mt-2' : ''}>
              {line}
            </p>
          ))}
        </div>
        
        {/* 展开提示 */}
        {shouldTruncate && (
          <div className="mt-3 flex items-center gap-1 text-xs text-primary/70 group-hover:text-primary transition-colors">
            <ChevronDown className="w-3 h-3" />
            <span>{lang === 'cn' ? '点击查看详情' : 'Click to read more'}</span>
          </div>
        )}
        
        {/* 底部标签栏 */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/20">
          <div className="flex items-center gap-2 flex-wrap">
            {/* 类型标签 */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-xs text-primary">
              <span>{config.icon}</span>
              <span>{lang === 'cn' ? config.labelCn : config.labelEn}</span>
            </span>
            
            {/* 内容标签 */}
            {thought.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecentThoughts({ lang, title, loadMoreText, shareText }: RecentThoughtsProps) {
  const [displayCount, setDisplayCount] = useState(6);
  const [selectedThought, setSelectedThought] = useState<Thought | null>(null);
  
  // 按日期排序（最新在前）
  const sortedThoughts = [...thoughts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const displayedThoughts = sortedThoughts.slice(0, displayCount);
  const hasMore = displayCount < sortedThoughts.length;

  return (
    <>
      <section id="thoughts" className="py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          {/* 标题 */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-muted-foreground">
              {title}
            </h2>
          </div>

          {/* 瀑布流布局 */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {displayedThoughts.map((thought, index) => (
              <div key={thought.id} className="break-inside-avoid">
                <ThoughtCard 
                  thought={thought} 
                  lang={lang} 
                  index={index}
                  shareText={shareText}
                  onClick={() => setSelectedThought(thought)}
                />
              </div>
            ))}
          </div>

          {/* 加载更多 */}
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setDisplayCount(prev => prev + 6)}
                className="
                  px-6 py-2.5 rounded-lg
                  bg-primary/10 text-primary
                  hover:bg-primary/20
                  transition-colors duration-200
                  text-sm font-medium
                "
              >
                {loadMoreText}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 详情弹窗 */}
      {selectedThought && (
        <ThoughtModal
          thought={selectedThought}
          lang={lang}
          shareText={shareText}
          onClose={() => setSelectedThought(null)}
        />
      )}
    </>
  );
}
