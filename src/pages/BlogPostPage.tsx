import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';
import { getBlogPost } from 'virtual:blog-posts';

export default function BlogPostPage() {
  const { id } = useParams();
  const post = id ? getBlogPost(id) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">文章不存在</p>
        <Link to="/blog" className="text-primary hover:underline">返回博客</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="pt-[65px] pb-8 border-b border-border">
        <div className="container max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回博客
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{post.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{post.date}</p>
        </div>
        <article className="max-w-none prose prose-gray dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) => {
                const resolvedSrc =
                  src && src.startsWith('/')
                    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${src}`
                    : src;
                return <img src={resolvedSrc} alt={alt} className="max-w-full h-auto rounded-lg" />;
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
