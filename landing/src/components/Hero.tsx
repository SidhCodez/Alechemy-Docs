"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Terminal, FlaskConical } from 'lucide-react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  { text: "Ultimate", gold: true },
  { text: "Prompt", gold: false },
  { text: "Framework", gold: false },
  { text: "for", gold: false },
  { text: "Builders.", gold: true },
];

function MagneticBtn({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const baseStyle = primary ? {
    background: 'linear-gradient(135deg, #f5c046, #e8a628)',
    boxShadow: '0 0 30px rgba(232,166,40,0.35), 0 4px 20px rgba(232,166,40,0.2)',
    fontFamily: 'Space Grotesk, sans-serif',
    x: sx, y: sy,
  } : {
    border: '1px solid rgba(232,166,40,0.2)',
    color: 'var(--text-secondary)',
    fontFamily: 'Space Grotesk, sans-serif',
    x: sx, y: sy,
  };

  return (
    <motion.a
      ref={ref} href={href}
      style={baseStyle}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      className={primary
        ? "inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 text-[#06080c]"
        : "inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
      }
      onMouseEnter={(e) => {
        if (!primary) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,166,40,0.5)';
      }}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // Badge
      gsap.from(badgeRef.current, { opacity: 0, y: -16, duration: 0.7, delay: 0.1, ease: 'power3.out' });
      // Words stagger
      const words = headRef.current?.querySelectorAll('.wi');
      if (words) {
        gsap.from(words, { yPercent: 115, opacity: 0, duration: 1, stagger: 0.07, ease: 'power4.out', delay: 0.3 });
      }
      // Shimmer line
      gsap.from(lineRef.current, { scaleX: 0, transformOrigin: 'left', duration: 1.2, delay: 0.8, ease: 'expo.out' });
      // Sub + CTA
      gsap.from([subRef.current, ctaRef.current], { opacity: 0, y: 28, duration: 0.9, stagger: 0.12, delay: 0.9, ease: 'power3.out' });
      // Scroll parallax
      gsap.to(heroRef.current, {
        yPercent: 12, opacity: 0.2, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center will-change-transform">
      {/* Badge */}
      <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10 text-xs font-medium"
        style={{ background: 'rgba(232,166,40,0.08)', border: '1px solid rgba(232,166,40,0.2)', color: 'var(--accent-primary)', fontFamily: 'Space Mono, monospace' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Hackathon Alchemy v1.0 — Now Live
        <FlaskConical className="w-3.5 h-3.5" />
      </div>

      {/* Headline */}
      <h1 ref={headRef} className="text-5xl md:text-7xl lg:text-[90px] font-bold tracking-tight leading-[0.9] max-w-5xl mb-2"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        <span className="block text-sm md:text-base tracking-[0.5em] uppercase mb-6"
          style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>
          The
        </span>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {WORDS.map((w, i) => (
            <span key={i} className="word-mask">
              <span className="wi inline-block" style={w.gold ? {
                background: 'linear-gradient(135deg, #f5c046, #c97d18)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              } : { color: 'var(--text-primary)' }}>
                {w.text}
              </span>
            </span>
          ))}
        </div>
      </h1>

      {/* Shimmer divider */}
      <div ref={lineRef} className="w-32 h-px my-8 shimmer-line" />

      {/* Subtext */}
      <p ref={subRef} className="text-base md:text-lg max-w-lg leading-relaxed mb-10"
        style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
        Accelerate your hackathons, products, and careers with{' '}
        <span style={{ color: 'var(--text-primary)' }}>structured, AI-ready prompt systems.</span>{' '}
        Stop guessing. Start building.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
        <MagneticBtn href="/docs/index.html" primary>
          Explore Hackathon Alchemy <ArrowRight className="w-4 h-4" />
        </MagneticBtn>
        <MagneticBtn href="https://github.com/SidhCodez/Alechemy-Docs">
          <Terminal className="w-4 h-4" /> View on GitHub
        </MagneticBtn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-muted)' }}>
        <span className="text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: 'Space Mono, monospace' }}>Scroll</span>
        <motion.div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--accent-primary), transparent)' }}
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
}
