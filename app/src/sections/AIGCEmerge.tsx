import { useRef, useCallback, useEffect } from 'react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const imagePool = [
  '/projects/aigc-thumb-1.png',
  '/projects/aigc-thumb-2.png',
  '/projects/aigc-thumb-3.png',
  '/projects/aigc-thumb-4.png',
  '/projects/aigc-thumb-5.png',
  '/projects/character-peek.png',
  '/projects/tongzhimeng2.png',
  '/projects/juxiangxiuyun-character.png',
];

interface SpawnedImage {
  element: HTMLImageElement;
  timeoutId: ReturnType<typeof setTimeout>;
}

const cardEasing = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function AIGCEmerge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnTimeRef = useRef<number>(0);
  const spawnedImagesRef = useRef<SpawnedImage[]>([]);

  const { ref: titleRef, isInView: titleInView } = useInViewAnimation({ threshold: 0.1 });
  const { ref: hintRef, isInView: hintInView } = useInViewAnimation({ threshold: 0.1 });

  // Clean up all timeouts/animation frames on unmount
  useEffect(() => {
    return () => {
      spawnedImagesRef.current.forEach(({ timeoutId }) => {
        clearTimeout(timeoutId);
      });
      spawnedImagesRef.current = [];
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const now = Date.now();
    if (now - lastSpawnTimeRef.current < 80) return;
    lastSpawnTimeRef.current = now;

    const containerRect = container.getBoundingClientRect();
    const relX = e.clientX - containerRect.left;
    const relY = e.clientY - containerRect.top;

    // Randomly pick from image pool
    const randomImage = imagePool[Math.floor(Math.random() * imagePool.length)];
    const randomRotation = Math.random() * 20 - 10; // -10 to +10 degrees

    // Create img element
    const img = document.createElement('img');
    img.src = randomImage;
    img.style.position = 'absolute';
    img.style.left = `${relX - 90}px`;
    img.style.top = `${relY - 60}px`;
    img.style.width = '180px';
    img.style.height = '120px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
    img.style.pointerEvents = 'none';
    img.style.opacity = '1';
    img.style.transform = `rotate(${randomRotation}deg) scale(1)`;
    img.style.transition = 'opacity 1000ms ease-out, transform 1000ms ease-out';

    container.appendChild(img);

    // Enforce max 50 simultaneous images
    if (spawnedImagesRef.current.length >= 50) {
      const oldest = spawnedImagesRef.current.shift();
      if (oldest) {
        clearTimeout(oldest.timeoutId);
        if (oldest.element.parentNode) {
          oldest.element.parentNode.removeChild(oldest.element);
        }
      }
    }

    // Animate and remove
    const timeoutId = setTimeout(() => {
      img.style.opacity = '0';
      img.style.transform = `rotate(${randomRotation}deg) scale(0)`;

      const removeTimeout = setTimeout(() => {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
        spawnedImagesRef.current = spawnedImagesRef.current.filter(
          (item) => item.element !== img
        );
      }, 1000);

      // Store the remove timeout so we can clean it up
      spawnedImagesRef.current.push({
        element: img,
        timeoutId: removeTimeout as unknown as ReturnType<typeof setTimeout>,
      });
    }, 50);

    // Store initial timeout
    spawnedImagesRef.current.push({ element: img, timeoutId });
  }, []);

  return (
    <section
      id="aigc"
      className="relative overflow-hidden"
      style={{
        background: '#0F1214',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        height: '80vh',
        minHeight: '500px',
        cursor: 'crosshair',
      }}
    >
      {/* Title - top left */}
      <div
        ref={titleRef}
        className="absolute z-10 p-6 md:p-12"
        style={{
          top: 0,
          left: 0,
          opacity: titleInView ? 1 : 0,
          transform: titleInView ? 'translateY(0)' : 'translateY(40px)',
          transition: `opacity 0.8s ${cardEasing}, transform 0.8s ${cardEasing}`,
        }}
      >
        <h2
          className="text-[28px] md:text-[36px]"
          style={{
            fontFamily: '"LXGW WenKai", "SmileySans-Oblique", system-ui, sans-serif',
            color: '#F0F4F8',
            lineHeight: 1.2,
          }}
        >
          AIGC 创意涌现
        </h2>
      </div>

      {/* Subtitle hint - bottom left */}
      <div
        ref={hintRef}
        className="absolute z-10 p-6 md:p-12"
        style={{
          bottom: 0,
          left: 0,
          opacity: hintInView ? 1 : 0,
          transform: hintInView ? 'translateY(0)' : 'translateY(40px)',
          transition: `opacity 0.8s 0.2s ${cardEasing}, transform 0.8s 0.2s ${cardEasing}`,
        }}
      >
        <p
          className="text-sm"
          style={{
            fontFamily: '"Noto Sans SC", system-ui, sans-serif',
            color: '#8A9DB0',
          }}
        >
          在区域内移动鼠标，触发AI生成的创意图像
        </p>
      </div>

      {/* Interactive image container */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
        onMouseMove={handleMouseMove}
      />
    </section>
  );
}
