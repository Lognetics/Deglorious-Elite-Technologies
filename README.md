# Deglorious Elite Technologies — Website

Modern, responsive corporate website for **Deglorious Elite Technologies**
(degloriouselite.com) — *Smart Technology, Security & Mobile Solutions You Can Trust.*

Static HTML/CSS/JS — no build step, no dependencies. Just open or deploy the folder.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero (video), services, why-us, video showcase, testimonials, CTA |
| `about.html` | Company overview, mission, vision, core values, team |
| `services.html` | All services across Smart Tech & Security, Mobile, Support & Consulting |
| `projects.html` | Featured projects + filterable gallery with lightbox |
| `products.html` | Products by category with WhatsApp enquiry buttons |
| `blog.html` | Featured article + tech tips & insights cards |
| `faq.html` | Searchable, categorised FAQ accordion |
| `book.html` | Book a Service form |
| `contact.html` | Contact info, message form, map |

## Structure
```
assets/
  css/styles.css   → design system (Dark Blue / White / Black / Electric Blue)
  js/main.js       → nav, sliders, FAQ, gallery/lightbox, filters, forms, reveal
  img/             → 40 project photos (descriptive names)
  video/           → 3 on-site showcase clips
```

## Forms & enquiries
The **Book a Service** and **Contact** forms, plus all product/project enquiry
buttons, open a pre-filled **WhatsApp chat** to `09076742767`
(international: `2349076742767`). This needs no backend.

To switch to email/server submission instead, edit the `data-form` handler and
`data-inquire` handler in `assets/js/main.js`.

## Contact details (edit in every page footer + topbar, and in main.js)
- Phone / WhatsApp: **09076742767**
- Email: **deglorioustechnologies@gmail.com**
- Location: **Abuja, Nigeria**
- RC: **7436897**

## Local preview
```bash
# from this folder
python3 -m http.server 8080
# then open http://localhost:8080
```

## Notes
- Social links (Facebook/Instagram) point to `#` — replace with real profile URLs.
- Blog "Read article" links point to `#` — wire up to real post pages when ready.
- Images are served at original size; for production you may compress them
  (e.g. with `sips`/`squoosh`) to further improve load speed.
- The unrelated Instagram screenshot in the source folder was intentionally excluded.
