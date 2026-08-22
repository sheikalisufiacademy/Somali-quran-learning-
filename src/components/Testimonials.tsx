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
      className="py-20 bg-slate-50 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] text-white text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Aragtida Waalidiinta & Ardayda' : 'Parent & Student Reviews'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
            {lang === 'so' ? (
              <>
                Maxay Waalidiinta & Ardaydu Ka Yiraahdeen <span className="text-[#0B192C] underline decoration-orange-500 decoration-4 underline-offset-6">Baro Quran Academy?</span>
              </>
            ) : (
              <>
                What Families Worldwide Say About <span className="text-[#0B192C] underline decoration-orange-500 decoration-4 underline-offset-6">Baro Quran Academy</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 font-medium">
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
              className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm hover:shadow-2xl hover:border-orange-500 transition-all duration-300 flex flex-col justify-between"
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
                <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed mb-6 font-medium">
                  "{lang === 'so' ? item.commentSo : item.commentEn}"
                </p>
              </div>

              {/* Author & Student Info */}
              <div className="pt-4 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#0B192C]">
                    {item.parentName}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    {lang === 'so' ? 'Waalid Xaqiijisan' : 'Verified Parent'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-semibold">
                  {lang === 'so' ? 'Ardayga:' : 'Student:'} {lang === 'so' ? item.studentNameSo : item.studentNameEn}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1 font-medium">
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
