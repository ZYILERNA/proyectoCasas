# MADERAACÚSTICA / wl-s103b — direct built-in ImageGen prompts

## Execution contract

- Mode: built-in ImageGen only.
- One independent call per finish or retry.
- Sole reference for all 15 calls: public/images/PUERTAS/MADERAACÚSTICA/wl-s103b/original.webp.
- No generated candidate was used as a reference for a later call.
- NO_LOGO: no logo reference, logo, brand, text, badge, watermark or pseudotext.
- No filter, recolor operation, mask, crop, resize, conversion, composite or post-generation pixel processing.
- Every selected or rejected PNG was copied from the generated-images store byte for byte.

## Canonical signature locked from native inspection

Very tall straight frontal door with a complete slim squared outer casing: two posts, one top lintel and both bottom endpoints. A deep dark full-height reveal sits immediately inside the left casing. The leaf has narrow left and right vertical stiles, one solid top rail, one solid bottom rail, exactly one continuous slim central vertical wooden mullion and exactly four slim horizontal wooden muntins. Those members produce exactly ten rough pebbled translucent silver-gray glass panes in a strict two-column by five-row grid. Every pane keeps its narrow bevel and does not adopt the wood finish. Hardware is exactly one small dark circular rosette with one slim straight metallic lever pointing right and one separate dark round key escutcheon below, at the source position crossing the muntin between rows three and four. The canonical source is already tightly framed: RGB<245 margins are 4/1/5/0 and RGB<250 margins are 0/0/1/0.

## F1 — shared first-call prompt

    Edit only the referenced original product image. Create a new photorealistic catalogue cutout on a pure white background. Preserve the exact original door model and proportions: one very tall straight frontal door; the complete slim squared outer casing with both side posts, top lintel and both bottom endpoints; the deep dark full-height reveal immediately inside the left casing; narrow left and right leaf stiles; solid wood top and bottom rails; exactly one continuous slim central vertical wooden mullion; exactly four slim horizontal wooden muntins; and exactly ten textured frosted silver-gray glass panes arranged strictly as two columns by five rows. Do not add, remove, merge, split, resize, recolor or rearrange panes or grid members. Preserve the rough pebbled translucent silver-gray texture and narrow bevel of every pane; glass must not adopt the wood finish. Preserve exactly one small dark circular handle rosette with one slim straight metallic lever pointing right, plus exactly one separate dark round key escutcheon below, at the same reference position crossing the muntin between rows three and four. No hinges. No logo, badge, brand, label, watermark, letters, numbers, symbols or decorative text. Change only the opaque wooden door and casing finish as requested. Keep the entire silhouette visible and uncropped. Make the door as large as physically possible in the canvas: target roughly 5–9 pixels laterally, 0–4 pixels at the top and 0–3 pixels at the bottom. The source already touches or nearly touches the bottom, so bottom contact is allowed only while both bottom endpoints remain fully visible. Do not create a detached border line or shadow at any canvas edge. Straight centered orthographic front view; pure white, no floor, no wall, no room and no cast shadow.

Finish clauses appended independently to F1:

- negro: deep neutral black-stained wood with restrained natural grain still visible.
- wengue: very dark chocolate espresso wenge wood with fine realistic linear grain and subtle warm undertones.
- gris-oscuro: deep dark graphite gray, clearly gray rather than black, with restrained natural wood grain.
- antracita: near-black anthracite graphite stained wood with subtle cool grain and realistic relief.
- nogal: authentic medium-dark walnut brown with restrained natural walnut grain.
- roble: light-to-medium honey oak with authentic open grain and restrained golden warmth.
- gris-claro: light cool gray stained wood, distinct from the pure-white background, with subtle visible grain.
- natural: pale natural unfinished blond wood with delicate authentic grain and a matte surface.
- blanco: clean opaque white painted wood with subtle realistic grain and restrained edge definition.

## F2 — first tight-framing retry

Used independently for gris-oscuro attempt 2, nogal attempt 2 and blanco attempt 2, always with original.webp as the only reference:

    Direct fresh AI edit from the referenced original. Preserve the exact ten-pane two-by-five geometry, casing, dark left reveal, rails, muntins, textured silver-gray glass and original hardware. No logo or text. Change only the opaque wood finish. Pure white background. Enlarge the intact complete door so the outside casing sits approximately 2–5 pixels from the left and right canvas edges, 0–3 pixels from the top and 0–2 pixels from the bottom. Bottom contact is allowed because it is canonical, but both bottom endpoints and every casing corner must remain fully visible. Do not create a detached edge line, floor, wall or cast shadow.

