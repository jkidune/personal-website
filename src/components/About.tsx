export default function About() {
  return (
    <section id="about" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column */}
          <div>
            <div className="flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-6">
              <span className="w-6 h-[1px] bg-[#FF3333]"></span>
              About Me (02)
            </div>
            
            <h2 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-[1.1] mb-8">
              A communicator who <span className="italic text-[#FF3333]">builds</span> things
            </h2>

            <div className="flex flex-col gap-8 border-t border-gray-100 pt-8">
              {[
                ['7+', 'Years experience'], 
                ['30+', 'Projects delivered'], 
                ['3', 'Countries worked in']
              ].map(([num, label]) => (
                <div key={label}>
                  <div className="font-[family-name:var(--font-outfit)] text-4xl font-medium text-[#FF3333] mb-1">{num}</div>
                  <div className="font-[family-name:var(--font-dm-mono)] text-xs tracking-widest text-gray-500 uppercase">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <div className="space-y-6 text-lg text-gray-500 leading-relaxed font-light">
              <p>
                I graduated in <strong className="text-black font-medium">Wildlife Management</strong> and realised that the best way to protect what matters is to tell its story well — and then build the tools to amplify it.
              </p>
              <p>
                Over 7 years I've led <strong className="text-black font-medium">communications and digital marketing</strong> campaigns, built websites, created video content, and started writing code when words alone weren't enough.
              </p>
              <p>
                Based in <strong className="text-black font-medium">Dar es Salaam, Tanzania</strong>. Working globally. Passionate about conservation, community, and digital work that actually changes things.
              </p>
            </div>

            <div className="mt-4">
               <h3 className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-black uppercase mb-6">
                Core Competencies
               </h3>
               <div className="flex flex-wrap gap-3">
                {['Digital Marketing', 'Content Strategy', 'React & Next.js', 'Videography', 'Brand Communications', 'Conservation Tech'].map(skill => (
                  <span key={skill} className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-[#FF3333] hover:text-[#FF3333] transition-colors duration-300 cursor-default">
                    {skill}
                  </span>
                ))}
               </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-[24px] border border-gray-100 mt-4">
              <p className="font-[family-name:var(--font-outfit)] text-xl italic text-black leading-relaxed">
                "Technology is one of the most powerful tools we have for conservation — but only if the right people are building it and telling its story."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}