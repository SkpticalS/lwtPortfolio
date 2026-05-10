import { useEffect, useState } from 'react';
import { Download, ArrowDown } from 'lucide-react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    const marquee = document.getElementById('marquee');
    if (marquee) marquee.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToProjects = () => {
    const projects = document.getElementById('projects');
    if (projects) projects.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
      style={{ background: '#0F1214' }}
    >
      {/* Background gradient image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-bg-gradient.png)',
          backgroundPosition: 'bottom right',
          backgroundSize: 'cover',
          opacity: 0.4,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center px-4 text-center">
        {/* Name */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            transitionDelay: '0.2s',
          }}
        >
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
            style={{
              fontFamily: '"KuibenKaiShu", "LXGW WenKai", system-ui, sans-serif',
              fontWeight: 400,
              letterSpacing: '0.2em',
              lineHeight: 1.1,
              background: 'linear-gradient(180deg, #F0F4F8 0%, #E8905A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(232,144,90,0.4)) drop-shadow(0 0 60px rgba(232,144,90,0.15))',
            }}
          >
            罗文韬
          </h1>
          {/* Decorative line below */}
          <div
            className="mx-auto mt-4 h-px w-24"
            style={{
              background: 'linear-gradient(90deg, transparent, #E8905A, transparent)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: '0.3s',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="mt-4 text-sm"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: '#8A9DB0',
            letterSpacing: '0.08em',
            fontWeight: 400,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.4s',
          }}
        >
          中国传媒大学 · 数字媒体技术 · 游戏美术方向
        </p>

        {/* Main Heading */}
        <h2
          className="mt-6 text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-[48px] whitespace-nowrap"
          style={{
            fontFamily: '"LXGW WenKai", "SmileySans-Oblique", system-ui, sans-serif',
            color: '#F0F4F8',
            lineHeight: 1.15,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(60px)',
            transition: 'opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1), transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.5s',
          }}
        >
          Unity/UE 游戏开发工程师
          <br />
          <span className="text-base text-[#8A9DB0] sm:text-lg md:text-xl">
            主攻3D领域 · 技术美术学习者
          </span>
        </h2>

        {/* Decorative gradient line */}
        <div
          className="mx-auto mt-6 h-0.5 w-[60%]"
          style={{
            background: 'linear-gradient(90deg, transparent, #E8905A, transparent)',
            transformOrigin: 'center',
            transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.8s',
          }}
        />

        {/* Description paragraphs */}
        <div className="mt-6 flex max-w-[560px] flex-col gap-3">
          {[
            '具备Unity全链路开发能力与3D资产生产经验',
            '已完成从概念设计到引擎集成的完整项目闭环',
            '深耕AIGC技术在游戏开发管线中的创新应用',
          ].map((text, i) => (
            <p
              key={i}
              className="text-base"
              style={{
                fontFamily: '"LXGW WenKai", "Noto Sans SC", system-ui, sans-serif',
                color: '#8A9DB0',
                fontWeight: 300,
                lineHeight: 1.8,
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${0.9 + i * 0.15}s`,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Buttons */}
        <div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '1.4s',
          }}
        >
          <a
            href="#"
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #E8905A, #C75B2A)',
              color: '#fff',
              fontFamily: '"LXGW WenKai", "Noto Sans SC", system-ui, sans-serif',
            }}
          >
            <Download size={16} />
            下载简历
          </a>
          <button
            data-cursor-hover
            onClick={handleScrollToProjects}
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              borderColor: 'rgba(232,144,90,0.3)',
              color: '#E8905A',
              fontFamily: '"LXGW WenKai", "Noto Sans SC", system-ui, sans-serif',
            }}
          >
            查看项目
          </button>
        </div>

        {/* Scroll down hint */}
        <div
          className="mt-12 flex flex-col items-center gap-2"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.2s ease-out',
            transitionDelay: '1.8s',
          }}
        >
          <p className="text-xs" style={{ color: '#8A9DB0', fontFamily: '"JetBrains Mono", monospace' }}>
            SCROLL
          </p>
          <div
            data-cursor-hover
            onClick={handleScrollDown}
            className="cursor-interactive"
          >
            <ArrowDown size={20} style={{ color: '#E8905A' }} className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
