"use client";
import { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function InteractiveBackground() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 40, damping: 18, mass: 2 });
  const smoothY = useSpring(cursorY, { stiffness: 40, damping: 18, mass: 2 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Cursor amber glow */}
      <motion.div
        className="absolute w-[640px] h-[640px] rounded-full"
        style={{
          x: smoothX, y: smoothY,
          translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(232,166,40,0.09) 0%, transparent 68%)',
          filter: 'blur(30px)',
        }}
      />
      {/* Top-left gold orb */}
      <div className="absolute -top-60 -left-60 w-[90vw] h-[90vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(232,166,40,0.04) 0%, transparent 60%)' }} />
      {/* Bottom-right teal orb */}
      <div className="absolute -bottom-60 -right-60 w-[60vw] h-[60vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(45,212,160,0.035) 0%, transparent 60%)' }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(232,166,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,166,40,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
