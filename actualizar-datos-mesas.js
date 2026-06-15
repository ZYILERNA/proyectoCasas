// Actualiza mesas: agrega colores_disponibles[], materiales_disponibles[]
// y reemplaza colors.{interior|marble|wood} con colors.interior + image por producto
const fs = require('fs');
const path = require('path');

const MESAS_DATA = {
    // MESA1-20
    "mesa-hyjl82103":              { colores: ["Marrón"],                      materiales: ["Mármol", "Metal"],             interior: [{ name: "Marrón",   hex: "#8B6914", image: "/images/MESAS/MESA1/render.webp" }] },
    "mesa-auxiliar-ancient":       { colores: ["Gris", "Dorado"],              materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#6B6D6E", image: "/images/MESAS/MESA2/render.webp" }] },
    "mesa-rincon-zilo":            { colores: ["Rojo"],                         materiales: ["Mármol", "Metal"],             interior: [{ name: "Rojo",     hex: "#7A3532", image: "/images/MESAS/MESA3/render.webp" }] },
    "mesa-rincon-snow":            { colores: ["Blanco"],                       materiales: ["Mármol", "Metal"],             interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA4/render.webp" }] },
    "set-mesa-brasilia":           { colores: ["Negro"],                        materiales: ["Mármol", "Metal", "Madera"],   interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA5/render.webp" }] },
    "mesa-centro-brasilia":        { colores: ["Gris", "Negro"],               materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA6/render.webp" }] },
    "mesa-centro-emerald":         { colores: ["Verde", "Negro"],              materiales: ["Mármol", "Metal"],             interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA7/render.webp" }] },
    "mesa-auxiliar-prada":         { colores: ["Verde", "Negro"],              materiales: ["Mármol", "Metal"],             interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA8/render.webp" }] },
    "mesa-centro-silver":          { colores: ["Plateado"],                     materiales: ["Metal", "Mármol"],             interior: [{ name: "Plateado", hex: "#C0C0C0", image: "/images/MESAS/MESA9/render.webp" }] },
    "mesa-auxiliar-silver":        { colores: ["Plateado"],                     materiales: ["Metal"],                       interior: [{ name: "Plateado", hex: "#C0C0C0", image: "/images/MESAS/MESA10/render.webp" }] },
    "mesa-centro-milky-way":       { colores: ["Negro"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA11/render.webp" }] },
    "mesa-centro-snow-mountain":   { colores: ["Blanco", "Negro"],             materiales: ["Mármol", "Metal"],             interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA12/render.webp" }] },
    "mesa-auxiliar-milky-way":     { colores: ["Negro"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA13/render.webp" }] },
    "mesa-centro-snow-white-rect": { colores: ["Blanco"],                       materiales: ["Mármol", "Metal"],             interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA14/render.webp" }] },
    "mesa-centro-lan-kwai":        { colores: ["Beige"],                        materiales: ["Piedra", "Metal"],             interior: [{ name: "Beige",    hex: "#C8B68A", image: "/images/MESAS/MESA15/render.webp" }] },
    "mesa-rincon-ancient-wood":    { colores: ["Negro"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA16/render.webp" }] },
    "set-mesa-ancient-zilo":       { colores: ["Negro", "Rojo"],               materiales: ["Mármol", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA17/render.webp" }, { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA17/render.webp" }] },
    "set-mesa-organic-black":      { colores: ["Negro"],                        materiales: ["Madera", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA18/render.webp" }] },
    "mesa-auxiliar-huayi-red":     { colores: ["Rojo"],                         materiales: ["Metal", "Fibra"],              interior: [{ name: "Rojo",     hex: "#C0392B", image: "/images/MESAS/MESA19/render.webp" }] },
    "set-mesa-space-gray-huayi":   { colores: ["Gris", "Rojo"],               materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#6B6D6E", image: "/images/MESAS/MESA20/render.webp" }, { name: "Rojo", hex: "#C0392B", image: "/images/MESAS/MESA20/render.webp" }] },
    // MESA21-40
    "set-mesa-calacatta-gray":           { colores: ["Gris"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA21/render.webp" }] },
    "set-mesa-space-gray-hex":           { colores: ["Gris"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#6B6D6E", image: "/images/MESAS/MESA22/render.webp" }] },
    "mesa-centro-glass-cave":            { colores: ["Blanco"],                       materiales: ["Vidrio", "Metal"],             interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA23/render.webp" }] },
    "set-mesa-snow-emerald":             { colores: ["Blanco", "Verde"],             materiales: ["Mármol", "Metal"],             interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA24/render.webp" }, { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA24/render.webp" }] },
    "set-mesa-emerald-olive":            { colores: ["Verde"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA25/render.webp" }] },
    "set-mesa-verona-emerald":           { colores: ["Verde", "Negro", "Rojo"],      materiales: ["Mármol", "Metal"],             interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA26/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA26/render.webp" }, { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA26/render.webp" }] },
    "mesa-centro-milky-way-gold":        { colores: ["Negro"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA27/render.webp" }] },
    "mesa-auxiliar-snow-rect":           { colores: ["Blanco"],                       materiales: ["Mármol", "Metal"],             interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA28/render.webp" }] },
    "mesa-auxiliar-c-shape-gunmetal":    { colores: ["Gris"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#6B6D6E", image: "/images/MESAS/MESA29/render.webp" }] },
    "mesa-rincon-space-gold":            { colores: ["Dorado"],                       materiales: ["Metal"],                       interior: [{ name: "Dorado",   hex: "#B8860B", image: "/images/MESAS/MESA30/render.webp" }] },
    "mesa-rincon-calacatta-gold":        { colores: ["Blanco", "Negro"],             materiales: ["Mármol", "Metal"],             interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA31/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA31/render.webp" }] },
    "mesa-rincon-gold-cave":             { colores: ["Dorado", "Beige"],             materiales: ["Mármol", "Metal"],             interior: [{ name: "Dorado",   hex: "#B8860B", image: "/images/MESAS/MESA32/render.webp" }, { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA32/render.webp" }] },
    "mesa-auxiliar-c-shape-gold":        { colores: ["Dorado"],                       materiales: ["Metal"],                       interior: [{ name: "Dorado",   hex: "#B8860B", image: "/images/MESAS/MESA33/render.webp" }] },
    "mesa-rincon-platinum-diamond":      { colores: ["Verde"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA34/render.webp" }] },
    "mesa-rincon-huayi-red-fiberglass":  { colores: ["Rojo"],                         materiales: ["Metal", "Fibra"],              interior: [{ name: "Rojo",     hex: "#C0392B", image: "/images/MESAS/MESA35/render.webp" }] },
    "mesa-rincon-prada-glass-gold":      { colores: ["Verde", "Negro"],              materiales: ["Vidrio", "Metal"],             interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA36/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA36/render.webp" }] },
    "mesa-rincon-emerald-gold":          { colores: ["Verde"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA37/render.webp" }] },
    "mesa-rincon-prada-arch":            { colores: ["Verde"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA38/render.webp" }] },
    "mesa-rincon-burl-calacatta":        { colores: ["Marrón", "Blanco"],            materiales: ["Madera", "Mármol"],            interior: [{ name: "Marrón",   hex: "#8B6914", image: "/images/MESAS/MESA39/render.webp" }, { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA39/render.webp" }] },
    "mesa-rincon-prada-green-hg1911":    { colores: ["Verde"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA40/render.webp" }] },
    // MESA41-60
    "mesa-rincon-cilindrica-hg1913":     { colores: ["Dorado"],                       materiales: ["Metal"],                       interior: [{ name: "Dorado",   hex: "#B8860B", image: "/images/MESAS/MESA41/render.webp" }] },
    "mesa-comedor-hytl86101":            { colores: ["Gris"],                         materiales: ["Mármol", "Metal", "Madera"],   interior: [{ name: "Gris",     hex: "#6B6D6E", image: "/images/MESAS/MESA42/render.webp" }] },
    "mesa-comedor-redonda-hytl86102":    { colores: ["Rojo", "Negro"],               materiales: ["Mármol", "Madera", "Metal"],   interior: [{ name: "Rojo",     hex: "#7A3532", image: "/images/MESAS/MESA43/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA43/img1.webp" }] },
    "mesa-comedor-hytl86105":            { colores: ["Marrón", "Beige"],             materiales: ["Mármol", "Metal"],             interior: [{ name: "Marrón",   hex: "#8B6914", image: "/images/MESAS/MESA44/render.webp" }, { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA44/img3.webp" }] },
    "mesa-comedor-hytl86108":            { colores: ["Negro"],                        materiales: ["Mármol", "Madera"],            interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA45/render.webp" }] },
    "mesa-comedor-hytl86111":            { colores: ["Negro"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA46/render.webp" }] },
    "mesa-comedor-hytl86128-b":          { colores: ["Blanco", "Beige"],             materiales: ["Mármol", "Madera"],            interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA48/render.webp" }, { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA48/img2.webp" }] },
    "mesa-comedor-hytl86129-a":          { colores: ["Gris"],                         materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#6B6D6E", image: "/images/MESAS/MESA49/render.webp" }] },
    "mesa-centro-hyjl82106-a1":          { colores: ["Marrón", "Negro"],             materiales: ["Mármol", "Madera"],            interior: [{ name: "Marrón",   hex: "#8B6914", image: "/images/MESAS/MESA50/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA50/render.webp" }] },
    "mesa-comedor-hyjl82901":            { colores: ["Gris"],                         materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#6B6D6E", image: "/images/MESAS/MESA51/render.webp" }] },
    "consola-te-hygl81702-b":            { colores: ["Negro"],                        materiales: ["Madera", "Mármol"],            interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA52/render.webp" }] },
    "banco-te-hyyd85506":                { colores: ["Negro", "Marrón"],             materiales: ["Madera", "Cuero", "Metal"],    interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA53/render.webp" }, { name: "Marrón", hex: "#8B6914", image: "/images/MESAS/MESA53/render.webp" }] },
    "mesa-comedor-hytl86127-hf1850":     { colores: ["Blanco"],                       materiales: ["Mármol", "Metal"],             interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA54/render.webp" }] },
    "mesa-comedor-hytl86109-hf1838":     { colores: ["Negro"],                        materiales: ["Mármol", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA55/render.webp" }] },
    "mesa-comedor-hytl86103-hf1830y":    { colores: ["Beige", "Gris"],               materiales: ["Mármol", "Madera"],            interior: [{ name: "Beige",    hex: "#C8B68A", image: "/images/MESAS/MESA56/render.webp" }, { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA56/render.webp" }] },
    "mesa-hytl86201":                    { colores: ["Negro", "Blanco"],             materiales: ["Madera", "Mármol", "Metal"],   interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA57/render.webp" }, { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA57/img1.webp" }] },
    "mesa-hytl86202":                    { colores: ["Negro", "Blanco"],             materiales: ["Madera", "Mármol", "Metal"],   interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA58/render.webp" }, { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA58/render.webp" }] },
    "mesa-hytl86202-b":                  { colores: ["Negro", "Gris"],               materiales: ["Madera", "Mármol"],            interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA59/render.webp" }, { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA59/render.webp" }] },
    "mesa-hytl86205":                    { colores: ["Negro", "Gris"],               materiales: ["Madera", "Mármol", "Metal"],   interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA60/render.webp" }, { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA60/render.webp" }] },
    // MESA61-80
    "mesa-te-hygl81706":                     { colores: ["Gris"],                         materiales: ["Madera", "Metal"],             interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA61/render.webp" }] },
    "mesa-te-hygl81703":                     { colores: ["Negro"],                        materiales: ["Madera"],                      interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA62/render.webp" }] },
    "mesa-auxiliar-hyjl82309-hg1908":        { colores: ["Beige", "Negro"],              materiales: ["Piedra", "Metal"],             interior: [{ name: "Beige",    hex: "#C8B68A", image: "/images/MESAS/MESA63/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA63/render.webp" }] },
    "mesa-auxiliar-set-hyjl82105-hg1917":    { colores: ["Rojo", "Blanco"],             materiales: ["Mármol", "Metal"],             interior: [{ name: "Rojo",     hex: "#7A3532", image: "/images/MESAS/MESA64/render.webp" }, { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA64/render.webp" }] },
    "mesa-centro-set-hyjl82103-hc1923":      { colores: ["Blanco", "Gris"],             materiales: ["Mármol", "Metal"],             interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA65/render.webp" }, { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA65/render.webp" }] },
    "mesa-centro-set-hc1912":                { colores: ["Negro", "Rojo"],               materiales: ["Mármol", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA66/render.webp" }, { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA66/render.webp" }] },
    "mesa-auxiliar-hc1912-b":               { colores: ["Gris"],                         materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA67/render.webp" }] },
    "mesa-centro-hc1912-a":                 { colores: ["Gris"],                         materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA68/render.webp" }] },
    "mesa-auxiliar-set-hyjl82302-hg1906y":  { colores: ["Blanco", "Dorado"],            materiales: ["Mármol", "Metal", "Madera"],   interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA69/render.webp" }, { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA69/render.webp" }] },
    "mesa-centro-hyjl82157":                { colores: ["Rojo", "Negro"],               materiales: ["Mármol", "Metal"],             interior: [{ name: "Rojo",     hex: "#7A3532", image: "/images/MESAS/MESA70/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA70/render.webp" }] },
    "mesa-set-hyjl82156":                   { colores: ["Negro", "Verde", "Dorado"],    materiales: ["Mármol", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA71/render.webp" }, { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA71/render.webp" }, { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA71/render.webp" }] },
    "mesa-consola-hyjl82153-d":             { colores: ["Negro"],                        materiales: ["Madera"],                      interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA72/render.webp" }] },
    "mesa-centro-hyjl82153-c":              { colores: ["Negro"],                        materiales: ["Madera"],                      interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA73/render.webp" }] },
    "mesa-centro-hyjl82153-a":              { colores: ["Blanco", "Beige"],             materiales: ["Mármol"],                      interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA74/render.webp" }, { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA74/render.webp" }] },
    "mesa-centro-hyjl82152-b":              { colores: ["Verde", "Blanco"],             materiales: ["Mármol", "Metal"],             interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA75/render.webp" }, { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA75/render.webp" }] },
    "mesa-centro-hyjl82152-a":              { colores: ["Beige"],                        materiales: ["Metal"],                       interior: [{ name: "Beige",    hex: "#C8B68A", image: "/images/MESAS/MESA76/render.webp" }] },
    "mesa-auxiliar-hyjl82151-c":            { colores: ["Verde", "Negro"],              materiales: ["Mármol", "Madera"],            interior: [{ name: "Verde",    hex: "#2A5A35", image: "/images/MESAS/MESA77/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA77/render.webp" }] },
    "mesa-centro-hyjl82151-b":              { colores: ["Blanco", "Negro", "Dorado"],  materiales: ["Mármol", "Madera", "Metal"],   interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA78/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA78/render.webp" }, { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA78/render.webp" }] },
    "mesa-centro-hyjl82151-a":              { colores: ["Gris", "Marrón", "Dorado"],   materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA79/render.webp" }, { name: "Marrón", hex: "#8B6914", image: "/images/MESAS/MESA79/render.webp" }, { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA79/render.webp" }] },
    "mesa-centro-hyjl82137":                { colores: ["Beige"],                        materiales: ["Piedra", "Vidrio"],            interior: [{ name: "Beige",    hex: "#C8B68A", image: "/images/MESAS/MESA80/render.webp" }] },
    // MESA81-93
    "mesa-set-hyjl82136":               { colores: ["Gris", "Rojo"],               materiales: ["Mármol", "Metal"],             interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA81/render.webp" }, { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA81/render.webp" }] },
    "mesa-auxiliar-hyjl82136-b":        { colores: ["Gris", "Rojo"],               materiales: ["Metal"],                       interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA82/render.webp" }, { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA82/render.webp" }] },
    "mesa-centro-hyjl82136-a":          { colores: ["Gris", "Negro"],              materiales: ["Mármol"],                      interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA83/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA83/render.webp" }] },
    "mesa-set-hyjl82135":               { colores: ["Negro"],                       materiales: ["Mármol"],                      interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA84/render.webp" }] },
    "mesa-centro-hyjl82135":            { colores: ["Negro", "Plateado"],           materiales: ["Mármol"],                      interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA85/render.webp" }, { name: "Plateado", hex: "#C0C0C0", image: "/images/MESAS/MESA85/render.webp" }] },
    "mesa-centro-hyjl82132-b":          { colores: ["Rojo"],                        materiales: ["Madera"],                      interior: [{ name: "Rojo",     hex: "#8B2020", image: "/images/MESAS/MESA86/render.webp" }] },
    "mesa-centro-hyjl82132-a":          { colores: ["Negro"],                       materiales: ["Mármol"],                      interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA87/render.webp" }] },
    "mesa-set-hyjl82122-hc1951":        { colores: ["Negro", "Beige", "Plateado"], materiales: ["Mármol", "Metal"],             interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA88/render.webp" }, { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA88/render.webp" }, { name: "Plateado", hex: "#C0C0C0", image: "/images/MESAS/MESA88/render.webp" }] },
    "mesa-set-hyjl82112-chin":          { colores: ["Blanco", "Negro"],            materiales: ["Mármol"],                      interior: [{ name: "Blanco",   hex: "#F0EDE8", image: "/images/MESAS/MESA89/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA89/render.webp" }] },
    "mesa-centro-hyjl82111-b-hc1930y-b":{ colores: ["Gris"],                       materiales: ["Madera"],                      interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA90/render.webp" }] },
    "mesa-set-hyjl82109-hc1931":        { colores: ["Negro", "Beige"],             materiales: ["Mármol"],                      interior: [{ name: "Negro",    hex: "#1A1A1A", image: "/images/MESAS/MESA91/render.webp" }, { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA91/render.webp" }] },
    "mesa-set-hyjl82107-hc1929":        { colores: ["Gris", "Beige"],             materiales: ["Mármol"],                      interior: [{ name: "Gris",     hex: "#8A8A8A", image: "/images/MESAS/MESA92/render.webp" }, { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA92/render.webp" }] },
    "mesa-centro-hyjl82106-hc1922y":    { colores: ["Marrón", "Negro"],           materiales: ["Madera"],                      interior: [{ name: "Marrón",   hex: "#8B6914", image: "/images/MESAS/MESA93/render.webp" }, { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA93/render.webp" }] },
};

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Inserta colores_disponibles y materiales_disponibles después de material_general
function addArrays(content, productId, colores, materiales) {
    const coloresStr = JSON.stringify(colores);
    const materialesStr = JSON.stringify(materiales);
    const idPattern = new RegExp(
        `(id:\\s*"${escapeRegex(productId)}",[\\s\\S]*?material_general:\\s*"[^"]*",)(\\r?\\n)`,
        ''
    );
    return content.replace(idPattern, (match, p1, p2) => {
        return `${p1}${p2}        colores_disponibles: ${coloresStr},${p2}        materiales_disponibles: ${materialesStr},${p2}`;
    });
}

// Reemplaza el bloque colors: { ... } completo con un nuevo colors.interior con image
function replaceColorsBlock(content, productId, interior) {
    const idIndex = content.indexOf(`id: "${productId}"`);
    if (idIndex === -1) { console.warn(`⚠️  ID no encontrado: ${productId}`); return content; }

    const colorsIdx = content.indexOf('colors: {', idIndex);
    if (colorsIdx === -1) { console.warn(`⚠️  colors block no encontrado: ${productId}`); return content; }

    let depth = 0, i = colorsIdx, end = -1, started = false;
    while (i < content.length) {
        if (content[i] === '{') { depth++; started = true; }
        else if (content[i] === '}') {
            depth--;
            if (started && depth === 0) { end = i + 1; break; }
        }
        i++;
    }
    if (end === -1) return content;
    if (content[end] === ',') end++;

    const lineStart = content.lastIndexOf('\n', colorsIdx) + 1;
    const baseIndent = content.substring(lineStart, colorsIdx);
    const innerIndent = baseIndent + '    ';

    const items = interior
        .map(c => `${innerIndent}    { name: "${c.name}", hex: "${c.hex}", image: "${c.image}" }`)
        .join(',\n');

    const newBlock = `colors: {\n${innerIndent}interior: [\n${items}\n${innerIndent}]\n${baseIndent}},`;

    return content.substring(0, colorsIdx) + newBlock + content.substring(end);
}

const filePath = path.join(__dirname, 'subir-datos-mesas.js');
let content = fs.readFileSync(filePath, 'utf8');

if (content.includes('colores_disponibles:')) {
    console.log('⚠️  Ya contiene colores_disponibles. Abortando para evitar duplicados.');
    process.exit(0);
}

let countArrays = 0;
let countColors = 0;

for (const [id, data] of Object.entries(MESAS_DATA)) {
    const before = content;
    content = addArrays(content, id, data.colores, data.materiales);
    if (content !== before) countArrays++;

    const before2 = content;
    content = replaceColorsBlock(content, id, data.interior);
    if (content !== before2) countColors++;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ colores_disponibles/materiales_disponibles: ${countArrays}/81 productos`);
console.log(`✅ colors.interior con image: ${countColors}/81 productos`);
