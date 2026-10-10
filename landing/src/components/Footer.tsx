"use client";
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full mt-auto"
      style={{ borderTop: '1px solid rgba(232,166,40,0.1)', background: 'var(--bg-primary)' }}>
      <div className="shimmer-line" />
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <span className="font-bold text-base"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
            Alchemy <span style={{ color: 'var(--accent-primary)' }}>Docs</span>
          </span>
          <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            The ultimate prompt framework for builders.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-5">
            <a href="https://github.com/SidhCodez/Alechemy-Docs" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)' }} aria-label="GitHub"
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)' }} aria-label="LinkedIn"
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            <a href="/docs/index.html" style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>Docs</a>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a href="#frameworks" style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>Frameworks</a>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a href="#features" style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>Features</a>
          </div>
        </div>

        <div className="text-xs text-center md:text-right"
          style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
          <p>Made with <span style={{ color: 'var(--accent-primary)' }}>♥</span> by{' '}
            <span style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>Siddiq</span>
          </p>
          <p className="mt-1 opacity-40">© 2026 Alchemy Docs · MIT License</p>
        </div>
      </div>
    </footer>
  );
}
