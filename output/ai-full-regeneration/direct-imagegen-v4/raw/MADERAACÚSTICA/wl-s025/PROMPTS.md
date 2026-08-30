# MADERAACÚSTICA/wl-s025 — direct built-in ImageGen prompt audit

All nine audited PNGs came from nine independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

`public/images/PUERTAS/MADERAACÚSTICA/wl-s025/original.webp`

Reference SHA-256 before and after the run: `4b8d34b2d9ff70ca1e8339c29f71b5ae6d758fbe2bee1d750cc7aa34b8bc57fb`.

Policy: `NO_LOGO_CANONICAL_EDGE_CONTACT_MAXIMUM_SUBJECT`. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every workspace PNG is a byte-for-byte copy of its built-in ImageGen result.

## Shared subject and invariant contract

> Use case: precise-object-edit.
>
> Asset type: e-commerce acoustic-door catalog finish variant.
>
> Input images: Image 1 is the sole edit target, sole reference and sole canonical geometry source.
>
> Primary request: directly generate the exact wl-s025 door in the requested finish while retaining realistic wood grain.
>
> Composition: preserve the original 415:1104 tall narrow ratio and perfectly front-facing orthographic presentation. The complete assembly must occupy essentially the entire canvas.
>
> Canonical contacts: the source measures `[0, 0, 0, 0]` pixels at RGB<245. Its complete assembly intentionally contacts all four canvas edges. Reproducing these contacts is allowed only when native inspection confirms both posts, their tips, lower ends and the full silhouette remain complete.
>
> Frame geometry: exactly two slim full-height outer side posts at the extreme left and right, one straight top crossbar and one inner top bevel.
>
> Leaf and panel geometry: one large flat leaf; one centered tall narrow raised rectangular panel with the original multi-step beveled molding and placement.
>
> Signature pattern: exactly TEN and only ten small square Greek-key/spiral line motifs in one vertical column. Preserve count, shape, orientation, size, spacing and source positions. Do not add, remove or merge motifs.
>
> Grain: predominantly vertical on the leaf, inner panel and outer posts; horizontal on the top crossbar.
>
> Hardware: exactly one short dark horizontal lever on one dark round rosette and exactly one separate dark round key cylinder below at the source position and scale.
>
> NO_LOGO: no WONLY logo, badge, brand, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
>
> Avoid: extra panels, grooves, motifs, seams, handles, locks, glass, inlays, decoration, architecture, room, wall, floor, props, perspective or cast shadow.

## Finish clauses

- negro: deep matte near-black stained wood with restrained visible grain.
- wengue: rich very dark chocolate-brown wenge, warm brown rather than neutral black.
- gris-oscuro: deep charcoal dark-gray stained wood.
- antracita: matte neutral graphite/anthracite gray, distinct from negro and gris-oscuro.
- nogal: refined medium warm walnut brown.
- roble: classic medium golden oak with restrained honey warmth.
- gris-claro: pale cool light-gray stained wood, visibly separate from pure white.
- natural: very pale raw natural oak/ash, neutral blond beige.
- blanco: refined whitewashed wood with subtle visible grain and clear bevel definition.

## F1 — canonical maximum-subject base

Every independent call combined the shared subject contract with one finish clause. It requested the exact 415:1104 ratio, source-faithful edge-to-edge scale, preferred margins of 0–6 pixels and a normal maximum of 12 pixels. Canonical contact on any of the four edges was allowed because the original contacts all four edges and its native silhouette is complete.

All nine F1 calls passed. Eight finishes measure entirely within 0–6 pixels. `gris-oscuro` measures `[3, 4, 3, 11]`, which remains inside the normal 12-pixel maximum, so no retry was required.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | exec-bcd1f4f8-0225-47ab-a996-9b20182a7be1 | accepted — `[0, 0, 0, 0]` |
| wengue | 1 | F1 | exec-74aab59d-da81-4b7d-90f7-38bf9dba4d2a | accepted — `[4, 0, 2, 0]` |
| gris-oscuro | 1 | F1 | exec-a7516c9f-c272-4e04-b4d4-2ce6e29288ff | accepted — `[3, 4, 3, 11]` |
| antracita | 1 | F1 | exec-d5ab435a-3f37-4b7d-b4a0-41279bfec836 | accepted — `[4, 5, 6, 5]` |
| nogal | 1 | F1 | exec-3434b662-92db-4d9d-a0eb-4d208c37eab2 | accepted — `[5, 6, 4, 0]` |
| roble | 1 | F1 | exec-81d3350d-102c-4791-9b50-e492d2b1ada9 | accepted — `[1, 4, 5, 0]` |
| gris-claro | 1 | F1 | exec-b6e7d744-25f4-4915-b5b3-467bf407706a | accepted — `[0, 4, 0, 0]` |
| natural | 1 | F1 | exec-431d61d3-6e26-4497-b5e1-8eb31a9e4aff | accepted — `[4, 5, 5, 0]` |
| blanco | 1 | F1 | exec-8332e6b8-0276-4b3b-b1c1-ef7867abf859 | accepted — RGB<250 `[3, 5, 0, 0]` |

Totals: nine independent built-in ImageGen calls, nine accepted and zero rejected. The empty `_rejected` directory is retained for the audit layout.

## Maximum-subject result

The measured maximum margin is 11 pixels and every accepted output remains within the normal 12-pixel ceiling. Eight of nine are entirely inside the preferred 0–6-pixel range. Zero-pixel terminations reproduce the source's canonical edge contacts rather than cropping it. Native-detail inspection confirms the complete outer frame, full lower ends, centered raised panel, exactly ten Greek-key motifs, lever and separate key cylinder in every PNG.

No file under `public` was touched. No PNG was processed after generation.
