import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

// 模拟设计作品数据
interface DesignWork {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

const designWorks: DesignWork[] = [
  {
    id: 1,
    title: '企业品牌设计',
    category: 'UI',
    description: '为科技公司设计的完整品牌视觉系统，包括logo、色彩系统和应用场景。（测试用文本）',
    image: '/my-homepage/images/Content/Facebook post - 1.png',
    link: '#'
  },
  {
    id: 2,
    title: '移动应用界面设计',
    category: 'UX',
    description: '健康追踪应用的用户界面设计，注重用户体验和交互流畅度。（测试用文本）',
    image: '/my-homepage/images/Content/Facebook post - 1.png',
    link: '#'
  },
  {
    id: 3,
    title: '电商网站设计',
    category: '平面',
    description: '时尚电商平台的网页设计，结合现代美学和用户友好的购物体验。（测试用文本）',
    image: '/my-homepage/images/Content/Facebook post - 1.png',
    link: '#'
  }
];

const categories = ['全部', 'UI', 'UX', '平面'];

export default function DesignWorksPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');

  // 过滤设计作品
  const filteredWorks = selectedCategory === '全部' 
    ? designWorks 
    : designWorks.filter(work => work.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 页面头部 */}
      <header className="py-8 px-4 bg-muted/30 border-b border-border">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">设计</h1>
          <p className="text-muted-foreground mt-2">独立设计作品集，包含UI、UX和平面设计项目</p>
        </div>
      </header>

      {/* 分类筛选 */}
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              className={selectedCategory === category ? 'bg-[#B27F9E] hover:bg-[#B27F9E]/90 text-white' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* 作品列表 */}
      <div className="container max-w-4xl mx-auto py-4 px-4">
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
          {filteredWorks.map((work) => (
            <Card key={work.id} className="border-border/50 bg-card hover:shadow-md transition-shadow rounded-3xl overflow-hidden">
              <div className="w-full h-48 md:h-56 overflow-hidden">
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {work.title}
                  </CardTitle>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    {work.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-foreground">
                  {work.description}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full gap-2 bg-[#B27F9E] hover:bg-[#B27F9E]/90 text-white rounded-2xl"
                  asChild
                >
                  <a href={work.link} target="_blank" rel="noopener noreferrer">
                    查看详情
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