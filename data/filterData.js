// data/filterData.js

export const filterOptions = {
  series: ["LAMINATE", "LACQUERED", "WOOD"],
  models: ["MALTA H", "MALTA L", "120", "200", "400", "810"],
  decorations: ["NO DECORATION", "VIVA MARRÓN", "METAL DECORATION", "BLACK GROOVE"],
  glazed: ["1 CRISTAL", "3 CRISTALES", "4 CRISTALES", "SIN CRISTALES"],
  finishes: [
    { name: "Slovenian Ash", color: "#E8E0D5" }, // Colores aproximados a la imagen
    { name: "Angora", color: "#D1C7B7" },
    { name: "Arena", color: "#E0D6C2" },
    { name: "Nogal", color: "#8B5A2B" },
    { name: "Arctic Oak", color: "#F0F0F0" },
    { name: "Coffee Oak", color: "#6F4E37" },
    { name: "Gold Oak", color: "#C19A6B" },
    { name: "Roble Nature", color: "#D2B48C" },
    { name: "Nordic Oak", color: "#EFEBD6" },
    { name: "Urban Oak", color: "#A89F91" },
    { name: "Villa Gris", color: "#B0B0B0" },
  ]
};

// Simulamos algunos productos para que aparezcan en la derecha
export const products = [
  { id: 1, model: "200", finish: "Fresno Eslovenia", detail: "Viva Marrón, 1 Cristal", img: "/images/door-sample-1.jpg" }, // Usa una imagen genérica por ahora
  { id: 2, model: "200", finish: "Fresno Eslovenia", detail: "Viva Marrón, 1 Cristal", img: "/images/door-sample-1.jpg" },
  { id: 3, model: "200", finish: "Fresno Eslovenia", detail: "Viva Marrón, 3 Cristales", img: "/images/door-sample-1.jpg" },
  { id: 4, model: "200", finish: "Fresno Eslovenia", detail: "Viva Marrón, 4 Cristales", img: "/images/door-sample-1.jpg" },
  { id: 5, model: "200", finish: "Fresno Eslovenia", detail: "Viva Marrón, Sin Cristales", img: "/images/door-sample-1.jpg" },
  { id: 6, model: "200", finish: "Fresno Eslovenia", detail: "Viva Metal, Sin Cristales", img: "/images/door-sample-1.jpg" },
  { id: 7, model: "400", finish: "Nogal", detail: "3 Cristales", img: "/images/door-sample-1.jpg" },
  { id: 8, model: "MALTA H", finish: "Angora", detail: "Ciego", img: "/images/door-sample-1.jpg" },
];