import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

// 模拟绘画作品数据
interface Artwork {
  id: number;
  title: string;
  style: string;
  description: string;
  image: string;
  link: string;
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: '城市风景',
    style: '写实',
    description: '以城市建筑为主题的写实风格绘画，捕捉现代都市的光影变化。（测试用文本）',
    image: '/my-homepage/images/Content/Facebook post - 1.png',
    link: '#'
  },
  {
    id: 2,
    title: '抽象表达',
    style: '抽象',
    description: '通过色彩和线条表达内心情感的抽象风格作品（测试用文本）。',
    image: '/my-homepage/images/Content/Facebook post - 1.png',
    link: '#'
  },
  {
    id: 3,
    title: '自然景观',
    style: '水彩',
    description: '以自然风景为主题的水彩画作品，展现大自然的宁静与美丽。（测试用文本）',
    image: '/my-homepage/images/Content/Facebook post - 1.png',
    link: '#'
  }
];

const styles = ['全部', '写实', '抽象', '水彩'];

export default function ArtworksPage() {
  const [selectedStyle, setSelectedStyle] = useState('全部');

  // 过滤绘画作品
  const filteredArtworks = selectedStyle === '全部' 
    ? artworks 
    : artworks.filter(artwork => artwork.style === selectedStyle);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 页面头部 */}
      <header className="py-12 px-4 bg-muted/30 border-b border-border" style={{ paddingTop: '65px' }}>
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">绘画</h1>
          <p className="text-muted-foreground mt-2">个人绘画作品的在线展示，包含不同风格和主题的艺术作品</p>
        </div>
      </header>

      {/* 风格筛选 */}
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="flex flex-wrap gap-2">
          {styles.map(style => (
            <Button
              key={style}
              variant={selectedStyle === style ? 'default' : 'outline'}
              size="sm"
              className={selectedStyle === style ? 'bg-[#B27F9E] hover:bg-[#B27F9E]/90 text-white' : ''}
              onClick={() => setSelectedStyle(style)}
            >
              {style}
            </Button>
          ))}
        </div>
      </div>

      {/* 作品列表 */}
      <div className="container max-w-4xl mx-auto py-4 px-4">
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="border-border/50 bg-card hover:shadow-md transition-shadow rounded-3xl overflow-hidden">
              <div className="w-full h-48 md:h-56 overflow-hidden">
                <img 
                  src={artwork.image} 
                  alt={artwork.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {artwork.title}
                  </CardTitle>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    {artwork.style}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-foreground">
                  {artwork.description}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full gap-2 bg-[#B27F9E] hover:bg-[#B27F9E]/90 text-white rounded-2xl"
                  asChild
                >
                  <a href={artwork.link} target="_blank" rel="noopener noreferrer">
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