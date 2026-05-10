import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const lerp = 0.15;
    posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
    posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${targetRef.current.x - 4}px, ${targetRef.current.y - 4}px)`;
    }
    if (ringRef.current) {
      const size = isHoveringRef.current ? 40 : 20;
      const offset = size / 2;
      ringRef.current.style.width = `${size}px`;
      ringRef.current.style.height = `${size}px`;
      ringRef.current.style.transform = `translate(${posRef.current.x - offset}px, ${posRef.current.y - offset}px)`;
      ringRef.current.style.borderColor = isHoveringRef.current
        ? 'rgba(232, 144, 90, 0.6)'
        : 'rgba(232, 144, 90, 0.4)';
      ringRef.current.style.background = isHoveringRef.current
        ? 'rgba(232, 144, 90, 0.08)'
        : 'transparent';
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-interactive') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('[data-cursor-hover]');

      if (isInteractive) {
        isHoveringRef.current = true;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-interactive') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('[data-cursor-hover]');

      if (isInteractive) {
        const related = e.relatedTarget as HTMLElement;
        if (!related || !(
          related.closest('a') ||
          related.closest('button') ||
          related.closest('[role="button"]') ||
          related.closest('.cursor-interactive') ||
          related.closest('[data-cursor-hover]')
        )) {
          isHoveringRef.current = false;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: '1.5px solid rgba(232, 144, 90, 0.4)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease',
          mixBlendMode: 'screen',
        }}
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#E8905A',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 8px rgba(232, 144, 90, 0.5)',
        }}
      />
    </>
  );
}
