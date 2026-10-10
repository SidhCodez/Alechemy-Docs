"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Moon, Copy, Github, Zap, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { name: 'Instant Search', desc: 'Ctrl+S across 532+ prompts', icon: Search },
  { name: 'Dark by Default', desc: 'Cinematic, eye-friendly theme', icon: Moon },
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
      const items = itemsRef.current?.querySelectorAll('.fi');
      if (items) {
        gsap.from(items, {
          opacity: 0, y: 35, duration: 0.7, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: itemsRef.current, start: 'top 82%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative z-10 w-full max-w-5xl mx-auto px-4 py-20 mb-8">
      <div className="rounded-2xl p-10 md:p-14"
        style={{ background: 'var(--bg-card)', border: '1px solid rgba(232,166,40,0.1)' }}>
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.45em] uppercase mb-3 font-medium"
            style={{ color: 'var(--accent-primary)', fontFamily: 'Space Mono, monospace' }}>Features</p>
          <h2 className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
            Everything you need.{' '}
            <span style={{ color: 'var(--text-muted)' }}>Nothing you don&apos;t.</span>
          </h2>
        </div>
        <div ref={itemsRef} className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {features.map((item, i) => (
            <div key={i} className="fi group flex items-start gap-4 p-4 rounded-xl cursor-default transition-all duration-300"
              style={{ border: '1px solid transparent' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.border = '1px solid rgba(232,166,40,0.12)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.border = '1px solid transparent'}
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(232,166,40,0.1)' }}>
                <item.icon className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-0.5"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>{item.name}</h4>
                <p className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
