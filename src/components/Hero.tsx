
export default function Hero() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-max text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Decoder.ai — Software, AI Agents & Business Growth</h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-6 md:mb-8">
          We build web & mobile apps, automation, AI agents and marketing solutions that scale your business. Fast, reliable and student-friendly for AIML learning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href="#contact" className="w-full sm:w-auto block text-center px-6 py-3 bg-indigo-600 text-white rounded-md shadow-md hover:opacity-95">Request Proposal</a>
          <a href="#services" className="w-full sm:w-auto block text-center px-6 py-3 border border-slate-200 rounded-md">Explore Services</a>
        </div>
      </div>
    </section>
  )
}
