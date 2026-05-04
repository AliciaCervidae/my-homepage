import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: '博客',
    description: 'Design/Coding/illustration',
    link: '/blog',
    tags: ['React', 'Tailwind CSS', '前端']
  },
  {
    id: 2,
    title: '设计',
    description: '独立设计作品集',
    link: '/design-works',
    tags: ['UI', '平面', 'UX']
  },
  {
    id: 3,
    title: '绘画',
    description: '个人绘画作品的在线展示，包含不同风格和主题的艺术作品。',
    link: '/artworks',
    tags: ['艺术', '绘画', '设计']
  }
];

export default function ProjectsSection() {
  return (
    <section className="w-full py-12 md:py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* 标题 */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              我的作品
            </h2>
            <p className="text-sm text-muted-foreground">
              这里展示了我近期完成的一些项目和作品 ✨
            </p>
          </div>

          {/* 作品列表 */}
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={project.link}
                className="block"
              >
                <Card className="border-border/50 bg-card hover:shadow-[0_0_15px_3px_rgba(139,92,246,0.2),0_0_35px_6px_rgba(59,130,246,0.15)] transition-shadow flex flex-col h-full rounded-3xl cursor-pointer hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {project.tags.join(' · ')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-foreground">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}