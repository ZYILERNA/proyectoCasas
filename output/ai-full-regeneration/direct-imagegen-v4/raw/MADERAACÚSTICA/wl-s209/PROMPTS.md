# MADERAACÚSTICA/wl-s209 — direct ImageGen prompts

Use case: `product-mockup`. All 26 requests were independent built-in ImageGen edits. Every call referenced only `public/images/PUERTAS/MADERAACÚSTICA/wl-s209/original.webp`. No generated result, public finish variant, logo asset, mask or secondary image was ever supplied as input.

## Shared invariant contract

Create one premium catalog finish variant while preserving the reference as a locked construction blueprint: the same extremely tall narrow straight front-facing single door and approximately `0.3798` width/height ratio; complete squared exterior casing with exactly two slim straight vertical posts and one horizontal top lintel; the same deep narrow dark recessed reveal along the inner left edge; the same thin perimeter reveals and subtle straight structural seam lines; exactly one very large centered elongated rectangular recessed/raised panel with the identical wide four-sided layered stepped/beveled molding, identical 45-degree mitered corners, position and proportions, and one plain uninterrupted center field; exactly one slim metallic horizontal lever pointing right on one small round dark rosette at the canonical left position; exactly one separate small round dark key escutcheon directly below. Add no hinges or other visible hardware.

Use a pure white empty catalog background. NO_LOGO: no logo, wordmark, letters, numbers, text, badge, label, watermark, microtext or pseudotext. Add no panel, groove, seam, ornament, wall, floor, room, scene, prop, perspective or backdrop shadow. Preserve every line, join, casing width, molding profile, hardware shape and all four outer corners.

Reproduce the original's extreme `[4,5,4,0]` framing: 0–6 px preferred clearance, 12 px normal maximum, with bottom contact canonical. The door must be as large as possible while the complete silhouette remains present. No programmatic filter, recolor, crop, resize, mask, conversion or compositing is permitted.

## Finish instructions

- `negro`: premium deep neutral matte black painted wood, restrained texture and readable relief.
- `wengue`: very dark espresso-brown wenge, subtle fine straight grain, not red.
- `gris-oscuro`: dark neutral charcoal-gray matte painted wood.
- `antracita`: deep graphite anthracite matte painted wood.
- `nogal`: medium warm walnut, fine authentic straight grain, never orange or red.
- `roble`: warm light-to-medium honey beige-gold oak, subtle straight grain, no knots.
- `gris-claro`: pale neutral light-gray matte painted wood, distinct from the background.
- `natural`: very light pale-beige natural unfinished wood with subtle fine grain.
- `blanco`: clean softly warm white painted wood, separated from the white background by realistic edge shading.

## Calls and selections

| Finish | Calls | Selected attempt | Selected generator ID | RGB<245 margins L/T/R/B |
|---|---:|---:|---|---|
| negro | 3 | 3 | `exec-429a802f-aef6-4570-a579-2705dd33ff02` | 0/0/0/0 |
| wengue | 1 | 1 | `exec-8b5804be-2f0e-4bfc-9631-f12dbe0d0660` | 10/7/9/0 |
| gris-oscuro | 3 | 3 | `exec-c9cdb3e0-5428-479b-ad6b-9816ec33da8b` | 0/0/0/0 |
| antracita | 3 | 3 | `exec-6ef97183-9c47-4cbb-a7db-9b534bd2679d` | 0/0/0/0 |
| nogal | 1 | 1 | `exec-1301f502-82fa-407a-b5bf-6e83727d676f` | 0/0/0/0 |
| roble | 3 | 3 | `exec-6ad149ac-c34e-4040-98ea-d25c6df28a7f` | 0/0/0/0 |
| gris-claro | 1 | 1 | `exec-40c72845-67f2-4338-903e-3ecdeccc4348` | 11/9/12/0 |
| natural | 1 | 1 | `exec-70511e36-7e61-4c0b-b695-f8c387fffa0d` | 10/9/12/0 |
| blanco | 10 | 9 | `exec-43eaeb78-80af-4c60-96b5-dc5cf5abfea4` | 10/6/10/0 |

## Retry framing clauses

Every retry repeated the full invariant contract against the same sole original. Only the output-shape and framing wording was strengthened:

- Second attempts explicitly required an extremely tall output around `770×2035`, rejected the incorrect `1090×1440` shape, and repeated the canonical `[4,5,4,0]` termination.
- Third attempts required the complete casing to occupy at least 99% of width and 99.7% of height, with four complete corners and virtually full-bleed framing.
- White attempts 4–10 progressively requested tighter full-width outer posts, edge-to-edge occupancy and a targeted reduction of the side margins while preserving the full silhouette.

Native-detail inspection confirms that the five `[0,0,0,0]` selections retain both complete exterior posts, the complete top lintel, all four outer corners and the complete lower edge. The contacts are accepted as close reproductions of the original's already nearly full-bleed `[4,5,4,0]` framing, including its canonical bottom contact.

Three additional white calls were made from the sole canonical original. Attempt 9 is selected at `[10,6,10,0]`, so all four margins now comply with the 12 px mandatory maximum and the former attempt-6 exception is eliminated. The displaced attempt 6 and failed attempts 8 and 10 are retained byte-for-byte. No crop, resize or other pixel correction was used. All 17 rejected direct PNG outputs are retained byte-for-byte in `_rejected/`.

## Literal prompts for white minimum-margin revision

### Attempt 8 — rejected — `exec-cef9e55e-f158-4506-9cf1-88bdc4c37178`

