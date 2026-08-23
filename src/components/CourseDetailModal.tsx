import React from 'react';
import { 
  X, 
  BookOpen, 
  Check, 
  Clock, 
  Users, 
  ArrowRight, 
  Award, 
  GraduationCap, 
  Languages, 
  Sparkles, 
  HeartHandshake, 
  Calendar, 
  CheckCircle2,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onEnroll: (courseId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  lang,
  onClose,
  onEnroll,
}) => {
  if (!isOpen || !course) return null;

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B192C]/80 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto"
        >
          {/* Header Image with close button & floating badges */}
          <div className="relative h-60 sm:h-72 w-full bg-slate-900 overflow-hidden shrink-0">
            {course.imageUrl ? (
              <img
                src={course.imageUrl}
                alt={course.imageAlt || (lang === 'so' ? course.titleSo : course.titleEn)}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0B192C] to-[#1E3E62] flex items-center justify-center">
                {getIcon(course.iconName)}
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/50 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Floating Top Left Category */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-orange-500 text-white text-xs font-black uppercase tracking-wider shadow-md">
                {lang === 'so' ? course.categorySo : course.categoryEn}
              </span>
              {course.badge && (
                <span className="px-3 py-1.5 rounded-full bg-[#0B192C]/90 border border-white/20 text-white text-xs font-bold backdrop-blur-md">
                  {course.badge}
                </span>
              )}
            </div>

            {/* Bottom Title on Image */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-orange-500 text-white shadow-lg shrink-0">
                  {getIcon(course.iconName)}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-md text-white">
                    {lang === 'so' ? course.titleSo : course.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-1 mt-0.5">
                    {lang === 'so' ? course.levelSo : course.levelEn} • {lang === 'so' ? course.ageGroupSo : course.ageGroupEn}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">
            
            {/* Quick Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-orange-500 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">{lang === 'so' ? 'Da’da' : 'Age Group'}</span>
                  <span className="font-black text-xs sm:text-sm text-slate-900">{lang === 'so' ? course.ageGroupSo : course.ageGroupEn}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">{lang === 'so' ? 'Muddada' : 'Duration'}</span>
                  <span className="font-black text-xs sm:text-sm text-slate-900">{lang === 'so' ? course.durationSo : course.durationEn}</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">{lang === 'so' ? 'Jadwalka' : 'Schedule'}</span>
                  <span className="font-black text-xs text-slate-900">
                    {lang === 'so' 
                      ? (course.recommendedScheduleSo || '2-5 Maalmood/Todobaad')
                      : (course.recommendedScheduleEn || '2-5 Days/Week')}
                  </span>
                </div>
              </div>
            </div>

            {/* Overview / Sharaxaadda Guud */}
            <div className="space-y-2">
              <h4 className="text-sm font-black text-[#0B192C] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-500" />
                <span>{lang === 'so' ? 'Sharaxaadda Guud ee Koorsada' : 'Course Comprehensive Overview'}</span>
              </h4>
              <p className="text-slate-700 leading-relaxed font-medium">
                {lang === 'so' 
                  ? (course.fullOverviewSo || course.descriptionSo)
                  : (course.fullOverviewEn || course.descriptionEn)}
              </p>
            </div>

            {/* Learning Outcomes / Maxaad Ka Faa’iidaysaa? */}
            {course.learningOutcomesSo && course.learningOutcomesSo.length > 0 && (
              <div className="space-y-3 p-5 rounded-2xl bg-orange-50/60 border border-orange-200">
                <h4 className="text-sm font-black text-[#0B192C] uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span>{lang === 'so' ? 'Maxaad Ka Baran Doontaa Koorsadan?' : 'Key Learning Outcomes'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(lang === 'so' ? course.learningOutcomesSo : (course.learningOutcomesEn || course.learningOutcomesSo)).map((outcome, oIdx) => (
                    <div key={oIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Syllabus / Qodobada Manhajka */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-[#0B192C] uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-orange-500" />
                <span>{lang === 'so' ? 'Qodobada Manhajka (Syllabus)' : 'Detailed Syllabus Topics'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(lang === 'so' ? course.syllabusSo : course.syllabusEn).map((topic, tIdx) => (
                  <div key={tIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0B192C] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {tIdx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 leading-snug">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-2">
              <h4 className="text-sm font-black text-[#0B192C] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>{lang === 'so' ? 'Adeegyada Khaaska ah ee Koorsada' : 'Course Features & Perks'}</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(lang === 'so' ? course.featuresSo : course.featuresEn).map((f, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Free Trial & Money-Back Guarantee Note */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-orange-400 shrink-0" />
              <div className="text-xs">
                <p className="font-black text-white">
                  {lang === 'so' ? '3 Maalmood oo Tijaabo Bilaash ah' : '3 Days Free Trial Guarantee'}
                </p>
                <p className="text-slate-300">
                  {lang === 'so' 
                    ? 'Bilaash ku qaado fasalka koowaad, haddii aadan ku qancinna wax lacag ah lagamaa rabo.'
                    : 'Try the first session completely free with certified teachers before any commitment.'}
                </p>
              </div>
            </div>

          </div>

          {/* Footer Modal Action Buttons */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: <strong className="text-slate-900">+251 777 796 444</strong></span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded-xl text-xs sm:text-sm font-extrabold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer w-1/3 sm:w-auto"
              >
                {lang === 'so' ? 'Xir' : 'Close'}
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEnroll(course.id);
                }}
                className="py-3 px-6 rounded-xl text-xs sm:text-sm font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 shadow-md shadow-orange-500/30 transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial cursor-pointer"
              >
                <span>{lang === 'so' ? 'Qaado Fasal Tijaabo ah' : 'Enroll & Start Free Trial'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
