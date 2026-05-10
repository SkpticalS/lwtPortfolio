import { useRef, useEffect } from 'react';
import { GraduationCap, Zap } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const cardEasing = 'cubic-bezier(0.16, 1, 0.3, 1)';

const educationItems = [
  '中国传媒大学 · 动画专业 · 技术美术方向',
  '童之梦梦核场景项目 — 省级三等奖',
  '全国大学生数字媒体科技作品竞赛 省级奖项',
];

const commercialItems = [
  '橘香绣韵虚拟博物馆 — 累计销售近10,000件产品，帮扶40余户果农',
  'UE5 场景性能优化 — 帧率从 20fps 提升至 70-90fps',
  '全流程独立交付 — 从概念到上线的完整项目落地',
];

export default function ExperienceCards() {
  const { ref: titleRef, isInView: titleInView } = useInViewAnimation({ threshold: 0.1 });
  const { ref: card1Ref, isInView: card1InView } = useInViewAnimation({ threshold: 0.1 });
  const { ref: card2Ref, isInView: card2InView } = useInViewAnimation({ threshold: 0.1 });

  // Parallax effect for decorative images
  const deco1Ref = useRef<HTMLImageElement>(null);
  const deco2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const section = document.getElementById('experience');
        if (!section) {
          rafId = 0;
          return;
        }

        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate progress: 0 when section enters viewport, 1 when it leaves
        const progress = Math.max(
          0,
          Math.min(1, (viewportHeight - rect.top) / (viewportHeight + sectionHeight))
        );

        const maxOffset = 30;
        const offset = progress * maxOffset;

        if (deco1Ref.current) {
          deco1Ref.current.style.transform = `translateY(${-offset}px)`;
        }
        if (deco2Ref.current) {
          deco2Ref.current.style.transform = `translateY(${-offset * 0.8}px)`;
        }

        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="experience"
      style={{ background: '#0F1214', padding: '100px 0' }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          ref={titleRef}
          className="mb-12"
          style={{
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
            经历与成果
          </h2>
        </div>

        {/* Two-card grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Dark Card — Education */}
          <div
            ref={card1Ref}
            className="relative overflow-hidden rounded-[24px] p-8 md:p-10"
            style={{
              background: '#1A1E23',
              border: '1px solid rgba(255,255,255,0.08)',
              opacity: card1InView ? 1 : 0,
              transform: card1InView ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.8s 0.15s ${cardEasing}, transform 0.8s 0.15s ${cardEasing}`,
            }}
          >
            <GraduationCap size={32} style={{ color: '#E8905A' }} />
            <h3
              className="mt-4 text-[22px]"
              style={{
                fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                color: '#F0F4F8',
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              教育与竞赛
            </h3>
            <ul className="mt-6 space-y-3">
              {educationItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base"
                  style={{
                    fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                    color: '#F0F4F8',
                    fontWeight: 400,
                    lineHeight: 2.0,
                  }}
                >
                  <span
                    className="mt-[11px] inline-block h-[6px] w-[6px] flex-shrink-0 rounded-full"
                    style={{ background: '#E8905A' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            {/* Decorative watermark */}
            <img
              ref={deco1Ref}
              src="/projects/tongzhimeng1.png"
              alt=""
              className="pointer-events-none absolute -bottom-5 -right-5 h-[200px] w-[200px] object-cover opacity-[0.15]"
              style={{ borderRadius: '12px' }}
            />
          </div>

          {/* Light Card — Commercial */}
          <div
            ref={card2Ref}
            className="relative overflow-hidden rounded-[24px] p-8 md:p-10"
            style={{
              background: 'linear-gradient(135deg, #1A1E23 0%, #1E2328 100%)',
              border: '1px solid rgba(232,144,90,0.15)',
              opacity: card2InView ? 1 : 0,
              transform: card2InView ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.8s 0.3s ${cardEasing}, transform 0.8s 0.3s ${cardEasing}`,
            }}
          >
            <Zap size={32} style={{ color: '#E8905A' }} />
            <h3
              className="mt-4 text-[22px]"
              style={{
                fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                color: '#F0F4F8',
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              商业化与技术攻坚
            </h3>
            <ul className="mt-6 space-y-3">
              {commercialItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base"
                  style={{
                    fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                    color: '#F0F4F8',
                    fontWeight: 400,
                    lineHeight: 2.0,
                  }}
                >
                  <span
                    className="mt-[11px] inline-block h-[6px] w-[6px] flex-shrink-0 rounded-full"
                    style={{ background: '#E8905A' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            {/* Decorative watermark */}
            <img
              ref={deco2Ref}
              src="/projects/juxiangxiuyun.png"
              alt=""
              className="pointer-events-none absolute -bottom-5 -right-5 h-[200px] w-[200px] object-cover opacity-[0.15]"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
