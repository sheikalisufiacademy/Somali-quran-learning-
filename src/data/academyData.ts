import { Course, PricingPlan, Teacher, Testimonial, FaqItem } from '../types';
import qaidaImg from '../assets/images/noorani_qaida_online_class_1787416190508.jpg';
import tajweedImg from '../assets/images/tajweed_mastery_classroom_1787416204441.jpg';
import hifzImg from '../assets/images/quran_hifz_circle_1787416218745.jpg';
import islamicStudiesImg from '../assets/images/islamic_studies_books_1787416231030.jpg';
import sistersMothersImg from '../assets/images/sisters_mothers_quran_class_1787484480960.jpg';

export const COURSES_DATA: Course[] = [
  {
    id: 'qaacida-nuuraaniya',
    titleSo: 'Qaacidada Nuuraaniyada & Higgaadda Aasaasiga ah',
    titleEn: 'Noorani Qaida & Arabic Alphabet Basics',
    categorySo: 'Heerka Koowaad (Aasaas)',
    categoryEn: 'Beginner Level',
    descriptionSo: 'Barashada xarfaha afka Carabiga, makhariijta saxda ah, shaqallada (Fatxa, Kasra, Damma), Sujuunka, Shaddada, iyo isku xirka xarfaha si ardaygu u awoodo akhrinta Qur’aanka Kariimka.',
    descriptionEn: 'Learn the Arabic alphabet from scratch, correct pronunciation (Makharij), vowels (Fatha, Kasra, Damma), Sukoon, Shaddah, and combining letters to build fluent Quran reading skills.',
    fullOverviewSo: 'Koorsada Qaacidada Nuuraaniyada waa aasaaska koowaad ee waxbarashada Qur’aanka Kariimka. Waxaa loogu talagalay carruurta yaryar iyo dadka waaweyn ee raba inay bilaabaan barashada akhriska xarfaha Carabiga. Ardaygu wuxuu si qoto-dheer u baranayaa aqoonsiga xarfaha, makhariijta saxda ah ee codadka, shaqallada (Fatxo, Kasro, Dammo), sujuunka, shaddada, iyo isku-xirka ereyada Qur’aanka Kariimka iyadoo cashar kasta 1-on-1 loogu sharxayo.',
    fullOverviewEn: 'Noorani Qaida is the fundamental stepping stone for mastering Quranic recitation. Designed specifically for kids and beginners, certified teachers guide students 1-on-1 through letter recognition, articulation points, and vowel combinations with interactive digital tools.',
    iconName: 'BookOpen',
    imageUrl: qaidaImg,
    imageAlt: 'Barashada Qaacidada Nuuraaniyada iyo Higaada Online',
    levelSo: 'Kuwa Hadda Bilaabaya',
    levelEn: 'Beginner',
    ageGroupSo: 'Carruurta (4-12 jir) & Dadka Waaweyn',
    ageGroupEn: 'Kids (4-12 yrs) & Adults',
    durationSo: '2 - 3 Bilood',
    durationEn: '2 - 3 Months',
    recommendedScheduleSo: '3 ilaa 5 Maalmood todobaadkii (30 daqiiqo kalfadhigiiba)',
    recommendedScheduleEn: '3 to 5 Days a week (30 mins per session)',
    learningOutcomesSo: [
      'Aqoonsiga iyo dhawaaqa 28-ka xaraf ee Carabiga oo makhariij sax ah leh',
      'Fahamka iyo akhriska shaqallada (Fatxa, Kasra, Dammah)',
      'Akhriska xarfaha isku xiran iyo ereyada Qur’aanka Kariimka',
      'Awood u yeelashada inuu ardaygu toos uga bilaabo Mus-xafka (Juz Camma)'
    ],
    learningOutcomesEn: [
      'Mastery of all 28 Arabic letters with correct phonetic points',
      'Flawless recognition of vowels, Tanween, Sukoon, and Shaddah',
      'Ability to blend letters into full Quranic words',
      'Smooth transition into reading directly from the Holy Quran'
    ],
    syllabusSo: [
      'Xarfaha Carabiga iyo dhawaaqooda saxda ah (Makharij)',
      'Shaqallada gaagaaban: Fatxa, Kasra, Dammah',
      'Xarfaha Maddka (Madd Asli): Alif, Waaw, Yaa',
      'Tanwiinka (Labo fatxa, labo kasra, labo damma)',
      'Sujuunka, Shaddada iyo Isku-xirka ereyada Qur’aanka',
      'Tijaabooyin toos ah oo lagu tijaabinayo akhrinta'
    ],
    syllabusEn: [
      'Arabic Alphabet letters & correct pronunciation points',
      'Short vowels: Fatha, Kasra, Dammah',
      'Natural elongation letters (Madd Asli)',
      'Tanween (Double vowels)',
      'Sukoon, Shaddah & connecting Quranic words',
      'Live practical reading assessments'
    ],
    featuresSo: [
      'Casharro 1-on-1 ah oo qof walba goonidiisa wax loo baro',
      'Tababar maalinle ah oo ku saabsan makhariijta saxda ah',
      'Shahaadada dhammaystirka Qaacidada Nuuraaniyada'
    ],
    featuresEn: [
      '1-on-1 personalized private sessions',
      'Daily pronunciation & articulation training',
      'Certificate of completion for Noorani Qaida'
    ],
    startingPriceUSD: 30,
    badge: 'Essential for Beginners',
    popular: true
  },
  {
    id: 'tajweed-recitation',
    titleSo: 'Tajwiidka Saxda ah & Akhrinta Suubban ee Qur’aanka',
    titleEn: 'Tajweed Mastery & Fluent Quran Recitation',
    categorySo: 'Heerka Dhexe & Sare',
    categoryEn: 'Intermediate & Advanced',
    descriptionSo: 'Koorsadan waxaad ku baranaysaa dhammaan xeerarka Tajwiidka cilmiyan iyo ficil ahaanba (Axkaamta Nuun Saakina, Meem Saakina, Maddadka, Qalqalaha) si aad Qur’aanka ugu akhrido sida loo soo dajiyay.',
    descriptionEn: 'Master all the theoretical and practical rules of Tajweed (Noon Sakinah, Meem Sakinah, Mudood, Qalqalah, Sifaat) to recite the Holy Quran with beautified fluency and precision.',
    fullOverviewSo: 'Koorsada Tajwiidka waxay ardayga baraysaa xeerarka qiraa’ada suubban iyo sidii uu Qur’aanka ugu akhrin lahaa si sax ah oo qurux badan. Waxaa si faahfaahsan loogu baranayaa dhammaan axkaamta Tajwiidka sida Nuun Saakina, Tanwiin, Meem Saakina, Maddadka kala duwan, Qalqalaha, iyo Makhariijta xarfaha culus iyo kuwa khafiifka ah, iyadoo macallinku toos u saxayo arday kasta akhriskiisa.',
    fullOverviewEn: 'Master the rules of Tajweed with interactive live digital presentations showing articulation diagrams, phonetic rules, and continuous recitation correction from certified Ijazah holders.',
    iconName: 'Sparkles',
    imageUrl: tajweedImg,
    imageAlt: 'Barashada Tajwiidka iyo Akhriska Quraanka Online',
    levelSo: 'Dhexe / Sare',
    levelEn: 'Intermediate / Advanced',
    ageGroupSo: 'Dhammaan Da’aha (Carruur & Waaweyn)',
    ageGroupEn: 'All Ages (Kids & Adults)',
    durationSo: '3 - 6 Bilood',
    durationEn: '3 - 6 Months',
    recommendedScheduleSo: '3 ilaa 4 Maalmood todobaadkii (40 daqiiqo kalfadhigiiba)',
    recommendedScheduleEn: '3 to 4 Days a week (40 mins per session)',
    learningOutcomesSo: [
      'Barashada dhammaan xeerarka Nuun Saakina, Tanwiin iyo Meem Saakina',
      'Fahamka iyo ku dhaqanka xeerarka Qalqalaha iyo Maddadka kala duwan',
      'Saxidda Makhariijta xarfaha culus (Tafkhiim) iyo kuwa khafiifka ah (Tarqeeq)',
      'Akhriska Qur’aanka oo leh cod qurux badan iyo qiraa’o sugan'
    ],
    learningOutcomesEn: [
      'Comprehensive grasp of Noon & Meem Sakinah rules',
      'Practical mastery of Madd extensions, Qalqalah, and Waqf/Ibtida',
      'Distinction between heavy and light Arabic letters',
      'Beautified, fluent recitation matching authentic Qira’at standards'
    ],
    syllabusSo: [
      'Axkaamta Nuun As-Saakina iyo Tanwiin (Ith-haar, Idghaam, Iqlaab, Ikhfaa)',
      'Axkaamta Meem As-Saakina (Ikhfaa Shafawi, Idghaam, Ith-haar Shafawi)',
      'Xeerarka Qalqalada iyo heerarkeeda kala duwan',
      'Qaybaha Maddadka (Madd Waajib, Jaa’iz, Laazim)',
      'Makhariijta iyo Sifaadka Xarfaha (Tafkhiim & Tarqeeq)',
      'Waqfiga iyo Ibtidaaga (Meelaha la istaago iyo meelaha laga bilaabo)'
    ],
    syllabusEn: [
      'Rules of Noon Saakin & Tanween (Izhar, Idgham, Iqlab, Ikhfa)',
      'Rules of Meem Saakin (Ikhfa Shafawi, Idgham Shafawi, Izhar Shafawi)',
      'Rules of Qalqalah & its degrees',
      'Types of Madd (Mandatory, Permissible, Compulsory)',
      'Makharij & Sifaat (Heavy & Light letters)',
      'Waqf & Ibtida (Rules of stopping and starting)'
    ],
    featuresSo: [
      'Sixitaan toos ah oo uu macallinku si gooni ah kuugu dhagaysanayo',
      'Dhagaysiga iyo ku dayashada qiraa’aadyada culimada waaweyn',
      'Shahaado Tajweed oo ay saxiixeen culimo Ijaazo leh'
    ],
    featuresEn: [
      'Live recitation correction with instant feedback',
      'Training based on authentic Qira\'at traditions',
      'Tajweed certificate signed by certified scholars'
    ],
    startingPriceUSD: 35,
    badge: 'Most Popular',
    popular: true
  },
  {
    id: 'quran-memorization-hifz',
    titleSo: 'Xifdinta Qur’aanka Kariimka (Barnaamijka Hifz-ka)',
    titleEn: 'Quran Memorization Program (Full Hifz)',
    categorySo: 'Xifdin & Muraajaco',
    categoryEn: 'Memorization & Revision',
    descriptionSo: 'Barnaamij habaysan oo maalinle iyo todobaadle ah oo ardayga ka caawinaya xifdinta Qur’aanka Kariimka oo dhan ama qaybo ka mid ah, iyadoo la raacayo qorshe muraajaco adag si aan loo iloobin.',
    descriptionEn: 'A structured, step-by-step memorization and continuous revision program tailored to help students memorize the entire Quran or selected Surahs with solid retention and zero forgetfulness.',
    fullOverviewSo: 'Barnaamijka Xifdiga Qur’aanka Kariimka waxaa loogu talagalay ardayda doonaysa inay noqdaan Xaafidul Qur’aan iyo kuwa doonaya inay xifdiyaan Suurado cayiman. Barnaamijkan wuxuu ku dhisan yahay 3 tiir oo asaas u ah xifdi adag: Sabak (Casharka cusub ee maalinlaha ah), Sabqi (Muraajacada casharradii u dambeeyay), iyo Manzil (Subcinta iyo dib-u-eegista Juz-yada hore) si uu ardaygu u yeesho xifdi sugan oo aan la iloobayn.',
    fullOverviewEn: 'Structured full Quran memorization track following classical Halaqah methods: new memorization (Sabaq), short-term retention (Sabqi), and comprehensive long-term revision (Manzil) under certified Hafiz mentors.',
    iconName: 'Award',
    imageUrl: hifzImg,
    imageAlt: 'Xifdiga iyo Subcinta Quraanka Kariimka',
    levelSo: 'Heer kasta (Laga bilaabo Juz Camma)',
    levelEn: 'All levels (From Juz Amma to 30 Juz)',
    ageGroupSo: '6 jir iyo wixii ka weyn',
    ageGroupEn: '6 years & above',
    durationSo: 'Qorshe Gaar ah (6 Bilood - 3 Sano)',
    durationEn: 'Custom Pace (6 Months - 3 Years)',
    recommendedScheduleSo: '4 ilaa 5 Maalmood todobaadkii (45 daqiiqo kalfadhigiiba)',
    recommendedScheduleEn: '4 to 5 Days a week (45 mins per session)',
    learningOutcomesSo: [
      'Xifdinta Qur’aanka Kariimka oo adag (oo aan la iloobayn)',
      'Dhisidda muraajaco joogto ah oo ardaygu kaligiis samayn karo',
      'Kalsoonida in ardaygu tujiyo salaadaha iyo Taraawiixda',
      'Shahaadada Xifdiga Qur’aanka iyo Xaflad qalinjabin heer caalami ah'
    ],
    learningOutcomesEn: [
      'Solid long-term Quranic retention with zero gaps',
      'Disciplined daily revision habits (Manzil)',
      'Confidence to lead prayers and Taraweeh',
      'Formal Hifz completion certificate & graduation recognition'
    ],
    syllabusSo: [
      'Xifdinta maalinlaha ah (Sabak cusub oo maalin kasta la qaato)',
      'Muraajacada dhaw (Sabak-para / Casharradii dhowaa)',
      'Muraajacada fog (Amukhta / Juz-yadii hore loo xifdiyay)',
      'Dhisidda kalsoonida akhrinta Salaadda dhexdeeda',
      'Xalinta meelaha isku eeg ee Qur’aanka (Mutashaabihaat)',
      'Imtixaan bil kasta ah oo lagula soconayo xifdiga ardayga'
    ],
    syllabusEn: [
      'Daily new memorization targets (Sabaq)',
      'Recent revision tracking (Sabqi / Recent Juz)',
      'Long-term continuous revision (Manzil / Amukhta)',
      'Building confidence for leading Taraweeh/Salah',
      'Mastering Mutashabihat (similar Ayahs)',
      'Monthly evaluation tests & progress reports'
    ],
    featuresSo: [
      'Jadwal maalinle ah oo loo habeeyay waqtiga ardayga',
      'Macallimiin Xaadafidiin ah oo Sanad & Ijaazo haysta',
      'Shahaadada Xifdiga Qur’aanka & Xaflad Qalinjabin'
    ],
    featuresEn: [
      'Personalized daily schedule tailored to student availability',
      'Certified Hafiz teachers with continuous Sanad chain',
      'Hifz completion certificate & graduation recognition'
    ],
    startingPriceUSD: 40,
    badge: 'Top Choice'
  },
  {
    id: 'islamic-studies-tarbiyah',
    titleSo: 'Barashada Culuumta Islaamka & Tarbiyada Carruurta',
    titleEn: 'Islamic Studies & Youth Character Building (Tarbiyah)',
    categorySo: 'Culuumta Islaamka',
    categoryEn: 'Islamic Studies',
    descriptionSo: 'Barashada aasaaska diinta Islaamka: Caqiidada saxda ah, Siirada Nebiga (NNKH), Axkaamta Salaadda iyo Daahirada (Fiqh), Ducooyinka maalinlaha ah, iyo Aadaabta wanaagsan ee Muslimka.',
    descriptionEn: 'Essential Islamic foundational education covering correct Aqeedah, Seerah of the Prophet (PBUH), Fiqh of Salah and Taharah, daily Duas, and cultivating noble Islamic morals and manners.',
    fullOverviewSo: 'Koorsada Culuumta Islaamka iyo Tarbiyada waxay ardayda baraysaa aasaaska diinta Islaamka iyo akhlaaqda suubban. Waxaa si habaysan loogu baranayaa Caqiidada saxda ah, Siirada Rasuulka (NNKH), Fiqhiga Weyjada iyo Salaadda, Ducooyinka iyo Adkaarta maalinlaha ah, iyo anshaxa wanaagsan ee Muslimka si carruurta loogu tarbiyeeyo diinta iyo dhaqanka toosan.',
    fullOverviewEn: 'Comprehensive Islamic curriculum covering essential classical texts, authentic Hadith, Prophetic biography (Seerah), Islamic jurisprudence (Fiqh), daily supplications, and youth character development.',
    iconName: 'GraduationCap',
    imageUrl: islamicStudiesImg,
    imageAlt: 'Barashada Culuumta Shareecada iyo Kutubta Diinta',
    levelSo: 'Dhammaan Heerarka',
    levelEn: 'All Levels',
    ageGroupSo: 'Carruurta (5-18 jir) & Qoysaska',
    ageGroupEn: 'Kids (5-18 yrs) & Families',
    durationSo: 'Manhaj Joogto ah',
    durationEn: 'Ongoing Curriculum',
    recommendedScheduleSo: '2 ilaa 3 Maalmood todobaadkii (45 daqiiqo kalfadhigiiba)',
    recommendedScheduleEn: '2 to 3 Days a week (45 mins per session)',
    learningOutcomesSo: [
      'Fahamka Arkaanta Islaamka iyo Arkaanta Iimaanka',
      'Barashada taariikhda iyo seeradda Nabiga (SCW)',
      'Barashada habka saxda ah ee weysada iyo salaadda',
      'Xifdinta ducooyinka maalinlaha ah iyo axaadiis gaagaaban'
    ],
    learningOutcomesEn: [
      'Firm understanding of the pillars of Islam and Iman',
      'In-depth knowledge of the Prophetic biography (Seerah)',
      'Flawless practical knowledge of Wudu and Salah',
      'Memorization of daily authentic Duas and moral Hadiths'
    ],
    syllabusSo: [
      'Arkaanta Islaamka & Arkaanta Iimaanka',
      'Siirada iyo Taariikhda Rasuulka (NNKH) iyo Saxaabada',
      'Sida saxda ah ee loo weyseysto loona tukado Salaadda',
      'Ducooyinka iyo Adkaarta Maalinlaha ah (Subixii, Galabtii, Hurddada)',
      'Akhlaaqda wanaagsan: Baarri-nimada waalidka, runta, daacadnimada',
      'Axaadiis gaagaaban oo xikmad leh oo carruurtu xifdiyaan'
    ],
    syllabusEn: [
      'Pillars of Islam & Pillars of Iman with understanding',
      'Prophetic Seerah & Stories of the Sahabah',
      'Practical step-by-step Wudu and Salah mastery',
      'Daily authentic Duas & Adhkar (Morning, Evening, Sleep)',
      'Islamic values: Honesty, respect for parents, good manners',
      'Short inspiring Hadiths for memorization and reflection'
    ],
    featuresSo: [
      'Hab waxbarasho oo xiiso leh oo ku habboon carruurta iyo da’yarta Soomaaliyeed',
      'Buugaagta manhajka oo bilaash ah (PDF & interactive)',
      'Kalfadhiyo su’aalo iyo jawaabo ah oo toos ah'
    ],
    featuresEn: [
      'Engaging, interactive methods suited for Somali youth and learners',
      'Free digital workbooks & visual learning materials',
      'Live Q&A and open discussions with instructors'
    ],
    startingPriceUSD: 30,
    badge: 'Family Favorite'
  },
  {
    id: 'arabic-language',
    titleSo: 'Barashada Luuqadda Carabiga (Qoraalka & Hadalka)',
    titleEn: 'Arabic Language (Reading, Writing & Speaking)',
    categorySo: 'Luuqadda Carabiga',
    categoryEn: 'Arabic Language',
    descriptionSo: 'Baro luqadda Qur’aanka Kariimka laga bilaabo aasaaska ilaa heerka sare. Dhis awooddaada ku hadalka Carabiga, qoraalka, naxwaha iyo sarfiga si aad toos ugu fahanto micnaha aayadaha.',
    descriptionEn: 'Learn the language of the Holy Quran from foundational grammar to conversational fluency. Build strong vocabulary, reading comprehension, and Nahw/Sarf to understand the Quran directly.',
    fullOverviewSo: 'Koorsada Luuqadda Carabiga waxay ardayga u fududaynaysaa barashada qoraalka, akhriska, iyo ku hadalka afka Carabiga, si uu si toos ah u fahmo ereyada iyo aayadaha Qur’aanka Kariimka. Waxaa lagu baranayaa naxwaha aasaasiga ah, sarfiga, erey-bixinta joogtada ah, iyo wadahadalka maalinlaha ah.',
    fullOverviewEn: 'Learn the language of revelation from essential grammar to fluent speech and direct Quranic vocabulary understanding.',
    iconName: 'Languages',
    imageUrl: qaidaImg,
    imageAlt: 'Barashada Luuqadda Carabiga ee Quraanka',
    levelSo: 'Bilow ilaa Sare',
    levelEn: 'Beginner to Advanced',
    ageGroupSo: 'Carruurta & Dadka Waaweyn',
    ageGroupEn: 'Kids & Adults',
    durationSo: '3 - 12 Bilood',
    durationEn: '3 - 12 Months',
    recommendedScheduleSo: '3 Maalmood todobaadkii (40 daqiiqo)',
    recommendedScheduleEn: '3 Days a week (40 mins)',
    learningOutcomesSo: [
      'Fahamka ereyada ugu badan ee Qur’aanka Kariimka',
      'Awoodda ku hadalka iyo wada-sheekaysiga Carabiga aasaasiga ah',
      'Qorista iyo naxwaha xukuma jumladaha Carabiga'
    ],
    learningOutcomesEn: [
      'Comprehension of the most frequent Quranic words',
      'Daily conversational Arabic speaking ability',
      'Grammar fundamentals (Nahw & Sarf)'
    ],
    syllabusSo: [
      'Qaamuuska ereyada ugu muhiimsan ee Qur’aanka',
      'Aasaaska Naxwaha Carabiga (Kala saaridda Isim, Ficil, Xaraf)',
      'Wada-sheekeysiga maalinlaha ah ee luuqadda Carabiga',
      'Fahamka iyo turjumidda jumlado fudud oo Qur’aan ah',
      'Qorista saxda ah iyo higgaadda carabiga'
    ],
    syllabusEn: [
      'Core Quranic vocabulary and high-frequency roots',
      'Foundational Arabic Grammar (Noun, Verb, Particle)',
      'Daily conversational Arabic dialogues',
      'Direct comprehension of Quranic phrases without translation',
      'Arabic dictation and sentence composition'
    ],
    featuresSo: [
      'Ku hadalka Carabiga fasalka dhexdiisa',
      'Casharro la jaanqaadaya fahamka Qur’aanka',
      'Fursado tababar oo joogto ah'
    ],
    featuresEn: [
      'Interactive conversational practice in every class',
      'Curriculum synchronized with Quranic comprehension',
      'Comprehensive digital worksheets & audio exercises'
    ],
    startingPriceUSD: 35,
    badge: 'Language Mastery'
  },
  {
    id: 'sisters-female-classes',
    titleSo: 'Fasallada Gaarka ah ee Gabdhaha & Hooyooyinka',
    titleEn: 'Sisters & Female Private Classes',
    categorySo: 'Fasallo Khaas ah',
    categoryEn: 'Exclusive Sisters Program',
    descriptionSo: 'Fasallo gaar ah oo 100% ay bixiyaan Macallimado haween ah oo Ijaazo iyo aqoon diineed sare leh. Waxaa loogu talagalay gabdhaha yar-yar, gabdhaha qaangaarka ah iyo hooyooyinka.',
    descriptionEn: 'Dedicated private 1-on-1 sessions led exclusively by certified female scholars and Hafidhas. Designed with utmost comfort and privacy for young girls, teens, and mothers.',
    fullOverviewSo: 'Barnaamijka gaarka ah ee gabdhaha iyo hooyooyinka waxaa 100% bixiya macallimado dumar ah oo leh Ijaazooyin iyo khibrad dheer. Waxaa lagu baranayaa Qaacidada Nuuraaniyada, Tajwiidka suubban, Xifdinta Qur’aanka, iyo Fiqhiga dumarka iyadoo casharradu ku baxayaan jawi gaar ah oo xurmo, xishood iyo dabacsanaan leh.',
    fullOverviewEn: 'Tailored 1-on-1 Quran and Tajweed classes conducted exclusively by qualified female scholars for sisters and young daughters with complete privacy.',
    iconName: 'HeartHandshake',
    imageUrl: sistersMothersImg,
    imageAlt: 'Fasallada Gaarka ah ee Gabdhaha iyo Hooyooyinka',
    levelSo: 'Dhammaan Heerarka (Qaacida, Tajweed, Xifdi, Fiqh)',
    levelEn: 'All Levels (Qaida, Tajweed, Hifz, Fiqh)',
    ageGroupSo: 'Gabdhaha (Dhammaan Da’aha) & Hooyooyinka',
    ageGroupEn: 'Girls (All Ages) & Mothers',
    durationSo: 'Waqti Dabacsan',
    durationEn: 'Flexible Schedule',
    recommendedScheduleSo: '3 ilaa 5 Maalmood todobaadkii (Waqti Dabacsan)',
    recommendedScheduleEn: '3 to 5 Days a week (Flexible Timings)',
    learningOutcomesSo: [
      'Akhriska iyo barashada Tajwiidka suubban ee Qur’aanka',
      'Xifdinta iyo muraajacada joogtada ah',
      'Barashada Fiqhiga dumarka iyo tarbiyada Islaamka'
    ],
    learningOutcomesEn: [
      'Mastery of Tajweed and correct Quran recitation',
      'Solid Hifz memorization with regular revision',
      'Women\'s Islamic jurisprudence and Tarbiyah'
    ],
    syllabusSo: [
      'Qur’aanka Kariimka iyo Tajwiidka oo ay barayso Macallimad Ijaazo leh',
      'Xifdinta Qur’aanka iyo Muraajacada joogtada ah',
      'Fiqhiga gaarka ah ee Dumarka (Axkaamta Dahirada, Salaadda, Soonka)',
      'Tarbiyada iyo Dhisidda Akhlaaqda gabdhaha Muslimiinta ah',
      'Kalfadhiyo xorriyad iyo xishood ku dheehan yahay'
    ],
    syllabusEn: [
      'Quran recitation & Tajweed with certified female teachers',
      'Structured Hifz and continuous revision system',
      'Women\'s Fiqh (Taharah, Salah, Fasting rulings)',
      'Islamic ethics and personal mentorship for young girls',
      'Private, respectful and completely comfortable environment'
    ],
    featuresSo: [
      '100% Macallimado Soomaali iyo Carabi ah oo aqoon sare leh',
      'Waqtiyo aad u dabacsan oo ku habboon jadwalka qoyska',
      'Xiriir toos ah oo lala yeesho macallimadda'
    ],
    featuresEn: [
      '100% Female qualified & certified instructors',
      'Flexible time slots accommodating family schedules',
      'Direct parent-teacher regular communication'
    ],
    startingPriceUSD: 30,
    badge: 'Exclusive for Sisters'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic-2days',
    nameSo: '2 Maalmood Toddobaadkii',
    nameEn: '2 Days A Week',
    subtitleSo: 'Ku habboon kuwa hadda bilaabaya ama doonaya fasal fudud.',
    subtitleEn: 'Ideal for beginners starting their Quran reading journey.',
    daysPerWeek: 2,
    durationPerClassSo: '30 Daqiiqo / Fasal',
    durationPerClassEn: '30 Mins / Class',
    priceUSD: 30,
    priceGBP: 24,
    priceEUR: 28,
    priceCAD: 40,
    priceSEK: 320,
    billingPeriod: 'month',
    featuresSo: [
      '8 Fasal bishii (2 maalmood toddobaadkii)',
      'Fasallo 1-on-1 ah (Qof iyo Qof gaar ah)',
      'Dooro Macallin ama Macallimad',
      'Doorashada waqtiga kugu habboon',
      'Warbixin bil kasta ah oo la siinayo waalidka',
      'Fasalka Tijaabada oo Bilaash ah (Free Trial)'
    ],
    featuresEn: [
      '8 Live classes per month (2 days/week)',
      '1-on-1 dedicated private teacher',
      'Choice of Male or Female teacher',
      'Flexible scheduling options',
      'Monthly parent progress report',
      '100% Free Trial Class included'
    ],
    colorTheme: 'slate'
  },
  {
    id: 'standard-3days',
    nameSo: '3 Maalmood Toddobaadkii',
    nameEn: '3 Days A Week',
    subtitleSo: 'Xirmo isu-dheellitiran oo u wanaagsan horumar joogto ah.',
    subtitleEn: 'The perfect balanced choice for consistent progress.',
    daysPerWeek: 3,
    durationPerClassSo: '35 Daqiiqo / Fasal',
    durationPerClassEn: '35 Mins / Class',
    priceUSD: 35,
    priceGBP: 28,
    priceEUR: 32,
    priceCAD: 48,
    priceSEK: 380,
    billingPeriod: 'month',
    featuresSo: [
      '12 Fasal bishii (3 maalmood toddobaadkii)',
      'Fasallo 1-on-1 ah oo qof walba gaar u yahay',
      'Manhajka Tajwiidka, Qaacidada ama Xifdiga',
      'Casharro dheeraad ah oo ku saabsan Ducooyinka & Salaadda',
      'Warbixin Toddobaadle ah oo loo soo diro Waalidka',
      'Beddelidda waqtiga haddii cudurdaar jiro',
      'Shahaado rasmi ah markaad dhammayso heer kasta'
    ],
    featuresEn: [
      '12 Live classes per month (3 days/week)',
      '1-on-1 personalized private tutoring',
      'Customized Tajweed, Qaida, or Hifz track',
      'Bonus daily Duas and Salah instruction',
      'Weekly student progress updates to parents',
      'Class rescheduling flexibility for valid reasons',
      'Official completion certificate upon level finish'
    ],
    colorTheme: 'emerald'
  },
  {
    id: 'advanced-4days',
    nameSo: '4 Maalmood Toddobaadkii',
    nameEn: '4 Days A Week',
    subtitleSo: 'Xirmo horumarsan oo loogu talagalay barasho degdeg ah.',
    subtitleEn: 'Advanced schedule for accelerated learning and practice.',
    daysPerWeek: 4,
    durationPerClassSo: '35 Daqiiqo / Fasal',
    durationPerClassEn: '35 Mins / Class',
    priceUSD: 40,
    priceGBP: 32,
    priceEUR: 37,
    priceCAD: 54,
    priceSEK: 430,
    billingPeriod: 'month',
    featuresSo: [
      '16 Fasal bishii (4 maalmood toddobaadkii)',
      'Fasallo 1-on-1 ah oo xawaare sare leh',
      'Xifdi + Tajweed + Muraajaco qoto dheer',
      'Dabagalka joogtada ah ee waalidka & warbixin toos ah',
      'Beddelidda waqtiga haddii cudurdaar jiro',
      'Shahaado rasmi ah'
    ],
    featuresEn: [
      '16 Live classes per month (4 days/week)',
      '1-on-1 intensive personalized tutoring',
      'Comprehensive Hifz, Tajweed & Revision track',
      'Regular parent progress evaluations',
      'Flexible class rescheduling',
      'Official completion certificate'
    ],
    colorTheme: 'blue'
  },
  {
    id: 'intensive-5days',
    nameSo: '5 Maalmood Toddobaadkii',
    nameEn: '5 Days A Week',
    subtitleSo: 'Loogu talagalay ardayda doonaya inay si degdeg ah u bartaan Qur’aanka.',
    subtitleEn: 'Built for students committed to rapid Quran mastery and memorization.',
    daysPerWeek: 5,
    durationPerClassSo: '40 Daqiiqo / Fasal',
    durationPerClassEn: '40 Mins / Class',
    priceUSD: 50,
    priceGBP: 40,
    priceEUR: 46,
    priceCAD: 68,
    priceSEK: 540,
    popular: true,
    billingPeriod: 'month',
    badgeSo: 'Ugu Caansan ⭐',
    badgeEn: 'Most Popular ⭐',
    featuresSo: [
      '20 Fasal bishii (5 maalmood toddobaadkii)',
      'Fasal 1-on-1 ah oo 40 daqiiqo ah maalin kasta',
      'Qorshe Xifdin maalinle ah + Muraajaco adag',
      'Macallin Xaafid ah oo Ijaazo iyo Sanad sare leh',
      'Dabagalka joogtada ah ee waalidka & warbixin toos ah',
      'Manhajka Culuumta Islaamka & Siirada oo bilaash ah',
      'Mudnaanta koowaad ee doorashada saacadaha macallimiinta'
    ],
    featuresEn: [
      '20 Live classes per month (5 days/week)',
      'Daily 40-minute 1-on-1 private intensive session',
      'Structured daily Hifz + rigorous revision plan',
      'Top-tier certified Hafiz instructor with Sanad',
      'Real-time continuous parent feedback and progress',
      'Free Islamic Studies & Seerah curriculum included',
      'Highest priority schedule booking & slot reservation'
    ],
    colorTheme: 'amber'
  },
  {
    id: 'annual-full-year',
    nameSo: 'Qorshaha Sanadlaha (Full Year)',
    nameEn: 'Full Year / Annual Plan',
    subtitleSo: 'Dhammaystir Qur’aanka sanad dhan oo hal mar la bixinayo (Qiimo dhimis weyn - Badbaadi $150+).',
    subtitleEn: 'Complete 12-month full Quran mastery (Single payment - Save over $150+).',
    daysPerWeek: 5,
    durationPerClassSo: '40 Daqiiqo / Fasal',
    durationPerClassEn: '40 Mins / Class',
    priceUSD: 450,
    priceGBP: 360,
    priceEUR: 415,
    priceCAD: 610,
    priceSEK: 4800,
    isAnnual: true,
    billingPeriod: 'year',
    badgeSo: 'Qiimaha Ugu Fiican (Save 25%) 💎',
    badgeEn: 'Best Value (Save 25%) 💎',
    savingTextSo: 'Lacag hal mar ah • Badbaadi $150+',
    savingTextEn: 'Single Payment • Save $150+',
    featuresSo: [
      '12 Bilood oo buuxda oo waxbarasho toos ah (1-on-1)',
      'Hal lacag bixin oo sanadle ah (Single Payment $450)',
      'Dhammaan manhajyada: Qaacida, Tajweed, Xifdi & Tarbiya',
      'Macallin Xaafid ah oo go\'an sanadka oo dhan',
      'Warbixinta joogtada ah ee horumarka & Imtixaanaadka',
      'Mudnaanta koowaad ee doorashada saacadaha iyo jadwalka',
      'Shahaadada rasmiga ah ee Academy-ga markaad dhammayso'
    ],
    featuresEn: [
      'Full 12 Months of live 1-on-1 private tutoring',
      'Single annual payment ($450 one-time upfront)',
      'Complete curriculum: Qaida, Tajweed, Hifz & Tarbiyah',
      'Dedicated certified tutor committed for the full year',
      'Quarterly comprehensive assessments & parent reports',
      'Highest priority schedule flexibility & slot booking',
      'Official graduation & Ijazah accreditation pathway'
    ],
    colorTheme: 'purple'
  }
];

