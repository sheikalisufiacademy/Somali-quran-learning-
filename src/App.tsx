import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ArrowLeft,
  Calendar,
  Globe,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, AppPage, Theme } from './types';

// Subcomponents
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
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [lang, setLang] = useState<Language>('so');
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('baro_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState<string | undefined>();
  const [preselectedPlan, setPreselectedPlan] = useState<string | undefined>();

  // Manage Dark / Light Theme Class on document root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('baro_theme', theme);
  }, [theme]);

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
      const validPages: AppPage[] = ['home', 'courses', 'why-us', 'pricing', 'reviews', 'faq', 'contact', 'privacy', 'terms'];
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
        : `Baro Quran Academy | ${currentPage.toUpperCase()}`;
    } else {
      document.title = currentPage === 'home'
        ? "Learn Quran Online | Baro Quran Academy - Tajweed, Qaida & Hifz"
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070E18] text-slate-900 dark:text-slate-100 font-sans selection:bg-orange-500 selection:text-white flex flex-col transition-colors duration-200">
      
      {/* Header and Top Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenRegister={handleOpenRegister}
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

          {currentPage !== 'home' && (
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0E1A2C] border border-slate-200 dark:border-slate-700 text-[#0B192C] dark:text-white text-xs font-black hover:bg-orange-50 dark:hover:bg-slate-800 hover:border-orange-300 hover:text-orange-600 transition-all shadow-xs cursor-pointer"
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
      <Footer
        lang={lang}
        onOpenRegister={handleOpenRegister}
        onNavigate={handleNavigate}
      />

      {/* Interactive Registration & Free Trial Booking Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        lang={lang}
        preselectedCourseId={preselectedCourse}
        preselectedPlanId={preselectedPlan}
      />

      {/* Floating WhatsApp Quick Launcher */}
      <FloatingWhatsApp lang={lang} />

    </div>
  );
}
