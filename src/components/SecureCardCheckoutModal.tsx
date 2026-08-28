import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Calendar,
  User,
  Check,
  AlertCircle,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface SecureCardCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  courseTitle: string;
  planName: string;
  amount: number;
  studentName: string;
  studentPhone?: string;
  studentEmail?: string;
  enrollmentId: string;
  onPaymentSuccess?: (paymentRef: string) => void;
}

export const SecureCardCheckoutModal: React.FC<SecureCardCheckoutModalProps> = ({
  isOpen,
  onClose,
  lang,
  courseTitle,
  planName,
  amount,
  studentName,
  studentPhone,
  studentEmail,
  enrollmentId,
  onPaymentSuccess
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(studentName || '');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (studentName) {
      setCardHolder(studentName);
    }
  }, [studentName]);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsProcessing(false);
      setErrorMessage('');
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Quick autofill demo helper for instant verification
  const handleAutoFillDemo = () => {
    setCardNumber('4242 4242 4242 4242');
    setExpiry('12/28');
    setCvc('789');
    setPostalCode('10001');
    if (!cardHolder && studentName) {
      setCardHolder(studentName);
    }
    setErrorMessage('');
  };

  // Format Card Number (adds space every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
    if (errorMessage) setErrorMessage('');
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setExpiry(raw);
    }
    if (errorMessage) setErrorMessage('');
  };

  // Format CVC
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvc(raw);
    if (errorMessage) setErrorMessage('');
  };

  // Detect card type
  const getCardBrand = () => {
    const clean = cardNumber.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'VISA';
    if (clean.startsWith('51') || clean.startsWith('52') || clean.startsWith('53') || clean.startsWith('54') || clean.startsWith('55')) return 'MASTERCARD';
    if (clean.startsWith('34') || clean.startsWith('37')) return 'AMEX';
    return 'CARD';
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanCard = cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 15) {
      setErrorMessage(lang === 'so' ? 'Fadlan geli lambarka kaarka oo sax ah (16 lambar)' : 'Please enter a valid 16-digit card number');
      return;
    }
    if (!expiry || expiry.length < 5) {
      setErrorMessage(lang === 'so' ? 'Fadlan geli taariikhda dhicitaanka (MM/YY)' : 'Please enter valid expiry date (MM/YY)');
      return;
    }
    if (!cvc || cvc.length < 3) {
      setErrorMessage(lang === 'so' ? 'Fadlan geli CVC/CVV oo sax ah' : 'Please enter valid CVC/CVV (3 or 4 digits)');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    // Simulate secure payment processing
    setTimeout(() => {
      setIsProcessing(false);
      const generatedTxId = `TX-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setTransactionId(generatedTxId);
      setIsSuccess(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }

      if (onPaymentSuccess) {
        onPaymentSuccess(generatedTxId);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#0E1A2C] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden my-auto max-h-[94vh] flex flex-col transition-all animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500/20 flex items-center justify-center text-white border border-orange-500/40">
              <CreditCard className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <div className="text-base font-black text-white flex items-center gap-2">
                <span>{lang === 'so' ? 'Lacag Bixinta Sugan' : 'Secure Checkout'}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-black tracking-wider uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>256-bit SSL</span>
                </span>
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">
                {lang === 'so' ? 'Bixinta Tooska ah ee Kaarka Bangiga' : 'End-to-End Encrypted Card Payment'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-white dark:bg-[#0E1A2C] text-slate-900 dark:text-white">
          {!isSuccess ? (
            <form onSubmit={handlePayNow} className="space-y-4">
              {/* Order Summary Pill */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between shadow-xs">
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[220px]">
                    {courseTitle}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold mt-0.5">
                    {planName} • {studentName || 'Student'}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    ID: {enrollmentId}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400">
                    ${amount}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold">
                    USD Total
                  </span>
                </div>
              </div>

              {/* Accepted Card Badges */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 px-1">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  {lang === 'so' ? 'Kaararka la aqbalo:' : 'Accepted cards:'}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-black">
                  <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">VISA</span>
                  <span className="px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">MasterCard</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">AMEX</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">Apple Pay</span>
                </div>
              </div>

              {/* Error Notification */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Card Inputs Form */}
              <div className="space-y-3.5 pt-1">
                {/* Card Number */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                      {lang === 'so' ? 'Lambarka Kaarka (Card Number) *' : 'Card Number *'}
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoFillDemo}
                      className="text-[10px] text-orange-600 dark:text-orange-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3" />
                      <span>{lang === 'so' ? 'Buuxi Tusaale' : 'Fill Sample'}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4242 4242 4242 4242"
                      className="w-full pl-4 pr-16 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm font-bold tracking-wider placeholder:text-slate-400"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-black text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                        {getCardBrand()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expiry and CVC */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      {lang === 'so' ? 'Dhicitaanka (MM / YY) *' : 'Expires (MM / YY) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="12/28"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm font-bold placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center justify-between">
                      <span>CVC / CVV *</span>
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    </label>
                    <input
                      type="password"
                      required
                      value={cvc}
                      onChange={handleCvcChange}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm font-bold placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Name on Card & Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      {lang === 'so' ? 'Magaca Kaarka (Name) *' : 'Name on Card *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      {lang === 'so' ? 'ZIP / Postal Code' : 'Postal / ZIP Code'}
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 10001"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Secure Notice */}
              <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 font-medium pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {lang === 'so'
                    ? 'Macluumaadkaaga lacag-bixinta waa la xafiday (256-bit SSL Encrypted).'
                    : 'Your payment information is encrypted and 100% secure.'}
                </span>
              </div>

              {/* Submit / Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black text-base shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer mt-2"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{lang === 'so' ? 'Waa la xaqiijinayaa...' : 'Processing Securely...'}</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {lang === 'so' ? `Bixi Hadda $${amount} USD` : `Pay $${amount} USD Now`}
                    </span>
                  </>
                )}
              </button>

              <div className="text-center">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-bit SSL Encrypted • PCI-DSS Compliant & Protected</span>
                </span>
              </div>
            </form>
          ) : (
            /* Success Receipt Screen */
            <div className="py-6 px-2 text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-300 dark:border-emerald-700 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {lang === 'so' ? 'Lacag Bixintu Way Guulaysatay!' : 'Payment Successful!'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1">
                  {lang === 'so'
                    ? 'Waad ku mahadsan tahay isdiiwaangalinta. Macallinkaaga ayaa kula soo xiriiri doona WhatsApp-kaaga 24 saac gudahood.'
                    : 'Thank you for enrolling. Your Quran teacher will contact you via WhatsApp within 24 hours.'}
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2.5 font-medium">
                <div className="flex justify-between pb-1.5 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">{lang === 'so' ? 'Tixraaca Lacagta:' : 'Transaction ID:'}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{lang === 'so' ? 'Ardayga:' : 'Student:'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{studentName || 'Student'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{lang === 'so' ? 'Koorsada:' : 'Course:'}</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{courseTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{lang === 'so' ? 'Qadarka La Bixiyay:' : 'Amount Paid:'}</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">${amount} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{lang === 'so' ? 'Xaaladda:' : 'Status:'}</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
                    Paid & Confirmed ✓
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/251777796444?text=${encodeURIComponent(
                    `Assalaamu Calaykum Somali Quran Academy, waxaan bixiyay lacagta isdiiwaangalinta koorsada: ${courseTitle}, Xirmada: ${planName}, Tixraac: ${transactionId}, Ardayga: ${studentName}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>{lang === 'so' ? 'Ku Xaqiiji WhatsApp-ka Maamulka' : 'Confirm on WhatsApp'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  {lang === 'so' ? 'Xir Daaqadda' : 'Close Receipt'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
