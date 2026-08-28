import React, { useState } from 'react';
import { 
  BookOpen, 
  Menu, 
  X, 
  Globe, 
  Calendar,
  Sparkles,
  MessageCircle,
  Home,
  User,
  Moon,
  Sun
} from 'lucide-react';
import { Language, AppPage, Theme } from '../types';
import { LogoBadge } from './LogoBadge';
import { MobileNavDrawer } from './MobileNavDrawer';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentPage: AppPage;
  onNavigate: (page: AppPage, targetId?: string) => void;
  onOpenRegister: (courseId?: string, planId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  lang, 
  setLang, 
  theme,
  setTheme,
  currentPage, 
  onNavigate, 
  onOpenRegister
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { page: AppPage; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'courses', label: 'Courses' },
    { page: 'why-us', label: 'Why Us' },
    { page: 'pricing', label: 'Pricing' },
    { page: 'reviews', label: 'Reviews & Blog' },
    { page: 'faq', label: 'FAQ' },
    { page: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: AppPage, targetId?: string) => {
    onNavigate(page, targetId);
    setMobileMenuOpen(false);
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Main Header */}
      <header id="main-header" className="bg-white/95 dark:bg-[#0B192C]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Navigates to Home */}
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              id="brand-logo" 
              className="flex items-center gap-3 group text-left cursor-pointer"
              aria-label="Baro Quran Academy Home"
            >
              <LogoBadge size="md" />
              <div className="flex flex-col">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-black dark:text-white">
                  Baro Quran Academy
                </span>
                <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 font-arabic">
                  Online Quran & Islamic Academy
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" aria-label="Main Desktop Navigation" className="hidden lg:block">
              <ul className="flex items-center space-x-1 xl:space-x-2" role="menubar">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.page;
                  return (
                    <li key={link.page} role="none">
                      <a
                        href={`#${link.page}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.page);
                        }}
                        role="menuitem"
                        className={`inline-block px-3 py-2 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-orange-500 text-white shadow-xs'
                            : 'text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Action Buttons: Dark/Light Mode, Login & Free Trial */}
            <div className="hidden sm:flex items-center gap-2">
              
              {/* Dark / Light Theme Toggle Button */}
              <button
                id="theme-toggle-btn"
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#0B192C] dark:text-white border border-slate-300 dark:border-slate-700 text-xs font-black transition-all shadow-xs cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Dark/Light Mode"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>Dark</span>
                  </>
                )}
              </button>

              {/* Free Trial Button */}
              <button
                id="btn-nav-register"
                type="button"
                onClick={() => onOpenRegister()}
                className="px-4 py-2 text-xs sm:text-sm font-extrabold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-md shadow-orange-500/30 hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Free Trial</span>
              </button>
            </div>

            {/* Mobile menu toggle button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                id="mobile-menu-toggle"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(prev => !prev);
                }}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0B192C] dark:text-white hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-700 focus:outline-none transition-all cursor-pointer shadow-xs"
                aria-label="Open Menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer (Pages Menu) */}
        <MobileNavDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          lang={lang}
          setLang={setLang}
          theme={theme}
          toggleTheme={toggleTheme}
          currentPage={currentPage}
          onNavigate={handleNavClick}
          onOpenRegister={onOpenRegister}
        />
      </header>
    </>
  );
};
