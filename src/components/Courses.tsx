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
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Course } from '../types';
import { COURSES_DATA } from '../data/academyData';

interface CoursesProps {
  lang: Language;
  onSelectCourse: (courseId: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ lang, onSelectCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});

  const toggleSyllabus = (courseId: string) => {
    setExpandedSyllabus(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
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
      className="py-20 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] text-white text-xs font-black uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Manhajka & Koorsooyinka' : 'Curriculum & Programs'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
            {lang === 'so' ? (
              <>
                Koorsooyinka <span className="text-[#0B192C] underline decoration-orange-500 decoration-4 underline-offset-6">Baro Quran Academy</span>: Higaadda, Tajwiidka & Xifdiga
              </>
            ) : (
              <>
                Structured Quran & Islamic Studies <span className="text-[#0B192C] underline decoration-orange-500 decoration-4 underline-offset-6">Programs</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 font-medium">
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
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                  className={`flex flex-col bg-white rounded-3xl border-2 transition-all duration-300 hover:shadow-2xl ${
                    course.popular 
                      ? 'border-orange-500 shadow-lg ring-2 ring-orange-400/30' 
                      : 'border-slate-200 shadow-sm hover:border-orange-400'
                  }`}
                >
                  {/* Top Badge Header */}
                  <div className="p-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="p-3 rounded-2xl bg-[#0B192C] shadow-sm">
                        {getIcon(course.iconName)}
                      </div>

                      {course.badge && (
                        <span className="px-3 py-1 text-xs font-black rounded-full bg-orange-500 text-white">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-black text-orange-600 uppercase tracking-wider">
                      {lang === 'so' ? course.categorySo : course.categoryEn}
                    </span>

                    <h3 className="text-xl font-black text-[#0B192C] mt-1 mb-2">
                      {lang === 'so' ? course.titleSo : course.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 line-clamp-3 font-medium">
                      {lang === 'so' ? course.descriptionSo : course.descriptionEn}
                    </p>
                  </div>

                  {/* Key Meta Details */}
                  <div className="p-6 pt-4 pb-4 bg-slate-50 border-b border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-500 shrink-0" />
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">{lang === 'so' ? 'Da’da:' : 'Age Group:'}</span>
                        <span className="font-black text-slate-900">{lang === 'so' ? course.ageGroupSo : course.ageGroupEn}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">{lang === 'so' ? 'Muddada:' : 'Duration:'}</span>
                        <span className="font-black text-slate-900">{lang === 'so' ? course.durationSo : course.durationEn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="p-6 flex-1 space-y-3">
                    <h4 className="text-xs font-black text-[#0B192C] uppercase tracking-wider">
                      {lang === 'so' ? 'Waxyaabaha Muhiimka ah:' : 'Key Highlights:'}
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700 font-medium">
                      {(lang === 'so' ? course.featuresSo : course.featuresEn).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expandable Syllabus preview */}
                    <div className="pt-2">
                      <button
                        onClick={() => toggleSyllabus(course.id)}
                        className="w-full py-2 px-3 rounded-xl text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>
                          {isExpanded 
                            ? (lang === 'so' ? 'Qari Manhajka' : 'Hide Syllabus Details')
                            : (lang === 'so' ? 'Arag Manhajka Koorsada' : 'View Course Syllabus')}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700"
                        >
                          <p className="font-bold text-[#0B192C]">
                            {lang === 'so' ? 'Qodobada la qaadanayo:' : 'Topics Covered:'}
                          </p>
                          <ul className="space-y-1.5 pl-2 list-disc list-inside">
                            {(lang === 'so' ? course.syllabusSo : course.syllabusEn).map((item, sIdx) => (
                              <li key={sIdx} className="text-slate-700 leading-snug">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Enroll Card Footer Action */}
                  <div className="p-6 pt-0 mt-auto">
                    <button
                      id={`btn-enroll-${course.id}`}
                      onClick={() => onSelectCourse(course.id)}
                      className="w-full py-3.5 px-4 rounded-xl text-sm font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 shadow-md shadow-orange-500/30 hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>{lang === 'so' ? 'Qaado Fasal Tijaabo ah (Bilaash)' : 'Enroll & Get Free Trial'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
};
