import { useEffect, useRef, useState } from 'react';

interface UseInViewAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

interface UseInViewAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
  hasAnimated: boolean;
}

export function useInViewAnimation(
  options: UseInViewAnimationOptions = {}
): UseInViewAnimationReturn {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px',
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasAnimated(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, rootMargin]);

  // Staggered children animation via data-animate attribute
  useEffect(() => {
    const element = ref.current;
    if (!element || !isInView) return;

    const animatedChildren = element.querySelectorAll('[data-animate]');
    if (animatedChildren.length === 0) return;

    animatedChildren.forEach((child, index) => {
      const htmlChild = child as HTMLElement;
      const staggerDelay = parseFloat(htmlChild.dataset.animateDelay || '0') || index * 0.12;
      const delayMs = staggerDelay * 1000;

      htmlChild.style.opacity = '0';
      htmlChild.style.transform = 'translateY(40px)';
      htmlChild.style.transition = 'none';

      requestAnimationFrame(() => {
        setTimeout(() => {
          htmlChild.style.transition =
            'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          htmlChild.style.opacity = '1';
          htmlChild.style.transform = 'translateY(0)';
        }, delayMs);
      });
    });
  }, [isInView]);

  return { ref, isInView, hasAnimated };
}

// Convenience hook for simple stagger children animation
export function useStaggerChildren(
  isInView: boolean,
  staggerDelay = 0.12
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInView) return;

    const children = container.querySelectorAll('[data-animate]');
    children.forEach((child, index) => {
      const htmlChild = child as HTMLElement;
      htmlChild.style.opacity = '0';
      htmlChild.style.transform = 'translateY(40px)';
      htmlChild.style.transition = 'none';

      requestAnimationFrame(() => {
        setTimeout(() => {
          htmlChild.style.transition =
            'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          htmlChild.style.opacity = '1';
          htmlChild.style.transform = 'translateY(0)';
        }, index * staggerDelay * 1000);
      });
    });
  }, [isInView, staggerDelay]);

  return containerRef;
}