```text
Edit ONLY the supplied canonical wl-s209 original into one fresh photorealistic studio product image. Use that original as the sole reference; never use any generated image. Direct AI regeneration only, with no filter, scripted recolor, crop, resize, mask, composite, conversion or post-processing.

Finish the complete door assembly in clean soft BLANCO with subtle realistic tonal separation so every molding remains readable. Preserve the exact wl-s209 identity: straight-on ultra-tall narrow single door; complete two full-height outer jamb posts and top header; recessed far-left reveal; exactly ONE very tall centered rectangular classical panel/molding, with its complete thick multi-step beveled frame, one uninterrupted plain center, square 90-degree corners, and no second panel. Preserve the slim upper and lower leaf rails and the original vertical construction seams outside the central molding. Exactly one dark horizontal lever on one round rosette at the left and exactly one small round key escutcheon below. No other hardware, panel, groove, ornament or window.

STRICT SCALE: keep the original 406:1069 ratio (about 0.3798) on a 772×2036-like ultra-tall canvas, never 1:2, 9:16 or wider. Enlarge the complete intact outer assembly to occupy at least 99% of the bitmap. Target fully-white margins [left,top,right,bottom]=[0,0,0,0], preferred 0–4 physical pixels and absolute maximum 12 px per side. Edge contact is allowed, but retain every outside corner, top cap, jamb edge and both bottom endpoints completely recognizable. No white mat, padding, border, wall, floor, room, scenery or broad shadow field.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark or pseudotext.
```

### Attempts 9 and 10 — shared literal prompt

- Attempt 9 selected: `exec-43eaeb78-80af-4c60-96b5-dc5cf5abfea4`.
- Attempt 10 rejected: `exec-dec4f11a-ec95-46cf-95e7-e839276d4edd`.

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-s209 original. Never use a generated image. Direct ImageGen only: no filter, scripted recolor, crop, resize, mask, composite, conversion or post-processing.

Render the complete assembly in premium soft BLANCO. It must still read as white, but use physically realistic light-gray contact shadows and bevel shading on the OUTERMOST jamb edges and header so real structural pixels below RGB 245 extend to the canvas boundaries; do not dissolve the white frame into a white mat.

Preserve exact wl-s209 geometry: straight-on ultra-tall narrow 406:1069 door; two complete full-height outer jamb posts, complete top header and deep far-left reveal; exactly ONE very tall centered rectangular classical panel with a complete thick multi-step beveled molding, four square corners and one uninterrupted plain center; original slim upper/lower rails and vertical construction seams outside that molding; exactly one dark horizontal lever on one round rosette and one small round key escutcheon below. No second panel, extra molding, ornament, groove, hardware or window.

Use a 772×2036-like ultra-tall canvas at the source ratio ~0.3798, never wider. The intact outer assembly must reach or lie within 0–6 physical pixels of every canvas edge. Target measured RGB<245 margins [left,top,right,bottom]=[0,0,0,0], absolute maximum 12. Place the visible shaded outer edge of the left jamb at x=0, right jamb at x=width−1, header at y=0 and complete bottom endpoints at y=height−1. Contact without truncation: keep all caps, corners, jamb edges and tips recognizable. No white mat, padding, border, wall, floor, room, scenery or broad shadow field.

No Wonly logo, logo, text, letters, badge, emblem, watermark or pseudotext.
```

## Complete generator audit

- `negro`: `exec-572da2e5-7be1-441d-85ad-8fb5101e84d3`, `exec-9d84c1ae-5c59-49fe-a127-aec1b0cdbbd4`, selected `exec-429a802f-aef6-4570-a579-2705dd33ff02`.
- `wengue`: selected `exec-8b5804be-2f0e-4bfc-9631-f12dbe0d0660`.
- `gris-oscuro`: `exec-e707cfae-9749-4702-b091-c462a263149f`, `exec-f922c775-cc68-4b3b-a677-ecdba57cb620`, selected `exec-c9cdb3e0-5428-479b-ad6b-9816ec33da8b`.
- `antracita`: `exec-17c39007-10dd-407b-9603-0b4fa49d2199`, `exec-dcceab78-df58-42d8-89ee-d5a144e03ad9`, selected `exec-6ef97183-9c47-4cbb-a7db-9b534bd2679d`.
- `nogal`: selected `exec-1301f502-82fa-407a-b5bf-6e83727d676f`.
- `roble`: `exec-0437186b-a62e-4d01-bdd8-7b0d867ab27d`, `exec-178efa18-6545-4c19-9572-90dd979e21ae`, selected `exec-6ad149ac-c34e-4040-98ea-d25c6df28a7f`.
- `gris-claro`: selected `exec-40c72845-67f2-4338-903e-3ecdeccc4348`.
- `natural`: selected `exec-70511e36-7e61-4c0b-b695-f8c387fffa0d`.
- `blanco`: `exec-9eb80099-6248-4991-bcdb-3504a5038ced`, `exec-890108d2-2070-4501-a180-6b1faa67437e`, `exec-51425efa-2742-4bfc-88c6-1a5377f673fa`, `exec-18c915ab-ffac-4f39-b59d-2d61f6bfbad4`, `exec-32bd9b6c-9f1c-4fe1-bf2d-0a4bf633f3c1`, displaced `exec-0dce020a-b9f3-4f79-b668-d59ada8d4fea`, `exec-31dfa721-eef9-4d4c-b917-c1235b74da0b`, `exec-cef9e55e-f158-4506-9cf1-88bdc4c37178`, selected `exec-43eaeb78-80af-4c60-96b5-dc5cf5abfea4`, `exec-dec4f11a-ec95-46cf-95e7-e839276d4edd`.
