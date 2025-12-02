# Decoder.ai — Website Scaffold

This repository is a starter front-end scaffold for the `Decoder.ai` marketing site and service catalog. Built with Vite + React + TypeScript + Tailwind CSS.

Getting started (Windows cmd):

```cmd
cd C:\Users\dhanush\OneDrive\Desktop\Decoder
npm install
npm run dev
```

What I added:
- `package.json`, `vite.config.ts`, `tsconfig.json`
- Tailwind config and PostCSS
- `src/` with `App.tsx`, `main.tsx`, global CSS and components (`Header`, `Hero`, `Services`, `Footer`)

Next recommended steps:
- Add contact form backend or Zapier integration for lead capture
- Add SEO meta and open graph tags in `index.html`
- Add pricing, case studies and detailed service pages
- Deploy to Vercel, Netlify, or Azure Static Web Apps

Form submissions (automatic delivery)
 - Quick no-backend option: keep the `mailto:` fallback (already implemented) — opens user's email client.
 - Automatic option (recommended): use Formspree or a similar form service to forward submissions to your email.

Formspree setup (free tier)
1. Create an account at https://formspree.io and create a new form — you'll get an endpoint like `https://formspree.io/f/your_form_id`.
2. Create a `.env` file at the project root and add:
	```
	VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
	```
3. Restart the dev server. The contact form will POST to Formspree automatically and forward messages to the email you configured on Formspree.

If you prefer a serverless function that sends with SendGrid (fully automatic), tell me which platform you want (Vercel/Netlify/Azure) and I will scaffold the function and instructions.
 
Deploying to Vercel
1. Install the Vercel CLI (optional) and sign in: `npm i -g vercel` and `vercel login`.
2. From the project root run:
	 ```cmd
	 vercel
	 ```
	 and follow the interactive prompts. Vercel will detect the Vite app and use the `build` script.

Serverless contact function (SendGrid)
- This repo includes `api/contact.ts` which sends contact emails using SendGrid. To enable it, set the following environment variables in the Vercel dashboard for your project:
	- `SENDGRID_API_KEY` — your SendGrid API key
	- `SENDGRID_TO` — (optional) where to deliver contact emails; defaults to `danush07u@gmail.com`
	- `SENDGRID_FROM` — (optional) the sender address shown on outgoing mails (e.g. `no-reply@decoder.ai`)

After adding env vars, redeploy from the Vercel dashboard or run `vercel --prod`.

Client-side Formspree option
- If you prefer not to provide an API key, you can instead use Formspree. Configure `VITE_FORMSPREE_ENDPOINT` in a `.env` file and the client contact form will POST to it automatically.

If you want, I can:
- wire up a contact form and serverless function
- add routing and a detailed Services page per service
- integrate analytics and forms for lead capture
