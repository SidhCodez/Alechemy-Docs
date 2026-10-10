"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookText, Search, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Docs-as-Code',
    description: 'Built with mdBook. Version-controlled, auto-deploying, and blazing fast. Your docs live alongside your code.',
    icon: BookText,
    glow: 'rgba(167, 139, 250, 0.15)',
  },
  {
    title: 'Instant Search',
    description: 'Find any prompt, phase, or layer in milliseconds with built-in client-side full-text search.',
    icon: Search,
    glow: 'rgba(52, 211, 153, 0.15)',
  },
  {
    title: 'Multi-Framework',
    description: 'A scalable monorepo architecture designed to host infinite prompt frameworks under one roof.',
    icon: Layers,
    glow: 'rgba(251, 191, 36, 0.12)',
  },
];

export default function WhatIs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Heading reveal from below
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      });

      // Cards stagger reveal
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 80,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 w-full max-w-5xl mx-auto px-4 py-32"
    >
      <div ref={headingRef} className="text-center mb-20">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-medium">What we built</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
          The MDN Web Docs of<br />
          <span className="gradient-text">Prompt Engineering.</span>
        </h2>
        <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
          Alchemy Docs transforms raw prompt engineering knowledge into a navigable, searchable, and copy-paste-ready documentation platform.
        </p>
      </div>

      <div ref={cardsRef} className="grid md:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <div
            key={i}
            className="feature-card group relative p-7 rounded-2xl bg-secondary border border-border overflow-hidden cursor-default transition-all duration-500 hover:border-accent/30 hover:-translate-y-1"
          >
            {/* Glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 0%, ${feature.glow}, transparent 70%)` }}
            />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center mb-5 group-hover:border-accent/30 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
