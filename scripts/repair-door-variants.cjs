const fs = require("node:fs");
const path = require("node:path");

const sharpModule = process.env.DOOR_VARIANT_SHARP || "sharp";
// The desktop runtime can provide Sharp through DOOR_VARIANT_SHARP when the
// project dependency is not linked into node_modules yet.
// eslint-disable-next-line import/no-dynamic-require, global-require
const sharp = require(sharpModule);

const ROOT = path.resolve("public/images/PUERTAS");
const FINISHES = Object.freeze([
  { slug: "negro", hex: "#171717" },
  { slug: "wengue", hex: "#4A2E1A" },
  { slug: "gris-oscuro", hex: "#36383A" },
  { slug: "antracita", hex: "#484A4B" },
  { slug: "nogal", hex: "#5C3524" },
  { slug: "roble", hex: "#A8784E" },
  { slug: "gris-claro", hex: "#A5A19A" },
  { slug: "natural", hex: "#C19A6B" },
  { slug: "blanco", hex: "#E8E5DE" },
]);
const MASK_REFERENCE_SLUGS = new Set([
  "negro", "gris-oscuro", "antracita", "gris-claro", "blanco",
]);
const FORCE_DARK_FRAME_CATEGORIES = new Set([
  "ACERO", "ACORAZADA", "AI", "ALUMINIO", "BAJOCARBONO", "COBRE",
  "CORTAFUEGO", "EVACUACION", "MADERAACÚSTICA", "MINIMALISTA", "PVC",
]);
const EXTEND_FRAME_HIGHLIGHT_CATEGORIES = new Set(["ACERO", "ACORAZADA", "AI", "ALUMINIO"]);
const EXISTING_PANEL_BASE_CATEGORIES = new Set(["MADERAACÚSTICA"]);

// A handful of legacy wood renders contain local geometry or ornament defects.
// Rebuilding only those finishes from the untouched source preserves the real
// grain while avoiding the damaged legacy pixels.
const MODEL_ORIGINAL_BASE_FINISHES = Object.freeze({
  "MADERAACÚSTICA/wl-5503": "*",
  "MADERAACÚSTICA/wl-d029": "*",
  "MADERAACÚSTICA/wl-d033": ["natural"],
  "MADERAACÚSTICA/wl-d036": "*",
  "MADERAACÚSTICA/wl-d038": "*",
  "MADERAACÚSTICA/wl-j008": "*",
  "MADERAACÚSTICA/wl-s015": "*",
  "MADERAACÚSTICA/wl-s019": "*",
});

const MODEL_FULL_FOREGROUND_ORIGINAL_BASE = new Set([
  "MADERAACÚSTICA/wl-d029",
  "MADERAACÚSTICA/wl-d033",
  "MADERAACÚSTICA/wl-d038",
  "MADERAACÚSTICA/wl-s015",
  "MADERAACÚSTICA/wl-s019",
]);

// These isolated variants received a native-resolution visual audit after the
// general render pass. Preserve those approved pixels verbatim on subsequent
// runs so a broad rebuild cannot reintroduce hardware halos or local geometry
// artifacts. Preview runs copy the canonical WebP byte-for-byte; overwrite runs
// intentionally leave the approved canonical file untouched.
const MODEL_AUDITED_VARIANTS = Object.freeze({
  "PVC/wl-p001": "*",
  "EVACUACION/gk-01": "*",
  "BAJOCARBONO/wl-dt08": "*",
  "MADERAAC\u00daSTICA/wl-d033": "*",
  "MADERAAC\u00daSTICA/wl-d036": ["blanco"],
});

function isAuditedVariant(modelKey, finishSlug) {
  const config = MODEL_AUDITED_VARIANTS[modelKey];
  return config === "*" || config?.includes(finishSlug);
}
const FORCE_BRIGHT_BACKGROUND_MODELS = new Set([
  "ACERO/n9518",
  "ACERO/n9519",
  "ACERO/nc9020",
  "ACERO/s118",
  "ACERO/s119",
  "ACERO/y119",
  "BAJOCARBONO/wl-dt103",
  "BAJOCARBONO/wl-dt107",
  "MADERAACÚSTICA/wl-d007",
  "MADERAACÚSTICA/wl-d020",
  "MADERAACÚSTICA/wl-d025",
  "MADERAACÚSTICA/wl-j002",
  "MEDICA/puerta-de-sala2",
  "MEDICA/puerta-de-sala4",
  "PVC/wl-p003",
]);
const MODEL_FRAME_PAINT_REGIONS = Object.freeze({
  "ACERO/cl72": [
    [0.92, 0.105, 0.99, 0.995],
    [0.665, 0.395, 0.9, 0.625],
  ],
  "ACERO/gl083": [[0.44, 0.078, 0.895, 0.089]],
  "ACERO/gl097": [[0.73, 0.078, 0.895, 0.104]],
  "ACERO/gl097-pro": [[0.062, 0.03, 0.105, 0.989]],
  "ACERO/gl098-pro": [[0.052, 0.03, 0.099, 0.989]],
  "ACERO/l5601": [[0.06, 0.03, 0.107, 0.989]],
  "ACERO/mid-night": [[0.05, 0.91, 0.087, 0.995]],
  "ACERO/p107": [[0.125, 0.46, 0.225, 0.652]],
  "ALUMINIO/heidelberg": [
    [0.006, 0.003, 0.084, 0.996],
    [0.908, 0.003, 0.994, 0.996],
    [0.006, 0.003, 0.994, 0.044],
  ],
  "ALUMINIO/dihua": [
    [0.034, 0.015, 0.105, 0.988],
    [0.897, 0.015, 0.97, 0.988],
    [0.034, 0.015, 0.97, 0.058],
  ],
  "ALUMINIO/saina": [
    [0.02, 0.016, 0.08, 0.985],
    [0.925, 0.016, 0.982, 0.985],
    [0.02, 0.016, 0.982, 0.043],
  ],
  "AI/x60-max": [
    [0.019, 0.004, 0.079, 0.997],
    [0.925, 0.004, 0.977, 0.997],
    [0.019, 0.004, 0.977, 0.041],
  ],
  "MADERAACÚSTICA/wl-d006": [
    [0.0074, 0.0027, 0.0616, 0.9973],
    [0.931, 0.0027, 0.9926, 0.9973],
    [0.0074, 0.0027, 0.9926, 0.0348],
  ],
});
const MODEL_MATERIAL_PAINT_REGIONS = Object.freeze({
  "ALUMINIO/chaopu": [
    [0.0587, 0.0115, 0.9433, 0.0528, 12],
    [0.1077, 0.0502, 0.8933, 0.1072, 12],
  ],
  "ALUMINIO/makailen": [[0.0813, 0.0472, 0.9187, 0.1029, 12]],
  "ACERO/cl38": [
    [0.04, 0.019, 0.114, 0.052, 12],
  ],
  "ACERO/cl50": [
    [0.11, 0.08, 0.127, 0.979, 12],
    [0.873, 0.08, 0.893, 0.979, 12],
  ],
  "ACERO/cl51": [
    [0.02, 0.01, 0.095, 0.085, 12],
    [0.105, 0.045, 0.895, 0.082, 12],
    [0.105, 0.072, 0.15, 0.985, 12],
    [0.835, 0.072, 0.895, 0.985, 12],
    [0.105, 0.968, 0.895, 0.993, 12],
  ],
  "ACERO/cl23": [
    [0.1048, 0.0578, 0.1391, 0.9895, 12],
    [0.8648, 0.0578, 0.9048, 0.9895, 12],
    [0.124, 0.059, 0.876, 0.072, 12],
  ],
  "ACERO/cl55": [
    [0.106, 0.066, 0.143, 0.991, 12],
    [0.847, 0.077, 0.893, 0.991, 12],
    [0.106, 0.066, 0.893, 0.079, 12],
    [0.106, 0.968, 0.893, 0.985, 12],
  ],
  "ACERO/l5601": [
    [0.139, 0.117, 0.284, 0.662, 0],
    [0.435, 0.117, 0.799, 0.662, 0],
    [0.139, 0.703, 0.284, 0.911, 0],
    [0.435, 0.703, 0.799, 0.911, 0],
  ],
  "ACERO/nc9020": [[0.035, 0.76, 0.075, 0.86, 12]],
  "MEDICA/puerta-de-sala4": [
    [0.055, 0.006, 0.945, 0.045, 0, 256],
    [0.012, 0.006, 0.065, 0.99, 0, 256],
    [0.94, 0.006, 0.985, 0.99, 0, 256],
  ],
  "MINIMALISTA/ume-114": [
    [0.1247, 0.0572, 0.2862, 0.9791, 12],
    [0.2803, 0.496, 0.367, 0.5907, 12],
  ],
  "PVC/wl-p001": [[0, 0.03, 0.06, 0.995, 0]],
  "PVC/wl-p003": [
    [0.058, 0, 1, 0.035, 0, 256],
    [0.058, 0.02, 0.14, 1, 0, 256],
    [0.93, 0, 1, 1, 0, 256],
  ],
  "PVC/wl-p005": [
    [0.046, 0.008, 0.998, 0.04, 0, 256],
    [0.046, 0.025, 0.15, 0.998, 0, 256],
    [0.93, 0.008, 0.998, 0.998, 0, 256],
  ],
  "PVC/wl-p007": [[0.105, 0.07, 0.14, 0.995, 0]],
  "PVC/wl-p009": [[0.105, 0.07, 0.135, 0.82, 0]],
  "PVC/wl-p010": [
    [0.125, 0.05, 0.145, 0.995, 0],
    [0.265, 0.101, 0.325, 0.109, 0],
    [0.23, 0.625, 0.8, 0.636, 0],
    [0.28, 0.69, 0.8, 0.7, 0],
    [0.27, 0.89, 0.8, 0.902, 0],
  ],
  "PVC/wl-p011": [
    [0.105, 0.2, 0.125, 0.83, 0],
    [0.755, 0.45, 0.78, 0.48, 0],
  ],
  "PVC/wl-p201": [
    [0, 0.38, 0.06, 0.75, 0],
    [0.765, 0.19, 0.785, 0.65, 0],
    [0.38, 0.64, 0.7, 0.655, 0],
    [0.765, 0.81, 0.785, 0.91, 0],
    [0.38, 0.902, 0.45, 0.912, 0],
  ],
});
const MODEL_PROTECT_REGIONS = Object.freeze({
  "ACERO/cj03": [
    [0.09, 0.1448, 0.1272, 0.2162],
    [0.09, 0.3557, 0.1272, 0.4271],
    [0.09, 0.5905, 0.1272, 0.6639],
    [0.09, 0.8232, 0.1272, 0.8956],
  ],
  "ACERO/cl36": [[0.662, 0.058, 0.755, 0.982]],
  "ACERO/cl38": [[0.246, 0.06, 0.304, 0.976]],
  "ACERO/cl39": [[0.2164, 0.0578, 0.3041, 0.1198]],
  "ACERO/cl55": [
    [0.143, 0.078, 0.24, 0.968],
    [0.743, 0.078, 0.847, 0.968],
  ],
  "ACERO/cl62": [[0.407, 0.064, 0.58, 0.978]],
  "ACERO/n9518": [
    [0, 0, 1, 0.0144], [0, 0, 0.0268, 1],
    [0.9742, 0, 1, 1], [0, 0.9918, 1, 1],
  ],
  "ACERO/n9519": [
    [0, 0, 1, 0.0159], [0, 0, 0.0313, 1],
    [0.9744, 0, 1, 1], [0, 0.9862, 1, 1],
  ],
  "ACERO/n9520": [
    [0.258, 0.048, 0.299, 0.09],
    [0, 0, 1, 0.0209], [0, 0, 0.0403, 1],
    [0.9677, 0, 1, 1], [0, 0.9807, 1, 1],
  ],
  "ACERO/nc9020": [[0.712, 0.048, 0.895, 0.086]],
  "ACERO/p108": [[0.263, 0.045, 0.352, 0.12]],
  "ACERO/s118": [
    [0, 0, 1, 0.0036], [0, 0, 0.0179, 1],
    [0.9792, 0, 1, 1], [0, 0.9898, 1, 1],
  ],
  "ACERO/s119": [
    [0.281, 0.04, 0.348, 0.977],
    [0, 0, 1, 0.0072], [0, 0, 0.0333, 1],
    [0.9683, 0, 1, 1], [0, 0.9897, 1, 1],
  ],
  "ACERO/y118": [
    [0.352, 0.052, 0.685, 0.10],
    [0, 0, 1, 0.0215], [0, 0, 0.0384, 1],
    [0.9688, 0, 1, 1], [0, 0.9772, 1, 1],
  ],
  "ACERO/y119": [
    [0, 0, 1, 0.013], [0, 0, 0.026, 1],
    [0.9771, 0, 1, 1], [0, 0.9894, 1, 1],
  ],
  "ACERO/cl51": [
    [0.0965, 0.1338, 0.13, 0.2055],
    [0.0965, 0.3435, 0.13, 0.4152],
    [0.0965, 0.8367, 0.13, 0.9105],
  ],
  "ACERO/cl63": [
    [0.0695, 0.1628, 0.1053, 0.2351],
    [0.0695, 0.3394, 0.1053, 0.4107],
    [0.0674, 0.833, 0.1053, 0.9053],
  ],
  "ACERO/cl65": [
    [0.0547, 0.1404, 0.0919, 0.2106],
    [0.0547, 0.3266, 0.0919, 0.3957],
    [0.0547, 0.8521, 0.0919, 0.9191],
  ],
  "ACERO/cl72": [
    [0.0576, 0.1311, 0.0975, 0.203],
    [0.0576, 0.3097, 0.0975, 0.3816],
    [0.0576, 0.8224, 0.0975, 0.8943],
  ],
  "ACERO/p101": [
    [0.9026, 0.1708, 0.9382, 0.2354],
    [0.9026, 0.301, 0.9382, 0.3666],
    [0.9026, 0.8375, 0.9382, 0.9042],
  ],
  "ACERO/y106": [[0.2583, 0.1895, 0.7468, 0.7233]],
  "ACERO/gf091": [[0.257, 0.045, 0.362, 0.972]],
  "ACERO/gl098-pro": [[0.325, 0.115, 0.502, 0.969]],
  "MADERAACÚSTICA/wl-d003": [
    [0.0488, 0.0265, 0.1619, 0.9991],
    [0.1486, 0.5377, 0.2483, 0.5445],
    [0.235, 0.5377, 0.2506, 0.6481],
    [0.1486, 0.6421, 0.2483, 0.649],
  ],
  "MADERAACÚSTICA/wl-d006": [
    [0.0616, 0.032, 0.1404, 0.9918],
    [0.2734, 0.5919, 0.9261, 0.5993],
  ],
  "MADERAACÚSTICA/wl-d010": [[0.0571, 0.0328, 0.226, 0.9934]],
  "MADERAACÚSTICA/wl-d012": [
    [0.1917, 0.0338, 0.2063, 0.5563],
    [0.2621, 0.6623, 0.2767, 0.9878],
  ],
  "MADERAACÚSTICA/wl-d015": [[0.0616, 0.033, 0.2044, 0.989]],
  "MADERAACÚSTICA/wl-d020": [
    [0.0665, 0.0321, 0.2044, 0.9918],
    [0.197, 0.5385, 0.3005, 0.6474],
  ],
  "MADERAACÚSTICA/wl-d023": [[0.0606, 0.0328, 0.1263, 0.9897]],
  "MADERAACÚSTICA/wl-d029": [
    [0.0597, 0.0329, 0.1244, 0.989],
    [0.2687, 0.0329, 0.2811, 0.5936],
    [0.1841, 0.6237, 0.1965, 0.989],
  ],
  "MADERAACÚSTICA/wl-d031": [[0.0667, 0.032, 0.2025, 0.989]],
  "MADERAACÚSTICA/wl-d036": [[0.125, 0.0329, 0.2057, 0.99]],
  "MADERAACÚSTICA/wl-d038": [[0.2025, 0.5901, 0.9284, 0.6221]],
  "MADERAACÚSTICA/wl-j001": [[0.0564, 0.0326, 0.1348, 0.9891]],
  "MADERAACÚSTICA/wl-j012": [
    [0.0617, 0.032, 0.2469, 0.989],
    [0.2963, 0.5837, 0.9284, 0.6011],
  ],
  "MADERAACÚSTICA/wl-s001": [[0.063, 0.0329, 0.1562, 0.9897]],
  "MADERAACÚSTICA/wl-s009": [[0.0504, 0.0289, 0.1234, 0.9957]],
  "MADERAACÚSTICA/wl-s011": [[0.0635, 0.0337, 0.2056, 0.9897]],
  "MADERAACÚSTICA/wl-s015": [
    [0.1411, 0.0368, 0.1814, 0.5113],
    [0.1411, 0.6566, 0.1814, 0.9906],
  ],
  "MADERAACÚSTICA/wl-s020": [
    [0.0596, 0.0337, 0.1464, 0.9897],
    [0.067, 0.667, 0.9256, 0.6941],
  ],
  "MADERAACÚSTICA/wl-s102b": [[0.205, 0.102, 0.795, 0.914]],
  "MADERAACÚSTICA/wl-s103b": [
    [0.205, 0.102, 0.795, 0.254],
    [0.205, 0.268, 0.795, 0.419],
    [0.205, 0.432, 0.795, 0.581],
    [0.205, 0.595, 0.795, 0.748],
    [0.205, 0.760, 0.795, 0.912],
  ],
  "EVACUACION/gk-01": [[0.095, 0.968, 0.91, 1]],
  "ACORAZADA/wl006": [[0.314, 0.048, 0.44, 0.997]],
  "ALUMINIO/castle": [
    [0.085, 0.532, 0.91, 0.592],
    [0.08, 0.026, 0.91, 0.099],
  ],
  "ALUMINIO/chaopu": [
    [0.061, 0.028, 0.942, 0.052],
    [0.1087, 0.5324, 0.8923, 0.59],
    [0.7846, 0.0748, 0.874, 0.0889],
  ],
  "ALUMINIO/dihua": [[0.115385, 0.058237, 0.8875, 0.103882]],
  "ALUMINIO/heidelberg": [[0.285, 0.083, 0.61, 0.975]],
  "ALUMINIO/louis": [
    [0.076923, 0.039801, 0.923077, 0.097512],
    [0.773176, 0.101493, 0.91716, 0.985075],
  ],
  "ALUMINIO/prada": [
    [0.085954, 0.038986, 0.909853, 0.082846],
    [0.085954, 0.090643, 0.205451, 0.979532],
  ],
  "ALUMINIO/wave": [
    [0.061111, 0.027593, 0.944444, 0.085633],
    [0.281481, 0.087536, 0.409259, 0.990485],
  ],
  "ALUMINIO/ruihe": [
    [0.3946, 0.0391, 0.4367, 0.428],
    [0.5646, 0.0391, 0.6095, 0.428],
    [0.3932, 0.7248, 0.4395, 0.9835],
    [0.5646, 0.7248, 0.6109, 0.9835],
  ],
  "ALUMINIO/makailen": [[0.7907, 0.0695, 0.8889, 0.0852]],
  "CORTAFUEGO/td-01": [
    [0.7217, 0, 0.8783, 0.0508],
    [0.9239, 0.0892, 0.9522, 0.1566],
    [0.9239, 0.3942, 0.9522, 0.4606],
    [0.9239, 0.8496, 0.9522, 0.917],
  ],
  "CORTAFUEGO/td-02": [
    [0.4967, 0.0062, 0.7539, 0.0867],
    [0.8514, 0.1146, 0.8825, 0.1816],
    [0.8514, 0.387, 0.8825, 0.4551],
    [0.8514, 0.8442, 0.8825, 0.9123],
  ],
  "CORTAFUEGO/td-03": [
    [0.4264, 0, 0.7167, 0.0765],
    [0.8653, 0.1034, 0.8958, 0.166],
    [0.8653, 0.3544, 0.8958, 0.4304],
    [0.8653, 0.8122, 0.8958, 0.8752],
  ],
  "PVC/wl-p003": [[0, 0, 0.058, 1]],
  "PVC/wl-p005": [
    [0, 0, 0.0465, 1], [0, 0, 1, 0.008],
    [0.9976, 0, 1, 1], [0, 0.9982, 1, 1],
  ],
  "AI/k300-max": [[0.326, 0.044, 0.425, 0.984]],
  "AI/k300-pro": [[0.327, 0.043, 0.553, 0.984]],
  "AI/l5857": [
    [0.098633, 0.052632, 0.901367, 0.102683],
    [0.318359, 0.104747, 0.431641, 0.971104],
  ],
  "AI/x60-pro": [
    [0.075741, 0.042874, 0.920966, 0.095017],
    [0.284303, 0.097914, 0.433589, 0.984936],
  ],
  "AI/x70-jinxiu": [[0.166, 0.05, 0.324, 0.991]],
  "AI/x50-max": [[0.464, 0.053, 0.536, 0.979]],
  "AI/x60-max": [
    [0.306, 0.038, 0.422, 0.985],
    [0.49, 0.018, 0.515, 0.032],
  ],
});

