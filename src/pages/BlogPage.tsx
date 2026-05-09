import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from 'virtual:blog-posts';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const posts = blogPosts;

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);

    setCurrentPage(nextPage);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 页面头部 */}
      <header className="pt-[65px] pb-12 bg-muted/30 border-b border-border">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">博客</h1>
          <p className="text-muted-foreground mt-2">分享前端开发、设计和技术相关的文章</p>
        </div>
      </header>

      {/* 搜索栏 */}
      <div className="container max-w-4xl mx-auto py-6">
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
      <div className="container max-w-4xl mx-auto py-4">
        <div className="grid gap-6 md:gap-8">
          {paginatedPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="block"
            >
              <Card className="border-border/50 bg-card hover:shadow-[0_0_15px_3px_rgba(139,92,246,0.2),0_0_35px_6px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all rounded-3xl overflow-hidden cursor-pointer">
                {post.image && (
                  <div className="w-full h-48 md:h-64 overflow-hidden">
                    <img
                      src={post.image?.startsWith('/')
                        ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${post.image}`
                        : post.image}
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
              </Card>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="text-sm text-muted-foreground">
              第 {currentPage} / {totalPages} 页
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-lg">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full px-4 text-muted-foreground hover:bg-white/20"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                上一页
              </Button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <Button
                  key={page}
                  type="button"
                  variant={page === currentPage ? 'default' : 'ghost'}
                  size="icon"
                  className={
                    page === currentPage
                      ? 'h-9 w-9 rounded-full bg-[#B27F9E] text-white hover:bg-[#B27F9E]/90'
                      : 'h-9 w-9 rounded-full text-muted-foreground hover:bg-white/20'
                  }
                  aria-current={page === currentPage ? 'page' : undefined}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full px-4 text-muted-foreground hover:bg-white/20"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                下一页
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 空状态 */}
      {filteredPosts.length === 0 && posts.length > 0 && (
        <div className="container max-w-4xl mx-auto py-12 px-4 text-center">
          <p className="text-muted-foreground">没有找到匹配的文章</p>
        </div>
      )}

      {posts.length === 0 && !searchTerm && (
        <div className="container max-w-4xl mx-auto py-12 px-4 text-center">
          <p className="text-muted-foreground">还没有文章。把 Markdown 文件放进 public/posts 就会自动发布。</p>
        </div>
      )}

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
