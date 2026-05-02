import { useEffect, useState } from 'react';

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Starts after an initial `delay` ms. Uses ease-out cubic easing.
 */
export function useCountUp(
  target: number,
  duration: number = 1500,
  delay: number = 300,
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    let animFrame: number;
    let startTime: number | null = null;

    const delayTimer = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) {
          animFrame = requestAnimationFrame(animate);
        }
      };
      animFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(animFrame);
    };
  }, [target, duration, delay]);

  return count;
}
