import React from 'react';
import { 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Globe2, 
  Facebook 
} from 'lucide-react';
import { Language, AppPage } from '../types';
import { LogoBadge } from './LogoBadge';
import { ACADEMY_SOCIALS } from '../data/academyData';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.35a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.63a6.34 6.34 0 0 0 10.78 4.54 6.27 6.27 0 0 0 1.91-4.5V8.55a8.28 8.28 0 0 0 4.9 1.59V6.69z"/>
  </svg>
);

interface FooterProps {
  lang: Language;
  onOpenRegister: (courseId?: string) => void;
  onNavigate?: (page: AppPage, targetId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenRegister, onNavigate }) => {
  const handleNav = (page: AppPage, targetId?: string) => {
    if (onNavigate) {
      onNavigate(page, targetId);
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contact" className="bg-[#0B192C] dark:bg-[#070E18] text-slate-300 relative overflow-hidden pt-16 pb-12 border-t-2 border-orange-500/20 dark:border-orange-500/10">
      
      {/* Decorative subtle pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Call to Action in Footer */}
        <div className="mb-14 pb-12 border-b border-slate-800 dark:border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Start Your Child’s Quranic Journey Today
            </h3>
            <p className="text-sm text-slate-300 dark:text-slate-400 max-w-2xl font-medium">
              Join hundreds of satisfied families worldwide who entrust their children's Quran education to Baro Quran Academy.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3">
            <button
              type="button"
              onClick={() => onOpenRegister()}
              className="px-6 py-3.5 text-center text-sm font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
            >
              Book Free Trial Class
            </button>
            <a
              href="https://wa.me/251777796444"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 text-center text-sm font-bold text-white bg-slate-800 dark:bg-slate-800/80 hover:bg-slate-700 dark:hover:bg-slate-700 rounded-xl border border-slate-700 dark:border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-orange-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Main Footer 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800 dark:border-slate-800/80">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <LogoBadge size="md" />
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-white">
                  Baro Quran Academy
                </span>
                <span className="text-xs text-orange-400 font-arabic">
                  Online Quran & Islamic Academy
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Premier online academy providing 1-on-1 personalized Quran memorization, Noorani Qaida, applied Tajweed, and Islamic studies to students worldwide.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>100% Verified Teachers & Safe Environment</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-3 space-y-2">
              <span className="text-[11px] font-black text-white uppercase tracking-wider block">
                Follow Our Social Media
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={ACADEMY_SOCIALS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Baro Quran Academy TikTok"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-black text-white hover:text-white border border-slate-700 hover:border-slate-500 text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
                >
                  <TikTokIcon className="w-4 h-4 text-pink-500" />
                  <span>TikTok</span>
                </a>

                <a
                  href={ACADEMY_SOCIALS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Baro Quran Academy Facebook"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-[#1877F2] text-white hover:text-white border border-slate-700 hover:border-blue-400 text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
                >
                  <Facebook className="w-4 h-4 text-[#1877F2]" />
                  <span>Facebook</span>
                </a>

                <a
                  href={ACADEMY_SOCIALS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Baro Quran Academy WhatsApp"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-emerald-700 text-white hover:text-white border border-slate-700 hover:border-emerald-500 text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <nav aria-label="Footer Quick Links">
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li>
                  <button type="button" onClick={() => handleNav('home')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('courses')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    Courses & Syllabus
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('why-us')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    Why Choose Us
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('pricing')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    Pricing Plans
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('reviews')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    Reviews & Blog
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('faq')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    FAQs
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('privacy')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('terms')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('contact')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    Contact Us
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Col 3: Courses List (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Our Programs
            </h4>
            <nav aria-label="Footer Programs Navigation">
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li>
                  <button type="button" onClick={() => handleNav('courses', 'qaacida-nuuraaniya')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    • Noorani Qaida for Beginners
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('courses', 'tajweed-recitation')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    • Tajweed Mastery & Recitation
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('courses', 'quran-memorization-hifz')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    • Full Quran Memorization (Hifz)
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('courses', 'islamic-studies-tarbiyah')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    • Islamic Studies & Tarbiyah
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNav('courses', 'arabic-language')} className="hover:text-orange-400 transition-colors block text-left cursor-pointer">
                    • Arabic Language for Kids & Adults
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Col 4: Official Contact & Schedule (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Contact & Schedule
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300 font-medium">
              <a 
                href="https://wa.me/251777796444"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-orange-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="font-bold">WhatsApp: +251 77 779 6444</span>
              </a>

              <a 
                href="mailto:baroquranacademy1@gmail.com"
                className="flex items-center gap-2.5 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="break-all font-semibold">baroquranacademy1@gmail.com</span>
              </a>

              <a 
                href={ACADEMY_SOCIALS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-orange-400 transition-colors"
              >
                <TikTokIcon className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="font-bold">TikTok: @baroquranacademy</span>
              </a>

              <a 
                href={ACADEMY_SOCIALS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-orange-400 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-bold">Facebook: Baro Quran Academy</span>
              </a>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Classes: 24/7 Global Hours</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Students in 25+ Countries</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Baro Quran Academy. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <button type="button" onClick={() => handleNav('privacy')} className="hover:text-orange-400 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button type="button" onClick={() => handleNav('terms')} className="hover:text-orange-400 transition-colors cursor-pointer">
              Terms of Service
            </button>
            <button type="button" onClick={() => handleNav('faq')} className="hover:text-slate-200 transition-colors cursor-pointer">
              FAQs
            </button>
            <button type="button" onClick={() => handleNav('contact')} className="hover:text-slate-200 transition-colors cursor-pointer">
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