// Some complex ornaments are already cleanly isolated in two legacy solid
// catalog finishes. Pixels that stay stable between those finishes identify
// the original ornament without copying the differently colored panel behind it.
const MODEL_STABLE_REFERENCE_PROTECT = Object.freeze({
  "ACERO/cl72": {
    finishes: ["negro", "blanco"],
    regions: [
      [0.795, 0.41, 0.895, 0.613],
      [0.675, 0.503, 0.818, 0.539],
    ],
    threshold: 52,
    minimumComponent: 5,
    dilation: 1,
  },
  "ALUMINIO/ruihe": {
    finishes: ["negro", "blanco"],
    regions: [[0.18, 0.39, 0.82, 0.78]],
    threshold: 60,
    minimumComponent: 24,
    dilation: 1,
  },
});

// Existing wood variants retain their genuine panel grain. These narrow
// regions identify hardware or metallic decoration that is unchanged in a
// trusted light reference, so the exact pixels can be restored from original.
const MODEL_ORIGINAL_RESTORE = Object.freeze({
  "MADERAACÚSTICA/wl-d036": {
    referenceFinish: "blanco",
    regions: [
      [0.122, 0.032, 0.208, 0.56],
      [0.122, 0.72, 0.208, 0.991],
    ],
    minimumDifference: 8,
    lumaDelta: 2,
    minimumComponent: 1,
    skipFinishes: ["blanco"],
  },
});

// Reconstruct a soft, antialiased hardware matte from vertical samples of the
// untouched door surface. This keeps the manufactured hardware exact without
// copying the light source finish as a jagged halo into darker variants.
const MODEL_VERTICAL_ORIGINAL_RESTORE = Object.freeze({
  "MADERAACÚSTICA/wl-s015": {
    regions: [[0.09, 0.54, 0.32, 0.64]],
    sampleGap: 4,
    sampleDepth: 16,
    minimumDifference: 18,
    fullDifference: 105,
  },
  "MADERAACÚSTICA/wl-s019": {
    regions: [[0.09, 0.55, 0.3, 0.625]],
    sampleGap: 4,
    sampleDepth: 16,
    minimumDifference: 18,
    fullDifference: 105,
  },
});

// These products need a true antialiased hardware matte rather than a hard
// exclusion in the paint mask. Each object is removed with a locally sampled
// clean plate, then its original material is un-matted onto the new finish.
const MODEL_LOCAL_HARDWARE_RESTORE = Object.freeze({
  "PVC/wl-p001": {
    neutralForeground: true,
    neutralForegroundEdgeOnly: true,
    alphaGamma: 1.1,
    alphaCutoff: 38,
    solidAt: 248,
    allowEllipses: [[55, 580.5, 11, 10.5, 1]],
    fixedEllipses: [[55, 604.5, 11.5, 13.5, 1.5]],
    allowCapsules: [[55, 583, 106.5, 583, 5.4, 0.8]],
    allowRoundedRects: [],
    coreEllipses: [
      [55, 580.5, 8, 8, 1],
      [55, 605, 6, 9, 1],
      [104.5, 583, 5, 5, 1],
    ],
    coreRects: [[58, 577.5, 104, 589, 1]],
    maskClearRects: [
      [60, 558, 115, 577],
      [38, 590, 115, 592],
      [70, 589, 115, 625],
      [38, 589, 43, 625],
    ],
    objects: [
      {
        bounds: [38, 558, 115, 590], sampleGap: 4, sampleDepth: 18,
        sampleMode: "top", min: 30, full: 112,
      },
      {
        bounds: [38, 590, 115, 625], sampleGap: 3, sampleDepth: 20,
        sampleMode: "bottom", detect: false,
      },
    ],
    horizontalRepairs: [
      { bounds: [140, 655, 141, 666], sampleGap: 1, sampleDepth: 4 },
    ],
    pointRepairs: [
      [139, 646], [139, 654], [139, 662],
    ],
  },
  "EVACUACION/gk-01": {
    alphaGamma: 1.55,
    alphaCutoff: 30,
    solidAt: 250,
    allowEllipses: [
      [87, 566, 20.2, 21.5, 1.2],
      [87, 621.5, 20.5, 22, 1.2],
    ],
    allowCapsules: [[88, 622, 168, 622, 10.5, 1.2]],
    allowRoundedRects: [],
    coreEllipses: [
      [87, 566, 17, 18.5, 1],
      [87, 621.5, 17.5, 19, 1],
    ],
    coreRects: [[88, 615, 168, 629, 1]],
    objects: [
      { bounds: [62, 538, 181, 650], sampleGap: 5, sampleDepth: 22, min: 9, full: 70 },
    ],
  },
  "BAJOCARBONO/wl-dt08": {
    neutralForeground: true,
    neutralForegroundEdgeOnly: true,
    alphaGamma: 0.72,
    alphaCutoff: 24,
    solidAt: 250,
    allowEllipses: [],
    allowCapsules: [[130, 591, 228, 591, 8.5, 1]],
    allowRoundedRects: [[98, 580.5, 143, 615, 4.5, 1]],
    coreEllipses: [[228, 591, 5.5, 5, 1]],
    coreRects: [
      [102, 585, 137, 610, 1],
      [132, 586, 226, 596, 1],
    ],
    objects: [
      { bounds: [92, 573, 234, 620], sampleGap: 4, sampleDepth: 20, min: 22, full: 90 },
    ],
    pointRepairs: [[494, 905], [494, 912]],
  },
});

const MODEL_EXISTING_BASE_FORCE_PAINT_REGIONS = Object.freeze({
  "MADERAACÚSTICA/wl-5503": [
    [0, 0, 1, 0.05, 0, 254],
    [0, 0, 0.08, 1, 0, 254],
    [0.92, 0, 1, 1, 0, 254],
    [0.076, 0.048, 0.924, 0.084, 0, 254],
    [0.076, 0.084, 0.108, 0.626, 0, 254],
    [0.076, 0.646, 0.108, 0.947, 0, 254],
    [0.103, 0.048, 0.23, 0.626, 0, 254],
    [0.103, 0.646, 0.23, 0.966, 0, 254],
    [0.785, 0.048, 0.924, 0.626, 0, 254],
    [0.785, 0.646, 0.924, 0.966, 0, 254],
    [0.076, 0.947, 0.924, 0.966, 0, 254],
  ],
  "MADERAACÚSTICA/wl-d038": [
    [0, 0, 0.08, 1, 0, 254],
    [0.92, 0, 1, 1, 0, 254],
    [0, 0, 1, 0.05, 0, 254],
  ],
  "MADERAACÚSTICA/wl-j008": [
    [0, 0, 0.08, 1, 0, 254],
    [0.92, 0, 1, 1, 0, 254],
    [0, 0, 1, 0.05, 0, 254],
  ],
  "MADERAACÚSTICA/wl-s015": [
    [0, 0, 0.065, 1, 0, 254],
    [0.915, 0, 1, 1, 0, 254],
  ],
});

const MODEL_EXISTING_BASE_SOLID_PAINT_REGIONS = Object.freeze({
  "MADERAACÚSTICA/wl-5503": [
    [0.804, 0.625, 0.94, 0.646],
  ],
  "MADERAACÚSTICA/wl-s015": [
    [0.005, 0.006, 0.043, 0.995],
    [0.043, 0.027, 0.145, 1],
    [0.917, 0.034, 0.937, 0.995],
    [0.937, 0.006, 0.992, 0.995],
  ],
  "MADERAACÚSTICA/wl-s019": [
    [0.01, 0.006, 0.068, 0.997],
    [0.917, 0.031, 0.934, 0.99],
    [0.934, 0.006, 0.995, 0.995],
    [0.01, 0.006, 0.934, 0.04],
  ],
});

const MODEL_EXISTING_BASE_FINISH_FORCE_PAINT_REGIONS = Object.freeze({});

const MODEL_EXISTING_BASE_FINISH_SOLID_PAINT_REGIONS = Object.freeze({
  "MADERAACÚSTICA/wl-d029/blanco": [
    [0.83, 0.047, 0.887, 1],
  ],
});

const MODEL_EXISTING_BASE_CLEAR_PAINT_REGIONS = Object.freeze({
  "MADERAACÚSTICA/wl-d033": [
    [0, 0.965, 1, 1],
  ],
  "MADERAACÚSTICA/wl-s015": [
    [0.145, 0.96, 0.917, 1],
  ],
});

const MODEL_ORIGINAL_BASE_SKIP_CLEAR = new Set([
  "MADERAACÚSTICA/wl-d033",
  "MADERAACÚSTICA/wl-s015",
]);

const MODEL_ORIGINAL_COPY_REGIONS = Object.freeze({
  "MADERAACÚSTICA/wl-d033": [
    [0, 0, 1, 0.006],
    [0.448, 0.033, 0.55, 0.99],
  ],
  "MADERAACÚSTICA/wl-d036": [
    [0, 0, 1, 0.006],
  ],
  "MADERAACÚSTICA/wl-d038": [
    [0.237, 0.594, 0.93, 0.623],
  ],
  "MADERAACÚSTICA/wl-j008": [
    [0.198, 0.032, 0.219, 0.505],
    [0.198, 0.032, 0.325, 0.038],
    [0.245, 0.032, 0.325, 0.994],
  ],
  "MADERAACÚSTICA/wl-s015": [
    [0, 0, 1, 0.006],
  ],
});

const MODEL_ORIGINAL_COPY_DARK_REGIONS = Object.freeze({
  "MADERAACÚSTICA/wl-s015": [
    [0.1411, 0.0368, 0.1814, 0.5113, 80, 200],
    [0.1411, 0.6566, 0.1814, 0.9906, 80, 200],
  ],
});

const MODEL_ORIGINAL_COPY_BRIGHT_REGIONS = Object.freeze({
  "MADERAACÚSTICA/wl-s015": [
    [0.068, 0.989, 0.917, 1, 245, 252],
  ],
});

const MODEL_FINISH_ORIGINAL_COPY_REGIONS = Object.freeze({});

