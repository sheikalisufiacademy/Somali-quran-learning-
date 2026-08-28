import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  CheckCircle2, 
  Sparkles,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  lang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasDismissedPrompt, setHasDismissedPrompt] = useState<boolean>(false);

  const whatsAppUrl =
    'https://wa.me/251777796444?text=Asc%20Baro%20Quran%20Academy%2C%20waxaan%20rabaa%20in%20aan%20is-diiwaangeliyo%20ama%20su%27aal%20weydiiyo';

  return (
    <div
      id="floating-whatsapp-container"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 max-w-[340px]"
    >
      {/* Expandable Status Dialog / Banner */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2 }}
            id="whatsapp-status-popup"
            className="w-[300px] sm:w-[320px] rounded-2xl bg-white dark:bg-[#0E1A2C] border-2 border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100"
          >
            {/* Header of Popup */}
            <div className="p-4 text-white flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-700">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white leading-tight">Baro Quran Academy</h4>
                  <div className="flex items-center gap-1 text-[11px] text-white/90 font-medium">
                    <span className="flex items-center gap-1 font-bold text-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                      {lang === 'so' ? 'Hadda waa Online (Furan)' : 'Online Support'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body of Popup */}
            <div className="p-4 space-y-3 text-xs">
              {/* Status Message */}
              <div className="space-y-1.5">
                <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {lang === 'so'
                    ? 'Kusoo dhowow! Maamulka iyo macallimiinta Baro Quran Academy hadda waa diyaar. Riix badhanka hoose si aad noola sheekaysato.'
                    : 'Welcome! Our academic coordinators and teachers are ready to assist you. Tap below to start an instant WhatsApp chat.'}
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {lang === 'so' ? 'Jawaab degdeg ah (1-5 daqiiqo)' : 'Typical reply: 1-5 minutes'}
                </p>
              </div>

              {/* Action Button */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-whatsapp-chat-now"
                className="w-full py-3 px-4 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-md bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1caa52] shadow-green-600/30 transition-all transform active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {lang === 'so'
                    ? 'La Hadal WhatsApp (Hadda Furan)'
                    : 'Chat on WhatsApp (Online Now)'}
                </span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Status Pill Prompt (Shown when not expanded) */}
      {!isExpanded && !hasDismissedPrompt && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="relative flex items-center gap-2 py-1.5 px-3 rounded-full bg-white dark:bg-[#0E1A2C] border border-slate-200 dark:border-slate-700 shadow-xl cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group"
          onClick={() => setIsExpanded(true)}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-black text-slate-800 dark:text-white whitespace-nowrap">
            {lang === 'so' ? 'Nala Xiriir WhatsApp' : 'Contact on WhatsApp'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHasDismissedPrompt(true);
            }}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
            aria-label="Dismiss label"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          id="btn-floating-whatsapp"
          className="w-14 h-14 rounded-full text-white flex items-center justify-center shadow-2xl transition-all duration-200 group border-2 border-white/20 cursor-pointer bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1caa52] shadow-green-900/40 hover:scale-110 active:scale-95 ring-4 ring-emerald-500/20"
          aria-label={lang === 'so' ? 'Nala Xiriir WhatsApp' : 'Contact on WhatsApp'}
          title={lang === 'so' ? 'Nala Xiriir WhatsApp (Online)' : 'WhatsApp Online Support'}
        >
          <MessageCircle className="w-7 h-7 fill-white/20 group-hover:rotate-12 transition-transform" />
        </button>

        {/* Status Dot Badge */}
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase border-2 border-white dark:border-[#0B192C] shadow-sm bg-emerald-500 text-white animate-pulse">
          Online
        </span>
      </div>
    </div>
  );
};
