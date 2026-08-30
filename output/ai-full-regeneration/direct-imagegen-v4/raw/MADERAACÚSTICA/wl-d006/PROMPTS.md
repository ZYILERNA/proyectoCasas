# ImageGen prompt log — MADERAACÚSTICA / wl-d006

- Mode: built-in ImageGen.
- Use case: precise-object-edit.
- Sole reference in every call: `public/images/PUERTAS/MADERAACÚSTICA/wl-d006/original.webp`.
- Reference SHA-256: `c2571e6b241d623669570cfde14206a6d87be833497a036b5f9c0468ce711f1c`.
- Policy: NO_LOGO.
- Every call was independent. No generated output was supplied as a reference.
- No postprocessing was performed. Workspace PNGs are byte-identical copies of the ImageGen artifacts.
- All finishes passed on attempt 1; there were no rejected attempts.

## Provenance

| Finish | Attempt | Result | Generator ID | UTC | Workspace file |
|---|---:|---|---|---|---|
| negro | 1 | PASS | exec-889843be-e909-4666-84b5-62695d6487b0 | 2026-08-18T10:18:35.626Z | negro.png |
| wengue | 1 | PASS | exec-f5af7a57-2c80-41bd-a91a-b7bf6d988652 | 2026-08-18T10:19:45.739Z | wengue.png |
| gris-oscuro | 1 | PASS | exec-3e639144-5d94-4ecc-8708-21fe261e45d9 | 2026-08-18T10:20:29.139Z | gris-oscuro.png |
| antracita | 1 | PASS | exec-79b8dfbc-de3e-4df5-a3f8-7e11aff5e680 | 2026-08-18T10:21:17.993Z | antracita.png |
| nogal | 1 | PASS | exec-d23b2e33-b583-4a18-aeda-afc2d48a4236 | 2026-08-18T10:22:04.596Z | nogal.png |
| roble | 1 | PASS | exec-1ac7f655-281d-45bb-a9ee-d848aec5f192 | 2026-08-18T10:22:49.112Z | roble.png |
| gris-claro | 1 | PASS | exec-e7c6a078-da84-44e6-ad00-7fb17d8f7ccf | 2026-08-18T10:23:48.706Z | gris-claro.png |
| natural | 1 | PASS | exec-282f9590-b94c-440c-ac11-740679ce7f66 | 2026-08-18T10:24:39.129Z | natural.png |
| blanco | 1 | PASS | exec-7ff816c1-ba55-4dac-a331-58d6e8fef55a | 2026-08-18T10:25:41.559Z | blanco.png |

## Negro — attempt 1 — PASS

    Use case: precise-object-edit
    Input images: Image 1 is the sole authoritative reference for the door model.
    Primary request: Create a new photorealistic commercial product image of exactly the same door model, changing only the wooden door-leaf finish to NEGRO: a very dark near-black matte stained wood with restrained natural vertical grain.
    Architecture to preserve exactly from Image 1: the plain flush slab; the complete deep-black rectangular frame and its top bevels; exactly one thin straight horizontal metallic inlay across the slab at handle height; the dark curved lever handle, rounded vertical escutcheon and key detail on the left; every proportion, edge, spacing, alignment and hardware position.
    Composition/framing: straight-on orthographic-looking front view; reproduce the source's extremely tall, narrow portrait canvas and width-to-height ratio of 406:1093 (about 0.37145); show the complete frame nearly edge-to-edge with only the same very narrow white background margins and bottom sliver; do not make a square, standard portrait, wide, cropped or zoomed composition.
    Lighting/style: clean neutral studio product photography, realistic material response, subtle even light, crisp edges.
    Constraints: Image 1 is the only reference. Keep the frame and hardware dark, and keep the single inlay metallic. Do not add, remove, duplicate or move any groove, panel, molding, inlay or hardware. No room scene, floor, wall, props, people or shadows beyond the reference presentation. Absolutely no logo, brand mark, badge, words, letters, numbers, pseudotext, icons, decals, signature or watermark anywhere.

## Exact prompt composition for wengue through natural

