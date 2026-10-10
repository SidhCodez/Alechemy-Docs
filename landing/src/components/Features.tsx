import { Search, Moon, Copy, Github } from 'lucide-react'

export default function Features() {
  const list = [
    { name: 'Instant Search', desc: 'Find anything with Ctrl+S', icon: Search },
    { name: 'Dark Mode', desc: 'Easy on the eyes, default dark', icon: Moon },
    { name: 'Copy-Paste Ready', desc: 'One-click copy buttons', icon: Copy },
    { name: 'Open Source', desc: 'MIT Licensed on GitHub', icon: Github },
  ]

  return (
    <section id="features" className="w-full max-w-5xl mx-auto px-4 py-16 border-t border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {list.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-3 text-accent">
              <item.icon className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">{item.name}</h4>
            <p className="text-xs text-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
