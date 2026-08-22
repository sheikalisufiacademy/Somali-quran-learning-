import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  CheckCircle2, 
  UserCheck, 
  Clock, 
  HelpCircle, 
  Sparkles,
  ArrowLeft,
  Mail,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, AppPage } from '../types';

interface PolicyTermsProps {
  lang: Language;
  type: 'privacy' | 'terms';
  onNavigateHome: () => void;
}

export const PolicyTermsPages: React.FC<PolicyTermsProps> = ({ lang, type, onNavigateHome }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-xl bg-white border border-slate-200 text-[#0B192C] text-xs font-black hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-orange-500" />
          <span>{lang === 'so' ? 'Ku noqo Bogga Hore (Home)' : 'Back to Home'}</span>
        </button>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-xl space-y-8"
        >
          
          {/* Header */}
          <div className="border-b border-slate-100 pb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B192C] text-white text-xs font-black uppercase tracking-wider">
              {isPrivacy ? <Lock className="w-3.5 h-3.5 text-orange-400" /> : <FileText className="w-3.5 h-3.5 text-orange-400" />}
              <span>{isPrivacy ? (lang === 'so' ? 'Ilaalinta Xogta & Qarsoodiga' : 'Privacy & Security') : (lang === 'so' ? 'Shuruudaha Adeegga' : 'Terms of Service')}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B192C]">
              {isPrivacy ? (
                lang === 'so' ? 'Shuruucda Ilaalinta Xogta & Qarsoodiga (Privacy Policy)' : 'Privacy Policy & Student Data Protection'
              ) : (
                lang === 'so' ? 'Shuruudaha & Xeerarka Adeegga (Terms of Service)' : 'Terms of Service & Academy Guidelines'
              )}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              {lang === 'so' ? 'La cusbooneysiiyay: Febraayo 2026 | Baro Quran Academy' : 'Last Updated: February 2026 | Baro Quran Academy'}
            </p>
          </div>

          {/* Content Body */}
          {isPrivacy ? (
            <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-medium">
              
              <section className="space-y-2">
                <h3 className="text-base font-black text-[#0B192C] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                  <span>{lang === 'so' ? '1. Ballanqaadka Ilaalinta Xogta Carruurta & Qoyska' : '1. Commitment to Family & Child Data Privacy'}</span>
                </h3>
                <p>
                  {lang === 'so' 
                    ? 'Baro Quran Academy waxay si buuxda ugu heellan tahay ilaalinta xogta gaarka ah ee ardayda iyo waalidiinta. Xogtaada (magaca, da’da, taleefanka, iimaylka, iyo heerka waxbarashada) waxaa loo isticmaalaa oo kaliya qabanqaabinta fasallada, jadwalka macallimiinta, iyo la-socodka horumarka ardayga.'
                    : 'Baro Quran Academy is deeply committed to protecting the privacy and confidentiality of our students and families. Personal information collected is strictly used for lesson scheduling, teacher allocation, and learning progress monitoring.'}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-black text-[#0B192C] flex items-center gap-2">
                  <Lock className="w-5 h-5 text-orange-500" />
                  <span>{lang === 'so' ? '2. Ammaanka Fasallada Tooska ah (Live Zoom / Teams / Meet)' : '2. Secure & Monitored Virtual Classrooms'}</span>
                </h3>
                <p>
                  {lang === 'so'
                    ? 'Fasallada tooska ah ee 1-on-1 waxaa lagu qabtaa qolal xiran oo ammaan ah. Wax duubitaan ah (recording) lama sameeyo fasalka dhexdiisa fasax la’aan waalidka, waxaana la dhowraa anshaxa iyo shareecada Islaamka.'
                    : 'All 1-on-1 virtual sessions take place in password-protected, encrypted virtual classrooms. Sessions are safe, respectful, and adhere strictly to child safeguarding guidelines.'}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-black text-[#0B192C] flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-orange-500" />
                  <span>{lang === 'so' ? '3. Xogta Lama Wadaago Cid Kale' : '3. Zero Third-Party Data Sharing'}</span>
                </h3>
                <p>
                  {lang === 'so'
                    ? 'Marnaba xogtaada lagama iibinayo mana lala wadaagayo shirkado kale ama hay’ado suuqgeyn. Waxay ku kaydsan tahay nidaam ammaan ah oo sir ah.'
                    : 'We never sell, rent, or trade student or parent information to third-party marketing entities under any circumstances.'}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-black text-[#0B192C] flex items-center gap-2">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <span>{lang === 'so' ? '4. Xuquuqdaada & La Xiriirka' : '4. Your Rights & Privacy Inquiries'}</span>
                </h3>
                <p>
                  {lang === 'so'
                    ? 'Waalidku wuxuu xaq u leeyahay inuu mar kasta nala soo xiriiro si uu u beddelo xogta, u codsado tirtiris, ama u helo warbixin ku saabsan xogtiisa isagoo u soo diraya iimayl: baroquranacademy1@gmail.com ama WhatsApp.'
                    : 'Parents retain the right to update, review, or delete their profile information at any time by contacting baroquranacademy1@gmail.com or via WhatsApp.'}
                </p>
              </section>

            </div>
          ) : (
            <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-medium">
              
              <section className="space-y-2">
                <h3 className="text-base font-black text-[#0B192C] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  <span>{lang === 'so' ? '1. Fasalka Tijaabada ah (Free Trial Policy)' : '1. Free Evaluation Class Policy'}</span>
                </h3>
                <p>
                  {lang === 'so'
                    ? 'Arday kasta oo cusub wuxuu xaq u leeyahay fasal tijaabo ah oo 100% bilaash ah. Ma jirto wax lacag hormaris ah ama kaar bangi oo loo baahan yahay si loo qaato fasalka tijaabada.'
                    : 'Every new student is entitled to a 100% free trial assessment class with no payment card or advance commitment required.'}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-black text-[#0B192C] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>{lang === 'so' ? '2. Ka-qaybgalka Fasallada & Beddelka Saacadaha (Rescheduling)' : '2. Attendance & Class Rescheduling'}</span>
                </h3>
                <p>
                  {lang === 'so'
                    ? 'Haddii ardaygu uusan awoodin inuu yimaado fasal sababo jira awgood, waalidka waxaa laga codsanayaa inuu macallinka ama maamulka la socodsiiyo ugu yaraan 2-4 saacadood ka hor si loogu wareejiyo waqti kale oo ku habboon (Make-up class).'
                    : 'If a student cannot attend a scheduled session, parents are requested to notify the coordinator or teacher at least 2-4 hours in advance to arrange a make-up class.'}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-black text-[#0B192C] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                  <span>{lang === 'so' ? '3. Lacag-bixinta & Joojinta (Subscription & Cancellation)' : '3. Monthly Subscriptions & Easy Cancellation'}</span>
                </h3>
                <p>
                  {lang === 'so'
                    ? 'Koorsooyinka waxaa loo bixiyaa bil kasta (Monthly Subscription). Waalidku wuxuu xaq u leeyahay inuu joojiyo ama beddelo xirmadiisa wakhti kasta iyada oo aan wax ganaax ah laga qaadayn.'
                    : 'Tuition fees are structured on a straightforward monthly basis. Families may cancel, pause, or switch subscription plans at any time with no lock-in contracts.'}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-black text-[#0B192C] flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-orange-500" />
                  <span>{lang === 'so' ? '4. Anshaxa & Tayada Waxbarashada' : '4. Academic Excellence & Code of Conduct'}</span>
                </h3>
                <p>
                  {lang === 'so'
                    ? 'Macallimiinta Baro Quran Academy waxay leeyihiin shahaadooyin ijaazo iyo tababar xirfadeed oo sare. Waxaan hubinaa jawi waxbarasho oo dhiirrigelin, jacayl, iyo ixtiraam ku dhisan.'
                    : 'Our certified teachers maintain the highest standards of Islamic pedagogy, patience, and positive reinforcement to ensure every student feels engaged and inspired.'}
                </p>
              </section>

            </div>
          )}

          {/* Contact helpfooter inside page */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl">
            <div className="space-y-0.5 text-center sm:text-left">
              <h4 className="text-xs font-black text-[#0B192C] uppercase tracking-wider">
                {lang === 'so' ? 'Miyaad qabtaa su’aal sharci ama qarsoodi ah?' : 'Have Questions About Our Policies?'}
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                {lang === 'so' ? 'Nala soo xiriir 24/7 WhatsApp: +251 77 779 6444' : 'Reach our advisory desk anytime on WhatsApp'}
              </p>
            </div>

            <a
              href="https://wa.me/251777796444"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs shadow-md transition-all shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: +251 77 779 6444</span>
            </a>
          </div>

        </motion.div>

      </div>
    </div>
  );
};
