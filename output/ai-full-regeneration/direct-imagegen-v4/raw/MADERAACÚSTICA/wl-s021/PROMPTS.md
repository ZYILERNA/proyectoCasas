# MADERAACÚSTICA/wl-s021 — direct ImageGen prompts

Use case: `product-mockup`. Every one of the 55 completed requests was an independent built-in ImageGen edit. The only referenced image in every request was `public/images/PUERTAS/MADERAACÚSTICA/wl-s021/original.webp`. No generated result, logo asset, secondary reference or previous attempt was ever supplied as input. One aborted call produced no image file and is not counted.

## Shared invariant contract

Edit the provided reference into one clean catalog product variant. Preserve the exact physical design: a tall narrow front-facing single door; complete straight square outer casing with top lintel and two side posts; thin dark perimeter reveal; one huge centered tall rectangular panel; four-sided layered stepped/beveled molding with clean 45-degree miters; plain uninterrupted central panel; exactly one black horizontal lever on the left pointing right; exactly one separate small black rectangular lock escutcheon below it; and the same restrained right-edge hinge/reveal details. Preserve proportions, hardware count and placement, molding, joins and all four outer corners.

Change only the named material finish. Use a pure white catalog background. NO_LOGO: absolutely no logo, wordmark, text, letters, numbers, watermark, badge, microtext or pseudotext. Add no scene, wall, floor, cast shadow, extra hardware, extra panel, seam, diagonal join, ornament or perspective change. Keep the whole silhouette complete and uncropped.

Make the door as large as physically possible in the canvas. Target a hairline 0–6 px white clearance on every side, normally never more than 12 px. A zero-pixel RGB<245 contact is acceptable only where the original's own extreme termination supports it and native-detail inspection confirms the complete rail and corners.

## Finish instructions

- `negro`: deep neutral architectural black; very subtle premium painted/wood texture; preserve legibility of molding and reveal.
- `wengue`: very dark espresso-brown wenge; restrained straight vertical grain; no red cast.
- `gris-oscuro`: dark neutral charcoal gray; subtle matte wood texture.
- `antracita`: deep graphite anthracite; premium low-sheen finish with clear molded-panel relief.
- `nogal`: medium warm walnut brown; fine realistic straight grain; no orange cast or decorative bookmatching.
- `roble`: warm golden oak; restrained realistic straight grain; no knots or rustic defects.
- `gris-claro`: pale neutral light gray; subtle matte wood texture with enough contrast to preserve all molding.
- `natural`: very light natural unfinished wood; warm pale beige; subtle realistic straight grain.
- `blanco`: clean warm architectural white; restrained texture and soft relief contrast, distinct from the white background.

## Independent attempts and selected generator IDs

| Finish | Calls | Selected attempt | Selected generator ID | RGB<245 margins L/T/R/B |
|---|---:|---:|---|---|
| negro | 4 | 1 | `exec-b503ec80-31b1-40d5-91b7-0c406d363509` | 12/7/7/0 |
| wengue | 4 | 1 | `exec-5f5eaa2f-53ab-478e-b8b0-9413b4bce226` | 11/6/8/0 |
| gris-oscuro | 1 | 1 | `exec-02b09b8f-bbdc-4106-8b40-960e8d27cf6c` | 11/6/7/5 |
| antracita | 11 | 11 | `exec-8a83631a-467a-4572-a44a-116971928fbf` | 10/6/7/5 |
| nogal | 8 | 8 | `exec-d23f2e80-f7ed-45d8-9c23-9274cd82e89d` | 11/8/11/8 |
| roble | 4 | 4 | `exec-f884d3e9-456b-4130-bd9c-ed195dbd0914` | 12/8/11/7 |
| gris-claro | 4 | 4 | `exec-74a4330e-f02f-46bb-9f1e-014eac33a6af` | 11/7/8/8 |
| natural | 13 | 13 | `exec-c924d76f-bd0f-4e47-8b59-f2b801e01895` | 0/0/0/0 |
| blanco | 6 | 6 | `exec-6e003262-66d0-4657-a098-14dea7aa08f5` | 12/11/11/5 |

Retry prompts repeated the full invariant contract and progressively strengthened phrases such as “near full bleed,” “only a hairline 1–2 pixel white clearance,” “do not leave broad white margins,” and “do not crop any casing.” They remained fresh independent calls against the same sole `original.webp`; no accepted or rejected output became a reference. Attempts that increased padding, changed output aspect ratio, introduced diagonal joinery or altered panel molding were retained byte-for-byte in `_rejected/`.

The selected `negro` and `wengue` results reach RGB<245 on the bottom row, but native inspection shows their complete lower rails and corners; the original has only 1 px bottom clearance. `natural` attempt 13 measures `[0,0,0,0]`; native-detail inspection confirms the complete lintel, side posts, corners, endpoints, single recessed panel, continuous stepped molding, one lever plus one lock escutcheon and both right-edge hinges. These contacts were accepted instead of applying any crop, resize, mask, filter, recolor, composite or conversion.

