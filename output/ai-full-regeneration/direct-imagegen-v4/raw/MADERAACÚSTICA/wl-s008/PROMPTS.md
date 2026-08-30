# MADERAACÚSTICA/wl-s008 — direct built-in ImageGen prompt audit

All 20 audited PNGs came from 20 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

public/images/PUERTAS/MADERAACÚSTICA/wl-s008/original.webp

Reference SHA-256 before and after the run: 4500a53119d7815d351dcc14020b6579f5c374f299ff8c7cb203e3f1299a6b6c.

Policy: NO_LOGO_MINIMAL_WHITE_MARGIN. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every workspace PNG is a byte-for-byte copy of its built-in ImageGen result.

This file records the operational prompt families and complete attempt mapping. The built-in tool did not emit a separate normalized prompt log, so the families preserve the explicit requests and invariants without claiming to reproduce any hidden internal normalization.

## Shared subject and invariant contract

> Use case: precise-object-edit.
>
> Asset type: e-commerce acoustic-door catalog finish variant.
>
> Input images: Image 1 is the sole edit target, sole reference and sole canonical geometry source.
>
> Primary request: change only all wood surfaces of the complete wl-s008 door-and-frame assembly to the requested finish while retaining restrained realistic vertical wood grain.
>
> Composition: preserve the original 379:1024 tall narrow ratio and perfectly front-facing orthographic presentation. Make the complete assembly as large as possible with the minimum safe continuous white perimeter.
>
> Frame geometry: exactly two square outer side posts projecting above one straight top crossbar and extending to the bottom; one inner beveled lintel and the original dark left reveal.
>
> Leaf geometry: exactly one smooth plain leaf with one single very fine tall rectangular perimeter outline; preserve the narrow far-right inner-edge cluster of close parallel vertical flutes with the source count, spacing, height and position.
>
> Hardware: preserve the slim outlined rectangular handle module interrupting the left side of the fine outline; exactly one short dark horizontal lever on one round rosette and exactly one separate dark round key cylinder below, at the original position and scale.
>
> NO_LOGO: no WONLY logo, badge, brand, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
>
> Avoid: extra panels, grooves, seams, flutes, handles, locks, glass, inlays, decoration, architecture, room scene, wall, floor, props, perspective or cast shadow.

## Finish clauses

- negro: deep matte neutral black wood with restrained vertical grain.
- wengue: rich very dark wenge brown-black wood, recognizably warm brown rather than neutral black.
- gris-oscuro: deep charcoal dark-gray wood.
- antracita: neutral matte anthracite gray wood, slightly lighter than black.
- nogal: warm medium-dark natural walnut brown.
- roble: warm golden honey oak.
- gris-claro: light neutral gray wood, visibly darker than the pure-white background.
- natural: pale blond natural raw oak, light warm beige without yellow-orange saturation.
- blanco: clean matte white-painted wood with subtle vertical grain and enough edge contrast against the pure-white background.

## Prompt families

### F1 — original-ratio ultra-tight base

The shared contract plus the exact 379:1024 source ratio and essentially zero padding. It requested the intact frame only 0–4 pixels from each edge, with a 12-pixel absolute maximum and no omitted geometry.

### F2 — white 0–2-pixel retry

The shared contract plus a 0–2-pixel white perimeter. This was rejected because pixels touched all four edges.

### F3 — white visible 5–7-pixel retry

The shared contract plus a continuous 5–7-pixel border. ImageGen instead produced 18–28 pixels and the result was rejected.

### F4 — white source-margin copy

The shared contract asked to reproduce Image 1's measured [2, 3, 4, 2] termination. The result still measured above 12 pixels on both sides and was rejected.

### F5 — white quantified fill retry

The shared contract specified approximately 97.5 percent subject width and near-full subject height. ImageGen changed the ratio to 887x1774 and left 63–64 side pixels, so the result was rejected.

### F6 — white exact near-edge thumbnail

The shared contract required copying Image 1's exact near-edge scale with an intact 2–4-pixel requested hairline and no broad margin. This produced the accepted white output at [10, 6, 11, 6] using the RGB<250 edge-sensitive threshold.

### F7 — positive bottom-hairline correction

