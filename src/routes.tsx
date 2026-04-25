import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
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
    element: <BlogPage />,
    visible: false
  },
  {
    name: '设计',
    path: '/design-works',
    element: <DesignWorksPage />,
    visible: false
  },
  {
    name: '绘画',
    path: '/artworks',
    element: <ArtworksPage />,
    visible: false
  }
];

export default routes;