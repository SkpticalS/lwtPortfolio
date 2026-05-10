import { useState, useCallback } from 'react';
import { X } from 'lucide-react';

const marqueeImages = [
  '/projects/tongzhimeng1.png',
  '/projects/tongzhimeng2.png',
  '/projects/chuanxiaohai.png',
  '/projects/jinyuanzhou.png',
  '/projects/juxiangxiuyun.png',
  '/projects/juxiangxiuyun-character.png',
  '/projects/ancient-tower-ue5.png',
  '/projects/character-peek.png',
];

export default function Marquee() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const openLightbox = useCallback((src: string) => {
    setLightboxImage(src);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  // Duplicate for seamless loop
  const allImages = [...marqueeImages, ...marqueeImages];

  return (
    <>
      <section
        id="marquee"
        className="relative overflow-hidden"
        style={{
          background: '#0F1214',
          padding: '40px 0',
        }}
      >
        {/* Left fade mask */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[80px]"
          style={{ background: 'linear-gradient(to right, #0F1214, transparent)' }}
        />
        {/* Right fade mask */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[80px]"
          style={{ background: 'linear-gradient(to left, #0F1214, transparent)' }}
        />

        {/* Scrolling track - animation runs always, NOT paused on hover */}
        <div
          className="flex"
          style={{
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
          }}
        >
          {allImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-2"
              data-cursor-hover
              onClick={() => openLightbox(src)}
            >
              <div
                className="overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:ring-2"
                style={{
                  height: '200px',
                  width: 'auto',
                  minWidth: '280px',
                }}
              >
                <img
                  src={src}
                  alt={`作品 ${(i % marqueeImages.length) + 1}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)' }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            onClick={closeLightbox}
            data-cursor-hover
          >
            <X size={24} style={{ color: '#F0F4F8' }} />
          </button>

          {/* Image */}
          <img
            src={lightboxImage}
            alt="大图预览"
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      )}
    </>
  );
}
