import { Inter } from "next/font/google";
import "./globals.css";

// IMPORTACIONES DE COMPONENTES
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from '@/components/CookieBanner'; // <--- Importación del banner
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  // CONFIGURACIÓN DEL TÍTULO DINÁMICO
  title: {
    template: "%s | WONLY", 
    default: "WONLY - Seguridad y Diseño Exclusivo", 
  },
  description: "Especialistas en cerraduras inteligentes y muebles de diseño exclusivo.",
  
  // FAVICON
  icons: {
    icon: '/images/wonlylogo.jpg', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* Fusioné las clases de tu fuente Inter con los colores de fondo oscuro */}
      <body className={`${inter.className} bg-[#050505] text-white`}>
        
        <Header />
        
        {/* Contenido principal de cada página */}
        {children}
        
        <Footer /> 
        <SpeedInsights />
        
        {/* Aquí agregamos el banner de cookies al final del body */}
        <CookieBanner />
        
      </body>
    </html>
  );
}