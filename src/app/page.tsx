import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Works from '@/components/Works'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Insights from '@/components/Insights'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Works />
      <About />
      <Testimonials />
      <Insights />
    </main>
  )
}