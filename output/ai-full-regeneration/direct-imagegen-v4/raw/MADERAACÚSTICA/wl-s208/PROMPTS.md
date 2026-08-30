# MADERAACÚSTICA / wl-s208 — direct built-in ImageGen prompts

## Execution contract

- Mode: built-in ImageGen only.
- One independent call per finish or retry.
- Sole reference for all 12 calls: public/images/PUERTAS/MADERAACÚSTICA/wl-s208/original.webp.
- No generated candidate was used as a reference for a later call.
- NO_LOGO; no filter, recolor, mask, crop, resize, conversion, composite or pixel processing.
- Every selected or rejected PNG is a byte-for-byte copy of its generator file.

## Canonical signature

Complete tall narrow casing touching all four edges, dark full-height left reveal, exact rails and exactly two molded panels: a very tall upper panel with one shallow arched top and a much shorter rectangular lower panel. Both casing posts continue below the leaf, leaving a narrow white opening underneath the leaf. Exactly one lever/rosette and one separate key escutcheon. Source margins: 0/0/0/0.

## F1 — shared prompt

    Use only original.webp. Generate the exact same wl-s208 door in the requested finish. Preserve the complete casing, dark left reveal, exact arched-upper and rectangular-lower two-panel geometry, stepped molding, original hardware and narrow white opening below the leaf. No logo or text. Pure white background. Reproduce canonical zero-margin contact on all four sides while retaining every edge and corner.

Finish clauses were the nine canonical finishes: negro, wengue, gris-oscuro, antracita, nogal, roble, gris-claro, natural and blanco.

## White retries

- Attempt 2 demanded zero side gutters; rejected because it changed the canvas/door aspect ratio by 25.815501 percent and lost bottom geometry.
- Attempt 3 restored the 396:1062 ratio and explicitly separated the bottom-touching casing posts from the leaf ending above; rejected because the left margin remained 13 pixels.
- Attempt 4 again fixed the 396:1062 ratio, exact panel/hardware geometry and canonical bottom structure, while requiring both painted outer posts at the canvas edges with attached bevel definition. It passed at 12/8/10/0.

## Call and result map

| Call | Finish | Attempt | ImageGen ID | Result | Margins L/T/R/B |
| --- | --- | ---: | --- | --- | --- |
| 1 | negro | 1 | exec-3cc689cd-51ee-4ee3-8714-8ca6a03c0cfe | accepted | 0/0/0/0 |
| 2 | wengue | 1 | exec-25e99d07-5bbb-493e-9843-cbe01910002e | accepted | 0/6/4/0 |
| 3 | gris-oscuro | 1 | exec-c241f717-7d4b-493d-aa8b-d6c8ecfc573c | accepted | 0/4/0/0 |
| 4 | antracita | 1 | exec-f3493c54-825d-482b-9fb0-26190ac171a7 | accepted | 6/0/5/0 |
| 5 | nogal | 1 | exec-11642265-87ba-4647-9084-5dcdedc72a41 | accepted | 0/0/0/0 |
| 6 | roble | 1 | exec-314a1750-ca0f-4913-b22c-1cc0e2f47fdc | accepted | 0/0/0/0 |
| 7 | gris-claro | 1 | exec-e8df6a27-5dd1-456e-8e6c-86b0264b0fef | accepted | 0/0/0/0 |
| 8 | natural | 1 | exec-198d3501-6da0-4e0f-ad1a-3c21c2b6447c | accepted | 0/0/0/0 |
| 9 | blanco | 1 | exec-0653e9b6-ca21-484f-b987-1bab19f9d38b | rejected: left margin 13 | 13/8/12/0 |
| 10 | blanco | 2 | exec-9fcc4097-c9ba-42e3-b126-62469e1a2a61 | rejected: aspect delta 25.815501 percent and bottom geometry loss | 2/3/0/0 |
| 11 | blanco | 3 | exec-f4504dc1-f167-468c-aa66-d449aeeae869 | rejected: left margin 13 | 13/2/11/0 |
| 12 | blanco | 4 | exec-c7f306bf-5f73-428f-a11c-3b2e36908e84 | accepted | 12/8/10/0 |

## Final QA

All nine selected PNGs passed native visual inspection. The three white rejects remain under _rejected. All 12 copies match their ImageGen source bytes, and original.webp remained unchanged.
