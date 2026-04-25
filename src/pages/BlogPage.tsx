import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

// 模拟博客文章数据
interface BlogPost {
  id: number;
  title: string;
  date: string;
  description: string;
  image?: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'React + Tailwind CSS 设计系统搭建',
    date: '2024-04-15',
    description: '详细介绍如何使用React和Tailwind CSS搭建一套完整的设计系统，包含组件库、设计规范和最佳实践。（测试用文本）',
    image: '/my-homepage/images/Content/Facebook post - 1.png',
    link: '#'
  },
  {
    id: 2,
    title: '前端性能优化实战指南',
    date: '2024-04-10',
    description: '从代码分割、懒加载、缓存策略等多个角度，详细讲解前端性能优化的方法和技巧。（测试用文本）',
    image: '/my-homepage/images/Content/Facebook post - 1.png',
    link: '#'
  },
  {
    id: 3,
    title: '响应式设计最佳实践',
    date: '2024-04-05',
    description: '探讨如何设计和实现真正的响应式网站，包括布局策略、媒体查询和适配不同设备的技巧。（测试用文本）',
    image: '/my-homepage/images/Content/Facebook post - 1.png',
    link: '#'
  }
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // 过滤博客文章
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 页面头部 */}
      <header className="py-12 px-4 bg-muted/30 border-b border-border" style={{ paddingTop: '65px' }}>
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">博客</h1>
          <p className="text-muted-foreground mt-2">分享前端开发、设计和技术相关的文章</p>
        </div>
      </header>

      {/* 搜索栏 */}
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索文章..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* 文章列表 */}
      <div className="container max-w-4xl mx-auto py-4 px-4">
        <div className="grid gap-6 md:gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="border-border/50 bg-card hover:shadow-md transition-shadow rounded-3xl overflow-hidden">
              {post.image && (
                <div className="w-full h-48 md:h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {post.title}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-foreground">
                  {post.description}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 bg-[#B27F9E] hover:bg-[#B27F9E]/90 text-white rounded-2xl"
                  asChild
                >
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    阅读全文
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* 页脚 */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        <p>
          © 2026 Alicia 的个人主页
          <span className="mx-2">|</span>
          <Link to="/about" className="hover:text-primary transition-colors">关于</Link>
        </p>
      </footer>
    </div>
  );
}