# MADERAACÚSTICA / wl-s206 — direct built-in ImageGen prompts

## Execution contract

- Mode: built-in ImageGen only.
- One independent call per finish or retry.
- Sole reference for all 18 calls: public/images/PUERTAS/MADERAACÚSTICA/wl-s206/original.webp.
- No generated candidate was used as a reference for a later call.
- NO_LOGO and no logo reference.
- No filter, recolor operation, mask, crop, resize, conversion, composite or post-generation pixel processing.
- Every selected or rejected PNG was copied from the generated-images store byte for byte.

## Canonical signature

Straight-on tall narrow door with complete slim squared casing, two full-height side posts, one top lintel, both bottom endpoints and a deep dark full-height reveal immediately inside the left casing. The leaf has narrow side stiles, solid top and bottom rails, exactly one middle rail and exactly two recessed rectangular molded panels: one very tall upper panel and one distinctly shorter lower panel. Both retain the source stepped raised bevels and rectangular corners. Hardware is exactly one dark circular rosette with one slim metal lever pointing right and one separate dark circular key escutcheon below. Source RGB<245 margins are 4/4/6/2.

## F1 — first-call prompt

    Use only the referenced original image as the sole structural and composition reference. Generate a completely new photorealistic straight-on catalogue rendering of exactly the same complete door. Preserve the complete casing, dark left reveal, leaf rails and stiles, exactly two molded panels with the tall-upper/short-lower proportions, and exactly one lever/rosette plus one separate key escutcheon. Change only the opaque wood finish. No logo, text, extra hardware or structural redesign. Pure white background. Keep the complete silhouette uncut and aim for 0-5 pixels on every edge, with 6 pixels preferred maximum.

All nine F1 outputs preserved the model but exceeded the normal 12-pixel framing maximum, so all were rejected.

## F2 — mandatory near-contact retry

    Direct fresh AI edit using only original.webp. Preserve the exact wl-s206 casing, dark left reveal, rails, exactly two rectangular molded panels and original hardware. No logo or text. Change only the opaque finish. Mandatory framing correction: the outside left post must reach x=0, 1 or 2; the outside right post must reach width-1, width-2 or width-3; the top casing must reach y=0, 1 or 2; and the bottom endpoints must reach the last three rows. Virtually no surrounding white border. Keep every casing edge and corner fully visible: contact is not cropping. No detached border line or edge shadow.

## Finish clauses

- negro: deep neutral black-stained wood with subtle grain.
- wengue: very dark chocolate espresso wenge with fine linear grain.
- gris-oscuro: deep cool graphite-gray wood, visibly gray rather than black.
- antracita: near-black anthracite graphite with subtle cool grain.
- nogal: authentic medium-dark walnut brown with restrained walnut grain.
- roble: light-to-medium honey oak with authentic open grain.
- gris-claro: light cool gray wood, distinct from pure white.
- natural: pale natural unfinished blond oak/beech wood.
- blanco: clean opaque white paint with subtle grain and restrained bevel definition.

## Call and result map

| Call | Finish | Attempt | Built-in ImageGen ID | Result | Margins L/T/R/B |
| --- | --- | ---: | --- | --- | --- |
| 1 | negro | 1 | exec-f5910c9b-7266-4eca-a274-28850e07ab4a | rejected: maximum margin 16 | 16/12/16/7 |
| 2 | wengue | 1 | exec-174ee34d-4ca4-410c-9635-07be3aee0dd2 | rejected: maximum margin 18 | 18/9/14/6 |
| 3 | gris-oscuro | 1 | exec-9d3d121a-a720-4d60-95d4-29ca10276767 | rejected: maximum margin 15 | 15/9/15/9 |
| 4 | antracita | 1 | exec-9c0d912c-9e57-4a5a-8997-24e6f32dc0a1 | rejected: maximum margin 16 | 16/6/16/5 |
| 5 | nogal | 1 | exec-9ff47606-cfe9-48eb-aa23-013bc36b82ec | rejected: maximum margin 13 | 11/8/13/7 |
| 6 | roble | 1 | exec-8aa1bbbb-694a-4deb-b37a-45e2a26e4936 | rejected: maximum margin 28 | 25/15/28/13 |
| 7 | gris-claro | 1 | exec-1eced570-c901-4a39-ac39-960baae31196 | rejected: maximum margin 14 | 12/9/14/3 |
| 8 | natural | 1 | exec-321caa4a-37ab-4412-88ba-b1daa683049f | rejected: maximum margin 16 | 13/9/16/6 |
| 9 | blanco | 1 | exec-330bf1da-66b1-4bef-9bbe-3be5e5ebe23d | rejected: maximum margin 17 | 14/10/17/5 |
| 10 | negro | 2 | exec-42c6fe8c-03e6-42ea-9093-2c9f3891f0e1 | accepted | 0/0/0/0 |
| 11 | wengue | 2 | exec-1fd34112-00fb-4495-be9f-6e91980d07cc | accepted | 0/0/0/0 |
| 12 | gris-oscuro | 2 | exec-08c7693c-8780-4f95-9fa7-c0ceebb97b11 | accepted | 0/0/0/0 |
| 13 | antracita | 2 | exec-7fc0093d-0fa0-49d2-9f4d-aef00f801594 | accepted | 0/2/2/0 |
| 14 | nogal | 2 | exec-88599885-3e6e-4391-baa1-0e9b9116c530 | accepted | 8/6/9/0 |
| 15 | roble | 2 | exec-02c016b8-0390-4a98-8533-4175053614bc | accepted | 0/0/0/0 |
| 16 | gris-claro | 2 | exec-73b0d586-a495-4327-bff7-b0b7f107b19f | accepted | 0/3/0/0 |
| 17 | natural | 2 | exec-965b8cc8-c068-4124-a5ef-548772d1ee9b | accepted | 0/0/0/0 |
| 18 | blanco | 2 | exec-ac55998c-6e25-46f1-8f28-35ede5bddd6f | accepted | 8/7/10/1 |

## Final QA

All nine selected PNGs passed native visual inspection for the complete casing, exact two-panel geometry, original hardware and NO_LOGO. The nine first attempts remain under _rejected. All 18 PNGs are byte-identical to their generator files. The canonical original remained unchanged.
