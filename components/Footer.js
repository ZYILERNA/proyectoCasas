// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  // Color de acento WONLY: #00C2FF
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMNA 1: LOGO WONLY */}
          <div>
            {/* Usamos el logo en el footer también */}
            <img 
              src="/images/logo-wonly.png" 
              alt="WONLY" 
              className="h-8 w-auto mb-6 object-contain" 
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Líderes en diseño y fabricación de puertas y mobiliario de alta tecnología. 
              Innovación para tu hogar.
            </p>
          </div>

          {/* COLUMNA 2: ENLACES (Hover cian) */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Explorar</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/puertas" className="hover:text-[#00C2FF] transition">Puertas</Link></li>
              <li><Link href="/sofas" className="hover:text-[#00C2FF] transition">Sofás</Link></li>
              <li><Link href="/proyectos" className="hover:text-[#00C2FF] transition">Proyectos Contract</Link></li>
              <li><Link href="/catalogo" className="hover:text-[#00C2FF] transition">Descargar Catálogo</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: LEGAL (Hover cian) */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Legal</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/aviso-legal" className="hover:text-[#00C2FF] transition">Aviso Legal</Link></li>
              <li><Link href="/privacidad" className="hover:text-[#00C2FF] transition">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="hover:text-[#00C2FF] transition">Cookies</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Contacto</h3>
            <p className="text-sm text-gray-300 mb-2 hover:text-[#00C2FF] transition cursor-pointer">info@wonly.com</p>
            <p className="text-sm text-gray-300 mb-2">+34 900 000 000</p>
            <p className="text-sm text-gray-300">
              Calle Tecnología, 24<br/>
              Barcelona, España
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 WONLY Group. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-[#00C2FF] cursor-pointer transition">Instagram</span>
            <span className="hover:text-[#00C2FF] cursor-pointer transition">LinkedIn</span>
            <span className="hover:text-[#00C2FF] cursor-pointer transition">Facebook</span>
          </div>
        </div>

      </div>
    </footer>
  );
}