// components/Footer.js
import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronRight, Instagram, Linkedin, Facebook, Sparkles, Music2 } from 'lucide-react'; 

export default function Footer() {
  return (
    <footer className="bg-[#030303] text-white pt-24 pb-8 border-t border-white/10 relative overflow-hidden">
      
      {/* Efecto de fondo (Resplandor sutil) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#00C2FF]/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-32 bg-[#00C2FF]/5 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* COLUMNA 1: LOGO Y RAZÓN SOCIAL (Ocupa 4 espacios en PC) */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="mb-6 inline-block">
                <img 
                src="/images/logo-wonly.png" 
                alt="WONLY" 
                className="h-10 w-auto object-contain hover:opacity-80 transition-opacity" 
                />
            </Link>
            <div className="inline-flex items-center gap-2 mb-4">
                <h4 className="text-xs font-bold text-gray-300 tracking-[0.2em] uppercase">
                Zhongyuankeji S.L
                </h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm font-light">
              Líderes en diseño y fabricación de puertas de seguridad, cerramientos panorámicos y mobiliario de alta tecnología. La innovación al servicio de tu hogar.
            </p>
            {/* Redes Sociales */}
            <div className="flex gap-4 items-center mt-auto">
              <SocialIcon Icon={Instagram} href="https://www.instagram.com/wonlyspain/" />
              <SocialIcon Icon={Facebook} href="https://www.facebook.com/people/WONLY/61580719733874/" />
              {/* Corregido: Ahora apunta a TikTok y no a Facebook */}
              <SocialIcon Icon={Music2} href="https://www.tiktok.com/@wonlyspain" /> 
              {/* Listo para añadir tu link de LinkedIn */}
              <SocialIcon Icon={Linkedin} href="https://www.linkedin.com/in/jack-jiang-a024483a9/" />
            </div>
          </div>

          {/* COLUMNA 2: ARQUITECTURA & SEGURIDAD (Ocupa 2.5 espacios) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
               <span className="w-4 h-[1px] bg-[#00C2FF]"></span> Seguridad
            </h3>
            <ul className="space-y-4 text-sm">
              <FooterLink href="/puertas" text="Puertas de Seguridad" />
              <FooterLink href="/ventanas" text="Ventanas Panorámicas" />
              <FooterLink href="/cerraduras" text="Cerraduras Inteligentes" />
              <div className="w-full h-px bg-white/5 my-4"></div>
              <FooterLink href="/proyectos" text="Proyectos Contract" />
            </ul>
          </div>

          {/* COLUMNA 3: INTERIORISMO (Ocupa 2.5 espacios) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
               <span className="w-4 h-[1px] bg-[#00C2FF]"></span> Mobiliario
            </h3>
            <ul className="space-y-4 text-sm">
              <FooterLink href="/sofas" text="Colección Sofás" />
              <FooterLink href="/mesas" text="Mesas de Diseño" />
              <FooterLink href="/sillas" text="Sillas y Sillones" />
              <FooterLink href="/dormitorios" text="Dormitorios" />
              <FooterLink href="/gabinetes" text="Sistemas Gabinetes" />
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO (Ocupa 3 espacios) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
               <span className="w-4 h-[1px] bg-[#00C2FF]"></span> Contacto
            </h3>
            
            <div className="flex flex-col gap-6">
                {/* Email */}
                <div className="group flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#00C2FF] group-hover:bg-[#00C2FF]/10 transition-colors">
                      <Mail size={16} className="text-gray-400 group-hover:text-[#00C2FF] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-semibold">Email</p>
                    <a href="mailto:Zhongyuankejisl@gmail.com" className="text-sm text-gray-300 hover:text-white transition-colors break-all">
                      Zhongyuankejisl@gmail.com
                    </a>
                  </div>
                </div>

                {/* Teléfonos */}
                <div className="group flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#00C2FF] group-hover:bg-[#00C2FF]/10 transition-colors">
                      <Phone size={16} className="text-gray-400 group-hover:text-[#00C2FF] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-semibold">Teléfonos</p>
                    <a href="tel:+34689858129" className="block text-sm text-gray-300 hover:text-white transition-colors mb-1">+34 689 858 129</a>
                    <a href="tel:+34615772136" className="block text-sm text-gray-300 hover:text-white transition-colors">+34 615 772 136</a>
                  </div>
                </div>

                {/* Dirección */}
                <div className="group flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#00C2FF] group-hover:bg-[#00C2FF]/10 transition-colors">
                      <MapPin size={16} className="text-gray-400 group-hover:text-[#00C2FF] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-semibold">Sede Principal</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Carrer Noi del Sucre, 13<br/>
                      08840 Viladecans<br/>
                      Barcelona, España
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: COPYRIGHT Y LEGAL */}
        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} Zhongyuankeji S.L. Todos los derechos reservados.
          </p>
          
          <ul className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 font-medium">
            <li><Link href="/empresa" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
            <li><Link href="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link></li>
            <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
            <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

// Subcomponente reutilizable para los enlaces con efecto hover moderno
function FooterLink({ href, text }) {
  return (
    <li className="group">
      <Link href={href} className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
        <ChevronRight size={14} className="opacity-0 -ml-4 mr-0 text-[#00C2FF] group-hover:opacity-100 group-hover:mr-2 group-hover:ml-0 transition-all duration-300" />
        <span className="transform group-hover:translate-x-1 transition-transform duration-300">{text}</span>
      </Link>
    </li>
  );
}

// Subcomponente para los iconos de redes sociales
function SocialIcon({ Icon, href }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-black hover:bg-white hover:border-white transition-all duration-300 hover:scale-110"
    >
      <Icon size={18} />
    </a>
  );
}