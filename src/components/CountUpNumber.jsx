import React, { useState, useEffect, useRef } from 'react';

/**
 * CountUpNumber Component
 * Smooth, 60fps ease-out number counter that triggers on view.
 * Formats numbers with locale commas (e.g. 23,000) and appends suffixes (e.g. +).
 */
export default function CountUpNumber({ end, duration = 2000, suffix = '', className = '' }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // If duration was passed as seconds (e.g. 1.8 or 2), convert to milliseconds
    const targetDuration = duration < 50 ? duration * 1000 : duration;

    const startCounting = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / targetDuration, 1);
        
        // easeOutQuart: smooth and natural deceleration
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.round(easeOut * end);
        setCount(currentVal);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };

      window.requestAnimationFrame(step);
    };

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      startCounting();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          startCounting();
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={elementRef} className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

