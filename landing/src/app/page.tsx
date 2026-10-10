import Hero from '@/components/Hero'
import WhatIs from '@/components/WhatIs'
import Frameworks from '@/components/Frameworks'
import Features from '@/components/Features'

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <Hero />
      <WhatIs />
      <Frameworks />
      <Features />
    </div>
  )
}
