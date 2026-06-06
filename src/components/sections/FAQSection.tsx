'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Lang } from '@/config/i18n';
import { faqItems, faqCategories, suggestedQuestions, type FAQItem, type FAQCategory } from '@/data/faq';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  sources?: string[];
  isStreaming?: boolean;
}

interface FAQSectionProps {
  lang: Lang;
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

// 简单的关键词匹配搜索
function searchFAQ(query: string, lang: Lang): { item: FAQItem; score: number }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: { item: FAQItem; score: number }[] = [];

  for (const item of faqItems) {
    const question = item.question[lang].toLowerCase();
    const answer = item.answer[lang].toLowerCase();
    const tags = item.tags.map(t => t.toLowerCase());

    let score = 0;

    // 精确匹配问题
    if (question.includes(q) || q.includes(question)) {
      score += 100;
    }

    // 关键词匹配
    const queryWords = q.split(/\s+/).filter(w => w.length > 1);
    for (const word of queryWords) {
      if (question.includes(word)) score += 20;
      if (answer.includes(word)) score += 10;
      if (tags.some(t => t.includes(word))) score += 15;
    }

    // 标签匹配
    for (const tag of tags) {
      if (q.includes(tag)) score += 25;
    }

    if (score > 0) {
      results.push({ item, score });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

// 生成AI回答（基于FAQ知识库检索）
function generateAIResponse(query: string, lang: Lang): { content: string; sources: string[] } {
  const results = searchFAQ(query, lang);

  if (results.length === 0) {
    return {
      content: lang === 'cn'
        ? '抱歉，我在知识库中没有找到与您问题直接相关的内容。建议您通过 info@springcare.cn 联系我们，获取更详细的人工解答。'
        : 'Sorry, I couldn\'t find directly relevant content in the knowledge base for your question. We recommend contacting us at info@springcare.cn for more detailed human assistance.',
      sources: [],
    };
  }

  const topResult = results[0];
  const sources = results.slice(0, 3).map(r =>
    lang === 'cn' ? r.item.question.cn : r.item.question.en
  );

  // 高匹配度：直接返回FAQ答案
  if (topResult.score >= 50) {
    return {
      content: topResult.item.answer[lang],
      sources,
    };
  }

  // 中等匹配度：组合多个答案
  const combined = results.slice(0, 2).map(r => r.item.answer[lang]).join('\n\n');
  return {
    content: combined,
    sources,
  };
}

export function FAQSection({
  lang,
  title,
  aiTitle,
  aiPlaceholder,
  suggestedLabel,
  poweredBy,
  helpful,
  notHelpful,
  followUp,
  sendText,
}: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 按分类分组
  const groupedFAQ = faqItems.reduce<Record<FAQCategory, FAQItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<FAQCategory, FAQItem[]>);

  // 滚动到底部（仅在有用户交互后触发）
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // 发送消息
  const handleSend = useCallback((text?: string) => {
    const query = text || inputValue.trim();
    if (!query || isThinking) return;

    setInputValue('');

    // 添加用户消息
    setChatMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsThinking(true);

    // 模拟思考延迟后流式输出
    setTimeout(() => {
      const { content, sources } = generateAIResponse(query, lang);

      // 流式输出效果
      const aiMessage: ChatMessage = {
        role: 'ai',
        content: '',
        sources,
        isStreaming: true,
      };

      setChatMessages(prev => [...prev, aiMessage]);

      let charIndex = 0;
      const streamInterval = setInterval(() => {
        charIndex += 2; // 每次增加2个字符
        if (charIndex >= content.length) {
          charIndex = content.length;
          clearInterval(streamInterval);
          setChatMessages(prev =>
            prev.map((msg, i) =>
              i === prev.length - 1
                ? { ...msg, content, isStreaming: false }
                : msg
            )
          );
          setIsThinking(false);
        } else {
          setChatMessages(prev =>
            prev.map((msg, i) =>
              i === prev.length - 1
                ? { ...msg, content: content.slice(0, charIndex) }
                : msg
            )
          );
        }
      }, 20);
    }, 800);
  }, [inputValue, isThinking, lang]);

  // 点击FAQ项
  const handleFAQClick = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // 点击推荐问题
  const handleSuggestedClick = (question: string) => {
    handleSend(question);
  };

  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-muted-foreground">
            {title}
          </h2>
        </div>

        {/* 双栏布局 */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* 左侧：FAQ手风琴 */}
          <div className="lg:col-span-2 space-y-6">
            {(Object.keys(groupedFAQ) as FAQCategory[]).map((category) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {faqCategories[category][lang]}
                </h3>
                <div className="space-y-2">
                  {groupedFAQ[category].map((item) => (
                    <div
                      key={item.id}
                      className="border border-border/40 rounded-lg overflow-hidden transition-colors hover:border-border/60"
                    >
                      <button
                        onClick={() => handleFAQClick(item.id)}
                        className="w-full text-left px-4 py-3 flex items-center justify-between gap-2"
                      >
                        <span className="text-sm font-medium">
                          {item.question[lang]}
                        </span>
                        <span
                          className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                            openFAQ === item.id ? 'rotate-180' : ''
                          }`}
                        >
                          ▾
                        </span>
                      </button>
                      {openFAQ === item.id && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.answer[lang]}
                          </p>
                          <div className="mt-3 pt-3 border-t border-border/20">
                            <p className="text-xs text-primary/70 italic">
                              {followUp}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 右侧：AI问答区 */}
          <div className="lg:col-span-3">
            <div className="bg-muted/20 rounded-xl border border-border/40 overflow-hidden flex flex-col h-[520px]">
              {/* 标题栏 */}
              <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {aiTitle}
                </h3>
              </div>

              {/* 消息区域 */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground mb-6">
                      {lang === 'cn' ? '有任何问题？直接问我即可。' : 'Have any questions? Just ask me.'}
                    </p>

                    {/* 推荐问题 */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-3">{suggestedLabel}</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {suggestedQuestions[lang].map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleSuggestedClick(q)}
                            className="text-xs px-3 py-1.5 rounded-full bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background border border-border/40'
                      }`}
                    >
                      <p className={`text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === 'user' ? '' : 'text-foreground'
                      }`}>
                        {msg.content}
                        {msg.isStreaming && (
                          <span className="inline-block w-1 h-4 bg-primary ml-0.5 animate-pulse" />
                        )}
                      </p>

                      {/* 来源引用 */}
                      {msg.role === 'ai' && !msg.isStreaming && msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-border/20">
                          <p className="text-xs text-muted-foreground">
                            {lang === 'cn' ? '参考来源：' : 'Sources: '}
                            {msg.sources.map((s, j) => (
                              <span key={j} className="inline-block mr-2">
                                [{j + 1}] {s}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}

                      {/* 反馈按钮 */}
                      {msg.role === 'ai' && !msg.isStreaming && (
                        <div className="mt-2 flex gap-3">
                          <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                            👍 {helpful}
                          </button>
                          <button className="text-xs text-muted-foreground hover:text-destructive transition-colors">
                            👎 {notHelpful}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* 思考动画 */}
                {isThinking && chatMessages[chatMessages.length - 1]?.role === 'user' && (
                  <div className="flex justify-start">
                    <div className="bg-background border border-border/40 rounded-xl px-4 py-3">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* 输入区域 */}
              <div className="px-5 py-3 border-t border-border/30 bg-muted/10">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={aiPlaceholder}
                    className="flex-1 text-sm bg-background border border-border/50 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                    disabled={isThinking}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || isThinking}
                    className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {sendText}
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground/60 mt-2 text-center">
                  {poweredBy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
