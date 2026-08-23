import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  Users, 
  GraduationCap,
  MessageCircle,
  Video,
  BookOpen,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, AppPage } from '../types';

interface HeroProps {
  lang: Language;
  onOpenRegister: () => void;
  onNavigate?: (page: AppPage) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenRegister, onNavigate }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-white dark:bg-[#070E18] text-slate-900 dark:text-slate-100 pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      
      {/* Refined Geometric Background Accents (Anti-Glare, High Contrast) */}
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-slate-100 dark:bg-slate-800/30 rounded-bl-[100px] pointer-events-none -z-0 opacity-70" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-orange-50/50 dark:bg-orange-950/10 rounded-tr-[100px] pointer-events-none -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Arabic Calligraphy Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-block px-6 py-1.5 rounded-full bg-slate-100 dark:bg-[#0E1A2C] border border-slate-300 dark:border-slate-700 shadow-xs">
            <span className="font-quran text-lg md:text-xl text-[#0B192C] dark:text-orange-400 tracking-wide font-normal">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>
        </motion.div>

        {/* Main 2-Column Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            
            {/* Main Headline - High Contrast Black / White on Navy without any orange-on-orange clash */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-black tracking-tight leading-[1.18] text-[#0B192C] dark:text-white">
              {lang === 'so' ? (
                <>
                  Baro <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Qur’aanka Kariimka</span>, Barashada Tajwiidka & Higaada Online
                </>
              ) : (
                <>
                  Learn the <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Holy Quran</span>, Tajweed & Noorani Qaida Online
                </>
              )}
            </h1>

            {/* Subtitle enriched with primary SEO keywords */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {lang === 'so'
                ? 'Akadeemiyada ugu tayada wanaagsan ee barashada higaada, tajwiidka suubban, xifdiga Qur’aanka, iyo culuumta diinta. Waxbarasho 1-on-1 ah oo ay bixinayaan macallimiin Soomaali Qur’aan online ah oo haysta Ijaazo sugan.'
                : '1-on-1 live interactive sessions for kids and adults. Master Arabic alphabet (Noorani Qaida), applied Tajweed rules, Quran memorization (Hifz), authentic Hadith, and Seerah with certified Somali & Arabic scholars.'}
            </p>

            {/* Key Value Points Checklist with high contrast icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900 dark:text-slate-200 bg-slate-50 dark:bg-[#0E1A2C] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span>{lang === 'so' ? '1-on-1 Fasallo Gaar ah (Private Classes)' : '1-on-1 Private Live Tutoring'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900 dark:text-slate-200 bg-slate-50 dark:bg-[#0E1A2C] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span>{lang === 'so' ? 'Macallimiin Soomaali Ijaazo leh' : 'Certified Male & Female Scholars'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900 dark:text-slate-200 bg-slate-50 dark:bg-[#0E1A2C] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span>{lang === 'so' ? 'Waqtiyo 24/7 ah (UK, USA, Yurub)' : 'Flexible 24/7 Global Scheduling'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900 dark:text-slate-200 bg-slate-50 dark:bg-[#0E1A2C] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span>{lang === 'so' ? 'Fasalka Tijaabada oo 100% Bilaash ah' : '100% Free Trial Class'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                id="hero-cta-trial"
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-8 py-4 text-base font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>{lang === 'so' ? 'Qaado Fasalka Tijaabada (Bilaash)' : 'Book Free Trial Class'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {onNavigate ? (
                <button
                  onClick={() => onNavigate('courses')}
                  className="w-full sm:w-auto px-6 py-4 text-base font-bold text-[#0B192C] dark:text-white bg-white dark:bg-[#0E1A2C] hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-[#0B192C] dark:border-slate-600 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5 text-orange-500" />
                  <span>{lang === 'so' ? 'Daawo Koorsooyinka & Manhajka' : 'Explore Courses'}</span>
                </button>
              ) : (
                <a
                  href="#courses"
                  className="w-full sm:w-auto px-6 py-4 text-base font-bold text-[#0B192C] dark:text-white bg-white dark:bg-[#0E1A2C] hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-[#0B192C] dark:border-slate-600 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <GraduationCap className="w-5 h-5 text-orange-500" />
                  <span>{lang === 'so' ? 'Daawo Koorsooyinka & Manhajka' : 'Explore Courses'}</span>
                </a>
              )}
            </div>

            {/* Parent Trust Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <div>
                <span className="font-black text-[#0B192C] dark:text-white">4.98 / 5.0</span>
                <span className="text-slate-600 dark:text-slate-400 ml-1.5 font-semibold">
                  ({lang === 'so' ? 'In ka badan 500+ qoys oo ku qanacsan aduunka oo dhan' : 'Rated 4.98/5 by 500+ families worldwide'})
                </span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Hero Visual Showcase with High Contrast */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Interactive Card with high contrast border & background */}
            <div className="relative rounded-3xl bg-white dark:bg-[#0E1A2C] border-2 border-[#0B192C] dark:border-slate-700 p-6 sm:p-7 shadow-2xl overflow-hidden">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B192C] dark:bg-slate-800 flex items-center justify-center text-white">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-[#0B192C] dark:text-white">
                      {lang === 'so' ? 'Fasalka Tooska ah ee Tijaabada' : 'Live Quran Demo Class'}
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      {lang === 'so' ? 'Macallimiinta Soomaaliyeed waa diyaar' : 'Live Scholars Ready Online'}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 text-[11px] font-black rounded-full bg-[#0B192C] dark:bg-slate-800 text-white">
                  {lang === 'so' ? '100% BILAASH' : '100% FREE'}
                </span>
              </div>

              {/* Sample Quran Page / Noorani Preview Inside Card */}
              <div className="my-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#070E18] border border-slate-200 dark:border-slate-700 text-center space-y-2">
                <p className="text-xs text-slate-700 dark:text-slate-400 uppercase tracking-wider font-extrabold">
                  {lang === 'so' ? 'Aayadda Maanta (Daily Recitation)' : 'Verse of the Day'}
                </p>
                <div className="font-quran text-2xl sm:text-3xl text-[#0B192C] dark:text-orange-400 py-1 leading-relaxed font-bold">
                  وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium italic">
                  {lang === 'so' 
                    ? '"Una akhri Qur’aanka si degan oo Tajwiid leh." (Suurada Al-Muzammil)' 
                    : '"And recite the Quran with measured, rhythmic recitation." (Surah Al-Muzzammil)'}
                </p>
              </div>

              {/* Quick Perks List with High Contrast */}
              <div className="space-y-2 text-xs text-slate-800 dark:text-slate-200 mb-5">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#070E18] border border-slate-200 dark:border-slate-700">
                  <span className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-orange-500" />
                    {lang === 'so' ? 'Xulashada Macallinka:' : 'Teacher Preference:'}
                  </span>
                  <span className="font-black text-[#0B192C] dark:text-white">{lang === 'so' ? 'Lab ama Dheddig' : 'Male or Female'}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#070E18] border border-slate-200 dark:border-slate-700">
                  <span className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-400">
                    <Clock className="w-4 h-4 text-orange-500" />
                    {lang === 'so' ? 'Muddada Fasalka:' : 'Class Duration:'}
                  </span>
                  <span className="font-black text-[#0B192C] dark:text-white">{lang === 'so' ? '30 Daqiiqo (Qiimeyn)' : '30 Mins Live Evaluation'}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#070E18] border border-slate-200 dark:border-slate-700">
                  <span className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-400">
                    <Users className="w-4 h-4 text-orange-500" />
                    {lang === 'so' ? 'Habka Waxbarashada:' : 'Format:'}
                  </span>
                  <span className="font-black text-[#0B192C] dark:text-white">1-on-1 Zoom / Google Meet</span>
                </div>
              </div>

              {/* Direct Booking Trigger */}
              <button
                id="card-cta-btn"
                onClick={onOpenRegister}
                className="w-full py-3.5 text-center text-sm font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'so' ? 'Qaado Fasalka Tijaabada Hadda' : 'Book Free Trial Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 text-center">
                <a
                  href="https://wa.me/251777796444?text=Asc%20Baro%20Quran%20Academy%2C%20waxaan%20doonayaa%20in%20aan%20is-qoro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-slate-800 dark:text-slate-300 hover:text-orange-600 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-orange-500" />
                  <span>{lang === 'so' ? 'WhatsApp: +251 77 779 6444' : 'WhatsApp: +251 77 779 6444'}</span>
                </a>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Bottom Stats Banner in Dark Navy Ribbon Style with High Contrast */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="stats-banner" 
          className="mt-14 p-6 rounded-2xl bg-[#0B192C] dark:bg-[#0E1A2C] text-white shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-2 border-orange-500/40"
        >
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-white">569+</div>
            <div className="text-xs sm:text-sm text-slate-300 font-bold">
              {lang === 'so' ? 'Arday oo Qalinjabisay' : 'Graduated Students'}
            </div>
          </div>

          <div className="space-y-1 border-l border-slate-700 pl-4">
            <div className="text-2xl sm:text-3xl font-black text-white">13</div>
            <div className="text-xs sm:text-sm text-slate-300 font-bold">
              {lang === 'so' ? 'Macallimiin Ijaazo Leh' : 'Certified Scholars & Hafiz'}
            </div>
          </div>

          <div className="space-y-1 border-l border-slate-700 pl-4">
            <div className="text-2xl sm:text-3xl font-black text-white">40+</div>
            <div className="text-xs sm:text-sm text-slate-300 font-bold">
              {lang === 'so' ? 'Waddan oo Ardaydu joogaan' : 'Countries Worldwide'}
            </div>
          </div>

          <div className="space-y-1 border-l border-slate-700 pl-4">
            <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
            <div className="text-xs sm:text-sm text-slate-300 font-bold">
              {lang === 'so' ? 'Qanacsanaanta Waalidiinta' : 'Parent Satisfaction Rate'}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
