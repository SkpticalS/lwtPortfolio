import { useEffect, useRef, useState, memo, useCallback } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
  triggerOnView?: boolean;
}

const AnimatedCounter = memo(function AnimatedCounter({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  style = {},
  triggerOnView = true,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;

      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    },
    [value, duration]
  );

  useEffect(() => {
    if (!triggerOnView) {
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          startTimeRef.current = null;
          rafRef.current = requestAnimationFrame(animate);
          observer.unobserve(element);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [triggerOnView, hasTriggered, animate]);

  const formattedValue =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toString();

  return (
    <span ref={elementRef} className={className} style={style}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
});

export default AnimatedCounter;