All three F2 outputs remained above the normal 12-pixel maximum and were rejected.

## F3 — mandatory near-contact retry

Used independently for gris-oscuro attempt 3, nogal attempt 3 and blanco attempt 3, always with original.webp as the only reference:

    Direct AI edit from only the referenced original product image. Preserve the exact original wl-s103b design without simplification: complete squared casing, deep dark full-height left reveal, solid top and bottom rails, narrow stiles, exactly one central vertical mullion and exactly four horizontal muntins producing exactly ten frosted textured silver-gray panes in a strict two-column by five-row grid. Preserve every pane's rough pebbled texture and bevel; glass stays silver-gray. Preserve exactly one dark circular rosette with one slim straight metal lever pointing right and exactly one separate dark circular key escutcheon below, at the source location. No other hardware. No logo, text, label, symbol, badge, watermark or branding. Pure white background only. Exact straight frontal catalogue view and source proportions. Critical framing instruction: enlarge the complete door until the outer casing is only 0–2 pixels from both left and right canvas edges and 0–2 pixels from the top and bottom. There must be virtually no white border. All four casing corners, both side posts and both bottom endpoints must nevertheless remain fully visible and uncut. Do not add a border, detached line, cast shadow, floor or wall. Change only the opaque wood finish.

F3 finish clauses:

- gris-oscuro: deep graphite gray, visibly gray rather than black, with subtle realistic grain.
- nogal: authentic medium-dark walnut brown with restrained natural walnut grain.
- blanco: clean opaque white paint with subtle realistic wood grain and enough natural edge definition to distinguish the complete casing from the pure-white background.

## Call and result map

| Call | Finish | Attempt | Built-in ImageGen ID | Result | Measured margins L/T/R/B |
| --- | --- | ---: | --- | --- | --- |
| 1 | negro | 1 | exec-fdff6b70-e142-41b4-94e5-266e3f5bf57d | accepted | 9/5/9/0 |
| 2 | wengue | 1 | exec-5b96d9e9-07ae-43db-879e-9112fde26d3d | accepted | 9/3/10/0 |
| 3 | gris-oscuro | 1 | exec-26c18237-b835-4fc5-90a5-ee9d7af81a40 | rejected: right margin 15 | 11/5/15/0 |
| 4 | antracita | 1 | exec-e0e93ec4-1bf2-4ed0-8d33-ac8b6f30aeef | accepted | 10/4/11/0 |
| 5 | nogal | 1 | exec-ea367ec4-e243-4f6d-8a6f-857af457c0d7 | rejected: right margin 13 | 10/6/13/0 |
| 6 | roble | 1 | exec-1ba124a5-2cd2-4327-a2e5-0c68f1fbbd61 | accepted | 10/4/11/0 |
| 7 | gris-claro | 1 | exec-5149a9bf-1362-4b7d-8ca8-136dd4b6d088 | accepted | 10/6/10/1 |
| 8 | natural | 1 | exec-dc45b967-b6c-4f22-9534-40fa14724dda | accepted | 11/5/12/0 |
| 9 | blanco | 1 | exec-7f580a0c-ee5f-4311-aab9-01cedaff77cd | rejected: right margin 15 | 11/4/15/5 |
| 10 | gris-oscuro | 2 | exec-e1d27821-04e1-45f7-87b3-7bfbe5a9ada3 | rejected: retry maximum 17 | 16/7/17/5 |
| 11 | nogal | 2 | exec-203f4467-2ce5-4639-8363-69bec9ed2e74 | rejected: retry maximum 17 | 17/7/16/17 |
| 12 | blanco | 2 | exec-08c1e29f-c8d0-4383-b25d-c5c981fb2160 | rejected: retry maximum 18 | 18/7/16/6 |
| 13 | gris-oscuro | 3 | exec-61b6a8a5-5590-4cc3-866e-fcb2bae9cd22 | accepted: canonical contact, native silhouette complete | 0/0/0/0 |
| 14 | nogal | 3 | exec-8797bfec-ab00-4e71-996f-543311675dde | accepted | 6/4/6/0 |
| 15 | blanco | 3 | exec-cbb426d1-eb04-46c3-bfd2-3e51be4da713 | accepted: canonical right/bottom contact, native silhouette complete | 8/3/0/0 |

## Final QA

All nine selected PNGs passed native visual inspection for the complete casing, dark left reveal, exact two-by-five grid of ten textured panes, original rails and muntins, one lever/rosette, one separate key escutcheon and NO_LOGO. The six rejected PNGs remain under _rejected. All selected and rejected PNGs are byte-identical to their generator files. The canonical original remained unchanged.
