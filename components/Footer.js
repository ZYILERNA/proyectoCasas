// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMNA 1: LOGO Y INFO */}
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-6">Dimoldura</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Líderes en diseño y fabricación de puertas y mobiliario de alta gama. 
              Creando hogares desde 1995.
            </p>
          </div>

          {/* COLUMNA 2: ENLACES */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Explorar</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/sofas" className="hover:text-white transition">Sofás</Link></li>
              <li><Link href="/mesas" className="hover:text-white transition">Mesas</Link></li>
              <li><Link href="/proyectos" className="hover:text-white transition">Proyectos Contract</Link></li>
              <li><Link href="/catalogo" className="hover:text-white transition">Descargar Catálogo</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: LEGAL */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Legal</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/aviso-legal" className="hover:text-white transition">Aviso Legal</Link></li>
              <li><Link href="/privacidad" className="hover:text-white transition">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookies</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Contacto</h3>
            <p className="text-sm text-gray-300 mb-2">info@dimoldura.com</p>
            <p className="text-sm text-gray-300 mb-2">+34 900 000 000</p>
            <p className="text-sm text-gray-300">
              Calle Industria, 24<br/>
              Barcelona, España
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 Dimoldura Group. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Instagram</span>
            <span>LinkedIn</span>
            <span>Facebook</span>
          </div>
        </div>

      </div>
    </footer>
  );
}