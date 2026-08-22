import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  MessageCircle, 
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Globe,
  Clock,
  BookOpen,
  Plus,
  Trash2,
  Check,
  Edit2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';
import { COURSES_DATA, PRICING_PLANS } from '../data/academyData';

interface StudentInfo {
  id: string;
  fullName: string;
  age: string;
  gender: 'male' | 'female';
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedCourseId?: string;
  preselectedPlanId?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  lang,
  preselectedCourseId,
  preselectedPlanId
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Step 1: Personal Information
  const [students, setStudents] = useState<StudentInfo[]>([
    { id: '1', fullName: '', age: '8', gender: 'male' }
  ]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [city, setCity] = useState('');

  // Step 2: Choice Course & Plan
  const [selectedCourseId, setSelectedCourseId] = useState<string>(preselectedCourseId || 'qaacida-nuuraaniya');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(preselectedPlanId || 'intensive-5days');
  const [teacherPreference, setTeacherPreference] = useState<'male' | 'female' | 'any'>('any');

  // Step 3: Choice Days & Time
  const [preferredDays, setPreferredDays] = useState<string[]>(['Monday', 'Wednesday', 'Friday']);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<string>('Fiidkii / Evening (5:00 PM - 9:00 PM)');

  // Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedCourseId) {
      setSelectedCourseId(preselectedCourseId);
    }
    if (preselectedPlanId) {
      setSelectedPlanId(preselectedPlanId);
    }
  }, [preselectedCourseId, preselectedPlanId]);

  if (!isOpen) return null;

  // Student list helpers
  const handleAddStudent = () => {
    setStudents(prev => [
      ...prev,
      { id: String(Date.now()), fullName: '', age: '8', gender: 'male' }
    ]);
  };

  const handleRemoveStudent = (id: string) => {
    if (students.length > 1) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleUpdateStudent = (id: string, field: keyof StudentInfo, value: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Day toggle helper
  const handleDayToggle = (day: string) => {
    if (preferredDays.includes(day)) {
      if (preferredDays.length > 1) {
        setPreferredDays(preferredDays.filter(d => d !== day));
      }
    } else {
      setPreferredDays([...preferredDays, day]);
    }
  };

  const daysList = [
    { key: 'Monday', labelSo: 'Isniin (Mon)', labelEn: 'Monday' },
    { key: 'Tuesday', labelSo: 'Talaado (Tue)', labelEn: 'Tuesday' },
    { key: 'Wednesday', labelSo: 'Arbaco (Wed)', labelEn: 'Wednesday' },
    { key: 'Thursday', labelSo: 'Khamiis (Thu)', labelEn: 'Thursday' },
    { key: 'Friday', labelSo: 'Jimco (Fri)', labelEn: 'Friday' },
    { key: 'Saturday', labelSo: 'Sabti (Sat)', labelEn: 'Saturday' },
    { key: 'Sunday', labelSo: 'Axad (Sun)', labelEn: 'Sunday' }
  ];

  // Validation per step
  const validateStep1 = () => {
    const validStudents = students.every(s => s.fullName.trim().length > 0);
    if (!validStudents) {
      alert(lang === 'so' ? 'Fadlan qor magaca ardayga/ardayda oo dhammaystiran.' : 'Please enter the full name for all students.');
      return false;
    }
    if (!phone.trim()) {
      alert(lang === 'so' ? 'Fadlan gali lambarkaaga WhatsApp oo wata country code.' : 'Please enter your WhatsApp phone number with country code.');
      return false;
    }
    if (!email.trim()) {
      alert(lang === 'so' ? 'Fadlan gali email-kaaga.' : 'Please enter your email address.');
      return false;
    }
    if (!city.trim()) {
      alert(lang === 'so' ? 'Fadlan qor magaalada aad ku nooshahay.' : 'Please enter your city.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }
    }, 600);
  };

  const selectedCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];
  const selectedPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[2];

  const getWhatsAppMessage = () => {
    const studentsSummary = students.map((s, idx) => 
      `  Ardayga ${idx + 1}: ${s.fullName} (${s.age} jir, ${s.gender === 'male' ? 'Wiil' : 'Gabadh'})`
    ).join('\n');

    const text = `Asc Baro Quran Academy! Waxaan soo buuxiyay foomka isqorista:

📋 XOGTA ARDAYDA (${students.length} Arday):
${studentsSummary}

📱 WhatsApp: ${phone}
📧 Email: ${email}
🌍 Waddanka & Magaalada: ${country}, ${city}

📚 Koorsada la doortay: ${selectedCourse.titleSo}
⭐ Xirmada la doortay: ${selectedPlan.nameSo} ($${selectedPlan.priceUSD}/Bishii)
👨‍🏫 Macallinka: ${teacherPreference === 'male' ? 'Rag' : teacherPreference === 'female' ? 'Dheddig' : 'Midkoodna'}
🗓️ Maalmaha: ${preferredDays.join(', ')}
⏰ Waqtiga: ${preferredTimeSlot}

Fadlan nala soo xiriira si aan u bilowno fasalka tijaabada ah ee bilaashka ah. Mahadsanidiin!`;

    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="registration-modal-content"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6"
      >
        
        {/* Modal Header */}
        <div className="bg-[#0B192C] text-white p-5 sm:p-7 relative border-b-2 border-orange-500/30">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-black text-orange-400 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-orange-400" />
                <span>{lang === 'so' ? 'Fasalka Tijaabada oo Bilaash ah' : '100% Free Trial Booking'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'so' ? 'Isqorista & Diiwaangelinta Ardayga' : 'Student Registration & Booking'}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Indicator Bar */}
          {!isSubmitted && (
            <div className="mt-5 grid grid-cols-4 gap-2 pt-3 border-t border-white/10 text-xs">
              {[
                { step: 1, labelSo: '1. Personal Info', labelEn: '1. Personal Info' },
                { step: 2, labelSo: '2. Choice Course', labelEn: '2. Course & Plan' },
                { step: 3, labelSo: '3. Days & Time', labelEn: '3. Days & Time' },
                { step: 4, labelSo: '4. Review & Submit', labelEn: '4. Review & Submit' }
              ].map((s) => {
                const isActive = currentStep === s.step;
                const isPassed = currentStep > s.step;

                return (
                  <div 
                    key={s.step} 
                    className={`flex flex-col items-center text-center transition-all ${
                      isActive ? 'text-orange-400 font-black' : isPassed ? 'text-emerald-400 font-bold' : 'text-slate-400 font-medium'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1 font-black ${
                      isActive 
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/50' 
                        : isPassed 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white/10 text-slate-400'
                    }`}>
                      {isPassed ? <Check className="w-3.5 h-3.5" /> : s.step}
                    </div>
                    <span className="hidden sm:inline text-[11px] leading-tight">
                      {lang === 'so' ? s.labelSo : s.labelEn}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto">
          
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-black text-[#0B192C]">
                  {lang === 'so' ? 'Hambalyo! Diiwaangelintu Way Guuleysatay' : 'Alhamdulillah! Registration Successful'}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
                  {lang === 'so'
                    ? `Waad ku mahadsan tahay. Kooxdayada maamulka ayaa 15 daqiiqo gudahood kula soo xiriiraysa WhatsApp (${phone}) si laguugu xiro macallinka fasalka tijaabada ah.`
                    : `Thank you. Our academic coordinator will contact you shortly on WhatsApp (${phone}) to schedule your free trial session.`}
                </p>
              </div>

              {/* Direct WhatsApp Instant Opener */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/251777796444?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'so' ? 'Toos ugu Dir Xogtaada WhatsApp (+251 77 779 6444)' : 'Send Registration to WhatsApp'}</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm"
                >
                  {lang === 'so' ? 'Xir Daaqadda' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              
              {/* STEP 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Students list */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        {lang === 'so' ? '1. Magaca Saddexan ee Ardayga (1 ama Ka badan):' : '1. Student Full Name (1 or More):'}
                      </label>
                      <button
                        type="button"
                        onClick={handleAddStudent}
                        className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'so' ? 'Kudar Arday Kale (+)' : 'Add More Students (+)'}</span>
                      </button>
                    </div>

                    {students.map((student, idx) => (
                      <div 
                        key={student.id} 
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-700">
                            {lang === 'so' ? `Ardayga #${idx + 1}` : `Student #${idx + 1}`}
                          </span>
                          {students.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveStudent(student.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{lang === 'so' ? 'Tirtir' : 'Remove'}</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          {/* Full Name */}
                          <div className="sm:col-span-6">
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              {lang === 'so' ? 'Magaca Saddexan *' : 'Full Name *'}
                            </label>
                            <div className="relative">
                              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                required
                                placeholder={lang === 'so' ? 'Tusaale: Maxamed Cali Cabdi' : 'e.g. Mohamed Ali Abdi'}
                                value={student.fullName}
                                onChange={(e) => handleUpdateStudent(student.id, 'fullName', e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white font-medium"
                              />
                            </div>
                          </div>

                          {/* Age */}
                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              {lang === 'so' ? 'Da’da (Age) *' : 'Age *'}
                            </label>
                            <select
                              value={student.age}
                              onChange={(e) => handleUpdateStudent(student.id, 'age', e.target.value)}
                              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white font-medium"
                            >
                              {[...Array(60)].map((_, i) => (
                                <option key={i + 4} value={String(i + 4)}>
                                  {i + 4} {lang === 'so' ? 'Jir' : 'yrs'}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Gender */}
                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              {lang === 'so' ? 'Jinsiga *' : 'Gender *'}
                            </label>
                            <select
                              value={student.gender}
                              onChange={(e) => handleUpdateStudent(student.id, 'gender', e.target.value as any)}
                              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white font-medium"
                            >
                              <option value="male">{lang === 'so' ? 'Wiil (Male)' : 'Male'}</option>
                              <option value="female">{lang === 'so' ? 'Gabadh (Female)' : 'Female'}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contact details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* WhatsApp with Country Code */}
                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                        {lang === 'so' ? 'WhatsApp Number (With Country Code) *' : 'WhatsApp Number (With Country Code) *'}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="+44 7123 456789 / +1 612..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                        {lang === 'so' ? 'Email Address *' : 'Email Address *'}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="waalid@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Country & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                        {lang === 'so' ? 'Country (Waddanka) *' : 'Country *'}
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                        >
                          <option value="United Kingdom">United Kingdom (UK)</option>
                          <option value="United States">United States (USA)</option>
                          <option value="Canada">Canada</option>
                          <option value="Sweden">Sweden (Iswiidhan)</option>
                          <option value="Norway">Norway</option>
                          <option value="Germany">Germany</option>
                          <option value="Finland">Finland</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Somalia">Somalia (Soomaaliya)</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Kenya">Kenya</option>
                          <option value="United Arab Emirates">United Arab Emirates (Dubai)</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Australia">Australia</option>
                          <option value="Other">Waddan Kale / Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                        {lang === 'so' ? 'City (Magaalada) *' : 'City (Write City) *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'so' ? 'Tusaale: London, Minneapolis, Toronto...' : 'e.g. London, Minneapolis, Toronto...'}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 2: Choice Course & Plan */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Select Course */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                      {lang === 'so' ? '1. Dooro Koorsada (Choice Course) *' : '1. Select Course *'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {COURSES_DATA.map((course) => {
                        const isSelected = selectedCourseId === course.id;
                        return (
                          <div
                            key={course.id}
                            onClick={() => setSelectedCourseId(course.id)}
                            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="text-xs font-black text-[#0B192C]">
                                {lang === 'so' ? course.titleSo : course.titleEn}
                              </span>
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                                  <Check className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium block mt-1">
                              {lang === 'so' ? course.levelSo : course.levelEn}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Select Pricing Plan */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                      {lang === 'so' ? '2. Dooro Xirmada Todobaadlaha ah (Pricing Plan) *' : '2. Select Weekly Schedule Plan *'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PRICING_PLANS.map((plan) => {
                        const isSelected = selectedPlanId === plan.id;
                        return (
                          <div
                            key={plan.id}
                            onClick={() => setSelectedPlanId(plan.id)}
                            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all text-center relative ${
                              isSelected
                                ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            {plan.popular && (
                              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-orange-500 text-white text-[9px] font-black uppercase">
                                {lang === 'so' ? 'Caansan' : 'Popular'}
                              </div>
                            )}
                            <div className="text-xs font-black text-[#0B192C]">
                              {lang === 'so' ? plan.nameSo : plan.nameEn}
                            </div>
                            <div className="text-lg font-black text-orange-600 mt-1">
                              ${plan.priceUSD} <span className="text-[10px] text-slate-500 font-normal">/mo</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                              {lang === 'so' ? plan.durationPerClassSo : plan.durationPerClassEn}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Teacher Gender Preference */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                      {lang === 'so' ? '3. Nooca Macallinka (Teacher Preference):' : '3. Teacher Preference:'}
                    </label>
                    <select
                      value={teacherPreference}
                      onChange={(e) => setTeacherPreference(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                    >
                      <option value="any">{lang === 'so' ? 'Midkoodna (Lab ama Dheddig)' : 'Any (Male or Female)'}</option>
                      <option value="male">{lang === 'so' ? 'Macallin Rag ah (Male Teacher)' : 'Male Teacher'}</option>
                      <option value="female">{lang === 'so' ? 'Macallimad Haween ah (Female Teacher)' : 'Female Teacher'}</option>
                    </select>
                  </div>

                </div>
              )}

              {/* STEP 3: Choice Days & Time */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Preferred Days */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                      {lang === 'so' ? '1. Dooro Maalmaha aad Jeceshahay (Choice Days) *' : '1. Select Preferred Days of Week *'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {daysList.map((day) => {
                        const isSelected = preferredDays.includes(day.key);
                        return (
                          <button
                            type="button"
                            key={day.key}
                            onClick={() => handleDayToggle(day.key)}
                            className={`p-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <span>{lang === 'so' ? day.labelSo : day.labelEn}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                      {lang === 'so' ? '2. Dooro Saacadaha kugu habboon (Choice Time Slot) *' : '2. Select Preferred Daily Time Slot *'}
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={preferredTimeSlot}
                        onChange={(e) => setPreferredTimeSlot(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-medium"
                      >
                        <option value="Subaxdii / Morning (8:00 AM - 12:00 PM)">{lang === 'so' ? 'Subaxdii (8:00 AM - 12:00 PM)' : 'Morning (8:00 AM - 12:00 PM)'}</option>
                        <option value="Galabtii / Afternoon (1:00 PM - 5:00 PM)">{lang === 'so' ? 'Galabtii (1:00 PM - 5:00 PM)' : 'Afternoon (1:00 PM - 5:00 PM)'}</option>
                        <option value="Fiidkii / Evening (5:00 PM - 9:00 PM)">{lang === 'so' ? 'Fiidkii / Habeenkii (5:00 PM - 9:00 PM)' : 'Evening (5:00 PM - 9:00 PM)'}</option>
                        <option value="Waqti Dabacsan / Flexible Time">{lang === 'so' ? 'Waqti kale oo gooni ah (Flexible Time)' : 'Custom Flexible Slot'}</option>
                      </select>
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 4: Review, Edit & Submit */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  
                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200">
                    <div className="text-xs font-black text-orange-900 uppercase tracking-wider mb-1">
                      {lang === 'so' ? 'Fadlan dib u eeg xogtaada ka hor inta aadan dirin' : 'Please review your registration details before submitting'}
                    </div>
                    <p className="text-xs text-orange-700">
                      {lang === 'so' ? 'Waxaad riixi kartaa badhanka dib-u-habaynta (Edit) si aad u saxdo tallaabo kasta.' : 'You can click any Edit button to adjust information.'}
                    </p>
                  </div>

                  {/* Review Box 1: Personal Info */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-black text-[#0B192C] uppercase tracking-wider">
                        {lang === 'so' ? '1. Xogta Ardayda & Xiriirka' : '1. Personal Information'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>{lang === 'so' ? 'Edit' : 'Edit'}</span>
                      </button>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-700">
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Ardayda:' : 'Students:'}</span>{' '}
                        {students.map(s => `${s.fullName} (${s.age} jir, ${s.gender === 'male' ? 'Wiil' : 'Gabadh'})`).join(' • ')}
                      </div>
                      <div>
                        <span className="font-bold">WhatsApp:</span> {phone}
                      </div>
                      <div>
                        <span className="font-bold">Email:</span> {email}
                      </div>
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Goobta:' : 'Location:'}</span> {country}, {city}
                      </div>
                    </div>
                  </div>

                  {/* Review Box 2: Course & Plan */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-black text-[#0B192C] uppercase tracking-wider">
                        {lang === 'so' ? '2. Koorsada & Xirmada' : '2. Course & Plan'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>{lang === 'so' ? 'Edit' : 'Edit'}</span>
                      </button>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-700">
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Koorsada:' : 'Course:'}</span>{' '}
                        {lang === 'so' ? selectedCourse.titleSo : selectedCourse.titleEn}
                      </div>
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Xirmada:' : 'Plan:'}</span>{' '}
                        {lang === 'so' ? selectedPlan.nameSo : selectedPlan.nameEn} (${selectedPlan.priceUSD}/Bishii)
                      </div>
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Macallinka:' : 'Teacher:'}</span>{' '}
                        {teacherPreference === 'male' ? 'Male' : teacherPreference === 'female' ? 'Female' : 'Any'}
                      </div>
                    </div>
                  </div>

                  {/* Review Box 3: Days & Time */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-black text-[#0B192C] uppercase tracking-wider">
                        {lang === 'so' ? '3. Maalmaha & Waqtiga' : '3. Days & Time'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>{lang === 'so' ? 'Edit' : 'Edit'}</span>
                      </button>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-700">
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Maalmaha:' : 'Days:'}</span>{' '}
                        {preferredDays.join(', ')}
                      </div>
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Waqtiga:' : 'Time Slot:'}</span>{' '}
                        {preferredTimeSlot}
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Nav buttons */}
              <div className="pt-6 flex items-center justify-between gap-3 border-t border-slate-100 mt-6">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{lang === 'so' ? 'Dib u Noqo' : 'Back'}</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-7 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black rounded-xl shadow-md shadow-orange-500/30 text-sm flex items-center gap-2 transition-all"
                  >
                    <span>{lang === 'so' ? 'Talaabada Xigta' : 'Next Step'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black rounded-xl shadow-lg shadow-orange-500/30 text-sm flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <span>
                      {isSubmitting 
                        ? (lang === 'so' ? 'Waa la dirayaa...' : 'Submitting...') 
                        : (lang === 'so' ? 'Xaqiiji & Gudbi Foomka' : 'Submit & Book Free Trial')}
                    </span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
