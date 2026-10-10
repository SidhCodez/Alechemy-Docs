"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookText, Search, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { title: 'Docs-as-Code', desc: 'Version-controlled, auto-deploying, and blazing fast. Your docs live alongside your code.', icon: BookText, color: 'rgba(232,166,40,0.15)' },
  { title: 'Instant Search', desc: 'Find any prompt, phase, or layer in milliseconds with built-in client-side full-text search.', icon: Search, color: 'rgba(45,212,160,0.12)' },
  { title: 'Multi-Framework', desc: 'A scalable monorepo architecture designed to host infinite prompt frameworks under one roof.', icon: Layers, color: 'rgba(248,112,96,0.1)' },
];

export default function WhatIs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      const cards = cardsRef.current?.querySelectorAll('.wi-card');
      if (cards) {
        gsap.from(cards, {
          opacity: 0, y: 70, duration: 0.9, stagger: 0.14, ease: 'power4.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative z-10 w-full max-w-5xl mx-auto px-4 py-28">
      <div ref={headRef} className="text-center mb-16">
        <p className="text-xs tracking-[0.45em] uppercase mb-3 font-medium"
          style={{ color: 'var(--accent-primary)', fontFamily: 'Space Mono, monospace' }}>
          What we built
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
          The MDN Web Docs of<br />
          <span style={{
            background: 'linear-gradient(135deg, #f5c046, #e8a628)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Prompt Engineering.</span>
        </h2>
        <p className="max-w-xl mx-auto text-base leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
          Alchemy Docs transforms raw prompt engineering knowledge into a navigable,
          searchable, and copy-paste-ready documentation platform.
        </p>
      </div>

      <div ref={cardsRef} className="grid md:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div key={i} className="wi-card group relative p-7 rounded-2xl overflow-hidden cursor-default transition-all duration-500 hover:-translate-y-1"
            style={{ background: 'var(--bg-card)', border: '1px solid rgba(232,166,40,0.1)' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
              style={{ background: `radial-gradient(circle at 50% 0%, ${f.color}, transparent 70%)` }} />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(232,166,40,0.1)' }}>
                <f.icon className="w-5 h-5 transition-colors duration-300"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget as SVGElement).style.color = 'var(--accent-primary)'}
                />
              </div>
              <h3 className="text-base font-semibold mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
