import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, FaqItem } from '../types';
import { FAQS_DATA } from '../data/academyData';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS_DATA[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <motion.section 
      id="faq" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-white dark:bg-[#070E18] relative transition-colors duration-200"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] dark:bg-[#0E1A2C] text-white text-xs font-black uppercase tracking-wider border border-slate-700">
            <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Su’aalaha Badanaa La Isweydiiyo (FAQ)' : 'Frequently Asked Questions'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] dark:text-white tracking-tight">
            {lang === 'so' ? (
              <>
                Su’aalaha Ku Saabsan <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Barashada Qur’aanka</span> & Fasallada
              </>
            ) : (
              <>
                Everything You Need to Know About <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Our Classes</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 dark:text-slate-300 font-medium">
            {lang === 'so'
              ? 'Halkan waxaad ka helaysaa jawaabaha su’aalaha ugu muhiimsan ee waalidiinta iyo ardaydu isweydiiyaan: macallimiinta, saacadaha fasalka, qiimaha, iyo sida fasalka bilaashka ah loo qaato.'
              : 'Find answers to common questions about our scheduling, teaching methods, pricing, and trial sessions.'}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openFaqId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                id={`faq-item-${faq.id}`}
                className={`rounded-3xl border-2 transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-orange-500 bg-white dark:bg-[#0E1A2C] shadow-lg' 
                    : 'border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-[#0E1A2C]/60 shadow-xs hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-black text-[#0B192C] dark:text-white leading-snug">
                    {lang === 'so' ? faq.questionSo : faq.questionEn}
                  </span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-orange-500 text-white rotate-180' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    <ChevronDown className="w-4 h-4 stroke-[3]" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 pt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 font-medium"
                    >
                      <p>{lang === 'so' ? faq.answerSo : faq.answerEn}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions Box in Navy / Orange */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#0B192C] dark:bg-[#0E1A2C] text-white border-2 border-orange-500/30 shadow-2xl text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center mx-auto shadow-md">
            <MessageCircle className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-xl font-black text-white">
              {lang === 'so' ? 'Miyaad qabtaa su’aal kale oo aan halkan ku jirin?' : 'Have a question not listed here?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-medium">
              {lang === 'so' 
                ? 'Kooxdayada caawinta waalidka ayaa diyaar u ah inay kula hadasho daqiiqad kasta WhatsApp.'
                : 'Our parent advisory team is available 24/7 on WhatsApp to answer all your inquiries.'}
            </p>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/251777796444?text=Asc%20Baro%20Quran%20Academy%2C%20su%27aal%20ayaan%20qabaa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black text-sm shadow-lg shadow-orange-500/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'so' ? 'Toos Noogala Hadal WhatsApp (+251 77 779 6444)' : 'Chat on WhatsApp (+251 77 779 6444)'}</span>
            </a>
          </div>
        </div>

      </div>
    </motion.section>
  );
};
