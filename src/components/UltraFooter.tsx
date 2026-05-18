import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail, Phone, MapPin, Sparkles, Shield, Award, MessageCircle, Clock } from 'lucide-react';

const UltraFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1A1A1A] via-[#0A0A0A] to-[#1A1A1A] text-white py-20 relative overflow-hidden">
      {/* Ultra Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(168, 255, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(168, 255, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(168, 255, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(168, 255, 0, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Energy Icons */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#A8FF00] opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            >
              <Zap className="h-6 w-6" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo y descripción */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="bg-gradient-to-r from-[#A8FF00] to-[#96E600] p-3 rounded-2xl shadow-2xl"
                animate={{ 
                  boxShadow: [
                    "0 0 30px rgba(168, 255, 0, 0.5)",
                    "0 0 60px rgba(168, 255, 0, 0.8)",
                    "0 0 30px rgba(168, 255, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="h-8 w-8 text-[#1A1A1A]" />
              </motion.div>
              <span className="text-2xl font-black bg-gradient-to-r from-[#A8FF00] to-[#96E600] bg-clip-text text-transparent">
                Energía Verde Wasabi
              </span>
            </motion.div>
            
            <motion.p 
              className="text-gray-300 leading-relaxed mb-8 max-w-md text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Energía 100% renovable, sin trampas, sin robots y con atención humana. 
              La forma más fácil de pagar lo justo por tu luz y gas.
            </motion.p>
            
            <motion.div 
              className="flex items-center space-x-3 text-[#A8FF00] text-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6" />
              </motion.div>
              <span className="font-bold">Energía 100% renovable certificada</span>
            </motion.div>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-black mb-6 text-[#A8FF00]">Contacto</h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-4 group cursor-pointer"
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <motion.div
                  className="p-2 bg-[#A8FF00]/20 rounded-xl group-hover:bg-[#A8FF00]/30 transition-colors"
                  whileHover={{ rotate: 10 }}
                >
                  <Mail className="h-5 w-5 text-[#A8FF00]" />
                </motion.div>
                <a 
                  href="mailto:info@wasabienergia.es" 
                  className="text-gray-300 hover:text-[#A8FF00] transition-colors"
                >
                  info@wasabienergia.es
                </a>
              </motion.div>
              
              <motion.div
                className="flex items-center space-x-4 group cursor-pointer"
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <motion.div
                  className="p-2 bg-[#A8FF00]/20 rounded-xl group-hover:bg-[#A8FF00]/30 transition-colors"
                  whileHover={{ rotate: 10 }}
                >
                  <Phone className="h-5 w-5 text-[#A8FF00]" />
                </motion.div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Teléfono:</p>
                  <a
                    href="tel:+34900264856"
                    className="text-gray-300 hover:text-[#A8FF00] transition-colors"
                  >
                    +34 900 264 856
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 group cursor-pointer"
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <motion.div
                  className="p-2 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors"
                  whileHover={{ rotate: 10 }}
                >
                  <MessageCircle className="h-5 w-5 text-green-400" />
                </motion.div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">WhatsApp:</p>
                  <a
                    href="https://wa.me/+34621508300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    +34 621 50 83 00
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                className="flex items-start space-x-4 group"
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <motion.div
                  className="p-2 bg-[#A8FF00]/20 rounded-xl group-hover:bg-[#A8FF00]/30 transition-colors mt-1"
                  whileHover={{ rotate: 10 }}
                >
                  <MapPin className="h-5 w-5 text-[#A8FF00]" />
                </motion.div>
                <span className="text-gray-300">
                  CALLE ANDARELLA, 2<br />
                  46950, VALENCIA<br />
                  ESPAÑA
                </span>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4 group"
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <motion.div
                  className="p-2 bg-[#A8FF00]/20 rounded-xl group-hover:bg-[#A8FF00]/30 transition-colors mt-1"
                  whileHover={{ rotate: 10 }}
                >
                  <Clock className="h-5 w-5 text-[#A8FF00]" />
                </motion.div>
                <div className="text-gray-300">
                  <p className="text-gray-500 text-xs mb-1">Horario de oficina:</p>
                  <p>Lun - Jue: 9:30 - 15:00 y 15:30 - 18:00</p>
                  <p>Viernes: 9:30 - 14:50</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enlaces legales */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-black mb-6 text-[#A8FF00]">Legal</h3>
            <div className="space-y-4">
              {[
                'Política de Privacidad',
                'Aviso Legal',
                'Términos y Condiciones',
                'Cookies'
              ].map((link, index) => (
                <motion.a 
                  key={link}
                  href="#" 
                  className="block text-gray-300 hover:text-[#A8FF00] transition-colors group"
                  whileHover={{ x: 10 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="group-hover:underline">{link}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Separador con animación */}
        <motion.div 
          className="border-t border-gray-800 pt-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400 text-lg">
                © 2024 Energía Verde Wasabi SL - CIF: B42709378
              </p>
              <p className="text-gray-500 mt-2">
                Energía eléctrica y gas natural certificados
              </p>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              {[
                { value: '100%', label: 'Renovable', icon: Sparkles },
                { value: '0€', label: 'Permanencia', icon: Shield },
                { value: '24/7', label: 'Atención', icon: Award }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="flex items-center justify-center mb-2"
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(168, 255, 0, 0.5)",
                        "0 0 40px rgba(168, 255, 0, 0.8)",
                        "0 0 20px rgba(168, 255, 0, 0.5)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <stat.icon className="h-5 w-5 text-[#A8FF00] mr-2" />
                    <p className="text-[#A8FF00] font-black text-xl">{stat.value}</p>
                  </motion.div>
                  <p className="text-gray-400 text-sm group-hover:text-[#A8FF00] transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Ultra Call to Action Final */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#A8FF00]/10 via-[#96E600]/10 to-[#A8FF00]/10 backdrop-blur-xl rounded-3xl p-8 border border-[#A8FF00]/20 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#A8FF00]/5 via-transparent to-[#A8FF00]/5"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl font-black text-[#A8FF00] mb-4"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(168, 255, 0, 0.5)",
                    "0 0 40px rgba(168, 255, 0, 0.8)",
                    "0 0 20px rgba(168, 255, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🚀 ¿Listo para la revolución energética?
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 text-lg mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                viewport={{ once: true }}
              >
                Únete a miles de familias que ya disfrutan de energía limpia y precios justos
              </motion.p>
              
              <motion.button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] px-8 py-3 rounded-full font-bold text-lg hover:from-[#96E600] hover:to-[#A8FF00] transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative z-10">Empezar ahora</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default UltraFooter;