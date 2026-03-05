import { Inter } from "next/font/google";
import "./globals.css";

// IMPORTACIONES DE COMPONENTES Y VERCEL
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from '@/components/CookieBanner';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"; // <--- 1. NUEVO IMPORT DE ANALYTICS

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
      <body className={`${inter.className} bg-[#050505] text-white`}>
        
        <Header />
        
        {/* Contenido principal de cada página */}
        {children}
        
        <Footer /> 
        
        {/* HERRAMIENTAS DE VERCEL Y COOKIES AL FINAL */}
        <SpeedInsights />
        <Analytics /> {/* <--- 2. COMPONENTE DE ANALYTICS AQUÍ */}
        <CookieBanner />
        
      </body>
    </html>
  );
}