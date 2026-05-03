import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import DesignWorksPage from './pages/DesignWorksPage';
import ArtworksPage from './pages/ArtworksPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: '主页',
    path: '/',
    element: <HomePage />
  },
  {
    name: '关于',
    path: '/about',
    element: <AboutPage />
  },
  {
    name: '博客',
    path: '/blog',
    element: <BlogPage />
  },
  {
    name: '博客文章',
    path: '/blog/:id',
    element: <BlogPostPage />,
    visible: false
  },
  {
    name: '设计',
    path: '/design-works',
    element: <DesignWorksPage />
  },
  {
    name: '绘画',
    path: '/artworks',
    element: <ArtworksPage />
  }
];

export default routes;
