import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  KeyRound,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, StudentProfile } from '../types';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (profile?: Partial<StudentProfile>) => void;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  isOpen,
  onClose,
  lang,
  onLoginSuccess,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage(lang === 'so' ? 'Fadlan geli Email ama Student ID.' : 'Please enter your Email or Student ID.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Auto success with entered identifier or demo data
      onLoginSuccess({
        fullName: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        email: identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@baroquran.com`
      });
      onClose();
    }, 600);
  };

  const handleQuickDemoLogin = (type: 'student1' | 'student2') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (type === 'student1') {
        onLoginSuccess({
          studentId: 'BQA-789210',
          fullName: 'Maxamed Cabdullaahi Jaamac',
          age: '10',
          gender: 'male',
          email: 'maxamed.cabdullaahi@gmail.com',
          phone: '+44 7911 123456',
          enrolledCourseId: 'tajweed-recitation',
          enrolledCourseTitleSo: 'Barashada Tajwiidka & Akhriska Suubban (Tajweed Mastery)',
          enrolledCourseTitleEn: 'Tajweed Mastery & Beautified Recitation',
          assignedTeacherNameSo: 'Sh. Cabdiraxmaan Maxamed Nuur (Ijaazah 10 Qira’at)',
          assignedTeacherNameEn: 'Sheikh Abdirahman M. Nur (Ijazah in 10 Qira’at)',
          classTime: '06:00 PM - 06:40 PM (London Time)',
          scheduleDays: ['Isniin', 'Talaado', 'Arbaco', 'Khamiis', 'Jimco'],
          tomorrowsLesson: 'Suuratul Al-Mulk (Aayadaha 15 ilaa 30)',
          tomorrowPrepNotes: 'Fadlan ku celi xeerarka Ikhfaaga iyo Qalqalaha 3 jeer ka hor casharka.',
          attendanceRate: 100,
          totalCompletedLessons: 36,
          juzMemorized: 3
        });
      } else {
        onLoginSuccess({
          studentId: 'BQA-541890',
          fullName: 'Hafsa Axmed Cali',
          age: '8',
          gender: 'female',
          email: 'hafsa.axmed@gmail.com',
          phone: '+1 612 555 0199',
          enrolledCourseId: 'qaacida-nuuraaniya',
          enrolledCourseTitleSo: 'Barashada Qaacidada Nuuraaniyada & Higaadda',
          enrolledCourseTitleEn: 'Noorani Qaida & Arabic Alphabet Reading',
          assignedTeacherNameSo: 'Ustaada Malyuun Xuseen (Xafidatul Qur’an)',
          assignedTeacherNameEn: 'Ustadha Malyun Hussein (Hafidha & Educator)',
          classTime: '05:00 PM - 05:30 PM (US Central Time)',
          scheduleDays: ['Isniin', 'Arbaco', 'Jimco'],
          tomorrowsLesson: 'Qaacidada Nuuraaniyada: Darsiga 8-aad (Shaqallada Dhaadheer & Maddadka)',
          tomorrowPrepNotes: 'Dhegeyso codka macallimadda ee casharkii hore oo akhri 5 jeer.',
          attendanceRate: 98,
          totalCompletedLessons: 24,
          juzMemorized: 1
        });
      }
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
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
          className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="bg-[#0B192C] text-white p-6 sm:p-7 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-orange-400 text-[10px] font-black uppercase tracking-wider">
                  {lang === 'so' ? 'Qaybta Ardayda' : 'Student Portal'}
                </span>
                <h3 className="text-xl font-black tracking-tight text-white mt-0.5">
                  {lang === 'so' ? 'Gal Student Dashboard' : 'Student Portal Login'}
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {lang === 'so' 
                ? 'Gali si aad u aragto casharkii maanta, casharka berri, waqtiga fasalka, iyo macallinkaaga.'
                : 'Access your today’s lesson logs, upcoming class preparation, schedule, and teacher details.'}
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-7 space-y-5">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 animate-shake">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                  {lang === 'so' ? 'Student ID ama Email *' : 'Student ID or Email *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder={lang === 'so' ? 'Tusaale: BQA-789210 ama email@gmail.com' : 'e.g. BQA-789210 or email@gmail.com'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                  {lang === 'so' ? 'Password / PIN Code (Ikhtiyaari)' : 'Password / PIN Code (Optional)'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 shadow-md shadow-orange-500/30 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{lang === 'so' ? 'Soo Gal Dashboard-ka' : 'Sign In to Portal'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Access Buttons */}
            <div className="pt-3 border-t border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>{lang === 'so' ? 'Tijaabi Demo Dashboard (1-Click):' : 'Instant Demo Login (1-Click):'}</span>
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('student1')}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-orange-50 hover:border-orange-300 text-left transition-all cursor-pointer group"
                >
                  <div className="font-extrabold text-xs text-slate-900 group-hover:text-orange-600 flex items-center justify-between">
                    <span>Maxamed (10 Jir)</span>
                    <span className="text-[10px] text-orange-600 font-bold">Tajweed</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">ID: BQA-789210</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('student2')}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-orange-50 hover:border-orange-300 text-left transition-all cursor-pointer group"
                >
                  <div className="font-extrabold text-xs text-slate-900 group-hover:text-orange-600 flex items-center justify-between">
                    <span>Hafsa (8 Jir)</span>
                    <span className="text-[10px] text-orange-600 font-bold">Qaacida</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">ID: BQA-541890</div>
                </button>
              </div>
            </div>

            {/* Security note */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {lang === 'so' 
                  ? 'Arday cusub? Haddii aadan wali ID lahayn, marka hore qaado fasal tijaabo ah.'
                  : 'New student? If you don\'t have a student ID yet, please register for a free trial.'}
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
