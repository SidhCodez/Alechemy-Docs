"use client";
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-border/40 bg-background mt-auto">
      {/* Top gradient rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 py-14 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-foreground text-base">
            Alchemy<span className="text-accent"> Docs</span>
          </span>
          <p className="text-xs text-muted">The ultimate prompt framework for builders.</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/SidhCodez/Alechemy-Docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted">
            <a href="/docs/index.html" className="hover:text-foreground transition-colors">Docs</a>
            <span className="text-border">·</span>
            <a href="#frameworks" className="hover:text-foreground transition-colors">Frameworks</a>
            <span className="text-border">·</span>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          </div>
        </div>

        <div className="text-xs text-muted text-center md:text-right">
          <p>Made with <span className="text-accent">♥</span> by <span className="text-foreground font-medium">Siddiq</span></p>
          <p className="mt-1 opacity-50">© 2026 Alchemy Docs. MIT License.</p>
        </div>
      </div>
    </footer>
  );
}
