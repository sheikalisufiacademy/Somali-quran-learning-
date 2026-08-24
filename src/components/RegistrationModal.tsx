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
  Edit2,
  CreditCard,
  Zap,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

// Initialize EmailJS public key
try {
  emailjs.init({
    publicKey: 'DqlTY31s8OKcyf-gi',
  });
} catch (e) {
  console.warn('EmailJS init warning:', e);
}

import { Language } from '../types';
import { COURSES_DATA, PRICING_PLANS } from '../data/academyData';
import { CountrySelector } from './CountrySelector';
import { COUNTRIES, CountryInfo } from '../data/countries';
import { saveRegistrationToFirestore } from '../firebase';
import { openLemonSqueezyCheckout, getLemonSqueezyCheckoutUrl } from '../lib/lemonsqueezy';

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
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(() => {
    return COUNTRIES.find(c => c.code === 'GB') || COUNTRIES[1];
  });
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Step 2: Choice Course & Plan
  const [selectedCourseId, setSelectedCourseId] = useState<string>(preselectedCourseId || 'qaacida-nuuraaniya');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(preselectedPlanId || 'intensive-5days');
  const [teacherPreference, setTeacherPreference] = useState<'male' | 'female' | 'any'>('any');

  // Step 3: Choice Days & Time
  // Default days matched directly with the selected plan daysPerWeek
  const [preferredDays, setPreferredDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<string>('Fiidkii / Evening (5:00 PM - 9:00 PM)');

  // Validation errors & touched state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState<string>('');

  // When plan changes, automatically synchronize preferredDays length to strictly match required days count
  const allWeeklyDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSelectPlan = (newPlanId: string) => {
    setSelectedPlanId(newPlanId);
    const targetPlan = PRICING_PLANS.find(p => p.id === newPlanId) || PRICING_PLANS[3];
    const targetDaysCount = targetPlan.daysPerWeek;

    // Adjust preferred days to exactly match targetDaysCount
    setPreferredDays(prev => {
      let filtered = prev.filter(d => allWeeklyDays.includes(d));
      if (filtered.length === targetDaysCount) {
        return filtered;
      }
      if (filtered.length > targetDaysCount) {
        return filtered.slice(0, targetDaysCount);
      }
      // If we have fewer, pick from standard days
      const needed = targetDaysCount - filtered.length;
      const additional = allWeeklyDays.filter(d => !filtered.includes(d)).slice(0, needed);
      return [...filtered, ...additional];
    });

    if (errors.days) {
      setErrors(prev => ({ ...prev, days: '' }));
    }
  };

  useEffect(() => {
    if (preselectedCourseId) {
      setSelectedCourseId(preselectedCourseId);
    }
    if (preselectedPlanId) {
      handleSelectPlan(preselectedPlanId);
    }
  }, [preselectedCourseId, preselectedPlanId]);

  if (!isOpen) return null;

  // Student list helpers
  const handleAddStudent = () => {
    if (students.length < 5) {
      setStudents(prev => [
        ...prev,
        { id: String(Date.now()), fullName: '', age: '8', gender: 'male' }
      ]);
    }
  };

  const handleRemoveStudent = (id: string) => {
    if (students.length > 1) {
      setStudents(prev => prev.filter(s => s.id !== id));
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[`student_${id}`];
        return copy;
      });
    }
  };

  const handleUpdateStudent = (id: string, field: keyof StudentInfo, value: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    if (field === 'fullName' && value.trim().length >= 2) {
      setErrors(prev => ({ ...prev, [`student_${id}`]: '' }));
    }
  };

  // Country selection handler: auto updates dial code prefix into phone
  const handleSelectCountry = (country: CountryInfo) => {
    setSelectedCountry(country);
    setErrors(prev => ({ ...prev, country: '', phone: '' }));
  };

  // Dynamic Multi-Student Pricing with 20% Family Discount for 2+ Students
  const selectedPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[3];
  const requiredDaysCount = selectedPlan.daysPerWeek;
  const studentCount = students.length;
  const basePricePerStudent = selectedPlan.priceUSD;
  const subtotalPrice = basePricePerStudent * studentCount;
  const hasFamilyDiscount = studentCount >= 2;
  const discountPercent = hasFamilyDiscount ? 20 : 0;
  const discountAmount = hasFamilyDiscount ? Math.round(subtotalPrice * 0.2) : 0;
  const finalTotalPrice = subtotalPrice - discountAmount;

  // Day toggle helper: enforces exact count required by plan
  const handleDayToggle = (day: string) => {
    if (preferredDays.includes(day)) {
      // If clicking an already selected day, remove it only if more than 1
      if (preferredDays.length > 1) {
        setPreferredDays(preferredDays.filter(d => d !== day));
      }
    } else {
      if (preferredDays.length < requiredDaysCount) {
        setPreferredDays([...preferredDays, day]);
      } else {
        // Shift first selected day and append new one to maintain exact requiredDaysCount
        setPreferredDays([...preferredDays.slice(1), day]);
      }
    }
    if (errors.days) {
      setErrors(prev => ({ ...prev, days: '' }));
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

  // Comprehensive Form Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    // 1. Validate all students full names
    students.forEach((s, idx) => {
      if (!s.fullName || s.fullName.trim().length < 2) {
        newErrors[`student_${s.id}`] = lang === 'so' 
          ? `Fadlan qor magaca oo dhammaystiran ee ardayga #${idx + 1}.` 
          : `Please enter full name for student #${idx + 1}.`;
      }
    });

    // 2. Validate Country selection
    if (!selectedCountry) {
      newErrors.country = lang === 'so'
        ? 'Fadlan dooro waddankaaga ka hor inta aadan qorin lambarka.'
        : 'Please select your country before entering your phone number.';
    }

    // 3. Validate WhatsApp Phone
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!phone.trim()) {
      newErrors.phone = lang === 'so'
        ? 'Fadlan gali lambarkaaga WhatsApp.'
        : 'Please enter your WhatsApp contact number.';
    } else if (cleanPhone.length < 5) {
      newErrors.phone = lang === 'so'
        ? 'Lambarka WhatsApp waa inuu ahaadaa mid buuxa oo sax ah.'
        : 'Please enter a valid complete WhatsApp number.';
    }

    // 4. Validate Email format rigorously
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = lang === 'so'
        ? 'Fadlan gali email-kaaga si laguu soo gaarsiiyo xaqiijinta.'
        : 'Please enter your email address.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = lang === 'so'
        ? 'Iimaylku ma saxna! Fadlan qor email sax ah (Tusaale: magac@domain.com).'
        : 'Invalid email format! Please enter a valid email (e.g. name@domain.com).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (preferredDays.length !== requiredDaysCount) {
      newErrors.days = lang === 'so'
        ? `Xirmada aad dooratay ($${selectedPlan.priceUSD}) waxay u baahan tahay inaad doorato sax ahaan ${requiredDaysCount} maalmood.`
        : `The plan you selected ($${selectedPlan.priceUSD}) requires you to choose exactly ${requiredDaysCount} days.`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const isValid = validateStep1();
      if (!isValid) return;
    }
    if (currentStep === 3) {
      const isValid = validateStep3();
      if (!isValid) return;
    }
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleProcessRegistration = async (redirectToPayment: boolean = false) => {
    setIsSubmitting(true);

    const generatedId = `BQA-${Math.floor(100000 + Math.random() * 900000)}`;
    setEnrollmentId(generatedId);

    const selCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];
    const selPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[3];
    const courseTitle = lang === 'so' ? selCourse.titleSo : selCourse.titleEn;
    const planName = lang === 'so' ? selPlan.nameSo : selPlan.nameEn;

    const formattedFee = selPlan.isAnnual
      ? `$${finalTotalPrice} (Sanadle / 12 Bilood)`
      : hasFamilyDiscount
        ? `$${finalTotalPrice}/month (${studentCount} arday - 20% Family Discount, hore: $${subtotalPrice})`
        : `$${finalTotalPrice}/month`;

    const fullPhone = selectedCountry ? `${selectedCountry.dialCode} ${phone.trim()}` : phone.trim();
    const countryName = selectedCountry ? (lang === 'so' && selectedCountry.nameSo ? selectedCountry.nameSo : selectedCountry.name) : 'N/A';
    const primaryStudentName = students[0]?.fullName?.trim() || 'Student';
    const studentEmail = email.trim();

    const registrationPayload = {
      enrollmentId: generatedId,
      studentName: primaryStudentName,
      studentsCount: studentCount,
      students: students.map(s => ({
        fullName: s.fullName.trim(),
        age: s.age.trim(),
        gender: s.gender
      })),
      phone: fullPhone,
      email: studentEmail,
      country: countryName,
      countryCode: selectedCountry?.code || '',
      courseId: selectedCourseId,
      courseTitle,
      planId: selectedPlanId,
      planName,
      basePriceUSD: basePricePerStudent,
      subtotalPriceUSD: subtotalPrice,
      discountPercent,
      discountAmountUSD: discountAmount,
      finalTotalPriceUSD: finalTotalPrice,
      planPriceUSD: finalTotalPrice,
      teacherPreference,
      preferredDays,
      preferredTimeSlot,
      language: lang,
      paymentOption: redirectToPayment ? 'instant_lemonsqueezy' : 'free_trial'
    };

    // 1. Save to Cloud Firestore
    try {
      await saveRegistrationToFirestore(registrationPayload);
    } catch (err) {
      console.error('Failed to save registration to Firestore:', err);
    }

    // 2. Direct EmailJS integration to send confirmation email to the student
    const rawStudentEmail = (registrationPayload.email || '').trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawStudentEmail);
    const targetEmail = isValidEmail ? rawStudentEmail : 'gaanisaxardiid1@gmail.com';

    try {
      const emailParams: Record<string, unknown> = {
        to_name: primaryStudentName,
        name: primaryStudentName,
        student_name: primaryStudentName,
        user_name: primaryStudentName,
        from_name: 'Baro Quran Academy',
        to_email: targetEmail,
        email: targetEmail,
        user_email: targetEmail,
        student_email: targetEmail,
        recipient_email: targetEmail,
        recipient: targetEmail,
        reply_to: targetEmail,
        enrollment_id: generatedId,
        reference_id: generatedId,
        order_id: generatedId,
        id: generatedId,
        monthly_fee: formattedFee,
        total_price: `$${finalTotalPrice}`,
        plan_price: `$${finalTotalPrice}`,
        family_discount: hasFamilyDiscount ? '20% OFF' : 'None',
        course_name: courseTitle,
        course_title: courseTitle,
        course: courseTitle,
        schedule_days: planName,
        plan_name: planName,
        plan: planName,
        preferred_time: preferredTimeSlot || 'Flexible',
        time_slot: preferredTimeSlot || 'Flexible',
        time: preferredTimeSlot || 'Flexible',
        preferred_days: preferredDays.length > 0 ? preferredDays.join(', ') : 'Flexible',
        days: preferredDays.length > 0 ? preferredDays.join(', ') : 'Flexible',
        phone: fullPhone,
        student_phone: fullPhone,
        country: countryName,
        teacher_preference: teacherPreference,
        students_count: studentCount,
        all_students_names: students.map((s, i) => `${i + 1}. ${s.fullName} (${s.age} jir)`).join(', '),
        message: `Asc ${primaryStudentName},\n\nWaad ku guulaysatay diwaangalintaada Baro Quran Academy.\n\n• Number-ka Diiwaanka: ${generatedId}\n• Ardayga/Ardayda: ${students.map(s => s.fullName).join(', ')}\n• Koorsada: ${courseTitle}\n• Xirmada: ${planName}\n• Maalmaha: ${preferredDays.join(', ')}\n• Waqtiga: ${preferredTimeSlot}\n• Waddanka: ${countryName}\n\nFariin xaqiijin ah iyo faahfaahinta fasalka tijaabada ah waxaan kuugu soo diray Gmail-kaaga.\n\nMahadsanid,\nBaro Quran Academy`
      };

      await emailjs.send(
        'service_zn1yk0i',
        'template_8tx4gz6',
        emailParams,
        'DqlTY31s8OKcyf-gi'
      );
    } catch (err: any) {
      console.error('EmailJS send error:', err?.text || err?.message || err);
    }

    // 3. If the user opted to pay now, trigger Lemon Squeezy with their filled data
    if (redirectToPayment) {
      openLemonSqueezyCheckout({
        planId: selPlan.id,
        planName: planName,
        courseId: selCourse.id,
        courseTitle: courseTitle,
        monthlyPrice: finalTotalPrice,
        email: studentEmail,
        name: primaryStudentName
      });
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if confetti not supported
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleProcessRegistration(false);
  };

  const handlePayAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleProcessRegistration(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setCurrentStep(1);
    setStudents([{ id: '1', fullName: '', age: '8', gender: 'male' }]);
    setPhone('');
    setEmail('');
    setErrors({});
    onClose();
  };

  const selectedCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-[#0E1A2C] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-6 border border-slate-100 dark:border-slate-800 flex flex-col max-h-[92vh] transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-[#0B192C] dark:bg-[#070E18] text-white p-5 sm:p-6 relative shrink-0 border-b border-slate-800">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/40">
              📖
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                {lang === 'so' ? 'Diiwaangelinta Fasalka Tijaabada (Free Trial)' : 'Book Your Free 1-on-1 Trial Class'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                {lang === 'so' 
                  ? 'Qadhadh bilaash ah • Macallimiin Ijaazo leh • 100% Ballanqaad' 
                  : 'Free Trial • Certified Tutors • 100% Satisfaction Guarantee'}
              </p>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          {!isSubmitted && (
            <div className="mt-5 grid grid-cols-4 gap-2">
              {[
                { step: 1, labelSo: 'Ardayda & Xiriirka', labelEn: 'Student & Contact' },
                { step: 2, labelSo: 'Koorsada & Xirmada', labelEn: 'Course & Plan' },
                { step: 3, labelSo: 'Maalmaha & Waqtiga', labelEn: 'Days & Time' },
                { step: 4, labelSo: 'Xaqiijinta', labelEn: 'Review & Submit' }
              ].map((s) => {
                const isActive = currentStep === s.step;
                const isCompleted = currentStep > s.step;
                return (
                  <div key={s.step} className="flex flex-col gap-1">
                    <div className={`h-1.5 rounded-full transition-all ${
                      isActive 
                        ? 'bg-orange-500 shadow-sm shadow-orange-500/50' 
                        : isCompleted 
                        ? 'bg-emerald-400' 
                        : 'bg-white/20'
                    }`} />
                    <span className={`text-[10px] font-bold truncate text-center ${
                      isActive ? 'text-orange-400' : isCompleted ? 'text-emerald-300' : 'text-slate-400'
                    }`}>
                      {lang === 'so' ? s.labelSo : s.labelEn}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 bg-white dark:bg-[#0E1A2C] text-slate-900 dark:text-white">
          
          {/* SUCCESS SCREEN */}
          {isSubmitted ? (
            <div className="text-center py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 shadow-xs">
                  <p className="text-base sm:text-lg font-black leading-relaxed">
                    {lang === 'so' 
                      ? 'Waad ku guulaysatay diwaangalintaada, fariin email ah ayaan kusoo dirnay Gmail-kaaga fadlan check garee.' 
                      : 'Waad ku guulaysatay diwaangalintaada, fariin email ah ayaan kusoo dirnay Gmail-kaaga fadlan check garee.'}
                  </p>
                </div>

                {/* Instant Online Payment via Lemon Squeezy option */}
                <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 text-left space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500 fill-current" />
                    <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      {lang === 'so' ? 'Ma doonaysaa inaad toos u bixiso hadda?' : 'Ready to start immediately?'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {lang === 'so'
                      ? 'Waxaad si toos ah oo ammaan ah ugu bixin kartaa qidmadda (Mastercard / Visa / Apple Pay / Google Pay).'
                      : 'You can securely pay for your plan now (Mastercard / Visa / Apple Pay / Google Pay).'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      openLemonSqueezyCheckout({
                        planId: selectedPlan.id,
                        planName: lang === 'so' ? selectedPlan.nameSo : selectedPlan.nameEn,
                        courseId: selectedCourse.id,
                        courseTitle: lang === 'so' ? selectedCourse.titleSo : selectedCourse.titleEn,
                        monthlyPrice: finalTotalPrice,
                        email: email,
                        name: students[0]?.fullName || ''
                      });
                    }}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition-all cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {lang === 'so' 
                        ? `Bixi Qidmadda Hadda ($${finalTotalPrice}/mo)` 
                        : `Pay Tuition Now ($${finalTotalPrice}/mo)`}
                    </span>
                    <Zap className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#0B192C] dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  {lang === 'so' ? 'Xir Daaqadda' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <div>

              {/* STEP 1: Personal & Contact Information */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Student list */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        {lang === 'so' ? 'Xogta Ardayga / Ardayda (Students Info) *' : 'Student(s) Details *'}
                      </label>
                      <button
                        type="button"
                        onClick={handleAddStudent}
                        disabled={students.length >= 5}
                        className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center gap-1 cursor-pointer disabled:opacity-40"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'so' ? 'Kudar Arday Kale (+)' : 'Add More Students (+)'}</span>
                      </button>
                    </div>

                    {/* Family Discount Notice if 2+ students */}
                    {hasFamilyDiscount && (
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-300 animate-fadeIn">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px] uppercase">
                            -20% OFF
                          </span>
                          <span className="font-bold">
                            {lang === 'so'
                              ? `Qiimo dhimis qoys: Waxaad heshay 20% dhimis maadaama aad ${studentCount} arday diiwaangelisay!`
                              : `Family Discount: You unlocked 20% OFF for enrolling ${studentCount} students!`}
                          </span>
                        </div>
                        <span className="font-extrabold text-emerald-700 dark:text-emerald-400 hidden sm:inline">
                          {lang === 'so' ? 'Toos loo jaray' : 'Auto applied'}
                        </span>
                      </div>
                    )}

                    {students.map((student, idx) => (
                      <div 
                        key={student.id} 
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                            {lang === 'so' ? `Ardayga #${idx + 1}` : `Student #${idx + 1}`}
                          </span>
                          {students.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveStudent(student.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{lang === 'so' ? 'Tirtir' : 'Remove'}</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          {/* Full Name */}
                          <div className="sm:col-span-6">
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                              {lang === 'so' ? 'Magaca Saddexan *' : 'Full Name *'}
                            </label>
                            <div className="relative">
                              <User className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${errors[`student_${student.id}`] ? 'text-red-500' : 'text-slate-400'}`} />
                              <input
                                type="text"
                                required
                                placeholder={lang === 'so' ? 'Tusaale: Maxamed Cali Cabdi' : 'e.g. Mohamed Ali Abdi'}
                                value={student.fullName}
                                onChange={(e) => handleUpdateStudent(student.id, 'fullName', e.target.value)}
                                className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 font-medium ${
                                  errors[`student_${student.id}`]
                                    ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                                    : 'border-slate-300 dark:border-slate-700 focus:ring-orange-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                                }`}
                              />
                            </div>
                            {errors[`student_${student.id}`] && (
                              <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                                <span>⚠️</span>
                                <span>{errors[`student_${student.id}`]}</span>
                              </p>
                            )}
                          </div>

                          {/* Age */}
                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                              {lang === 'so' ? 'Da’da (Age) *' : 'Age *'}
                            </label>
                            <select
                              value={student.age}
                              onChange={(e) => handleUpdateStudent(student.id, 'age', e.target.value)}
                              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
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
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                              {lang === 'so' ? 'Jinsiga *' : 'Gender *'}
                            </label>
                            <select
                              value={student.gender}
                              onChange={(e) => handleUpdateStudent(student.id, 'gender', e.target.value as any)}
                              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                            >
                              <option value="male">{lang === 'so' ? 'Lab (Boy)' : 'Male'}</option>
                              <option value="female">{lang === 'so' ? 'Dheddig (Girl)' : 'Female'}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Global Validation Banner on Error */}
                  {Object.keys(errors).length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border-2 border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300 font-bold flex items-center gap-2.5 animate-shake">
                      <span className="text-base">⚠️</span>
                      <div>
                        <div className="font-black text-red-900 dark:text-red-200">
                          {lang === 'so' ? 'Fadlan sax khaladaadka hoose si aad u sii gudubto:' : 'Please correct the following errors before continuing:'}
                        </div>
                        <div className="text-[11px] text-red-700 dark:text-red-300 mt-0.5">
                          {lang === 'so' ? 'Dooro waddanka, hubi lambarka WhatsApp, email-ka saxda ah iyo magacyada ardayda.' : 'Select country, enter valid WhatsApp phone, valid email address and all student names.'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Country Selection & WhatsApp Phone Input */}
                  <div className="space-y-4 pt-2">
                    
                    {/* Country Selector (Searchable, All Countries) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                          {lang === 'so' ? '1. Dooro Waddanka aad Joogto (Country) *' : '1. Select Your Country *'}
                        </label>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          {lang === 'so' ? 'Wadamada aduunka oo dhan' : 'All countries worldwide'}
                        </span>
                      </div>
                      
                      <CountrySelector
                        selectedCountry={selectedCountry}
                        onSelectCountry={handleSelectCountry}
                        lang={lang}
                        hasError={!!errors.country}
                      />
                      {errors.country && (
                        <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                          <span>⚠️</span>
                          <span>{errors.country}</span>
                        </p>
                      )}
                    </div>

                    {/* Contact details: WhatsApp with auto-filled country dial code + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* WhatsApp Phone Number */}
                      <div>
                        <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                          {lang === 'so' ? '2. Lambarka WhatsApp *' : '2. WhatsApp Number *'}
                        </label>
                        
                        <div className="relative flex rounded-xl border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent bg-white dark:bg-slate-900 overflow-hidden">
                          {/* Country Dial Code Badge */}
                          <div className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shrink-0 select-none">
                            <span className="text-base">{selectedCountry?.flag || '🌐'}</span>
                            <span className="text-xs font-black text-[#0B192C] dark:text-white">
                              {selectedCountry ? selectedCountry.dialCode : '---'}
                            </span>
                          </div>

                          <input
                            type="tel"
                            required
                            disabled={!selectedCountry}
                            placeholder={selectedCountry ? (lang === 'so' ? 'Qor lambarkaaga kaliya...' : 'Enter your phone number...') : (lang === 'so' ? 'Marka hore waddanka dooro...' : 'Select country first...')}
                            value={phone}
                            onChange={(e) => {
                              // Only allow numbers and spaces
                              const clean = e.target.value.replace(/[^0-9\s-]/g, '');
                              setPhone(clean);
                              if (errors.phone && clean.trim().length >= 5) {
                                setErrors(prev => ({ ...prev, phone: '' }));
                              }
                            }}
                            className={`w-full px-3.5 py-2.5 text-sm font-medium focus:outline-none ${
                              !selectedCountry ? 'bg-slate-100 dark:bg-slate-800 cursor-not-allowed text-slate-400' : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                            } ${errors.phone ? 'bg-red-50/20' : ''}`}
                          />
                        </div>

                        {!selectedCountry ? (
                          <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400 mt-1 flex items-center gap-1">
                            <span>ℹ️</span>
                            <span>{lang === 'so' ? 'Fadlan kor ka dooro waddanka si aad number-ka u qorto.' : 'Please select your country above first.'}</span>
                          </p>
                        ) : errors.phone ? (
                          <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                            <span>⚠️</span>
                            <span>{errors.phone}</span>
                          </p>
                        ) : (
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                            {lang === 'so' ? `Koodhka (${selectedCountry.dialCode}) toos ayaa loogu darayaa lambarkaaga.` : `Dial code (${selectedCountry.dialCode}) is automatically applied.`}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                          {lang === 'so' ? '3. Email Address *' : '3. Email Address *'}
                        </label>
                        <div className="relative">
                          <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-500' : 'text-slate-400'}`} />
                          <input
                            type="email"
                            required
                            placeholder="waalid@gmail.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                              if (errors.email && emailRegex.test(e.target.value.trim())) {
                                setErrors(prev => ({ ...prev, email: '' }));
                              }
                            }}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 font-medium ${
                              errors.email 
                                ? 'border-red-500 focus:ring-red-400 bg-red-50/20' 
                                : 'border-slate-300 dark:border-slate-700 focus:ring-orange-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                            <span>⚠️</span>
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* STEP 2: Choice Course & Plan */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Select Course */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
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
                                ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/40 shadow-xs'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="text-xs font-black text-[#0B192C] dark:text-white">
                                {lang === 'so' ? course.titleSo : course.titleEn}
                              </span>
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                                  <Check className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mt-1">
                              {lang === 'so' ? course.levelSo : course.levelEn}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Select Pricing Plan */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        {lang === 'so' ? '2. Dooro Xirmada Todobaadlaha ah (Pricing Plan) *' : '2. Select Weekly Schedule Plan *'}
                      </label>
                      <span className="text-[11px] text-orange-600 dark:text-orange-400 font-bold bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-900/50">
                        {lang === 'so' ? `Xirmadu waxay go'aamisaa tirada maalmaha` : `Plan determines exact days per week`}
                      </span>
                    </div>

                    {/* Live Multi-Student Price Calculator in Step 2 */}
                    {hasFamilyDiscount && (
                      <div className="p-4 mb-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 dark:from-emerald-950/50 dark:via-teal-950/40 dark:to-emerald-900/50 border-2 border-emerald-300 dark:border-emerald-700 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-emerald-950 dark:text-emerald-200 uppercase">
                                {lang === 'so' ? `Xisaabinta Qiimaha (${studentCount} Arday):` : `Family Price Calculation (${studentCount} Students):`}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px]">
                                20% OFF
                              </span>
                            </div>
                            <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5">
                              {lang === 'so'
                                ? `$${basePricePerStudent} × ${studentCount} arday = $${subtotalPrice} - $${discountAmount} (20% Dhimis)`
                                : `$${basePricePerStudent} × ${studentCount} students = $${subtotalPrice} - $${discountAmount} (20% Off)`}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-slate-400 line-through mr-1.5 font-bold">${subtotalPrice}</span>
                            <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">${finalTotalPrice}</span>
                            <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold block">/bishii</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                      {PRICING_PLANS.map((plan) => {
                        const isSelected = selectedPlanId === plan.id;
                        return (
                          <div
                            key={plan.id}
                            onClick={() => handleSelectPlan(plan.id)}
                            className={`p-3 rounded-2xl border-2 cursor-pointer transition-all text-center relative flex flex-col justify-between ${
                              isSelected
                                ? 'border-orange-500 bg-orange-50/70 dark:bg-orange-950/40 ring-2 ring-orange-500/20 shadow-md scale-[1.02]'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
                            }`}
                          >
                            {plan.isAnnual ? (
                              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[8px] font-black uppercase whitespace-nowrap">
                                {lang === 'so' ? 'Sanadle 💎' : 'Annual 💎'}
                              </div>
                            ) : plan.popular ? (
                              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-orange-500 text-white text-[8px] font-black uppercase whitespace-nowrap">
                                {lang === 'so' ? 'Ugu Caansan' : 'Popular'}
                              </div>
                            ) : null}

                            <div>
                              <div className="text-[11px] font-black text-[#0B192C] dark:text-white leading-tight">
                                {lang === 'so' ? plan.nameSo : plan.nameEn}
                              </div>
                              <div className="text-base font-black text-orange-600 dark:text-orange-400 mt-1">
                                ${plan.priceUSD} <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                                  {plan.isAnnual ? (lang === 'so' ? '/sanad' : '/yr') : (lang === 'so' ? '/mo' : '/mo')}
                                </span>
                              </div>
                            </div>

                            <div className="mt-1 space-y-0.5">
                              <div>
                                <span className={`inline-block px-1.5 py-0.5 rounded-md font-black text-[9px] ${
                                  plan.isAnnual 
                                    ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' 
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}>
                                  {plan.isAnnual 
                                    ? (lang === 'so' ? '12 Bilood' : '12 Months') 
                                    : `${plan.daysPerWeek} ${lang === 'so' ? 'cisho / w' : 'days / w'}`}
                                </span>
                              </div>
                              <div className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold truncate">
                                {lang === 'so' ? plan.durationPerClassSo : plan.durationPerClassEn}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Teacher Gender Preference */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                      {lang === 'so' ? '3. Nooca Macallinka (Teacher Preference):' : '3. Teacher Preference:'}
                    </label>
                    <select
                      value={teacherPreference}
                      onChange={(e) => setTeacherPreference(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                    >
                      <option value="any">{lang === 'so' ? 'Midkoodna (Lab ama Dheddig)' : 'Any (Male or Female)'}</option>
                      <option value="male">{lang === 'so' ? 'Macallin Rag ah (Male Teacher)' : 'Male Teacher'}</option>
                      <option value="female">{lang === 'so' ? 'Macallimad Haween ah (Female Teacher)' : 'Female Teacher'}</option>
                    </select>
                  </div>

                </div>
              )}

              {/* STEP 3: Choice Days & Time (Strictly linked with selected plan) */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Selected Plan Days Requirement Badge */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/30 border-2 border-orange-200 dark:border-orange-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-orange-950 dark:text-orange-200 uppercase">
                          {lang === 'so' ? 'Xirmada Aad Dooratay:' : 'Your Selected Plan:'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-500 text-white font-black text-xs">
                          {lang === 'so' ? selectedPlan.nameSo : selectedPlan.nameEn} (${selectedPlan.priceUSD}/mo)
                        </span>
                      </div>
                      <p className="text-xs text-orange-900 dark:text-orange-300 mt-1 font-semibold">
                        {lang === 'so'
                          ? `Maadaama aad dooratay xirmada $${selectedPlan.priceUSD}, waa inaad doorataa sax ahaan ${requiredDaysCount} maalmood.`
                          : `Because you chose the $${selectedPlan.priceUSD} plan, you must select exactly ${requiredDaysCount} days.`}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black ${
                        preferredDays.length === requiredDaysCount 
                          ? 'bg-emerald-600 text-white shadow-xs' 
                          : 'bg-amber-500 text-white'
                      }`}>
                        {preferredDays.length === requiredDaysCount ? <Check className="w-3.5 h-3.5" /> : null}
                        <span>
                          {lang === 'so'
                            ? `${preferredDays.length} / ${requiredDaysCount} cisho la doortay`
                            : `${preferredDays.length} / ${requiredDaysCount} days selected`}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Preferred Days Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        {lang === 'so' ? `Dooro ${requiredDaysCount}-da Maalmood ee Fasalkaaga *` : `Select Your ${requiredDaysCount} Class Days *`}
                      </label>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {lang === 'so' ? 'Guji maalmaha aad doonayso' : 'Click the days you prefer'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {daysList.map((day) => {
                        const isSelected = preferredDays.includes(day.key);
                        return (
                          <button
                            type="button"
                            key={day.key}
                            onClick={() => handleDayToggle(day.key)}
                            className={`p-3.5 rounded-xl text-xs font-black border-2 transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-orange-500 text-white border-orange-500 shadow-md scale-[1.02]'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span>{lang === 'so' ? day.labelSo : day.labelEn}</span>
                            {isSelected ? (
                              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-white" />
                              </span>
                            ) : (
                              <span className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {errors.days && (
                      <p className="text-xs font-bold text-red-600 mt-2 flex items-center gap-1">
                        <span>⚠️</span>
                        <span>{errors.days}</span>
                      </p>
                    )}
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                      {lang === 'so' ? 'Dooro Saacadaha kugu habboon (Choice Time Slot) *' : 'Select Preferred Daily Time Slot *'}
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={preferredTimeSlot}
                        onChange={(e) => setPreferredTimeSlot(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
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
                  
                  <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50">
                    <div className="text-xs font-black text-orange-900 dark:text-orange-200 uppercase tracking-wider mb-1">
                      {lang === 'so' ? 'Fadlan dib u eeg xogtaada ka hor inta aadan dirin' : 'Please review your registration details before submitting'}
                    </div>
                    <p className="text-xs text-orange-700 dark:text-orange-300">
                      {lang === 'so' ? 'Waxaad riixi kartaa badhanka dib-u-habaynta (Edit) si aad u saxdo tallaabo kasta.' : 'You can click any Edit button to adjust information.'}
                    </p>
                  </div>

                  {/* Review Box 1: Personal Info */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                      <span className="text-xs font-black text-[#0B192C] dark:text-white uppercase tracking-wider">
                        {lang === 'so' ? '1. Xogta Ardayda & Xiriirka' : '1. Personal Information'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>{lang === 'so' ? 'Edit' : 'Edit'}</span>
                      </button>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Ardayda:' : 'Students:'}</span>{' '}
                        {students.map(s => `${s.fullName} (${s.age} jir, ${s.gender === 'male' ? 'Wiil' : 'Gabadh'})`).join(' • ')}
                      </div>
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Waddanka:' : 'Country:'}</span>{' '}
                        {selectedCountry ? `${selectedCountry.flag} ${lang === 'so' && selectedCountry.nameSo ? selectedCountry.nameSo : selectedCountry.name}` : 'N/A'}
                      </div>
                      <div>
                        <span className="font-bold">WhatsApp:</span>{' '}
                        {selectedCountry ? `${selectedCountry.dialCode} ${phone}` : phone}
                      </div>
                      <div>
                        <span className="font-bold">Email:</span> {email}
                      </div>
                    </div>
                  </div>

                  {/* Review Box 2: Course & Plan */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                      <span className="text-xs font-black text-[#0B192C] dark:text-white uppercase tracking-wider">
                        {lang === 'so' ? '2. Koorsada & Xirmada' : '2. Course & Plan'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>{lang === 'so' ? 'Edit' : 'Edit'}</span>
                      </button>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Koorsada:' : 'Course:'}</span>{' '}
                        {lang === 'so' ? selectedCourse.titleSo : selectedCourse.titleEn}
                      </div>
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Xirmada:' : 'Plan:'}</span>{' '}
                        {lang === 'so' ? selectedPlan.nameSo : selectedPlan.nameEn} (${selectedPlan.priceUSD}/mo)
                      </div>
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Tirada Ardayda:' : 'Enrolled Students:'}</span>{' '}
                        {studentCount} {lang === 'so' ? 'arday' : 'student(s)'}
                      </div>
                      <div className="pt-1 border-t border-slate-200 dark:border-slate-700 mt-1 flex items-center justify-between">
                        <span className="font-bold">{lang === 'so' ? 'Wadarta Qiimaha Bishii:' : 'Total Monthly Tuition:'}</span>
                        <div className="text-right">
                          {hasFamilyDiscount && (
                            <span className="text-[11px] text-slate-400 line-through mr-1 font-bold">${subtotalPrice}</span>
                          )}
                          <span className="font-black text-orange-600 dark:text-orange-400 text-sm">${finalTotalPrice}/mo</span>
                          {hasFamilyDiscount && (
                            <span className="ml-1.5 px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                              20% OFF
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Macallinka:' : 'Teacher:'}</span>{' '}
                        {teacherPreference === 'male' ? 'Male' : teacherPreference === 'female' ? 'Female' : 'Any'}
                      </div>
                    </div>
                  </div>

                  {/* Review Box 3: Days & Time */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                      <span className="text-xs font-black text-[#0B192C] dark:text-white uppercase tracking-wider">
                        {lang === 'so' ? '3. Maalmaha & Waqtiga' : '3. Days & Time'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>{lang === 'so' ? 'Edit' : 'Edit'}</span>
                      </button>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                      <div>
                        <span className="font-bold">{lang === 'so' ? 'Maalmaha La Doortay:' : 'Selected Days:'}</span>{' '}
                        <span className="font-bold text-orange-700 dark:text-orange-400">
                          {preferredDays.join(', ')} ({preferredDays.length} {lang === 'so' ? 'maalmood' : 'days'})
                        </span>
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
              <div className="pt-6 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 mt-6">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
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
                    className="px-7 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black rounded-xl shadow-md shadow-orange-500/30 text-sm flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>{lang === 'so' ? 'Talaabada Xigta' : 'Next Step'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2.5 justify-end">
                    <button
                      type="button"
                      onClick={handlePayAndSubmit}
                      disabled={isSubmitting}
                      className="px-5 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black rounded-xl shadow-md shadow-emerald-600/25 text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>
                        {isSubmitting
                          ? (lang === 'so' ? 'Waa la diiwaangelinayaa...' : 'Processing...')
                          : selectedPlan.isAnnual
                            ? (lang === 'so' ? `Bixi Sanadkii Hadda ($${finalTotalPrice})` : `Pay Annual Now ($${finalTotalPrice})`)
                            : (lang === 'so' ? `Bixi Qidmadda Hadda ($${finalTotalPrice}/mo)` : `Pay Tuition Now ($${finalTotalPrice}/mo)`)}
                      </span>
                      <Zap className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black rounded-xl shadow-lg shadow-orange-500/30 text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <span>
                        {isSubmitting 
                          ? (lang === 'so' ? 'Waa la dirayaa...' : 'Submitting...') 
                          : (lang === 'so' ? 'Gudbi (Fasal Tijaabo ah)' : 'Submit (Free Trial)')}
                      </span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
