import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'lucide-react';

const skillTags = ['Unity', 'UE5', 'Blender', 'AIGC', 'C#', 'Shader'];

export default function PersonalStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const progress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height) / (viewportHeight + rect.height)));
            setParallaxOffset(progress * 200 - 100);
          };

          window.addEventListener('scroll', handleScroll, { passive: true });
          handleScroll();

          observer.disconnect();

          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="statement"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#0F1214',
        padding: '120px 0',
      }}
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/statement-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
          transform: `translateY(${parallaxOffset}px)`,
          transition: 'transform 0.1s linear',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[800px] px-4 text-center sm:px-6">
        {/* Terminal icon */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0s',
          }}
        >
          <Terminal size={40} style={{ color: '#E8905A' }} className="mx-auto" />
        </div>

        {/* Title */}
        <h2
          className="mt-6 text-3xl sm:text-4xl whitespace-nowrap"
          style={{
            fontFamily: '"SmileySans-Oblique", "LXGW WenKai", system-ui, sans-serif',
            color: '#F0F4F8',
            lineHeight: 1.2,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.1s',
          }}
        >
          自我评价
        </h2>

        {/* Statement text */}
        <div
          className="mt-6 flex flex-col gap-3"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.2s',
          }}
        >
          <p
            className="text-base sm:text-lg"
            style={{
              fontFamily: '"LXGW WenKai", "Noto Sans SC", system-ui, sans-serif',
              color: '#F0F4F8',
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Unity/UE游戏开发工程师，主攻3D领域的技术美术学习者，AI工具的深入实践者
          </p>
          <p
            className="text-base sm:text-lg"
            style={{
              fontFamily: '"LXGW WenKai", "Noto Sans SC", system-ui, sans-serif',
              color: '#8A9DB0',
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            具备Unity全链路开发能力与3D资产生产经验的复合型开发者，已完成从概念设计到引擎集成的完整项目闭环。
            深耕AIGC技术在游戏开发管线中的创新应用，深谙如何利用Vibe Coding实践和迁移编程思维。
            以性能优化、视觉设计和跨领域协作为切入点，向技术美术职业目标持续进化。
          </p>
        </div>

        {/* Skill tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {skillTags.map((tag, i) => (
            <span
              key={tag}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 hover:scale-105"
              data-cursor-hover
              style={{
                background: 'rgba(232,144,90,0.15)',
                color: '#E8905A',
                fontFamily: '"LXGW WenKai", "Noto Sans SC", system-ui, sans-serif',
                fontWeight: 500,
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${0.4 + i * 0.08}s`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
