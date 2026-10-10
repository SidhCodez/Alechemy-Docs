import Link from 'next/link'
import { ArrowRight, Terminal } from 'lucide-react'

export default function Hero() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 pt-32 pb-16 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-muted mb-8">
        <span className="flex w-2 h-2 rounded-full bg-success"></span>
        Hackathon Alchemy v1.0 is now live
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl mb-6">
        The Ultimate Prompt Framework for <span className="text-accent">Builders</span>
      </h1>
      <p className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
        Accelerate your hackathons, products, and careers with structured, AI-ready prompt systems. 
        Stop guessing how to talk to AI, start building.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a href="/docs" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white text-base font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(167,139,250,0.3)]">
          Explore Hackathon Alchemy
          <ArrowRight className="w-4 h-4" />
        </a>
        <Link href="https://github.com/SidhCodez/Alchemy-Docs" target="_blank" className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-tertiary text-foreground border border-border text-base font-medium px-6 py-3 rounded-lg transition-colors">
          <Terminal className="w-4 h-4" />
          View on GitHub
        </Link>
      </div>
    </section>
  )
}
