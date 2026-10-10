import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-accent text-lg">Alchemy Docs</span>
          <p className="text-sm text-muted">The ultimate prompt framework for builders.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="https://github.com/SidhCodez/Alchemy-Docs" target="_blank" className="text-muted hover:text-accent transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://linkedin.com/in/SidhCodez" target="_blank" className="text-muted hover:text-accent transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>

        <div className="text-sm text-muted">
          Made by <span className="text-foreground font-medium">Siddiq</span>
        </div>
      </div>
    </footer>
  )
}