const MODEL_ORIGINAL_COPY_POLYGONS = Object.freeze({
  "MADERAACÚSTICA/wl-d029": [[
    [0.137, 0.5735],
    [0.284, 0.575],
    [0.288, 0.585],
    [0.272, 0.589],
    [0.137, 0.588],
  ]],
  "MADERAACÚSTICA/wl-d036": [[
    [0.135, 0.623],
    [0.299, 0.625],
    [0.299, 0.637],
    [0.286, 0.64],
    [0.135, 0.638],
  ]],
  "MADERAACÚSTICA/wl-d038": [
    [
      [0.202, 0.594],
      [0.237, 0.594],
      [0.237, 0.623],
      [0.202, 0.607],
    ],
    [
      [0.13, 0.575],
      [0.277, 0.577],
      [0.277, 0.588],
      [0.261, 0.592],
      [0.13, 0.589],
    ],
  ],
  "MADERAACÚSTICA/wl-d033": [{
    maximumLuma: 225,
    points: [
      [0.13, 0.618],
      [0.296, 0.62],
      [0.296, 0.632],
      [0.281, 0.636],
      [0.13, 0.634],
    ],
  }],
  "MADERAACÚSTICA/wl-j008": [[
    [0.198, 0.5],
    [0.219, 0.5],
    [0.249, 0.518],
    [0.249, 0.527],
    [0.228, 0.521],
    [0.198, 0.508],
  ]],
});

const MODEL_ORIGINAL_COPY_ELLIPSES = Object.freeze({
  "MADERAACÚSTICA/wl-d029": [
    [0.142, 0.575, 0.043, 0.016],
    [0.142, 0.601, 0.036, 0.015],
  ],
  "MADERAACÚSTICA/wl-d036": [
    [0.141, 0.622, 0.041, 0.016],
    [0.141, 0.652, 0.037, 0.015],
  ],
  "MADERAACÚSTICA/wl-d038": [
    [0.123, 0.58, 0.045, 0.017],
    [0.126, 0.607, 0.041, 0.016],
  ],
  "MADERAACÚSTICA/wl-d033": [
    [0.134, 0.622, 0.043, 0.017, 225],
    [0.134, 0.651, 0.039, 0.016, 225],
  ],
});

// Rectangles use [x, y, width, height] and deliberately include a few pixels
// of surrounding door surface. The hardware protector segments the object
// inside each ROI, instead of blanking the full rectangle and leaving a patch.
const MODEL_HARDWARE_REGIONS = Object.freeze({
  "ACERO/cl23": [
    [0.105, 0.455, 0.14, 0.06, false],
    [0.175, 0.42, 0.08, 0.19, false],
  ],
  "ACERO/cl39": [[0.1637, 0.4107, 0.1852, 0.1828]],
  "ACERO/cl62": [[0.1582, 0.4128, 0.1826, 0.1809]],
  "ACERO/cl63": [
    [0.7832, 0.4053, 0.0821, 0.0904],
    [0.7895, 0.5255, 0.0737, 0.0394],
  ],
  "ACERO/cl65": [
    [0.7659, 0.4404, 0.0985, 0.0904],
    [0.7834, 0.5309, 0.0766, 0.0362],
  ],
  "ACERO/cl59": [[0.305, 0.14, 0.12, 0.8]],
  "ACERO/cl50": [
    [0.073, 0.145, 0.04, 0.075], [0.073, 0.355, 0.04, 0.08],
    [0.073, 0.802, 0.04, 0.08], [0.888, 0.145, 0.04, 0.075],
    [0.888, 0.355, 0.04, 0.08], [0.888, 0.802, 0.04, 0.08],
  ],
  "ACERO/cl55": [
    [0.87, 0.145, 0.025, 0.071],
    [0.87, 0.345, 0.025, 0.082],
    [0.87, 0.785, 0.025, 0.115],
  ],
  "ACERO/gl23": [[0.1537, 0.4734, 0.1517, 0.1494]],
  "ACERO/gl083": [
    [0.3365, 0.47, 0.0615, 0.0569],
    [0.3404, 0.5722, 0.0577, 0.0316],
    [0.4327, 0.392, 0.0481, 0.3361],
  ],
  "ACERO/gl097": [
    [0.745, 0.078, 0.145, 0.026],
    [0.1543, 0.4314, 0.0802, 0.1772],
  ],
  "ACERO/glory": [[0.1067, 0.4768, 0.0889, 0.185]],
  "ACERO/glory-pro": [
    [0.055, 0.08, 0.03, 0.91],
    [0.2959, 0.4777, 0.0774, 0.1833],
  ],
  "ACERO/jd073": [[0.1148, 0.4754, 0.0843, 0.1654]],
  "ACERO/lingan": [
    [0.255, 0.058, 0.035, 0.92],
    [0.1588, 0.4629, 0.1588, 0.1885],
  ],
  "ACERO/mid-night": [[0.3388, 0.4658, 0.1198, 0.1718]],
  "ACERO/n9520": [[0.1401, 0.4669, 0.0776, 0.1724]],
  "ACERO/nc9020": [
    [0.09, 0.145, 0.04, 0.08], [0.09, 0.335, 0.04, 0.08],
    [0.09, 0.63, 0.04, 0.08], [0.09, 0.82, 0.04, 0.08],
  ],
  "ACERO/p101": [[0.1306, 0.4688, 0.0831, 0.1667]],
  "ACERO/p105": [[0.3595, 0.4611, 0.0806, 0.1754]],
  "ACERO/p107": [[0.139, 0.472, 0.075, 0.17, false]],
  "ACERO/p108": [[0.1465, 0.4906, 0.0717, 0.1568]],
  "ACERO/y106": [[0.15, 0.4701, 0.0917, 0.214]],
  "ACERO/y118": [
    [0.355, 0.052, 0.112, 0.92],
    [0.462, 0.052, 0.112, 0.92],
    [0.568, 0.052, 0.115, 0.92],
    [0.7543, 0.4316, 0.0795, 0.1871],
  ],
  "ACERO/y119": [
    [0.27, 0.20, 0.17, 0.12], [0.27, 0.30, 0.17, 0.12],
    [0.27, 0.40, 0.17, 0.12], [0.27, 0.50, 0.17, 0.12],
    [0.27, 0.60, 0.17, 0.12], [0.27, 0.70, 0.17, 0.12],
    [0.27, 0.80, 0.17, 0.10],
    [0.7552, 0.4326, 0.0781, 0.1927],
  ],
  "MADERAACÚSTICA/wl-5503": [[0.103, 0.626, 0.697, 0.02, false]],
  "MADERAACÚSTICA/wl-d033": [[0.102, 0.61, 0.192, 0.054, false]],
  "MADERAACÚSTICA/wl-d003": [
    [0.0843, 0.5599, 0.184, 0.0702, false],
    [0.2373, 0.589, 0.7127, 0.0086, false],
  ],
  "MADERAACÚSTICA/wl-d006": [[0.0862, 0.5627, 0.197, 0.0659, false]],
  "MADERAACÚSTICA/wl-d010": [[0.1039, 0.5572, 0.1974, 0.0657, false]],
  "MADERAACÚSTICA/wl-d012": [
    [0.1019, 0.5497, 0.1869, 0.0779, false],
    [0.1845, 0.5441, 0.1068, 0.1313, false],
  ],
  "MADERAACÚSTICA/wl-d015": [[0.1059, 0.5505, 0.1872, 0.0716, false]],
  "MADERAACÚSTICA/wl-d020": [[0.1084, 0.5559, 0.1946, 0.065, false]],
  "MADERAACÚSTICA/wl-d023": [
    [0.1086, 0.5544, 0.1919, 0.0685, false],
    [0.096, 0.0253, 0.2096, 0.9662, false],
  ],
  "MADERAACÚSTICA/wl-d029": [
    [0.102, 0.5553, 0.1915, 0.0658, false],
    [0.0498, 0.5479, 0.8905, 0.0913, false],
  ],
  "MADERAACÚSTICA/wl-d030": [
    [0.1111, 0.5623, 0.1901, 0.0678, false],
    [0.5432, 0.5311, 0.4, 0.1328, false],
    [0.0444, 0.6172, 0.5481, 0.0623, false],
    [0.5531, 0.6172, 0.2222, 0.3773, false],
  ],
  "MADERAACÚSTICA/wl-d031": [[0.0914, 0.5517, 0.1877, 0.0714, false]],
  "MADERAACÚSTICA/wl-d036": [
    [0.0964, 0.5982, 0.2161, 0.0767, false],
    [0.1042, 0.5753, 0.2083, 0.1324, false],
  ],
  "MADERAACÚSTICA/wl-d038": [[0.0864, 0.5581, 0.1951, 0.065, false]],
  "MADERAACÚSTICA/wl-j001": [[0.1054, 0.5484, 0.1936, 0.0606, false]],
  "MADERAACÚSTICA/wl-j002": [[0.1312, 0.5258, 0.1763, 0.0709, false]],
  "MADERAACÚSTICA/wl-j003": [[0.123, 0.5243, 0.1834, 0.0725, false]],
  "MADERAACÚSTICA/wl-j005": [[0.1166, 0.5297, 0.1818, 0.0695, false]],
  "MADERAACÚSTICA/wl-j006": [[0.1047, 0.5569, 0.199, 0.0651, false]],
  "MADERAACÚSTICA/wl-j008": [[0.095, 0.5339, 0.2586, 0.0881, false]],
  "MADERAACÚSTICA/wl-j010": [[0.1084, 0.5563, 0.1897, 0.0622, false]],
  "MADERAACÚSTICA/wl-j012": [[0.0864, 0.5581, 0.2025, 0.0659, false]],
  "MADERAACÚSTICA/wl-s001": [[0.1083, 0.555, 0.2065, 0.0677, false]],
  "MADERAACÚSTICA/wl-s009": [
    [0.068, 0.5541, 0.204, 0.0761, false],
    [0.0453, 0.5038, 0.2368, 0.1929, false],
  ],
  "MADERAACÚSTICA/wl-s011": [[0.0787, 0.5547, 0.2005, 0.0702, false]],
  "MADERAACÚSTICA/wl-s015": [[0.1058, 0.5566, 0.199, 0.0698, false]],
  "MADERAACÚSTICA/wl-s019": [[0.102, 0.562, 0.18, 0.054, false]],
  "MADERAACÚSTICA/wl-s020": [[0.0943, 0.5529, 0.1985, 0.0683, false]],
  "ALUMINIO/saina": [[0.405, 0.1, 0.09, 0.87]],
  "ALUMINIO/senna": [[0.345, 0.087, 0.09, 0.885]],
  "ALUMINIO/chaopu": [[0.3442, 0.4639, 0.0692, 0.1726]],
  "ALUMINIO/makailen": [[0.3433, 0.4635, 0.0774, 0.1557]],
  "CORTAFUEGO/gf026": [[0.1745, 0.4283, 0.1745, 0.16, false]],
  "CORTAFUEGO/td-01": [
    [0.1065, 0.5114, 0.0717, 0.0394, false],
    [0.1065, 0.5654, 0.2087, 0.0384, false],
  ],
  "CORTAFUEGO/td-02": [
    [0.2106, 0.5067, 0.0732, 0.0382, false],
    [0.2106, 0.5593, 0.2151, 0.0372, false],
  ],
  "CORTAFUEGO/td-03": [
    [0.0806, 0.4842, 0.0847, 0.0325, false],
    [0.0806, 0.5353, 0.2556, 0.0353, false],
  ],
  "MINIMALISTA/ume-114": [[0.1853, 0.5254, 0.2328, 0.0268, false]],
  "PVC/wl-p001": [
    [0.1084, 0.5652, 0.187, 0.0289, false],
    [0.1111, 0.5891, 0.0678, 0.0279, false],
  ],
  "PVC/wl-p002": [
    [0.1149, 0.5605, 0.1785, 0.0271, false],
    [0.1149, 0.5848, 0.0685, 0.028, false],
  ],
  "PVC/wl-p003": [
    [0.1168, 0.5619, 0.1825, 0.028, false],
    [0.1168, 0.5863, 0.0681, 0.0289, false],
  ],
  "PVC/wl-p005": [
    [0.0733, 0.5637, 0.1834, 0.0276, false],
    [0.0733, 0.5877, 0.0685, 0.0285, false],
  ],
  "PVC/wl-p006": [
    [0.0821, 0.5594, 0.1812, 0.0286, false],
    [0.0821, 0.5836, 0.0676, 0.0295, false],
  ],
  "PVC/wl-p007": [
    [0.0797, 0.5632, 0.1739, 0.028, false],
    [0.0797, 0.5875, 0.0676, 0.028, false],
  ],
  "PVC/wl-p008": [
    [0.1084, 0.5615, 0.1823, 0.0288, false],
    [0.1084, 0.5858, 0.069, 0.0296, false],
  ],
  "PVC/wl-p009": [
    [0.1111, 0.5613, 0.1827, 0.0278, false],
    [0.1111, 0.5846, 0.0691, 0.0295, false],
  ],
  "PVC/wl-p010": [
    [0.1092, 0.5643, 0.1787, 0.0281, false],
    [0.1092, 0.5888, 0.0695, 0.0299, false],
  ],
  "PVC/wl-p011": [
    [0.0907, 0.5619, 0.1789, 0.028, false],
    [0.0882, 0.5863, 0.0686, 0.0298, false],
  ],
  "PVC/wl-p015": [
    [0.7133, 0.565, 0.2096, 0.0271, false],
    [0.8482, 0.5884, 0.0747, 0.0316, false],
  ],
  "PVC/wl-p016": [
    [0.0858, 0.5635, 0.1765, 0.0279, false],
    [0.0833, 0.5869, 0.0686, 0.0297, false],
  ],
  "PVC/wl-p201": [
    [0.1078, 0.5635, 0.1814, 0.0279, false],
    [0.1078, 0.5869, 0.0686, 0.0297, false],
  ],
  "AI/x50-pro": [
    [0.798535, 0.06204, 0.097069, 0.02103],
    [0.355311, 0.452156, 0.062271, 0.091482],
    [0.35348, 0.555205, 0.069597, 0.057834],
  ],
  "AI/x50-max": [
    [0.36, 0.455, 0.08, 0.095],
    [0.36, 0.548, 0.08, 0.075],
  ],
  "BAJOCARBONO/wl-dt08": [[0.1727, 0.4903, 0.2446, 0.0313]],
  "BAJOCARBONO/wl-dt103": [[0.1673, 0.5143, 0.2807, 0.0346]],
  "BAJOCARBONO/wl-dt107": [[0.1171, 0.5207, 0.2714, 0.0338]],
  "EVACUACION/gk-01": [
    [0.1284, 0.4682, 0.0817, 0.0387],
    [0.1284, 0.5146, 0.2082, 0.0413],
  ],
  "EVACUACION/gk-02": [
    [0.1182, 0.5039, 0.0862, 0.0378],
    [0.1202, 0.5485, 0.2084, 0.0412],
    [0.9098, 0.1725, 0.0281, 0.0661],
    [0.9098, 0.4747, 0.0281, 0.0687],
    [0.9098, 0.7991, 0.0281, 0.0678],
  ],
  "EVACUACION/gk-03": [
    [0.796, 0.5302, 0.0752, 0.0328],
    [0.6673, 0.5743, 0.2099, 0.0371],
  ],
  "EVACUACION/mk-01": [
    [0.1339, 0.4705, 0.0846, 0.0396],
    [0.1358, 0.5172, 0.2008, 0.0422],
  ],
  "EVACUACION/mk-02": [
    [0.0891, 0.5258, 0.0772, 0.0365],
    [0.0891, 0.5686, 0.196, 0.0392],
    [0.903, 0.1203, 0.0277, 0.0535],
    [0.903, 0.2995, 0.0277, 0.0535],
    [0.903, 0.8556, 0.0277, 0.0517],
  ],
  "EVACUACION/mk-03": [
    [0.1357, 0.4714, 0.0818, 0.037],
    [0.1337, 0.5145, 0.2096, 0.0423],
    [0.8862, 0.1471, 0.0319, 0.0546],
    [0.8862, 0.4846, 0.0319, 0.0537],
    [0.8862, 0.8273, 0.0319, 0.0546],
  ],
});

