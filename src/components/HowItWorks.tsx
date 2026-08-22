import React from 'react';
import { 
  FileText, 
  Calendar, 
  Video, 
  GraduationCap, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface HowItWorksProps {
  lang: Language;
  onOpenRegister: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang, onOpenRegister }) => {
  const steps = [
    {
      number: '01',
      icon: FileText,
      titleSo: '1. Buuxi Foomka Diiwaangelinta',
      titleEn: '1. Submit Registration Form',
      descSo: 'Geli magaca ardayga, da’diisa, xulashada koorsada (Higaada, Tajwiidka, Xifdiga), iyo macallinka (Lab/Dheddig).',
      descEn: 'Enter student details, age, course choice (Qaida, Tajweed, Hifz), and teacher preference in under 60 seconds.'
    },
    {
      number: '02',
      icon: Calendar,
      titleSo: '2. Dooro Waqtiga Kugu Habboon',
      titleEn: '2. Choose Your Custom Schedule',
      descSo: 'Dooro maalmaha iyo saacadaha ugu habboon qoyskaaga adigoo ku xisaabtamaya aag-waqtiyeedkaaga (UK, US, Yurub, Bariga Dhexe).',
      descEn: 'Select the exact days and time slots that fit your daily schedule across all international time zones.'
    },
    {
      number: '03',
      icon: Video,
      titleSo: '3. Qaado Fasalka Tijaabada (Bilaash)',
      titleEn: '3. Attend Free Live Trial Class',
      descSo: 'Ku biir kalfadhiga tooska ah ee 1-on-1 Zoom/Meet oo bilaash ah. Macallin Soomaali ah oo Ijaazo leh ayaa ardayga qiimaynaya.',
      descEn: 'Join a live 1-on-1 trial session with our certified teacher to experience our teaching approach first-hand.'
    },
    {
      number: '04',
      icon: GraduationCap,
      titleSo: '4. Bilow Safarkaaga Qur’aanka',
      titleEn: '4. Begin Regular Classes',
      descSo: 'Haddii aad ku qanacdo, dooro xirmada ($30, $40, $45) oo bilow casharrada joogtada ah adigoo helaya warbixinno toddobaadle ah.',
      descEn: 'Once fully satisfied, select your preferred monthly plan and embark on continuous Quranic excellence.'
    }
  ];

  return (
    <motion.section 
      id="how-it-works" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-slate-50 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] text-white text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Sidee Loo Bilaabaa?' : 'How It Works'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
            {lang === 'so' ? (
              <>
                4 Talaabo oo Fudud oo aad ku <span className="text-[#0B192C] underline decoration-orange-500 decoration-4 underline-offset-6">Bilaabayso</span> Barashada Qur’aanka
              </>
            ) : (
              <>
                Start Learning in <span className="text-[#0B192C] underline decoration-orange-500 decoration-4 underline-offset-6">4 Simple Steps</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 font-medium">
            {lang === 'so'
              ? 'Nidaam sahlan oo online ah: isdiiwaangeli, qaado fasalka tijaabada ee bilaashka ah, ka dibna bilow koorsadaada.'
              : 'Our streamlined onboarding process gets your child learning with zero friction.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-500 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B192C] text-white flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <span className="text-3xl font-black text-slate-300">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-[#0B192C] mb-2">
                    {lang === 'so' ? step.titleSo : step.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {lang === 'so' ? step.descSo : step.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-orange-600">
                  <span>{lang === 'so' ? 'Talaabada ' + (idx + 1) : 'Step ' + (idx + 1)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick CTA Banner in Deep Navy with Orange Action Button */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#0B192C] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border-2 border-orange-500/30">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'so'
                ? 'Diyaar ma u tahay inaad ilmahaaga bilowdo maanta?'
                : 'Ready to give your child the gift of the Holy Quran?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {lang === 'so'
                ? 'Qaado fasalka tijaabada ee bilaashka ah adigoon wax lacag ah bixin.'
                : 'Book your free trial class now with no financial commitment.'}
            </p>
          </div>

          <button
            onClick={onOpenRegister}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black rounded-2xl shadow-lg shadow-orange-500/30 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>{lang === 'so' ? 'Isqor Hadda (100% Bilaash)' : 'Register Now (Free)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </motion.section>
  );
};
