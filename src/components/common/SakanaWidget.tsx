import { useEffect, useRef } from 'react';

export default function SakanaWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 0.6 : 0.5;

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sakana';
    script.onload = () => {
      try {
        const Sakana = Function('return Sakana')();
        if (Sakana) {
          Sakana.init({
            el: containerRef.current!,
            scale,
            canSwitchCharacter: true,
          });
        }
      } catch (e) {
        console.error('Failed to init Sakana:', e);
      }
    };
    document.body.appendChild(script);

    return () => {
      try {
        const Sakana = Function('return Sakana')();
        if (Sakana?.destroy) {
          Sakana.destroy();
        }
      } catch (e) {
        // ignore cleanup errors
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-0 right-0 z-50 pointer-events-none">
      <div
        ref={containerRef}
        style={{ transformOrigin: '100% 100%' }}
      />
    </div>
  );
}
