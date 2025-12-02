import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, subject, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const SENDGRID_KEY = process.env.SENDGRID_API_KEY
  const SENDGRID_TO = process.env.SENDGRID_TO || 'danush07u@gmail.com'
  const SENDGRID_FROM = process.env.SENDGRID_FROM || 'no-reply@decoder.ai'

  if (!SENDGRID_KEY) {
    return res.status(501).json({ error: 'Server-side email not configured. Set SENDGRID_API_KEY in Vercel env.' })
  }

  const payload = {
    personalizations: [
      {
        to: [{ email: SENDGRID_TO }],
        subject: subject || 'New contact from Decoder.ai',
      },
    ],
    from: { email: SENDGRID_FROM, name: 'Decoder.ai' },
    content: [
      {
        type: 'text/plain',
        value: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      },
    ],
  }

  try {
    const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (r.ok) return res.status(200).json({ ok: true })

    const text = await r.text()
    return res.status(502).json({ error: 'SendGrid error', details: text })
  } catch (err: any) {
    return res.status(500).json({ error: 'Unexpected server error', message: String(err.message || err) })
  }
}
