import React from 'react';
import { 
  Star, 
  MessageSquareQuote, 
  MapPin, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TESTIMONIALS_DATA } from '../data/academyData';

interface TestimonialsProps {
  lang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  return (
    <motion.section 
      id="reviews" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-slate-50 dark:bg-[#070E18] relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] dark:bg-[#0E1A2C] text-white text-xs font-black uppercase tracking-wider border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Aragtida Waalidiinta & Ardayda' : 'Parent & Student Reviews'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] dark:text-white tracking-tight">
            {lang === 'so' ? (
              <>
                Maxay Waalidiinta & Ardaydu Ka Yiraahdeen <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Baro Quran Academy?</span>
              </>
            ) : (
              <>
                What Families Worldwide Say About <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Baro Quran Academy</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 dark:text-slate-300 font-medium">
            {lang === 'so'
              ? 'Aragtiyo dhab ah oo ka yimid qoysaska iyo ardayda ku kala nool aduunka oo dhan (UK, Mareykanka, Yurub, Canada, Bariga Dhexe iyo meelo kale) ee carruurtoodu barteen higaada, tajwiidka iyo xifdiga.'
              : 'Real experiences shared by families worldwide who witnessed rapid growth in their children’s Quran recitation, Tajweed, and Islamic understanding.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
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

            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};
