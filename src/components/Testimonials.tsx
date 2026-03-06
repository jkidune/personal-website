const testimonials = [
  {
    quote: "Joseph brings a rare combination of strategic thinking and genuine passion for impact. His communications work elevated everything we were trying to achieve.",
    name: 'Amina Mwalimu', role: 'Programme Director, DVV International', initial: 'A',
  },
  {
    quote: "His ability to translate complex conservation issues into compelling digital content is something I haven't seen often. Truly exceptional communicator.",
    name: 'David Kimani', role: 'Conservation Lead, Wildlife Fund', initial: 'D',
  },
  {
    quote: "Joseph built our digital presence from the ground up. Professional, creative, and deeply committed to getting things right. Would work with him again immediately.",
    name: 'Sarah Oluwole', role: 'Founder, GreenAfrica Initiative', initial: 'S',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-16">
          <span className="w-6 h-[1px] bg-[#FF3333]"></span>
          Kind Words (04)
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
              
              <div className="mb-8">
                <span className="text-4xl text-[#FF3333] font-[family-name:var(--font-outfit)] leading-none">“</span>
                <p className="font-[family-name:var(--font-outfit)] text-lg text-black leading-relaxed mt-2">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-[family-name:var(--font-outfit)] text-xl font-medium text-[#FF3333]">
                  {t.initial}
                </div>
                <div>
                  <div className="font-[family-name:var(--font-outfit)] font-medium text-black">
                    {t.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t.role}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}