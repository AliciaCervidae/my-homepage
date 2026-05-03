import fs from "node:fs/promises";
import { defineConfig, type Plugin } from "vite";
import { miaodaDevPlugin } from "miaoda-sc-plugin";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

const blogPostsModuleId = "virtual:blog-posts";
const resolvedBlogPostsModuleId = `\0${blogPostsModuleId}`;
const postsDir = path.resolve(__dirname, "public/posts");

interface BlogPostFrontmatter {
  title?: string;
  date?: string;
  description?: string;
  image?: string;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  content: string;
}

function parseFrontmatter(markdown: string): {
  frontmatter: BlogPostFrontmatter;
  content: string;
} {
  if (!markdown.startsWith("---")) {
    return { frontmatter: {}, content: markdown.trim() };
  }

  const closingMarkerIndex = markdown.indexOf("\n---", 3);

  if (closingMarkerIndex === -1) {
    return { frontmatter: {}, content: markdown.trim() };
  }

  const frontmatterText = markdown.slice(3, closingMarkerIndex).trim();
  const content = markdown.slice(closingMarkerIndex + 4).trim();
  const frontmatter: BlogPostFrontmatter = {};

  for (const line of frontmatterText.split("\n")) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    if (key === "title" || key === "date" || key === "description" || key === "image") {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content };
}

function getFallbackTitle(content: string, id: string) {
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();

  return heading || id;
}

function getFallbackDescription(content: string) {
  const paragraph = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith("#") && !block.startsWith("!"));

  return paragraph ? paragraph.replace(/\s+/g, " ").slice(0, 120) : "";
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function isMarkdownFile(fileName: string) {
  return fileName.endsWith(".md") || fileName.endsWith(".mdx");
}

function isPostFile(filePath: string) {
  return isMarkdownFile(filePath) && path.dirname(filePath) === postsDir;
}

function blogPostsPlugin(): Plugin {
  return {
    name: "blog-posts",
    configureServer(server) {
      server.watcher.add(postsDir);
      server.watcher.on("all", (eventName, filePath) => {
        if (!["add", "change", "unlink"].includes(eventName) || !isPostFile(filePath)) {
          return;
        }

        const blogPostsModule = server.moduleGraph.getModuleById(resolvedBlogPostsModuleId);

        if (blogPostsModule) {
          server.moduleGraph.invalidateModule(blogPostsModule);
        }

        server.ws.send({ type: "full-reload", path: "*" });
      });
    },
    resolveId(id) {
      if (id === blogPostsModuleId) {
        return resolvedBlogPostsModuleId;
      }
    },
    async load(id) {
      if (id !== resolvedBlogPostsModuleId) {
        return;
      }

      let fileNames: string[] = [];

      try {
        fileNames = await fs.readdir(postsDir);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          throw error;
        }
      }

      const posts = await Promise.all(
        fileNames.filter(isMarkdownFile).map(async (fileName): Promise<BlogPost> => {
          const filePath = path.join(postsDir, fileName);
          const [markdown, stats] = await Promise.all([
            fs.readFile(filePath, "utf8"),
            fs.stat(filePath),
          ]);
          const { frontmatter, content } = parseFrontmatter(markdown);
          const id = path.basename(fileName, path.extname(fileName));

          return {
            id,
            title: frontmatter.title || getFallbackTitle(content, id),
            date: frontmatter.date || formatDate(stats.mtime),
            description: frontmatter.description || getFallbackDescription(content),
            image: frontmatter.image,
            content,
          };
        }),
      );

      posts.sort((firstPost, secondPost) => secondPost.date.localeCompare(firstPost.date));

      return [
        `export const blogPosts = ${JSON.stringify(posts)};`,
        "export function getBlogPost(id) {",
        "  return blogPosts.find((post) => post.id === id);",
        "}",
      ].join("\n");
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    blogPostsPlugin(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
    miaodaDevPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/my-homepage/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
