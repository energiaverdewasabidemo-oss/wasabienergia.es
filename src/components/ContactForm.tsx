import React, { useState } from 'react';
import { Phone, Mail, Zap, CheckCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    supplyType: [] as string[],
    clientType: 'residencial'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSupplyTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      supplyType: prev.supplyType.includes(type)
        ? prev.supplyType.filter(t => t !== type)
        : [...prev.supplyType, type]
    }));
  };

  const handleClientTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      clientType: type
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email body
    const emailBody = `
Nuevo contacto desde la web de Energía Verde Wasabi:

Nombre: ${formData.name}
Teléfono: ${formData.phone}
Email: ${formData.email || 'No proporcionado'}
Tipo de suministro: ${formData.supplyType.join(', ') || 'No especificado'}
Tipo de cliente: ${formData.clientType}

---
Enviado desde wasabienergia.es
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:info@wasabienergia.es?subject=Nueva consulta desde la web&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        supplyType: [],
        clientType: 'residencial'
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section id="contacto" className="py-20 lg:py-32 bg-gradient-to-br from-[#A8FF00] to-[#96E600]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-12 shadow-2xl">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
                ¡Perfecto! 🎉
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Hemos abierto tu cliente de email con todos tus datos. 
                Solo tienes que enviar el mensaje y te llamaremos enseguida.
              </p>
              <p className="text-sm text-gray-500">
                Si no se abrió automáticamente, puedes escribirnos a:{' '}
                <a href="mailto:info@wasabienergia.es" className="text-[#A8FF00] hover:underline">
                  info@wasabienergia.es
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-20 lg:py-32 bg-gradient-to-br from-[#A8FF00] to-[#96E600]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-6">
            Empieza a pagar lo justo por tu energía
          </h2>
          <p className="text-xl text-[#1A1A1A]/80 leading-relaxed">
            Déjanos tus datos y te explicamos todo en 2 minutos, sin compromiso
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            {/* Nombre */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A8FF00] focus:border-transparent transition-all"
                placeholder="Tu nombre y apellidos"
              />
            </div>

            {/* Teléfono */}
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Teléfono *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A8FF00] focus:border-transparent transition-all"
                  placeholder="Tu número de teléfono"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Email (opcional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A8FF00] focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Tipo de suministro */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                ¿Qué suministro quieres cambiar?
              </label>
              <div className="space-y-2">
                {['Luz', 'Gas', 'Ambos'].map((type) => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.supplyType.includes(type)}
                      onChange={() => handleSupplyTypeChange(type)}
                      className="w-4 h-4 text-[#A8FF00] focus:ring-[#A8FF00] border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tipo de cliente */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                Tipo de cliente
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'residencial', label: 'Residencial' },
                  { value: 'pyme', label: 'Pyme' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="clientType"
                      value={option.value}
                      checked={formData.clientType === option.value}
                      onChange={() => handleClientTypeChange(option.value)}
                      className="w-4 h-4 text-[#A8FF00] focus:ring-[#A8FF00] border-gray-300"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1A1A1A] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#2A2A2A] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>👉 Quiero mi oferta sin trampa</span>
              <Zap className="h-5 w-5" />
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Al enviar tus datos, aceptas que te contactemos para ofrecerte nuestros servicios.
              No compartimos tu información con terceros.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;