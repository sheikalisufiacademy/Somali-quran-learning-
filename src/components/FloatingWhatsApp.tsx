import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  lang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  return (
    <div id="floating-whatsapp-container" className="fixed bottom-6 right-6 z-40">
      {/* Main Floating Button */}
      <a
        href="https://wa.me/251777796444?text=Asc%20Baro%20Quran%20Academy%2C%20waxaan%20rabaa%20in%20aan%20is-diiwaangeliyo"
        target="_blank"
        rel="noopener noreferrer"
        id="btn-floating-whatsapp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1caa52] text-white flex items-center justify-center shadow-2xl shadow-green-900/40 hover:scale-110 active:scale-95 transition-all duration-200 group border-2 border-white/20"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
};
