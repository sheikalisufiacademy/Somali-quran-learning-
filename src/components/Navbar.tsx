import React, { useState } from 'react';
import { 
  BookOpen, 
  Menu, 
  X, 
  Globe, 
  Calendar,
  Sparkles,
  MessageCircle,
  Home
} from 'lucide-react';
import { Language, AppPage } from '../types';
import { LogoBadge } from './LogoBadge';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onOpenRegister: (courseId?: string, planId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  lang, 
  setLang, 
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

  return (
    <>
      {/* Main Header */}
      <header id="main-header" className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Navigates to Home */}
            <button 
              onClick={() => handleNavClick('home')}
              id="brand-logo" 
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <LogoBadge size="md" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-[#0B192C]">
                    BARO QURAN
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white rounded-md">
                    ACADEMY
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 font-arabic">
                  {lang === 'so' ? 'Akadeemiyada Barashada Qur’aanka' : 'Online Quran & Islamic Academy'}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`px-3 py-2 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    {lang === 'so' ? link.labelSo : link.labelEn}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons & Single Language Toggle */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Single Interactive Language Toggle Button */}
              <button
                id="lang-toggle-btn"
                onClick={() => setLang(lang === 'so' ? 'en' : 'so')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B192C] border border-slate-300 text-xs font-black transition-all shadow-xs cursor-pointer"
                title={lang === 'so' ? 'Guji si aad ugu beddesho English' : 'Click to switch to Somali'}
              >
                <Globe className="w-3.5 h-3.5 text-orange-500" />
                <span>{lang === 'so' ? '🇸🇴 Soomaali' : '🇬🇧 English'}</span>
              </button>

              <button
                onClick={() => handleNavClick('pricing')}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                  currentPage === 'pricing'
                    ? 'bg-orange-500 text-white'
                    : 'text-[#0B192C] bg-slate-50 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {lang === 'so' ? 'Xirmooyinka' : 'Pricing'}
              </button>

              <button
                id="btn-nav-register"
                onClick={() => onOpenRegister()}
                className="px-5 py-2.5 text-sm font-extrabold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-md shadow-orange-500/30 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'so' ? 'Fasalka Tijaabada' : 'Book Free Trial'}</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Single Language Toggle for Mobile Bar */}
              <button
                id="lang-toggle-mobile"
                onClick={() => setLang(lang === 'so' ? 'en' : 'so')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 text-[#0B192C] border border-slate-300 text-xs font-bold cursor-pointer"
              >
                <span>{lang === 'so' ? '🇸🇴 SO' : '🇬🇧 EN'}</span>
              </button>

              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#0B192C] hover:text-orange-600 hover:bg-orange-50 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-nav-menu" className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
            <div className="pb-3 border-b border-slate-100">
              <button
                onClick={() => setLang(lang === 'so' ? 'en' : 'so')}
                className="w-full py-2.5 px-4 text-center text-xs font-black rounded-xl border border-orange-300 bg-orange-50 text-[#0B192C] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-orange-500" />
                <span>{lang === 'so' ? 'Luuqadda: 🇸🇴 Af-Soomaali (Taabo si aad u beddesho)' : 'Language: 🇬🇧 English (Tap to switch)'}</span>
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-extrabold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-slate-800 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    {lang === 'so' ? link.labelSo : link.labelEn}
                  </button>
                );
              })}
            </div>

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
                className="w-full py-2.5 text-center text-sm font-bold text-[#0B192C] bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-orange-500" />
                <span>{lang === 'so' ? 'Nagala Xiriir WhatsApp: +251 77 779 6444' : 'WhatsApp: +251 77 779 6444'}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
