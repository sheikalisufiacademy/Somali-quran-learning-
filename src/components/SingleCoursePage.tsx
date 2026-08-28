import React from 'react';
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
  ArrowLeft,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  CreditCard,
  Zap,
  Lock,
  Star,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, Course } from '../types';
import { COURSES_DATA } from '../data/academyData';

interface SingleCoursePageProps {
  courseId: string;
  lang: Language;
  onBack: () => void;
  onEnroll: (courseId: string) => void;
  onSelectOtherCourse: (courseId: string) => void;
}

export const SingleCoursePage: React.FC<SingleCoursePageProps> = ({
  courseId,
  lang,
  onBack,
  onEnroll,
  onSelectOtherCourse
}) => {
  const course = COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0];

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

  const otherCourses = COURSES_DATA.filter((c) => c.id !== course.id);

  return (
    <div className="bg-slate-50 dark:bg-[#070E18] min-h-screen pb-20 transition-colors">
      {/* Breadcrumb & Navigation Bar */}
      <div className="bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-orange-500" />
            <span>Back to All Courses</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="hidden sm:inline">Courses / </span>
            <span className="text-orange-500 font-extrabold line-clamp-1">{course.titleEn}</span>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="relative bg-[#0B192C] text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-orange-500 text-white text-xs font-black uppercase tracking-wider shadow-md">
                  {course.categoryEn}
                </span>
                {course.badge && (
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-orange-300 text-xs font-bold backdrop-blur-md">
                    ★ {course.badge}
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-black/40 px-2.5 py-1 rounded-full border border-amber-400/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.98 / 5.0 (200+ Reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {course.titleEn}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
                {course.fullOverviewEn || course.descriptionEn}
              </p>

              {/* Meta Pill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold">Target Level</span>
                  <span className="text-sm font-extrabold text-white">{course.levelEn}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold">Age Group</span>
                  <span className="text-sm font-extrabold text-white">{course.ageGroupEn}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs col-span-2 sm:col-span-1">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold">Est. Duration</span>
                  <span className="text-sm font-extrabold text-white">{course.durationEn}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onEnroll(course.id)}
                  className="px-8 py-4 text-sm sm:text-base font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-2xl shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Book Free Trial for This Course</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`https://wa.me/251777796444?text=Hello%20Baro%20Quran%20Academy%2C%20I%20am%20interested%20in%20${encodeURIComponent(course.titleEn)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Card / Visual Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-[#0E1A2C] relative group">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  {course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      alt={course.imageAlt || course.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0B192C] to-[#1E3E62] flex items-center justify-center">
                      {getIcon(course.iconName)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A2C] via-transparent to-transparent" />
                </div>

                <div className="p-6 space-y-4 text-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <span className="text-xs text-slate-400 font-bold">Monthly Tuition</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-white">${course.startingPriceUSD}</span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>100% Free Trial Class (No Credit Card)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Users className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>Dedicated 1-on-1 Male or Female Scholar</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>Flexible 24/7 Scheduling (Worldwide / All Time Zones)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Learning Outcomes & Syllabus */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. What You Will Learn */}
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-orange-500 text-white shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] dark:text-white">
                    What You Will Master
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                    Key learning milestones and competencies gained upon completion
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.learningOutcomesEn.map((outcome, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60"
                  >
                    <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Structured Syllabus / Modules */}
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#0B192C] dark:bg-orange-500 text-white shadow-md">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] dark:text-white">
                    Step-by-Step Curriculum
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                    Modular roadmap designed for maximum retention and steady progress
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {course.syllabusEn.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 hover:border-orange-400 dark:hover:border-orange-500 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400 font-black text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <div className="flex-1 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      {item}
                    </div>
                    <span className="text-[11px] font-extrabold text-orange-500 uppercase tracking-wider hidden sm:inline">
                      Module {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Included in Every Enrollment */}
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] dark:text-white">
                Everything Included with Your Course
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 space-y-1">
                  <span className="font-black text-[#0B192C] dark:text-white block">1-on-1 Dedicated Tutor</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Direct personal focus with uninterrupted live guidance each lesson.</p>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 space-y-1">
                  <span className="font-black text-[#0B192C] dark:text-white block">Flexible Rescheduling</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Easily adjust class times with advance notice without missing content.</p>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 space-y-1">
                  <span className="font-black text-[#0B192C] dark:text-white block">Weekly Progress Reports</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Detailed updates sent to parents via WhatsApp or email every weekend.</p>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 space-y-1">
                  <span className="font-black text-[#0B192C] dark:text-white block">Official Certificate</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Accredited completion certificate signed by certified scholars upon graduation.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Enrollment Card & Other Courses */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Sticky Enrollment Box */}
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 border-2 border-orange-500 shadow-xl space-y-6 sticky top-36">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 font-black text-xs uppercase tracking-wider inline-block">
                  Quick Enrollment
                </span>
                <h3 className="text-2xl font-black text-[#0B192C] dark:text-white">
                  Join This Program
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Start with a 100% free evaluation session with one of our certified teachers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Class Duration</span>
                  <span className="text-slate-900 dark:text-white">30 - 45 Mins</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Format</span>
                  <span className="text-slate-900 dark:text-white">1-on-1 Zoom / Meet</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Teacher Options</span>
                  <span className="text-slate-900 dark:text-white">Male or Female</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Language</span>
                  <span className="text-slate-900 dark:text-white">Somali / English / Arabic</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onEnroll(course.id)}
                className="w-full py-4 text-center text-sm font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-2xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Free Trial Class</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 font-bold">
                ✓ No credit card required • Cancel anytime
              </p>
            </div>

            {/* Other Courses Widget */}
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-sm font-black text-[#0B192C] dark:text-white uppercase tracking-wider">
                Explore Other Courses
              </h4>

              <div className="space-y-2.5">
                {otherCourses.map((other) => (
                  <button
                    key={other.id}
                    type="button"
                    onClick={() => onSelectOtherCourse(other.id)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-orange-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 transition-all text-left group cursor-pointer"
                  >
                    <div className="pr-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors block line-clamp-1">
                        {other.titleEn}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        {other.levelEn} • From ${other.startingPriceUSD}/mo
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
