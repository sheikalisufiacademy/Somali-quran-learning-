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
  Globe2
} from 'lucide-react';
import { Language, AppPage } from '../types';
import { LogoBadge } from './LogoBadge';

interface FooterProps {
  lang: Language;
  onOpenRegister: (courseId?: string) => void;
  onNavigate?: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenRegister, onNavigate }) => {
  const handleNav = (page: AppPage) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#0B192C] text-slate-300 relative overflow-hidden pt-16 pb-12 border-t-2 border-orange-500/20">
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5 pattern-dots-navy pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Call to Action in Footer */}
        <div className="mb-14 pb-12 border-b border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {lang === 'so'
                ? 'Bilow Safarka Barashada Qur’aanka ee Ilmahaaga Maanta'
                : 'Start Your Child’s Quranic Journey Today'}
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl font-medium">
              {lang === 'so'
                ? 'Ku biir boqolaal qoys oo ku nool aduunka oo dhan oo u doortay Baro Quran Academy carruurtooda.'
                : 'Join hundreds of satisfied families worldwide who entrust their children\'s Quran education to Baro Quran Academy.'}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-3.5 text-center text-sm font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
            >
              {lang === 'so' ? 'Qaado Fasal Tijaabo ah (Bilaash)' : 'Book Free Trial Class'}
            </button>
            <a
              href="https://wa.me/251777796444"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 text-center text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-orange-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Main Footer 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <LogoBadge size="md" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white">
                    BARO QURAN
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white rounded-md">
                    ACADEMY
                  </span>
                </div>
                <span className="text-xs text-emerald-400 font-arabic">
                  {lang === 'so' ? 'Akadeemiyada Barashada Qur’aanka' : 'Online Quran & Islamic Academy'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {lang === 'so'
                ? 'Akadeemiyada Caalamiga ah ee barashada Qur’aanka Kariimka, higaada, tajwiidka suubban, xifdiga, iyo culuumta Islaamka oo 1-on-1 ah loogu talagalay ardayda iyo qoysaska aduunka oo dhan.'
                : 'Premier online academy providing 1-on-1 personalized Quran memorization, Noorani Qaida, applied Tajweed, and Islamic studies to students worldwide.'}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>{lang === 'so' ? '100% Macallimiin Ijaazo Leh & Ammaan ah' : '100% Verified Teachers & Safe Environment'}</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {lang === 'so' ? 'Bogagga Muhiimka ah' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? 'Bogga Hore (Home)' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('courses')} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? 'Koorsooyinka' : 'Courses & Syllabus'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('why-us')} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? 'Maxaad Noo Dooranaysaa?' : 'Why Choose Us'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? 'Qiimaha & Xirmooyinka' : 'Pricing Plans'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('reviews')} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? 'Aragtida Waalidiinta' : 'Parent Reviews'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? 'Su’aalaha (FAQ)' : 'FAQs'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? 'Qarsoodiga (Privacy Policy)' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? 'Shuruudaha (Terms of Service)' : 'Terms of Service'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? 'Nala Xiriir' : 'Contact Us'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Courses List (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {lang === 'so' ? 'Koorsooyinka Aan Bixinno' : 'Our Programs'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => { handleNav('courses'); onOpenRegister('qaacida-nuuraaniya'); }} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? '• Qaacidada Nuuraaniyada' : '• Noorani Qaida for Beginners'}
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('courses'); onOpenRegister('tajweed-recitation'); }} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? '• Tajwiidka Saxda ah & Akhriska' : '• Tajweed Mastery & Recitation'}
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('courses'); onOpenRegister('quran-memorization-hifz'); }} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? '• Xifdinta Qur’aanka Kariimka' : '• Full Quran Memorization (Hifz)'}
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('courses'); onOpenRegister('islamic-studies-tarbiyah'); }} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? '• Culuumta Diinta & Tarbiyada' : '• Islamic Studies & Tarbiyah'}
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('courses'); onOpenRegister('arabic-language'); }} className="hover:text-orange-400 transition-colors text-left cursor-pointer">
                  {lang === 'so' ? '• Luuqadda Carabiga' : '• Arabic Language for Kids/Adults'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Schedule (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {lang === 'so' ? 'Xafiiska & Xiriirka' : 'Contact & Schedule'}
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

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{lang === 'so' ? 'Fasallada: 24/7 (Dhammaan Saacadaha)' : 'Classes: 24/7 Global Hours'}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{lang === 'so' ? 'Aduunka Dhan (Worldwide)' : 'Students in 25+ Countries'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Baro Quran Academy. Dhammaan xuquuqda way dhowran tahay.</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <button onClick={() => handleNav('privacy')} className="hover:text-orange-400 transition-colors cursor-pointer">
              {lang === 'so' ? 'Qarsoodiga (Privacy Policy)' : 'Privacy Policy'}
            </button>
            <button onClick={() => handleNav('terms')} className="hover:text-orange-400 transition-colors cursor-pointer">
              {lang === 'so' ? 'Shuruudaha (Terms of Service)' : 'Terms of Service'}
            </button>
            <button onClick={() => handleNav('faq')} className="hover:text-slate-200 transition-colors cursor-pointer">
              {lang === 'so' ? 'Su’aalaha' : 'FAQs'}
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-slate-200 transition-colors cursor-pointer">
              {lang === 'so' ? 'Xiriirka' : 'Contact Support'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
