import React from 'react';
import { 
  BookOpen, 
  Target, 
  Heart, 
  Compass, 
  Lightbulb, 
  CheckCircle2, 
  Users, 
  Award, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  GraduationCap,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

export type AboutTopicId = 'our-story' | 'methodology' | 'approach' | 'why-we-exist' | 'philosophy';

interface SingleAboutPageProps {
  topicId: AboutTopicId;
  lang: Language;
  onSelectTopic: (topicId: AboutTopicId) => void;
  onBack: () => void;
  onOpenRegister: () => void;
}

interface AboutTopicContent {
  id: AboutTopicId;
  title: string;
  badge: string;
  subtitle: string;
  leadParagraph: string;
  deepParagraphs: string[];
  keyHighlights: { title: string; desc: string }[];
  keyStats: { label: string; value: string }[];
  quote?: { text: string; author: string };
}

const ABOUT_TOPICS_DATA: Record<AboutTopicId, AboutTopicContent> = {
  'our-story': {
    id: 'our-story',
    title: 'Our Story & Founding Vision',
    badge: 'About Us',
    subtitle: 'Connecting Muslim families worldwide with verified Quranic scholars since day one.',
    leadParagraph: 'Baro Quran Academy was founded to connect Muslim families and students across the globe with certified Quran scholars. We recognized that finding qualified, patient, and bilingual Quran instructors with verified Ijazah Sanad credentials is an essential priority for Muslim households everywhere.',
    deepParagraphs: [
      'What began with a modest cohort of dedicated teachers has grown into a premier international online Quran and Islamic studies academy trusted by over 500+ families across 40+ countries worldwide.',
      'Our foundation rests on three unshakeable pillars: authentic scholarship, child-centered pedagogies, and reliable digital infrastructure that makes 1-on-1 personalized learning effortless for every home.'
    ],
    keyHighlights: [
      {
        title: 'Continuous Ijazah Sanad Chains',
        desc: 'Every teacher on our platform holds an unbroken chain of recitation tracing directly to the Prophet Muhammad (peace be upon him).'
      },
      {
        title: 'Global Reach & Cultural Care',
        desc: 'Our teachers understand the bilingual, cultural, and educational dynamics of diverse youth worldwide, making lessons engaging, relatable, and inspiring.'
      },
      {
        title: 'Safe & Transparent Classrooms',
        desc: 'All virtual classrooms are secure, structured, and open for parents to review and monitor anytime.'
      }
    ],
    keyStats: [
      { label: 'Graduated Students', value: '569+' },
      { label: 'Countries Served', value: '40+' },
      { label: 'Certified Scholars', value: '13' },
      { label: 'Parent Satisfaction', value: '100%' }
    ],
    quote: {
      text: '"The best among you are those who learn the Quran and teach it to others."',
      author: 'Prophet Muhammad (Sahih Al-Bukhari)'
    }
  },

  'methodology': {
    id: 'methodology',
    title: '1-on-1 Interactive Teaching Methodology',
    badge: 'Teaching Methodology',
    subtitle: 'A structured, phonetic, and interactive approach designed for rapid retention and lifelong love for the Quran.',
    leadParagraph: 'At Baro Quran Academy, our teaching methodology goes far beyond rote memorization. We employ modern pedagogical techniques incorporating interactive digital Mushafs, real-time phonetic feedback, and adaptive pacing to fit each student’s unique learning rhythm.',
    deepParagraphs: [
      'Each 30-to-45-minute lesson is strictly 1-on-1, eliminating distractions and ensuring the teacher dedicates 100% of their attention to correcting pronunciation, teaching applied Tajweed rules, and reviewing past memorization.',
      'We combine classical Islamic teaching rigor with modern learning milestones: students master the Noorani Qaida first, then transition smoothly into Juz Amma with applied Tajweed, followed by full Hifz tracks accompanied by weekly parent progress updates.'
    ],
    keyHighlights: [
      {
        title: 'Makharij & Voice Resonance Correction',
        desc: 'Teachers provide real-time audio and visual correction for throat, tongue, and lip articulation points.'
      },
      {
        title: 'Daily Sabaq, Sabqi, and Manzil Structure',
        desc: 'Our memorization system balances new lessons (Sabaq), recent revisions (Sabqi), and distant revisions (Manzil) for permanent retention.'
      },
      {
        title: 'Periodic Formal Assessments',
        desc: 'Every completed level includes a formal evaluation and accredited certificate issued by our academic board.'
      }
    ],
    keyStats: [
      { label: 'Session Type', value: '100% 1-on-1' },
      { label: 'Lesson Length', value: '30-45 Mins' },
      { label: 'Teacher Ratio', value: '1 : 1' },
      { label: 'Progress Tracking', value: 'Weekly' }
    ]
  },

  'approach': {
    id: 'approach',
    title: 'Student-Centered & Family-First Approach',
    badge: 'Our Approach',
    subtitle: 'Nurturing confidence and love for the Quran through patience, encouragement, and transparent parental partnership.',
    leadParagraph: 'We believe that true Quranic education flourishes in an atmosphere of warmth, respect, and encouragement. Our educators are trained not only in Islamic sciences, but also in positive reinforcement techniques that keep students eager for their next class.',
    deepParagraphs: [
      'We recognize parents as our primary partners. Through direct WhatsApp updates, detailed weekly report cards, and open communication channels, parents always stay fully informed of their child’s Quranic milestones.',
      'Whether you are looking for male or female teachers, weekend-only schedules, or intense daily tracks, our team accommodates your family’s routine seamlessly.'
    ],
    keyHighlights: [
      {
        title: 'Positive Reinforcement',
        desc: 'Zero harshness or pressure. We cultivate genuine love for the words of Allah through praise and gentle corrections.'
      },
      {
        title: 'Male & Female Scholar Preference',
        desc: 'Families can select certified female teachers for daughters and sisters, or male scholars according to preference.'
      },
      {
        title: 'Transparent Parent Portal & WhatsApp',
        desc: 'Direct weekly reports sent straight to your phone tracking attendance, fluency scores, and verses mastered.'
      }
    ],
    keyStats: [
      { label: 'Weekly Reports', value: '100%' },
      { label: 'Teacher Options', value: 'Male & Female' },
      { label: 'Parent Rating', value: '4.98 / 5' },
      { label: 'Rescheduling', value: 'Flexible' }
    ]
  },

  'why-we-exist': {
    id: 'why-we-exist',
    title: 'Why We Exist & Community Mission',
    badge: 'Mission & Purpose',
    subtitle: 'Preserving Islamic identity and Quranic excellence across generations worldwide.',
    leadParagraph: 'In an increasingly fast-paced digital world, preserving a child’s Islamic identity and Quranic literacy is among the greatest responsibilities of Muslim parents. Baro Quran Academy exists to make authentic Islamic knowledge easily accessible, structured, and affordable for every family regardless of geography.',
    deepParagraphs: [
      'Many families and students across the globe face scheduling conflicts, lack of convenient local Quranic centers, or absence of tailored 1-on-1 attention. We solve these challenges by bringing world-class scholars directly into your home.',
      'Our mission extends beyond reading: we incorporate authentic Hadith, noble manners (Adab), and Prophet stories into our curriculum to raise confident, well-rounded Muslim youth.'
    ],
    keyHighlights: [
      {
        title: 'Overcoming Geographical Barriers',
        desc: 'Access top-tier Quran scholars from the comfort and safety of your own living room anywhere in the world.'
      },
      {
        title: 'Character & Tarbiyah Integration',
        desc: 'Nurturing noble Islamic values, daily Sunnah Duas, and moral character alongside Quran memorization.'
      },
      {
        title: 'Affordable, Transparent Pricing',
        desc: 'High-quality education accessible to every family with no hidden fees and risk-free trial classes.'
      }
    ],
    keyStats: [
      { label: 'Global Families', value: '500+' },
      { label: 'Global Availability', value: '24 / 7' },
      { label: 'Hidden Fees', value: '$0' },
      { label: 'Trial Cost', value: '100% Free' }
    ]
  },

  'philosophy': {
    id: 'philosophy',
    title: 'Our Learning Philosophy',
    badge: 'Philosophy',
    subtitle: 'Quality over speed: mastering Quranic recitation with understanding and devotion.',
    leadParagraph: 'Our philosophy is rooted in the Quranic verse: "And recite the Quran with measured, rhythmic recitation." (Surah Al-Muzzammil, 73:4). We prioritize precise Tajweed, beautiful articulation, and spiritual connection over hurried completion.',
    deepParagraphs: [
      'A student who recites one Surah with flawless Tajweed and understands its essence has gained a deeper foundation than one who rushes through without retention. We take pride in cultivating solid foundations that last a lifetime.',
      'By making each milestone achievable and rewarding, we help students build a joyful, lifelong relationship with the Book of Allah.'
    ],
    keyHighlights: [
      {
        title: 'Precision Before Speed',
        desc: 'Ensuring correct pronunciation and applied Tajweed before advancing to new Surahs.'
      },
      {
        title: 'Lifelong Quranic Connection',
        desc: 'Instilling sincere love and respect for the Holy Quran as a guiding light throughout life.'
      },
      {
        title: 'Customized Learning Paths',
        desc: 'No two students learn at the same pace; our 1-on-1 curriculum adapts entirely to each student’s capacity.'
      }
    ],
    keyStats: [
      { label: 'Pacing', value: 'Personalized' },
      { label: 'Focus', value: 'Precision & Adab' },
      { label: 'Retention Rate', value: '98%' },
      { label: 'Support', value: 'Dedicated' }
    ]
  }
};

const ALL_TOPICS: { id: AboutTopicId; label: string; icon: any }[] = [
  { id: 'our-story', label: 'Our Story', icon: BookOpen },
  { id: 'methodology', label: 'Teaching Methodology', icon: Target },
  { id: 'approach', label: 'Our Approach', icon: Heart },
  { id: 'why-we-exist', label: 'Why We Exist', icon: Compass },
  { id: 'philosophy', label: 'Learning Philosophy', icon: Lightbulb },
];

export const SingleAboutPage: React.FC<SingleAboutPageProps> = ({
  topicId,
  lang,
  onSelectTopic,
  onBack,
  onOpenRegister
}) => {
  const currentContent = ABOUT_TOPICS_DATA[topicId] || ABOUT_TOPICS_DATA['our-story'];

  return (
    <div className="bg-slate-50 dark:bg-[#070E18] min-h-screen pb-20 transition-colors">
      
      {/* Top Breadcrumb Header */}
      <div className="bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-orange-500" />
            <span>Back to About Overview</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="hidden sm:inline">About / </span>
            <span className="text-orange-500 font-extrabold">{currentContent.title}</span>
          </div>
        </div>
      </div>

      {/* Subtopic Selector Tabs */}
      <div className="bg-white dark:bg-[#0B192C] border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {ALL_TOPICS.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === topicId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTopic(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Banner for Topic */}
      <div className="relative bg-[#0B192C] text-white py-14 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-orange-500 text-white text-xs font-black uppercase tracking-wider shadow-md inline-block">
              {currentContent.badge}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {currentContent.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
              {currentContent.subtitle}
            </p>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800">
            {currentContent.keyStats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-2xl sm:text-3xl font-black text-orange-400 block">{stat.value}</span>
                <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Primary Narrative */}
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-800 dark:text-slate-200">
              <p className="text-base sm:text-lg font-bold leading-relaxed text-[#0B192C] dark:text-white">
                {currentContent.leadParagraph}
              </p>

              {currentContent.deepParagraphs.map((para, idx) => (
                <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                  {para}
                </p>
              ))}

              {currentContent.quote && (
                <div className="my-6 p-6 rounded-2xl bg-orange-50/70 dark:bg-orange-950/20 border-l-4 border-orange-500 italic space-y-2">
                  <p className="text-sm sm:text-base font-extrabold text-[#0B192C] dark:text-white">
                    {currentContent.quote.text}
                  </p>
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block not-italic">
                    — {currentContent.quote.author}
                  </span>
                </div>
              )}
            </div>

            {/* Core Highlights Grid */}
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] dark:text-white">
                Core Principles & Highlights
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {currentContent.keyHighlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-4"
                  >
                    <div className="p-2 rounded-xl bg-orange-500 text-white shrink-0 mt-0.5 shadow-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-black text-[#0B192C] dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Quick Action & Other Topics (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Free Trial CTA Card */}
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 border-2 border-orange-500 shadow-xl space-y-6 sticky top-36">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 font-black text-xs uppercase tracking-wider inline-block">
                  Get Started
                </span>
                <h3 className="text-2xl font-black text-[#0B192C] dark:text-white">
                  Experience Our Classes
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Evaluate our teaching style, platform, and certified instructors with a complimentary 30-minute session.
                </p>
              </div>

              <div className="space-y-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>100% Free • No Payment Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>1-on-1 Male or Female Scholars</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Flexible Global Time Slots</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenRegister}
                className="w-full py-4 text-center text-sm font-black text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-2xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Free Trial Class</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/251777796444?text=Hello%20Baro%20Quran%20Academy%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20methodology"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-center text-xs font-black text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>Contact Academic Advisor</span>
              </a>
            </div>

            {/* Other About Sections Card */}
            <div className="bg-white dark:bg-[#0E1A2C] rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-sm font-black text-[#0B192C] dark:text-white uppercase tracking-wider">
                Explore More About Us
              </h4>

              <div className="space-y-2">
                {ALL_TOPICS.filter((t) => t.id !== topicId).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectTopic(item.id)}
                      className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-orange-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 group-hover:bg-orange-500 group-hover:text-white text-slate-700 dark:text-slate-300 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
