import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  // 1. CONFIGURACIÓN DEL TÍTULO DINÁMICO
  title: {
    // %s se reemplaza automáticamente con el título de cada página
    template: "%s | WONLY", 
    // Título por defecto (para la Home) si una página no especifica título
    default: "WONLY - Seguridad y Diseño Exclusivo", 
  },
  description: "Especialistas en cerraduras inteligentes y muebles de diseño exclusivo.",
  
  // 2. AQUÍ AGREGAS TU FAVICON (Si usas la opción manual)
  icons: {
    icon: '/images/wonlylogo.jpg', // Asegúrate de tener este archivo en la carpeta public/
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen"> 
          {/* Añadí min-h-screen para asegurar que el footer siempre quede abajo si hay poco contenido */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}