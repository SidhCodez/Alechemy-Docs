"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code2, Hammer, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Frameworks() {
  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from([card1Ref.current, card2Ref.current], {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="frameworks"
      className="relative z-10 w-full max-w-5xl mx-auto px-4 py-32"
    >
      <div className="text-center mb-20">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-medium">Frameworks</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
          Built for every builder.
        </h2>
        <p className="text-muted max-w-lg mx-auto text-base leading-relaxed">
          Structured prompt systems engineered for specific workflows, from 48-hour hackathons to production-grade products.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Hackathon Alchemy — LIVE */}
        <div
          ref={card1Ref}
          className="group relative flex flex-col p-8 rounded-2xl border border-border overflow-hidden cursor-default transition-all duration-500 hover:-translate-y-1 hover:border-accent/40"
          style={{ background: 'linear-gradient(135deg, #111318 0%, #0a0b0f 100%)' }}
        >
          {/* Top glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          {/* Radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-accent/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-accent" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Live
              </div>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-3">Hackathon Alchemy</h3>
            <p className="text-sm text-muted mb-3 leading-relaxed flex-1">
              20 distinct hackathon categories. 4-phase structured prompts per category. Covering AI/ML, Web3, IoT, Cybersecurity, No-Code, Gaming, and more.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[['20', 'Categories'], ['4', 'Phases each'], ['532+', 'Prompts']].map(([val, label]) => (
                <div key={label} className="text-center p-2 rounded-lg bg-background/60 border border-border">
                  <div className="text-lg font-bold text-accent">{val}</div>
                  <div className="text-[10px] text-muted">{label}</div>
                </div>
              ))}
            </div>

            <a
              href="/docs/index.html"
              className="group/btn inline-flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-accent-hover transition-colors w-full"
            >
              Read Docs
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Builder Alchemy — COMING SOON */}
        <div
          ref={card2Ref}
          className="group relative flex flex-col p-8 rounded-2xl border border-border/40 border-dashed overflow-hidden cursor-default"
          style={{ background: 'linear-gradient(135deg, #0d0f14 0%, #0a0b0f 100%)' }}
        >
          <div className="relative z-10 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center opacity-50">
                <Hammer className="w-5 h-5 text-muted" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border text-muted text-xs font-medium">
                Coming Soon
              </div>
            </div>

            <h3 className="text-2xl font-bold text-muted/60 mb-3">Builder Alchemy</h3>
            <p className="text-sm text-muted/50 mb-8 leading-relaxed flex-1">
              Production-ready prompt architectures for solo builders, indie hackers, and startup engineering teams moving fast.
            </p>

            <div className="inline-flex items-center gap-2 text-muted/30 text-sm font-medium">
              <Zap className="w-4 h-4" />
              In development — drop us a star to follow progress
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
