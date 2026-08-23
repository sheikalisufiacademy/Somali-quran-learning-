import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  BookOpen, 
  User, 
  Plus, 
  CheckCircle2, 
  Bell, 
  BellRing, 
  Video, 
  Award, 
  Edit3, 
  Trash2, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  Share2, 
  LogOut,
  Save,
  Volume2,
  VolumeX,
  ExternalLink,
  Flame,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, StudentProfile, LessonLog } from '../types';
import { COURSES_DATA, TEACHERS_DATA } from '../data/academyData';

interface StudentDashboardProps {
  lang: Language;
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
}

const DEFAULT_LESSONS: LessonLog[] = [
  {
    id: 'log-1',
    date: new Date().toISOString().split('T')[0],
    topic: 'Suuratul Al-Mulk (Aayadaha 1 - 14)',
    pageOrSurah: 'Juz 29, Bogga 562',
    grade: 'Mumtaaz (10/10)',
    status: 'completed',
    teacherNotes: 'Akhris aad u qurux badan. Wuxuu si fiican u maamulay xeerka Ikhfaaga iyo Qalqalaha.',
    studentNotes: 'Waan ku celiyay 4 jeer ka hor casharka.'
  },
  {
    id: 'log-2',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    topic: 'Suuratul Al-Taxriim (Aayadaha 6 - 12)',
    pageOrSurah: 'Juz 28, Bogga 561',
    grade: 'Mumtaaz (9.5/10)',
    status: 'completed',
    teacherNotes: 'Waa ku fiican yahay xarafka Raa (Mufaxxam & Muraqqaq).',
    studentNotes: 'Qodobka Ghunnah-da ayaan ku tababartay.'
  },
  {
    id: 'log-3',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    topic: 'Suuratul Al-Dalaaq (Aayadaha 1 - 7)',
    pageOrSurah: 'Juz 28, Bogga 558',
    grade: 'Mumtaaz (10/10)',
    status: 'completed',
    teacherNotes: 'Muraajaco dhammaystiran oo aan khalad lahayn.',
    studentNotes: 'Waalidka ayaa iga dhageystay shalay.'
  }
];

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  lang,
  profile,
  onUpdateProfile,
  onLogout,
  onNavigateHome,
}) => {
  // Local lessons state stored in localStorage
  const storageKey = `bqa_lessons_${profile.studentId || 'default'}`;
  const [lessons, setLessons] = useState<LessonLog[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_LESSONS;
  });

  // Save lessons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(lessons));
    } catch (e) {
      console.error('Failed to save lessons:', e);
    }
  }, [lessons, storageKey]);

  // Lesson modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLessonTopic, setNewLessonTopic] = useState('');
  const [newLessonPage, setNewLessonPage] = useState('');
  const [newLessonGrade, setNewLessonGrade] = useState('Mumtaaz (10/10)');
  const [newLessonStatus, setNewLessonStatus] = useState<'completed' | 'revision' | 'in-progress'>('completed');
  const [newLessonTeacherNotes, setNewLessonTeacherNotes] = useState('');
  const [newLessonStudentNotes, setNewLessonStudentNotes] = useState('');

  // Tomorrow preparation editing state
  const [isEditingTomorrow, setIsEditingTomorrow] = useState(false);
  const [tomorrowTopic, setTomorrowTopic] = useState(profile.tomorrowsLesson || 'Suuratul Al-Mulk (Aayadaha 15 ilaa 30)');
  const [tomorrowNotes, setTomorrowNotes] = useState(profile.tomorrowPrepNotes || 'Fadlan ku celi xeerarka Ikhfaaga iyo Qalqalaha 3 jeer ka hor casharka.');

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFullName, setEditFullName] = useState(profile.fullName);
  const [editAge, setEditAge] = useState(profile.age);
  const [editClassTime, setEditClassTime] = useState(profile.classTime);
  const [editTeacherName, setEditTeacherName] = useState(profile.assignedTeacherNameSo);

  // Notification simulation & sound
  const [isClassNow, setIsClassNow] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [alertDismissed, setAlertDismissed] = useState(false);

  // Countdown timer for next class
  const [countdownMinutes, setCountdownMinutes] = useState(24);
  const [countdownSeconds, setCountdownSeconds] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prevSec) => {
        if (prevSec > 0) return prevSec - 1;
        setCountdownMinutes((prevMin) => {
          if (prevMin > 0) return prevMin - 1;
          // Class time reached!
          setIsClassNow(true);
          return 0;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTopic.trim()) return;

    const newLog: LessonLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      topic: newLessonTopic.trim(),
      pageOrSurah: newLessonPage.trim() || (lang === 'so' ? 'Bogga Maanta' : 'Today’s Page'),
      grade: newLessonGrade,
      status: newLessonStatus,
      teacherNotes: newLessonTeacherNotes.trim() || (lang === 'so' ? 'Wuxuu si fiican u gutay casharka maanta.' : 'Completed today’s lesson successfully.'),
      studentNotes: newLessonStudentNotes.trim()
    };

    const updated = [newLog, ...lessons];
    setLessons(updated);

    // Update profile stats
    onUpdateProfile({
      ...profile,
      totalCompletedLessons: (profile.totalCompletedLessons || 0) + 1
    });

    // Reset & close
    setNewLessonTopic('');
    setNewLessonPage('');
    setNewLessonTeacherNotes('');
    setNewLessonStudentNotes('');
    setIsAddModalOpen(false);
  };

  const handleDeleteLesson = (id: string) => {
    if (confirm(lang === 'so' ? 'Ma hubtaa inaad tirtirto diiwaanka casharkan?' : 'Are you sure you want to remove this lesson log?')) {
      setLessons(lessons.filter(l => l.id !== id));
    }
  };

  const handleSaveTomorrow = () => {
    onUpdateProfile({
      ...profile,
      tomorrowsLesson: tomorrowTopic,
      tomorrowPrepNotes: tomorrowNotes
    });
    setIsEditingTomorrow(false);
  };

  const handleSaveProfile = () => {
    onUpdateProfile({
      ...profile,
      fullName: editFullName,
      age: editAge,
      classTime: editClassTime,
      assignedTeacherNameSo: editTeacherName,
      assignedTeacherNameEn: editTeacherName
    });
    setIsEditingProfile(false);
  };

  const playNotificationChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  const triggerClassAlarmTest = () => {
    setIsClassNow(true);
    setAlertDismissed(false);
    if (soundEnabled) {
      playNotificationChime();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-orange-600 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'so' ? 'Ku noqo Bogga Hore' : 'Back to Home'}</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">
                  {lang === 'so' ? 'Qaybta Ardayga (Student Dashboard)' : 'Student Learning Dashboard'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase">
                  {lang === 'so' ? 'Firfircoon' : 'Active Student'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {lang === 'so'
                  ? `Ku soo dhawoow, ${profile.fullName}! Halkan kala soco casharradaada, jadwalka, iyo macallinkaaga.`
                  : `Welcome back, ${profile.fullName}! Track your daily lessons, schedule, and live classes.`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{lang === 'so' ? 'Wax ka beddel Xogta' : 'Edit Profile'}</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'so' ? 'Ka Bax' : 'Log Out'}</span>
          </button>
        </div>
      </div>

      {/* EDIT PROFILE MODAL / DRAWER */}
      {isEditingProfile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-orange-50/70 border-2 border-orange-200 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-orange-600" />
              <span>{lang === 'so' ? 'Tafatir Xogta Ardayga & Fasalka' : 'Edit Student Details & Schedule'}</span>
            </h3>
            <button
              onClick={() => setIsEditingProfile(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'so' ? 'Magaca Saddexan' : 'Full Name'}
              </label>
              <input
                type="text"
                value={editFullName}
                onChange={(e) => setEditFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'so' ? 'Da’da (Age)' : 'Student Age'}
              </label>
              <input
                type="text"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'so' ? 'Waqtiga Fasalka (Class Time)' : 'Class Time'}
              </label>
              <input
                type="text"
                value={editClassTime}
                onChange={(e) => setEditClassTime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'so' ? 'Macallinka Gaarka ah' : 'Assigned Teacher'}
              </label>
              <input
                type="text"
                value={editTeacherName}
                onChange={(e) => setEditTeacherName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
            >
              {lang === 'so' ? 'Ka noqo' : 'Cancel'}
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shadow-sm"
            >
              {lang === 'so' ? 'Keydi Isbeddelka' : 'Save Changes'}
            </button>
          </div>
        </motion.div>
      )}

      {/* LIVE CLASS NOTIFICATION & ALERT BANNER */}
      <div className="space-y-3">
        {isClassNow && !alertDismissed ? (
          /* Live Class Is Active Now Alert */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-xl shadow-emerald-600/30 flex flex-col md:flex-row items-center justify-between gap-4 border-2 border-emerald-400 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-emerald-700 flex items-center justify-center shrink-0 shadow-md">
                <BellRing className="w-6 h-6 animate-bounce text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider">
                    {lang === 'so' ? '🟢 WAKHTIGII FASALKA WAA LA GAARAY!' : '🟢 CLASS TIME NOW!'}
                  </span>
                  <span className="text-xs text-emerald-100 font-bold">{profile.classTime}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black mt-1">
                  {lang === 'so'
                    ? `Macallinkaagu (${profile.assignedTeacherNameSo}) wuxuu kugu sugayaa qolka fasalka tooska ah!`
                    : `Your teacher (${profile.assignedTeacherNameEn}) is waiting for you in the live classroom!`}
                </h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  {lang === 'so'
                    ? 'Fadlan furo Mus-xafkaaga, diyaarso sameecadahaaga, kuna biir fasalka adigoo gujinaya badhanka hoose.'
                    : 'Please prepare your Quran Mushaf, headset, and click the button to join the live session.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <a
                href={profile.meetingLink || 'https://zoom.us/join'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-6 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-black rounded-xl shadow-lg shadow-orange-500/40 flex items-center justify-center gap-2 cursor-pointer transition-transform transform hover:scale-105"
              >
                <Video className="w-4 h-4" />
                <span>{lang === 'so' ? 'SOO GAL FASALKA TOOS (JOIN)' : 'JOIN LIVE CLASSROOM'}</span>
              </a>

              <button
                onClick={() => setAlertDismissed(true)}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                title={lang === 'so' ? 'Xir digniinta' : 'Dismiss'}
              >
                ✕
              </button>
            </div>
          </motion.div>
        ) : (
          /* Upcoming Class Countdown Banner */
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B192C] text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-orange-400 uppercase tracking-wider">
                    {lang === 'so' ? 'Fasalka Xiga (Next Class):' : 'Next Live Class:'}
                  </span>
                  <span className="text-xs font-bold text-slate-300">{profile.classTime}</span>
                </div>
                <div className="text-sm font-black text-white mt-0.5 flex items-center gap-2">
                  <span>{lang === 'so' ? 'Wuxuu bilaabanayaa:' : 'Starting in:'}</span>
                  <span className="font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                    {String(countdownMinutes).padStart(2, '0')}:{String(countdownSeconds).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title={soundEnabled ? 'Dami codka digniinta' : 'Daar codka digniinta'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                <span className="text-[11px] hidden sm:inline">{soundEnabled ? 'Codka: Daaran' : 'Codka: Daran'}</span>
              </button>

              <button
                onClick={triggerClassAlarmTest}
                className="px-3.5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{lang === 'so' ? 'Tijaabi Digniinta Waqtiga' : 'Test Class Alarm'}</span>
              </button>

              <a
                href={profile.meetingLink || 'https://zoom.us/join'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Video className="w-3.5 h-3.5" />
                <span>{lang === 'so' ? 'Furo Fasalka (Zoom)' : 'Open Zoom/Meet'}</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 4 KEY STATS / PROFILE OVERVIEW CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Student & Age */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-orange-500" />
            <span>{lang === 'so' ? 'Ardayga & Da’da' : 'Student & Age'}</span>
          </div>
          <div className="text-base font-black text-[#0B192C] truncate">{profile.fullName}</div>
          <div className="text-xs font-bold text-orange-600">
            {profile.age} {lang === 'so' ? 'Jir' : 'years old'} • {profile.gender === 'female' ? (lang === 'so' ? 'Gabadh' : 'Female') : (lang === 'so' ? 'Wiil' : 'Male')}
          </div>
        </div>

        {/* Card 2: Enrolled Course */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'so' ? 'Koorsada Uu Dhigto' : 'Enrolled Course'}</span>
          </div>
          <div className="text-sm font-black text-[#0B192C] truncate">
            {lang === 'so' ? profile.enrolledCourseTitleSo : profile.enrolledCourseTitleEn}
          </div>
          <div className="text-xs font-bold text-emerald-700">1-on-1 Private Live</div>
        </div>

        {/* Card 3: Assigned Teacher */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'so' ? 'Macallinka Gaarka ah' : 'Assigned Teacher'}</span>
          </div>
          <div className="text-sm font-black text-[#0B192C] truncate">
            {lang === 'so' ? profile.assignedTeacherNameSo : profile.assignedTeacherNameEn}
          </div>
          <div className="text-xs font-bold text-blue-700">Ijaazo & Taajwiid Sare</div>
        </div>

        {/* Card 4: Attendance & Completed Lessons */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>{lang === 'so' ? 'Casharrada & Imaanshaha' : 'Lessons & Attendance'}</span>
          </div>
          <div className="text-base font-black text-[#0B192C]">
            {profile.totalCompletedLessons || lessons.length} {lang === 'so' ? 'Cashar' : 'Lessons'}
          </div>
          <div className="text-xs font-bold text-emerald-600">
            {profile.attendanceRate || 100}% {lang === 'so' ? 'Imaansho Buuxa' : 'Attendance Rate'}
          </div>
        </div>
      </div>

      {/* 2 MAIN COLUMNS: TODAY'S LESSON LOGS & TOMORROW'S PREPARATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: TODAY'S LESSON LOGS (Waxa uu Maanta Qaatay oo uu isagu qori karo + ah) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500" />
                  <h2 className="text-lg font-black text-[#0B192C]">
                    {lang === 'so' ? 'Diiwaanka Casharkii Maanta & Kuwii Hore' : 'Today’s Lessons Log & History'}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {lang === 'so'
                    ? 'Qor casharka aad maanta qaadatay, aayadaha, dhibcaha, iyo qoraalka macallinka.'
                    : 'Log your completed Quran lessons, memorization progress, scores, and teacher comments.'}
                </p>
              </div>

              {/* + ADD LESSON BUTTON */}
              <button
                id="btn-add-lesson-log"
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-black shadow-md shadow-orange-500/20 hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>{lang === 'so' ? '+ QOR CASHARKII MAANTA' : '+ LOG TODAY’S LESSON'}</span>
              </button>
            </div>

            {/* LESSONS LIST */}
            <div className="space-y-3.5">
              {lessons.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-500">
                    {lang === 'so' ? 'Wali wax cashar ah ma aadan qorin.' : 'No lesson logs added yet.'}
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="text-xs font-black text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg hover:bg-orange-100"
                  >
                    {lang === 'so' ? '+ Qor Casharkii ugu horreeyay' : '+ Add your first lesson log'}
                  </button>
                </div>
              ) : (
                lessons.map((log, index) => (
                  <div
                    key={log.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-all space-y-3 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 text-xs font-black flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-[#0B192C]">
                          {log.topic}
                        </h3>
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-orange-500 text-white text-[10px] font-black uppercase">
                            {lang === 'so' ? 'Maanta' : 'Today'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black">
                          {log.grade}
                        </span>
                        <button
                          onClick={() => handleDeleteLesson(log.id)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Tirtir diiwaankan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>{lang === 'so' ? 'Taariikhda:' : 'Date:'}</strong> {log.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>{lang === 'so' ? 'Bogga / Qaybta:' : 'Page/Section:'}</strong> {log.pageOrSurah}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {log.teacherNotes && (
                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                        <div className="font-extrabold text-[#0B192C] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{lang === 'so' ? 'Qoraalka / Faallada Macallinka:' : 'Teacher Assessment & Feedback:'}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium pl-5">
                          "{log.teacherNotes}"
                        </p>
                      </div>
                    )}

                    {log.studentNotes && (
                      <div className="text-[11px] text-slate-500 italic pl-2 border-l-2 border-orange-300">
                        {lang === 'so' ? 'Qoraalkaaga: ' : 'Your notes: '} {log.studentNotes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: TOMORROW'S PREPARATION & CLASS SCHEDULE */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* TOMORROW'S LESSON CARD (Casharka uu barri dhigan doono) */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0B192C] to-[#1E3E62] text-white shadow-lg space-y-4 border border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-black uppercase tracking-wider text-orange-400">
                  {lang === 'so' ? 'Casharka Berri La Dhigan Doono' : 'Tomorrow’s Upcoming Lesson'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditingTomorrow(!isEditingTomorrow)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs transition-colors cursor-pointer"
                title={lang === 'so' ? 'Wax ka beddel casharka berri' : 'Edit tomorrow’s lesson'}
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {isEditingTomorrow ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    {lang === 'so' ? 'Magaca Casharka Berri' : 'Tomorrow’s Topic'}
                  </label>
                  <input
                    type="text"
                    value={tomorrowTopic}
                    onChange={(e) => setTomorrowTopic(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    {lang === 'so' ? 'Qoraallada U Diyaargaroowga' : 'Preparation Instructions'}
                  </label>
                  <textarea
                    rows={2}
                    value={tomorrowNotes}
                    onChange={(e) => setTomorrowNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setIsEditingTomorrow(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-xs font-bold"
                  >
                    {lang === 'so' ? 'Ka noqo' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleSaveTomorrow}
                    className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shadow-sm"
                  >
                    {lang === 'so' ? 'Keydi' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 space-y-1.5">
                  <div className="text-xs text-slate-300 font-bold">
                    {lang === 'so' ? 'Qaybta / Suuradda:' : 'Assigned Surah / Topic:'}
                  </div>
                  <div className="text-base font-black text-white">
                    {profile.tomorrowsLesson || tomorrowTopic}
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-orange-300 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'so' ? 'U Diyaar-garowga Berri (Preparation):' : 'Tomorrow’s Prep Checklist:'}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-200 pl-5">
                    {profile.tomorrowPrepNotes || tomorrowNotes}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>{lang === 'so' ? 'Waqtiga Fasalka Berri:' : 'Tomorrow’s Class Time:'}</span>
                  <span className="font-bold text-white">{profile.classTime}</span>
                </div>
              </div>
            )}
          </div>

          {/* TEACHER BIO & CONTACT CARD */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-orange-500" />
              <span>{lang === 'so' ? 'Macallinkaaga Fadhiga ah' : 'Assigned Teacher Profile'}</span>
            </h3>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0B192C] text-orange-400 flex items-center justify-center font-black text-base shrink-0 shadow-md">
                {profile.assignedTeacherNameSo?.slice(0, 2) || 'SH'}
              </div>
              <div className="min-w-0">
                <div className="font-black text-sm text-[#0B192C] truncate">
                  {lang === 'so' ? profile.assignedTeacherNameSo : profile.assignedTeacherNameEn}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {lang === 'so' ? 'Macallin Sare oo Tajweed & Qiraa’at' : 'Senior Quran & Tajweed Scholar'}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{lang === 'so' ? 'Ijaazo Rasmi ah' : 'Certified Ijazah'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-medium text-slate-500">{lang === 'so' ? 'Maalmaha Fasalka:' : 'Class Days:'}</span>
                <span className="font-bold text-slate-800">
                  {profile.scheduleDays?.join(', ') || 'Isniin - Jimco'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium text-slate-500">{lang === 'so' ? 'Dhererka Casharka:' : 'Duration:'}</span>
                <span className="font-bold text-slate-800">30-40 Daqiiqo (1-on-1)</span>
              </div>
            </div>

            <a
              href="https://wa.me/251777796444?text=Asc%20Maamulka%20Baro%20Quran%20Waxaan%20ahay%20ardayga%20"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-black flex items-center justify-center gap-2 transition-colors"
            >
              <span>{lang === 'so' ? 'Xiriirka Maamulka (WhatsApp)' : 'Support & Coordinator'}</span>
            </a>
          </div>

        </div>

      </div>

      {/* ADD LESSON MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-[#0B192C]/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden z-10 my-auto"
            >
              {/* Modal Header */}
              <div className="bg-[#0B192C] text-white p-6 relative">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md">
                    <Plus className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {lang === 'so' ? 'Qor Casharkii Aad Maanta Qaadatay' : 'Log Today’s Quran Lesson'}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {lang === 'so' ? 'Gali xogta casharka, suuradda, bogga, iyo dhibcahaaga.' : 'Enter your lesson topic, surah, page, and performance score.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleAddLesson} className="p-6 space-y-4">
                
                {/* Topic / Surah */}
                <div>
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                    {lang === 'so' ? 'Suuradda / Casharka Maanta *' : 'Surah / Lesson Topic *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'so' ? 'Tusaale: Suuratul Al-Mulk (Aayadaha 1-15) ama Qaacida Bogga 10' : 'e.g. Surah Al-Mulk (Verses 1-15) or Qaida Page 10'}
                    value={newLessonTopic}
                    onChange={(e) => setNewLessonTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                  />
                </div>

                {/* Page / Juz & Score Grade */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                      {lang === 'so' ? 'Bogga / Qaybta' : 'Page / Section'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'so' ? 'Tusaale: Juz 29, Bogga 562' : 'e.g. Juz 29, Page 562'}
                      value={newLessonPage}
                      onChange={(e) => setNewLessonPage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                      {lang === 'so' ? 'Dhibcaha / Qiimaynta' : 'Performance Grade'}
                    </label>
                    <select
                      value={newLessonGrade}
                      onChange={(e) => setNewLessonGrade(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                    >
                      <option value="Mumtaaz (10/10)">Mumtaaz (10/10) - Aad u Sareeya</option>
                      <option value="Mumtaaz (9.5/10)">Mumtaaz (9.5/10) - Aad u Fiican</option>
                      <option value="Jayyid Jiddan (8.5/10)">Jayyid Jiddan (8.5/10) - Fiican</option>
                      <option value="Jayyid (7.5/10)">Jayyid (7.5/10) - Dhexdhexaad</option>
                      <option value="Muraajaco (Dib-u-eegis)">Muraajaco (Dib-u-eegis)</option>
                    </select>
                  </div>
                </div>

                {/* Teacher / Student notes */}
                <div>
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                    {lang === 'so' ? 'Faallada / Qodobada Muhiimka ah ee Macallinka' : 'Teacher Feedback & Tajweed Notes'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={lang === 'so' ? 'Tusaale: Wuxuu si fiican u akhriyay xeerarka Nuun Saakinada iyo Qalqalaha...' : 'e.g. Great recitation with excellent pronunciation of Noon Sakinah and Qalqalah...'}
                    value={newLessonTeacherNotes}
                    onChange={(e) => setNewLessonTeacherNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                    {lang === 'so' ? 'Qoraalkaaga Gaarka ah (Ikhtiyaari)' : 'Personal Student Notes (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'so' ? 'Tusaale: Waxaan ku celiyay 5 jeer guriga' : 'e.g. Practiced 5 times at home'}
                    value={newLessonStudentNotes}
                    onChange={(e) => setNewLessonStudentNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    {lang === 'so' ? 'Ka Noqo' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-black shadow-md shadow-orange-500/30 cursor-pointer"
                  >
                    {lang === 'so' ? 'Keydi Casharka Maanta' : 'Save Today’s Lesson'}
                  </button>
                </div>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
