import Link from 'next/link'
import { ArrowRight, Code2, Hammer } from 'lucide-react'

export default function Frameworks() {
  return (
    <section id="frameworks" className="w-full max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-4">Available Frameworks</h2>
        <p className="text-muted max-w-2xl mx-auto">Explore our structured prompt systems designed for specific workflows.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Hackathon Alchemy Card */}
        <div className="flex flex-col p-8 rounded-2xl bg-gradient-to-b from-secondary to-background border border-border hover:border-accent/50 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Code2 className="w-32 h-32 text-accent" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium w-fit mb-6 border border-success/20">
            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
            Live
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Hackathon Alchemy</h3>
          <p className="text-muted mb-8 max-w-sm flex-1">
            20 distinct categories with 4-phase structured prompts designed specifically for 24-48hr hackathons.
          </p>
          <a href="/docs/index.html" className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-hover w-fit group/link">
            Read Docs <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Builder Alchemy Card */}
        <div className="flex flex-col p-8 rounded-2xl bg-secondary/50 border border-border border-dashed relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Hammer className="w-32 h-32 text-muted" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background text-muted text-xs font-medium w-fit mb-6 border border-border">
            Coming Soon
          </div>
          <h3 className="text-2xl font-bold text-foreground/50 mb-3">Builder Alchemy</h3>
          <p className="text-muted/70 mb-8 max-w-sm flex-1">
            Production-ready prompt architectures for solo builders, indie hackers, and startup engineering teams.
          </p>
          <span className="inline-flex items-center gap-2 text-muted font-medium w-fit cursor-not-allowed">
            Read Docs <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </section>
  )
}
