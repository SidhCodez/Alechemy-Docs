"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BookOpen, Github, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Scroll progress indicator
      if (progressRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
        progressRef.current.style.width = `${progress}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
      scrolled
        ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_30px_rgba(0,0,0,0.5)]'
        : 'bg-transparent'
    }`}>
      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 h-px bg-accent/20 w-full">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-accent to-accent-hover transition-none"
          style={{ width: '0%' }}
        />
      </div>

      <nav className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:text-accent transition-colors font-bold text-lg tracking-tight"
        >
          <BookOpen className="w-5 h-5 text-accent" />
          <span>Alchemy<span className="text-accent"> Docs</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-muted">
          {[['#features', 'Features'], ['#frameworks', 'Frameworks'], ['#about', 'About']].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="hover:text-foreground transition-colors relative group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/SidhCodez/Alechemy-Docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex text-muted hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="/docs/index.html"
            className="bg-accent hover:bg-accent-hover text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(167,139,250,0.3)] hover:shadow-[0_0_25px_rgba(167,139,250,0.5)]"
          >
            Read Docs →
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-muted hover:text-foreground transition-colors ml-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-4">
          {[['#features', 'Features'], ['#frameworks', 'Frameworks'], ['#about', 'About']].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-muted hover:text-foreground transition-colors text-sm font-medium"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
