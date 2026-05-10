import { useEffect, useState, useRef, memo } from 'react';

const ScrollProgress = memo(function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafIdRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const newProgress = (scrollTop / scrollHeight) * 100;
        setProgress(Math.min(100, Math.max(0, newProgress)));
      }
    };

    const onScroll = () => {
      lastScrollRef.current = window.scrollY;

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          const scrollTop = lastScrollRef.current;
          const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

          if (scrollHeight > 0) {
            const newProgress = (scrollTop / scrollHeight) * 100;
            setProgress(Math.min(100, Math.max(0, newProgress)));
          }
          rafIdRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[100] h-[3px]"
      style={{
        background: 'transparent',
      }}
    >
      <div
        className="h-full origin-left"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #E8905A 0%, #C75B2A 100%)',
          transition: 'width 0.1s ease-out',
        }}
      />
    </div>
  );
});

export default ScrollProgress;
