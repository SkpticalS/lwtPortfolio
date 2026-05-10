import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element | null;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  start?: string;
  end?: string;
}

/**
 * Hook for GSAP ScrollTrigger-based animations.
 * Provides parallax, pin, and scrub capabilities.
 */
export function useScrollAnimation(
  animationCallback: (
    gsapInstance: typeof gsap,
    scrollTrigger: typeof ScrollTrigger
  ) => gsap.core.Timeline | gsap.core.Tween | void,
  deps: unknown[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const result = animationCallback(gsap, ScrollTrigger);
      if (result) {
        animationRef.current = result;
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

/**
 * Hook for applying parallax effect to an element based on scroll progress.
 */
export function useParallax(options: ParallaxOptions = {}) {
  const {
    speed = 1,
    direction = 'vertical',
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const maxOffset = 200 * speed;
    const prop = direction === 'vertical' ? 'y' : 'x';

    const tween = gsap.fromTo(
      element,
      { [prop]: -maxOffset },
      {
        [prop]: maxOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    tweenRef.current = tween;

    return () => {
      tween.kill();
      // Clean up any ScrollTrigger instances tied to this element
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === element)
        .forEach((st) => st.kill());
    };
  }, [speed, direction]);

  return elementRef;
}

/**
 * Hook for creating a pinned section with scroll-driven animation.
 */
export function usePinnedSection(
  animationCallback: (timeline: gsap.core.Timeline) => void,
  options: ScrollAnimationOptions = {}
) {
  const {
    start = 'top top',
    end = '+=100%',
    scrub = true,
    pin = true,
    toggleActions = 'play none none reverse',
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start,
          end,
          scrub,
          pin,
          toggleActions,
        },
      });

      animationCallback(tl);
      timelineRef.current = tl;
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [start, end, scrub, pin, toggleActions]);

  return { ref: containerRef, timeline: timelineRef };
}

/**
 * Hook for scrub-based scroll animation (animation tied to scroll position).
 */
export function useScrubAnimation(
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  options: ScrollAnimationOptions = {}
) {
  const {
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = true,
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(element, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
        },
      });
      tweenRef.current = tween;
    });

    return () => {
      ctx.revert();
    };
  }, [start, end, scrub, ...Object.values(fromVars), ...Object.values(toVars)]);

  return elementRef;
}

export { ScrollTrigger };
