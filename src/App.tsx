import React, { useState, useEffect } from 'react';
import { Language, AppPage, StudentProfile } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Courses } from './components/Courses';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactPage } from './components/ContactPage';
import { PolicyTermsPages } from './components/PolicyTermsPages';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { StudentLoginModal } from './components/StudentLoginModal';
import { StudentDashboard } from './components/StudentDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Default Student Profile fallback
const DEFAULT_STUDENT: StudentProfile = {
  studentId: 'STD-2024-88',
  fullName: 'Cabdiraxmaan Maxamed Cali',
  age: '9',
  gender: 'male',
  email: 'abdirahman@gmail.com',
  phone: '+44 7123 456789',
  enrolledCourseId: 'quran-reading',
  enrolledCourseTitleSo: 'Akhriska Saxda ah & Tajweedka Sare (Quran Reading with Tajweed)',
  enrolledCourseTitleEn: 'Quran Reading with Advanced Tajweed Rules',
  assignedTeacherNameSo: 'Sheekh Cabdullaahi Maxamed (Macalinkaaga)',
  assignedTeacherNameEn: 'Sheikh Abdullahi Mohamed (Your Assigned Teacher)',
  assignedTeacherPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  classTime: '06:00 PM (UK / GMT)',
  scheduleDays: ['Isniin (Mon)', 'Talaado (Tue)', 'Arbaco (Wed)', 'Khamiis (Thu)', 'Jimco (Fri)'],
  meetingLink: 'https://meet.google.com/baro-quran-live',
  tomorrowsLesson: 'Suuratul Al-Mulk (Aayadaha 1 - 10) & Xeerka Ghunnah',
  tomorrowPrepNotes: 'Fadlan dib u akhri aayadaha 1-10 ee Suuratul Mulk ugu yaraan 3 jeer inta aadan fasalka soo galin.',
  attendanceRate: 98,
  totalCompletedLessons: 42,
  juzMemorized: 4
};

