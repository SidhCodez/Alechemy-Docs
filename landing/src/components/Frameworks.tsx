"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code2, Hammer, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Frameworks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      const cards = gridRef.current?.querySelectorAll('.fw-card');
      if (cards) {
        gsap.from(cards, {
          opacity: 0, y: 80, duration: 1, stagger: 0.18, ease: 'power4.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="frameworks" className="relative z-10 w-full max-w-5xl mx-auto px-4 py-28">
      <div ref={headRef} className="text-center mb-16">
        <p className="text-xs tracking-[0.45em] uppercase mb-3 font-medium"
          style={{ color: 'var(--accent-primary)', fontFamily: 'Space Mono, monospace' }}>
          Frameworks
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
          Built for every builder.
        </h2>
        <p className="max-w-lg mx-auto text-base leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
          Structured prompt systems engineered for specific workflows,
          from 48-hour hackathons to production-grade products.
        </p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-2 gap-5">
        {/* ─── Card 1: Hackathon Alchemy (LIVE) ─── */}
        <div className="fw-card group relative flex flex-col p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
          style={{ background: 'var(--bg-card)', border: '1px solid rgba(232,166,40,0.15)' }}>
          {/* Gold top bar */}
          <div className="absolute top-0 inset-x-0 h-px shimmer-line" />
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,166,40,0.08), transparent 65%)' }} />

          <div className="relative z-10 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(232,166,40,0.1)', border: '1px solid rgba(232,166,40,0.25)' }}>
                <Code2 className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(45,212,160,0.1)', border: '1px solid rgba(45,212,160,0.25)', color: 'var(--success)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
              Hackathon Alchemy
            </h3>
            <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
              20 distinct hackathon categories. 4-phase structured prompts per category.
              Covering AI/ML, Web3, IoT, Cybersecurity, No-Code, Gaming, and more.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-7">
              {[['20', 'Categories'], ['4', 'Phases each'], ['532+', 'Prompts']].map(([val, label]) => (
                <div key={label} className="text-center py-2.5 px-2 rounded-xl"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(232,166,40,0.1)' }}>
                  <div className="text-lg font-bold" style={{ color: 'var(--accent-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>{val}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>{label}</div>
                </div>
              ))}
            </div>

            <a href="/docs/index.html"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 group/btn"
              style={{
                background: 'linear-gradient(135deg, #f5c046, #e8a628)',
                color: '#06080c',
                fontFamily: 'Space Grotesk, sans-serif',
                boxShadow: '0 0 20px rgba(232,166,40,0.2)',
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 35px rgba(232,166,40,0.4)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(232,166,40,0.2)'}
            >
              Read Docs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ─── Card 2: Builder Alchemy (COMING SOON) ─── */}
        <div className="fw-card relative flex flex-col p-8 rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-secondary)', border: '1px dashed rgba(232,166,40,0.1)' }}>
          <div className="relative z-10 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center opacity-40"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                <Hammer className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontFamily: 'Space Mono, monospace' }}>
                Coming Soon
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3 opacity-40"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
              Builder Alchemy
            </h3>
            <p className="text-sm leading-relaxed mb-8 flex-1 opacity-40"
              style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
              Production-ready prompt architectures for solo builders, indie hackers,
              and startup engineering teams moving fast.
            </p>

            <div className="inline-flex items-center gap-2 text-sm opacity-30"
              style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
              <Zap className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
              In development — ⭐ star the repo to follow progress
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
