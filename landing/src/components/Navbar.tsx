import Link from 'next/link'
import { BookOpen, Github } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-bold text-lg tracking-tight">
          <BookOpen className="w-5 h-5" />
          <span>Alchemy Docs</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#frameworks" className="hover:text-foreground transition-colors">Frameworks</Link>
          <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/SidhCodez/Alchemy-Docs" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <a href="/docs/index.html" className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
            Read Docs
          </a>
        </div>
      </div>
    </nav>
  )
}
