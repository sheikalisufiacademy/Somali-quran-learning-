import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Home, 
  BookOpen, 
  CreditCard, 
  Sparkles, 
  Phone, 
  Info, 
  Moon, 
  Sun, 
  ChevronDown, 
  ChevronUp, 
  Globe,
  Compass,
  FileText,
  HelpCircle,
  Gift,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Theme, AppPage } from '../types';
import { LogoBadge } from './LogoBadge';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: AppPage;
  onNavigate: (page: AppPage, targetId?: string) => void;
  onOpenRegister: (courseId?: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onOpenRegister,
  lang,
  setLang,
  theme,
  toggleTheme,
}) => {
  const [expandedSection, setExpandedSection] = useState<'about' | 'courses' | 'explore' | null>(null);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setExpandedSection(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSection = (section: 'about' | 'courses' | 'explore') => {
    setExpandedSection(prev => (prev === section ? null : section));
  };

  const handleLinkClick = (page: AppPage, targetId?: string) => {
    onClose();
    setTimeout(() => {
      onNavigate(page, targetId);
    }, 100);
  };

  const handleFreeTrialClick = () => {
    onClose();
    setTimeout(() => {
      onOpenRegister();
    }, 100);
  };

  // Only render on client
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          id="mobile-nav-portal-container"
          className="fixed inset-0 z-[99999] pointer-events-auto"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in Navigation Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed inset-y-0 right-0 w-[86%] max-w-sm bg-white dark:bg-[#071322] shadow-2xl flex flex-col z-[100000] border-l border-slate-200 dark:border-slate-800"
          >
            {/* Header: Brand Logo & Close Button */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-white dark:bg-[#071322] shrink-0">
              <div className="flex items-center gap-2.5">
                <LogoBadge size="sm" />
                <div className="flex flex-col">
                  <span className="font-black text-base tracking-tight text-black dark:text-white">
                    Baro Quran Academy
                  </span>
                  <span className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold font-arabic">
                    {lang === 'so' ? 'Akadeemiyada Qur’aanka' : 'Online Quran Academy'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
              
              {/* 1. Home (Direct Link) */}
              <div>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home')}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer text-left ${
                    currentPage === 'home'
                      ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Home className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>Home</span>
                </button>
              </div>

              {/* 2. About (Collapsible Dropdown with Tree View) */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('about')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer text-left ${
                    expandedSection === 'about'
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50/70 dark:bg-orange-950/40'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Info className="w-5 h-5 text-orange-500 shrink-0" />
                    <span>About</span>
                  </div>
                  {expandedSection === 'about' ? (
                    <ChevronUp className="w-4 h-4 text-orange-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  )}
                </button>

                {/* Submenu Tree View for About */}
                <AnimatePresence>
                  {expandedSection === 'about' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 pl-4 border-l-2 border-orange-400 dark:border-orange-500/80 my-1 py-1.5 space-y-2 text-sm overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => handleLinkClick('why-us', 'our-story')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Our Story</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('why-us', 'methodology')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Teaching Methodology</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('why-us', 'approach')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Our Approach</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('why-us', 'why-we-exist')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Why We Exist</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('why-us', 'philosophy')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Learning Philosophy</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Courses (Collapsible Dropdown with Tree View) */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('courses')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer text-left ${
                    expandedSection === 'courses'
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50/70 dark:bg-orange-950/40'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <BookOpen className="w-5 h-5 text-orange-500 shrink-0" />
                    <span>Courses</span>
                  </div>
                  {expandedSection === 'courses' ? (
                    <ChevronUp className="w-4 h-4 text-orange-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  )}
                </button>

                {/* Submenu Tree View for Courses */}
                <AnimatePresence>
                  {expandedSection === 'courses' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 pl-4 border-l-2 border-orange-400 dark:border-orange-500/80 my-1 py-1.5 space-y-2 text-sm overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => handleLinkClick('courses', 'qaacida-nuuraaniya')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Quran Reading & Noorani Qaida</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('courses', 'tajweed-recitation')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Tajweed & Recitation</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('courses', 'quran-memorization-hifz')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Quran Memorization (Hifz)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('courses', 'arabic-language')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Arabic Language</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('courses', 'islamic-studies-tarbiyah')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Islamic Studies & Tarbiyah</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('courses', 'sisters-female-classes')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Sisters & Female Program</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. Explore (Collapsible Dropdown with Tree View) */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('explore')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer text-left ${
                    expandedSection === 'explore'
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50/70 dark:bg-orange-950/40'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Compass className="w-5 h-5 text-orange-500 shrink-0" />
                    <span>Explore</span>
                  </div>
                  {expandedSection === 'explore' ? (
                    <ChevronUp className="w-4 h-4 text-orange-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  )}
                </button>

                {/* Submenu Tree View for Explore */}
                <AnimatePresence>
                  {expandedSection === 'explore' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 pl-4 border-l-2 border-orange-400 dark:border-orange-500/80 my-1 py-1.5 space-y-2 text-sm overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => handleLinkClick('reviews', 'articles')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Blog & Articles</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('faq')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">FAQs</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('pricing')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Pricing Plans</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleFreeTrialClick}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1 font-bold text-orange-600 dark:text-orange-400">Free Trial Class</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLinkClick('contact')}
                        className="relative flex items-center w-full text-left text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium py-1 transition-colors cursor-pointer before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-0.5 before:bg-orange-300 dark:before:bg-orange-600"
                      >
                        <span className="pl-1">Contact Support</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 5. Contact (Direct Link) */}
              <div>
                <button
                  type="button"
                  onClick={() => handleLinkClick('contact')}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer text-left ${
                    currentPage === 'contact'
                      ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>Contact</span>
                </button>
              </div>

              {/* Quick Enroll CTA in drawer */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleFreeTrialClick}
                  className="w-full py-3 px-4 rounded-2xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs sm:text-sm font-black shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  <span>Book Free Trial Class</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Bottom Controls: Dark Mode Box */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#071322] space-y-2.5 shrink-0">
              {/* Dark Mode Box */}
              <div className="p-3 rounded-2xl bg-orange-50/50 dark:bg-slate-800/80 border border-orange-100/80 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Dark Mode
                  </span>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-600 flex items-center justify-center text-amber-500 hover:scale-105 transition-all cursor-pointer"
                  aria-label="Toggle Dark Mode"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-700" />
                  )}
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