export const TEACHERS_DATA: Teacher[] = [
  {
    id: 'sheikh-abdirahman',
    nameSo: 'Sheekh Cabdiraxmaan Maxamuud',
    nameEn: 'Sheikh Abdirahman Mohamud',
    roleSo: 'Ustaad Sare oo Xifdiga & Tajwiidka ah',
    roleEn: 'Senior Quran & Tajweed Specialist',
    qualificationSo: 'Ijaazada Qiraa’ada Xafs can Caasim (Sanad ku xiran Rasuulka SCW) & Shahaadada Jaamacadda Islaamka ee Madiina',
    qualificationEn: 'Ijazah in Hafs from Asim with authentic Sanad chain & Graduate of Islamic University of Madinah',
    experienceSo: '12+ Sano oo Qibrad Waxbarid ah',
    experienceEn: '12+ Years Teaching Experience',
    specialtySo: 'Xifdinta Qur’aanka, Qiraa’aadka & Tajwiidka Sare',
    specialtyEn: 'Quran Memorization, Qira\'at & Advanced Tajweed',
    studentsCount: 380,
    rating: 4.98,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    gender: 'male'
  },
  {
    id: 'ustadha-faadumo',
    nameSo: 'Ustaada Faadumo Cali Xasan',
    nameEn: 'Ustadha Fadumo Ali Hassan',
    roleSo: 'Madaxa Qaybta Gabdhaha & Qaacidada Nuuraaniyada',
    roleEn: 'Head of Sisters Program & Noorani Qaida',
    qualificationSo: 'Xaafidatul Qur’aan haysata Ijaazo Tajweed & Shahaadada Waxbarashada Carruurta',
    qualificationEn: 'Hafidha of Quran with certified Tajweed Ijazah & Child Early Education Specialist',
    experienceSo: '9+ Sano oo Qibrad ah',
    experienceEn: '9+ Years Teaching Experience',
    specialtySo: 'Qaacidada Nuuraaniyada, Carruurta Yar-yar & Gabdhaha',
    specialtyEn: 'Noorani Qaida, Early Childhood & Sisters Quran',
    studentsCount: 420,
    rating: 4.99,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    gender: 'female'
  },
  {
    id: 'sheikh-mustafe',
    nameSo: 'Sheekh Mustafe Axmed Warsame',
    nameEn: 'Sheikh Mustafe Ahmed Warsame',
    roleSo: 'Macallin Sare oo Culuumta Diinta & Carabiga ah',
    roleEn: 'Senior Islamic Studies & Arabic Scholar',
    qualificationSo: 'Shahaadada Sare ee Shareecada & Luuqadda Carabiga, Jaamacadda Al-Azhar',
    qualificationEn: 'Master\'s in Shariah & Arabic Language, Al-Azhar University',
    experienceSo: '10+ Sano oo Qibrad ah',
    experienceEn: '10+ Years Teaching Experience',
    specialtySo: 'Siirada Nebiga, Fiqhiga, Naxwaha & Tarbiyada Dhallinyarada',
    specialtyEn: 'Prophetic Seerah, Fiqh, Arabic Grammar & Youth Tarbiyah',
    studentsCount: 290,
    rating: 4.95,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    gender: 'male'
  },
  {
    id: 'ustadha-amina',
    nameSo: 'Ustaada Aamina Maxamed Jaamac',
    nameEn: 'Ustadha Amina Mohamed Jama',
    roleSo: 'Macallimad Xifdi & Tajweed oo Gabdhaha ah',
    roleEn: 'Hifz & Tajweed Tutor for Sisters & Girls',
    qualificationSo: 'Ijaazo Xafs & Warsh, Macallimad hore oo Masaajidda London & Stockholm',
    qualificationEn: 'Ijazah in Hafs & Warsh, Experienced tutor across London & Stockholm',
    experienceSo: '7+ Sano oo Qibrad ah',
    experienceEn: '7+ Years Teaching Experience',
    specialtySo: 'Xifdinta Gabdhaha, Tajweedka & Akhlaaqda Islaamka',
    specialtyEn: 'Sisters Hifz, Tajweed Rules & Islamic Character',
    studentsCount: 310,
    rating: 4.97,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    gender: 'female'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    parentName: 'Maryan Yuusuf',
    studentNameSo: 'Anas (8 jir) & Sumaya (10 jir)',
    studentNameEn: 'Anas (8 yrs) & Sumaya (10 yrs)',
    location: 'London, United Kingdom',
    countryCode: 'GB',
    commentSo: 'Ilaahay baa mahad leh, carruurtaydu waxa ay halkan ka bilaabeen Qaacidada Nuuraaniyada, haddana waxa ay si qurux badan oo Tajwiid ah u akhrinayaan Suuradaha waaweyn. Macallimiintu waa kuwo sabir badan oo yaqaanna sida carruurta wax loo baro.',
    commentEn: 'Alhamdulillah, my kids started from Noorani Qaida and are now reciting long Surahs with beautiful Tajweed. The teachers are incredibly patient, punctual, and truly understand how to engage and motivate children.',
    rating: 5,
    date: '15 Feb 2025',
    courseNameSo: 'Qaacida & Tajwiid',
    courseNameEn: 'Qaida & Tajweed'
  },
  {
    id: 'test-2',
    parentName: 'Axmed Cabdullaahi',
    studentNameSo: 'Khaalid (13 jir)',
    studentNameEn: 'Khalid (13 yrs)',
    location: 'Minneapolis, USA',
    countryCode: 'US',
    commentSo: 'Akadeemiyada Baro Quran waa tan ugu wanaagsan ee aan abid la shaqeeyo. Wiilkayga Khaalid waxa uu xifdiyay 12 Juz hal sano iyo bar gudaheed. Nidaamka muraajacada iyo dabagalka macallinka ayaa ah mid heer sare ah.',
    commentEn: 'Baro Quran Academy is hands-down the best online academy we have worked with. My son Khalid memorized 12 Juz in 18 months. Their revision system and teacher dedication are phenomenal.',
    rating: 5,
    date: '28 Jan 2025',
    courseNameSo: 'Xifdinta Qur’aanka (Hifz)',
    courseNameEn: 'Quran Memorization (Hifz)'
  },
  {
    id: 'test-3',
    parentName: 'Khadra Maxamed',
    studentNameSo: 'Hodan (15 jir) & Hani (7 jir)',
    studentNameEn: 'Hodan (15 yrs) & Hani (7 yrs)',
    location: 'Stockholm, Sweden',
    countryCode: 'SE',
    commentSo: 'Waxaan aad ugu faraxsanahay inaan helnay macallimad dheddig ah oo aad u naxariis badan oo gabadhayda barta Qur’aanka iyo aadaabta Islaamka. Waqtiga aad buu noogu habboon yahay wax walbana waa nidaamsan yihiin.',
    commentEn: 'We are so grateful to have found a wonderful female teacher who teaches my daughters Quran and Islamic values with great compassion. The schedule flexibility is fantastic.',
    rating: 5,
    date: '10 Feb 2025',
    courseNameSo: 'Fasallada Gabdhaha & Culuumta Diinta',
    courseNameEn: 'Sisters Quran & Islamic Studies'
  },
  {
    id: 'test-4',
    parentName: 'Cumar Farax',
    studentNameSo: 'Yaxye (9 jir)',
    studentNameEn: 'Yahya (9 yrs)',
    location: 'Toronto, Canada',
    countryCode: 'CA',
    commentSo: 'Waxaan tijaabiyay meelo badan laakiin Baro Quran Academy waxa ay kaga duwan yihiin nadaamka casriga ah, warbixinnada todobaadlaha ah ee waalidka loo soo diro, iyo sida uu macallinku ugu dadaalo ardayga.',
    commentEn: 'I tried several platforms before, but Baro Quran Academy stands out for their modern platform, weekly parent updates, and genuine dedication to the student\'s growth.',
    rating: 5,
    date: '02 Feb 2025',
    courseNameSo: 'Akhriska Qur’aanka & Tajwiidka',
    courseNameEn: 'Quran Recitation & Tajweed'
  }
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    questionSo: 'Sidee u shaqeeyaan fasallada online-ka ah ee Baro Quran Academy?',
    questionEn: 'How do the online classes at Baro Quran Academy work?',
    answerSo: 'Fasalladayadu waa kuwo 1-on-1 ah (hal macallin iyo hal arday). Casharradu waxay toos uga dhacaan aaladaha casriga ah sida Zoom ama Google Meet adigoo isticmaalaya kombuyuutar, tablet, ama taleefan casri ah. Macallinku waxa uu la wadaagayaa ardayga shaashadda manhajka iyo musxafka si toos ah.',
    answerEn: 'Our classes are live 1-on-1 private sessions between a dedicated teacher and student. Lessons are conducted via Zoom or Google Meet using your computer, tablet, or phone, where the teacher screenshares the interactive curriculum and Quran Mushaf.'
  },
  {
    id: 'faq-2',
    category: 'classes',
    questionSo: 'Ma heli karaa fasal tijaabo ah oo bilaash ah (Free Trial)?',
    questionEn: 'Can I get a free trial class before committing?',
    answerSo: 'Haa, hubaal! Waxaan bixinnaa fasal tijaabo ah oo 100% bilaash ah oo aan wax lacag ah lagaa rabin. Waxaad fursad u helaysaa inaad tijaabiso habka waxbaridda macallinka, ardaygana heerkiisa lagu qiimeeyo ka hor inta aadan go\'aansan.',
    answerEn: 'Yes, absolutely! We provide a 100% free trial class with no obligation or credit card required. You can experience the teaching methodology firsthand and receive an initial student assessment.'
  },
  {
    id: 'faq-3',
    category: 'teachers',
    questionSo: 'Ma dooran karaa macallin Lab ama Dheddig (Macallimad)?',
    questionEn: 'Can I request a Male or Female instructor?',
    answerSo: 'Haa, waad dooran kartaa. Waxaan leenahay Macallimiin rag ah iyo Macallimado haween ah oo dhammaantood haysta Ijaazada Qur’aanka Kariimka iyo aqoon qoto dheer oo dhanka waxbaridda carruurta iyo dadka waaweyn ah.',
    answerEn: 'Yes! We have both certified male scholars and female Hafidhas available. You can specify your teacher gender preference during registration.'
  },
  {
    id: 'faq-4',
    category: 'classes',
    questionSo: 'Sideen u dooran karaa saacadaha iyo maalmaha ii habboon?',
    questionEn: 'How flexible is the scheduling for different timezones?',
    answerSo: 'Adeegyadayadu waxay shaqeeyaan 24 saac maalintii, 7 maalmood toddobaadkii. Waxaan u adeegnaa ardayda ku nool UK, USA, Canada, Yurub, Bariga Dhexe, Australia iyo Afrika. Waxaad dooran kartaa subaxdii, galabtii, ama fiidkii xilliga aad firaaqada tahay.',
    answerEn: 'We operate 24/7 across all global time zones (UK, US, Canada, Europe, Middle East, Australia). You can choose morning, afternoon, or evening slots that fit your family schedule.'
  },
  {
    id: 'faq-5',
    category: 'payment',
    questionSo: 'Waa maxay hababka lacag bixinta ee aad aqbashaan?',
    questionEn: 'What payment methods do you accept?',
    answerSo: 'Waxaan aqbalnaa dhammaan kaararka bangiyada caalamiga ah (Visa, Mastercard, Debit cards), PayPal, Apple Pay, Google Pay, iyo xawaaladaha ama bangiyada tooska ah ee dalalka qaarkood. Lacag bixintu waa bishii hal mar oo ammaan ah.',
    answerEn: 'We accept all major international cards (Visa, Mastercard), PayPal, Apple Pay, Google Pay, and direct bank transfers. Billing is monthly with zero hidden fees.'
  },
  {
    id: 'faq-6',
    category: 'general',
    questionSo: 'Haddii aan fasal seego sabab cudurdaar ah awgeed, ma la ii magdhabaa?',
    questionEn: 'What happens if we miss a scheduled class due to an emergency?',
    answerSo: 'Haa, haddii aad nagu soo wargeliso ugu yaraan 2-4 saacadood ka hor xilliga fasalka, macallinku waxa uu kuu ballamin doonaa waqti kale oo la isku waafaqo si uusan casharkaagu u lumin.',
    answerEn: 'Yes! If you notify us at least 2-4 hours before class time, your instructor will arrange a convenient make-up session so your child never misses a lesson.'
  }
];

