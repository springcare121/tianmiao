import { type Metadata } from 'next';
import { type Lang, getTranslation } from '@/config/i18n';
import { Hero } from '@/components/sections/Hero';
import { RecentThoughts } from '@/components/sections/RecentThoughts';
import { FAQSection } from '@/components/sections/FAQSection';

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';
  
  return {
    title: isEn ? 'SpringCare Semantics - AI Semantic Design' : '天淼语义 - 智能语义设计',
    description: isEn 
      ? 'Design semantic architecture for knowledge workers & AI systems. We help structure domains, roles, and themes for long-term alignment between humans and AI.'
      : '为知识工作者与智能系统设计语义架构。帮助构建领域、角色与主题的语义结构，实现人与AI之间的长期协作与语义对齐。',
  };
}

// Service icons - linear style, 2px stroke
function ServiceIcon({ type }: { type: 'design' | 'align' }) {
  if (type === 'design') {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  );
}

// Section divider - diagonal wave
function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}>
      <svg
        className="relative block w-full h-8 text-muted/20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
      </svg>
    </div>
  );
}

// Geometric dots decoration
function GeometricDots({ position }: { position: 'left' | 'right' }) {
  const baseClasses = "absolute pointer-events-none opacity-[0.07]";
  const posClasses = position === 'left' 
    ? "left-0 top-1/4" 
    : "right-0 top-1/3";
  
  return (
    <div className={`${baseClasses} ${posClasses}`}>
      <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor">
        <circle cx="20" cy="20" r="3" />
        <circle cx="60" cy="40" r="5" />
        <circle cx="100" cy="20" r="2" />
        <circle cx="140" cy="60" r="4" />
        <circle cx="40" cy="80" r="6" />
        <circle cx="80" cy="100" r="3" />
        <circle cx="120" cy="80" r="5" />
        <circle cx="160" cy="120" r="2" />
        <circle cx="30" cy="140" r="4" />
        <circle cx="70" cy="160" r="3" />
        <circle cx="110" cy="140" r="6" />
        <circle cx="150" cy="180" r="4" />
        <circle cx="180" cy="40" r="3" />
        <circle cx="180" cy="100" r="5" />
        <circle cx="180" cy="160" r="2" />
      </svg>
    </div>
  );
}

export default async function HomePage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = getTranslation(lang);

  return (
    <div className="flex flex-col">
      {/* Hero 区域 */}
      <Hero t={t} lang={lang} />

      {/* 分割线 */}
      <SectionDivider />

      {/* 服务项目 */}
      <section id="services" className="relative py-20 bg-muted/20 overflow-hidden">
        {/* 背景装饰 */}
        <GeometricDots position="left" />
        <GeometricDots position="right" />
        
        <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          {/* 标题 */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-muted-foreground">
              {t.services.title}
            </h2>
          </div>

          {/* 服务分类 */}
          <div className="space-y-12">
            {t.services.categories.map((category, catIndex) => (
              <div key={catIndex} className="space-y-6">
                {/* 分类标题 */}
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    <ServiceIcon type={catIndex === 0 ? 'design' : 'align'} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {category.title}
                  </h3>
                </div>
                
                {/* 服务项 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="group bg-background/50 rounded-lg p-5 border border-border/40 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                    >
                      <h4 className="text-base font-semibold mb-2 tracking-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分割线 */}
      <SectionDivider flip />

      {/* 服务对象 */}
      <section id="audience" className="relative py-20 overflow-hidden">
        {/* 背景装饰 - 斜向渐变条纹 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px'
        }} />
        
        <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          {/* 标题 */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-muted-foreground">
              {t.audience.title}
            </h2>
          </div>

          {/* 服务对象列表 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.audience.items.map((item, index) => (
              <div 
                key={index}
                className="group text-center py-4 px-4 bg-muted/10 rounded-lg border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <p className={`font-medium ${lang === 'en' ? 'font-tech text-sm' : 'text-base'} group-hover:text-primary transition-colors`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分割线 */}
      <SectionDivider />

      {/* 最近思考 */}
      <RecentThoughts 
        lang={lang}
        title={t.thoughts.title}
        loadMoreText={t.thoughts.loadMore}
        shareText={t.thoughts.share}
      />

      {/* 分割线 */}
      <SectionDivider flip />

      {/* 核心理念 */}
      <section id="beliefs" className="relative py-20 bg-muted/20 overflow-hidden">
        {/* 背景装饰 */}
        <GeometricDots position="right" />
        
        <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          {/* 标题 */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-muted-foreground">
              {t.beliefs.title}
            </h2>
          </div>

          {/* 理念列表 */}
          <div className="max-w-2xl mx-auto space-y-6">
            {t.beliefs.beliefs.map((belief, index) => (
              <div 
                key={index}
                className="text-center py-4"
              >
                <p className={`font-semibold text-lg ${lang === 'en' ? 'font-tech' : ''}`}>
                  {belief}
                </p>
              </div>
            ))}
          </div>

          {/* 结束语 */}
          <div className="max-w-2xl mx-auto mt-8 pt-6 border-t border-border/30">
            <p className="text-center text-base text-muted-foreground leading-relaxed">
              {t.beliefs.conclusion}
            </p>
          </div>
        </div>
      </section>

      {/* 分割线 */}
      <SectionDivider />

      {/* FAQ + AI问答 */}
      <FAQSection
        lang={lang}
        title={t.faq.title}
        aiTitle={t.faq.aiTitle}
        aiPlaceholder={t.faq.aiPlaceholder}
        suggestedLabel={t.faq.suggestedLabel}
        poweredBy={t.faq.poweredBy}
        helpful={t.faq.helpful}
        notHelpful={t.faq.notHelpful}
        followUp={t.faq.followUp}
        sendText={t.faq.sendText}
      />
    </div>
  );
}
