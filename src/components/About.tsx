
export default function About() {
  return (
    <section id="about" className="py-12 md:py-16">
      <div className="container-max grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">About Decoder.ai</h2>
          <p className="text-slate-600 mb-4">
            Decoder.ai is a full-service technology partner focused on building web and mobile applications, automation, and AI agents that help businesses scale. We combine engineering, design and growth strategy to deliver measurable outcomes.
          </p>
          <p className="text-slate-600">
            Our team works with startups, enterprises and students — offering tailored solutions from prototypes and AIML projects to production-grade systems and lead-generation pipelines.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm glass-blur">
          <h3 className="font-semibold mb-3">What we offer</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• End-to-end product development (Web & Mobile)</li>
            <li>• AI agents, chatbots and recommendation systems</li>
            <li>• Automation and integrations (RPA, Zapier, APIs)</li>
            <li>• Student AIML mentorship and project delivery</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
