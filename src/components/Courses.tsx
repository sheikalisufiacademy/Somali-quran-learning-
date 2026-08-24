import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  GraduationCap, 
  Languages, 
  HeartHandshake,
  Check, 
  Clock, 
  Users, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  ExternalLink,
  Eye,
  CreditCard,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Course } from '../types';
import { COURSES_DATA } from '../data/academyData';
import { CourseDetailModal } from './CourseDetailModal';
import { openLemonSqueezyCheckout } from '../lib/lemonsqueezy';

interface CoursesProps {
  lang: Language;
  onSelectCourse: (courseId: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ lang, onSelectCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});
  const [activeModalCourse, setActiveModalCourse] = useState<Course | null>(null);

  const toggleSyllabus = (courseId: string) => {
    setExpandedSyllabus(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const handleOpenCourseDetails = (course: Course) => {
    setActiveModalCourse(course);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-white" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-white" />;
      case 'Award': return <Award className="w-6 h-6 text-white" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-white" />;
      case 'Languages': return <Languages className="w-6 h-6 text-white" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-white" />;
      default: return <BookOpen className="w-6 h-6 text-white" />;
    }
  };

  const categories = [
    { id: 'all', labelSo: 'Dhammaan Koorsooyinka', labelEn: 'All Courses' },
    { id: 'beginner', labelSo: 'Barashada Higaada & Qaacidada', labelEn: 'Noorani Qaida & Basics' },
    { id: 'tajweed', labelSo: 'Barashada Tajwiidka & Akhriska', labelEn: 'Tajweed & Recitation' },
    { id: 'hifz', labelSo: 'Xifdiga Qur’aanka', labelEn: 'Quran Memorization (Hifz)' },
    { id: 'islamic', labelSo: 'Axaadiista & Seeradda Nabiga (SCW)', labelEn: 'Islamic Studies & Seerah' },
  ];

  const filteredCourses = COURSES_DATA.filter(course => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'beginner') return course.id === 'qaacida-nuuraaniya' || course.id === 'arabic-language';
    if (selectedCategory === 'tajweed') return course.id === 'tajweed-recitation';
    if (selectedCategory === 'hifz') return course.id === 'quran-memorization-hifz';
    if (selectedCategory === 'islamic') return course.id === 'islamic-studies-tarbiyah';
    return true;
  });

  return (
    <motion.section 
      id="courses" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-white dark:bg-[#070E18] relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] dark:bg-[#0E1A2C] text-white text-xs font-black uppercase tracking-wider border border-slate-700">
            <BookOpen className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Manhajka & Koorsooyinka' : 'Curriculum & Programs'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] dark:text-white tracking-tight">
            {lang === 'so' ? (
              <>
                Koorsooyinka <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Baro Quran Academy</span>: Higaadda, Tajwiidka & Xifdiga
              </>
            ) : (
              <>
                Structured Quran & Islamic Studies <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Programs</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 dark:text-slate-300 font-medium">
            {lang === 'so'
              ? 'Manhaj habaysan oo ka bilaabmaya barashada higaada iyo Qaacidada Nuuraaniyada ilaa tajwiidka suubban, xifdiga Qur’aanka, axaadiista saxiixa ah, iyo seeradda Nabiga (SCW).'
              : 'From complete beginners learning the alphabet to advanced students completing the entire Quran with Ijazah.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-slate-100 dark:bg-[#0E1A2C] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 border border-transparent dark:border-slate-700'
              }`}
            >
              {lang === 'so' ? cat.labelSo : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, idx) => {
              const isExpanded = !!expandedSyllabus[course.id];

              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  id={`course-${course.id}`}
                  className={`flex flex-col bg-white dark:bg-[#0E1A2C] rounded-3xl border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl group ${
                    course.popular 
                      ? 'border-orange-500 shadow-lg ring-2 ring-orange-400/30' 
                      : 'border-slate-200 dark:border-slate-700/80 shadow-sm hover:border-orange-400 dark:hover:border-orange-400'
                  }`}
                >
                  {/* Card Visual Image with Floating "Faahfaahin Dheeraad ah" Button */}
                  <div className="relative h-52 w-full bg-slate-900 overflow-hidden shrink-0">
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt={course.imageAlt || (lang === 'so' ? course.titleSo : course.titleEn)}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0B192C] to-[#1E3E62] flex items-center justify-center">
                        {getIcon(course.iconName)}
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-[#0B192C]/40 to-transparent" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className="px-3 py-1 text-xs font-black rounded-full bg-[#0B192C]/90 text-white border border-white/20 backdrop-blur-sm">
                        {lang === 'so' ? course.categorySo : course.categoryEn}
                      </span>
                    </div>

                    {/* Top Right Popular / Badge */}
                    {course.badge && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-3 py-1 text-xs font-black rounded-full bg-orange-500 text-white shadow-md">
                          {course.badge}
                        </span>
                      </div>
                    )}

                    {/* Floating Clickable "Faahfaahin Dheeraad ah / Learn More" Button on top of Image */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <button
                        id={`btn-details-${course.id}`}
                        onClick={() => handleOpenCourseDetails(course)}
                        className="px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#0E1A2C]/90 hover:bg-white dark:hover:bg-[#1E293B] text-[#0B192C] dark:text-white text-xs font-black shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-slate-200 dark:border-slate-700"
                        title={lang === 'so' ? 'Gudaha u gal si aad u barato faahfaahin dheeraad ah' : 'View full course details'}
                      >
                        <Eye className="w-3.5 h-3.5 text-orange-500" />
                        <span>{lang === 'so' ? 'Faahfaahin Dheeraad ah' : 'Course Details'}</span>
                      </button>
                    </div>

                    {/* Bottom Left Icon inside Image */}
                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-orange-500 text-white shadow-md">
                        {getIcon(course.iconName)}
                      </div>
                    </div>
                  </div>

                  {/* Course Main Body Content */}
                  <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-700/60 flex-1">
                    <h3 className="text-xl font-black text-[#0B192C] dark:text-white mb-2 leading-snug">
                      {lang === 'so' ? course.titleSo : course.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 line-clamp-3 font-medium">
                      {lang === 'so' ? course.descriptionSo : course.descriptionEn}
                    </p>
                  </div>

                  {/* Key Meta Details */}
                  <div className="p-6 pt-3 pb-3 bg-slate-50 dark:bg-[#070E18] border-b border-slate-100 dark:border-slate-700/60 grid grid-cols-3 gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase font-bold">{lang === 'so' ? 'Da’da:' : 'Age:'}</span>
                        <span className="font-black text-slate-900 dark:text-slate-100 text-[11px] truncate block">{lang === 'so' ? course.ageGroupSo : course.ageGroupEn}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase font-bold">{lang === 'so' ? 'Muddada:' : 'Duration:'}</span>
                        <span className="font-black text-slate-900 dark:text-slate-100 text-[11px] truncate block">{lang === 'so' ? course.durationSo : course.durationEn}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase font-bold">{lang === 'so' ? 'Qiimaha:' : 'Price:'}</span>
                        <span className="font-black text-emerald-600 dark:text-emerald-400 text-[11px] block">
                          ${course.startingPriceUSD || 30}<span className="text-[9px] text-slate-500 font-normal">/mo</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="p-6 space-y-3">
                    <h4 className="text-xs font-black text-[#0B192C] dark:text-white uppercase tracking-wider">
                      {lang === 'so' ? 'Waxyaabaha Muhiimka ah:' : 'Key Highlights:'}
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {(lang === 'so' ? course.featuresSo : course.featuresEn).slice(0, 3).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Quick Button to open full modal for complete syllabus */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCourseDetails(course)}
                        className="w-full py-2 px-3 rounded-xl text-xs font-bold text-[#0B192C] dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 hover:bg-orange-100/80 dark:hover:bg-orange-900/40 border border-orange-200 dark:border-orange-900/50 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                          {lang === 'so' ? 'Arag Manhajka & Natiijooyinka' : 'View Full Syllabus & Outcomes'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                      </button>
                    </div>
                  </div>

                  {/* Enroll & Register Action Button */}
                  <div className="p-6 pt-0 mt-auto space-y-2">
                    <button
                      id={`btn-enroll-${course.id}`}
                      onClick={() => onSelectCourse(course.id)}
                      className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>
                        {lang === 'so' 
                          ? `Is-diiwaangeli Koorsadan ($${course.startingPriceUSD || 30}/mo)` 
                          : `Enroll in Course ($${course.startingPriceUSD || 30}/mo)`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                        {lang === 'so' ? '✓ Buuxi foomka • Hel fasal tijaabo ah bilaash' : '✓ Fill form first • Get 100% free trial'}
                      </span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Full Screen Course Detail Modal */}
      <CourseDetailModal
        course={activeModalCourse}
        isOpen={!!activeModalCourse}
        lang={lang}
        onClose={() => setActiveModalCourse(null)}
        onEnroll={(courseId) => {
          setActiveModalCourse(null);
          onSelectCourse(courseId);
        }}
      />
    </motion.section>
  );
};