const CORREDIZA_REGIONS = Object.freeze({
  "wl-a23001": {
    include: [
      [0, 0, 1, 0.024313], [0, 0.991543, 1, 1],
      [0, 0, 0.040661, 1], [0.964422, 0, 1, 1],
      [0.329098, 0, 0.336722, 1], [0.499365, 0, 0.506989, 1],
      [0.806861, 0, 0.813215, 1],
    ],
    exclude: [[0.036849, 0.486258, 0.068615, 0.589852], [0.768742, 0.486258, 0.815756, 0.589852]],
  },
  "wl-a23002": {
    include: [
      [0, 0, 1, 0.022686], [0, 0.994555, 1, 1],
      [0, 0, 0.068807, 1], [0.944954, 0, 1, 1],
    ],
    exclude: [[0.045872, 0.508167, 0.279817, 0.580762]],
  },
  "wl-a23019": {
    include: [
      [0.06, 0.020151, 0.95375, 0.04937], [0.06, 0.974811, 0.95375, 1],
      [0.06, 0.020151, 0.14625, 1], [0.86875, 0.020151, 0.95375, 1],
    ],
    exclude: [[0.105, 0.491184, 0.2525, 0.581864]],
  },
  "wl-a23020": {
    include: [
      [0.029621, 0.025075, 0.494076, 0.055165],
      [0.520142, 0.025075, 0.939573, 0.051153],
      [0.029621, 0.025075, 0.075829, 1], [0.939573, 0.025075, 0.972749, 1],
      [0.494076, 0.025075, 0.520142, 1],
      [0.029621, 0.967904, 0.494076, 1], [0.520142, 0.973922, 0.939573, 1],
    ],
    exclude: [[0.053318, 0.489468, 0.072275, 0.600802], [0.941943, 0.489468, 0.962085, 0.600802]],
  },
});

function parseArgs(argv) {
  const options = {
    all: false,
    overwrite: false,
    outputRoot: path.resolve("tmp/door-variant-repair-preview"),
    maskRoot: null,
    models: [],
    finishes: null,
    quality: 92,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--all") options.all = true;
    else if (value === "--overwrite") options.overwrite = true;
    else if (value === "--model") options.models.push(argv[++index]);
    else if (value === "--output-root") options.outputRoot = path.resolve(argv[++index]);
    else if (value === "--mask-root") options.maskRoot = path.resolve(argv[++index]);
    else if (value === "--quality") options.quality = Number(argv[++index]);
    else if (value === "--finishes") options.finishes = new Set(argv[++index].split(","));
    else throw new Error(`Unknown argument: ${value}`);
  }
  if (!options.all && options.models.length === 0) {
    throw new Error("Pass --all or at least one --model CATEGORY/model.");
  }
  if (!Number.isInteger(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error("--quality must be an integer from 1 to 100.");
  }
  return options;
}

function discoverModels(options) {
  if (!options.all) {
    return options.models.map((model) => path.resolve(ROOT, model));
  }
  const models = [];
  for (const category of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    const categoryPath = path.join(ROOT, category.name);
    for (const model of fs.readdirSync(categoryPath, { withFileTypes: true })) {
      if (!model.isDirectory()) continue;
      const modelPath = path.join(categoryPath, model.name);
      if (fs.existsSync(path.join(modelPath, "original.webp"))) models.push(modelPath);
    }
  }
  return models.sort();
}

async function loadRgba(file) {
  return sharp(file, { failOn: "error" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
}

function srgbToLinear(value) {
  const channel = value / 255;
  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(value) {
  const channel = Math.max(0, Math.min(1, value));
  const encoded = channel <= 0.0031308
    ? 12.92 * channel
    : 1.055 * (channel ** (1 / 2.4)) - 0.055;
  return Math.round(Math.max(0, Math.min(1, encoded)) * 255);
}

function rgbToOklab(red, green, blue) {
  const r = srgbToLinear(red);
  const g = srgbToLinear(green);
  const b = srgbToLinear(blue);
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);
  return [
    0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot,
    1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot,
    0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot,
  ];
}

function oklabToRgb(lightness, a, b) {
  const lRoot = lightness + 0.3963377774 * a + 0.2158037573 * b;
  const mRoot = lightness - 0.1055613458 * a - 0.0638541728 * b;
  const sRoot = lightness - 0.0894841775 * a - 1.291485548 * b;
  const l = lRoot ** 3;
  const m = mRoot ** 3;
  const s = sRoot ** 3;
  return [
    linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

function hexToOklab(hex) {
  const value = hex.slice(1);
  return rgbToOklab(
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  );
}

function rectangleMask(width, height, spec, original) {
  const mask = Buffer.alloc(width * height);
  const paint = (rectangle, value) => {
    const [left, top, right, bottom] = rectangle;
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil(right * width));
    const y1 = Math.min(height, Math.ceil(bottom * height));
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const pixel = y * width + x;
        const offset = pixel * 4;
        mask[pixel] = value;
      }
    }
  };
  spec.include.forEach((rectangle) => paint(rectangle, 255));
  spec.exclude.forEach((rectangle) => paint(rectangle, 0));
  return mask;
}

function clearConnectedPixels(mask, original, width, height, predicate) {
  const pixels = width * height;
  const visited = new Uint8Array(pixels);
  const queue = new Int32Array(pixels);
  let head = 0;
  let tail = 0;
  const enqueue = (pixel) => {
    if (visited[pixel]) return;
    visited[pixel] = 1;
    const offset = pixel * 4;
    if (!predicate(original[offset], original[offset + 1], original[offset + 2], pixel)) return;
    queue[tail] = pixel;
    tail += 1;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const pixel = queue[head];
    head += 1;
    mask[pixel] = 0;
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    if (x > 0) enqueue(pixel - 1);
    if (x + 1 < width) enqueue(pixel + 1);
    if (y > 0) enqueue(pixel - width);
    if (y + 1 < height) enqueue(pixel + width);
  }
}

function removeSmallPaintIslands(mask, width, height) {
  const pixels = width * height;
  const visited = new Uint8Array(pixels);
  const queue = new Int32Array(pixels);
  const component = new Int32Array(pixels);
  const maximumArea = Math.max(96, Math.floor(pixels * 0.0025));

  for (let start = 0; start < pixels; start += 1) {
    if (visited[start] || mask[start] < 128) continue;
    let head = 0;
    let tail = 0;
    let size = 0;
    let touchesBorder = false;
    visited[start] = 1;
    queue[tail] = start;
    tail += 1;

    while (head < tail) {
      const pixel = queue[head];
      head += 1;
      component[size] = pixel;
      size += 1;
      const x = pixel % width;
      const y = Math.floor(pixel / width);
      if (x === 0 || x + 1 === width || y === 0 || y + 1 === height) touchesBorder = true;
      const visit = (neighbor) => {
        if (visited[neighbor] || mask[neighbor] < 128) return;
        visited[neighbor] = 1;
        queue[tail] = neighbor;
        tail += 1;
      };
      if (x > 0) visit(pixel - 1);
      if (x + 1 < width) visit(pixel + 1);
      if (y > 0) visit(pixel - width);
      if (y + 1 < height) visit(pixel + width);
    }

    if (!touchesBorder && size <= maximumArea) {
      for (let index = 0; index < size; index += 1) mask[component[index]] = 0;
    }
  }
}

function clearRectangles(mask, width, height, rectangles) {
  for (const [left, top, right, bottom] of rectangles) {
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil(right * width));
    const y1 = Math.min(height, Math.ceil(bottom * height));
    for (let y = y0; y < y1; y += 1) {
      mask.fill(0, y * width + x0, y * width + x1);
    }
  }
}

function paintSolidRectangles(mask, width, height, rectangles) {
  for (const [left, top, right, bottom] of rectangles) {
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil(right * width));
    const y1 = Math.min(height, Math.ceil(bottom * height));
    for (let y = y0; y < y1; y += 1) {
      mask.fill(255, y * width + x0, y * width + x1);
    }
  }
}

function paintRectangles(mask, original, width, height, rectangles) {
  for (const [left, top, right, bottom] of rectangles) {
    const x0 = Math.max(0, Math.min(width, Math.floor(left * width)));
    const x1 = Math.max(x0, Math.min(width, Math.ceil(right * width)));
    const y0 = Math.max(0, Math.min(height, Math.floor(top * height)));
    const y1 = Math.max(y0, Math.min(height, Math.ceil(bottom * height)));
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const pixel = y * width + x;
        const offset = pixel * 4;
        if (original[offset + 3] > 10
          && Math.max(original[offset], original[offset + 1], original[offset + 2]) < 235) {
          mask[pixel] = 255;
        }
      }
    }
  }
}

function paintMaterialRectangles(mask, original, width, height, rectangles) {
  for (const [left, top, right, bottom, minimumLuma, maximumRgb = 235] of rectangles) {
    const x0 = Math.max(0, Math.min(width, Math.floor(left * width)));
    const x1 = Math.max(x0, Math.min(width, Math.ceil(right * width)));
    const y0 = Math.max(0, Math.min(height, Math.floor(top * height)));
    const y1 = Math.max(y0, Math.min(height, Math.ceil(bottom * height)));
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const pixel = y * width + x;
        const offset = pixel * 4;
        const maximum = Math.max(original[offset], original[offset + 1], original[offset + 2]);
        const minimum = Math.min(original[offset], original[offset + 1], original[offset + 2]);
        const luma = 0.2126 * original[offset]
          + 0.7152 * original[offset + 1]
          + 0.0722 * original[offset + 2];
        if (original[offset + 3] > 10 && maximum < maximumRgb
          && maximum - minimum < 70 && luma >= minimumLuma) {
          mask[pixel] = 255;
        }
      }
    }
  }
}

function paintForegroundRectangles(mask, original, width, height, rectangles) {
  const pixels = width * height;
  const cornerPixels = [0, width - 1, (height - 1) * width, pixels - 1];
  const brightCorners = cornerPixels.filter((pixel) => {
    const offset = pixel * 4;
    const minimum = Math.min(original[offset], original[offset + 1], original[offset + 2]);
    const maximum = Math.max(original[offset], original[offset + 1], original[offset + 2]);
    return minimum > 215 && maximum - minimum < 24;
  });
  if (brightCorners.length === 0) {
    paintMaterialRectangles(mask, original, width, height, rectangles);
    return;
  }

  const background = [
    median(brightCorners.map((pixel) => original[pixel * 4])),
    median(brightCorners.map((pixel) => original[pixel * 4 + 1])),
    median(brightCorners.map((pixel) => original[pixel * 4 + 2])),
  ];
  const foreground = Buffer.alloc(pixels, 255);
  clearConnectedPixels(foreground, original, width, height, (red, green, blue) => (
    Math.max(
      Math.abs(red - background[0]),
      Math.abs(green - background[1]),
      Math.abs(blue - background[2]),
    ) < 12
  ));

  for (const [left, top, right, bottom] of rectangles) {
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil(right * width));
    const y1 = Math.min(height, Math.ceil(bottom * height));
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const pixel = y * width + x;
        if (foreground[pixel] >= 128) mask[pixel] = 255;
      }
    }
  }
}

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)];
}

function protectHardwareRegions(mask, original, width, height, regions) {
  for (const [left, top, regionWidth, regionHeight, fillEnclosed = true] of regions) {
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil((left + regionWidth) * width));
    const y1 = Math.min(height, Math.ceil((top + regionHeight) * height));
    const localWidth = x1 - x0;
    const localHeight = y1 - y0;
    if (localWidth < 3 || localHeight < 3) continue;

    const margin = Math.max(3, Math.round(Math.min(localWidth, localHeight) * 0.18));
    const ringLeft = Math.max(0, x0 - margin);
    const ringTop = Math.max(0, y0 - margin);
    const ringRight = Math.min(width, x1 + margin);
    const ringBottom = Math.min(height, y1 + margin);
    const reds = [];
    const greens = [];
    const blues = [];
    for (let y = ringTop; y < ringBottom; y += 1) {
      for (let x = ringLeft; x < ringRight; x += 1) {
        if (x >= x0 && x < x1 && y >= y0 && y < y1) continue;
        const offset = (y * width + x) * 4;
        reds.push(original[offset]);
        greens.push(original[offset + 1]);
        blues.push(original[offset + 2]);
      }
    }
    const background = [median(reds), median(greens), median(blues)];
    const ringDistances = [];
    for (let index = 0; index < reds.length; index += 1) {
      ringDistances.push(Math.hypot(
        reds[index] - background[0],
        greens[index] - background[1],
        blues[index] - background[2],
      ));
    }
    const backgroundVariation = median(ringDistances);
    const threshold = Math.max(24, Math.min(52, backgroundVariation * 3 + 12));

    const area = localWidth * localHeight;
    const candidate = new Uint8Array(area);
    const distance = new Float32Array(area);
    for (let localY = 0; localY < localHeight; localY += 1) {
      for (let localX = 0; localX < localWidth; localX += 1) {
        const localPixel = localY * localWidth + localX;
        const offset = ((y0 + localY) * width + x0 + localX) * 4;
        const difference = Math.hypot(
          original[offset] - background[0],
          original[offset + 1] - background[1],
          original[offset + 2] - background[2],
        );
        distance[localPixel] = difference;
        if (difference >= threshold) candidate[localPixel] = 1;
      }
    }

    const labels = new Int32Array(area);
    labels.fill(-1);
    const queue = new Int32Array(area);
    const components = [];
    for (let start = 0; start < area; start += 1) {
      if (!candidate[start] || labels[start] >= 0) continue;
      const componentId = components.length;
      let head = 0;
      let tail = 0;
      let score = 0;
      labels[start] = componentId;
      queue[tail] = start;
      tail += 1;
      while (head < tail) {
        const pixel = queue[head];
        head += 1;
        score += Math.max(1, distance[pixel] - threshold + 1);
        const x = pixel % localWidth;
        const y = Math.floor(pixel / localWidth);
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (dx === 0 && dy === 0) continue;
            const nextX = x + dx;
            const nextY = y + dy;
            if (nextX < 0 || nextX >= localWidth || nextY < 0 || nextY >= localHeight) continue;
            const neighbor = nextY * localWidth + nextX;
            if (!candidate[neighbor] || labels[neighbor] >= 0) continue;
            labels[neighbor] = componentId;
            queue[tail] = neighbor;
            tail += 1;
          }
        }
      }
      components.push({ id: componentId, size: tail, score });
    }
    if (components.length === 0) continue;
    components.sort((leftComponent, rightComponent) => rightComponent.score - leftComponent.score);
    const strongest = components[0].score;
    const kept = new Set(components
      .filter((component, index) => index < 6
        && component.size >= 3
        && component.score >= strongest * 0.035)
      .map(({ id }) => id));
    const protectedPixels = new Uint8Array(area);
    for (let pixel = 0; pixel < area; pixel += 1) {
      if (kept.has(labels[pixel])) protectedPixels[pixel] = 1;
    }

    const dilated = new Uint8Array(area);
    for (let pixel = 0; pixel < area; pixel += 1) {
      if (!protectedPixels[pixel]) continue;
      const x = pixel % localWidth;
      const y = Math.floor(pixel / localWidth);
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          const nextX = x + dx;
          const nextY = y + dy;
          if (nextX >= 0 && nextX < localWidth && nextY >= 0 && nextY < localHeight) {
            dilated[nextY * localWidth + nextX] = 1;
          }
        }
      }
    }

    const exterior = new Uint8Array(area);
    let head = 0;
    let tail = 0;
    const enqueueExterior = (pixel) => {
      if (exterior[pixel] || dilated[pixel]) return;
      exterior[pixel] = 1;
      queue[tail] = pixel;
      tail += 1;
    };
    for (let x = 0; x < localWidth; x += 1) {
      enqueueExterior(x);
      enqueueExterior((localHeight - 1) * localWidth + x);
    }
    for (let y = 1; y + 1 < localHeight; y += 1) {
      enqueueExterior(y * localWidth);
      enqueueExterior(y * localWidth + localWidth - 1);
    }
    while (head < tail) {
      const pixel = queue[head];
      head += 1;
      const x = pixel % localWidth;
      const y = Math.floor(pixel / localWidth);
      if (x > 0) enqueueExterior(pixel - 1);
      if (x + 1 < localWidth) enqueueExterior(pixel + 1);
      if (y > 0) enqueueExterior(pixel - localWidth);
      if (y + 1 < localHeight) enqueueExterior(pixel + localWidth);
    }
    for (let localY = 0; localY < localHeight; localY += 1) {
      for (let localX = 0; localX < localWidth; localX += 1) {
        const localPixel = localY * localWidth + localX;
        if (dilated[localPixel] || (fillEnclosed && !exterior[localPixel])) {
          mask[(y0 + localY) * width + x0 + localX] = 0;
        }
      }
    }
  }
}

