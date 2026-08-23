import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, ChevronDown, Check, X } from 'lucide-react';
import { COUNTRIES, CountryInfo } from '../data/countries';
import { Language } from '../types';

interface CountrySelectorProps {
  selectedCountry: CountryInfo | null;
  onSelectCountry: (country: CountryInfo) => void;
  lang: Language;
  hasError?: boolean;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onSelectCountry,
  lang,
  hasError
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredCountries = COUNTRIES.filter((c) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const nameMatch = c.name.toLowerCase().includes(query);
    const soMatch = c.nameSo ? c.nameSo.toLowerCase().includes(query) : false;
    const dialMatch = c.dialCode.toLowerCase().includes(query);
    const codeMatch = c.code.toLowerCase().includes(query);
    return nameMatch || soMatch || dialMatch || codeMatch;
  });

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id="btn-country-selector"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all font-medium text-sm ${
          hasError
            ? 'border-red-500 bg-red-50/30 text-red-900 dark:text-red-300 ring-2 ring-red-200 dark:ring-red-900/50'
            : isOpen
            ? 'border-orange-500 bg-white dark:bg-slate-900 ring-2 ring-orange-500/20'
            : selectedCountry
            ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[#0B192C] dark:text-white hover:border-slate-400 dark:hover:border-slate-600'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {selectedCountry ? (
            <>
              <span className="text-xl shrink-0 leading-none">{selectedCountry.flag}</span>
              <span className="truncate font-bold text-[#0B192C] dark:text-white">
                {lang === 'so' && selectedCountry.nameSo ? selectedCountry.nameSo : selectedCountry.name}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-black shrink-0">
                {selectedCountry.dialCode}
              </span>
            </>
          ) : (
            <>
              <Globe className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-400 dark:text-slate-500 font-semibold text-xs sm:text-sm">
                {lang === 'so' ? 'Dooro Waddankaaga (Guji halkan)...' : 'Select your Country (Click here)...'}
              </span>
            </>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
      </button>

      {/* Dropdown Menu with Search */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#0E1A2C] rounded-2xl border-2 border-orange-500 shadow-2xl overflow-hidden animate-fadeIn">
          
          {/* Search Header */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'so' ? 'Qor magaca waddanka ama koodhka...' : 'Search country or dial code...'}
                className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-1.5 px-1">
              <span>{filteredCountries.length} {lang === 'so' ? 'waddan ayaa la helay' : 'countries found'}</span>
              <span>{lang === 'so' ? 'Aduunka oo dhan' : 'Worldwide list'}</span>
            </div>
          </div>

          {/* Country list items */}
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 p-1">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'so' ? 'Ma jiro waddan ku habboon baaritaankaaga.' : 'No countries match your search.'}
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = selectedCountry?.code === c.code;
                return (
                  <button
                    type="button"
                    key={c.code}
                    onClick={() => {
                      onSelectCountry(c);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2.5 rounded-xl text-left flex items-center justify-between transition-colors text-xs sm:text-sm cursor-pointer ${
                      isSelected
                        ? 'bg-orange-500 text-white font-black'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0B192C] dark:text-slate-200 font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0 leading-none">{c.flag}</span>
                      <span className="truncate">
                        {lang === 'so' && c.nameSo ? c.nameSo : c.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {c.dialCode}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>

        </div>
      )}
    </div>
  );
};
