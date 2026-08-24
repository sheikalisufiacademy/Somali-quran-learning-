import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  CreditCard,
  Lock,
  Zap,
  Tag,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, PricingPlan } from '../types';
import { PRICING_PLANS } from '../data/academyData';
import { openLemonSqueezyCheckout, getLemonSqueezyCheckoutUrl } from '../lib/lemonsqueezy';

interface PricingProps {
  lang: Language;
  onSelectPlan: (planId: string) => void;
}

type Currency = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'SEK';
type PlanFilter = 'all' | 'monthly' | 'yearly';

export const Pricing: React.FC<PricingProps> = ({ lang, onSelectPlan }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [activeFilter, setActiveFilter] = useState<PlanFilter>('all');

  const getPrice = (plan: PricingPlan) => {
    switch (currency) {
      case 'GBP': return { symbol: '£', amount: plan.priceGBP };
      case 'EUR': return { symbol: '€', amount: plan.priceEUR };
      case 'CAD': return { symbol: 'C$', amount: plan.priceCAD };
      case 'SEK': return { symbol: 'kr', amount: plan.priceSEK };
      default: return { symbol: '$', amount: plan.priceUSD };
    }
  };

  const handleBuyNow = (plan: PricingPlan) => {
    const periodText = plan.isAnnual ? 'Full Year ($450)' : `$${plan.priceUSD}/mo`;
    openLemonSqueezyCheckout({
      planId: plan.id,
      planName: lang === 'so' ? `${plan.nameSo} (${periodText})` : `${plan.nameEn} (${periodText})`,
      monthlyPrice: plan.priceUSD,
      daysCount: plan.daysPerWeek,
    });
  };

  const filteredPlans = PRICING_PLANS.filter(plan => {
    if (activeFilter === 'monthly') return !plan.isAnnual;
    if (activeFilter === 'yearly') return plan.isAnnual;
    return true;
  });

  return (
    <motion.section 
      id="pricing" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-slate-50 dark:bg-[#070E18] relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] dark:bg-[#0E1A2C] text-white text-xs font-black uppercase tracking-wider border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Qidmadaha & Xirmooyinka' : 'Affordable & Transparent Pricing'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] dark:text-white tracking-tight">
            {lang === 'so' ? (
              <>
                Dooro Xirmada <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Kugu Habboon</span> ee Madarasadda
              </>
            ) : (
              <>
                Flexible Plans for <span className="text-[#0B192C] dark:text-white underline decoration-orange-500 decoration-4 underline-offset-6">Every Family</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 dark:text-slate-300 font-medium">
            {lang === 'so'
              ? 'Xirmooyin bil kasta ah ($30, $35, $40, $50/mo) iyo qorshaha sanadlaha ah ee qiimo dhimista weyn leh ($450). Bixi toos ama qaado fasal tijaabo ah oo bilaash ah.'
              : 'Affordable monthly plans ($30, $35, $40, $50/mo) plus our best-value Full Year Annual Plan ($450). Pay securely online or start with a 100% free trial.'}
          </p>

          {/* Filter Tabs (All / Monthly / Annual) */}
          <div className="pt-3 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#0B192C] dark:bg-white text-white dark:text-[#0B192C] shadow-md'
                  : 'bg-white dark:bg-[#0E1A2C] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {lang === 'so' ? 'Dhammaan Xirmooyinka (5 Plans)' : 'All 5 Plans'}
            </button>

            <button
              onClick={() => setActiveFilter('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeFilter === 'monthly'
                  ? 'bg-[#0B192C] dark:bg-white text-white dark:text-[#0B192C] shadow-md'
                  : 'bg-white dark:bg-[#0E1A2C] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {lang === 'so' ? 'Bishiiba / Monthly ($30 - $50)' : 'Monthly Plans ($30 - $50)'}
            </button>

            <button
              onClick={() => setActiveFilter('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'yearly'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                  : 'bg-white dark:bg-[#0E1A2C] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-orange-500" />
              <span>{lang === 'so' ? 'Sanadle / Full Year ($450 - Save 25%)' : 'Full Year / Annual ($450 - Save 25%)'}</span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="pt-2 flex items-center justify-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mr-2">
              {lang === 'so' ? 'Lacagta (Currency):' : 'Currency:'}
            </span>
            {(['USD', 'GBP', 'EUR', 'CAD', 'SEK'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  currency === curr
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-white dark:bg-[#0E1A2C] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {curr === 'USD' ? '$ USD' : curr === 'GBP' ? '£ GBP' : curr === 'EUR' ? '€ EUR' : curr === 'CAD' ? 'C$ CAD' : 'kr SEK'}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className={`grid gap-6 max-w-7xl mx-auto ${
          filteredPlans.length === 5 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' 
            : filteredPlans.length === 4 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 max-w-xl mx-auto'
        }`}>
          {filteredPlans.map((plan, idx) => {
            const { symbol, amount } = getPrice(plan);
            const isPopular = plan.popular;
            const isAnnual = plan.isAnnual;
            const checkoutUrl = plan.checkoutUrl || getLemonSqueezyCheckoutUrl({ 
              planId: plan.id, 
              planName: plan.nameEn, 
              monthlyPrice: plan.priceUSD 
            });

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                id={`plan-${plan.id}`}
                className={`relative flex flex-col bg-white dark:bg-[#0E1A2C] rounded-3xl border-2 transition-all duration-300 ${
                  isAnnual
                    ? 'border-purple-500 dark:border-purple-500/80 shadow-xl ring-2 ring-purple-500/25 transform lg:-translate-y-1'
                    : isPopular
                      ? 'border-orange-500 shadow-2xl ring-2 ring-orange-500/30 transform lg:-translate-y-2'
                      : 'border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-orange-400 dark:hover:border-orange-400'
                }`}
              >
                {/* Badge Pill */}
                {isAnnual && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-md whitespace-nowrap flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{lang === 'so' ? plan.badgeSo || 'Best Value 💎' : plan.badgeEn || 'Best Value 💎'}</span>
                  </div>
                )}
                {!isAnnual && isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-orange-500 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                    {lang === 'so' ? 'Ugu Caansan ⭐' : 'Most Popular ⭐'}
                  </div>
                )}

                <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                  <h3 className="text-base sm:text-lg font-black text-[#0B192C] dark:text-white mb-1">
                    {lang === 'so' ? plan.nameSo : plan.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 min-h-[34px] font-medium leading-relaxed">
                    {lang === 'so' ? plan.subtitleSo : plan.subtitleEn}
                  </p>

                  {/* Price display */}
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#0B192C] dark:text-white">
                      {symbol}{amount}
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      {isAnnual 
                        ? (lang === 'so' ? '/ Sanadkii (Hal mar)' : '/ Year (Single)') 
                        : (lang === 'so' ? '/ Bishii' : '/ Month')}
                    </span>
                  </div>

                  {/* Duration & Days pill */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className={`inline-flex items-center text-[11px] font-black px-2.5 py-1 rounded-lg border ${
                      isAnnual
                        ? 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/50'
                        : 'text-[#0B192C] dark:text-orange-400 bg-orange-100 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50'
                    }`}>
                      {lang === 'so' ? plan.durationPerClassSo : plan.durationPerClassEn}
                    </span>
                    
                    {plan.savingTextSo && (
                      <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/50">
                        {lang === 'so' ? plan.savingTextSo : plan.savingTextEn}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features list */}
                <div className="p-5 sm:p-6 flex-1 space-y-3">
                  <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {lang === 'so' ? 'Waxyaabaha ay Ka Kooban tahay:' : 'Plan Includes:'}
                  </span>

                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {(lang === 'so' ? plan.featuresSo : plan.featuresEn).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isAnnual ? 'text-purple-600 dark:text-purple-400' : 'text-orange-500'}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action buttons (Opens registration form first with selected plan) */}
                <div className="p-5 sm:p-6 pt-0 mt-auto space-y-2.5">
                  <button
                    id={`btn-select-plan-${plan.id}`}
                    type="button"
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isAnnual
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-600/30'
                        : isPopular
                          ? 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white shadow-orange-500/30'
                          : 'bg-[#0B192C] dark:bg-orange-500 hover:bg-slate-800 dark:hover:bg-orange-600 text-white'
                    }`}
                  >
                    <span>
                      {isAnnual
                        ? (lang === 'so' ? 'Dooro Qorshaha Sanadlaha ($450)' : 'Select Annual Plan ($450)')
                        : (lang === 'so' ? `Dooro Qorshahan ($${plan.priceUSD}/mo)` : `Select Plan ($${plan.priceUSD}/mo)`)}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {lang === 'so' ? '✓ Buuxi foomka • Tijaabo ama Bixin toos ah' : '✓ Fill form first • Free trial or direct pay'}
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Verified & Security Banner */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1A2C] border-2 border-slate-200 dark:border-slate-700/80 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-orange-500 shrink-0" />
            <div>
              <div className="text-slate-900 dark:text-white font-black text-xs">
                {lang === 'so' ? '100% Fasalka Tijaabada oo Bilaash ah' : '100% Free Trial Guarantee'}
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-[11px] font-medium mt-0.5">
                {lang === 'so'
                  ? 'Waxaad kaloo qaadan kartaa fasal tijaabo ah ka hor inta aadan go’aansan qorshe kasta.'
                  : 'You can test the teacher with zero payment risk before committing to any schedule.'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1A2C] border-2 border-slate-200 dark:border-slate-700/80 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3 shadow-sm">
            <Lock className="w-6 h-6 text-emerald-500 shrink-0" />
            <div>
              <div className="text-slate-900 dark:text-white font-black text-xs flex items-center gap-1.5">
                <span>{lang === 'so' ? 'Lacag Bixin Toos ah oo Sugan' : 'Secure Online Payment'}</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-black">256-bit SSL</span>
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-[11px] font-medium mt-0.5">
                {lang === 'so'
                  ? 'Dhammaan 5-ta qorshe waxaa toos loogu bixin karaa Visa, Mastercard, Apple Pay & Google Pay.'
                  : 'All 5 plans are processed securely via Visa, Mastercard, Apple Pay & Google Pay.'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

