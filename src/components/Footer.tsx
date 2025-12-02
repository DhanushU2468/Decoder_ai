import React, { useState } from 'react'

const SocialIcon = ({ name }: { name: string }) => {
  const common = 'w-5 h-5'
  switch (name) {
    case 'twitter':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92c-.63.28-1.3.47-2 .56.72-.43 1.27-1.1 1.53-1.9-.68.4-1.44.7-2.24.86A3.5 3.5 0 0 0 12.7 8.95c0 .28.03.55.1.81-2.9-.15-5.48-1.54-7.2-3.66a3.5 3.5 0 0 0-.47 1.76c0 1.22.62 2.3 1.56 2.93-.58-.02-1.12-.18-1.6-.44v.04c0 1.69 1.2 3.1 2.79 3.42-.29.08-.6.12-.92.12-.22 0-.44-.02-.65-.06.44 1.36 1.72 2.36 3.23 2.39A7 7 0 0 1 3 19.54 9.9 9.9 0 0 0 8.62 21c6.11 0 9.46-5.07 9.46-9.46v-.43c.66-.48 1.23-1.08 1.68-1.77-.6.27-1.24.44-1.9.52z"/></svg>
      )
    case 'linkedin':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11.02 0zM3 8.98h4v12H3zM8.5 8.98h3.7v1.63h.05c.52-.98 1.8-2.02 3.7-2.02 3.96 0 4.7 2.61 4.7 6.01v6.37h-4V15.7c0-1.7-.03-3.9-2.4-3.9-2.4 0-2.77 1.88-2.77 3.8v6.4h-4z"/></svg>
      )
    default:
      return <svg className={common} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
  }
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const NEWS_ENDPOINT = (import.meta as any).env?.VITE_FORMSPREE_NEWS || (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT || ''

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMsg('Please enter a valid email address.')
      return
    }
    setLoading(true)
    if (NEWS_ENDPOINT) {
      try {
        const res = await fetch(NEWS_ENDPOINT, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email, list: 'newsletter' }),
        })
        if (res.ok) {
          setMsg('Subscribed — check your inbox for confirmation.')
          setEmail('')
        } else {
          setMsg('Subscription failed — please try again later.')
        }
      } catch (err) {
        setMsg('Network error — please try again later.')
      } finally { setLoading(false) }
    } else {
      // fallback: open mailto for the owner
      const mailto = `mailto:danush07u@gmail.com?subject=${encodeURIComponent('Newsletter signup')}&body=${encodeURIComponent('Please add ' + email + ' to the newsletter list.')}`
      window.location.href = mailto
      setMsg('Opening your email client — please confirm the subscription.')
      setLoading(false)
    }
  }

  return (
    <footer className="relative text-white footer-gradient pt-10 overflow-hidden">
      <div className="footer-wave -mt-1">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path fill="#ffffff" fillOpacity="0.08" d="M0,32L60,48C120,64,240,96,360,96C480,96,600,64,720,58.7C840,53,960,75,1080,74.7C1200,75,1320,53,1380,42.7L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
      </div>

      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white">D</div>
              <div>
                <div className="font-extrabold text-white">Decoder.ai</div>
                <div className="text-sm text-white/80">AI · Web · Growth</div>
              </div>
            </div>
            <p className="text-sm text-white/80">We build beautiful apps, automation and AI agents that accelerate business growth. Student-friendly AIML support available.</p>

            <div className="flex items-center gap-3 mt-2">
              <a className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" href="#" aria-label="Twitter"><SocialIcon name="twitter" /></a>
              <a className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" href="#" aria-label="LinkedIn"><SocialIcon name="linkedin" /></a>
            </div>
          </div>

          <div className="flex flex-col md:items-center md:justify-center">
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <a href="#services" className="footer-link-hover">Services</a>
              <a href="#about" className="footer-link-hover">About</a>
              <a href="#contact" className="footer-link-hover">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Newsletter</h4>
            <p className="text-sm text-white/80 mb-3">Join our list for AI, dev and growth tips — no spam.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 px-3 py-2 rounded-md text-slate-900" />
              <button type="submit" className="px-4 py-2 rounded-md bg-white text-slate-900 font-medium" disabled={loading}>{loading ? '…' : 'Subscribe'}</button>
            </form>
            {msg && <div className="mt-3 text-sm text-white/80">{msg}</div>}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/80">
          <div>© {new Date().getFullYear()} Decoder.ai — All rights reserved.</div>
          <div>Built with ❤️ · Student-friendly AIML support</div>
        </div>
      </div>

      {/* decorative floating accent */}
      <div className="absolute right-8 bottom-20 w-36 h-36 rounded-full bg-pink-400 opacity-30 blur-3xl float-accent pointer-events-none"></div>
      <div className="absolute left-8 bottom-6 w-28 h-28 rounded-full bg-indigo-500 opacity-25 blur-2xl float-accent pointer-events-none" style={{ animationDelay: '1s' }}></div>
    </footer>
  )
}