function protectStableReferenceRegions(mask, width, height, references, config) {
  const [firstFinish, secondFinish] = config.finishes;
  const first = references.get(firstFinish);
  const second = references.get(secondFinish);
  if (!first || !second) return;

  for (const [left, top, right, bottom] of config.regions) {
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil(right * width));
    const y1 = Math.min(height, Math.ceil(bottom * height));
    const localWidth = x1 - x0;
    const localHeight = y1 - y0;
    const area = localWidth * localHeight;
    const candidate = new Uint8Array(area);
    for (let localY = 0; localY < localHeight; localY += 1) {
      for (let localX = 0; localX < localWidth; localX += 1) {
        const pixel = (y0 + localY) * width + x0 + localX;
        const offset = pixel * 4;
        const difference = Math.max(
          Math.abs(first[offset] - second[offset]),
          Math.abs(first[offset + 1] - second[offset + 1]),
          Math.abs(first[offset + 2] - second[offset + 2]),
        );
        if (difference <= config.threshold) candidate[localY * localWidth + localX] = 1;
      }
    }

    const visited = new Uint8Array(area);
    const queue = new Int32Array(area);
    for (let start = 0; start < area; start += 1) {
      if (!candidate[start] || visited[start]) continue;
      let head = 0;
      let tail = 0;
      visited[start] = 1;
      queue[tail] = start;
      tail += 1;
      while (head < tail) {
        const pixel = queue[head];
        head += 1;
        const x = pixel % localWidth;
        const y = Math.floor(pixel / localWidth);
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (dx === 0 && dy === 0) continue;
            const nextX = x + dx;
            const nextY = y + dy;
            if (nextX < 0 || nextX >= localWidth || nextY < 0 || nextY >= localHeight) continue;
            const neighbor = nextY * localWidth + nextX;
            if (!candidate[neighbor] || visited[neighbor]) continue;
            visited[neighbor] = 1;
            queue[tail] = neighbor;
            tail += 1;
          }
        }
      }
      if (tail < config.minimumComponent) continue;
      for (let index = 0; index < tail; index += 1) {
        const pixel = queue[index];
        const x = pixel % localWidth;
        const y = Math.floor(pixel / localWidth);
        for (let dy = -config.dilation; dy <= config.dilation; dy += 1) {
          for (let dx = -config.dilation; dx <= config.dilation; dx += 1) {
            const nextX = x + dx;
            const nextY = y + dy;
            if (nextX >= 0 && nextX < localWidth && nextY >= 0 && nextY < localHeight) {
              const globalX = x0 + nextX;
              const globalY = y0 + nextY;
              const inOuterFrame = globalX < width * 0.075 || globalX >= width * 0.925
                || globalY < height * 0.05 || globalY >= height * 0.965;
              if (!config.excludeOuterFrame || !inOuterFrame) {
                mask[globalY * width + globalX] = 0;
              }
            }
          }
        }
      }
    }
  }
}

function extendFrameHighlights(mask, original, width, height) {
  const pixels = width * height;
  const candidate = new Uint8Array(pixels);
  for (let pixel = 0; pixel < pixels; pixel += 1) {
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    if (x >= width * 0.115 && x < width * 0.885 && y >= height * 0.115) continue;
    const offset = pixel * 4;
    const maximum = Math.max(original[offset], original[offset + 1], original[offset + 2]);
    const minimum = Math.min(original[offset], original[offset + 1], original[offset + 2]);
    const luma = 0.2126 * original[offset]
      + 0.7152 * original[offset + 1]
      + 0.0722 * original[offset + 2];
    if (original[offset + 3] > 10 && luma >= 88 && luma < 252 && maximum - minimum < 70) {
      candidate[pixel] = 1;
    }
  }

  const visited = new Uint8Array(pixels);
  const queue = new Int32Array(pixels);
  const component = new Int32Array(pixels);
  for (let start = 0; start < pixels; start += 1) {
    if (!candidate[start] || visited[start]) continue;
    let head = 0;
    let tail = 0;
    let size = 0;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    let lumaTotal = 0;
    let touchesBorder = false;
    visited[start] = 1;
    queue[tail] = start;
    tail += 1;
    while (head < tail) {
      const pixel = queue[head];
      head += 1;
      component[size] = pixel;
      size += 1;
      const x = pixel % width;
      const y = Math.floor(pixel / width);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      if (x === 0 || x + 1 === width || y === 0 || y + 1 === height) touchesBorder = true;
      const offset = pixel * 4;
      lumaTotal += 0.2126 * original[offset]
        + 0.7152 * original[offset + 1]
        + 0.0722 * original[offset + 2];
      const visit = (neighbor) => {
        if (!candidate[neighbor] || visited[neighbor]) return;
        visited[neighbor] = 1;
        queue[tail] = neighbor;
        tail += 1;
      };
      if (x > 0) visit(pixel - 1);
      if (x + 1 < width) visit(pixel + 1);
      if (y > 0) visit(pixel - width);
      if (y + 1 < height) visit(pixel + width);
    }
    const spanX = (maxX - minX + 1) / width;
    const spanY = (maxY - minY + 1) / height;
    const meanLuma = lumaTotal / size;
    const structural = spanX >= 0.15 || spanY >= 0.15 || size >= pixels * 0.004;
    const likelyBackground = touchesBorder && meanLuma > 248;
    if (structural && !likelyBackground) {
      for (let index = 0; index < size; index += 1) mask[component[index]] = 255;
    }
  }
}

function smoothstep(edge0, edge1, value) {
  const normalized = Math.max(0, Math.min(1,
    (value - edge0) / Math.max(1e-9, edge1 - edge0)));
  return normalized * normalized * (3 - 2 * normalized);
}

function pointInPolygon(x, y, polygon) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1;
    index < polygon.length; previous = index, index += 1) {
    const [x1, y1] = polygon[index];
    const [x2, y2] = polygon[previous];
    const crosses = (y1 > y) !== (y2 > y)
      && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1;
    if (crosses) inside = !inside;
  }
  return inside;
}

function polygonContainsPixel(x, y, polygon) {
  return pointInPolygon(x + 0.5, y + 0.5, polygon);
}

function medicaBluePaintMembership(red, green, blue) {
  const [, a, b] = rgbToOklab(red, green, blue);
  const blueAxis = smoothstep(0.014, 0.027, -b);
  const cyanAxis = smoothstep(0.003, 0.011, -a);
  return smoothstep(0.12, 0.82, blueAxis * cyanAxis);
}

function buildMedicaHermeticMask(original, width, height) {
  const mask = Buffer.alloc(width * height);
  const leaf = [[355, 0], [844, 81], [844, 1219], [340, 1295]];
  const expandedLeaf = [[350, -5], [850, 76], [850, 1225], [335, 1300]];
  const leftJamb = [[296, 87], [331, 87], [328, 1224], [287, 1224]];
  const rightJamb = [[838, 87], [870, 87], [870, 1225], [838, 1225]];
  const header = [[296, 87], [870, 87], [870, 126], [296, 126]];
  const protectedRegions = [
    [420, 12, 865, 191],
    [478, 282, 752, 516],
    [744, 116, 818, 170],
    [818, 176, 858, 258],
    [818, 352, 858, 450],
    [818, 1010, 858, 1101],
    [365, 604, 505, 724],
  ];
  const windowOuter = [[492, 294], [738, 326], [738, 502], [492, 478]];
  const windowInner = [[511, 317], [719, 343], [719, 482], [511, 460]];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixel = y * width + x;
      const offset = pixel * 4;
      const onLeaf = polygonContainsPixel(x, y, leaf);
      const onExpandedLeaf = polygonContainsPixel(x, y, expandedLeaf);
      const onFrame = polygonContainsPixel(x, y, leftJamb)
        || polygonContainsPixel(x, y, rightJamb)
        || polygonContainsPixel(x, y, header);
      if (!onExpandedLeaf && !onFrame) continue;

      const blueMembership = medicaBluePaintMembership(
        original[offset], original[offset + 1], original[offset + 2],
      );
      let membership = onLeaf ? 1 : blueMembership;
      if (onFrame && !onLeaf) membership = blueMembership >= 0.12 ? 1 : 0;
      if (protectedRegions.some(([left, top, right, bottom]) => (
        x >= left && x < right && y >= top && y < bottom
      ))) {
        membership = Math.min(membership, blueMembership);
      }
      if (polygonContainsPixel(x, y, windowInner)) membership = 0;
      else if (polygonContainsPixel(x, y, windowOuter)) {
        membership = Math.min(membership, blueMembership);
      }

      const luma = 0.2126 * original[offset]
        + 0.7152 * original[offset + 1]
        + 0.0722 * original[offset + 2];
      if (luma < 45) membership = 0;
      else if (luma < 80) membership *= smoothstep(45, 80, luma);
      mask[pixel] = Math.round(255 * membership);
    }
  }
  return mask;
}

async function consensusMask(modelPath, original, info) {
  const { width, height } = info;
  const pixels = width * height;
  const category = path.basename(path.dirname(modelPath));
  const changedFromOriginal = new Uint8Array(pixels);
  const minRed = new Uint8Array(pixels);
  const minGreen = new Uint8Array(pixels);
  const minBlue = new Uint8Array(pixels);
  const maxRed = new Uint8Array(pixels);
  const maxGreen = new Uint8Array(pixels);
  const maxBlue = new Uint8Array(pixels);
  minRed.fill(255);
  minGreen.fill(255);
  minBlue.fill(255);
  const slug = path.basename(modelPath);
  const modelKey = `${category}/${slug}`;
  const stableHardwareRegions = category === "MADERAACÚSTICA"
    ? MODEL_HARDWARE_REGIONS[modelKey]
    : null;
  const stableReferenceConfig = MODEL_STABLE_REFERENCE_PROTECT[modelKey]
    || (stableHardwareRegions ? {
      finishes: ["negro", "blanco"],
      regions: stableHardwareRegions.map(([left, top, regionWidth, regionHeight]) => (
        [left, top, left + regionWidth, top + regionHeight]
      )),
      threshold: 70,
      minimumComponent: 4,
      dilation: 1,
    } : null);
  const stableReferences = new Map();

  for (const finish of FINISHES.filter(({ slug: finish }) => MASK_REFERENCE_SLUGS.has(finish))) {
    const file = path.join(modelPath, `door-${slug}-${finish.slug}-ai.webp`);
    const variant = await loadRgba(file);
    if (variant.info.width !== width || variant.info.height !== height) {
      throw new Error(`Dimension mismatch: ${file}`);
    }
    if (stableReferenceConfig?.finishes.includes(finish.slug)) {
      stableReferences.set(finish.slug, variant.data);
    }
    for (let pixel = 0, offset = 0; pixel < pixels; pixel += 1, offset += 4) {
      const red = variant.data[offset];
      const green = variant.data[offset + 1];
      const blue = variant.data[offset + 2];
      if (red < minRed[pixel]) minRed[pixel] = red;
      if (green < minGreen[pixel]) minGreen[pixel] = green;
      if (blue < minBlue[pixel]) minBlue[pixel] = blue;
      if (red > maxRed[pixel]) maxRed[pixel] = red;
      if (green > maxGreen[pixel]) maxGreen[pixel] = green;
      if (blue > maxBlue[pixel]) maxBlue[pixel] = blue;
      const difference = Math.max(
        Math.abs(red - original[offset]),
        Math.abs(green - original[offset + 1]),
        Math.abs(blue - original[offset + 2]),
      );
      if (difference > 20) changedFromOriginal[pixel] += 1;
    }
  }

  const seed = Buffer.alloc(pixels);
  for (let pixel = 0; pixel < pixels; pixel += 1) {
    const alpha = original[pixel * 4 + 3];
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    const finishRange = Math.max(
      maxRed[pixel] - minRed[pixel],
      maxGreen[pixel] - minGreen[pixel],
      maxBlue[pixel] - minBlue[pixel],
    );
    const variesByFinish = finishRange > 100;
    const consistentlyReplaced = changedFromOriginal[pixel] >= 5;
    const frameBand = x < width * 0.13 || x >= width * 0.87
      || y < height * 0.10 || y >= height * 0.95;
    const weakFrameEvidence = finishRange > 80 || changedFromOriginal[pixel] >= 5;
    const paint = variesByFinish || consistentlyReplaced
      || (frameBand && weakFrameEvidence);
    seed[pixel] = paint && alpha > 10 ? 255 : 0;
    const sourceOffset = pixel * 4;
    const sourceMaximum = Math.max(
      original[sourceOffset], original[sourceOffset + 1], original[sourceOffset + 2],
    );
    const sourceMinimum = Math.min(
      original[sourceOffset], original[sourceOffset + 1], original[sourceOffset + 2],
    );
    const sourceLuma = 0.2126 * original[sourceOffset]
      + 0.7152 * original[sourceOffset + 1]
      + 0.0722 * original[sourceOffset + 2];
    const forcedFrameBand = x < width * 0.11 || x >= width * 0.89 || y < height * 0.08;
    if (FORCE_DARK_FRAME_CATEGORIES.has(category) && forcedFrameBand
      && sourceLuma >= 12 && sourceLuma < 90 && sourceMaximum - sourceMinimum < 45) {
      seed[pixel] = 255;
    }
  }

  const cornerPixels = [0, width - 1, (height - 1) * width, pixels - 1];
  const darkCorners = cornerPixels.filter((pixel) => {
    const offset = pixel * 4;
    return Math.max(original[offset], original[offset + 1], original[offset + 2]) < 16;
  }).length;
  const brightCornerPixels = cornerPixels.filter((pixel) => {
    const offset = pixel * 4;
    const minimum = Math.min(original[offset], original[offset + 1], original[offset + 2]);
    const maximum = Math.max(original[offset], original[offset + 1], original[offset + 2]);
    return minimum > 215 && maximum - minimum < 24;
  });
  const brightCorners = brightCornerPixels.length;
  const brightBackground = brightCorners > 0 ? [
    median(brightCornerPixels.map((pixel) => original[pixel * 4])),
    median(brightCornerPixels.map((pixel) => original[pixel * 4 + 1])),
    median(brightCornerPixels.map((pixel) => original[pixel * 4 + 2])),
  ] : [255, 255, 255];
  const probeOffsets = [0.035, 0.07, 0.12].map((ratio) => (
    (Math.floor(height * ratio) * width + Math.floor(width / 2)) * 4
  ));
  const probeMaximum = Math.max(...probeOffsets.map((offset) => Math.max(
    original[offset], original[offset + 1], original[offset + 2],
  )));
  const probeMinimum = Math.min(...probeOffsets.map((offset) => Math.min(
    original[offset], original[offset + 1], original[offset + 2],
  )));
  if (darkCorners >= 3 && probeMaximum > 24) {
    clearConnectedPixels(seed, original, width, height,
      (red, green, blue) => Math.max(red, green, blue) < 16);
  }
  if (brightCorners >= 2 && (
    probeMinimum < 205
    || probeMaximum - probeMinimum > 22
    || FORCE_BRIGHT_BACKGROUND_MODELS.has(modelKey)
  )) {
    clearConnectedPixels(seed, original, width, height, (red, green, blue) => {
      const backgroundDistance = Math.max(
        Math.abs(red - brightBackground[0]),
        Math.abs(green - brightBackground[1]),
        Math.abs(blue - brightBackground[2]),
      );
      // Existing catalog variants sometimes recolored the canvas too. The
      // original's top-center probes distinguish an external bright canvas
      // from a white door that fills the frame; the strict connected-color
      // flood then restores only that original canvas.
      return backgroundDistance < 10;
    });
  }
  if (EXTEND_FRAME_HIGHLIGHT_CATEGORIES.has(category)) {
    extendFrameHighlights(seed, original, width, height);
  }
  if (MODEL_FRAME_PAINT_REGIONS[modelKey]) {
    paintRectangles(seed, original, width, height, MODEL_FRAME_PAINT_REGIONS[modelKey]);
  }
  if (MODEL_MATERIAL_PAINT_REGIONS[modelKey]) {
    paintMaterialRectangles(seed, original, width, height,
      MODEL_MATERIAL_PAINT_REGIONS[modelKey]);
  }
  if (MODEL_PROTECT_REGIONS[modelKey]) {
    clearRectangles(seed, width, height, MODEL_PROTECT_REGIONS[modelKey]);
  }
  if (MODEL_HARDWARE_REGIONS[modelKey]
    && !stableHardwareRegions
    && !MODEL_VERTICAL_ORIGINAL_RESTORE[modelKey]
    && !MODEL_LOCAL_HARDWARE_RESTORE[modelKey]) {
    protectHardwareRegions(seed, original, width, height, MODEL_HARDWARE_REGIONS[modelKey]);
  }
  if (stableReferenceConfig) {
    protectStableReferenceRegions(
      seed, width, height, stableReferences, stableReferenceConfig,
    );
  }
  removeSmallPaintIslands(seed, width, height);
  return seed;
}

