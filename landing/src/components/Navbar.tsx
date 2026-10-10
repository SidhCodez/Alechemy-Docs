"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FlaskConical, Github, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      if (progressRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-500"
      style={scrolled ? {
        background: 'rgba(6,8,12,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(232,166,40,0.1)',
        boxShadow: '0 4px 40px rgba(0,0,0,0.6)',
      } : {}}>
      {/* Gold scroll progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'rgba(232,166,40,0.06)' }}>
        <div ref={progressRef} className="h-full transition-none"
          style={{ width: '0%', background: 'linear-gradient(90deg, #e8a628, #f5c046)' }} />
      </div>

      <nav className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-base tracking-tight transition-opacity hover:opacity-80"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
          <FlaskConical className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
          <span>Alchemy <span style={{ color: 'var(--accent-primary)' }}>Docs</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-sm"
          style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)' }}>
          {[['#features', 'Features'], ['#frameworks', 'Frameworks'], ['#about', 'About']].map(([href, label]) => (
            <a key={href} href={href}
              className="relative group transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px transition-all duration-300"
                style={{ background: 'var(--accent-primary)' }} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="https://github.com/SidhCodez/Alechemy-Docs" target="_blank" rel="noopener noreferrer"
            className="hidden md:flex transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
          >
            <Github className="w-4 h-4" />
          </a>

          <a href="/docs/index.html"
            className="text-xs font-semibold px-5 py-2 rounded-full transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #f5c046, #e8a628)',
              color: '#06080c',
              fontFamily: 'Space Grotesk, sans-serif',
              boxShadow: '0 0 15px rgba(232,166,40,0.25)',
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(232,166,40,0.5)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(232,166,40,0.25)'}
          >
            Read Docs →
          </a>

          <button className="md:hidden transition-colors" onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'var(--text-muted)' }}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 flex flex-col gap-4"
          style={{ background: 'rgba(6,8,12,0.97)', borderTop: '1px solid rgba(232,166,40,0.1)' }}>
          {[['#features', 'Features'], ['#frameworks', 'Frameworks'], ['#about', 'About']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
