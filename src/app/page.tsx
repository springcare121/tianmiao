'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 根路径客户端重定向到默认语言（兼容 IGA Pages 静态部署）
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/cn');
  }, [router]);

  return (
    <html lang="zh-CN">
      <head>
        <meta httpEquiv="refresh" content="0;url=/cn" />
        <title>天淼语义 - SpringCare Semantics</title>
      </head>
      <body className="flex items-center justify-center min-h-screen bg-[#f5f5f7]">
        <div className="text-center">
          <p className="text-sm text-gray-500">正在跳转...</p>
          <a href="/cn" className="text-sm text-[#4F46E5] hover:underline mt-2 inline-block">
            点击进入中文版
          </a>
        </div>
      </body>
    </html>
  );
}
