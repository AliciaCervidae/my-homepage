import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
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
  }
];

export default routes;