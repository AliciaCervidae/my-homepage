import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/home/HeroSection';
import InfoSection from '@/components/home/InfoSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ChatButton from '@/components/common/ChatButton';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero 区 */}
      <HeroSection />
      
      {/* 个人信息展示区 */}
      <InfoSection />
      
      {/* 作品展示区 */}
      <ProjectsSection />
      
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