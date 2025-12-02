

const services = [
  {
    title: 'Web Development',
    desc: 'Custom websites, e-commerce, CMS, APIs, and UI/UX.',
    bullets: ['Responsive design', 'E-commerce', 'CMS & APIs'],
    popular: true,
  },
  {
    title: 'Automation',
    desc: 'RPA, workflow automation, email & social automation.',
    bullets: ['RPA bots', 'Workflows', 'Integrations'],
  },
  {
    title: 'AI Agents',
    desc: 'Conversational bots, lead qualification, analytics agents.',
    bullets: ['Conversational AI', 'Lead scoring', 'Analytics'],
  },
  {
    title: 'App Development',
    desc: 'iOS, Android and cross-platform apps, PWAs.',
    bullets: ['Native apps', 'Cross-platform', 'PWAs'],
  },
  {
    title: 'Business & Lead Gen',
    desc: 'Inbound/outbound leads, landing pages, PPC.',
    bullets: ['Landing pages', 'PPC', 'LinkedIn outreach'],
  },
  {
    title: 'AIML Projects',
    desc: 'Mentoring, project implementation and deployment for students.',
    bullets: ['Project mentoring', 'Model training', 'Deployment'],
  },
]

function Icon({ name }: { name: string }) {
  // Simple inline icons for variety
  const common = 'w-6 h-6'
  switch (name) {
    case 'code':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      )
    case 'robot':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="7" width="18" height="11" rx="2" strokeWidth="1.5" />
          <path d="M8 7V5a4 4 0 0 1 8 0v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'mobile':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="7" y="2" width="10" height="20" rx="2" strokeWidth="1.5" />
          <path d="M11 18h2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        </svg>
      )
  }
}

export default function Services() {
  return (
    <section id="services" className="py-12 md:py-16">
      <div className="container-max">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Our Services</h2>
          <p className="text-sm text-slate-500 max-w-xl hidden sm:block">We combine design, engineering and AI to deliver measurable growth and automation for businesses and students.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`group relative bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-2xl transform transition will-change-transform hover:-translate-y-2 border ring-0 ring-transparent hover:ring-1 hover:ring-indigo-50 overflow-hidden animate-fade-up`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {s.popular && (
                <div className="absolute right-4 top-4 bg-gradient-to-r from-yellow-300 to-pink-300 text-xs text-slate-800 px-2 py-1 rounded-full font-semibold shadow-sm">Popular</div>
              )}

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center text-indigo-600 shadow-sm">
                  <Icon name={i % 3 === 0 ? 'code' : i % 3 === 1 ? 'robot' : 'mobile'} />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{s.desc}</p>

                  <ul className="flex flex-wrap gap-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md">{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <a href="#contact" className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">Get Started →</a>
                <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Learn more</a>
              </div>

              {/* soft background accent */}
              <div className="pointer-events-none absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-indigo-50 opacity-40 blur-3xl transform rotate-45"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
