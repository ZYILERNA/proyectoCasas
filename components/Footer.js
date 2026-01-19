// components/Footer.js
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react'; // Opcional: si quieres iconos

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMNA 1: LOGO Y RAZÓN SOCIAL */}
          <div>
            <img 
              src="/images/logo-wonly.png" 
              alt="WONLY" 
              className="h-8 w-auto mb-6 object-contain" 
            />
            <h4 className="text-sm font-bold text-white mb-2">
              WONLY Tecnología & Seguridad S. L.
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Líderes en diseño y fabricación de puertas y mobiliario de alta tecnología. 
              Innovación para tu hogar.
            </p>
          </div>

          {/* COLUMNA 2: EXPLORAR (Actualizado con Ventanas y Cerraduras) */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Explorar</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/puertas" className="hover:text-[#00C2FF] transition">Puertas</Link></li>
              <li><Link href="/ventanas" className="hover:text-[#00C2FF] transition">Ventanas</Link></li>
              <li><Link href="/cerraduras" className="hover:text-[#00C2FF] transition">Cerraduras Inteligentes</Link></li>
              <li><Link href="/sofas" className="hover:text-[#00C2FF] transition">Sofás</Link></li>
              <li><Link href="/proyectos" className="hover:text-[#00C2FF] transition">Proyectos Contract</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: LEGAL */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Legal</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/aviso-legal" className="hover:text-[#00C2FF] transition">Aviso Legal</Link></li>
              <li><Link href="/privacidad" className="hover:text-[#00C2FF] transition">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="hover:text-[#00C2FF] transition">Cookies</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO (Datos Reales) */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Contacto</h3>
            
            {/* Email */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Email:</p>
              <a href="mailto:Zhongyuankejisl@gmail.com" className="text-sm text-gray-300 hover:text-[#00C2FF] transition break-all">
                Zhongyuankejisl@gmail.com
              </a>
            </div>

            {/* Teléfonos */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Teléfonos:</p>
              <p className="text-sm text-gray-300 hover:text-[#00C2FF] transition">+34 689 858 129</p>
              <p className="text-sm text-gray-300 hover:text-[#00C2FF] transition">+34 615 772 136</p>
            </div>

            {/* Dirección */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Dirección:</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Carrer Noi del Sucre, 13<br/>
                08840 Viladecans<br/>
                Barcelona, España
              </p>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 WONLY Tecnología & Seguridad S. L. Todos los derechos reservados.</p>
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