async function buildMask(modelPath, original, info) {
  const category = path.basename(path.dirname(modelPath));
  const slug = path.basename(modelPath);
  if (category === "MEDICA"
    && slug === "puerta-automatica-plana-hermetica-y-abatible") {
    return buildMedicaHermeticMask(original, info.width, info.height);
  }
  if (category === "CORREDIZA" && CORREDIZA_REGIONS[slug]) {
    return rectangleMask(info.width, info.height, CORREDIZA_REGIONS[slug], original);
  }
  return consensusMask(modelPath, original, info);
}

function maskedMedianLightness(original, mask) {
  const histogram = new Uint32Array(256);
  let total = 0;
  for (let pixel = 0, offset = 0; pixel < mask.length; pixel += 1, offset += 4) {
    if (mask[pixel] < 128) continue;
    const [lightness] = rgbToOklab(
      original[offset], original[offset + 1], original[offset + 2],
    );
    const bin = Math.max(0, Math.min(255, Math.round(lightness * 255)));
    histogram[bin] += 1;
    total += 1;
  }
  if (total === 0) throw new Error("The paintable mask is empty.");
  const midpoint = Math.floor(total / 2);
  let cumulative = 0;
  for (let bin = 0; bin < histogram.length; bin += 1) {
    cumulative += histogram[bin];
    if (cumulative >= midpoint) return bin / 255;
  }
  return 0.5;
}

function contrastForTarget(lightness) {
  if (lightness < 0.32) return 0.28;
  if (lightness < 0.48) return 0.42;
  if (lightness > 0.88) return 0.46;
  return 0.56;
}

function renderVariant(original, mask, targetHex, category) {
  const output = Buffer.from(original);
  const target = hexToOklab(targetHex);
  const median = maskedMedianLightness(original, mask);
  const contrast = contrastForTarget(target[0]);
  const preserveOriginalChroma = category === "MADERAACÚSTICA" ? 0.12 : 0.025;

  for (let pixel = 0, offset = 0; pixel < mask.length; pixel += 1, offset += 4) {
    const mix = mask[pixel] / 255;
    if (mix <= 0) continue;
    const source = rgbToOklab(
      original[offset], original[offset + 1], original[offset + 2],
    );
    const lightness = Math.max(0.035, Math.min(0.985,
      target[0] + (source[0] - median) * contrast));
    const highlightDesaturation = lightness > 0.86
      ? Math.max(0.42, 1 - (lightness - 0.86) * 2.5)
      : 1;
    const a = (target[1] * (1 - preserveOriginalChroma)
      + source[1] * preserveOriginalChroma) * highlightDesaturation;
    const b = (target[2] * (1 - preserveOriginalChroma)
      + source[2] * preserveOriginalChroma) * highlightDesaturation;
    const colorized = oklabToRgb(lightness, a, b);
    output[offset] = Math.round(original[offset] * (1 - mix) + colorized[0] * mix);
    output[offset + 1] = Math.round(original[offset + 1] * (1 - mix) + colorized[1] * mix);
    output[offset + 2] = Math.round(original[offset + 2] * (1 - mix) + colorized[2] * mix);
  }
  return output;
}

async function buildExistingPanelFrameMask(modelPath, original, info) {
  const { width, height } = info;
  const pixels = width * height;
  const slug = path.basename(modelPath);
  const category = path.basename(path.dirname(modelPath));
  const modelKey = `${category}/${slug}`;
  const negro = await loadRgba(path.join(modelPath, `door-${slug}-negro-ai.webp`));
  const blanco = await loadRgba(path.join(modelPath, `door-${slug}-blanco-ai.webp`));
  if (negro.info.width !== width || negro.info.height !== height
    || blanco.info.width !== width || blanco.info.height !== height) {
    throw new Error(`Dimension mismatch in frame references: ${modelPath}`);
  }

  const candidate = new Uint8Array(pixels);
  for (let pixel = 0; pixel < pixels; pixel += 1) {
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    const inOuterBand = x < width * 0.075 || x >= width * 0.925
      || y < height * 0.05 || y >= height * 0.965;
    if (!inOuterBand) continue;
    const offset = pixel * 4;
    const referenceDifference = Math.max(
      Math.abs(negro.data[offset] - blanco.data[offset]),
      Math.abs(negro.data[offset + 1] - blanco.data[offset + 1]),
      Math.abs(negro.data[offset + 2] - blanco.data[offset + 2]),
    );
    const maximum = Math.max(original[offset], original[offset + 1], original[offset + 2]);
    const minimum = Math.min(original[offset], original[offset + 1], original[offset + 2]);
    const luma = 0.2126 * original[offset]
      + 0.7152 * original[offset + 1]
      + 0.0722 * original[offset + 2];
    if (referenceDifference <= 70 && original[offset + 3] > 10
      && luma >= 4 && maximum < 252 && maximum - minimum < 100) {
      candidate[pixel] = 1;
    }
  }

  const mask = Buffer.alloc(pixels);
  const visited = new Uint8Array(pixels);
  const queue = new Int32Array(pixels);
  for (let start = 0; start < pixels; start += 1) {
    if (!candidate[start] || visited[start]) continue;
    let head = 0;
    let tail = 0;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    visited[start] = 1;
    queue[tail] = start;
    tail += 1;
    while (head < tail) {
      const pixel = queue[head];
      head += 1;
      const x = pixel % width;
      const y = Math.floor(pixel / width);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      const visit = (neighbor) => {
        if (!candidate[neighbor] || visited[neighbor]) return;
        visited[neighbor] = 1;
        queue[tail] = neighbor;
        tail += 1;
      };
      if (x > 0) visit(pixel - 1);
      if (x + 1 < width) visit(pixel + 1);
      if (y > 0) visit(pixel - width);
      if (y + 1 < height) visit(pixel + width);
    }
    const structural = (maxX - minX + 1) / width >= 0.12
      || (maxY - minY + 1) / height >= 0.12
      || tail >= pixels * 0.002;
    if (!structural) continue;
    for (let index = 0; index < tail; index += 1) mask[queue[index]] = 255;
  }

  paintMaterialRectangles(mask, original, width, height, [
    [0, 0, 0.075, 1, 4, 252],
    [0.925, 0, 1, 1, 4, 252],
    [0, 0, 1, 0.05, 4, 252],
    [0, 0.965, 1, 1, 4, 252],
  ]);
  if (MODEL_FRAME_PAINT_REGIONS[modelKey]) {
    paintRectangles(mask, original, width, height, MODEL_FRAME_PAINT_REGIONS[modelKey]);
  }
  if (MODEL_PROTECT_REGIONS[modelKey]) {
    clearRectangles(mask, width, height, MODEL_PROTECT_REGIONS[modelKey]);
  }
  if (MODEL_HARDWARE_REGIONS[modelKey]
    && !MODEL_VERTICAL_ORIGINAL_RESTORE[modelKey]) {
    protectStableReferenceRegions(mask, width, height, new Map([
      ["negro", negro.data],
      ["blanco", blanco.data],
    ]), {
      finishes: ["negro", "blanco"],
      regions: MODEL_HARDWARE_REGIONS[modelKey]
        .map(([left, top, regionWidth, regionHeight]) => (
          [left, top, left + regionWidth, top + regionHeight]
        )),
      threshold: 70,
      minimumComponent: 4,
      dilation: 0,
      excludeOuterFrame: true,
    });
  }
  if (MODEL_EXISTING_BASE_FORCE_PAINT_REGIONS[modelKey]) {
    paintForegroundRectangles(
      mask,
      original,
      width,
      height,
      MODEL_EXISTING_BASE_FORCE_PAINT_REGIONS[modelKey],
    );
  }
  removeSmallPaintIslands(mask, width, height);
  if (MODEL_EXISTING_BASE_SOLID_PAINT_REGIONS[modelKey]) {
    paintSolidRectangles(
      mask,
      width,
      height,
      MODEL_EXISTING_BASE_SOLID_PAINT_REGIONS[modelKey],
    );
  }
  if (MODEL_EXISTING_BASE_CLEAR_PAINT_REGIONS[modelKey]) {
    clearRectangles(
      mask,
      width,
      height,
      MODEL_EXISTING_BASE_CLEAR_PAINT_REGIONS[modelKey],
    );
  }
  // Solid frame repairs run after the first protection pass. Reapply the
  // stable hardware mask last so those repairs cannot recolor any metal.
  if (MODEL_HARDWARE_REGIONS[modelKey]
    && !MODEL_VERTICAL_ORIGINAL_RESTORE[modelKey]) {
    protectStableReferenceRegions(mask, width, height, new Map([
      ["negro", negro.data],
      ["blanco", blanco.data],
    ]), {
      finishes: ["negro", "blanco"],
      regions: MODEL_HARDWARE_REGIONS[modelKey]
        .map(([left, top, regionWidth, regionHeight]) => (
          [left, top, left + regionWidth, top + regionHeight]
        )),
      threshold: 70,
      minimumComponent: 4,
      dilation: 0,
      excludeOuterFrame: true,
    });
  }
  return mask;
}

function compositeMasked(base, overlay, mask) {
  const output = Buffer.from(base);
  for (let pixel = 0, offset = 0; pixel < mask.length; pixel += 1, offset += 4) {
    if (mask[pixel] < 128) continue;
    output[offset] = overlay[offset];
    output[offset + 1] = overlay[offset + 1];
    output[offset + 2] = overlay[offset + 2];
    output[offset + 3] = overlay[offset + 3];
  }
  return output;
}

function buildHardwareRestoreMask(reference, width, height, regions, options = {}) {
  const output = Buffer.alloc(width * height);
  for (const [left, top, regionWidth, regionHeight] of regions) {
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil((left + regionWidth) * width));
    const y1 = Math.min(height, Math.ceil((top + regionHeight) * height));
    const localWidth = x1 - x0;
    const localHeight = y1 - y0;
    if (localWidth < 2 || localHeight < 2) continue;

    const margin = Math.max(3, Math.round(Math.min(localWidth, localHeight) * 0.18));
    const ringLeft = Math.max(0, x0 - margin);
    const ringTop = Math.max(0, y0 - margin);
    const ringRight = Math.min(width, x1 + margin);
    const ringBottom = Math.min(height, y1 + margin);
    const reds = [];
    const greens = [];
    const blues = [];
    for (let y = ringTop; y < ringBottom; y += 1) {
      for (let x = ringLeft; x < ringRight; x += 1) {
        if (x >= x0 && x < x1 && y >= y0 && y < y1) continue;
        const offset = (y * width + x) * 4;
        reds.push(reference[offset]);
        greens.push(reference[offset + 1]);
        blues.push(reference[offset + 2]);
      }
    }
    const background = [median(reds), median(greens), median(blues)];
    const backgroundLuma = 0.2126 * background[0]
      + 0.7152 * background[1]
      + 0.0722 * background[2];
    const variation = median(reds.map((red, index) => Math.hypot(
      red - background[0],
      greens[index] - background[1],
      blues[index] - background[2],
    )));
    const threshold = options.minimumDifference
      ?? Math.max(18, Math.min(44, variation * 2.2 + 10));
    const lumaDelta = options.lumaDelta ?? 8;
    const area = localWidth * localHeight;
    const candidate = new Uint8Array(area);
    for (let localY = 0; localY < localHeight; localY += 1) {
      for (let localX = 0; localX < localWidth; localX += 1) {
        const offset = ((y0 + localY) * width + x0 + localX) * 4;
        const difference = Math.hypot(
          reference[offset] - background[0],
          reference[offset + 1] - background[1],
          reference[offset + 2] - background[2],
        );
        const luma = 0.2126 * reference[offset]
          + 0.7152 * reference[offset + 1]
          + 0.0722 * reference[offset + 2];
        if (difference >= threshold && luma <= backgroundLuma - lumaDelta) {
          candidate[localY * localWidth + localX] = 1;
        }
      }
    }

    const visited = new Uint8Array(area);
    const queue = new Int32Array(area);
    for (let start = 0; start < area; start += 1) {
      if (!candidate[start] || visited[start]) continue;
      let head = 0;
      let tail = 0;
      visited[start] = 1;
      queue[tail] = start;
      tail += 1;
      while (head < tail) {
        const pixel = queue[head];
        head += 1;
        const x = pixel % localWidth;
        const y = Math.floor(pixel / localWidth);
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (dx === 0 && dy === 0) continue;
            const nextX = x + dx;
            const nextY = y + dy;
            if (nextX < 0 || nextX >= localWidth || nextY < 0 || nextY >= localHeight) continue;
            const neighbor = nextY * localWidth + nextX;
            if (!candidate[neighbor] || visited[neighbor]) continue;
            visited[neighbor] = 1;
            queue[tail] = neighbor;
            tail += 1;
          }
        }
      }
      if (tail < (options.minimumComponent ?? 2)) continue;
      for (let index = 0; index < tail; index += 1) {
        const pixel = queue[index];
        const x = pixel % localWidth;
        const y = Math.floor(pixel / localWidth);
        output[(y0 + y) * width + x0 + x] = 255;
      }
    }
  }
  return output;
}

