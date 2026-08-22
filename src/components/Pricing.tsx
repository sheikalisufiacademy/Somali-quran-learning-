import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, PricingPlan } from '../types';
import { PRICING_PLANS } from '../data/academyData';

interface PricingProps {
  lang: Language;
  onSelectPlan: (planId: string) => void;
}

type Currency = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'SEK';

export const Pricing: React.FC<PricingProps> = ({ lang, onSelectPlan }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const getPrice = (plan: PricingPlan) => {
    switch (currency) {
      case 'GBP': return { symbol: '£', amount: plan.priceGBP };
      case 'EUR': return { symbol: '€', amount: plan.priceEUR };
      case 'CAD': return { symbol: 'C$', amount: plan.priceCAD };
      case 'SEK': return { symbol: 'kr', amount: plan.priceSEK };
      default: return { symbol: '$', amount: plan.priceUSD };
    }
  };

  return (
    <motion.section 
      id="pricing" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-slate-50 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#0B192C] text-white text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Qidmadaha & Xirmooyinka' : 'Affordable & Transparent Pricing'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
            {lang === 'so' ? (
              <>
                Dooro Xirmada <span className="text-[#0B192C] underline decoration-orange-500 decoration-4 underline-offset-6">Kugu Habboon</span> ee Madarasadda
              </>
            ) : (
              <>
                Flexible Plans for <span className="text-[#0B192C] underline decoration-orange-500 decoration-4 underline-offset-6">Every Family</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-700 font-medium">
            {lang === 'so'
              ? 'Qiimo jaban oo ku habboon qoysaska qurbaha ($30, $40, $45/bishii). Fasalka tijaabada ah waa bilaash.'
              : 'Affordable monthly plans with certified scholars, no admission fees, and full schedule flexibility.'}
          </p>

          {/* Currency Switcher */}
          <div className="pt-4 flex items-center justify-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-700 mr-2">
              {lang === 'so' ? 'Lacagta (Currency):' : 'Currency:'}
            </span>
            {(['USD', 'GBP', 'EUR', 'CAD', 'SEK'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  currency === curr
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {curr === 'USD' ? '$ USD' : curr === 'GBP' ? '£ GBP' : curr === 'EUR' ? '€ EUR' : curr === 'CAD' ? 'C$ CAD' : 'kr SEK'}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, idx) => {
            const { symbol, amount } = getPrice(plan);
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                id={`plan-${plan.id}`}
                className={`relative flex flex-col bg-white rounded-3xl border-2 transition-all duration-300 ${
                  isPopular
                    ? 'border-orange-500 shadow-2xl ring-2 ring-orange-500/30 transform lg:-translate-y-2'
                    : 'border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-400'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                    {lang === 'so' ? 'Ugu Caansan (Most Popular) ⭐' : 'Most Popular ⭐'}
                  </div>
                )}

                <div className="p-6 pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-black text-[#0B192C] mb-1">
                    {lang === 'so' ? plan.nameSo : plan.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 min-h-[32px] font-medium">
                    {lang === 'so' ? plan.subtitleSo : plan.subtitleEn}
                  </p>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#0B192C]">
                      {symbol}{amount}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      {lang === 'so' ? '/ Bishii' : '/ Month'}
                    </span>
                  </div>

                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-black text-[#0B192C] bg-orange-100 px-3 py-1 rounded-lg border border-orange-200">
                    <span>{lang === 'so' ? plan.durationPerClassSo : plan.durationPerClassEn}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="p-6 flex-1 space-y-3">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                    {lang === 'so' ? 'Waxyaabaha ay Ka Kooban tahay:' : 'Plan Includes:'}
                  </span>

                  <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                    {(lang === 'so' ? plan.featuresSo : plan.featuresEn).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <div className="p-6 pt-0 mt-auto">
                  <button
                    id={`btn-select-plan-${plan.id}`}
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white shadow-md shadow-orange-500/30'
                        : 'bg-[#0B192C] hover:bg-orange-500 text-white shadow-xs'
                    }`}
                  >
                    <span>{lang === 'so' ? 'Dooro Qorshahan' : 'Choose This Plan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Guarantee Note */}
        <div className="mt-12 max-w-2xl mx-auto text-center p-4 rounded-2xl bg-white border-2 border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-3 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
          <span>
            {lang === 'so'
              ? 'Dhammaan qorshayaasha waxa ku jira fasal tijaabo ah oo bilaash ah. Lacag bixin ma jirto ilaa aad 100% ku qanacdo.'
              : 'Every plan comes with a 100% free trial class. You only pay after you are completely satisfied with the teacher.'}
          </span>
        </div>

      </div>
    </motion.section>
  );
};
