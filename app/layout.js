import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // <--- 1. IMPORTAR FOOTER

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WONLY",
  description: "Muebles de diseño exclusivo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer /> {/* <--- 2. PONER EL FOOTER AQUÍ AL FINAL */}
      </body>
    </html>
  );
}