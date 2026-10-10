"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Moon, Copy, Github, Zap, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { name: 'Instant Search', desc: 'Ctrl+S across 532+ prompts', icon: Search },
  { name: 'Dark Mode First', desc: 'Cinematic by default', icon: Moon },
  { name: 'Copy-Paste Ready', desc: 'One-click for any prompt', icon: Copy },
  { name: 'Open Source', desc: 'MIT Licensed on GitHub', icon: Github },
  { name: 'Blazing Fast', desc: 'Static HTML, zero runtime', icon: Zap },
  { name: 'Privacy First', desc: 'No tracking. No cookies.', icon: Shield },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll('.feature-item');
      if (items) {
        gsap.from(items, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
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
      id="features"
      className="relative z-10 w-full max-w-5xl mx-auto px-4 py-24"
    >
      <div className="rounded-2xl border border-border bg-secondary/40 backdrop-blur-sm p-10 md:p-14">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-medium">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything you need. Nothing you don&apos;t.</h2>
        </div>
        <div ref={itemsRef} className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <div
              key={i}
              className="feature-item group flex items-start gap-4 p-4 rounded-xl hover:bg-background/60 transition-colors duration-300 cursor-default"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300">
                <item.icon className="w-4 h-4 text-muted group-hover:text-accent transition-colors duration-300" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-0.5">{item.name}</h4>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
