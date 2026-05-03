// src/types/virtual-modules.d.ts

declare module 'virtual:blog-posts' {
  export interface BlogPost {
    id: string;
    title: string;
    date: string;
    description: string;
    image?: string;
    content: string;
  }

  export const blogPosts: BlogPost[];
  export function getBlogPost(id: string): BlogPost | undefined;
}

declare module '@/db/supabase' {
  export const supabase: ReturnType<typeof import('@supabase/supabase-js').createClient>;
}

declare module '@/types/types' {
  export interface Profile {
    [key: string]: unknown;
  }
}