The shared contract explicitly required a thin continuous white hairline on all four sides and 2–4 pixels below both complete lower post tips. It produced accepted wengue and nogal outputs. The roble result contained isolated dark corner pixels and was rejected unchanged.

### F8 — roble clean 4–6-pixel frame

The shared contract required pure-white corners and a continuous 4–6-pixel border with no shadow. ImageGen produced 13–19 pixels, so the untouched result was rejected.

### F9 — roble original-like bottom line

The shared contract used essentially zero padding and required 1–3 visible white pixels below the complete posts. The result retained a valid bottom line but touched the top edge and was rejected.

### F10 — roble strict positive hairline

The shared contract required an enormous virtually edge-to-edge door, at least one pure-white pixel on every complete edge, zero contact forbidden and 12 pixels maximum. This produced the accepted [10, 9, 10, 5] result.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | exec-dd70b5b8-afc5-4346-8343-d74d83d2beac | accepted |
| wengue | 1 | F1 | exec-9708fba0-f7cc-41a9-b48b-a8bededfc7fd | rejected — bottom edge contact |
| wengue | 2 | F7 | exec-4c723b32-0157-442a-8bc5-f4d4a0bba3bd | accepted |
| gris-oscuro | 1 | F1 | exec-5da23ce4-e48f-4cf9-ac39-69863c94f09d | accepted |
| antracita | 1 | F1 | exec-40e3e8c8-6536-4786-a284-95fd1d2be920 | accepted |
| nogal | 1 | F1 | exec-c78d6296-a40e-4cad-b1d5-7ba7742a545f | rejected — bottom edge contact |
| nogal | 2 | F7 | exec-6e24b0f2-efd4-4a9f-b1a8-185e3250ad46 | accepted |
| roble | 1 | F1 | exec-35300d08-3afe-4cdc-8370-ef9a6dbf0d27 | rejected — bottom edge contact |
| roble | 2 | F7 | exec-71a3cdd0-243e-4109-9e3e-1eff303027a6 | rejected — isolated dark corner pixels |
| roble | 3 | F8 | exec-476e0523-52ad-4e92-b35d-56bb4794c37c | rejected — padding above limit |
| roble | 4 | F9 | exec-a85b312f-aeed-4560-8951-f5824a200f99 | rejected — top edge contact |
| roble | 5 | F10 | exec-ced52b91-1226-4191-a0d8-32ae27a0a104 | accepted |
| gris-claro | 1 | F1 | exec-89cc1049-9ec6-4c25-ae1e-a3e503e237d0 | accepted |
| natural | 1 | F1 | exec-ba1705b3-a9fe-4520-9aef-c3e8a589709e | accepted |
| blanco | 1 | F1 | exec-ca30c05c-3518-48c8-9aae-4ac213f7cd22 | rejected — left padding above limit |
| blanco | 2 | F2 | exec-c1b8d6e6-bf12-4aa1-b8a0-6658fd0984b6 | rejected — four-edge contact |
| blanco | 3 | F3 | exec-4e6449e7-de5f-45e3-a5aa-3c0dad53e88a | rejected — broad padding |
| blanco | 4 | F4 | exec-68286aac-ac83-48ce-8dc1-ac4067225dfb | rejected — side padding above limit |
| blanco | 5 | F5 | exec-ece297f5-486e-4930-8a7a-48a0f76d9d10 | rejected — wrong aspect ratio and broad padding |
| blanco | 6 | F6 | exec-e4285ec3-4e6d-493b-8f2b-b8573466451d | accepted |

Totals: 20 independent built-in ImageGen calls, 9 accepted and 11 rejected.

## Minimal-margin result

The canonical original measures [2, 3, 4, 2] pixels at RGB<245. Every accepted output retains a positive continuous detected border: the accepted range is 4–12 pixels, with no zero-pixel exception. Native-detail inspection confirms the complete upper and lower post tips, frame silhouette, fine leaf outline, right flute cluster and hardware in all nine assets.

For blanco, RGB<245 can under-detect the nearly white frame. RGB<250 reports [10, 6, 11, 6] pixels and matches the visible silhouette confirmed natively.

No file under public was touched. No accepted or rejected PNG was processed after generation.
