import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Sparkles, 
  Globe2, 
  ShieldCheck,
  Calendar,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import { Language } from '../types';
import { saveContactMessageToFirestore } from '../firebase';

interface ContactPageProps {
  lang: Language;
  onOpenRegister: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang, onOpenRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    try {
      await saveContactMessageToFirestore({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        language: lang
      });
    } catch (error) {
      console.error('Error saving contact form to Firestore:', error);
    }

    try {
      await emailjs.send(
        'service_zn1yk0i',
        'template_8tx4gz6',
        {
          name: formData.name.trim(),
          to_name: formData.name.trim(),
          email: formData.email.trim() || 'gaanisaxardiid1@gmail.com',
          to_email: formData.email.trim() || 'gaanisaxardiid1@gmail.com',
          phone: formData.phone.trim(),
          subject: formData.subject.trim() || 'Farriin Xiriir Ah',
          message: formData.message.trim()
        },
        'DqlTY31s8OKcyf-gi'
      );
    } catch (e) {
      console.warn('Contact emailjs send:', e);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div id="contact-page" className="py-16 bg-slate-50 dark:bg-[#070E18] min-h-[80vh] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] dark:bg-[#0E1A2C] text-white text-xs font-black uppercase tracking-wider border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Nala Soo Xiriir (24/7 Diyaar)' : 'Contact Us (24/7 Support)'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B192C] dark:text-white tracking-tight">
            {lang === 'so' ? (
              <>
                Nagala Soo Xiriir <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">WhatsApp & Email</span>
              </>
            ) : (
              <>
                Get in Touch with <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Our Support Team</span>
              </>
            )}
          </h1>

          <p className="text-base text-slate-700 dark:text-slate-300 font-medium">
            {lang === 'so'
              ? 'Waxaan u adeegnaa ardayda iyo qoysaska ku nool aduunka oo dhan (UK, USA, Canada, Yurub, Bariga Dhexe, Afrika, Australia). Kooxdayada taageerada ayaa diyaar u ah inay kaa caawiso diiwaangelinta, jadwalka, iyo macallimiinta.'
              : 'Serving Quran learners worldwide with 24/7 dedicated parent and student support across all international time zones.'}
          </p>
        </div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Highlight Box */}
            <div className="bg-[#0B192C] dark:bg-[#0E1A2C] text-white rounded-3xl p-7 shadow-xl border-2 border-orange-500/40 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">
                    {lang === 'so' ? 'WhatsApp Toos ah (Xiriirka Degdegga ah)' : 'Direct WhatsApp Support'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    {lang === 'so' 
                      ? 'Nagala hadal WhatsApp si aad isla markiiba u hesho macallin iyo waqti ku habboon ilmahaaga.'
                      : 'Chat directly with our academic coordinators for instant schedule pairing and onboarding.'}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="https://wa.me/251777796444?text=Asc%20Baro%20Quran%20Academy%2C%20waxaan%20doonayaa%20in%20aan%20ilmaheyga%20diiwaangeliyo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black text-sm shadow-lg shadow-orange-500/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>+251 77 779 6444</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email & Details Card */}
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-7 border-2 border-slate-200 dark:border-slate-700/80 shadow-sm space-y-5">
              
              <div className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {lang === 'so' ? 'Iimaylka Rasmiga ah' : 'Official Email'}
                  </span>
                  <a 
                    href="mailto:baroquranacademy1@gmail.com" 
                    className="text-sm font-black text-[#0B192C] dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    baroquranacademy1@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {lang === 'so' ? 'Saacadaha Shaqada' : 'Service Hours'}
                  </span>
                  <p className="text-sm font-bold text-[#0B192C] dark:text-white">
                    {lang === 'so' ? '24 Saac / 7 Maalmood (Aduunka Dhan)' : '24/7 Global Flexible Scheduling'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {lang === 'so' ? 'Ardayda Wax Ka Barata' : 'Global Student Base'}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    UK, USA, Canada, Sweden, Norway, Germany, Netherlands, UAE, Saudi Arabia, Somalia, Australia & Worldwide.
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Free Trial Booking Box */}
            <div className="bg-orange-50 dark:bg-orange-950/30 rounded-3xl p-6 border-2 border-orange-200 dark:border-orange-900/50 text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-orange-500 mx-auto" />
              <h4 className="text-base font-black text-[#0B192C] dark:text-white">
                {lang === 'so' ? 'Ma rabtaa fasal tijaabo ah oo degdeg ah?' : 'Want to book a free evaluation class immediately?'}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                {lang === 'so' 
                  ? 'Foomka diiwaangelinta wuxuu qaadanayaa 1 daqiiqo oo kaliya.' 
                  : 'Complete our interactive registration wizard in under 60 seconds.'}
              </p>
              <button
                onClick={onOpenRegister}
                className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black text-sm shadow-md transition-all cursor-pointer"
              >
                {lang === 'so' ? 'Fur Foomka Is-diiwaangelinta' : 'Open Registration Wizard'}
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Support & Inquiry Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-8 sm:p-10 border-2 border-slate-200 dark:border-slate-700/80 shadow-xl">
              
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-[#0B192C] dark:text-white">
                  {lang === 'so' ? 'Noo Soo Dir Farriin / Su’aal' : 'Send Us an Inquiry / Message'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  {lang === 'so' 
                    ? 'Buuxi xogta hoose si aan kuugula soo xiriirno WhatsApp ama Iimayl.' 
                    : 'Fill in your details below and our team will get back to you immediately.'}
                </p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-700 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-emerald-950 dark:text-emerald-200">
                      {lang === 'so' ? 'Farriintaada Waannu Helnay!' : 'Message Received Successfully!'}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 mt-1 font-medium">
                      {lang === 'so'
                        ? 'Waad ku mahadsan tahay nala soo xiriirkaaga. Maamulka Baro Quran Academy ayaa kuugu soo jawaabi doona WhatsApp / Iimayl muddo daqiiqado ah gudahood.'
                        : 'Thank you for reaching out. An academic coordinator will contact you shortly via WhatsApp / Email.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-black hover:bg-emerald-800 transition-colors cursor-pointer"
                  >
                    {lang === 'so' ? 'Soo Dir Farriin Kale' : 'Send Another Message'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        {lang === 'so' ? 'Magacaaga oo Buuxa *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === 'so' ? 'Tusaale: Axmed Cabdi' : 'e.g. Ahmed Ali'}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm font-medium outline-none bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        {lang === 'so' ? 'Taleefan / WhatsApp *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 7123 456789 / +1..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm font-medium outline-none bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        {lang === 'so' ? 'Iimaylkaaga (Email)' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="parent@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm font-medium outline-none bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        {lang === 'so' ? 'Mowduuca / Ujeedada' : 'Subject'}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={lang === 'so' ? 'Su’aal ku saabsan Fasallada' : 'Question about Classes'}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm font-medium outline-none bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      {lang === 'so' ? 'Farriintaada ama Su’aashaada *' : 'Your Message / Inquiry *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'so' ? 'Qor waxa aad jeclaan lahayd in lagugu caawiyo...' : 'Tell us how we can help you or your child...'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm font-medium outline-none bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black text-base shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    <span>
                      {isSubmitting 
                        ? (lang === 'so' ? 'Waa la dirayaa...' : 'Sending...') 
                        : (lang === 'so' ? 'Soo Dir Farriinta Hadda' : 'Submit Message Now')}
                    </span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 font-medium pt-1">
                    {lang === 'so' 
                      ? 'Xogtaadu waa mid ammaan ah. Waxaan kula soo xiriirnaa isla maalintaas.' 
                      : 'Your information is private and secure. We reply within minutes.'}
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
