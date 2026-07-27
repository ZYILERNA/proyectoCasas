import "./globals.css";

// IMPORTACIONES DE COMPONENTES Y VERCEL (Rutas corregidas)
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from '../components/CookieBanner';
import WhatsAppButton from '../components/WhatsAppButton';
import ConsentGate from "../components/ConsentGate";

export const metadata = {
  metadataBase: new URL("https://www.wonlyspain.com"),
  applicationName: "WONLY España",
  title: {
    template: "%s | WONLY España",
    default: "WONLY España | Puertas inteligentes y seguridad",
  },
  description:
    "Puertas inteligentes, cerraduras biométricas, ventanas panorámicas y soluciones de interior WONLY en España.",
  keywords: [
    "puertas inteligentes",
    "puertas de seguridad",
    "cerraduras biométricas",
    "puertas acorazadas",
    "WONLY España",
    "ventanas panorámicas",
  ],
  authors: [{ name: "WONLY España" }],
  creator: "WONLY España",
  publisher: "Zhongyuankeji S.L.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "WONLY España",
    title: "WONLY España | Seguridad inteligente y diseño",
    description:
      "Soluciones integrales para puertas inteligentes, cerramientos y espacios de interior.",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "WONLY España: seguridad que también define tu espacio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WONLY España | Seguridad inteligente y diseño",
    description:
      "Puertas inteligentes, cerramientos y soluciones de interior.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/images/wonlylogo.webp",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-[#050505] text-white antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-black transition focus:translate-y-0"
        >
          Saltar al contenido
        </a>

        <Header />

        <div id="main-content" data-site-content tabIndex={-1}>
          {children}
        </div>

        <Footer />

        {/* Analítica y medición solo se activan tras el consentimiento */}
        <ConsentGate />
        <CookieBanner />
        <WhatsAppButton />
      </body>
    </html>
  );
}