export const TAJWEED_SAMPLE_VERSES = [
  {
    id: 'al-fatiha-1-4',
    surahNameSo: 'Suuratul Faatixa (Aayadaha 1-4)',
    surahNameEn: 'Surah Al-Fatihah (Verses 1-4)',
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ',
    somaliMeaning: 'Magaca Eebbe yaan ku bilaabaynaa ee Naxariis guud iyo mid gaaraba naxariista. Mahad oo dhan waxay u sugnaatay Eebbe ee barbaaraha caalamka ah. Eebbe ee Naxariis guud iyo mid gaaraba naxariista. Eebbe ee xukuma Maalinta Aakhiro (Abaal-marinta).',
    englishMeaning: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds. The Entirely Merciful, the Especially Merciful. Sovereign of the Day of Recompense.',
    reciterName: 'Sheekh Mishari Rashed Al-Afasy',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    tajweedHighlights: [
      { rule: 'Lafdhul Jalaalah (Tafkhiim / Tarqeeq)', descriptionSo: 'Magaca Alle (الله) markii shaqal jilicsan (Kasra) ka horreyso waa la khafiifiyaa (Bismi-LLAH).', descriptionEn: 'Lam of Allah is pronounced lightly due to the preceding Kasrah.' },
      { rule: 'Madd Asli & Madd Caarid', descriptionSo: 'Dheereynta dabiiciga ah ee Ar-Raxmaan iyo joogsiga Al-Caalamiin (2, 4 ama 6 xarako).', descriptionEn: 'Natural elongation and Madd Arid lil Sukoon at verse endings.' },
      { rule: 'Idghaam Shamsi & Qamari', descriptionSo: 'Alifka iyo Laamka qeexaya: Al-Xamdu (Laamku waa muuqdaa), Ar-Raxmaan (Laamka waxaa loo rogaa Raa\').', descriptionEn: 'Clear pronunciation of Lam in Al-Hamd and assimilation in Ar-Rahman.' }
    ]
  },
  {
    id: 'al-ikhlas',
    surahNameSo: 'Suuratul Ikhlaas',
    surahNameEn: 'Surah Al-Ikhlas',
    arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    somaliMeaning: 'Dheh: Eebbe waa Mid keliya. Eebbe waa kan la magangalo (cid walba u baahan tahay). Wax ma dhalin isagana lama dhalin. Mana jiro mid u dhigma oo la mid ah.',
    englishMeaning: 'Say, "He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent."',
    reciterName: 'Sheekh Maxamuud Khaliil Al-Xusari',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.husary/6221.mp3',
    tajweedHighlights: [
      { rule: 'Qalqalah (Kubraa & Sughraa)', descriptionSo: 'Qalqalada xarafka Daal (د) dhamaadka Ahad, As-Samad, Yalid, Yuulad.', descriptionEn: 'Clear bouncing echo effect on the Dal letter at verse endings and stops.' },
      { rule: 'Idghaam Bilaa Ghunnah', descriptionSo: 'Nuun Saakina oo gashay Laamka (وَلمْ يَكُن لَّهُ) - lama muujiyo sanqadh (Ghunnah).', descriptionEn: 'Merging without nasalization when Noon Saakin meets the Lam.' },
      { rule: 'Ikhfaa Xaqiiqi', descriptionSo: 'Qarin iyo Ghunnah fudud meelaha ku habboon.', descriptionEn: 'Concealment with light 2-count nasal tone.' }
    ]
  },
  {
    id: 'ayat-al-kursi',
    surahNameSo: 'Aayatal Kursi (Suurada Al-Baqarah 255)',
    surahNameEn: 'Ayat Al-Kursi (Surah Al-Baqarah 255)',
    arabicText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
    somaliMeaning: 'Allaah wax ilaah ah ma jiro Isaga mooyee, waana Noolaha Joogtada ah ee koonka maamula. Ma qabato lulmo iyo hurdo toona. Isagaa iska leh waxa ku sugan samooyinka iyo dhulka.',
    englishMeaning: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.',
    reciterName: 'Sheekh Cabdulbaasit Cabdussamad',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.abdulbasit/262.mp3',
    tajweedHighlights: [
      { rule: 'Madd Munfasil (4-5 Xarako)', descriptionSo: 'Maddka ku yimid aayadda dhexdeeda (لَا إِلَٰهَ) - Dheereyn 4 ilaa 5 alif.', descriptionEn: 'Detached Madd elongation for 4 to 5 rhythmic vowel counts.' },
      { rule: 'Idghaam bi Ghunnah', descriptionSo: 'Tanwiin oo gashay Waaw (سِنَةٌ وَلَا نَوْمٌ) oo leh Ghunnah cod macaan.', descriptionEn: 'Tanween merged into Waw with a resonant 2-beat nasal resonance.' }
    ]
  }
];

