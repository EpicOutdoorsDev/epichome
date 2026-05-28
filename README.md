# Epic Outdoors — Website

Static marketing site for **Epic Outdoors** (epicoutdoors.com), a western big game
hunting media and services company based in Cedar City, Utah.

The site is plain, self-contained HTML/CSS/JS — no build step, no framework. Each page
carries its own styles inline and shares a common navigation header and footer.

---

## Pages

| Page               | Deploy path                                         | Purpose                                                             |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------------- |
| Home               | `/index.html`                                       | Landing page — hero, services, "Site Under Maintenance" note        |
| Terms & Conditions | `/terms.html`                                       | Site/store terms of service (20 sections)                           |
| Giveaway Rules     | `/services/epic-hunt-giveaways/giveaway-rules.html` | Official sweepstakes rules for the Epic Hunt Giveaway (10 sections) |

> **Note:** Asset references use **root-relative paths** (`/assets/...`), so pages work
> correctly no matter how deeply they are nested in the directory tree.

---

## Project structure

```
/
├── index.html                  # Home / landing page
├── terms.html                  # Terms & Conditions
├── analytics.js                # PostHog analytics (loaded on every page)
├── assets/                     # Images, logo, favicon, hero art
│   ├── favicon.png
│   ├── 00-emailLogoWideH_eurostile.png   # header logo
│   ├── 26Website-HeroHeader.jpeg
│   └── 26Website-Section_*.jpeg           # service card art
└── services/
    └── epic-hunt-giveaways/
        └── giveaway-rules.html  # Official giveaway rules
```

---

## Design system (at a glance)

All pages share one visual language, defined as CSS variables in each page's `<style>` block:

```css
--bg: #0b0f14; /* near-black background        */
--text: rgba(255, 255, 255, 0.92);
--muted: rgba(255, 255, 255, 0.72);
--accent: #ff7a18; /* Epic orange                  */
--accent2: #ffb26b; /* lighter orange (links/labels)*/
--radius: 18px;
```

- **Theme:** dark, with orange accents.
- **Typography:** native system UI font stack (no web fonts to load).
- **Shared header:** the `.eo-header` block (markup + styles + script) is pasted into
  every page. It includes the logo, a "Join" dropdown, and a mobile hamburger menu.
- **Shared footer:** dark bar with copyright (auto-updating year) and legal links.

See `PROJECT.md` for the full design-system reference and reusable page patterns.

---

## Editing / contributing

1. Pages are hand-edited HTML. Open the file and edit directly — there is no compile step.
2. **The `.eo-header` nav block must stay identical across all pages.** If you change it
   on one page (new menu item, link change), copy the same change to every other page so
   the navigation stays in sync.
3. Keep using root-relative paths (`/assets/...`, `/terms.html`) for links and assets.
4. To add a new legal/content page, copy `terms.html` as a starting template — it already
   contains the shared header, footer, color variables, and section/card patterns.

---

## Deployment

Static files. Upload to the web host / CDN preserving the directory structure above.
No server-side processing is required. `analytics.js` (PostHog) loads on every page.

---

## Outstanding items

- [ ] **Build remaining pages** (use `terms.html` as the starter template — see
      `PROJECT.md` §3):
  - [ ] `about.html` — About Epic Outdoors
  - [ ] `staff.html` — Staff / team
  - [ ] `news.html` — News
  - [ ] `podcast.html` — Podcast
  - [ ] `submit.html` — Submit (member content / form)
  - [ ] `member-draw.html` — Member draw
- [ ] Apply the footer link edits to `index.html` (Terms & Conditions + Giveaway Rules).
      Snippets are in `PROJECT.md`.
- [ ] Wire up placeholder links in `terms.html`: **Privacy Policy** (Section 10) and
      **Returns Policy** (Section 6) are currently plain text.
- [ ] Optional cleanup: remove the now-unused `.gw-toc*` CSS rules from
      `giveaway-rules.html` (the table of contents was removed).
