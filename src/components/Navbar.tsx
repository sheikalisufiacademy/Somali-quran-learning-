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

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
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

  const navLinks: { page: AppPage; labelSo: string; labelEn: string }[] = [
    { page: 'home', labelSo: 'Bogga Hore', labelEn: 'Home' },
    { page: 'courses', labelSo: 'Koorsooyinka', labelEn: 'Courses' },
    { page: 'why-us', labelSo: 'Faa’iidooyinka', labelEn: 'Why Us' },
    { page: 'pricing', labelSo: 'Xirmooyinka & Qiimaha', labelEn: 'Pricing' },
    { page: 'reviews', labelSo: 'Aragtida Waalidiinta', labelEn: 'Reviews' },
    { page: 'faq', labelSo: 'Su’aalaha (FAQ)', labelEn: 'FAQ' },
    { page: 'contact', labelSo: 'Nala Xiriir', labelEn: 'Contact' },
  ];

  const handleNavClick = (page: AppPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-[#0B192C] dark:text-white">
                    BARO QURAN
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white rounded-md">
                    ACADEMY
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-arabic">
                  {lang === 'so' ? 'Akadeemiyada Barashada Qur’aanka' : 'Online Quran & Islamic Academy'}
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
                        {lang === 'so' ? link.labelSo : link.labelEn}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Action Buttons: Dark/Light Mode, Language Toggle, Login & Free Trial */}
            <div className="hidden sm:flex items-center gap-2">
              
              {/* Dark / Light Theme Toggle Button */}
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#0B192C] dark:text-white border border-slate-300 dark:border-slate-700 text-xs font-black transition-all shadow-xs cursor-pointer"
                title={theme === 'dark' ? (lang === 'so' ? 'U beddel Caddaan (Light Mode)' : 'Switch to Light Mode') : (lang === 'so' ? 'U beddel Madow (Dark Mode)' : 'Switch to Dark Mode')}
                aria-label="Toggle Dark/Light Mode"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                    <span>{lang === 'so' ? 'Caddaan' : 'Light'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>{lang === 'so' ? 'Madow' : 'Dark'}</span>
                  </>
                )}
              </button>

              {/* Single Interactive Language Toggle Button */}
              <button
                id="lang-toggle-btn"
                onClick={() => setLang(lang === 'so' ? 'en' : 'so')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#0B192C] dark:text-white border border-slate-300 dark:border-slate-700 text-xs font-black transition-all shadow-xs cursor-pointer"
                title={lang === 'so' ? 'Guji si aad ugu beddesho English' : 'Click to switch to Somali'}
                aria-label="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-orange-500" />
                <span>{lang === 'so' ? '🇸🇴 SO' : '🇬🇧 EN'}</span>
              </button>

              {/* Free Trial Button */}
              <button
                id="btn-nav-register"
                onClick={() => onOpenRegister()}
                className="px-4 py-2 text-xs sm:text-sm font-extrabold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-md shadow-orange-500/30 hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'so' ? 'Fasalka Tijaabada' : 'Free Trial'}</span>
              </button>
            </div>

            {/* Mobile menu and mobile toggle buttons */}
            <div className="flex lg:hidden items-center gap-1.5">
              
              {/* Mobile Theme Toggle Button */}
              <button
                id="theme-toggle-mobile"
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-[#0B192C] dark:text-white border border-slate-300 dark:border-slate-700 text-xs font-bold cursor-pointer"
                title="Toggle Theme"
                aria-label="Toggle Dark/Light Mode"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* Single Language Toggle for Mobile Bar */}
              <button
                id="lang-toggle-mobile"
                onClick={() => setLang(lang === 'so' ? 'en' : 'so')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[#0B192C] dark:text-white border border-slate-300 dark:border-slate-700 text-xs font-bold cursor-pointer"
              >
                <span>{lang === 'so' ? '🇸🇴 SO' : '🇬🇧 EN'}</span>
              </button>

              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#0B192C] dark:text-white hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-nav-menu" className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B192C] px-4 pt-3 pb-6 space-y-2 shadow-xl">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <button
                onClick={toggleTheme}
                className="py-2.5 px-3 text-center text-xs font-black rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-[#0B192C] dark:text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'so' ? 'Habka: Caddaan' : 'Light Mode'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span>{lang === 'so' ? 'Habka: Madow' : 'Dark Mode'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setLang(lang === 'so' ? 'en' : 'so')}
                className="py-2.5 px-3 text-center text-xs font-black rounded-xl border border-orange-300 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/40 text-[#0B192C] dark:text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-orange-500" />
                <span>{lang === 'so' ? '🇸🇴 Soomaali' : '🇬🇧 English'}</span>
              </button>
            </div>

            <nav aria-label="Mobile Navigation" className="space-y-1">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.page;
                  return (
                    <li key={link.page}>
                      <a
                        href={`#${link.page}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.page);
                        }}
                        className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-extrabold transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-orange-500 text-white'
                            : 'text-slate-800 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600'
                        }`}
                      >
                        {lang === 'so' ? link.labelSo : link.labelEn}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 text-center text-sm font-extrabold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md cursor-pointer"
              >
                {lang === 'so' ? 'Qaado Fasal Tijaabo ah (Bilaash)' : 'Book 100% Free Trial'}
              </button>
              
              <a
                href="https://wa.me/251777796444"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-sm font-bold text-[#0B192C] dark:text-orange-300 bg-orange-50 dark:bg-slate-800/80 border border-orange-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-orange-500" />
                <span>{lang === 'so' ? 'WhatsApp: +251 77 779 6444' : 'WhatsApp: +251 77 779 6444'}</span>
              </a>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="https://www.tiktok.com/@baroquranacademy?_r=1&_t=ZS-999Od1KUFWc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 text-center text-xs font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.35a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.63a6.34 6.34 0 0 0 10.78 4.54 6.27 6.27 0 0 0 1.91-4.5V8.55a8.28 8.28 0 0 0 4.9 1.59V6.69z"/>
                  </svg>
                  <span>TikTok</span>
                </a>

                <a
                  href="https://www.facebook.com/share/19CX8RR8CX/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 text-center text-xs font-bold text-white bg-[#1877F2] rounded-xl flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
