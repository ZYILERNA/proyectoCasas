# MADERAACÚSTICA/wl-s201 — direct ImageGen prompts

Use case: `product-mockup`. All 25 requests were independent built-in ImageGen edits. Every call referenced only `public/images/PUERTAS/MADERAACÚSTICA/wl-s201/original.webp`. No generated output, public finish variant, logo asset, mask or secondary image was ever supplied as input.

## Shared invariant contract

Create one premium e-commerce catalog finish variant while preserving the sole reference as a locked construction blueprint: the same very tall narrow straight front-facing single door; the complete square outer casing with exactly two slim vertical posts and one top lintel; the same thin dark perimeter reveal; exactly one huge centered tall rectangular recessed/raised panel with the same four-sided layered stepped/beveled molding and clean 45-degree miters; the same plain uninterrupted center field; exactly one short black horizontal rectangular lever on the left on its square black backplate, pointing right; exactly one separate small black square key escutcheon below; and exactly two subtle short hinge/reveal marks on the right edge. Preserve all geometry, alignments, casing thicknesses, panel insets and hardware positions.

Use a pure white empty catalog background. NO_LOGO: no logo, wordmark, badge, letters, numbers, text, watermark, microtext, pseudotext or branding. Add no handle, lock, hinge, ornament, panel, seam, groove, molding, wall, floor, scene, prop, perspective or backdrop shadow. Keep all four outer corners and the complete silhouette.

Reproduce the original's extreme `[4,1,3,2]` occupancy: the door assembly must be as large as possible, nearly full bleed, with 0–6 px preferred clearance and 12 px normal maximum. Maintain the canonical width/height aspect of approximately `0.3766`. No programmatic crop, resize, recolor, conversion, filter or compositing is permitted.

## Finish instructions

- `negro`: deep neutral architectural black, premium matte painted wood with subtle plausible grain and readable edges.
- `wengue`: very dark espresso-brown wenge, fine linear wood grain, restrained contrast, not red.
- `gris-oscuro`: dark neutral charcoal gray, refined low-sheen painted wood.
- `antracita`: deep graphite anthracite, restrained low sheen and subtle texture.
- `nogal`: medium warm walnut brown, fine straight grain, not orange.
- `roble`: warm light-to-medium oak, honey beige-brown, fine authentic grain, no rustic defects.
- `gris-claro`: pale neutral light gray, subtle matte texture, distinct from the white background.
- `natural`: very light pale-beige natural unfinished wood, subtle fine grain.
- `blanco`: clean softly warm white painted wood, controlled relief against the pure white background.

## Calls and selections

| Finish | Calls | Selected attempt | Selected generator ID | RGB<245 margins L/T/R/B |
|---|---:|---:|---|---|
| negro | 4 | 4 | `exec-862b2545-8e20-429e-8d00-979ce1f8f4c5` | 8/6/6/5 |
| wengue | 4 | 4 | `exec-a046f282-7f10-4ab1-88a1-9fc3cbb4a911` | 8/4/6/6 |
| gris-oscuro | 2 | 2 | `exec-46879176-461c-4e03-9dfd-8157d58b1951` | 10/6/12/7 |
| antracita | 1 | 1 | `exec-0c6c2d21-361a-4920-b54f-72eab3092a12` | 10/6/10/5 |
| nogal | 1 | 1 | `exec-1e32817d-2530-431a-affa-a2bef0188e89` | 10/8/11/9 |
| roble | 4 | 4 | `exec-bb7011ad-44c5-4e41-acb0-91d3d41b9389` | 12/5/9/5 |
| gris-claro | 1 | 1 | `exec-90bac77a-01f4-4677-a26c-69226e4cfea6` | 10/7/9/5 |
| natural | 2 | 2 | `exec-7cad578c-10e2-4da4-921d-df6e90772d17` | 12/4/11/10 |
| blanco | 6 | 6 | `exec-806e347e-6645-4748-9eb3-84397054898f` | 12/0/12/1 |

## Retry framing clauses

Every retry repeated the complete invariant contract against the same sole original. Only the framing language was strengthened:

- Early retries emphasized the canonical `0.3766` extremely tall portrait ratio, complete uncropped silhouette and `0–6 px` target.
- Attempts 4 for `negro`, `wengue` and `roble` explicitly required the assembly to occupy `98.5–99.5%` of canvas width and `99.5–99.9%` of height, leaving only the same hairline clearance as the original and forbidding generous whitespace.
- White attempts 5 and 6 explicitly specified approximately `2–4 px` clearance, `99.2–99.5%` width and `99.6–99.8%` height, while still requiring all four corners and the full uncropped silhouette.

The selected white attempt is retained after six direct calls. It is the only faithful complete result within the 12 px lateral ceiling. Its `[12,0,12,1]` RGB-threshold bounds are documented: native-detail inspection shows the entire lintel and all four corners, and the top-row contact is only a one-pixel measurement difference from the original's already nearly full-bleed `[4,1,3,2]` termination. All 16 rejected calls are preserved byte-for-byte under `_rejected/`.

## Complete generator audit

- `negro`: `exec-2289be46-5a71-42f1-b813-fc22969e766f`, `exec-10d573c8-9787-4361-be27-3ad0dc266c2f`, `exec-d9ae39de-36e4-45e4-b5b8-c5b89e2edb3e`, selected `exec-862b2545-8e20-429e-8d00-979ce1f8f4c5`.
- `wengue`: `exec-f1adcbe2-99fb-436d-a8b1-2d2d5427a677`, `exec-2f806a38-ed96-4eff-bfdd-530ad889af9e`, `exec-456ad1c0-b783-481b-8bff-aa8a398f3c53`, selected `exec-a046f282-7f10-4ab1-88a1-9fc3cbb4a911`.
- `gris-oscuro`: `exec-d5a5ba52-6947-4205-b5b4-fc3680d1cd67`, selected `exec-46879176-461c-4e03-9dfd-8157d58b1951`.
- `antracita`: selected `exec-0c6c2d21-361a-4920-b54f-72eab3092a12`.
- `nogal`: selected `exec-1e32817d-2530-431a-affa-a2bef0188e89`.
- `roble`: `exec-d2b2f85d-5d7a-40d8-a9ea-2730290de203`, `exec-6d18e4d9-db0b-48c9-8447-2cfe694e1e76`, `exec-3b5b2db5-8af7-4e3b-af8a-3cd87b7dc294`, selected `exec-bb7011ad-44c5-4e41-acb0-91d3d41b9389`.
- `gris-claro`: selected `exec-90bac77a-01f4-4677-a26c-69226e4cfea6`.
- `natural`: `exec-7c986d9a-ff8e-41d9-825d-472ec4618470`, selected `exec-7cad578c-10e2-4da4-921d-df6e90772d17`.
- `blanco`: `exec-565dd905-9bb9-49a8-ba06-136aab1feb54`, `exec-715a0960-94f9-4ef7-a2a3-7eaef678f0f4`, `exec-3e1567d9-6a23-4238-a422-06da49d146d6`, `exec-3fd019fb-1ae2-497a-a940-1b27bab8622e`, `exec-b3754632-8569-4715-8428-130d4ce2f523`, selected `exec-806e347e-6645-4748-9eb3-84397054898f`.
