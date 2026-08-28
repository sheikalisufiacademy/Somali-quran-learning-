import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Award, 
  Clock, 
  BookOpenCheck, 
  BarChart3, 
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Heart,
  Target,
  GraduationCap,
  Lightbulb,
  Compass,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

interface FeaturesProps {
  lang: Language;
  targetSection?: string;
  onOpenSingleAbout?: (topicId: string) => void;
}

export const Features: React.FC<FeaturesProps> = ({ lang, targetSection, onOpenSingleAbout }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'story' | 'methodology' | 'approach' | 'mission' | 'philosophy'>('all');

  useEffect(() => {
    if (targetSection) {
      if (targetSection === 'our-story') setActiveTab('story');
      else if (targetSection === 'methodology') setActiveTab('methodology');
      else if (targetSection === 'approach') setActiveTab('approach');
      else if (targetSection === 'why-we-exist') setActiveTab('mission');
      else if (targetSection === 'philosophy') setActiveTab('philosophy');
    }
  }, [targetSection]);

  const features = [
    {
      icon: Users,
      bgLight: 'bg-[#0B192C] text-white border-[#0B192C]',
      titleSo: '1-on-1 Fasallo Qof-iyo-Qof Gaar ah',
      titleEn: '1-on-1 Personalized Private Sessions',
      descSo: 'Arday walba waxa uu helayaa macallin gaar u ah oo dareenkiisa 100% siiya. Waxaa si toos ah loo bartaa barashada higaada, tajwiidka iyo xifdiga Qur’aanka.',
      descEn: 'Every student receives undivided 1-on-1 attention from a dedicated teacher. No group distractions, ensuring maximum focus and rapid learning progress.'
    },
    {
      icon: Award,
      bgLight: 'bg-orange-500 text-white border-orange-500',
      titleSo: 'Macallimiin Qur’aan Online leh Ijaazo',
      titleEn: 'Certified Male & Female Scholars with Ijazah',
      descSo: 'Dhammaan macallimiinteennu waa Xaafidiin haysta Sanad ku xiran Rasuulka (NNKH), shahaadooyin jaamacadeed, iyo qibrad gaar ah oo ku saabsan baridda carruurta iyo qoysaska meel kasta oo ay joogaan.',
      descEn: 'All our instructors hold continuous Ijazah Sanad chains, university degrees in Shariah/Quranic sciences, and extensive experience in educating students and youth worldwide.'
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
      titleSo: 'Madarsa & Malcaamad Online oo Casri ah',
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

  const deepSections = [
    {
      id: 'our-story',
      tabKey: 'story' as const,
      icon: BookOpen,
      titleSo: 'Sheekadeenna & Asalka Baro Quran Academy',
      titleEn: 'Our Story & Founding Vision',
      badgeSo: 'Taariikhda Akadeemiyada',
      badgeEn: 'Our Story',
      highlightSo: 'Dhisidda buundo xiriirisa jiilka cusub iyo Qur’aanka Kariimka meel kasta oo ay joogaan.',
      highlightEn: 'Bridging the distance between Muslim families worldwide and certified Quran scholars.',
      descSo: 'Baro Quran Academy waxaa la aasaasay si loo daboolo baahida weyn ee ay qoysaska muslimiinta ah ee ku kala nool daafaha dunida u qabaan barashada Qur’aanka Kariimka oo leh tayo sare, hab casri ah, iyo macallimiin qibrad leh oo ardayda u dhoweeya diinta.',
      descEn: 'Baro Quran Academy was founded to meet the growing need of Muslim families globally seeking exceptional, 1-on-1 online Quran education with certified, patient, and bilingual educators.',
      pointsSo: [
        'In ka badan 500+ arday oo aduunka oo dhan ku kala nool oo wax ka barta',
        'Macallimiin heysta Ijaazooyin sare iyo aqoon qoto dheer',
        'Fasal toos ah oo digital ah oo ardayga iyo macallinka qof-iyo-qof u kulmiya'
      ],
      pointsEn: [
        'Serving hundreds of students worldwide across Africa, Middle East, Europe, Americas, and Australia',
        'Instructors with verified Ijazah credentials and pedagogical training',
        'Interactive 1-on-1 virtual classrooms designed for kids and adults'
      ]
    },
    {
      id: 'methodology',
      tabKey: 'methodology' as const,
      icon: Target,
      titleSo: 'Habka Waxbarasho & Manhajka 1-on-1 ee Casriga ah',
      titleEn: 'Our Interactive 1-on-1 Teaching Methodology',
      badgeSo: 'Habka Dhigista',
      badgeEn: 'Teaching Methodology',
      highlightSo: 'Barasho ku dhisan faham, ku celcelin, iyo sixitaan toos ah oo naxariis leh.',
      highlightEn: 'Interactive, child-centric learning emphasizing phonetics, practical Tajweed, and love for the Quran.',
      descSo: 'Manhajkeennu ma aha oo kaliya akhrin caadi ah, balse waa tababar cilmiyeysan oo ardayga lagu barayo makhariijta saxda ah ee xarfaha, shuruucda Tajwiidka, xifdi sugan, iyo ku dhaqanka aayadaha.',
      descEn: 'We implement modern visual aids, digital whiteboards, screen-shared Mushaf interfaces, and voice resonance correction to ensure every student recites with flawless confidence.',
      pointsSo: [
        'Sixitaan toos ah oo codka iyo makhariijta xarfaha ah',
        'Jadwal waxbarasho oo ardaygu maalin kasta ku qaato 30-45 daqiiqo oo gooni ah',
        'Imtixaanno iyo shahaadooyin la siiyo ardayga marka uu marxalad dhameysto'
      ],
      pointsEn: [
        'Real-time pronunciation and articulation feedback from certified teachers',
        'Tailored lesson plans (30–45 mins) suited for optimal student attention',
        'Periodic level tests and formal completion certificates'
      ]
    },
    {
      id: 'approach',
      tabKey: 'approach' as const,
      icon: Heart,
      titleSo: 'Daryeelka Ardayda & Qoysaska (Our Approach)',
      titleEn: 'Our Student-Centered & Family-First Approach',
      badgeSo: 'Daryeelka & Xiriirka',
      badgeEn: 'Our Approach',
      highlightSo: 'Xiriir joogto ah oo u dhexeeya maamulka, macallinka, iyo waalidka.',
      highlightEn: 'Transparent parent partnership, compassionate mentorship, and respectful learning environments.',
      descSo: 'Waxaan aaminsanahay in waxbarashada carruurtu ay guulaysato marka waalidka iyo macallinku si wadajir ah u wada shaqeeyaan. Macallimiinteennu waxay ardayda ula dhaqmaan si debecsan oo dhiirrigelin leh.',
      descEn: 'We treat every child as family. Our patient, supportive instructors foster a love of learning rather than fear of mistakes, creating a thriving environment for lifelong Islamic growth.',
      pointsSo: [
        'Warbixinno toddobaadle ah oo waalidka loogu diro WhatsApp ama Email',
        'Fursad waalidku ku daawan karo ama kula socon karo fasallada carruurtooda',
        'Kala doorashada macallimiin lab ama dhedig ah (Male/Female Teachers)'
      ],
      pointsEn: [
        'Weekly WhatsApp progress tracking and transparent feedback',
        'Open parental oversight with secure Zoom/Google Meet links',
        'Choice of certified male or female teachers according to family preference'
      ]
    },
    {
      id: 'why-we-exist',
      tabKey: 'mission' as const,
      icon: Compass,
      titleSo: 'Ujeeddada & Hadafka Baro Quran Academy',
      titleEn: 'Why We Exist & Academy Mission',
      badgeSo: 'Hadafka & Ujeeddada',
      badgeEn: 'Why We Exist',
      highlightSo: 'U fududeynta qoysaska helitaanka waxbarasho diini ah oo hufan gurigooda dhexdiisa.',
      highlightEn: 'Making premier authentic Quranic education accessible and effortless from home.',
      descSo: 'Qoysas badan oo aduunka ku nool waxay la kulmaan dhibaato dhanka helitaanka macallimiin tayo leh oo waqti ku habboon heysta ama meel u dhow. Baro Quran Academy waxay xallisay caqabaddaas iyadoo macallin heer sare ah toos u keenaysa gurigaaga.',
      descEn: 'Finding qualified, trusted Quran teachers with flexible schedules can be challenging in many parts of the world. We bridge this barrier by delivering elite 1-on-1 private tuition right to your home.',
      pointsSo: [
        'Waqtiyo dabacsan oo 24/7 ah oo aduunka oo dhan ku habboon',
        'Qiimo macquul ah oo qoysaska u sahlaya waxbarasho joogto ah',
        'Ammaan buuxa iyo deegaan waxbarasho oo carruurta ku habboon'
      ],
      pointsEn: [
        '24/7 global schedule flexibility serving students across all worldwide time zones',
        'Affordable subscription plans with family discounts',
        'Safe, vetted, and supervised educational environment'
      ]
    },
    {
      id: 'philosophy',
      tabKey: 'philosophy' as const,
      icon: GraduationCap,
      titleSo: 'Falsafadda Waxbarasho & Tarbiyada Qoyska',
      titleEn: 'Our Learning Philosophy & Tarbiyah',
      badgeSo: 'Falsafadda Waxbarashada',
      badgeEn: 'Learning Philosophy',
      highlightSo: 'Isku-darka aqoonta Qur’aanka, akhlaaqda suubban, iyo jacaylka diinta.',
      highlightEn: 'Integrating Quranic fluency, righteous character, and lifelong love for the Deen.',
      descSo: 'Falsafaddeennu waxay ku qotontaa in Qur’aanka barashadiisu aysan noqon culeys, balse ay noqoto waqti farxadeed oo iftiimiya maskaxda iyo qalbiga ardayga, dhisayana akhlaaq wanaagsan.',
      descEn: 'We believe Quran education should be joyful and transformative. We instill love for Allah\'s words, understanding of core Islamic morals, and self-confidence in young Muslim learners.',
      pointsSo: [
        'Dhisidda akhlaaqda Islaamka iyo aadaabta maalinlaha ah',
        'Barashada ducooyinka iyo axaadiista ku habboon nolosha maalinlaha ah',
        'Dhiirrigelin joogto ah iyo abaalmarino lagu dhiirrigeliyo dadaalka ardayga'
      ],
      pointsEn: [
        'Cultivating Islamic manners, respect, honesty, and empathy',
        'Practical daily Duas and Hadith integration into regular routines',
        'Encouraging milestone rewards to celebrate each student\'s achievements'
      ]
    }
  ];

  return (
    <motion.section 
      id="why-us" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 sm:py-20 bg-slate-50 dark:bg-[#070E18] relative overflow-hidden transition-colors duration-200"
    >
      {/* Background subtle geometric touches */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-800 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] dark:bg-[#0E1A2C] text-white text-xs font-black uppercase tracking-wider border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Maxaad Noo Dooranaysaa?' : 'Why Choose Us?'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] dark:text-white tracking-tight">
            {lang === 'so' ? (
              <>
                Sababaha <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Baro Quran Academy</span> ay u Tahay Madarasadda 1-aad
              </>
            ) : (
              <>
                Why Families Globally Trust <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Baro Quran Academy</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 dark:text-slate-300 font-medium">
            {lang === 'so'
              ? 'Waxaan dhisnay madarasad & malcaamad online oo ammaan ah, tayadeedu sarrayso, oo qoys kasta aduunka daafihiisa ku dhiirrigelisa barashada Qur’aanka Kariimka iyo culuumta Islaamka.'
              : 'We combine authentic Islamic scholarly tradition with modern interactive educational technology for transformative Quranic learning.'}
          </p>
        </div>

        {/* Interactive Filter / Section Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12" role="tablist">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white dark:bg-[#0E1A2C] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-orange-400'
            }`}
          >
            {lang === 'so' ? 'Dhammaan Faa’iidooyinka' : 'All Features'}
          </button>

          {deepSections.map((sec) => (
            <button
              key={sec.tabKey}
              type="button"
              onClick={() => setActiveTab(sec.tabKey)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === sec.tabKey
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white dark:bg-[#0E1A2C] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-orange-400'
              }`}
            >
              {lang === 'so' ? sec.badgeSo : sec.badgeEn}
            </button>
          ))}
        </div>

        {/* Main 6 Feature Cards Grid */}
        <AnimatePresence mode="wait">
          {activeTab === 'all' && (
            <motion.div
              key="all-features"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    id={`feature-card-${idx}`}
                    className="group relative bg-white dark:bg-[#0E1A2C] rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Icon Container */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md border ${item.bgLight} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-[#0B192C] dark:text-white mb-3 group-hover:text-orange-500 transition-colors">
                      {lang === 'so' ? item.titleSo : item.titleEn}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {lang === 'so' ? item.descSo : item.descEn}
                    </p>

                    {/* Bottom decorative accent */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      <span>{lang === 'so' ? 'Tayo la hubo' : 'Guaranteed Excellence'}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detailed Sections (Our Story, Teaching Methodology, Our Approach, Why We Exist, Learning Philosophy) */}
        <div className="space-y-12">
          {deepSections
            .filter(sec => activeTab === 'all' || activeTab === sec.tabKey)
            .map((section, sIdx) => {
              const SectionIcon = section.icon;
              return (
                <div
                  key={section.id}
                  id={section.id}
                  className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-8 sm:p-10 border-2 border-slate-200 dark:border-slate-700/80 shadow-md hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                    <div className="flex-1 space-y-4">
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md shrink-0">
                          <SectionIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                            {lang === 'so' ? section.badgeSo : section.badgeEn}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-[#0B192C] dark:text-white">
                            {lang === 'so' ? section.titleSo : section.titleEn}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-orange-600 dark:text-orange-400 font-bold">
                        "{lang === 'so' ? section.highlightSo : section.highlightEn}"
                      </p>

                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {lang === 'so' ? section.descSo : section.descEn}
                      </p>

                      {onOpenSingleAbout && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => onOpenSingleAbout(section.id)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-600 hover:text-white dark:text-orange-400 dark:hover:text-white font-extrabold text-xs transition-all cursor-pointer border border-orange-500/20"
                          >
                            <span>Read Full Article & In-Depth Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Bullet Points Box */}
                    <div className="w-full lg:w-[420px] bg-slate-50 dark:bg-[#070E18] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-3 shrink-0">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span>{lang === 'so' ? 'Qodobbada Ugu Muhiimsan' : 'Key Highlights'}</span>
                      </h4>

                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                        {(lang === 'so' ? section.pointsSo : section.pointsEn).map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              );
            })}
        </div>

      </div>
    </motion.section>
  );
};
