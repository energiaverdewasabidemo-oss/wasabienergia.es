import React from 'react';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-[#A8FF00] p-2 rounded-lg">
                <Zap className="h-6 w-6 text-[#1A1A1A]" />
              </div>
              <span className="text-xl font-bold">Energía Verde Wasabi</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Energía 100% renovable, sin trampas, sin robots y con atención humana. 
              La forma más fácil de pagar lo justo por tu luz y gas.
            </p>
            <div className="flex items-center space-x-2 text-[#A8FF00] text-sm">
              <Zap className="h-4 w-4" />
              <span>Energía 100% renovable certificada</span>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#A8FF00]" />
                <a 
                  href="mailto:info@wasabienergia.es" 
                  className="text-gray-300 hover:text-[#A8FF00] transition-colors text-sm"
                >
                  info@wasabienergia.es
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#A8FF00]" />
                <a 
                  href="tel:+34900000000" 
                  className="text-gray-300 hover:text-[#A8FF00] transition-colors text-sm"
                >
                  900 000 000
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#A8FF00] mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Calle de la Energía Verde, 123<br />
                  28001 Madrid, España
                </span>
              </div>
            </div>
          </div>

          {/* Enlaces legales */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <div className="space-y-3">
              <a 
                href="#" 
                className="block text-gray-300 hover:text-[#A8FF00] transition-colors text-sm"
              >
                Política de Privacidad
              </a>
              <a 
                href="#" 
                className="block text-gray-300 hover:text-[#A8FF00] transition-colors text-sm"
              >
                Aviso Legal
              </a>
              <a 
                href="#" 
                className="block text-gray-300 hover:text-[#A8FF00] transition-colors text-sm"
              >
                Términos y Condiciones
              </a>
              <a 
                href="#" 
                className="block text-gray-300 hover:text-[#A8FF00] transition-colors text-sm"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 Energía Verde Wasabi SL - CIF: B42709378
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Energía eléctrica y gas natural certificados
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-[#A8FF00] font-bold text-sm">100%</p>
                <p className="text-gray-400 text-xs">Renovable</p>
              </div>
              <div className="text-center">
                <p className="text-[#A8FF00] font-bold text-sm">0€</p>
                <p className="text-gray-400 text-xs">Permanencia</p>
              </div>
              <div className="text-center">
                <p className="text-[#A8FF00] font-bold text-sm">24/7</p>
                <p className="text-gray-400 text-xs">Atención</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;