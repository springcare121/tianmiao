import { MetadataRoute } from 'next';
import { languages } from '@/config/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://springcare.digital';
  const langs = Object.keys(languages);
  
  // 所有页面路由
  const routes = ['', '/services', '/about', '/knowledge', '/hosting'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  // 为每种语言生成页面条目
  langs.forEach(lang => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/services' ? 0.9 : 0.8,
      });
    });
  });
  
  // 添加根路径重定向
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  });
  
  return sitemapEntries;
}
