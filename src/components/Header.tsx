
import { useEffect, useRef, useState } from 'react'
import logoUrl from '../assets/logo.svg'

const nav = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#aiml', label: 'AIML Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)

  // set CSS var --header-offset dynamically so CSS can use it for scroll offsets
  useEffect(() => {
    function setHeaderOffset() {
      const headerEl = document.querySelector('header') as HTMLElement | null
      const h = headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 0
      document.documentElement.style.setProperty('--header-offset', `${h}px`)
    }
    setHeaderOffset()
    window.addEventListener('resize', setHeaderOffset)
    return () => window.removeEventListener('resize', setHeaderOffset)
  }, [])

  function scrollToId(id: string) {
    const el = document.querySelector(id) as HTMLElement | null
    if (!el) return
    const header = document.querySelector('header') as HTMLElement | null
    const headerHeight = header ? header.getBoundingClientRect().height : 0
    const top = window.scrollY + el.getBoundingClientRect().top - headerHeight - 12
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <header className="backdrop-blur sticky top-0 z-40 bg-white/60 border-b">
      <div className="container-max h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Decoder.ai" className="w-11 h-11 rounded-lg shadow-sm" />
          <div>
            <div className="font-extrabold text-lg">Decoder.ai</div>
            <div className="text-xs text-slate-500">AI · Web · Growth</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <button key={item.href} onClick={() => scrollToId(item.href)} className="text-slate-700 hover:text-indigo-600 transition-colors">
              {item.label}
            </button>
          ))}
          <button onClick={() => scrollToId('#contact')} className="ml-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-lg shadow-md hover:opacity-95">Get Started</button>
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white shadow-sm"
          >
            <svg className={`w-6 h-6 text-slate-700`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t bg-white/95">
          <div className="container-max py-4 flex flex-col gap-3">
            {nav.map((item) => (
              <button key={item.href} onClick={() => { setOpen(false); scrollToId(item.href) }} className="text-left w-full py-2 px-3 rounded-md text-slate-700 hover:bg-gray-100">
                {item.label}
              </button>
            ))}
            <button onClick={() => { setOpen(false); scrollToId('#contact') }} className="mt-2 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md">Get Started</button>
          </div>
        </div>
      )}
    </header>
  )
}
