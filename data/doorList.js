// data/doorList.js

export const doors = [
  // ... otros productos ...
  {
    id: "x60-pro-smart-door",
    name: "X60 Pro - Puerta de Seguridad V5.0",
    category: "PUERTA DE SEGURIDAD INTELIGENTE",
    price: "Consultar Precio", // O pon un precio si lo tienes
    description: "La definición de seguridad del futuro. Puerta acorazada con Inteligencia Artificial, apertura y cierre automáticos, y pantalla táctil integrada de 10.1 pulgadas.",
    
    // IMPORTANTE: Necesitarás recortar las 3 fotitos de abajo de la imagen que enviaste
    // y guardarlas como: x60-main.jpg, x60-back.jpg, x60-double.jpg
    image: "/images/x60-main.jpg", 
    gallery: [
      "/images/x60-main.jpg",
      "/images/x60-back.jpg",
      "/images/x60-double.jpg"
    ],

    // Características destacadas (Tags rápidos)
    features: ["Apertura Automática", "Reconocimiento Facial", "Pantalla 10.1\"", "App Control"],

    // Especificaciones técnicas detalladas (Transcripción de la imagen)
    specs: {
      apertura: "Automática (Apertura y Cierre)",
      inteligencia: "Sensores remotos + Sistema inteligente antiatrapamiento",
      pantalla: "Táctil trasera de 10.1 pulgadas (1280x800)",
      camara: "Mirilla 2MP, Gran Angular 120°",
      desbloqueo: [
        "Sensor de proximidad",
        "Reconocimiento facial",
        "Contraseña",
        "Tarjeta CPU",
        "Llave mecánica",
        "App remota",
        "Llave de proximidad (Opcional)"
      ],
      material: "Tallado en placa de aluminio",
      estructura: "Marco alto en forma de H, Bisagras expuestas/ocultas",
      seguridad: "Cilindro patentado nivel Ultra C",
      energia: "Fuente continua 24V/6A + Batería de litio",
      almacenamiento: "Nube por 3 días (cobertura en bucle)"
    }
  },
  // ...
];