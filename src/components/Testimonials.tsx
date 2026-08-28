import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquareQuote, 
  MapPin, 
  CheckCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Clock,
  User,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { TESTIMONIALS_DATA } from '../data/academyData';

interface TestimonialsProps {
  lang: Language;
  targetId?: string;
}

interface Article {
  id: string;
  titleSo: string;
  titleEn: string;
  categorySo: string;
  categoryEn: string;
  readTimeSo: string;
  readTimeEn: string;
  summarySo: string;
  summaryEn: string;
  contentSo: string[];
  contentEn: string[];
  author: string;
  date: string;
}

const ARTICLES_DATA: Article[] = [
  {
    id: 'benefits-online-quran',
    titleSo: 'Faa’iidooyinka Barashada Qur’aanka Online-ka ee Carruurta & Qoysaska',
    titleEn: 'The Transformative Benefits of 1-on-1 Online Quran Learning for Kids',
    categorySo: 'Waxbarashada Casriga ah',
    categoryEn: 'Modern Education',
    readTimeSo: '4 daqiiqo',
    readTimeEn: '4 min read',
    author: 'Sheikh Cabdiraxmaan (Madaxa Waxbarashada)',
    date: '2025',
    summarySo: 'Sida fasallada 1-on-1 ee online-ka ahi ay u badaleen habka waxbarashada carruurta iyo qoysaska ku nool daafaha caalamka.',
    summaryEn: 'How private 1-on-1 online classes have revolutionized Quranic literacy for Muslim families across the globe.',
    contentSo: [
      'Barashada Qur’aanka Kariimka ee qof-iyo-qof (1-on-1) waxay u saamaxdaa ardayga inuu helo 100% dareenka macallinka, taasoo horseedda inuu degdeg wax u barto.',
      'Waalidku waxa uu awoodaa inuu guriga dhexdiisa ku kormeero casharrada ilmaha isaga oo aan u baahnayn inuu masaafad dheer u kaxeeyo maalin kasta.',
      'Macallimiinteennu waxay adeegsadaan tabaha casriga ah sida screen sharing, codka oo si toos ah loo saxo, iyo dhiirrigelin joogto ah oo ilmaha jecleysiisa diinta.'
    ],
    contentEn: [
      'Private 1-on-1 Quran tutoring guarantees the student undivided teacher attention, ensuring rapid phonetics and Tajweed mastery.',
      'Parents can easily supervise lessons from the comfort of their home without lengthy daily commutes.',
      'Our certified instructors leverage digital Mushafs, interactive tools, and positive reinforcement to cultivate genuine love for the Quran.'
    ]
  },
  {
    id: 'hifz-memorization-tips',
    titleSo: '5 Talo oo Muhiim ah oo Fududeynaya Xifdinta Qur’aanka Kariimka',
    titleEn: '5 Essential Habits for Fast & Lasting Quran Memorization (Hifz)',
    categorySo: 'Xifdiga & Dib-u-eegista',
    categoryEn: 'Hifz & Revision',
    readTimeSo: '5 daqiiqo',
    readTimeEn: '5 min read',
    author: 'Ustaad Maxamed (Xaafid & Macallin Sare)',
    date: '2025',
    summarySo: 'Hababka ugu wanaagsan ee ardaygu ku xifdin karo aayadaha cusub isagoo aan ilaawin kuwii hore.',
    summaryEn: 'Proven techniques for mastering new verses while maintaining solid long-term retention of previous Juz.',
    contentSo: [
      '1. Isticmaal hal nooc oo Mushaf ah: Maskaxdu waxay sawirataa bogga aad wax ka xifdinayso, markaa ha badalin nuqulka aad wax ka akhrisanayso.',
      '2. Subac iyo Dib-u-eegis joogto ah (Muraja’ah): Xifdi cusub ha ku darin ilaa aad si fiican u xaqiijiso casharradii hore.',
      '3. Akhris faham leh iyo dhageysi: Dhageyso quraanka ka hor inta aadan bilaabin xifdinta si aad makhariijta saxda ah u qaadato.',
      '4. U heellanow waqti go’an: Subaxda hore ama galabta ka dib waa xilliyada ugu fiican ee maskaxdu feejigan tahay.',
      '5. Ducada iyo niyad-sallaan: Mar walba Alle bari inuu kuu fududeeyo xafididda xikmaddiisa iyo kitaabkiisa sharafta leh.'
    ],
    contentEn: [
      '1. Stick to one Mushaf print: Visual memory plays a huge role in recalling verse locations on the page.',
      '2. Consistent Muraja’ah (Revision): Never advance to new pages before anchoring the previous portions solidly.',
      '3. Active listening: Listen to master reciters before memorizing to internalize flawless Tajweed and pauses.',
      '4. Dedicated time slot: Early mornings offer the highest cognitive focus and tranquility.',
      '5. Sincere Dua: Regularly pray for steadfastness and barakah in retaining Allah’s sacred words.'
    ]
  },
  {
    id: 'noorani-qaida-foundation',
    titleSo: 'Maxay Qaacidada Nuuraaniyadu u Tahay Furaha Akhriska Saxda ah?',
    titleEn: 'Why Noorani Qaida is the Golden Foundation for Quranic Fluency',
    categorySo: 'Higaada & Aasaaska',
    categoryEn: 'Foundation & Phonetics',
    readTimeSo: '3 daqiiqo',
    readTimeEn: '3 min read',
    author: 'Ustaada Maryam (Khabiirada Higaada)',
    date: '2025',
    summarySo: 'Sida Qaacidada Nuuraaniyadu u barto ardayda makhariijta saxda ah ee xaraf kasta iyo isku-xirka ereyada.',
    summaryEn: 'How Noorani Qaida trains young learners in accurate articulation points and vowel movements with ease.',
    contentSo: [
      'Qaacidada Nuuraaniyadu waa manhaj qarniyo la tijaabiyay oo si tartiib-tartiib ah ardayga ugu gudbiya xarfaha kali-kalida ah, shaqallada, tanwiinta, iyo shaddada.',
      'Waxay ilmaha ku tababartaa inuu si dabiici ah u garto xarfaha carabiga ah isagoo aan ku dhibtoon marka uu u gudbo Mushafka weyn.',
      'Baro Quran Academy waxay bixisaa manhajkan iyadoo la adeegsanayo casharro kooban oo maalinle ah oo aad u xiiso badan.'
    ],
    contentEn: [
      'Noorani Qaida is a time-tested syllabus that systematically transitions students from single Arabic letters to complex vowel rules.',
      'It equips learners with instinctive phonetic precision, eliminating hesitation when reading full Quranic pages.',
      'Baro Quran Academy delivers this course through engaging, bite-sized lessons suited for children and beginners of all ages.'
    ]
  }
];

