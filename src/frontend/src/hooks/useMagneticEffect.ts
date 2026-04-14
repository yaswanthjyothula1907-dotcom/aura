import { useMotionValue, useSpring } from "motion/react";
import { useCallback, useRef } from "react";

export interface MagneticEffectHandlers {
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}

const springConfig = { damping: 15, stiffness: 200, mass: 0.5 };

export function useMagneticEffect(strength = 0.35): MagneticEffectHandlers {
  const ref = useRef<DOMRect | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      ref.current = rect;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      rawX.set(deltaX);
      rawY.set(deltaY);
    },
    [rawX, rawY, strength],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { onMouseMove, onMouseLeave, x, y };
}
