"use client";
import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Ultimate", "Prompt", "Framework", "for", "Builders."];

function MagneticButton({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bail out on reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Badge intro
      gsap.from(badgeRef.current, {
        opacity: 0, y: -20, duration: 0.8, delay: 0.2, ease: 'power3.out'
      });

      // Word-by-word stagger reveal via clip-path
      const words = headlineRef.current?.querySelectorAll('.word-inner');
      if (words) {
        gsap.from(words, {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.4,
        });
      }

      // Subtext fade in
      gsap.from(subRef.current, {
        opacity: 0, y: 30, duration: 1, delay: 0.9, ease: 'power3.out'
      });

      // CTA slide up
      gsap.from(ctaRef.current, {
        opacity: 0, y: 30, duration: 0.9, delay: 1.1, ease: 'power3.out'
      });

      // Scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut', delay: 2
      });

      // Scroll-driven parallax: headline scales out slightly on scroll
      gsap.to(heroRef.current, {
        yPercent: 15,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center will-change-transform"
    >
      {/* Badge */}
      <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted mb-10">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
        Hackathon Alchemy v1.0 is live
        <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-semibold tracking-wide">NEW</span>
      </div>

      {/* Headline with word-mask reveal */}
      <h1
        ref={headlineRef}
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] max-w-5xl mb-8"
      >
        <span className="block text-foreground/50 text-2xl md:text-3xl font-light tracking-widest uppercase mb-4 letter-spacing-wide">
          The
        </span>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {WORDS.map((word, i) => (
            <span key={i} className="word-mask">
              <span
                className={`word-inner inline-block ${
                  i === 0 ? 'gradient-text' : 
                  i === 4 ? 'text-accent' : 
                  'text-foreground'
                }`}
              >
                {word}
              </span>
            </span>
          ))}
        </div>
      </h1>

      {/* Subheadline */}
      <p
        ref={subRef}
        className="text-base md:text-xl text-muted max-w-xl leading-relaxed mb-12"
      >
        Accelerate your hackathons, products, and careers with
        <span className="text-foreground"> structured, AI-ready prompt systems.</span>
        <br className="hidden md:block" /> Stop guessing. Start building.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
        <MagneticButton
          href="/docs/index.html"
          className="group inline-flex items-center justify-center gap-2.5 bg-accent text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-accent-hover shadow-[0_0_30px_rgba(167,139,250,0.4)] hover:shadow-[0_0_50px_rgba(167,139,250,0.6)]"
        >
          Explore Hackathon Alchemy
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </MagneticButton>

        <MagneticButton
          href="https://github.com/SidhCodez/Alechemy-Docs"
          className="inline-flex items-center justify-center gap-2 border border-border text-muted text-sm font-medium px-7 py-3.5 rounded-full hover:border-accent/40 hover:text-foreground transition-all duration-300 hover:bg-accent/5"
        >
          <Terminal className="w-4 h-4" />
          View on GitHub
        </MagneticButton>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-10 flex flex-col items-center gap-2 text-muted/40">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted/40 to-transparent"></div>
      </div>

      {/* Decorative line grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>
    </section>
  );
}
