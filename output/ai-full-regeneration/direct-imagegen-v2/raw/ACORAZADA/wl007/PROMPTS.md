# ACORAZADA/wl007 — built-in ImageGen prompt record

## Execution invariants

- Generator: built-in ImageGen only.
- Every attempt was a separate generation call.
- The only referenced image in every call was `output/ai-full-regeneration/masters/ACORAZADA/wl007/master-no-logo-ai-tight.png`.
- No generated output was used as a reference.
- No logo reference was supplied because canonical policy is `NO_LOGO`.
- No filter, recolor operation, mask, crop, resize, composite or other pixel transformation was applied.

## Shared prompt specification

```text
Use case: product-mockup.
Asset type: premium WL007 security-door catalogue image.
Use the supplied WL007 master as the sole exact architecture and hardware reference.
Generate a fresh independent AI render in the requested finish.
Composition: perfectly straight-on orthographic front view. Keep the complete rectangular outer frame visible on all four sides, enlarged to fill more than 98% of the canvas; target 0–8 px of pure-white background and never crop any frame edge, corner or hinge.
Preserve exactly: broad outer frame; large flat door face; one vertical brushed-silver strip slightly left of centre, running from the upper door edge to the top of the lower plinth; one tall plain black rectangular lock body on that strip with one simple horizontal black lever; one small round peephole on the right panel; divided rectangular lower plinth; exactly four exposed silver hinges on the far left and exactly four on the far right at reference heights.
Background: pure featureless white only. No room, wall, floor, scenery, shadow, perspective or open door.
Strict NO_LOGO: no brand, logo, wordmark, badge, crest, wing, chevron, hand, wireless mark, icon, decorative emblem, letters, numbers, digits, labels, UI glyphs, watermark, signature or pseudotext. The lock face is completely blank except for its simple lever.
Avoid extra or missing panels, handles, hinges or hardware; avoid duplicated geometry, distortion and cropping.
```

## Finish modifiers and calls

| Finish | Finish instruction | Attempts | Accepted ImageGen call | Result |
|---|---|---:|---|---|
| original | Original light natural oak, subtle realistic grain. | 1 | `exec-10017bc6-2578-4269-ac3b-265e4878a4a7` | PASS |
| negro | Deep matte black wood with subtle grain. | 1 | `exec-a3e2dccd-f7fb-4d6b-af44-83a69acac7c4` | PASS |
| wengue | Very dark chocolate-brown wenge, fine linear grain, not black. Attempt 2 added a strict 2–5 px perimeter correction. | 2 | `exec-e02ee9a3-59f4-44ae-90b3-b6efa6b4f18f` | PASS |
| gris-oscuro | Dark graphite-grey wood, subtle grain, visibly grey. Attempt 2 added a strict 2–5 px perimeter correction. | 2 | `exec-d96accc7-e598-4721-9803-24380c06c670` | PASS |
| antracita | Cool anthracite charcoal-grey wood, darker than graphite. Attempt 2 added a strict 2–6 px perimeter correction. | 2 | `exec-ee5b316e-81b6-44ba-b5a7-58189310e4c8` | PASS |
| nogal | Warm medium-dark walnut with elegant realistic grain. Attempt 2 added a strict 2–5 px perimeter correction. | 2 | `exec-b3263720-eef0-4fe5-a0fd-7587c0a54354` | PASS |
| roble | Warm classic honey-brown oak with realistic grain. Attempt 2 added a strict 2–5 px perimeter correction. | 2 | `exec-835560eb-9145-4147-ba03-ab8720d63017` | PASS |
| gris-claro | Refined light neutral-grey wood, clearly distinct from white. The recovery call required a complete uncropped frame filling more than 98.5% of both axes with a 2–5 px pure-white perimeter. | 3 total (1 new after audit) | `exec-3b04f01d-e1a8-4579-9686-baaaeaa6e375` | PASS |
| natural | Very pale raw natural timber, warm beige-blond, lighter and less golden than oak. | 1 | `exec-11635112-5a87-4cf9-b354-12ee86292aea` | PASS |
| blanco | Warm off-white painted wood with faint grain and grey edge definition against pure-white background. | 1 | `exec-c4a2d9d4-a425-4eb0-8201-8ef3279c054f` | PASS |

The second-attempt framing correction used this additional instruction:

```text
Critical framing correction: scale the entire complete door/frame until it covers at least 98.5% of canvas width and height. Keep only a 2–5 px pure-white perimeter (8 px absolute maximum), retain every outer frame edge and corner fully visible, and do not crop.
```

## Gris-claro recovery call

The only new generation required after the 9-file audit was a fresh independent `gris-claro` render. It referenced only the canonical master and used this finish/framing instruction:

```text
Generate a fresh independent AI render of this exact WL007 door in a refined light neutral-grey wood finish, clearly light grey rather than white, with subtle realistic vertical wood grain. Preserve the full reference architecture and all hardware exactly. Enlarge the complete uncropped door/frame to fill more than 98.5% of canvas width and height, leaving only a uniform 2–5 px pure-white perimeter and never more than 8 px. Strict NO_LOGO: no text, logo, badge, icon, symbol, watermark or pseudotext anywhere; keep the black lock face completely blank except for its simple lever.
```
