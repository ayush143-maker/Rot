# ROT — the website that lives and dies

a website that is a living organism with a short lifespan. when you arrive it
is born. while you watch, it ages, decays and dies — the full arc from LIVE to
DEAD takes 150 seconds of life time. your attention is the only thing keeping
it alive.

## the mechanics

| rule | value |
| --- | --- |
| lifespan | 150 seconds of life time |
| tick | every 250 ms |
| neglect | no interaction for 6 s → time runs ×4 |
| stages | ALIVE (< 0.3) · AGING (< 0.6) · DECAY (< 1) · DEAD (= 1) |
| decay | `lifeTime / 150`, written to `--decay` on `<html>` plus `data-stage` |

- attention (mouse movement, scroll, keys, touch) keeps time at ×1.
- neglect accelerates time ×4 and is tracked as `idleShare`.
- cause of death: `idleShare > 0.5` → **neglect**, otherwise **old age**.
  if it dies while you are away, the tombstone shows the real date of death
  and the cause is recorded as neglect.
- after death: tombstone, epitaph, guestbook, and one DEFIBRILLATE button
  (white flash, lifespan resets, life resumes).
- everything persists in `localStorage`:

| key | content |
| --- | --- |
| `rot:birth` | ms epoch of the current life's birth (dragged backwards by neglect) |
| `rot:deaths` | total deaths (incremented when death is confirmed) |
| `rot:resurrections` | total defibrillations |
| `rot:marks` | JSON array of guestbook lines |
| `rot:cod` | internal: persists the cause of death across reloads |

all time logic runs client-side (`useEffect`) — the server renders a neutral
ALIVE state, so there is no hydration mismatch.

## design

the whole palette, tempo and posture of the page are driven by the single
number `--decay` via `color-mix()` and `calc()` in CSS: bone yellows, ash
takes over, cracks fade in, sections tilt, the ECG stutters and finally
flatlines. texture is SVG noise and hand-drawn cracks only — no images.

type: Cormorant Garamond (the voice), Space Mono (the vitals), Archivo (the
body).

`prefers-reduced-motion` is honored: decorative animation stops, decay
continues.

## run locally

```bash
npm install
npm run dev
# http://localhost:3000
