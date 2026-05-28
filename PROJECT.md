# PROJECT.md — Epic Outdoors Site Work

Detailed documentation of the Epic Outdoors website work, the shared design system, and
the reusable patterns used to build content pages. Use this as the reference when adding
or editing pages.

---

## 1. Summary of work completed

Two new content pages were built to match the existing home page (`index.html`) styling,
plus footer integration to link them.

### 1.1 Terms & Conditions — `terms.html`

- Full Terms of Service content: an Overview plus **Sections 1–20**.
- Deploy path: **`/terms.html`** (site root).
- Built from the home page's visual language. Includes:
  - Shared `.eo-header` navigation.
  - A **title band** ("Legal" kicker + heading).
  - An important-shipping **notice callout** (orange, left-accent border).
  - A two-column **table of contents** with anchor jump-links to all 20 sections.
  - A **content card** with each section divided by hairline rules.
  - A **Back to Top** pill and the shared footer.

### 1.2 Giveaway Rules — `giveaway-rules.html`

- Official sweepstakes rules: "No Purchase Necessary" intro plus **Rules 1–10**.
- Deploy path: **`/services/epic-hunt-giveaways/giveaway-rules.html`**.
- Same design system as the terms page. Notable differences:
  - "No Purchase Necessary" rendered as the orange notice callout.
  - The **mailing address** (PO Box for mail-in entries) is set off in a styled
    `<address>` block.
  - Long sub-clauses (Winner's List, No Automated Entries, The Drawing, Prize
    Notification, Release of Liability, Limitations, Tampering, Cancellation, Email
    Account Holder, No Prize Warranty, Governing Law) use small orange uppercase
    **sub-labels** (`.gw-sub-label`) so dense legal text stays scannable.
  - **Table of contents was removed** at request — the page goes straight from the
    callout into Rule 1. (The `.gw-toc*` CSS remains in the file, unused and harmless.)
  - Footer already includes the **Terms & Conditions** link.

### 1.3 Content cleanups (giveaway rules)

While transcribing, two minor readability fixes were made without changing legal meaning:

- Joined a run-on sentence about phone-contact attempts in Rule 6 (Prize Notification).
- Corrected the doubled phrase "are are eligible" → "are eligible" in Rule 6.

If strict verbatim fidelity to the source legal text is required, these can be reverted.

### 1.4 Footer integration (pending application to `index.html`)

The home page's footer should link both new legal pages. Because the live `index.html`
was not edited directly, the required snippets are provided in **Section 4** below for
manual application.

---

## 2. Design system reference

Every page declares these CSS variables in its `<style>` block. Keep them identical
across pages.

```css
:root {
  --bg: #0b0f14; /* page background (near-black) */
  --text: rgba(255, 255, 255, 0.92); /* primary text                 */
  --muted: rgba(255, 255, 255, 0.72); /* body / secondary text        */
  --line: rgba(255, 255, 255, 0.12); /* hairline borders / dividers  */
  --card: rgba(255, 255, 255, 0.06); /* card gradient (bottom)       */
  --card2: rgba(255, 255, 255, 0.085); /* card gradient (top)          */
  --shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
  --radius: 18px;
  --accent: #ff7a18; /* Epic orange                  */
  --accent2: #ffb26b; /* lighter orange (links/labels)*/
}
```

- **Font:** `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
  No web fonts — nothing to download.
- **Theme:** dark base, orange accents, gradient "glass" cards with soft shadows.
- **Buttons / pills:** rounded `999px`, orange border, transparent fill, lift + color
  shift on hover.

### 2.1 Shared navigation header (`.eo-header`)

A fully self-contained block — its own `<style>`, markup, and `<script>` — pasted
immediately after `<body>` on **every** page. Features:

- Logo linking home.
- A **"Join" dropdown** (Membership, Application Service).
- Top-level links: Giveaway, Login, Store.
- A **hamburger menu** that collapses the nav on screens ≤ 720px.
- Click-outside and Escape-to-close behavior.

> **Critical rule:** this block must remain byte-for-byte identical across pages. Any
> change (e.g., a new nav item) must be copied to every page so navigation stays in sync.

### 2.2 Shared footer

Dark bar, top border, centered. Contains an auto-updating copyright year:

```html
<script>
  document.getElementById("y").textContent = new Date().getFullYear();
