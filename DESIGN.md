# NeplyTegr Design Guide

Derived from the homepage (`index.html`). It describes the **black & gold NeplyTegr brand style** as it exists today.

## Scope

- **Applies to:** NeplyTegr-branded pages: the homepage, `info.html`, `pronajem/`, and any new page that speaks *as NeplyTegr* (services, pricing, contact, legal…).
- **Does not apply to:** project folders (`sondy/`, `kasino/`, `detektor/`, `gojtastrike/`, …). Each project is a self-contained site with its own visual identity. Don't restyle them to match the homepage.
- Page copy is **Czech** (`<html lang="cs">`).

---

## 1. Principles

1. **Dark luxury.** Near-black backgrounds, white text, gold as the only accent color.
2. **Gold is the signal.** Use gold for headings inside cards, links, prices, highlights and primary actions. Everything else is white or grey.
3. **Soft gold glass.** Surfaces are translucent gold tints (5–15 %) with thin gold borders, never solid gold blocks (except the primary button).
4. **Calm motion.** Hover = lift up a few px plus a stronger border or glow, over 0.3 s. One slow ambient animation in the hero, nothing else moves on its own.
5. **Centered and generous.** Big headings, centered section titles, lots of vertical space (6rem between sections).

---

## 2. Color

### Base

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background, text on gold buttons |
| `--bg-raised` | `#1a1a1a` | End of the hero gradient |
| `--bg-footer` | `#000000` | Footer |
| `--header-bg` | `rgba(10, 10, 10, 0.95)` | Sticky header, with `backdrop-filter: blur(10px)` |

### Text

| Token | Value | Use |
|---|---|---|
| `--text` | `#ffffff` | Headings, body default |
| `--text-soft` | `#d0d0d0` | Lead paragraphs (hero, rental box, pricing notes) |
| `--text-muted` | `#b8b8b8` | Card text, subtitles, nav links, labels |
| `--text-dim` | `#888888` | Footer text |
| `--text-faint` | `#555555` | Copyright line |

### Gold

| Token | Value | Use |
|---|---|---|
| `--gold` | `#ffd700` | Accent: links, card headings, prices, borders on hover |
| `--gold-light` | `#ffed4e` | Link hover, end stop of gold gradients |
| `--gold-gradient` | `linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)` | Logo text, primary button |

### Gold alphas (on dark)

| Alpha | Use |
|---|---|
| `0.02–0.05` | Section band background gradient, card fill |
| `0.08` | Card fill on hover, hero glow |
| `0.10` | Header/footer/section divider lines, price box fill |
| `0.15` | Note boxes, ad placeholder fill |
| `0.20` | Card border (resting) |
| `0.30` | Feature box border, primary button glow |
| `0.40` | Dashed placeholder border |

No other hues. Emoji are the only multicolor element (see §7).

---

## 3. Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
```

- **Playfair Display 700** (serif): logo, hero `h1`, section titles, big box titles.
- **Inter** (sans): everything else, including prices and buttons.
- Body: `line-height: 1.6`; long paragraphs `1.8`.

| Element | Font | Size (desktop → ≤768px) | Extras |
|---|---|---|---|
| Logo | Playfair 700 | 1.8rem → 1.3rem | gold gradient text, `letter-spacing: -1px`, uppercase text `NEPLYTEGR` |
| Hero `h1` | Playfair 700 | 4.5rem → 2.5rem | `line-height: 1.1`, `letter-spacing: -2px`; key phrase in `<span>` colored gold |
| Section title `h2` | Playfair 700 | 2.5rem → 1.8rem | centered, white (gold when inside a feature box) |
| Card `h3` | Inter 600–700 | 1.3–1.5rem | gold |
| Note `h4` | Inter | 1.1rem | gold, emoji prefix |
| Hero lead | Inter | 1.2rem | `--text-soft`, `line-height: 1.8` |
| Section subtitle | Inter | 1.1rem | `--text-muted`, centered, max 600px |
| Body / card text | Inter | 1rem | `--text-muted` |
| Nav link | Inter | 0.95rem | `--text-muted` → gold on hover |
| Label | Inter | 0.9rem | uppercase, `letter-spacing: 1px`, `--text-muted` |
| Price | Inter 700 | 3.5rem → 2.5rem | gold |
| Button | Inter 600 | 1rem | uppercase, `letter-spacing: 0.5px` |

Use `<strong>` to emphasize prices and key facts inside paragraphs.

---

## 4. Layout & spacing

- Reset: `* { margin: 0; padding: 0; box-sizing: border-box; }`
- **Content width:** `max-width: 1200px; margin: 0 auto; padding: 0 2rem;`
- **Narrow content** (hero, pricing text): `max-width: 900px`.
- **Section rhythm:** `margin: 6rem auto` between sections; full-width bands use `padding: 6rem 2rem`.
- **Section header:** title (`margin-bottom: 1rem`) + subtitle (`margin-bottom: 3rem`).
- **Grids:** `display: grid; gap: 2rem;`
  - feature cards: `repeat(auto-fit, minmax(300px, 1fr))`
  - project cards: `repeat(auto-fit, minmax(350px, 1fr))`
- **Radius:** `8px` for buttons, price box, notes, placeholders; `12px` for cards and big boxes.
- **Spacing scale used:** 0.5, 1, 1.5, 2, 2.5, 3, 4, 6 rem.

---

## 5. Components

### Header
Sticky, `z-index: 100`, `padding: 1.5rem 2rem`, translucent black with blur, bottom border `1px solid rgba(255,215,0,0.1)`. Logo left, nav right (`margin-left: 2.5rem` between links). Nav is hidden on mobile.

### Hero
Full viewport (`min-height: 100vh`), centered, background `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)`. Decorative gold glow via `::before`: 800px circle, `radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)`, `animation: float 20s ease-in-out infinite`. Content sits above it with `position: relative; z-index: 2`.

### Price highlight
`inline-block`, fill `rgba(255,215,0,0.1)`, `2px solid #ffd700`, radius 8px, `padding: 2rem 3rem`, blur. Structure: label (uppercase, muted) → amount (big gold) → unit (muted).

