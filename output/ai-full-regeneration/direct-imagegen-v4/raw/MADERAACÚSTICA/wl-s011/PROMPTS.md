# MADERAACÚSTICA/wl-s011 — direct built-in ImageGen prompt audit

Eleven independent built-in ImageGen calls produced nine accepted PNGs and two preserved framing rejects. Every call used only `public/images/PUERTAS/MADERAACÚSTICA/wl-s011/original.webp` (SHA-256 `a54ae017077da0942fd3ef4ea6b192a25270a9815571749f91a425e5dad4bb2c`).

No generated output, logo image or other reference was used. No filter, scripted recolor, mask, crop, resize, composite, conversion or other pixel processing was applied. Every accepted and rejected workspace PNG is byte-for-byte identical to its direct ImageGen output.

## Shared invariant prompt

> Precise finish-only AI regeneration from Image 1, the sole reference and canonical geometry source. Preserve the exact wl-s011 product: 394:1069 tall ratio and front orthographic view; one plain unpanelled vertically grained leaf; complete slim squared casing with far-left post, straight top rail and right post; one deep black recessed full-height vertical channel between the left post and leaf; one narrow dark inner vertical edge beside that channel; exactly one small dark straight horizontal lever on a round rosette inside the channel; exactly one separate small dark round key escutcheon below. Preserve every dimension, depth, gap, bevel, edge and hardware position. No extra panel, groove, line, channel, hardware, hinge, trim, glass, decoration, logo, text, badge, brand, watermark, architecture, room, wall, floor, prop, perspective, cast shadow, halo or vignette. Pure uniform white background. NO_LOGO. Direct AI generation only, not a filter.

## Framing clause

> Match the canonical original's `[3,0,2,0]` perimeter and fill the canvas. Keep the intact assembly as large as possible, targeting 0–6 pixels and never more than 12 pixels from any edge. Complete top and bottom tips may meet the final rows as Image 1 does, without cutting real casing geometry.

The second `antracita` and `natural` calls strengthened the clause after their first results measured a 13-pixel left margin. The rejected direct results were preserved unchanged.

## Finish calls

| Finish | Built-in ImageGen ID | Result |
|---|---|---|
| negro | `exec-9e5cabac-c336-4dce-84f6-05daa591a6d0` | accepted first call |
| wengue | `exec-0c91822f-301a-4d4b-8bba-d6a5130a23ad` | accepted first call |
| gris-oscuro | `exec-699a8bdb-4144-4340-b984-84af9d794ab5` | accepted first call |
| antracita | `exec-c3c49e3d-73b5-4662-91ca-2874a68c925d` | rejected: 13-pixel left margin |
| antracita | `exec-0f398b41-e7a4-44e8-8ab8-4f4f2c7f6eec` | accepted second call |
| nogal | `exec-97868f3a-f164-4eca-bfef-3ccb367949b1` | accepted first call |
| roble | `exec-aa091b5d-acc9-4ef0-843a-b76a67ac35be` | accepted first call |
| gris-claro | `exec-6fbb735e-0802-4879-b3d3-f833ce4d5058` | accepted first call |
| natural | `exec-c6309714-4ceb-4bbf-be79-92049f3246f6` | rejected: 13-pixel left margin |
| natural | `exec-0c81f703-54fd-472c-be7b-2e64134cf208` | accepted second call |
| blanco | `exec-9e7ea844-810a-49de-90b4-a9e3a7d0ab39` | accepted first call |

Native-detail inspection confirmed complete silhouettes in all nine accepted files, including the intentional edge contact inherited from the original. No file under `public/` was changed and no promotion, conversion, commit or push occurred.
