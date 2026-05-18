import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
import { getConsent, setConsent } from '../lib/consent';
import { initTracking } from '../lib/tracking';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  const handleAccept = () => {
    setConsent('accepted');
    initTracking();
    setVisible(false);
  };

  const handleReject = () => {
    setConsent('rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      aria-live="polite"
      className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6 bg-[#0a0a0a]/95 backdrop-blur-md border-t-2 border-[#A8FF00]/40 text-white shadow-2xl"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Cookie className="h-7 w-7 text-[#A8FF00] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm md:text-base leading-relaxed">
            <p className="font-semibold mb-1">Usamos cookies para mejorar tu experiencia</p>
            <p className="text-gray-300">
              Cookies analíticas y de marketing (Google Tag Manager, Meta Pixel) nos ayudan a entender el tráfico y a mostrarte ofertas relevantes. Puedes aceptarlas todas o quedarte solo con las técnicamente necesarias.
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto flex-shrink-0">
          <button
            type="button"
            onClick={handleReject}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl border-2 border-gray-500 text-gray-200 hover:bg-white/10 transition font-semibold"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-[#A8FF00] text-gray-900 hover:bg-[#96E600] transition font-bold shadow-lg shadow-[#A8FF00]/30"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