### Buttons
```css
.btn          { padding: 1rem 2.5rem; border-radius: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.3s; }
.btn-primary  { background: gold gradient; color: #0a0a0a; border: 2px solid #ffd700; }
.btn-primary:hover   { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(255,215,0,0.3); }
.btn-secondary       { background: transparent; color: #fff; border: 2px solid #fff; }
.btn-secondary:hover { background: rgba(255,255,255,0.05); transform: translateY(-3px); }
```
Group buttons in `.cta-buttons` (flex, centered, `gap: 1.5rem`, wrap). One primary action per group; secondary is optional. On mobile they stack full width.

### Cards (`.feature-card`, `.project-card`)
Fill `rgba(255,215,0,0.05)`, border `1px solid rgba(255,215,0,0.2)`, radius 12px, padding 2–2.5rem.
Hover: border `#ffd700`, fill `0.08`, `translateY(-5px)`.
- Feature card: emoji icon (2.5rem) → gold `h3` → muted text.
- Project card: gold `h3` → muted text (`flex-grow: 1`) → `.project-link` (“Zobrazit projekt →”, gold 600, hover `#ffed4e`). Column flex so links align at the bottom.

### Feature box (`.rental-box`)
Gradient fill `rgba(255,215,0,0.1) → 0.05`, border `2px solid rgba(255,215,0,0.3)`, radius 12px, padding 3rem, centered. Gold Playfair `h2`.

### Placeholder (`.rental-ad`)
Fill `0.15`, `3px dashed rgba(255,215,0,0.4)`, radius 8px, min-height 300px, centered gold text.

### Note (`.pricing-note`)
Fill `0.15`, `border-left: 4px solid #ffd700`, radius 8px, padding 2rem, left-aligned. Gold `h4` with emoji, soft text.

### Section band (`.pricing-section`)
Full width, gradient `rgba(255,215,0,0.05) → 0.02`, top and bottom borders `1px solid rgba(255,215,0,0.1)`.

### Footer
Black, top border gold `0.1`, `padding: 3rem 2rem`, centered, `#888` text, gold links (underline on hover). Order: bold brand line → email → tagline → faint copyright.

---

## 6. Motion

| What | How |
|---|---|
| Default transition | `transition: all 0.3s` (or `color 0.3s` for links) |
| Button hover | `translateY(-3px)` |
| Card hover | `translateY(-5px)` |
| Primary glow | `box-shadow: 0 15px 35px rgba(255,215,0,0.3)` |
| Ambient | `@keyframes float` on the hero glow only, 20s |

---

## 7. Content & icons

- Icons are **emoji** (🎨 ⚙️ 📈 🎯 📱 🔧 💼 ✅ 📧), placed before headings or as the large card icon. No icon fonts or SVG sets.
- Arrow links end with ` →`.
- Prices are written with a space as thousands separator: `5 000 Kč`, `50 000 Kč`.
- Links to other pages use clean URLs: `https://neplytegr.cz/info`, `https://neplytegr.cz/<folder>`.
- External links (forms) open with `target="_blank"`.

---

## 8. Responsive

Single breakpoint: `@media (max-width: 768px)`
- Hero `h1` 2.5rem, price 2.5rem, logo 1.3rem, section title 1.8rem.
- Nav links hidden.
- `.cta-buttons` become a column; `.btn` is `width: 100%`.

---

## 9. Starter CSS variables

The homepage hard-codes its values. When building a new brand page, you can start from these tokens (same values):

```css
:root {
  --bg: #0a0a0a;
  --bg-raised: #1a1a1a;
  --bg-footer: #000000;
  --text: #ffffff;
  --text-soft: #d0d0d0;
  --text-muted: #b8b8b8;
  --text-dim: #888888;
  --text-faint: #555555;
  --gold: #ffd700;
  --gold-light: #ffed4e;
  --gold-gradient: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  --gold-line: rgba(255, 215, 0, 0.1);
  --gold-border: rgba(255, 215, 0, 0.2);
  --gold-fill: rgba(255, 215, 0, 0.05);
  --gold-fill-hover: rgba(255, 215, 0, 0.08);
  --radius-sm: 8px;
  --radius-lg: 12px;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}
```
