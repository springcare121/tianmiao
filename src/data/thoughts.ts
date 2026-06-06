/**
 * 「最近思考」动态数据
 * 
 * ═══════════════════════════════════════════════════════════════
 * 📝 更新指南（批量添加新思考）
 * ═══════════════════════════════════════════════════════════════
 * 
 * 1. 在下方 `thoughts` 数组中添加新条目（最新的放最前面）
 * 2. 每条思考需要以下字段：
 *    - id: 唯一标识（格式：think-XXX）
 *    - date: 日期时间（ISO格式：YYYY-MM-DDTHH:mm:ss）
 *    - type: 类型（thinking/tech/project/observation/quote）
 *    - author: 作者名
 *    - tags: 标签数组
 *    - content: 中文内容
 *    - contentEn: 英文内容
 * 
 * 3. 类型说明：
 *    - thinking: 💭 类象思考（短思考、灵感、读书笔记）
 *    - tech: 🔬 技术发现（新技术调研、工具评测）
 *    - project: 🚧 项目进展（XR沙盘、类象引擎进度）
 *    - observation: 👀 行业观察（行业动态点评）
 *    - quote: 📖 引用摘录（好句子、好观点）
 * 
 * 4. 更新频率建议：每3-7天批量添加1-3条
 * 
 * ═══════════════════════════════════════════════════════════════
 */

export type ThoughtType = 'thinking' | 'tech' | 'project' | 'observation' | 'quote';

export interface Thought {
  id: string;
  date: string;
  type: ThoughtType;
  author: string;
  tags: string[];
  content: string;
  contentEn: string;
}

// 类型配置
export const thoughtTypeConfig: Record<ThoughtType, { icon: string; labelCn: string; labelEn: string }> = {
  thinking: { icon: '💭', labelCn: '类象思考', labelEn: 'Thinking' },
  tech: { icon: '🔬', labelCn: '技术发现', labelEn: 'Tech Discovery' },
  project: { icon: '🚧', labelCn: '项目进展', labelEn: 'Project Update' },
  observation: { icon: '👀', labelCn: '行业观察', labelEn: 'Observation' },
  quote: { icon: '📖', labelCn: '引用摘录', labelEn: 'Quote' },
};

// ═══════════════════════════════════════════════════════════════
// 📌 在此处添加新的思考条目（最新的放最前面）
// ═══════════════════════════════════════════════════════════════
export const thoughts: Thought[] = [
  // ─── 2026年6月 ───
  {
    id: 'think-006',
    date: '2026-06-05T16:00:00',
    type: 'thinking',
    author: '开文',
    tags: ['语义架构', '知识图谱'],
    content: '语义架构的本质不是组织信息，而是构建意义空间。当知识工作者和AI系统共享同一个语义框架时，协作才真正发生。',
    contentEn: 'The essence of semantic architecture is not organizing information, but constructing a space of meaning. True collaboration only happens when knowledge workers and AI systems share the same semantic framework.',
  },
  {
    id: 'think-005',
    date: '2026-06-05T14:30:00',
    type: 'thinking',
    author: '开文',
    tags: ['类象', '语义'],
    content: '今天在想：类象思维中的"取象比类"，本质上就是人类最原始的语义压缩算法。\n\n一个卦象 = 一个语义向量，六十四卦 = 64维语义空间。\n\n古人用这套系统理解世界，今天我们用embedding做类似的事。区别在于：类象思维保留了意义的层次结构，而现代embedding往往是扁平的。',
    contentEn: 'Thinking today: "Taking images and comparing categories" in symbolic thinking is essentially humanity\'s original semantic compression algorithm.\n\nOne hexagram = one semantic vector. 64 hexagrams = a 64-dimensional semantic space.\n\nAncients used this system to understand the world; today we do similar things with embeddings. The difference: symbolic thinking preserves hierarchical meaning structure, while modern embeddings tend to be flat.',
  },
  {
    id: 'think-004',
    date: '2026-06-04T10:15:00',
    type: 'tech',
    author: '开文',
    tags: ['RAG', 'GraphRAG'],
    content: '试了新的GraphRAG框架，发现它在处理多跳推理时比传统RAG强很多。\n\n关键差异：传统RAG是"检索→生成"，GraphRAG是"检索→推理→生成"。\n\n对于需要跨文档关联的场景（比如"这个客户的风险点和上次那个案例有什么相似"），GraphRAG的优势非常明显。',
    contentEn: 'Tried the new GraphRAG framework and found it significantly outperforms traditional RAG in multi-hop reasoning.\n\nKey difference: Traditional RAG is "retrieve → generate", while GraphRAG is "retrieve → reason → generate".\n\nFor scenarios requiring cross-document correlation (like "how are this client\'s risk points similar to that previous case"), GraphRAG\'s advantage is very clear.',
  },
  {
    id: 'think-003',
    date: '2026-06-03T16:45:00',
    type: 'project',
    author: '开文',
    tags: ['XR沙盘', '类象引擎'],
    content: '这周完成了知识图谱的接驳模块。\n\n现在可以在XR沙盘里直接看到：\n- 领域节点之间的语义距离\n- 主题聚类的层次结构\n- 角色-权限的关联网络\n\n下一步要做的是"语义漫游"功能——让用户像逛博物馆一样在知识空间里自由探索。',
    contentEn: 'Completed the knowledge graph integration module this week.\n\nNow in the XR sandbox you can directly see:\n- Semantic distance between domain nodes\n- Hierarchical structure of topic clusters\n- Role-permission association networks\n\nNext step: "Semantic Wandering" feature — letting users freely explore the knowledge space like walking through a museum.',
  },
  {
    id: 'think-002',
    date: '2026-06-02T09:30:00',
    type: 'observation',
    author: '开文',
    tags: ['行业', '3D建模'],
    content: '刚刚看到大晓的全屋3D模型方案，很有意思。\n\n但我觉得方向可能反了——不是把现实搬进虚拟，而是让虚拟帮助理解现实。\n\n类象思维的核心是"以象喻理"，3D可视化应该服务于认知，而不只是复刻物理空间。',
    contentEn: 'Just saw Daxiao\'s full-house 3D modeling solution, quite interesting.\n\nBut I think the direction might be reversed — not bringing reality into virtual, but letting virtual help understand reality.\n\nThe core of symbolic thinking is "using images to illustrate principles". 3D visualization should serve cognition, not just replicate physical space.',
  },
  {
    id: 'think-001',
    date: '2026-06-01T11:20:00',
    type: 'quote',
    author: '开文',
    tags: ['信息论', '香农'],
    content: '"信息的本质是差异的传递。"\n\n—— 香农\n\n这句话放在AI时代更有深意：大模型学到的不是"信息"本身，而是信息之间的差异模式。语义，就是差异的结构化表达。',
    contentEn: '"The essence of information is the transmission of differences."\n\n— Shannon\n\nThis quote carries deeper meaning in the AI era: what large models learn is not "information" itself, but the patterns of differences between information. Semantics is the structured expression of differences.',
  },
];
