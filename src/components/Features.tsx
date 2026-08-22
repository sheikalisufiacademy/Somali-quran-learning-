import React from 'react';
import { 
  Users, 
  Award, 
  Clock, 
  BookOpenCheck, 
  BarChart3, 
  ShieldCheck,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface FeaturesProps {
  lang: Language;
}

export const Features: React.FC<FeaturesProps> = ({ lang }) => {
  const features = [
    {
      icon: Users,
      bgLight: 'bg-[#0B192C] text-white border-[#0B192C]',
      titleSo: '1-on-1 Fasallo Qof-iyo-Qof Gaar ah',
      titleEn: '1-on-1 Personalized Private Sessions',
      descSo: 'Arday walba waxa uu helayaa macallin Soomaali ah oo gaar u ah oo dareenkiisa 100% siiya. Waxaa lagu bartaa barashada higaada, tajwiidka iyo xifdiga Qur’aanka.',
      descEn: 'Every student receives undivided 1-on-1 attention from a dedicated teacher. No group distractions, ensuring maximum focus and rapid learning progress.'
    },
    {
      icon: Award,
      bgLight: 'bg-orange-500 text-white border-orange-500',
      titleSo: 'Macallimiin Soomaali Qur’aan Online leh Ijaazo',
      titleEn: 'Certified Male & Female Scholars with Ijazah',
      descSo: 'Dhammaan macallimiinteennu waa Xaafidiin haysta Sanad ku xiran Rasuulka (NNKH), shahaadooyin jaamacadeed, iyo qibrad gaar ah oo ku saabsan carruurta qurbaha (Diaspora).',
      descEn: 'All our instructors hold continuous Ijazah Sanad chains, university degrees in Shariah/Quranic sciences, and specialized experience in educating diaspora youth.'
    },
    {
      icon: Clock,
      bgLight: 'bg-[#0B192C] text-white border-[#0B192C]',
      titleSo: 'Waqtiyo 24/7 ah oo Aad Adigu Dooranayso',
      titleEn: 'Flexible 24/7 Global Scheduling',
      descSo: 'Waxaan la shaqaynaa dhammaan aag-waqtiyeedyada caalamka (UK, USA, Canada, Yurub, Bariga Dhexe). Adigaa dooranaya saacadaha iyo maalmaha qoyskaaga ku habboon.',
      descEn: 'Accommodating all time zones (UK, US, Canada, Europe, Middle East). Choose the exact days and time slots that fit seamlessly into your family routine.'
    },
    {
      icon: BookOpenCheck,
      bgLight: 'bg-orange-500 text-white border-orange-500',
      titleSo: 'Best Madarsa & Malcaamad Online oo Casri ah',
      titleEn: 'Modern & Structured Islamic Curriculum',
      descSo: 'Manhajkeennu waxa uu ka kooban yahay Qaacidada Nuuraaniyada, barashada tajwiidka cilmiyan, xifdiga Qur’aanka, axaadiista saxiixa ah, iyo seeradda Nabiga (SCW).',
      descEn: 'Step-by-step curriculum integrating Noorani Qaida, applied Tajweed, memorization, daily authentic Adhkar, and noble Islamic character development.'
    },
    {
      icon: BarChart3,
      bgLight: 'bg-[#0B192C] text-white border-[#0B192C]',
      titleSo: 'Warbixin Toddobaadle ah oo Waalidka Loo Diro',
      titleEn: 'Weekly Parent Progress Reports',
      descSo: 'Waalidku waxa uu helayaa warbixin faahfaahsan oo ku saabsan casharrada uu qaatay, aayadaha uu xifdiyay, dhibcaha akhlaaqda, iyo tilmaamaha macallinka.',
      descEn: 'Parents receive comprehensive weekly reports tracking verses memorized, attendance, Tajweed accuracy, and teacher feedback directly on WhatsApp/Email.'
    },
    {
      icon: ShieldCheck,
      bgLight: 'bg-orange-500 text-white border-orange-500',
      titleSo: 'Fasalka Tijaabada oo 100% Bilaash ah',
      titleEn: '100% Risk-Free Trial Class',
      descSo: 'Tijaabi adeeggayaga adiga oo aan bixin wax lacag ah ama kaadh gelin. Haddii aad ku qanacdo oo kaliya ayaad go’aansanaysaa inaad nala sii wadato.',
      descEn: 'Experience our world-class teaching with a no-obligation free trial. Evaluate our platform and instructors before making any payment commitment.'
    }
  ];

  return (
    <motion.section 
      id="why-us" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-slate-50 relative overflow-hidden"
    >
      
      {/* Background subtle geometric touches */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] text-white text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Maxaad Noo Dooranaysaa?' : 'Why Choose Us?'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
            {lang === 'so' ? (
              <>
                Sababaha <span className="text-[#0B192C] underline decoration-orange-500 decoration-4 underline-offset-6">Baro Quran Academy</span> ay u Tahay Madarasadda 1-aad
              </>
            ) : (
              <>
                Why Families Globally Trust <span className="text-[#0B192C] underline decoration-orange-500 decoration-4 underline-offset-6">Baro Quran Academy</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 font-medium">
            {lang === 'so'
              ? 'Waxaan dhisnay madarasad & malcaamad online oo ammaan ah, tayadeedu sarrayso, oo carruurta qurbaha ku dhiirrigelisa barashada Qur’aanka Kariimka iyo culuumta Islaamka.'
              : 'We combine authentic Islamic scholarly tradition with modern interactive educational technology for transformative Quranic learning.'}
          </p>
        </div>

        {/* Feature Grid with staggered entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                id={`feature-card-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md border ${item.bgLight} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-[#0B192C] mb-3 group-hover:text-orange-600 transition-colors">
                  {lang === 'so' ? item.titleSo : item.titleEn}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {lang === 'so' ? item.descSo : item.descEn}
                </p>

                {/* Bottom decorative accent */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-orange-600">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  <span>{lang === 'so' ? 'Tayo la hubo' : 'Guaranteed Excellence'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
};