function buildVerticalOriginalRestoreMask(original, width, height, config) {
  const output = Buffer.alloc(width * height);
  const sampleGap = config.sampleGap ?? 4;
  const sampleDepth = config.sampleDepth ?? 12;
  const minimumDifference = config.minimumDifference ?? 18;
  const fullDifference = Math.max(
    minimumDifference + 1,
    config.fullDifference ?? 100,
  );

  for (const [left, top, right, bottom] of config.regions) {
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil(right * width));
    const y1 = Math.min(height, Math.ceil(bottom * height));
    const topSampleEnd = Math.max(0, y0 - sampleGap);
    const topSampleStart = Math.max(0, topSampleEnd - sampleDepth);
    const bottomSampleStart = Math.min(height, y1 + sampleGap);
    const bottomSampleEnd = Math.min(height, bottomSampleStart + sampleDepth);
    if (x1 <= x0 || y1 <= y0
      || topSampleEnd <= topSampleStart
      || bottomSampleEnd <= bottomSampleStart) continue;

    for (let x = x0; x < x1; x += 1) {
      const topChannels = [[], [], []];
      const bottomChannels = [[], [], []];
      for (let y = topSampleStart; y < topSampleEnd; y += 1) {
        const offset = (y * width + x) * 4;
        for (let channel = 0; channel < 3; channel += 1) {
          topChannels[channel].push(original[offset + channel]);
        }
      }
      for (let y = bottomSampleStart; y < bottomSampleEnd; y += 1) {
        const offset = (y * width + x) * 4;
        for (let channel = 0; channel < 3; channel += 1) {
          bottomChannels[channel].push(original[offset + channel]);
        }
      }
      const topColor = topChannels.map((values) => median(values));
      const bottomColor = bottomChannels.map((values) => median(values));
      for (let y = y0; y < y1; y += 1) {
        const progress = (y - y0) / Math.max(1, y1 - y0 - 1);
        const offset = (y * width + x) * 4;
        let differenceSquared = 0;
        for (let channel = 0; channel < 3; channel += 1) {
          const background = topColor[channel]
            + (bottomColor[channel] - topColor[channel]) * progress;
          const delta = original[offset + channel] - background;
          differenceSquared += delta * delta;
        }
        const difference = Math.sqrt(differenceSquared);
        const normalized = Math.max(0, Math.min(1,
          (difference - minimumDifference) / (fullDifference - minimumDifference)));
        const smooth = normalized * normalized * (3 - 2 * normalized);
        output[y * width + x] = Math.max(
          output[y * width + x],
          Math.round(smooth * 255),
        );
      }
    }
  }
  return output;
}

function estimateVerticalCleanPlate(image, width, height, object) {
  const [x0, y0, x1, y1] = object.bounds;
  const gap = object.sampleGap;
  const depth = object.sampleDepth;
  const topStart = Math.max(0, y0 - gap - depth);
  const topEnd = Math.max(0, y0 - gap);
  const bottomStart = Math.min(height, y1 + gap);
  const bottomEnd = Math.min(height, y1 + gap + depth);
  const plate = Buffer.alloc((x1 - x0) * (y1 - y0) * 4);

  for (let x = x0; x < x1; x += 1) {
    const topChannels = [[], [], []];
    const bottomChannels = [[], [], []];
    for (let y = topStart; y < topEnd; y += 1) {
      const offset = (y * width + x) * 4;
      for (let channel = 0; channel < 3; channel += 1) {
        topChannels[channel].push(image[offset + channel]);
      }
    }
    for (let y = bottomStart; y < bottomEnd; y += 1) {
      const offset = (y * width + x) * 4;
      for (let channel = 0; channel < 3; channel += 1) {
        bottomChannels[channel].push(image[offset + channel]);
      }
    }
    let topColor = topChannels.map((values) => median(values));
    let bottomColor = bottomChannels.map((values) => median(values));
    if (object.sampleMode === "bottom") topColor = bottomColor;
    if (object.sampleMode === "top") bottomColor = topColor;
    for (let y = y0; y < y1; y += 1) {
      const progress = (y - y0) / Math.max(1, y1 - y0 - 1);
      const local = ((y - y0) * (x1 - x0) + x - x0) * 4;
      for (let channel = 0; channel < 3; channel += 1) {
        plate[local + channel] = Math.round(
          topColor[channel] + (bottomColor[channel] - topColor[channel]) * progress,
        );
      }
      plate[local + 3] = 255;
    }
  }
  return plate;
}

function localHardwareAllowedAlpha(x, y, config) {
  const featherAlpha = (signedDistance, feather) => {
    if (signedDistance <= -feather) return 255;
    if (signedDistance >= 0) return 0;
    const normalized = -signedDistance / feather;
    return Math.round(255 * normalized * normalized * (3 - 2 * normalized));
  };
  const px = x + 0.5;
  const py = y + 0.5;
  let alpha = 0;
  for (const [centerX, centerY, radiusX, radiusY, feather] of config.allowEllipses) {
    const radial = Math.hypot((px - centerX) / radiusX, (py - centerY) / radiusY);
    alpha = Math.max(alpha, featherAlpha(
      (radial - 1) * Math.min(radiusX, radiusY), feather,
    ));
  }
  for (const [x0, y0, x1, y1, radius, feather] of config.allowCapsules) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const lengthSquared = dx * dx + dy * dy;
    const progress = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1,
      ((px - x0) * dx + (py - y0) * dy) / lengthSquared));
    const nearestX = x0 + progress * dx;
    const nearestY = y0 + progress * dy;
    alpha = Math.max(alpha, featherAlpha(
      Math.hypot(px - nearestX, py - nearestY) - radius, feather,
    ));
  }
  for (const [x0, y0, x1, y1, radius, feather] of config.allowRoundedRects) {
    const centerX = (x0 + x1) / 2;
    const centerY = (y0 + y1) / 2;
    const qx = Math.abs(px - centerX) - ((x1 - x0) / 2 - radius);
    const qy = Math.abs(py - centerY) - ((y1 - y0) / 2 - radius);
    const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
    const inside = Math.min(Math.max(qx, qy), 0);
    alpha = Math.max(alpha, featherAlpha(outside + inside - radius, feather));
  }
  return alpha;
}

function buildLocalHardwareRestoreMask(original, width, height, config) {
  const raw = Buffer.alloc(width * height);
  for (const object of config.objects) {
    if (object.detect === false) continue;
    const [x0, y0, x1, y1] = object.bounds;
    const plate = estimateVerticalCleanPlate(original, width, height, object);
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const offset = (y * width + x) * 4;
        const local = ((y - y0) * (x1 - x0) + x - x0) * 4;
        const difference = Math.hypot(
          original[offset] - plate[local],
          original[offset + 1] - plate[local + 1],
          original[offset + 2] - plate[local + 2],
        );
        const normalized = Math.max(0, Math.min(1,
          (difference - object.min) / (object.full - object.min)));
        const smooth = normalized * normalized * (3 - 2 * normalized);
        raw[y * width + x] = Math.max(
          raw[y * width + x], Math.round(smooth * 255),
        );
      }
    }
  }

  const mask = Buffer.alloc(width * height);
  for (let pixel = 0; pixel < raw.length; pixel += 1) {
    if (raw[pixel] < config.alphaCutoff) continue;
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    const allowed = localHardwareAllowedAlpha(x, y, config);
    if (allowed === 0) continue;
    const boosted = Math.round(255 * ((raw[pixel] / 255) ** config.alphaGamma));
    const shaped = Math.round(boosted * allowed / 255);
    mask[pixel] = shaped >= config.solidAt ? 255 : shaped;
  }

  const applyCore = (alphaAt) => {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const alpha = alphaAt(x, y);
        const pixel = y * width + x;
        if (alpha > mask[pixel]) mask[pixel] = alpha;
      }
    }
  };
  for (const [centerX, centerY, radiusX, radiusY, feather] of config.coreEllipses) {
    applyCore((x, y) => {
      const radial = Math.hypot(
        (x + 0.5 - centerX) / radiusX,
        (y + 0.5 - centerY) / radiusY,
      );
      if (radial <= 1 - feather / Math.max(radiusX, radiusY)) return 255;
      if (radial >= 1) return 0;
      return Math.round(255 * (1 - radial) * Math.max(radiusX, radiusY) / feather);
    });
  }
  for (const [x0, y0, x1, y1, feather] of config.coreRects) {
    applyCore((x, y) => {
      const distance = Math.min(
        x + 0.5 - x0, x1 - x - 0.5, y + 0.5 - y0, y1 - y - 0.5,
      );
      if (distance <= 0) return 0;
      if (distance >= feather) return 255;
      return Math.round(255 * distance / feather);
    });
  }
  for (const [centerX, centerY, radiusX, radiusY, feather] of config.fixedEllipses || []) {
    const left = Math.max(0, Math.floor(centerX - radiusX));
    const right = Math.min(width, Math.ceil(centerX + radiusX));
    const top = Math.max(0, Math.floor(centerY - radiusY));
    const bottom = Math.min(height, Math.ceil(centerY + radiusY));
    for (let y = top; y < bottom; y += 1) {
      for (let x = left; x < right; x += 1) {
        const radial = Math.hypot(
          (x + 0.5 - centerX) / radiusX,
          (y + 0.5 - centerY) / radiusY,
        );
        const distance = (radial - 1) * Math.min(radiusX, radiusY);
        let alpha = 0;
        if (distance <= -feather) alpha = 255;
        else if (distance < 0) {
          const normalized = -distance / feather;
          alpha = Math.round(255 * normalized * normalized * (3 - 2 * normalized));
        }
        const pixel = y * width + x;
        if (alpha > mask[pixel]) mask[pixel] = alpha;
      }
    }
  }
  for (const [x0, y0, x1, y1] of config.maskClearRects || []) {
    for (let y = Math.max(0, y0); y < Math.min(height, y1); y += 1) {
      mask.fill(0, y * width + Math.max(0, x0), y * width + Math.min(width, x1));
    }
  }
  return mask;
}

function repairHorizontalArtifacts(base, width, height, repairs = []) {
  const output = Buffer.from(base);
  for (const repair of repairs) {
    const [x0, y0, x1, y1] = repair.bounds;
    const leftStart = Math.max(0, x0 - repair.sampleGap - repair.sampleDepth);
    const leftEnd = Math.max(0, x0 - repair.sampleGap);
    const rightStart = Math.min(width, x1 + repair.sampleGap);
    const rightEnd = Math.min(width, x1 + repair.sampleGap + repair.sampleDepth);
    for (let y = Math.max(0, y0); y < Math.min(height, y1); y += 1) {
      const leftChannels = [[], [], [], []];
      const rightChannels = [[], [], [], []];
      for (let x = leftStart; x < leftEnd; x += 1) {
        const offset = (y * width + x) * 4;
        for (let channel = 0; channel < 4; channel += 1) {
          leftChannels[channel].push(base[offset + channel]);
        }
      }
      for (let x = rightStart; x < rightEnd; x += 1) {
        const offset = (y * width + x) * 4;
        for (let channel = 0; channel < 4; channel += 1) {
          rightChannels[channel].push(base[offset + channel]);
        }
      }
      const leftColor = leftChannels.map((values) => median(values));
      const rightColor = rightChannels.map((values) => median(values));
      for (let x = Math.max(0, x0); x < Math.min(width, x1); x += 1) {
        const progress = (x - x0) / Math.max(1, x1 - x0 - 1);
        const offset = (y * width + x) * 4;
        for (let channel = 0; channel < 4; channel += 1) {
          output[offset + channel] = Math.round(
            leftColor[channel] + (rightColor[channel] - leftColor[channel]) * progress,
          );
        }
      }
    }
  }
  return output;
}

function restoreLocalHardware(base, original, mask, width, height, config) {
  let output = repairHorizontalArtifacts(base, width, height, config.horizontalRepairs);
  for (const object of config.objects) {
    const [x0, y0, x1, y1] = object.bounds;
    const originalPlate = estimateVerticalCleanPlate(original, width, height, object);
    const targetPlate = estimateVerticalCleanPlate(output, width, height, object);
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const pixel = y * width + x;
        const offset = pixel * 4;
        const local = ((y - y0) * (x1 - x0) + x - x0) * 4;
        const alpha = mask[pixel] / 255;
        if (alpha <= 0) {
          for (let channel = 0; channel < 3; channel += 1) {
            output[offset + channel] = targetPlate[local + channel];
          }
          continue;
        }
        const foreground = [0, 1, 2].map((channel) => (alpha >= 0.999
          ? original[offset + channel]
          : (original[offset + channel]
            - (1 - alpha) * originalPlate[local + channel]) / alpha));
        const foregroundChroma = Math.max(...foreground) - Math.min(...foreground);
        if (config.neutralForeground
          && (!config.neutralForegroundEdgeOnly
            || alpha < 0.98
            || foregroundChroma > 12)) {
          const neutral = 0.2126 * foreground[0]
            + 0.7152 * foreground[1]
            + 0.0722 * foreground[2];
          foreground.fill(neutral);
        }
        for (let channel = 0; channel < 3; channel += 1) {
          output[offset + channel] = Math.max(0, Math.min(255, Math.round(
            alpha * foreground[channel] + (1 - alpha) * targetPlate[local + channel],
          )));
        }
      }
    }
  }
  for (const [x, y] of config.pointRepairs || []) {
    if (x <= 0 || x >= width - 1 || y < 0 || y >= height) continue;
    const offset = (y * width + x) * 4;
    for (let channel = 0; channel < 3; channel += 1) {
      output[offset + channel] = Math.round(
        (output[offset - 4 + channel] + output[offset + 4 + channel]) / 2,
      );
    }
  }
  return output;
}

function compositeAlphaMasked(base, overlay, mask) {
  const output = Buffer.from(base);
  for (let pixel = 0, offset = 0; pixel < mask.length; pixel += 1, offset += 4) {
    const alpha = mask[pixel];
    if (alpha === 0) continue;
    if (alpha === 255) {
      overlay.copy(output, offset, offset, offset + 4);
      continue;
    }
    const inverse = 255 - alpha;
    for (let channel = 0; channel < 4; channel += 1) {
      output[offset + channel] = Math.round(
        (overlay[offset + channel] * alpha + output[offset + channel] * inverse) / 255,
      );
    }
  }
  return output;
}

function copyOriginalRectangles(base, original, width, height, rectangles) {
  const output = Buffer.from(base);
  for (const [left, top, right, bottom] of rectangles) {
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil(right * width));
    const y1 = Math.min(height, Math.ceil(bottom * height));
    for (let y = y0; y < y1; y += 1) {
      const start = (y * width + x0) * 4;
      const end = (y * width + x1) * 4;
      original.copy(output, start, start, end);
    }
  }
  return output;
}

function copyOriginalBrightRectangles(base, original, width, height, rectangles) {
  const output = Buffer.from(base);
  for (const [left, top, right, bottom, minimumLuma = 220,
    fullLuma = 250] of rectangles) {
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil(right * width));
    const y1 = Math.min(height, Math.ceil(bottom * height));
    const range = Math.max(1, fullLuma - minimumLuma);
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const offset = (y * width + x) * 4;
        const luma = 0.2126 * original[offset]
          + 0.7152 * original[offset + 1]
          + 0.0722 * original[offset + 2];
        const normalized = Math.max(0, Math.min(1, (luma - minimumLuma) / range));
        if (normalized === 0) continue;
        const alpha = normalized * normalized * (3 - 2 * normalized);
        for (let channel = 0; channel < 4; channel += 1) {
          output[offset + channel] = Math.round(
            original[offset + channel] * alpha + output[offset + channel] * (1 - alpha),
          );
        }
      }
    }
  }
  return output;
}

