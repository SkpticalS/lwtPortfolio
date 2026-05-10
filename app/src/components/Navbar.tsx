import { useEffect, useState, useRef, useCallback } from 'react';
import { Home, Briefcase, User, Mail } from 'lucide-react';

const navItems = [
  { label: '首页', href: '#hero', icon: Home },
  { label: '作品集', href: '#projects', icon: Briefcase },
  { label: '关于', href: '#statement', icon: User },
  { label: '联系', href: '#footer', icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Initial entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Hide/show on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;

          // At top of page, always show
          if (currentScrollY < 100) {
            setIsHidden(false);
          }
          // At bottom of page, always show
          else if (currentScrollY + windowHeight >= docHeight - 50) {
            setIsHidden(false);
          }
          // Scrolling down - hide, scrolling up - show
          else if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
            setIsHidden(true);
          } else if (currentScrollY < lastScrollY.current) {
            setIsHidden(false);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <nav
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-8 rounded-full px-8 py-3 transition-all duration-500 md:gap-6 md:px-6 md:py-2.5"
      style={{
        background: 'rgba(26, 30, 35, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        opacity: isVisible ? (isHidden ? 0 : 1) : 0,
        transform: `translateX(-50%) translateY(${isVisible ? (isHidden ? '80px' : '0') : '40px'})`,
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease',
        pointerEvents: isHidden ? 'none' : 'auto',
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.href.slice(1);
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="group relative flex items-center gap-1.5 text-sm transition-colors duration-200"
            style={{
              color: isActive ? '#E8905A' : '#8A9DB0',
              fontFamily: '"Noto Sans SC", system-ui, sans-serif',
              fontWeight: 400,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#E8905A';
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = '#8A9DB0';
              }
            }}
          >
            <Icon size={16} />
            <span className="hidden sm:inline">{item.label}</span>
            {/* Active indicator */}
            <span
              className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ease-out"
              style={{
                background: '#E8905A',
                width: isActive ? '100%' : '0%',
                opacity: isActive ? 1 : 0,
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