</script>
```

Legal links sit above the copyright line (see Section 4).

---

## 3. Reusable page patterns

These are the building blocks used by `terms.html` and `giveaway-rules.html`. Copy them
when creating new content pages.

| Pattern           | Class                                   | Use                                                  |
| ----------------- | --------------------------------------- | ---------------------------------------------------- |
| Page container    | `.gw-container`                         | Centers content, ~820px max width                    |
| Title band        | `.gw-page-head`                         | Kicker pill + `<h1>` + intro line at top of page     |
| Kicker pill       | `.gw-kicker` + `.gw-pulse`              | Small labeled badge (e.g. "Legal", "Official Rules") |
| Notice callout    | `.gw-notice`                            | Orange left-accent box for important notes           |
| Table of contents | `.gw-toc` / `.gw-toc-list`              | Two-column jump-link list (optional)                 |
| Content card      | `.gw-card`                              | The main gradient card holding the body              |
| Section           | `.gw-section` + `<h2>` w/ `.gw-sec-num` | One numbered section with a divider                  |
| Sub-label         | `.gw-sub-label`                         | Small orange uppercase lead-in for sub-clauses       |
| Address block     | `<address>` (styled in `.gw-card`)      | Set-off mailing address                              |
| Back to top       | `.gw-top` / `.gw-top-wrap`              | Pill linking to `#top`                               |

### Starter recipe for a new content page

1. Copy `terms.html`.
2. Replace `<title>` and the title-band kicker / heading / intro.
3. Swap the body sections inside `.gw-card`.
4. Update or remove the table of contents to match the new sections.
5. Leave the `.eo-header` block and footer untouched.

---

## 4. Footer snippets (apply to `index.html`)

Replace the existing `<footer>` with this to link both legal pages:

```html
<footer>
  <nav class="gw-footer-links" aria-label="Footer">
    <a href="/terms.html">Terms &amp; Conditions</a>
    <span aria-hidden="true">&middot;</span>
    <a href="/services/epic-hunt-giveaways/giveaway-rules.html"
      >Giveaway Rules</a
    >
  </nav>
  Copyright &copy; 2017&ndash;<span id="y"></span> Epic Outdoors | All Rights
  Reserved
</footer>
```

Add these styles to the `<style>` block, right after the existing `footer { ... }` rule:

```css
.gw-footer-links {
  margin-bottom: 10px;
}

.gw-footer-links span {
  margin: 0 10px;
  color: rgba(255, 255, 255, 0.3);
}

footer a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: color 0.15s ease;
}

footer a:hover {
  color: var(--accent);
}
```

Result: `Terms & Conditions · Giveaway Rules` above the copyright line, with a subtle dot
separator and orange hover. Paths are root-relative, so the same footer works on every
page regardless of nesting. The footer on `giveaway-rules.html` currently shows only the
Terms link — add the Giveaway Rules entry there too if you want full parity (a link to
the page you're on is fine, or omit it).

---

## 5. Open items / follow-ups

- **Apply footer snippets** to `index.html` (Section 4).
- **Placeholder links in `terms.html`:**
  - Section 10 — "To view our Privacy Policy." → needs the Privacy Policy URL.
  - Section 6 — "review our Returns Policy." → needs the Returns Policy URL.
- **Optional:** strip the unused `.gw-toc*` CSS from `giveaway-rules.html`.
- **Verbatim option:** revert the two Rule 6 readability edits if strict source fidelity
  is preferred (Section 1.3).
- **Footer parity:** decide whether `giveaway-rules.html` and `terms.html` should both
  carry the same two-link footer as the home page.

---

## 6. File manifest (today)

| File                  | Status                                   |
| --------------------- | ---------------------------------------- |
| `terms.html`          | Created                                  |
| `giveaway-rules.html` | Created, then TOC removed                |
| `index.html` footer   | Edit snippets provided (not yet applied) |
| `README.md`           | Created                                  |
| `PROJECT.md`          | Created (this file)                      |
