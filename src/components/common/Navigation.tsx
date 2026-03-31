import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import routes from '@/routes';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50">
      {/* 导航按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
      >
        {isOpen ? (
          <X className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Menu className="w-4 h-4 text-muted-foreground" />
        )}
        <span className="text-muted-foreground font-medium">菜单</span>
      </button>

      {/* 导航菜单 */}
      {isOpen && (
        <div className="mt-2 w-64 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-4 animate-fade-in">
          <nav className="space-y-2">
            {routes.map((route, index) => (
              <Link
                key={index}
                to={route.path}
                className="block px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}