## Natural minimum-margin revision ledger

| Attempt | Generator ID | Dimensions | RGB<245 margins L/T/R/B | SHA-256 | Disposition |
|---:|---|---|---|---|---|
| 11 | `exec-abad98ee-7d20-44a2-9515-7e5502ec7e6c` | 773×2035 | 13/7/6/0 | `fd917dae07e51c037c0b9afbc34c27a00dca3aae3e77b7b2877d3d619cb47999` | previous selected result preserved byte-for-byte under `_rejected/` |
| 12 | `exec-23caa673-f2c3-4d9f-8bab-e77f42dae97c` | 773×2035 | 14/6/15/0 | `ff30e74355e3098be774f088fac4ef3702bfcfeead62d42137eda671f2b2acd4` | rejected: both side margins exceed 12 px |
| 13 | `exec-c924d76f-bd0f-4e47-8b59-f2b801e01895` | 772×2036 | 0/0/0/0 | `cb8a5b1993610ff5c46ead6540ba3b7e0ff925b2c329594b159ed6f7a831fb30` | selected: intentional four-edge contact, complete native contour |

The aborted call produced no artifact and therefore contributes neither a PNG nor an ImageGen-call count.

## Revision prompts — literal, lossless

The following two bodies are the exact `image_generation_end.revised_prompt` values recovered from the complete rollout.

### Natural attempt 12 — `exec-23caa673-f2c3-4d9f-8bab-e77f42dae97c`

```text
Edit ONLY this canonical source into a faithful NATURAL finish ecommerce cutout. Preserve the exact physical model and counts: straight-on ultra-tall narrow single door; complete square outer casing with one straight top lintel, two square side posts, thin dark leaf reveal, all four corners and bottom endpoints; exactly ONE huge centered tall rectangular recessed panel; exactly ONE four-sided layered stepped/beveled molding around that panel with clean 45-degree miters; the large central field remains entirely plain and uninterrupted. Preserve exactly ONE black horizontal lever on the left pointing right, exactly ONE separate small black rectangular lock escutcheon below it, and exactly TWO restrained narrow black hinge/reveal marks on the right edge. No extra hardware, panel, seam, diagonal join, ornament, glass, line or groove. Absolutely no logo, Wonly mark, text, badge, watermark, letters or pseudotext (NO_LOGO).

Refinish leaf and matching casing only in very light natural unfinished wood, warm pale beige with restrained fine straight grain; hardware and thin reveal remain black. Preserve the canonical aspect ratio (width/height 0.379655); never widen.

ENCADRE CRÍTICO: the complete outer casing must fill virtually the whole canvas and be tangent or almost tangent to every boundary. Leave only 0–3 px of pure-white hairline clearance at left, top, right and bottom, with at least 99.5% subject occupancy in width and height. No product-photo padding, breathing room, floor band, broad white margin or cast shadow. Keep every casing edge, all four corners, full lintel, both side posts, both hinges and both bottom endpoints fully visible and intact—nothing cut off. Pure white background. Photorealistic, front-facing, centered and crisp.
```

### Natural attempt 13 — `exec-c924d76f-bd0f-4e47-8b59-f2b801e01895`

```text
Create the NATURAL finish of this exact canonical door, referencing ONLY the attached original. Preserve: ultra-tall narrow front view at width/height 0.379655; complete square outer casing with top lintel, both straight side posts, thin dark leaf reveal, four intact corners and two intact bottom endpoints; exactly one enormous centered tall rectangular recessed panel; exactly one continuous four-sided stepped beveled molding with clean mitered corners; plain uninterrupted center. Exactly one black horizontal lever on a square base at left, exactly one separate small black rectangular key escutcheon below, and exactly two small restrained black hinge marks on the right edge. No other elements. NO_LOGO, no Wonly, text, badge, watermark or pseudotext. Refinish door and casing in pale warm light natural wood with restrained fine grain; keep hardware/reveal black.

FULL-BLEED PRODUCT FRAMING IS MANDATORY: there must be NO visible white vertical strip at either side. The colored outer left post must reach the canvas's x=0 edge and the colored outer right post must reach the last pixel column, while their full widths and all outer corners remain visibly intact. The top lintel must reach or sit within 0–2 pixels of the top boundary; both intact lower endpoints must reach the bottom boundary. The door assembly must occupy 100% of canvas width and virtually 100% of height. This means framing flush to the canvas—not cutting away the casing. Do not surround it with padding, whitespace, a catalog border, floor band or shadow. Pure white may appear only outside tiny corner contours if naturally unavoidable. Keep the same narrow source ratio and exact front-on geometry. Crisp photorealistic ecommerce rendering.
```
