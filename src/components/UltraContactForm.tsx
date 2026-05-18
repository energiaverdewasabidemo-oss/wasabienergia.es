import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { Phone, Mail, Zap, CheckCircle, Sparkles, Send, User, MessageSquare } from 'lucide-react';
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  supplyType: string[];
  clientType: string;
}

const UltraContactForm = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [supplyTypes, setSupplyTypes] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>({
    defaultValues: {
      clientType: 'residencial'
    }
  });

  const clientType = watch('clientType');

  const handleSupplyTypeChange = (type: string) => {
    const newSupplyTypes = supplyTypes.includes(type)
      ? supplyTypes.filter(t => t !== type)
      : [...supplyTypes, type];
    
    setSupplyTypes(newSupplyTypes);
    setValue('supplyType', newSupplyTypes);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Configurar EmailJS (necesitarás configurar estas variables)
      const templateParams = {
        from_name: data.name,
        from_phone: data.phone,
        from_email: data.email || 'No proporcionado',
        message: data.message,
        supply_type: supplyTypes.join(', ') || 'No especificado',
        client_type: data.clientType,
        to_email: 'energiaverdewasabi@gmail.com'
        to_email: 'info@wasabienergia.es'
      };

      // Reemplaza estos valores con tus credenciales de EmailJS
      await emailjs.send(
        'YOUR_SERVICE_ID', // Reemplazar con tu Service ID
        'YOUR_TEMPLATE_ID', // Reemplazar con tu Template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Reemplazar con tu Public Key
      );

      setIsSubmitted(true);
      reset();
      setSupplyTypes([]);
      
      // Reset después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error enviando email:', error);
      // En caso de error, mostrar mensaje alternativo
      alert('Hubo un error al enviar el formulario. Por favor, contacta directamente a info@wasabienergia.es');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section 
        id="contacto" 
        className="py-32 lg:py-40 relative overflow-hidden bg-gradient-to-br from-[#A8FF00] via-[#96E600] to-[#A8FF00]"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="bg-white rounded-3xl p-16 shadow-2xl relative overflow-hidden">
              {/* Success Animation Background */}
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#A8FF00] rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10">
                <motion.div 
                  className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </motion.div>
                
                <motion.h2 
                  className="text-4xl font-black text-[#1A1A1A] mb-6"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(26, 26, 26, 0.5)",
                      "0 0 40px rgba(26, 26, 26, 0.8)",
                      "0 0 20px rgba(26, 26, 26, 0.5)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ¡Mensaje enviado! 🎉
                </motion.h2>
                
                <p className="text-gray-600 text-xl mb-8 leading-relaxed">
                  Hemos recibido tu consulta correctamente. Nuestro equipo se pondrá en contacto contigo 
                  en las próximas horas para explicarte todo sin compromiso.
                </p>
                
                <motion.div 
                  className="bg-gradient-to-r from-[#A8FF00]/20 to-[#96E600]/20 p-6 rounded-2xl border border-[#A8FF00]/30"
                  animate={{ 
                    boxShadow: [
                      "0 0 30px rgba(168, 255, 0, 0.3)",
                      "0 0 60px rgba(168, 255, 0, 0.6)",
                      "0 0 30px rgba(168, 255, 0, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-[#1A1A1A] font-bold text-lg">
                    📞 Te llamaremos pronto para empezar a ahorrar
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="contacto" 
      ref={ref}
      className="py-32 lg:py-40 relative overflow-hidden bg-gradient-to-br from-[#A8FF00] via-[#96E600] to-[#A8FF00]"
    >
      {/* Ultra Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Form Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/20 text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            >
              {i % 3 === 0 ? '📧' : i % 3 === 1 ? '📞' : '⚡'}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Ultra Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-xl px-8 py-4 rounded-full mb-8 border border-white/30"
            whileHover={{ scale: 1.05 }}
            animate={{ 
              boxShadow: [
                "0 0 30px rgba(255, 255, 255, 0.3)",
                "0 0 60px rgba(255, 255, 255, 0.5)",
                "0 0 30px rgba(255, 255, 255, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="h-6 w-6 text-white" />
            <span className="text-white font-bold text-xl">Último paso</span>
            <Send className="h-6 w-6 text-white" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#1A1A1A] mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Empieza a pagar lo justo por tu energía
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-[#1A1A1A]/80 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Déjanos tus datos y te explicamos todo en 2 minutos, sin compromiso
          </motion.p>
        </motion.div>

        {/* Ultra Form */}
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 relative overflow-hidden">
            {/* Form Background Animation */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#A8FF00]/5 via-transparent to-[#96E600]/5"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              {/* Nombre */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <label htmlFor="name" className="block text-sm font-bold text-[#1A1A1A] mb-3">
                  Nombre completo *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    {...register('name', { required: 'El nombre es obligatorio' })}
                    type="text"
                    id="name"
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#A8FF00]/30 focus:border-[#A8FF00] transition-all text-lg"
                    placeholder="Tu nombre y apellidos"
                  />
                </div>
                {errors.name && (
                  <motion.p 
                    className="text-red-500 text-sm mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Teléfono */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                <label htmlFor="phone" className="block text-sm font-bold text-[#1A1A1A] mb-3">
                  Teléfono *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    {...register('phone', { 
                      required: 'El teléfono es obligatorio',
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: 'Formato de teléfono inválido'
                      }
                    })}
                    type="tel"
                    id="phone"
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#A8FF00]/30 focus:border-[#A8FF00] transition-all text-lg"
                    placeholder="Tu número de teléfono"
                  />
                </div>
                {errors.phone && (
                  <motion.p 
                    className="text-red-500 text-sm mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.phone.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <label htmlFor="email" className="block text-sm font-bold text-[#1A1A1A] mb-3">
                  Email (opcional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    {...register('email', {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    type="email"
                    id="email"
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#A8FF00]/30 focus:border-[#A8FF00] transition-all text-lg"
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <motion.p 
                    className="text-red-500 text-sm mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Mensaje */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                <label htmlFor="message" className="block text-sm font-bold text-[#1A1A1A] mb-3">
                  Mensaje (opcional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={4}
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#A8FF00]/30 focus:border-[#A8FF00] transition-all text-lg resize-none"
                    placeholder="Cuéntanos sobre tu situación actual o cualquier duda que tengas..."
                  />
                </div>
              </motion.div>

              {/* Tipo de suministro */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                <label className="block text-sm font-bold text-[#1A1A1A] mb-4">
                  ¿Qué suministro quieres cambiar?
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['Luz', 'Gas', 'Ambos'].map((type) => (
                    <motion.label 
                      key={type} 
                      className={`flex items-center justify-center space-x-2 cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                        supplyTypes.includes(type)
                          ? 'border-[#A8FF00] bg-[#A8FF00]/10 text-[#A8FF00]'
                          : 'border-gray-200 hover:border-[#A8FF00]/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="checkbox"
                        checked={supplyTypes.includes(type)}
                        onChange={() => handleSupplyTypeChange(type)}
                        className="sr-only"
                      />
                      <Zap className="h-5 w-5" />
                      <span className="font-semibold">{type}</span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>

              {/* Tipo de cliente */}
              <motion.div 
                className="mb-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                <label className="block text-sm font-bold text-[#1A1A1A] mb-4">
                  Tipo de cliente
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'residencial', label: 'Residencial', icon: '🏠' },
                    { value: 'pyme', label: 'Pyme', icon: '🏢' }
                  ].map((option) => (
                    <motion.label 
                      key={option.value} 
                      className={`flex items-center justify-center space-x-3 cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                        clientType === option.value
                          ? 'border-[#A8FF00] bg-[#A8FF00]/10 text-[#A8FF00]'
                          : 'border-gray-200 hover:border-[#A8FF00]/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        {...register('clientType')}
                        type="radio"
                        value={option.value}
                        className="sr-only"
                      />
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-semibold">{option.label}</span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-white py-6 px-8 rounded-2xl font-black text-xl hover:from-[#2A2A2A] hover:to-[#1A1A1A] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#A8FF00] to-[#96E600] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  whileHover={{ scale: 1.1 }}
                />
                
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative z-10">Enviando...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 text-2xl">👉 Quiero mi oferta sin trampa</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="h-6 w-6 relative z-10" />
                    </motion.div>
                  </>
                )}
              </motion.button>

              <motion.p 
                className="text-sm text-gray-500 text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                Al enviar tus datos, aceptas que te contactemos para ofrecerte nuestros servicios.
                No compartimos tu información con terceros.
              </motion.p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default UltraContactForm;