function copyOriginalDarkRectangles(base, original, width, height, rectangles) {
  const output = Buffer.from(base);
  for (const [left, top, right, bottom, fullLuma = 80,
    maximumLuma = 200] of rectangles) {
    const x0 = Math.max(0, Math.floor(left * width));
    const y0 = Math.max(0, Math.floor(top * height));
    const x1 = Math.min(width, Math.ceil(right * width));
    const y1 = Math.min(height, Math.ceil(bottom * height));
    const range = Math.max(1, maximumLuma - fullLuma);
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const offset = (y * width + x) * 4;
        const luma = 0.2126 * original[offset]
          + 0.7152 * original[offset + 1]
          + 0.0722 * original[offset + 2];
        const normalized = Math.max(0, Math.min(1, (maximumLuma - luma) / range));
        if (normalized === 0) continue;
        const alpha = normalized * normalized * (3 - 2 * normalized);
        for (let channel = 0; channel < 4; channel += 1) {
          output[offset + channel] = Math.round(
            original[offset + channel] * alpha + output[offset + channel] * (1 - alpha),
          );
        }
      }
    }
  }
  return output;
}

function copyOriginalPolygons(base, original, width, height, polygons) {
  const output = Buffer.from(base);
  for (const polygonConfig of polygons) {
    const normalizedPolygon = Array.isArray(polygonConfig)
      ? polygonConfig
      : polygonConfig.points;
    const maximumLuma = Array.isArray(polygonConfig)
      ? null
      : polygonConfig.maximumLuma;
    const polygon = normalizedPolygon.map(([x, y]) => [x * width, y * height]);
    const minX = Math.max(0, Math.floor(Math.min(...polygon.map(([x]) => x))));
    const maxX = Math.min(width, Math.ceil(Math.max(...polygon.map(([x]) => x))));
    const minY = Math.max(0, Math.floor(Math.min(...polygon.map(([, y]) => y))));
    const maxY = Math.min(height, Math.ceil(Math.max(...polygon.map(([, y]) => y))));
    for (let y = minY; y < maxY; y += 1) {
      for (let x = minX; x < maxX; x += 1) {
        let inside = false;
        for (let index = 0, previous = polygon.length - 1;
          index < polygon.length;
          previous = index, index += 1) {
          const [x1, y1] = polygon[index];
          const [x2, y2] = polygon[previous];
          const crosses = (y1 > y + 0.5) !== (y2 > y + 0.5)
            && x + 0.5 < ((x2 - x1) * (y + 0.5 - y1)) / (y2 - y1) + x1;
          if (crosses) inside = !inside;
        }
        if (!inside) continue;
        const offset = (y * width + x) * 4;
        if (maximumLuma !== null && maximumLuma !== undefined) {
          const luma = 0.2126 * original[offset]
            + 0.7152 * original[offset + 1]
            + 0.0722 * original[offset + 2];
          if (luma > maximumLuma) continue;
        }
        original.copy(output, offset, offset, offset + 4);
      }
    }
  }
  return output;
}

function copyOriginalEllipses(base, original, width, height, ellipses) {
  const output = Buffer.from(base);
  for (const [normalizedX, normalizedY, normalizedRadiusX, normalizedRadiusY,
    maximumLuma] of ellipses) {
    const centerX = normalizedX * width;
    const centerY = normalizedY * height;
    const radiusX = normalizedRadiusX * width;
    const radiusY = normalizedRadiusY * height;
    const minX = Math.max(0, Math.floor(centerX - radiusX));
    const maxX = Math.min(width, Math.ceil(centerX + radiusX));
    const minY = Math.max(0, Math.floor(centerY - radiusY));
    const maxY = Math.min(height, Math.ceil(centerY + radiusY));
    for (let y = minY; y < maxY; y += 1) {
      for (let x = minX; x < maxX; x += 1) {
        const dx = (x + 0.5 - centerX) / radiusX;
        const dy = (y + 0.5 - centerY) / radiusY;
        if (dx * dx + dy * dy > 1) continue;
        const offset = (y * width + x) * 4;
        if (maximumLuma !== undefined) {
          const luma = 0.2126 * original[offset]
            + 0.7152 * original[offset + 1]
            + 0.0722 * original[offset + 2];
          if (luma > maximumLuma) continue;
        }
        original.copy(output, offset, offset, offset + 4);
      }
    }
  }
  return output;
}

async function saveMask(mask, info, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  await sharp(mask, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

function preserveTransparentCanvas(buffer, original) {
  const output = Buffer.from(buffer);
  let hasTransparency = false;
  for (let offset = 0; offset < output.length; offset += 4) {
    const alpha = original[offset + 3];
    if (alpha === 255) continue;
    hasTransparency = true;
    if (alpha === 0) {
      // libwebp is free to assign arbitrary RGB values to fully transparent
      // pixels. Some catalog viewers expose those hidden values as colored
      // blocks, so retain an effectively transparent, deterministic black
      // canvas instead.
      output[offset] = 0;
      output[offset + 1] = 0;
      output[offset + 2] = 0;
      output[offset + 3] = 1;
    } else if (alpha < 16) {
      // Preserve the untouched antialias around the manufactured silhouette.
      output[offset] = original[offset];
      output[offset + 1] = original[offset + 1];
      output[offset + 2] = original[offset + 2];
      output[offset + 3] = alpha;
    }
  }
  return { buffer: output, hasTransparency };
}

async function saveWebp(
  buffer,
  info,
  destination,
  quality,
  deferOverwrite = false,
  lossless = false,
) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const outputPath = deferOverwrite ? `${destination}.tmp` : destination;
  if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  await sharp(buffer, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .keepIccProfile()
    .webp(lossless ? {
      quality,
      effort: 6,
      lossless: true,
    } : {
      quality,
      alphaQuality: 100,
      effort: 6,
      nearLossless: true,
      smartSubsample: true,
    })
    .toFile(outputPath);
}

async function processModel(modelPath, options) {
  const originalPath = path.join(modelPath, "original.webp");
  if (!fs.existsSync(originalPath)) throw new Error(`Missing ${originalPath}`);
  const source = await loadRgba(originalPath);
  const category = path.basename(path.dirname(modelPath));
  const slug = path.basename(modelPath);
  const modelKey = `${category}/${slug}`;
  const mask = EXISTING_PANEL_BASE_CATEGORIES.has(category)
    ? await buildExistingPanelFrameMask(modelPath, source.data, source.info)
    : await buildMask(modelPath, source.data, source.info);
  const originalBaseFinishConfig = MODEL_ORIGINAL_BASE_FINISHES[modelKey];
  const usesOriginalBase = (finishSlug) => originalBaseFinishConfig === "*"
    || originalBaseFinishConfig?.includes(finishSlug);
  let originalBaseMask = null;
  if (originalBaseFinishConfig) {
    if (MODEL_FULL_FOREGROUND_ORIGINAL_BASE.has(modelKey)) {
      originalBaseMask = Buffer.alloc(source.info.width * source.info.height);
      paintForegroundRectangles(
        originalBaseMask,
        source.data,
        source.info.width,
        source.info.height,
        [[0, 0, 1, 1]],
      );
    } else {
      originalBaseMask = await buildMask(modelPath, source.data, source.info);
    }
    if (MODEL_EXISTING_BASE_FORCE_PAINT_REGIONS[modelKey]) {
      paintForegroundRectangles(
        originalBaseMask,
        source.data,
        source.info.width,
        source.info.height,
        MODEL_EXISTING_BASE_FORCE_PAINT_REGIONS[modelKey],
      );
    }
    removeSmallPaintIslands(originalBaseMask, source.info.width, source.info.height);
    if (MODEL_EXISTING_BASE_SOLID_PAINT_REGIONS[modelKey]) {
      paintSolidRectangles(
        originalBaseMask,
        source.info.width,
        source.info.height,
        MODEL_EXISTING_BASE_SOLID_PAINT_REGIONS[modelKey],
      );
    }
    if (MODEL_EXISTING_BASE_CLEAR_PAINT_REGIONS[modelKey]
      && !MODEL_ORIGINAL_BASE_SKIP_CLEAR.has(modelKey)) {
      clearRectangles(
        originalBaseMask,
        source.info.width,
        source.info.height,
        MODEL_EXISTING_BASE_CLEAR_PAINT_REGIONS[modelKey],
      );
    }
  }
  const referenceCache = new Map();
  const getReference = async (finishSlug) => {
    if (referenceCache.has(finishSlug)) return referenceCache.get(finishSlug);
    const referencePath = path.join(modelPath, `door-${slug}-${finishSlug}-ai.webp`);
    const reference = await loadRgba(referencePath);
    if (reference.info.width !== source.info.width
      || reference.info.height !== source.info.height) {
      throw new Error(`Dimension mismatch: ${referencePath}`);
    }
    referenceCache.set(finishSlug, reference);
    return reference;
  };
  let originalRestoreMask = null;
  const restoreConfig = MODEL_ORIGINAL_RESTORE[modelKey];
  if (restoreConfig) {
    const reference = restoreConfig.referenceFinish === "original"
      ? source
      : await getReference(restoreConfig.referenceFinish);
    originalRestoreMask = buildHardwareRestoreMask(
      reference.data,
      source.info.width,
      source.info.height,
      restoreConfig.regions.map(([left, top, right, bottom]) => (
        [left, top, right - left, bottom - top, false]
      )),
      restoreConfig,
    );
  }
  const verticalRestoreConfig = MODEL_VERTICAL_ORIGINAL_RESTORE[modelKey];
  const verticalOriginalRestoreMask = verticalRestoreConfig
    ? buildVerticalOriginalRestoreMask(
      source.data,
      source.info.width,
      source.info.height,
      verticalRestoreConfig,
    )
    : null;
  const localHardwareConfig = MODEL_LOCAL_HARDWARE_RESTORE[modelKey];
  const localHardwareRestoreMask = localHardwareConfig
    ? buildLocalHardwareRestoreMask(
      source.data,
      source.info.width,
      source.info.height,
      localHardwareConfig,
    )
    : null;
  const expectedMaskBytes = source.info.width * source.info.height;
  if (mask.length !== expectedMaskBytes) {
    throw new Error(
      `Invalid mask size for ${category}/${slug}: ${mask.length} bytes; expected ${expectedMaskBytes}.`,
    );
  }

  if (options.maskRoot) {
    await saveMask(mask, source.info, path.join(options.maskRoot, category, `${slug}.png`));
  }

  const finishes = options.finishes
    ? FINISHES.filter(({ slug: finish }) => options.finishes.has(finish))
    : FINISHES;
  for (const finish of finishes) {
    const filename = `door-${slug}-${finish.slug}-ai.webp`;
    const destination = options.overwrite
      ? path.join(modelPath, filename)
      : path.join(options.outputRoot, category, slug, filename);
    if (isAuditedVariant(modelKey, finish.slug)) {
      const approvedPath = path.join(modelPath, filename);
      if (!fs.existsSync(approvedPath)) throw new Error(`Missing audited variant ${approvedPath}`);
      if (!options.overwrite) {
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.copyFileSync(approvedPath, destination);
      }
      continue;
    }
    const finishModelKey = `${modelKey}/${finish.slug}`;
    const finishForceRegions = MODEL_EXISTING_BASE_FINISH_FORCE_PAINT_REGIONS[
      finishModelKey
    ];
    const finishSolidRegions = MODEL_EXISTING_BASE_FINISH_SOLID_PAINT_REGIONS[
      finishModelKey
    ];
    const baseMask = usesOriginalBase(finish.slug) ? originalBaseMask : mask;
    const finishMask = finishForceRegions || finishSolidRegions ? Buffer.from(baseMask) : baseMask;
    if (finishForceRegions) {
      paintForegroundRectangles(
        finishMask,
        source.data,
        source.info.width,
        source.info.height,
        finishForceRegions,
      );
    }
    if (finishSolidRegions) {
      paintSolidRectangles(
        finishMask,
        source.info.width,
        source.info.height,
        finishSolidRegions,
      );
    }
    let rendered;
    if (EXISTING_PANEL_BASE_CATEGORIES.has(category) && !usesOriginalBase(finish.slug)) {
      const existingPath = path.join(modelPath, filename);
      const existing = await loadRgba(existingPath);
      if (existing.info.width !== source.info.width || existing.info.height !== source.info.height) {
        throw new Error(`Dimension mismatch: ${existingPath}`);
      }
      const recoloredFrame = renderVariant(source.data, finishMask, finish.hex, category);
      rendered = compositeMasked(existing.data, recoloredFrame, finishMask);
    } else {
      rendered = renderVariant(source.data, finishMask, finish.hex, category);
    }
    if (originalRestoreMask && !restoreConfig.skipFinishes?.includes(finish.slug)) {
      rendered = compositeMasked(rendered, source.data, originalRestoreMask);
    }
    if (verticalOriginalRestoreMask) {
      rendered = compositeAlphaMasked(rendered, source.data, verticalOriginalRestoreMask);
    }
    if (MODEL_ORIGINAL_COPY_REGIONS[modelKey]) {
      rendered = copyOriginalRectangles(
        rendered,
        source.data,
        source.info.width,
        source.info.height,
        MODEL_ORIGINAL_COPY_REGIONS[modelKey],
      );
    }
    if (MODEL_ORIGINAL_COPY_BRIGHT_REGIONS[modelKey]) {
      rendered = copyOriginalBrightRectangles(
        rendered,
        source.data,
        source.info.width,
        source.info.height,
        MODEL_ORIGINAL_COPY_BRIGHT_REGIONS[modelKey],
      );
    }
    if (MODEL_ORIGINAL_COPY_DARK_REGIONS[modelKey]) {
      rendered = copyOriginalDarkRectangles(
        rendered,
        source.data,
        source.info.width,
        source.info.height,
        MODEL_ORIGINAL_COPY_DARK_REGIONS[modelKey],
      );
    }
    if (MODEL_ORIGINAL_COPY_POLYGONS[modelKey]) {
      rendered = copyOriginalPolygons(
        rendered,
        source.data,
        source.info.width,
        source.info.height,
        MODEL_ORIGINAL_COPY_POLYGONS[modelKey],
      );
    }
    if (MODEL_ORIGINAL_COPY_ELLIPSES[modelKey]) {
      rendered = copyOriginalEllipses(
        rendered,
        source.data,
        source.info.width,
        source.info.height,
        MODEL_ORIGINAL_COPY_ELLIPSES[modelKey],
      );
    }
    const finishCopyRegions = MODEL_FINISH_ORIGINAL_COPY_REGIONS[
      `${modelKey}/${finish.slug}`
    ];
    if (finishCopyRegions) {
      rendered = copyOriginalRectangles(
        rendered,
        source.data,
        source.info.width,
        source.info.height,
        finishCopyRegions,
      );
    }
    if (localHardwareRestoreMask) {
      rendered = restoreLocalHardware(
        rendered,
        source.data,
        localHardwareRestoreMask,
        source.info.width,
        source.info.height,
        localHardwareConfig,
      );
    }
    const transparentCanvas = preserveTransparentCanvas(rendered, source.data);
    await saveWebp(
      transparentCanvas.buffer,
      source.info,
      destination,
      options.quality,
      options.overwrite,
      transparentCanvas.hasTransparency,
    );
  }
  return `${category}/${slug} ${source.info.width}x${source.info.height} ${finishes.length} variants`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const models = discoverModels(options);
  for (let index = 0; index < models.length; index += 1) {
    const summary = await processModel(models[index], options);
    console.log(`[${index + 1}/${models.length}] ${summary}`);
  }
  console.log(options.overwrite
    ? `Prepared deferred replacements for ${models.length} model folder(s).`
    : `Preview written to ${options.outputRoot}`);
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exit(1);
});
