// 多语言配置文件

export const languages = {
  en: 'English',
  cn: '中文',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'cn';

// 定义翻译类型结构
interface BrandTranslation {
  name: string;
  tagline: string;
}

interface NavTranslation {
  services: string;
  audience: string;
  thoughts: string;
  beliefs: string;
  faq: string;
}

interface HeroTranslation {
  title: string;
  subtitle: string[];
}

interface ServiceSubItemTranslation {
  title: string;
  description: string;
}

interface ServiceCategoryTranslation {
  title: string;
  items: ServiceSubItemTranslation[];
}

interface ServicesTranslation {
  title: string;
  categories: ServiceCategoryTranslation[];
}

interface AudienceTranslation {
  title: string;
  items: string[];
}

interface BeliefsTranslation {
  title: string;
  beliefs: string[];
  conclusion: string;
}

interface ThoughtsTranslation {
  title: string;
  loadMore: string;
  share: string;
}

interface FAQTranslation {
  title: string;
  aiTitle: string;
  aiPlaceholder: string;
  suggestedLabel: string;
  poweredBy: string;
  helpful: string;
  notHelpful: string;
  followUp: string;
  sendText: string;
}

interface FooterTranslation {
  rights: string;
}

export interface Translations {
  brand: BrandTranslation;
  nav: NavTranslation;
  hero: HeroTranslation;
  services: ServicesTranslation;
  audience: AudienceTranslation;
  thoughts: ThoughtsTranslation;
  faq: FAQTranslation;
  beliefs: BeliefsTranslation;
  footer: FooterTranslation;
}

export const translations: Record<Lang, Translations> = {
  en: {
    // 品牌
    brand: {
      name: 'SpringCare Semantics',
      tagline: 'AI Semantic Design',
    },
    // 导航
    nav: {
      services: 'Services',
      audience: 'Who We Serve',
      thoughts: 'Recent Thoughts',
      beliefs: 'Core Beliefs',
      faq: 'FAQ',
    },
    // Hero
    hero: {
      title: 'Design Semantic Architecture\nfor Knowledge Workers & AI Systems',
      subtitle: [
        'We help knowledge workers structure their domains, roles, and themes,',
        'and help intelligent systems understand, retain, and utilize those structures,',
        'creating long-term alignment between humans and AI.',
      ],
    },
    // Services
    services: {
      title: 'Services',
      categories: [
        {
          title: '01 Semantic Design',
          items: [
            {
              title: 'Area–Role–Theme (ART) Design',
              description: 'Define clear domains, roles, and thematic structures to build sustainable knowledge workflows and digital identities.',
            },
            {
              title: 'Semantic Engine & Sandbox Design',
              description: 'Design semantic engines for exploration, research, and creation. Build semantic environments such as digital exhibitions, symbolic knowledge engines, and information sandboxes, enabling knowledge organization, pathway discovery, and agent collaboration.',
            },
          ],
        },
        {
          title: '02 Semantic Alignment',
          items: [
            {
              title: 'Area–Role–Theme (ART) Alignment',
              description: 'Align existing content, projects, and knowledge assets into a coherent and extensible semantic structure.',
            },
            {
              title: 'AI System Semantic Alignment',
              description: 'Align prompts, memory systems, context structures, and workflows to create shared semantics between humans and intelligent agents.',
            },
            {
              title: 'Brand Semantic Alignment',
              description: 'Align positioning, concepts, content systems, and communication language to establish a consistent and recognizable brand meaning.',
            },
          ],
        },
      ],
    },
    // Audience
    audience: {
      title: 'Who We Serve',
      items: [
        'Solopreneur',
        'Brand & IP Entrepreneurs',
        'Educators / Trainers',
        'Knowledge Managers / Content Curators',
        'Digital Product / UX Designers',
        'Corporate Innovation / Strategy Consultants',
        'AI Developers',
        'Digital Explorers',
      ],
    },
    // Recent Thoughts
    thoughts: {
      title: 'Recent Thoughts',
      loadMore: 'Load More',
      share: 'Share',
    },
    // FAQ
    faq: {
      title: 'FAQ',
      aiTitle: 'Ask SpringCare AI',
      aiPlaceholder: 'Type your question...',
      suggestedLabel: 'Suggested questions:',
      poweredBy: 'Powered by local knowledge base | Last updated: 2026.06',
      helpful: 'Helpful',
      notHelpful: 'Not helpful',
      followUp: 'Didn\'t answer your question? Ask AI for more details.',
      sendText: 'Send',
    },
    // Core Beliefs
    beliefs: {
      title: 'Core Beliefs',
      beliefs: [
        'Design semantics, not just content.',
        'Build semantic assets, not just information.',
        'Create semantic architecture, not just tools.',
      ],
      conclusion: 'Enable humans and intelligent systems to collaborate within a shared space of meaning.',
    },
    // Footer
    footer: {
      rights: 'All rights reserved.',
    },
  },
  cn: {
    // 品牌
    brand: {
      name: '天淼语义',
      tagline: '智能语义设计',
    },
    // 导航
    nav: {
      services: '服务',
      audience: '服务对象',
      thoughts: '最近思考',
      beliefs: '核心理念',
      faq: '常见问题',
    },
    // Hero
    hero: {
      title: '为知识工作者与智能系统\n设计语义架构',
      subtitle: [
        '我们帮助知识工作者构建领域、角色与主题的语义结构，',
        '帮助智能系统理解、记忆与调用这些结构，',
        '实现人与AI之间的长期协作与语义对齐。',
      ],
    },
    // Services
    services: {
      title: '服务',
      categories: [
        {
          title: '01 语义设计',
          items: [
            {
              title: '领域-角色-主题（ART）设计',
              description: '构建清晰的领域定位、角色体系与主题结构，形成可持续积累的知识生产框架与数字身份表达。',
            },
            {
              title: '语义引擎与沙盒设计',
              description: '设计面向探索、研究与创作的语义引擎。构建数字集展、数字类象引擎与类象信息沙盘等语义空间，支持知识组织、路径探索与 Agent 协作。',
            },
          ],
        },
        {
          title: '02 语义对齐',
          items: [
            {
              title: '领域-角色-主题（ART）对齐',
              description: '梳理已有内容、项目与知识资产，统一领域、角色与主题表达，形成一致且可扩展的语义体系。',
            },
            {
              title: '智能系统语义对齐',
              description: '围绕提示词、记忆体、上下文与工作流，建立人与 Agent 之间共享的语义结构，提升理解、协作与执行能力。',
            },
            {
              title: '品牌语义对齐',
              description: '统一品牌定位、核心概念、内容体系与表达方式，形成清晰一致的品牌认知与长期价值积累。',
            },
          ],
        },
      ],
    },
    // Audience
    audience: {
      title: '服务对象',
      items: [
        '独立创客（Solopreneur）',
        '品牌IP创业者',
        '教育/培训师',
        '知识管理/内容策展者',
        '数字产品/UX设计师',
        '企业创新/战略顾问',
        'AI开发者',
        '数字世界探索者',
      ],
    },
    // Recent Thoughts
    thoughts: {
      title: '最近思考',
      loadMore: '加载更多',
      share: '分享',
    },
    // FAQ
    faq: {
      title: '常见问题',
      aiTitle: '问问天淼语义AI',
      aiPlaceholder: '输入你的问题...',
      suggestedLabel: '推荐提问：',
      poweredBy: '由本地知识库驱动 | 最后更新：2026.06',
      helpful: '有帮助',
      notHelpful: '没帮助',
      followUp: '没有解决你的问题？可以继续追问AI。',
      sendText: '发送',
    },
    // Core Beliefs
    beliefs: {
      title: '核心理念',
      beliefs: [
        '设计语义，而非仅设计内容。',
        '积累语义资产，而非仅积累信息。',
        '构建语义架构，而非仅构建工具。',
      ],
      conclusion: '让知识工作者与智能系统在同一意义空间中协作。',
    },
    // Footer
    footer: {
      rights: '保留所有权利。',
    },
  },
};

export function getTranslation(lang: Lang): Translations {
  return translations[lang];
}