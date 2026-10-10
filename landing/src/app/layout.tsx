import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import InteractiveBackground from '@/components/InteractiveBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alchemy Docs - The Ultimate Prompt Framework',
  description: 'Accelerate your hackathons, products, and careers with structured, AI-ready prompt systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col font-sans selection:bg-accent selection:text-white bg-background text-foreground antialiased`}>
        <InteractiveBackground />
        <SmoothScroll>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}
