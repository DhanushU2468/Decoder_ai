import React, { useState } from 'react'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }))
  }

  const FORMSPREE = (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT || ''

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // basic validation
    if (!form.name || !form.email || !form.message) {
      setError('Please fill name, email and message.')
      return
    }

    setLoading(true)
    // If Formspree endpoint is configured, POST the data there for automatic delivery
    if (FORMSPREE) {
      try {
        const payload = { name: form.name, email: form.email, subject: form.subject, message: form.message }
        const res = await fetch(FORMSPREE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })

        if (res.ok) {
          setSuccess('Thanks — your message was sent. We will contact you soon.')
          setForm({ name: '', email: '', subject: '', message: '' })
        } else {
          const data = await res.json().catch(() => ({}))
          setError((data?.error && String(data.error)) || 'Failed to send — please try the mail client fallback.')
        }
      } catch (err) {
        setError('Network error while sending the message. Please try again or use your email client.')
      } finally {
        setLoading(false)
      }
    } else {
      // fallback to mailto: (user mail client)
      const to = 'danush07u@gmail.com'
      const subject = encodeURIComponent(form.subject || 'Contact from Decoder.ai')
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
      const mailto = `mailto:${to}?subject=${subject}&body=${body}`
      try {
        window.location.href = mailto
        setSuccess('Opened your email client — please press Send to deliver the message.')
        setForm({ name: '', email: '', subject: '', message: '' })
      } catch (err) {
        setError('Unable to open email client. Please contact: danush07u@gmail.com')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <section id="contact" className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container-max">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get in touch</h2>
        <p className="text-slate-600 mb-6">Tell us about your project or request a proposal. We typically respond within one business day.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
            {success && <div className="text-sm text-green-600 mb-3">{success}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input className="border rounded-md p-2" placeholder="Your name" value={form.name} onChange={(e) => update('name', e.target.value)} />
              <input className="border rounded-md p-2" placeholder="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
            </div>

            <input className="border rounded-md p-2 w-full mb-3" placeholder="Subject (optional)" value={form.subject} onChange={(e) => update('subject', e.target.value)} />

            <textarea className="border rounded-md p-2 w-full mb-3 min-h-[120px]" placeholder="Message" value={form.message} onChange={(e) => update('message', e.target.value)} />

            <div className="flex items-center gap-3">
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow" disabled={loading}>
                {loading ? 'Sending…' : 'Send message'}
              </button>
              <button type="button" className="text-sm text-slate-600" onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setError(null); setSuccess(null); }}>
                Reset
              </button>
            </div>
          </form>

          <aside className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Contact details</h3>
            <p className="text-sm text-slate-600 mb-2">Email: <a href="mailto:danush07u@gmail.com" className="text-indigo-600">danush07u@gmail.com</a></p>
            <p className="text-sm text-slate-600 mb-4">Phone: <strong className="text-slate-700">+91 9900897449</strong></p>

            <h4 className="font-medium mb-2">Office hours</h4>
            <p className="text-sm text-slate-600">Mon—Fri, 9:00 — 18:00 (local time)</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
