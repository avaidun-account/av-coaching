# AV Coaching — Website

A fast, single-page site for **AV Coaching** (Arjun Vaidun, NASM-CPT), styled to match the **Synthesis** design language — near-black backgrounds, a deep-green accent, Fraunces serif headlines with italic accents, and IBM Plex Mono labels. Plain HTML/CSS/JS — no build step, free to host.

## Files
- `index.html` — all page content/sections
- `styles.css` — design & layout (colors live in `:root` at the top)
- `script.js` — mobile nav, scroll animations, form + booking handling

## Run locally
Just open `index.html` in a browser. Or serve it:
```bash
cd av-coaching
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Customize (the essentials)
1. **Photo** — replace the "Your photo here" box in the About section (`.about-photo` in `index.html`) with `<img src="assets/you.jpg" alt="Arjun Vaidun" />`.
2. **Prices & services** — edit the three `.card` blocks under `#services`.
3. **Testimonials** — swap the sample `blockquote`s under `#results` with real ones.
4. **Contact info** — update the email + Instagram handle in the `#contact` section.
5. **Colors** — change `--accent` / `--accent-strong` in `:root` at the top of `styles.css`.

## Make the form + booking button work
Both are placeholders until you connect them:
- **Contact form:** create a free [Formspree](https://formspree.io) form and paste its endpoint into `FORMSPREE_ENDPOINT` in `script.js`.
- **Booking button:** paste your [Calendly](https://calendly.com) link into `BOOKING_URL` in `script.js`.

Until then the form runs in demo mode (validates and shows a success message; logs to the console).

## Deploy (free options)
- **Netlify:** drag the `av-coaching` folder onto app.netlify.com/drop. (Bonus: Netlify Forms can handle the contact form with no code.)
- **GitHub Pages:** push to a repo → Settings → Pages → deploy from branch.
- **Cloudflare Pages / Vercel:** connect the repo, no build command needed.

Point a custom domain (e.g. avcoaching.com) at whichever host you pick.
