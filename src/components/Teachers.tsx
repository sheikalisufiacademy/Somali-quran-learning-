import React from 'react';
import { 
  Award, 
  Star, 
  GraduationCap, 
  Users, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { TEACHERS_DATA } from '../data/academyData';

interface TeachersProps {
  lang: Language;
  onOpenRegister: () => void;
}

export const Teachers: React.FC<TeachersProps> = ({ lang, onOpenRegister }) => {
  return (
    <section id="teachers" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] text-white text-xs font-black uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Macallimiinta Tayada Sare Leh' : 'Certified Scholars & Hafiz Tutors'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
            {lang === 'so' ? (
              <>
                Kala Baro <span className="text-orange-500">Macallimiinteena Sharafta Leh</span>
              </>
            ) : (
              <>
                Meet Our <span className="text-orange-500">Distinguished Instructors</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-600 font-medium">
            {lang === 'so'
              ? 'Macallimiin iyo Macallimado leh Ijaazooyin sax ah, yaqaanna luuqadaha Soomaaliga, Carabiga iyo Ingiriisiga, oo khibrad u leh carruurta qurbaha.'
              : 'Our vetted educators hold authentic Sanad chains, are fluent in Somali, Arabic, and English, and specialize in teaching youth.'}
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEACHERS_DATA.map((teacher) => (
            <div
              key={teacher.id}
              id={`teacher-${teacher.id}`}
              className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm hover:shadow-2xl hover:border-orange-500 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Teacher Image & Badge */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={teacher.avatarUrl}
                  alt={lang === 'so' ? teacher.nameSo : teacher.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-xs font-black text-[#0B192C] flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{teacher.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#0B192C]/90 backdrop-blur-xs text-[11px] font-bold text-orange-400">
                  {teacher.gender === 'female' 
                    ? (lang === 'so' ? 'Macallimad (Haween)' : 'Female Instructor') 
                    : (lang === 'so' ? 'Macallin (Rag)' : 'Male Instructor')}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-black text-orange-500 uppercase tracking-wide block">
                    {lang === 'so' ? teacher.roleSo : teacher.roleEn}
                  </span>
                  
                  <h3 className="text-lg font-black text-[#0B192C] mt-1 mb-2">
                    {lang === 'so' ? teacher.nameSo : teacher.nameEn}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3 font-medium">
                    {lang === 'so' ? teacher.qualificationSo : teacher.qualificationEn}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>{lang === 'so' ? teacher.experienceSo : teacher.experienceEn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>{teacher.studentsCount}+ {lang === 'so' ? 'Arday oo wax baratay' : 'Students Taught'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={onOpenRegister}
                    className="w-full py-3 text-center text-xs font-black text-white bg-[#0B192C] hover:bg-orange-500 rounded-xl transition-colors shadow-xs"
                  >
                    {lang === 'so' ? 'Qaado Fasal Tijaabo ah' : 'Book Trial with Teacher'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
