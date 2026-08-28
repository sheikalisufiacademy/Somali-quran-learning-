import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ArrowLeft,
  Calendar,
  Globe,
  Sparkles,
  CheckCircle2,
  XCircle,
  X,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
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
import { SingleCoursePage } from './components/SingleCoursePage';
import { SingleAboutPage, AboutTopicId } from './components/SingleAboutPage';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('baro_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [activeTargetId, setActiveTargetId] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState<string | undefined>();
  const [preselectedPlan, setPreselectedPlan] = useState<string | undefined>();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'cancelled' | null>(null);

  // Manage Dark / Light Theme Class on document root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('baro_theme', theme);
  }, [theme]);

  // Sync hash routing and payment redirect returns
  useEffect(() => {
    const handleUrlSync = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('payment_success') === 'true') {
        setPaymentStatus('success');
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      } else if (params.get('payment_cancelled') === 'true') {
        setPaymentStatus('cancelled');
      }

      // Check hash for page routing
      const rawHash = window.location.hash.replace('#', '').trim().toLowerCase();
      if (!rawHash || rawHash === 'home') {
        setCurrentPage('home');
        setActiveTargetId(undefined);
        return;
      }

      const courseIds = [
        'qaacida-nuuraaniya',
        'tajweed-recitation',
        'quran-memorization-hifz',
        'arabic-language',
        'islamic-studies-tarbiyah',
        'sisters-female-classes'
      ];

      const aboutTopicIds = [
        'our-story',
        'methodology',
        'approach',
        'why-we-exist',
        'philosophy'
      ];

      if (courseIds.includes(rawHash) || rawHash.startsWith('course-')) {
        const cId = rawHash.replace('course-', '');
        setCurrentPage('courses');
        setActiveTargetId(cId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (aboutTopicIds.includes(rawHash)) {
        setCurrentPage('why-us');
        setActiveTargetId(rawHash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (['why-us', 'about'].includes(rawHash)) {
        setCurrentPage('why-us');
        setActiveTargetId(undefined);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (['courses'].includes(rawHash)) {
        setCurrentPage('courses');
        setActiveTargetId(undefined);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const validPages: AppPage[] = ['home', 'courses', 'why-us', 'pricing', 'reviews', 'faq', 'contact', 'privacy', 'terms'];
        if (validPages.includes(rawHash as AppPage)) {
          setCurrentPage(rawHash as AppPage);
          setActiveTargetId(undefined);
        } else if (['articles', 'testimonials', 'reviews'].includes(rawHash) || rawHash.startsWith('review-') || rawHash.startsWith('article-')) {
          setCurrentPage('reviews');
          setActiveTargetId(rawHash);
        } else {
          setCurrentPage('home');
          setActiveTargetId(undefined);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleUrlSync();
    window.addEventListener('hashchange', handleUrlSync);
    return () => window.removeEventListener('hashchange', handleUrlSync);
  }, []);

  // Update document title
  useEffect(() => {
    document.documentElement.lang = 'en';
    const pageTitles: Record<AppPage, string> = {
      'home': 'Baro Quran Academy - Online Quran, Tajweed & Islamic Studies',
      'courses': 'Our Courses & Syllabus | Baro Quran Academy',
      'why-us': 'Why Choose Us & Methodology | Baro Quran Academy',
      'pricing': 'Pricing Plans & Packages | Baro Quran Academy',
      'reviews': 'Parent Reviews & Islamic Blog | Baro Quran Academy',
      'faq': 'Frequently Asked Questions | Baro Quran Academy',
      'contact': 'Contact Us & Schedules | Baro Quran Academy',
      'privacy': 'Privacy Policy | Baro Quran Academy',
      'terms': 'Terms of Service | Baro Quran Academy',
    };
    document.title = pageTitles[currentPage] || pageTitles.home;
  }, [currentPage]);

  const handleOpenRegister = (courseId?: string, planId?: string) => {
    setPreselectedCourse(courseId);
    setPreselectedPlan(planId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (page: AppPage, targetId?: string) => {
    setCurrentPage(page);
    setActiveTargetId(targetId);
    
    if (page === 'home' && !targetId) {
      window.location.hash = '';
    } else if (targetId) {
      window.location.hash = targetId;
    } else {
      window.location.hash = page;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderBreadcrumb = (title: string) => (
    <div className="bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => handleNavigate('home')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Home / <span className="text-orange-500 font-extrabold">{title}</span>
        </div>
      </div>
    </div>
  );

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

      {/* Main Content Area with Animated Single Page Views */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* 1. Hero Banner */}
              <Hero
                lang={lang}
                onOpenRegister={() => handleOpenRegister()}
                onNavigate={handleNavigate}
              />

              {/* 2. Quick Features Summary */}
              <Features lang={lang} targetSection={activeTargetId} />

              {/* 3. Featured Courses Teaser */}
              <Courses
                lang={lang}
                targetCourseId={activeTargetId}
                onSelectCourse={(courseId) => handleOpenRegister(courseId)}
              />

              {/* 4. How It Works */}
              <HowItWorks
                lang={lang}
                onOpenRegister={() => handleOpenRegister()}
              />

              {/* 5. Pricing Quick Glance */}
              <Pricing
                lang={lang}
                onSelectPlan={(planId) => handleOpenRegister(undefined, planId)}
              />

              {/* 6. Parent Testimonials Highlights */}
              <Testimonials lang={lang} targetId={activeTargetId} />

              {/* 7. FAQ Quick Glance */}
              <FaqSection lang={lang} />

              {/* 8. Contact & Consultation */}
              <ContactPage
                lang={lang}
                onOpenRegister={() => handleOpenRegister()}
              />
            </motion.div>
          )}

          {currentPage === 'courses' && (
            <motion.div
              key={activeTargetId ? `courses-${activeTargetId}` : 'courses-catalog'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeTargetId && [
                'qaacida-nuuraaniya',
                'tajweed-recitation',
                'quran-memorization-hifz',
                'arabic-language',
                'islamic-studies-tarbiyah',
                'sisters-female-classes'
              ].includes(activeTargetId) ? (
                <SingleCoursePage
                  courseId={activeTargetId}
                  lang={lang}
                  onBack={() => handleNavigate('courses')}
                  onEnroll={(courseId) => handleOpenRegister(courseId)}
                  onSelectOtherCourse={(courseId) => handleNavigate('courses', courseId)}
                />
              ) : (
                <>
                  {renderBreadcrumb('Courses & Syllabus')}
                  <Courses
                    lang={lang}
                    targetCourseId={activeTargetId}
                    onSelectCourse={(courseId) => handleOpenRegister(courseId)}
                    onOpenSingleCourse={(courseId) => handleNavigate('courses', courseId)}
                  />
                </>
              )}
            </motion.div>
          )}

          {currentPage === 'why-us' && (
            <motion.div
              key={activeTargetId ? `why-us-${activeTargetId}` : 'why-us-overview'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeTargetId && [
                'our-story',
                'methodology',
                'approach',
                'why-we-exist',
                'philosophy'
              ].includes(activeTargetId) ? (
                <SingleAboutPage
                  topicId={activeTargetId as AboutTopicId}
                  lang={lang}
                  onSelectTopic={(topicId) => handleNavigate('why-us', topicId)}
                  onBack={() => handleNavigate('why-us')}
                  onOpenRegister={() => handleOpenRegister()}
                />
              ) : (
                <>
                  {renderBreadcrumb('Why Choose Us & Methodology')}
                  <Features 
                    lang={lang} 
                    targetSection={activeTargetId} 
                    onOpenSingleAbout={(topicId) => handleNavigate('why-us', topicId)}
                  />
                  <HowItWorks
                    lang={lang}
                    onOpenRegister={() => handleOpenRegister()}
                  />
                </>
              )}
            </motion.div>
          )}

          {currentPage === 'pricing' && (
            <motion.div
              key="pricing-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {renderBreadcrumb('Pricing Plans & Packages')}
              <Pricing
                lang={lang}
                onSelectPlan={(planId) => handleOpenRegister(undefined, planId)}
              />
            </motion.div>
          )}

          {currentPage === 'reviews' && (
            <motion.div
              key="reviews-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {renderBreadcrumb('Reviews & Islamic Blog')}
              <Testimonials lang={lang} targetId={activeTargetId} />
            </motion.div>
          )}

          {currentPage === 'faq' && (
            <motion.div
              key="faq-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {renderBreadcrumb('Frequently Asked Questions')}
              <FaqSection lang={lang} />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {renderBreadcrumb('Contact Support & Schedules')}
              <ContactPage
                lang={lang}
                onOpenRegister={() => handleOpenRegister()}
              />
            </motion.div>
          )}

          {(currentPage === 'privacy' || currentPage === 'terms') && (
            <motion.div
              key={`policy-${currentPage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="py-4"
            >
              {renderBreadcrumb(currentPage === 'privacy' ? 'Privacy Policy' : 'Terms of Service')}
              <PolicyTermsPages
                lang={lang}
                type={currentPage === 'privacy' ? 'privacy' : 'terms'}
                onNavigateHome={() => handleNavigate('home')}
              />
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

      {/* Payment Feedback Modal */}
      <AnimatePresence>
        {paymentStatus && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-slate-200 dark:border-slate-700 text-center relative"
            >
              <button
                type="button"
                onClick={() => {
                  setPaymentStatus(null);
                  window.history.replaceState({}, '', window.location.pathname);
                }}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {paymentStatus === 'success' ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-900/20">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0B192C] dark:text-white">
                    {lang === 'so' ? 'Lacag Bixintii Waa Lagu Guuleystay! 🎉' : 'Payment Successful! 🎉'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'so'
                      ? 'Waad ku mahadsan tahay lacag bixintaada Baro Quran Academy. Diiwaangelintaada iyo lacag bixintaada waa la xaqiijiyay. Maamulka akadeemiyada ayaa kula soo xiriiri doona WhatsApp si loo bilaabo fasalka.'
                      : 'Thank you for your payment to Baro Quran Academy. Your registration and payment have been confirmed. Our team will contact you via WhatsApp to begin your classes.'}
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href="https://wa.me/251777796444?text=Asc%20Baro%20Quran%20Academy%2C%20waxaan%20bixiyay%20lacagtii%20waxaan%20rabaa%20in%20aan%20bilaabo%20fasalka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/30 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{lang === 'so' ? 'La Xiriir Xafiiska WhatsApp' : 'Contact Admissions via WhatsApp'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentStatus(null);
                        window.history.replaceState({}, '', window.location.pathname);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                    >
                      {lang === 'so' ? 'Xir Daacadda' : 'Dismiss'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto ring-8 ring-amber-50 dark:ring-amber-900/20">
                    <XCircle className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0B192C] dark:text-white">
                    {lang === 'so' ? 'Lacag Bixintii Waa La Joojiyay' : 'Payment Incomplete / Cancelled'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'so'
                      ? 'Uma aadan dhammaystirin lacag bixinta. Waxaad mar kale isku dayi kartaa wakhti kasta, ama waxaad qaadan kartaa fasal tijaabo ah oo 100% bilaash ah.'
                      : 'You did not complete the checkout process. You can try again at any time, or simply register for our 100% free trial class.'}
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentStatus(null);
                        window.history.replaceState({}, '', window.location.pathname);
                        setIsModalOpen(true);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{lang === 'so' ? 'Diiwaangeli Fasal Bilaash ah' : 'Register for Free Trial'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentStatus(null);
                        window.history.replaceState({}, '', window.location.pathname);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                    >
                      {lang === 'so' ? 'Xir' : 'Close'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Quick Launcher */}
      <FloatingWhatsApp lang={lang} />

      {/* Vercel Speed Insights */}
      <SpeedInsights />

    </div>
  );
}
