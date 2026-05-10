import { useEffect, useRef, useState } from 'react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { Download } from 'lucide-react';

const projectLinks = [
  { label: '剧场穿梭', href: '#project-theater' },
  { label: '虚拟校园', href: '#project-campus' },
  { label: '传小海', href: '#project-chuanxiaohai' },
  { label: '童之梦', href: '#project-tongzhimeng' },
  { label: '橘香绣韵', href: '#project-juxiangxiuyun' },
  { label: 'Roblox关卡', href: '#project-roblox' },
  { label: '3D卡通工作流', href: '#project-workflow' },
];

const externalLinks = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: '个人博客', href: '#' },
  { label: 'B站主页', href: 'https://space.bilibili.com/' },
  { label: '联系方式', href: 'mailto:email@example.com' },
];

export default function Footer() {
  const { ref: btnRef, isInView: btnInView } = useInViewAnimation({ threshold: 0.1 });
  const { ref: gridRef, isInView: gridInView } = useInViewAnimation({ threshold: 0.1 });
  const { ref: logoRef, isInView: logoInView } = useInViewAnimation({ threshold: 0.1 });
  const { ref: copyrightRef, isInView: copyrightInView } = useInViewAnimation({ threshold: 0.1 });

  // Stagger link columns animation
  const [leftColVisible, setLeftColVisible] = useState(false);
  const [rightColVisible, setRightColVisible] = useState(false);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridInView) {
      const timer1 = setTimeout(() => setLeftColVisible(true), 0);
      const timer2 = setTimeout(() => setRightColVisible(true), 150);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [gridInView]);

  return (
    <footer id="footer" style={{ background: '#0A0D10' }}>
      <div className="mx-auto max-w-[1200px] px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        {/* Download Resume Button */}
        <div
          ref={btnRef}
          className="mb-16 flex justify-center"
          style={{
            opacity: btnInView ? 1 : 0,
            transform: btnInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-3 rounded-full px-12 py-5 text-lg font-medium text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(90deg, #E8905A, #C75B2A)',
              boxShadow: '0 8px 24px rgba(232,144,90,0.35)',
              fontFamily: '"Noto Sans SC", system-ui, sans-serif',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(232,144,90,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(232,144,90,0.35)';
            }}
          >
            <Download size={20} />
            下载完整简历
          </a>
        </div>

        {/* Link Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-12 md:grid-cols-2"
          style={{
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {/* Left Column - Project Links */}
          <div
            ref={leftColRef}
            style={{
              opacity: leftColVisible ? 1 : 0,
              transform: leftColVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <h4
              className="mb-5 text-base"
              style={{
                color: '#E8905A',
                fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                fontWeight: 500,
              }}
            >
              项目导航
            </h4>
            <ul className="space-y-1">
              {projectLinks.map((link, index) => (
                <li
                  key={link.href}
                  style={{
                    opacity: leftColVisible ? 1 : 0,
                    transform: leftColVisible ? 'translateX(0)' : 'translateX(-10px)',
                    transition: `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.06}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.06}s`,
                  }}
                >
                  <a
                    href={link.href}
                    className="inline-block py-1 text-[15px] transition-all duration-200 hover:pl-2"
                    style={{
                      color: '#8A9DB0',
                      fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                      fontWeight: 300,
                      lineHeight: 2.4,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#E8905A';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#8A9DB0';
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - External Links */}
          <div
            ref={rightColRef}
            style={{
              opacity: rightColVisible ? 1 : 0,
              transform: rightColVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
            }}
          >
            <h4
              className="mb-5 text-base"
              style={{
                color: '#E8905A',
                fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                fontWeight: 500,
              }}
            >
              链接
            </h4>
            <ul className="space-y-1">
              {externalLinks.map((link, index) => (
                <li
                  key={link.href}
                  style={{
                    opacity: rightColVisible ? 1 : 0,
                    transform: rightColVisible ? 'translateX(0)' : 'translateX(-10px)',
                    transition: `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.45 + index * 0.06}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.45 + index * 0.06}s`,
                  }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1 text-[15px] transition-all duration-200 hover:pl-2"
                    style={{
                      color: '#8A9DB0',
                      fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                      fontWeight: 300,
                      lineHeight: 2.4,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#E8905A';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#8A9DB0';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logo */}
        <div
          ref={logoRef}
          className="mt-16 text-center"
          style={{
            opacity: logoInView ? 1 : 0,
            transform: logoInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <span
            className="text-2xl"
            style={{
              fontFamily: '"LXGW WenKai", "SmileySans-Oblique", system-ui, sans-serif',
              color: '#F0F4F8',
              letterSpacing: '0.1em',
            }}
          >
            罗文韬
          </span>
        </div>
      </div>

      {/* Copyright Bar */}
      <div
        ref={copyrightRef}
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          opacity: copyrightInView ? 1 : 0,
          transform: copyrightInView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row">
          <p
            className="text-[13px]"
            style={{
              color: '#8A9DB0',
              fontFamily: '"Noto Sans SC", system-ui, sans-serif',
              fontWeight: 300,
            }}
          >
            © 2024 罗文韬. All Rights Reserved.
          </p>
          <p
            className="text-xs"
            style={{
              color: '#8A9DB0',
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 400,
            }}
          >
            Built with React + GSAP + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
