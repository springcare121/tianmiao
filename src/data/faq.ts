// FAQ 数据结构 - 预设问答知识库

export type FAQCategory = 'product' | 'tech' | 'business';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: { cn: string; en: string };
  answer: { cn: string; en: string };
  tags: string[];
}

export const faqCategories: Record<FAQCategory, { cn: string; en: string }> = {
  product: { cn: '产品类', en: 'Product' },
  tech: { cn: '技术类', en: 'Technology' },
  business: { cn: '商务类', en: 'Business' },
};

export const faqItems: FAQItem[] = [
  // 产品类
  {
    id: 'faq-001',
    category: 'product',
    question: {
      cn: '天淼语义是什么？',
      en: 'What is SpringCare Semantics?',
    },
    answer: {
      cn: '天淼语义是一家专注于AI语义设计的服务机构。我们帮助知识工作者构建领域、角色与主题的语义结构（ART框架），同时帮助智能系统理解、记忆与调用这些结构，实现人与AI之间的长期协作与语义对齐。',
      en: 'SpringCare Semantics is a service firm specializing in AI semantic design. We help knowledge workers build semantic structures of domains, roles, and themes (the ART framework), while helping intelligent systems understand, retain, and utilize those structures — creating long-term alignment between humans and AI.',
    },
    tags: ['介绍', 'about', 'overview'],
  },
  {
    id: 'faq-002',
    category: 'product',
    question: {
      cn: '什么是ART框架？',
      en: 'What is the ART framework?',
    },
    answer: {
      cn: 'ART 是 Area–Role–Theme（领域-角色-主题）的缩写，是天淼语义的核心设计框架。Area 定义知识领域边界，Role 定义领域中的角色与视角，Theme 定义具体的主题与知识结构。三者组合形成可持续积累的语义架构。',
      en: 'ART stands for Area–Role–Theme, the core design framework of SpringCare Semantics. Area defines the boundaries of a knowledge domain, Role defines perspectives within that domain, and Theme defines specific topics and knowledge structures. Together they form a sustainable semantic architecture.',
    },
    tags: ['ART', '框架', 'framework'],
  },
  {
    id: 'faq-003',
    category: 'product',
    question: {
      cn: '语义设计和传统内容设计有什么区别？',
      en: 'How is semantic design different from traditional content design?',
    },
    answer: {
      cn: '传统内容设计关注信息的呈现形式（排版、视觉、交互），而语义设计关注信息的内在结构——领域如何划分、角色如何定义、主题如何关联。语义设计产出的不仅是内容，更是可被AI理解和调用的语义资产。',
      en: 'Traditional content design focuses on how information is presented (layout, visuals, interaction), while semantic design focuses on the intrinsic structure of information — how domains are divided, roles are defined, and themes are connected. The output of semantic design is not just content, but semantic assets that AI can understand and utilize.',
    },
    tags: ['区别', 'difference', '语义设计'],
  },
  // 技术类
  {
    id: 'faq-004',
    category: 'tech',
    question: {
      cn: '什么是语义对齐？',
      en: 'What is semantic alignment?',
    },
    answer: {
      cn: '语义对齐是指让人类知识体系与AI系统之间建立共享的语义结构。包括：提示词与领域概念的对齐、记忆体与知识结构的对齐、上下文与角色定义的对齐、工作流与主题路径的对齐。目标是让AI真正"理解"你的知识体系，而非仅仅处理文本。',
      en: 'Semantic alignment means establishing shared semantic structures between human knowledge systems and AI systems. This includes: aligning prompts with domain concepts, memory with knowledge structures, context with role definitions, and workflows with thematic pathways. The goal is for AI to truly "understand" your knowledge system, not just process text.',
    },
    tags: ['对齐', 'alignment', '语义'],
  },
  {
    id: 'faq-005',
    category: 'tech',
    question: {
      cn: '语义引擎和传统RAG有什么区别？',
      en: 'How does a semantic engine differ from traditional RAG?',
    },
    answer: {
      cn: '传统RAG（检索增强生成）基于向量相似度检索文档片段，缺乏对知识结构的理解。语义引擎基于ART框架构建结构化的语义图谱，能够理解领域边界、角色关系和主题层次，实现更精准的知识检索、推理和生成。',
      en: 'Traditional RAG (Retrieval-Augmented Generation) retrieves document fragments based on vector similarity, lacking understanding of knowledge structure. A semantic engine builds structured semantic graphs based on the ART framework, understanding domain boundaries, role relationships, and thematic hierarchies for more precise knowledge retrieval, reasoning, and generation.',
    },
    tags: ['RAG', '语义引擎', 'engine', '检索'],
  },
  {
    id: 'faq-006',
    category: 'tech',
    question: {
      cn: '支持哪些大模型？',
      en: 'Which LLMs do you support?',
    },
    answer: {
      cn: '我们的语义设计方案与模型无关，支持主流大语言模型，包括但不限于：GPT-4、Claude、DeepSeek、豆包、Kimi等。语义架构设计一次，可在不同模型间迁移复用。',
      en: 'Our semantic design approach is model-agnostic, supporting mainstream LLMs including but not limited to: GPT-4, Claude, DeepSeek, Doubao, Kimi, etc. Semantic architecture designed once can be migrated and reused across different models.',
    },
    tags: ['大模型', 'LLM', 'GPT', 'Claude'],
  },
  // 商务类
  {
    id: 'faq-007',
    category: 'business',
    question: {
      cn: '如何收费？',
      en: 'How do you charge?',
    },
    answer: {
      cn: '我们根据项目复杂度和交付范围定价。语义设计项目通常按阶段收费（诊断→设计→交付→对齐），具体费用在初次沟通后提供定制方案。欢迎通过 info@springcare.cn 联系我们获取报价。',
      en: 'We price based on project complexity and delivery scope. Semantic design projects are typically charged by phase (diagnosis → design → delivery → alignment), with specific pricing provided after initial consultation. Contact us at info@springcare.cn for a quote.',
    },
    tags: ['收费', 'pricing', '费用', '报价'],
  },
  {
    id: 'faq-008',
    category: 'business',
    question: {
      cn: '能私有化部署吗？',
      en: 'Can you deploy on-premise?',
    },
    answer: {
      cn: '可以。语义引擎和知识库支持私有化部署，数据完全留在客户环境中。我们提供本地化部署方案和持续运维支持，适合对数据安全有高要求的企业客户。',
      en: 'Yes. Semantic engines and knowledge bases support on-premise deployment, with data remaining entirely in the client\'s environment. We provide localized deployment plans and ongoing maintenance support, suitable for enterprise clients with high data security requirements.',
    },
    tags: ['私有化', '部署', 'on-premise', '安全'],
  },
  {
    id: 'faq-009',
    category: 'business',
    question: {
      cn: '项目交付周期是多久？',
      en: 'What is the typical project timeline?',
    },
    answer: {
      cn: '取决于项目范围。ART语义设计通常需要2-4周完成诊断与设计阶段，语义引擎搭建需要额外4-8周。品牌语义对齐项目通常2-3周。具体时间在项目启动前明确约定。',
      en: 'It depends on the project scope. ART semantic design typically takes 2-4 weeks for diagnosis and design phases, with semantic engine construction requiring an additional 4-8 weeks. Brand semantic alignment projects usually take 2-3 weeks. Specific timelines are agreed upon before project kickoff.',
    },
    tags: ['周期', 'timeline', '交付', '时间'],
  },
  {
    id: 'faq-010',
    category: 'business',
    question: {
      cn: '如何开始合作？',
      en: 'How do we start working together?',
    },
    answer: {
      cn: '第一步：通过 info@springcare.cn 联系我们，简要描述你的需求场景。第二步：我们安排30分钟免费诊断通话，评估语义设计的适用性。第三步：如双方确认合作意向，我们提供定制方案和报价。',
      en: 'Step 1: Contact us at info@springcare.cn with a brief description of your needs. Step 2: We schedule a free 30-minute diagnostic call to assess the applicability of semantic design. Step 3: If both parties confirm interest, we provide a customized proposal and quote.',
    },
    tags: ['合作', '开始', 'start', 'contact'],
  },
];

// 推荐问题
export const suggestedQuestions = {
  cn: [
    '语义设计如何落地？',
    '可以私有化部署吗？',
    '技术支持怎么收费？',
    '和传统RAG有什么区别？',
  ],
  en: [
    'How to implement semantic design?',
    'Can you deploy on-premise?',
    'How do you charge for support?',
    'How is it different from traditional RAG?',
  ],
};
