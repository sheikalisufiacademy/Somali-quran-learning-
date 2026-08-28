import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Smartphone, 
  QrCode, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  Clock,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { createTelebirrOrder, TelebirrPayResult } from '../lib/telebirr';

interface TelebirrCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'so' | 'en';
  courseTitle: string;
  amount: number | string;
  planName?: string;
  studentName?: string;
  studentPhone?: string;
  studentEmail?: string;
  enrollmentId?: string;
}

export const TelebirrCheckoutModal: React.FC<TelebirrCheckoutModalProps> = ({
  isOpen,
  onClose,
  lang,
  courseTitle,
  amount,
  planName = 'Standard Plan',
  studentName = 'Arday',
  studentPhone = '',
  studentEmail = '',
  enrollmentId = `BQA-${Date.now().toString().slice(-6)}`
}) => {
  const [loading, setLoading] = useState(true);
  const [payResult, setPayResult] = useState<TelebirrPayResult | null>(null);
  const [activeTab, setActiveTab] = useState<'app' | 'ussd' | 'qr'>('app');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [customerTelebirrPhone, setCustomerTelebirrPhone] = useState(studentPhone || '');

  const cleanAmountNum = Number(amount) || 30;
  // Estimate ETB conversion (e.g. 1 USD ~ 140 ETB for convenience in Ethiopia)
  const estimatedETB = Math.round(cleanAmountNum * 140);
  const ussdCode = `*127*1*0911000000*${estimatedETB}#`;

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setPaymentConfirmed(false);
      
      createTelebirrOrder({
        title: `${courseTitle} (${planName})`,
        amount: cleanAmountNum,
        studentName,
        studentPhone,
        studentEmail,
        enrollmentId
      }).then((res) => {
        setPayResult(res);
        setLoading(false);
      });
    }
  }, [isOpen, courseTitle, planName, cleanAmountNum, studentName, studentPhone, studentEmail, enrollmentId]);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleOpenTelebirrUrl = () => {
    const url = payResult?.assembledUrl || `https://telebirr.et/checkout?title=${encodeURIComponent(courseTitle)}&amount=${cleanAmountNum}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleConfirmPaid = () => {
    setPaymentConfirmed(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/75 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#0E1A2C] rounded-3xl shadow-2xl border-2 border-amber-400/50 dark:border-amber-500/30 overflow-hidden my-auto"
        >
          {/* Header Banner with Telebirr colors (Ethio Telecom Deep Blue & Golden Amber) */}
          <div className="relative bg-gradient-to-r from-[#005a9c] via-[#0B2545] to-[#134074] text-white p-5 sm:p-6 pb-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-400/30 ring-2 ring-white/30">
                  📱
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black tracking-tight text-white">
                      Telebirr Payment
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                      Official API
                    </span>
                  </div>
                  <p className="text-xs text-amber-200 font-medium">
                    Baro Quran Academy • Merchant Checkout
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Course & Amount Box */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-amber-200 font-medium block">
                  {lang === 'so' ? 'Koorsada la doortay:' : 'Selected Course:'}
                </span>
                <span className="text-sm sm:text-base font-black text-white line-clamp-1">
                  {courseTitle}
                </span>
                <span className="text-[11px] text-slate-300">
                  {planName} • ID: <strong className="text-amber-300">{enrollmentId}</strong>
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-2xl sm:text-3xl font-black text-amber-300">
                  ${cleanAmountNum}
                </span>
                <span className="text-[11px] text-slate-300 block">
                  ≈ {estimatedETB} ETB
                </span>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-5">
            {paymentConfirmed ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">
                    {lang === 'so' ? 'Waad ku mahadsan tahay lacag bixintaada!' : 'Payment Received!'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
                    {lang === 'so'
                      ? 'Nidaamka maamulka Baro Quran Academy ayaa xaqiijin doona akoonkaaga. Macallinkaaga ayaana si toos ah kula soo xiriiri doona.'
                      : 'Our administration team is processing your enrollment. Your certified Quran instructor will contact you shortly.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Order Title:</span>
                    <strong className="text-slate-900 dark:text-white">{courseTitle}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Paid:</span>
                    <strong className="text-emerald-600 font-bold">${cleanAmountNum} ({estimatedETB} ETB)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student:</span>
                    <strong className="text-slate-900 dark:text-white">{studentName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reference:</span>
                    <strong className="text-amber-600 dark:text-amber-400">{enrollmentId}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3.5 bg-[#0B192C] dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white dark:text-slate-950 font-black rounded-xl text-sm transition-all cursor-pointer"
                >
                  {lang === 'so' ? 'Waan Fahmay (Dhameystir)' : 'Done'}
                </button>
              </div>
            ) : (
              <>
                {/* Method Navigation Tabs */}
                <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('app')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === 'app'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Telebirr Web / App</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('ussd')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === 'ussd'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>USSD (*127#)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('qr')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === 'qr'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Scan QR</span>
                  </button>
                </div>

                {/* Tab 1: Telebirr Direct Portal / API Checkout Link */}
                {activeTab === 'app' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                      <div className="flex items-center gap-2 font-black text-amber-800 dark:text-amber-300">
                        <Sparkles className="w-4 h-4" />
                        <span>{lang === 'so' ? 'Ku bixi Telebirr Online Portal' : 'Pay via Telebirr Portal'}</span>
                      </div>
                      <p className="leading-relaxed">
                        {lang === 'so'
                          ? 'Guji batoonka hoose si lagugu xiro barta rasmiga ah ee Telebirr, adigoo isticmaalaya Number-kaaga Telebirr iyo PIN-kaaga.'
                          : 'Click below to securely open the Telebirr payment checkout with your Telebirr phone number and PIN.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenTelebirrUrl}
                      className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/25 transition-all transform active:scale-98 cursor-pointer"
                    >
                      <span>
                        {lang === 'so' 
                          ? `Fur Barta Telebirr ($${cleanAmountNum})` 
                          : `Open Telebirr Checkout ($${cleanAmountNum})`}
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Tab 2: USSD Code */}
                {activeTab === 'ussd' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">
                        {lang === 'so' ? 'Koodhka Tooska ah ee USSD (*127#):' : 'Direct USSD Quick Dial:'}
                      </span>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm sm:text-base font-black text-[#005a9c] dark:text-amber-300">
                        <span>{ussdCode}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(ussdCode, 'ussd')}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all"
                        >
                          {copiedField === 'ussd' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside font-medium leading-relaxed">
                        <li>Geli koodhka kore taleefankaaga Ethio Telecom.</li>
                        <li>Gali PIN-kaaga Telebirr si aad u xaqiijiso.</li>
                        <li>Guji batoonka <strong>"Waan Bixiyay"</strong> ee hoose.</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* Tab 3: QR Code */}
                {activeTab === 'qr' && (
                  <div className="text-center space-y-3">
                    <div className="w-44 h-44 mx-auto p-3 bg-white rounded-2xl border-2 border-amber-400 shadow-md flex items-center justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                          payResult?.assembledUrl || `https://telebirr.et/pay?ref=${enrollmentId}&amt=${cleanAmountNum}`
                        )}`}
                        alt="Telebirr QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {lang === 'so'
                        ? 'Ka scan garee Telebirr SuperApp-kaaga taleefanka'
                        : 'Scan with your Telebirr SuperApp to pay'}
                    </p>
                  </div>
                )}

                {/* Step to confirm completion */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleConfirmPaid}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{lang === 'so' ? 'Waan Bixiyay (Xaqiiji)' : 'I Have Paid (Confirm)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer"
                  >
                    {lang === 'so' ? 'Ka Noqo' : 'Cancel'}
                  </button>
                </div>

                {/* Safe info */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Xiriir toos ah oo ammaan ah • Ethio Telecom Telebirr</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
