"use client";
import { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function InteractiveBackground() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 50, damping: 20, mass: 1.5 });
  const smoothY = useSpring(cursorY, { stiffness: 50, damping: 20, mass: 1.5 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Main cursor glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Static atmospheric glows */}
      <div className="absolute -top-40 -left-40 w-[70vw] h-[70vw] rounded-full bg-accent/[0.04] blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 w-[50vw] h-[50vw] rounded-full bg-success/[0.03] blur-[120px]" />
    </div>
  );
}
