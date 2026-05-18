import React from 'react';
import { Zap, Mail, Phone, MapPin, Shield, Award, MessageCircle, Clock } from 'lucide-react';

const OptimizedFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A] text-white py-20 relative overflow-hidden">
      {/* Fondo más claro */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#A8FF00]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#A8FF00]/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          
          {/* Logo footer ultra mejorado sin cuadrado blanco */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6 group cursor-pointer">
              <div className="relative mr-4">
                {/* Logo directo con efectos sutiles */}
                <div className="relative p-2 rounded-xl transition-all duration-300 group-hover:scale-110">
                  <img 
                    src="/wasabi-logo-main.png"
                    alt="Energía Verde Wasabi"
                    className="h-12 w-auto sm:h-14 lg:h-16 transition-all duration-300 drop-shadow-lg group-hover:drop-shadow-2xl"
                    style={{
                      maxWidth: '200px',
                      objectFit: 'contain',
                      filter: 'contrast(1.4) brightness(1.3) saturate(1.4) drop-shadow(0 0 20px rgba(168, 255, 0, 0.7))'
                    }}
                  />
                  
                  {/* Resplandor sutil alrededor del logo */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#A8FF00]/30 via-[#96E600]/30 to-[#A8FF00]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
                  
                  {/* Anillo de energía */}
                  <div className="absolute inset-0 rounded-xl border-2 border-[#A8FF00]/0 group-hover:border-[#A8FF00]/60 transition-all duration-500 animate-pulse"></div>
                  
                  {/* Partículas de energía */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#A8FF00] rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#96E600] rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-200 leading-relaxed mb-8 max-w-lg text-lg">
              Energía 100% renovable, sin trampas, sin robots y con atención humana. 
              La forma más fácil de pagar lo justo por tu luz y gas.
            </p>
            
            <div className="flex items-center space-x-3 text-[#A8FF00] text-lg">
              <Zap className="h-6 w-6 animate-pulse" />
              <span className="font-bold">Energía 100% renovable certificada</span>
            </div>
          </div>

          {/* Contacto mejorado con datos actualizados */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black mb-6 text-[#A8FF00]">Contacto</h3>
            <div className="space-y-6">
              {/* Email con mejor layout */}
              <div className="group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#A8FF00]/20 rounded-xl group-hover:bg-[#A8FF00]/30 transition-colors flex-shrink-0 mt-1">
                    <Mail className="h-5 w-5 text-[#A8FF00]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-sm mb-1">Email:</p>
                    <a 
                      href="mailto:info@wasabienergia.es" 
                      className="text-gray-200 hover:text-[#A8FF00] transition-colors text-base font-medium break-all leading-relaxed"
                    >
                      info@wasabienergia.es
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Teléfono directo */}
              <div className="group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-[#A8FF00]/20 rounded-xl group-hover:bg-[#A8FF00]/30 transition-colors">
                    <Phone className="h-5 w-5 text-[#A8FF00]" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Teléfono:</p>
                    <a
                      href="tel:+34900264856"
                      className="text-gray-200 hover:text-[#A8FF00] transition-colors text-base font-medium"
                    >
                      +34 900 264 856
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                    <MessageCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">WhatsApp:</p>
                    <a
                      href="https://wa.me/+34621508300"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-green-400 transition-colors text-base font-medium"
                    >
                      +34 621 50 83 00
                    </a>
                  </div>
                </div>
              </div>

              {/* Dirección ACTUALIZADA */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#A8FF00]/20 rounded-xl group-hover:bg-[#A8FF00]/30 transition-colors mt-1 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#A8FF00]" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Dirección:</p>
                    <span className="text-gray-200 leading-relaxed text-base">
                      CALLE ANDARELLA, 2<br />
                      46950, VALENCIA<br />
                      ESPAÑA
                    </span>
                  </div>
                </div>
              </div>

              {/* Horarios de oficina */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#A8FF00]/20 rounded-xl group-hover:bg-[#A8FF00]/30 transition-colors mt-1 flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#A8FF00]" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Horario de oficina:</p>
                    <div className="text-gray-200 leading-relaxed text-base">
                      <p>Lun - Jue: 9:30 - 15:00 y 15:30 - 18:00</p>
                      <p>Viernes: 9:30 - 14:50</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enlaces legales y Landing Pages */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black mb-6 text-[#A8FF00]">Legal y Recursos</h3>
            <div className="space-y-4">
              {[
                { name: 'Subir Factura', href: '/subir-factura', external: false },
                { name: 'Panel de Afiliados', href: '/afiliados', external: false },
                { name: 'Política de Privacidad', href: '/politica-privacidad.html', external: true },
                { name: 'Aviso Legal', href: '/aviso-legal.html', external: true },
                { name: 'Términos y Condiciones', href: '/terminos-condiciones.html', external: true },
                { name: 'Cookies', href: '/cookies.html', external: true }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block text-gray-200 hover:text-[#A8FF00] transition-all duration-300 hover:translate-x-2 text-base"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-600 pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-300 text-lg">
                © 2025 Energía Verde Wasabi SL - CIF: B42709378
              </p>
              <p className="text-gray-400 mt-2">
                Energía eléctrica y gas natural certificados
              </p>
            </div>
            
            <div className="flex items-center space-x-8">
              {[
                { value: '100%', label: 'Renovable', icon: Zap },
                { value: '0€', label: 'Permanencia', icon: Shield },
                { value: '24/7', label: 'Atención', icon: Award }
              ].map((stat) => (
                <div 
                  key={stat.label}
                  className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-[#A8FF00] mr-2" />
                    <p className="text-[#A8FF00] font-black text-xl">{stat.value}</p>
                  </div>
                  <p className="text-gray-300 text-sm group-hover:text-[#A8FF00] transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#A8FF00]/15 via-[#96E600]/15 to-[#A8FF00]/15 backdrop-blur-xl rounded-3xl p-8 border border-[#A8FF00]/30 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-[#A8FF00] mb-4">
                ⚡ ¿Listo para la revolución energética?
              </h3>
              
              <p className="text-gray-200 text-lg mb-6">
                Únete a miles de familias que ya disfrutan de energía limpia y precios justos
              </p>
              
              <button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-[#A8FF00]/30 transition-all duration-300 transform hover:scale-105"
              >
                Empezar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default OptimizedFooter;