The calls for wengue, gris-oscuro, antracita, nogal, roble, gris-claro and natural used the following exact template. Replace only `PRIMARY_REQUEST` with the verbatim line from the substitution table; no other text changes were made.

    Use case: precise-object-edit
    Input images: Image 1 is the sole authoritative reference for the door model.
    PRIMARY_REQUEST
    Architecture to preserve exactly from Image 1: the plain flush slab; the complete deep-black rectangular frame and its top bevels; exactly one thin straight horizontal metallic inlay across the slab at handle height; the original left-side hardware—a compact dark curved lever on its round rose, with the small vertically elongated dark escutcheon and tiny key detail directly below it—at the identical position and scale; every proportion, edge, spacing and alignment.
    Composition/framing: straight-on orthographic-looking front view; reproduce the source's extremely tall, narrow portrait canvas and width-to-height ratio of 406:1093 (about 0.37145); show the complete frame nearly edge-to-edge with only the same very narrow white background margins and bottom sliver; do not make a square, standard portrait, wide, cropped or zoomed composition.
    Lighting/style: clean neutral studio product photography, realistic material response, subtle even light, crisp edges.
    Constraints: Image 1 is the only reference. Keep the frame and hardware dark, and keep the single inlay metallic. Do not add, remove, duplicate or move any groove, panel, molding, inlay or hardware. No room scene, floor, wall, props, people or shadows beyond the reference presentation. Absolutely no logo, brand mark, badge, words, letters, numbers, pseudotext, icons, decals, signature or watermark anywhere.

### Template substitutions

Wengue:

    PRIMARY_REQUEST = Primary request: Create a new photorealistic commercial product image of exactly the same door model, changing only the wooden door-leaf finish to WENGUÉ: deep espresso-brown wenge wood, very dark but visibly brown, with fine straight vertical grain and low-sheen matte finish.

Gris oscuro:

    PRIMARY_REQUEST = Primary request: Create a new photorealistic commercial product image of exactly the same door model, changing only the wooden door-leaf finish to GRIS OSCURO: a dark charcoal-gray stained wood with clearly visible fine vertical grain, neutral-cool undertone and matte low-sheen surface, distinct from pure black.

Antracita:

    PRIMARY_REQUEST = Primary request: Create a new photorealistic commercial product image of exactly the same door model, changing only the wooden door-leaf finish to ANTRACITA: sophisticated deep anthracite gray wood, a cool graphite tone between dark gray and black, with subtle fine vertical grain and a smooth matte architectural finish.

Nogal:

    PRIMARY_REQUEST = Primary request: Create a new photorealistic commercial product image of exactly the same door model, changing only the wooden door-leaf finish to NOGAL: refined medium-to-dark walnut wood in warm chocolate and chestnut-brown tones, with elegant natural vertical walnut grain, moderate contrast and a satin-matte surface.

Roble:

    PRIMARY_REQUEST = Primary request: Create a new photorealistic commercial product image of exactly the same door model, changing only the wooden door-leaf finish to ROBLE: natural light-to-medium oak in warm honey and soft golden-brown tones, with authentic open vertical oak grain and a refined matte surface.

Gris claro:

    PRIMARY_REQUEST = Primary request: Create a new photorealistic commercial product image of exactly the same door model, changing only the wooden door-leaf finish to GRIS CLARO: a clean light neutral-gray wood finish with delicate visible vertical grain, slightly cool undertone and soft matte surface.

Natural:

    PRIMARY_REQUEST = Primary request: Create a new photorealistic commercial product image of exactly the same door model, changing only the wooden door-leaf finish to NATURAL: very light untreated-looking blond wood in calm beige, sand and pale straw tones, with subtle continuous vertical grain, minimal color contrast and a soft raw-matte appearance; it must remain recognizably real wood and be lighter and less golden than ROBLE.

## Blanco — attempt 1 — PASS

    Use case: precise-object-edit
    Input images: Image 1 is the sole authoritative reference for the door model.
    Primary request: Create a new photorealistic commercial product image of exactly the same door model, changing only the wooden door-leaf finish to BLANCO: an opaque clean warm-white painted wood finish with extremely subtle vertical grain still visible, soft matte low-sheen surface and no gray cast.
    Architecture to preserve exactly from Image 1: the plain flush slab; the complete deep-black rectangular frame and its top bevels; exactly one thin straight horizontal metallic inlay across the slab at handle height; the original left-side hardware—a compact dark curved lever on its round rose, with the small vertically elongated dark escutcheon and tiny key detail directly below it—at the identical position and scale; every proportion, edge, spacing and alignment.
    Composition/framing: straight-on orthographic-looking front view; reproduce the source's extremely tall, narrow portrait canvas and width-to-height ratio of 406:1093 (about 0.37145); show the complete frame nearly edge-to-edge with only the same very narrow white background margins and bottom sliver; do not make a square, standard portrait, wide, cropped or zoomed composition.
    Lighting/style: clean neutral studio product photography, realistic material response, subtle even light, crisp edges.
    Constraints: Image 1 is the only reference. Keep the frame and hardware dark, and keep the single inlay metallic so all three remain clearly visible against the white slab. Do not add, remove, duplicate or move any groove, panel, molding, inlay or hardware. No room scene, floor, wall, props, people or shadows beyond the reference presentation. Absolutely no logo, brand mark, badge, words, letters, numbers, pseudotext, icons, decals, signature or watermark anywhere.
