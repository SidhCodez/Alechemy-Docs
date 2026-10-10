import { BookText, Search, Layers } from 'lucide-react'

export default function WhatIs() {
  const features = [
    {
      title: 'Docs-as-Code',
      description: 'Built with mdBook. version-controlled, auto-deploying, and blazing fast.',
      icon: BookText
    },
    {
      title: 'Instant Search',
      description: 'Find any prompt, phase, or layer instantly with built-in client-side search.',
      icon: Search
    },
    {
      title: 'Multi-Framework',
      description: 'A scalable architecture designed to host multiple prompt frameworks in one place.',
      icon: Layers
    }
  ]

  return (
    <section id="about" className="w-full max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-4">What is Alchemy Docs?</h2>
        <p className="text-muted max-w-2xl mx-auto">
          Alchemy Docs is a documentation-as-a-product platform that hosts structured, AI-ready prompt frameworks. 
          It transforms raw prompt engineering knowledge into a navigable, searchable, and copy-paste-ready documentation site.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div key={i} className="p-6 rounded-xl bg-secondary border border-border hover:border-accent transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center mb-4 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
              <feature.icon className="w-6 h-6 text-muted group-hover:text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
