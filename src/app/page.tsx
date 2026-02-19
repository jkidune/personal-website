import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Works from '@/components/Works'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Insights from '@/components/Insights'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <Works />
      <About />
      <Testimonials />
      <Insights />
      <CTA />
      <Footer />
    </main>
  )
}