import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-background py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* 标题 */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">关于我</h1>
            <p className="text-sm text-muted-foreground">了解更多关于 Alicia 的信息</p>
          </div>

          {/* 关于内容 */}
          <Card className="border-border bg-card rounded-3xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground">个人介绍</h2>
              <p className="text-muted-foreground">
                你好，我是 Alicia，也可以叫我鹿鹿🦌。我是一个热爱技术和创作的人，喜欢通过代码、设计和绘画表达自己。这个博客是我用来展示我的兴趣、技能和一些个人项目的地方。希望你能喜欢这里的内容，也欢迎随时联系我交流想法！
              </p>
              
              <h2 className="text-xl font-semibold text-foreground">技术栈</h2>
              <p className="text-muted-foreground">
                前端：React、TypeScript、Tailwind CSS、Vite<br/>
                后端：Supabase、Edge Functions<br/>
                其他：Figma、基于 Adobe / Affinity 的图片处理、Clip Studio Paint<br/>
              </p>
              
              <h2 className="text-xl font-semibold text-foreground">兴趣爱好</h2>
              <p className="text-muted-foreground">
                绘画、游戏、阅读、探索新技术
              </p>

              <h2 className="text-xl font-semibold text-foreground">联系方式</h2>
              <p className="text-muted-foreground">
                邮箱: irisafterrain@outlook.com<br/>
              </p>
            </CardContent>
          </Card>

          {/* 返回首页链接 */}
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:underline transition-colors"
            >
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}