export const Testimonials: React.FC<TestimonialsProps> = ({ lang, targetId }) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'articles'>('reviews');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (targetId === 'articles') {
      setActiveTab('articles');
      const el = document.getElementById('articles-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [targetId]);

  return (
    <motion.section 
      id="reviews" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 sm:py-20 bg-slate-50 dark:bg-[#070E18] relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] dark:bg-[#0E1A2C] text-white text-xs font-black uppercase tracking-wider border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Aragtida & Maqaallada' : 'Reviews & Articles'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] dark:text-white tracking-tight">
            {lang === 'so' ? (
              <>
                Aragtida Waalidiinta & <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Maqaallada Baro Quran Academy</span>
              </>
            ) : (
              <>
                Parent Reviews & <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Learning Insights</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 dark:text-slate-300 font-medium">
            {lang === 'so'
              ? 'Aragtiyo dhab ah oo ka yimid qoysaska aduunka oo dhan iyo maqaallo waxbarasho oo ku saabsan barashada Qur’aanka iyo tarbiyada qoyska.'
              : 'Real parent testimonials worldwide along with expert educational articles guiding Quranic literacy.'}
          </p>
        </div>

        {/* Tab Switcher: Reviews vs Articles */}
        <div className="flex items-center justify-center gap-3 mb-12" role="tablist">
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                : 'bg-white dark:bg-[#0E1A2C] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-orange-400'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>{lang === 'so' ? 'Aragtida Waalidiinta (Reviews)' : 'Parent Reviews'}</span>
          </button>

          <button
            type="button"
            id="articles-section"
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                : 'bg-white dark:bg-[#0E1A2C] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-orange-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'so' ? 'Maqaallada & Blog (Articles)' : 'Blog & Articles'}</span>
          </button>
        </div>

        {/* Content: Reviews */}
        <AnimatePresence mode="wait">
          {activeTab === 'reviews' && (
            <motion.div
              key="tab-reviews"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {TESTIMONIALS_DATA.map((item, idx) => (
                <div
                  key={item.id}
                  id={`review-${item.id}`}
                  className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-2xl hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Rating Stars & Quote Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <MessageSquareQuote className="w-6 h-6 text-orange-500" />
                    </div>

                    {/* Comment */}
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed mb-6 font-medium">
                      "{lang === 'so' ? item.commentSo : item.commentEn}"
                    </p>
                  </div>

                  {/* Author & Student Info */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-[#0B192C] dark:text-white">
                        {item.parentName}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/40 px-2.5 py-0.5 rounded-full border border-transparent dark:border-orange-900/40">
                        <CheckCircle className="w-3 h-3" />
                        {lang === 'so' ? 'Waalid Xaqiijisan' : 'Verified Parent'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                      {lang === 'so' ? 'Ardayga:' : 'Student:'} {lang === 'so' ? item.studentNameSo : item.studentNameEn}
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Content: Blog & Articles */}
          {activeTab === 'articles' && (
            <motion.div
              key="tab-articles"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {ARTICLES_DATA.map((art) => (
                <div
                  key={art.id}
                  id={`article-${art.id}`}
                  className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-7 border-2 border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[11px] font-black bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
                        {lang === 'so' ? art.categorySo : art.categoryEn}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lang === 'so' ? art.readTimeSo : art.readTimeEn}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-[#0B192C] dark:text-white leading-snug">
                      {lang === 'so' ? art.titleSo : art.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {lang === 'so' ? art.summarySo : art.summaryEn}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                      <User className="w-3.5 h-3.5 text-orange-500" />
                      <span className="truncate max-w-[160px]">{art.author}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedArticle(art)}
                      className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>{lang === 'so' ? 'Akhriso' : 'Read'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0E1A2C] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-700 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-black bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 inline-block">
                  {lang === 'so' ? selectedArticle.categorySo : selectedArticle.categoryEn}
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-[#0B192C] dark:text-white">
                  {lang === 'so' ? selectedArticle.titleSo : selectedArticle.titleEn}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-700/60 font-medium">
                  <span>{selectedArticle.author}</span>
                  <span>•</span>
                  <span>{lang === 'so' ? selectedArticle.readTimeSo : selectedArticle.readTimeEn}</span>
                </div>

                <div className="space-y-3.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {(lang === 'so' ? selectedArticle.contentSo : selectedArticle.contentEn).map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black transition-all cursor-pointer"
                  >
                    {lang === 'so' ? 'Xir Maqaalka' : 'Close Article'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
