import React, { useState, useRef } from 'react';
import { 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  Info,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { Language } from '../types';
import { TAJWEED_SAMPLE_VERSES, NOORANI_LETTERS } from '../data/academyData';

interface TajweedAudioDemoProps {
  lang: Language;
  onOpenRegister: () => void;
}

export const TajweedAudioDemo: React.FC<TajweedAudioDemoProps> = ({ lang, onOpenRegister }) => {
  const [activeTab, setActiveTab] = useState<'tajweed' | 'alphabet'>('tajweed');
  const [selectedVerseIndex, setSelectedVerseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(NOORANI_LETTERS[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeVerse = TAJWEED_SAMPLE_VERSES[selectedVerseIndex];

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio playback prevented:', err);
        setIsPlaying(false);
      });
    }
  };

  const handleVerseChange = (index: number) => {
    setSelectedVerseIndex(index);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section id="quran-interactive" className="py-20 bg-[#0B192C] text-white relative overflow-hidden">
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-5 pattern-dots-navy pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-orange-400 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'so' ? 'Tijaabi Tayada Waxbaridda' : 'Interactive Learning Demo'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {lang === 'so' ? (
              <>
                Barashada <span className="text-orange-400">Tajwiidka</span> & <span className="text-white">Qaacidada Nuuraaniyada</span>
              </>
            ) : (
              <>
                Master <span className="text-orange-400">Tajweed Rules</span> & <span className="text-white">Noorani Qaida</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 font-medium">
            {lang === 'so'
              ? 'Daawo habka casriga ah ee aan ardayda ugu dhigno codadka xarfaha, xeerarka Tajwiidka iyo akhrinta tooska ah.'
              : 'Experience how our students learn precise letter articulation (Makharij) and applied Tajweed rules interactively.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('tajweed')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
                activeTab === 'tajweed'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>{lang === 'so' ? 'Tajwiidka & Dhagaysiga Qur’aanka' : 'Tajweed & Quran Audio Recitation'}</span>
            </button>

            <button
              onClick={() => setActiveTab('alphabet')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
                activeTab === 'alphabet'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'so' ? 'Qaacidada Nuuraaniyada (Alifbaada)' : 'Noorani Qaida Alphabet'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: TAJWEED & AUDIO RECITER */}
        {activeTab === 'tajweed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Surah Selector & Verses */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-700 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              
              {/* Surah Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {TAJWEED_SAMPLE_VERSES.map((verse, idx) => (
                  <button
                    key={verse.id}
                    onClick={() => handleVerseChange(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      selectedVerseIndex === idx
                        ? 'bg-orange-500 text-white font-black shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {lang === 'so' ? verse.surahNameSo : verse.surahNameEn}
                  </button>
                ))}
              </div>

              {/* Quran Text Card */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center relative mb-6">
                <span className="text-[11px] font-black text-orange-400 uppercase tracking-widest block mb-3">
                  {lang === 'so' ? 'Qoraalka Qur’aanka Kariimka' : 'Holy Quran Script with Tajweed'}
                </span>
                
                <p className="font-quran text-2xl sm:text-3xl md:text-4xl text-amber-100 leading-loose sm:leading-loose py-2 tracking-wide font-normal">
                  {activeVerse.arabicText}
                </p>

                {/* Translation */}
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-300 text-left leading-relaxed font-medium">
                  <span className="font-bold text-orange-400 block mb-1">
                    {lang === 'so' ? 'Micnaha (Af-Soomaali):' : 'English Meaning:'}
                  </span>
                  {lang === 'so' ? activeVerse.somaliMeaning : activeVerse.englishMeaning}
                </div>
              </div>

              {/* Audio Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayPause}
                    className="w-12 h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                    aria-label={isPlaying ? 'Pause Recitation' : 'Play Recitation'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                  </button>

                  <div>
                    <span className="text-xs text-slate-400 block font-bold">{lang === 'so' ? 'Codka Qaariga:' : 'Reciter:'}</span>
                    <span className="text-sm font-black text-white">{activeVerse.reciterName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
                  <Volume2 className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span>{isPlaying ? (lang === 'so' ? 'Waa la dhagaysanayaa...' : 'Playing Audio...') : (lang === 'so' ? 'Riix si aad u dhagaysato' : 'Click to Listen')}</span>
                </div>

                <audio
                  ref={audioRef}
                  src={activeVerse.audioUrl}
                  onEnded={handleAudioEnded}
                  preload="metadata"
                />
              </div>

            </div>

            {/* Right: Tajweed Breakdown Explanation */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
              
              <div className="flex items-center gap-2 text-orange-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-lg font-black text-white">
                  {lang === 'so' ? 'Xeerarka Tajwiidka ee Aayaddan' : 'Tajweed Rules in This Verse'}
                </h3>
              </div>

              <div className="space-y-3">
                {activeVerse.tajweedHighlights.map((item, hIdx) => (
                  <div key={hIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-xs font-black text-orange-400 uppercase tracking-wide">
                        {item.rule}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 pl-4 leading-relaxed font-medium">
                      {lang === 'so' ? item.descriptionSo : item.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-orange-500/30 text-xs text-slate-300 space-y-3">
                <p className="font-bold text-white">
                  {lang === 'so' 
                    ? 'Ma doonaysaa in ilmahaagu uu Qur’aanka ugu akhriyo Tajwiidka heerkan oo kale ah?'
                    : 'Want your child to recite the Holy Quran with this level of beauty and precision?'}
                </p>
                <button
                  onClick={onOpenRegister}
                  className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>{lang === 'so' ? 'Ka Qaybgal Fasalka Bilaashka ah' : 'Join 100% Free Trial Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: NOORANI QAIDA ALPHABET EXPLORER */}
        {activeTab === 'alphabet' && (
          <div className="bg-slate-900/90 border border-slate-700 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="text-xl font-black text-white mb-1">
                {lang === 'so' ? 'Xarfaha Qaacidada Nuuraaniyada ee Carabiga' : 'Noorani Qaida Arabic Alphabet Letters'}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {lang === 'so' 
                  ? 'Guji xaraf kasta si aad u aragto magaciisa, dhawaaqiisa saxda ah iyo tusaale eray ah.'
                  : 'Click on any letter to explore its name, correct pronunciation sound, and example word.'}
              </p>
            </div>

            {/* Letter Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 gap-2.5 sm:gap-3 mb-8">
              {NOORANI_LETTERS.map((item, idx) => {
                const isSelected = selectedLetter.arabic === item.arabic;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedLetter(item)}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-400 font-black shadow-lg scale-105'
                        : 'bg-slate-950 text-white border-slate-800 hover:bg-slate-800 hover:border-orange-500'
                    }`}
                  >
                    <span className="font-quran text-2xl sm:text-3xl leading-none mb-1">
                      {item.arabic}
                    </span>
                    <span className="text-[10px] font-bold opacity-90">
                      {lang === 'so' ? item.nameSo : item.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Letter Spotlight Card */}
            <div className="max-w-xl mx-auto p-6 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-4 shadow-xl">
              <div className="flex items-center justify-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-quran text-5xl font-black shadow-lg">
                  {selectedLetter.arabic}
                </div>
                <div className="text-left space-y-1">
                  <span className="text-xs text-orange-400 font-black uppercase tracking-wider">
                    {lang === 'so' ? 'Magaca Xarafka:' : 'Letter Name:'}
                  </span>
                  <h4 className="text-2xl font-black text-white">
                    {lang === 'so' ? selectedLetter.nameSo : selectedLetter.nameEn} ({selectedLetter.sound})
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    <span className="text-orange-400 font-bold">{lang === 'so' ? 'Tusaale:' : 'Example:'} </span>
                    <span className="font-arabic text-base text-white font-bold mr-1">{selectedLetter.example}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
                <span>
                  {lang === 'so' 
                    ? 'Manhajkeena Qaacidada Nuuraaniyada waxa lagu bartaa 2 ilaa 3 bilood.'
                    : 'Our Noorani Qaida course completes all letter rules in 2-3 months.'}
                </span>
                <button
                  onClick={onOpenRegister}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl transition-colors shrink-0 shadow-md"
                >
                  {lang === 'so' ? 'Bilow Koorsada Nuuraaniyada' : 'Enroll in Noorani Qaida'}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