export const ACADEMY_SOCIALS = {
  tiktok: 'https://www.tiktok.com/@baroquranacademy?_r=1&_t=ZS-999Od1KUFWc',
  facebook: 'https://www.facebook.com/share/19CX8RR8CX/?mibextid=wwXIfr',
  whatsapp: 'https://wa.me/251777796444',
  phone: '+251 77 779 6444',
  email: 'baroquranacademy1@gmail.com'
};

export const NOORANI_LETTERS = [
  { arabic: 'أ', nameSo: 'Alif', nameEn: 'Alif', sound: 'A', example: 'أَسَد (Asad)' },
  { arabic: 'ب', nameSo: 'Baa', nameEn: 'Baa', sound: 'B', example: 'بَيْت (Bayt)' },
  { arabic: 'ت', nameSo: 'Taa', nameEn: 'Taa', sound: 'T', example: 'تَمْر (Tamr)' },
  { arabic: 'ث', nameSo: 'Thaa', nameEn: 'Thaa', sound: 'Th', example: 'ثَوْب (Thawb)' },
  { arabic: 'ج', nameSo: 'Jiim', nameEn: 'Jeem', sound: 'J', example: 'جَمَل (Jamal)' },
  { arabic: 'ح', nameSo: 'Xaa', nameEn: 'Haa (Throat)', sound: 'Ḥ', example: 'حَبْل (Habl)' },
  { arabic: 'خ', nameSo: 'Khaa', nameEn: 'Khaa (Heavy)', sound: 'Kh', example: 'خُبْز (Khubz)' },
  { arabic: 'د', nameSo: 'Daal', nameEn: 'Daal', sound: 'D', example: 'دَرْب (Darb)' },
  { arabic: 'ذ', nameSo: 'Thaal', nameEn: 'Thaal (Soft)', sound: 'Dh', example: 'ذِئْب (Dhi\'b)' },
  { arabic: 'ر', nameSo: 'Raa', nameEn: 'Raa', sound: 'R', example: 'رَجُل (Rajul)' },
  { arabic: 'ز', nameSo: 'Zaay', nameEn: 'Zay', sound: 'Z', example: 'زَهْرَة (Zahrah)' },
  { arabic: 'س', nameSo: 'Siin', nameEn: 'Seen', sound: 'S', example: 'سَمَك (Samak)' },
  { arabic: 'ش', nameSo: 'Shiin', nameEn: 'Sheen', sound: 'Sh', example: 'شَمْس (Shams)' },
  { arabic: 'ص', nameSo: 'Saad', nameEn: 'Saad (Heavy)', sound: 'Ṣ', example: 'صَقْر (Saqr)' },
  { arabic: 'ض', nameSo: 'Daad', nameEn: 'Daad (Deep)', sound: 'Ḍ', example: 'ضَوْء (Daw\')' },
  { arabic: 'ط', nameSo: 'Dhaa', nameEn: 'Taa (Heavy)', sound: 'Ṭ', example: 'طَيْر (Tayr)' },
  { arabic: 'ظ', nameSo: 'Zhaa', nameEn: 'Zhaa (Heavy)', sound: 'Ẓ', example: 'ظِلّ (Zill)' },
  { arabic: 'ع', nameSo: 'Cayn', nameEn: 'Ayn', sound: '‘A', example: 'عَيْن (\'Ayn)' },
  { arabic: 'غ', nameSo: 'Ghayn', nameEn: 'Ghayn', sound: 'Gh', example: 'غَابَة (Ghabah)' },
  { arabic: 'ف', nameSo: 'Faa', nameEn: 'Faa', sound: 'F', example: 'فِيل (Feel)' },
  { arabic: 'ق', nameSo: 'Qaaf', nameEn: 'Qaaf (Deep throat)', sound: 'Q', example: 'قَلَم (Qalam)' },
  { arabic: 'ك', nameSo: 'Kaaf', nameEn: 'Kaaf', sound: 'K', example: 'كِتَاب (Kitaab)' },
  { arabic: 'ل', nameSo: 'Laam', nameEn: 'Laam', sound: 'L', example: 'لَيْل (Layl)' },
  { arabic: 'م', nameSo: 'Meem', nameEn: 'Meem', sound: 'M', example: 'مَاء (Maa\')' },
  { arabic: 'ن', nameSo: 'Nuun', nameEn: 'Noon', sound: 'N', example: 'نَهْر (Nahr)' },
  { arabic: 'هـ', nameSo: 'Haa', nameEn: 'Haa (Chest)', sound: 'H', example: 'هِلَال (Hilaal)' },
  { arabic: 'و', nameSo: 'Waaw', nameEn: 'Waw', sound: 'W', example: 'وَرْد (Ward)' },
  { arabic: 'ي', nameSo: 'Yaa', nameEn: 'Yaa', sound: 'Y', example: 'يَد (Yad)' }
];