export default function App() {
  const [lang, setLang] = useState<Language>('so');
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('baro_active_student');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [preselectedCourse, setPreselectedCourse] = useState<string | undefined>();
  const [preselectedPlan, setPreselectedPlan] = useState<string | undefined>();

  // Sync hash routing and language params on mount and hashchange
  useEffect(() => {
    const handleUrlSync = () => {
      // Check query param for lang
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en' || urlLang === 'so') {
        setLang(urlLang as Language);
      }

      // Check hash for page routing
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: AppPage[] = ['home', 'courses', 'why-us', 'pricing', 'reviews', 'faq', 'contact', 'privacy', 'terms', 'student-dashboard'];
      if (validPages.includes(hash as AppPage)) {
        setCurrentPage(hash as AppPage);
      }
    };

    handleUrlSync();
    window.addEventListener('hashchange', handleUrlSync);
    return () => window.removeEventListener('hashchange', handleUrlSync);
  }, []);

  // Update document title and lang attribute based on current state
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'so') {
      document.title = currentPage === 'home'
        ? "Baro Qur'aanka Online | Baro Quran Academy - Akadeemiyada Tajwiidka, Higaada & Xifdiga"
        : currentPage === 'student-dashboard'
        ? "Dashboard-ka Ardayga | Baro Quran Academy"
        : `Baro Quran Academy | ${currentPage.toUpperCase()}`;
    } else {
      document.title = currentPage === 'home'
        ? "Learn Quran Online | Baro Quran Academy - Tajweed, Qaida & Hifz"
        : currentPage === 'student-dashboard'
        ? "Student Dashboard | Baro Quran Academy"
        : `Baro Quran Academy | ${currentPage.toUpperCase()}`;
    }
  }, [lang, currentPage]);

  const handleOpenRegister = (courseId?: string, planId?: string) => {
    setPreselectedCourse(courseId);
    setPreselectedPlan(planId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (student: StudentProfile) => {
    setCurrentStudent(student);
    localStorage.setItem('baro_active_student', JSON.stringify(student));
    setCurrentPage('student-dashboard');
    window.location.hash = 'student-dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    localStorage.removeItem('baro_active_student');
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white flex flex-col">
      
      {/* Header and Top Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenRegister={handleOpenRegister}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="page-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <Hero
                lang={lang}
                onOpenRegister={() => handleOpenRegister()}
                onNavigate={handleNavigate}
              />

              {/* Why Choose Us / Features */}
              <Features lang={lang} />

              {/* Courses & Curriculum */}
              <Courses
                lang={lang}
                onSelectCourse={(courseId) => handleOpenRegister(courseId)}
              />

              {/* How It Works (4 Easy Steps) */}
              <HowItWorks
                lang={lang}
                onOpenRegister={() => handleOpenRegister()}
              />

              {/* Pricing Plans with Currency Switcher */}
              <Pricing
                lang={lang}
                onSelectPlan={(planId) => handleOpenRegister(undefined, planId)}
              />

              {/* Parent & Student Reviews */}
              <Testimonials lang={lang} />

              {/* FAQ Accordion */}
              <FaqSection lang={lang} />
            </motion.div>
          )}

          {currentPage === 'student-dashboard' && (
            <motion.div
              key="page-student-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <StudentDashboard
                student={currentStudent || DEFAULT_STUDENT}
                lang={lang}
                onLogout={handleLogout}
                onNavigateHome={() => handleNavigate('home')}
              />
            </motion.div>
          )}

          {currentPage !== 'home' && currentPage !== 'student-dashboard' && (
            <motion.div
              key={`page-${currentPage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-6"
            >
              {/* Back to Home Breadcrumb */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[#0B192C] text-xs font-black hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all shadow-xs cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-orange-500" />
                  <span>{lang === 'so' ? '← Ku noqo Bogga Hore (Home)' : '← Back to Home'}</span>
                </button>
              </div>

              {/* Dedicated Subpages */}
              {currentPage === 'courses' && (
                <div>
                  <Courses
                    lang={lang}
                    onSelectCourse={(courseId) => handleOpenRegister(courseId)}
                  />
                  <HowItWorks
                    lang={lang}
                    onOpenRegister={() => handleOpenRegister()}
                  />
                </div>
              )}

              {currentPage === 'why-us' && (
                <div>
                  <Features lang={lang} />
                  <HowItWorks
                    lang={lang}
                    onOpenRegister={() => handleOpenRegister()}
                  />
                </div>
              )}

              {currentPage === 'pricing' && (
                <div>
                  <Pricing
                    lang={lang}
                    onSelectPlan={(planId) => handleOpenRegister(undefined, planId)}
                  />
                  <FaqSection lang={lang} />
                </div>
              )}

              {currentPage === 'reviews' && (
                <div>
                  <Testimonials lang={lang} />
                </div>
              )}

              {currentPage === 'faq' && (
                <div>
                  <FaqSection lang={lang} />
                </div>
              )}

              {currentPage === 'contact' && (
                <div>
                  <ContactPage
                    lang={lang}
                    onOpenRegister={() => handleOpenRegister()}
                  />
                </div>
              )}

              {currentPage === 'privacy' && (
                <div>
                  <PolicyTermsPages
                    lang={lang}
                    type="privacy"
                    onNavigateHome={() => handleNavigate('home')}
                  />
                </div>
              )}

              {currentPage === 'terms' && (
                <div>
                  <PolicyTermsPages
                    lang={lang}
                    type="terms"
                    onNavigateHome={() => handleNavigate('home')}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {currentPage !== 'student-dashboard' && (
        <Footer
          lang={lang}
          onOpenRegister={handleOpenRegister}
          onNavigate={handleNavigate}
        />
      )}

      {/* Interactive Registration & Free Trial Booking Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        lang={lang}
        preselectedCourseId={preselectedCourse}
        preselectedPlanId={preselectedPlan}
      />

      {/* Student Login Modal */}
      <StudentLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        lang={lang}
      />

      {/* Floating WhatsApp Quick Launcher */}
      <FloatingWhatsApp lang={lang} />

    </div>
  );
}
