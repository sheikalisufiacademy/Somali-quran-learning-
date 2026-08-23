export type Language = 'so' | 'en';
export type AppPage = 'home' | 'why-us' | 'courses' | 'pricing' | 'reviews' | 'faq' | 'contact' | 'privacy' | 'terms' | 'student-dashboard';

export interface LessonLog {
  id: string;
  date: string;
  topic: string; // e.g. "Suuratul Mulk (Aayadaha 1-15)"
  pageOrSurah: string; // e.g. "Juz 29, Bogga 562"
  grade: string; // "Mumtaaz (10/10)", "Aad u Fiican", "Fiican"
  status: 'completed' | 'revision' | 'in-progress';
  teacherNotes: string;
  studentNotes?: string;
}

export interface StudentProfile {
  studentId: string;
  fullName: string;
  age: string;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  enrolledCourseId: string;
  enrolledCourseTitleSo: string;
  enrolledCourseTitleEn: string;
  assignedTeacherNameSo: string;
  assignedTeacherNameEn: string;
  assignedTeacherPhoto: string;
  classTime: string;
  scheduleDays: string[];
  meetingLink: string;
  tomorrowsLesson: string;
  tomorrowPrepNotes: string;
  attendanceRate: number;
  totalCompletedLessons: number;
  juzMemorized: number;
}

export interface Course {
  id: string;
  titleSo: string;
  titleEn: string;
  categorySo: string;
  categoryEn: string;
  descriptionSo: string;
  descriptionEn: string;
  fullOverviewSo?: string;
  fullOverviewEn?: string;
  iconName: string;
  imageUrl?: string;
  imageAlt?: string;
  levelSo: string;
  levelEn: string;
  ageGroupSo: string;
  ageGroupEn: string;
  durationSo: string;
  durationEn: string;
  syllabusSo: string[];
  syllabusEn: string[];
  featuresSo: string[];
  featuresEn: string[];
  badge?: string;
  popular?: boolean;
  learningOutcomesSo?: string[];
  learningOutcomesEn?: string[];
  recommendedScheduleSo?: string;
  recommendedScheduleEn?: string;
}

export interface PricingPlan {
  id: string;
  nameSo: string;
  nameEn: string;
  subtitleSo: string;
  subtitleEn: string;
  daysPerWeek: number;
  durationPerClassSo: string;
  durationPerClassEn: string;
  priceUSD: number;
  priceGBP: number;
  priceEUR: number;
  priceCAD: number;
  priceSEK: number;
  featuresSo: string[];
  featuresEn: string[];
  popular?: boolean;
  colorTheme: string;
}

export interface Teacher {
  id: string;
  nameSo: string;
  nameEn: string;
  roleSo: string;
  roleEn: string;
  qualificationSo: string;
  qualificationEn: string;
  experienceSo: string;
  experienceEn: string;
  specialtySo: string;
  specialtyEn: string;
  studentsCount: number;
  rating: number;
  avatarUrl: string;
  gender: 'male' | 'female';
}

export interface Testimonial {
  id: string;
  parentName: string;
  studentNameSo: string;
  studentNameEn: string;
  location: string;
  countryCode: string;
  commentSo: string;
  commentEn: string;
  rating: number;
  date: string;
  courseNameSo: string;
  courseNameEn: string;
}

export interface FaqItem {
  id: string;
  questionSo: string;
  questionEn: string;
  answerSo: string;
  answerEn: string;
  category: 'general' | 'classes' | 'payment' | 'teachers';
}

export interface RegistrationFormData {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  country: string;
  timezone: string;
  studentAge: string;
  studentGender: 'male' | 'female';
  teacherPreference: 'male' | 'female' | 'any';
  courseId: string;
  selectedPlanId: string;
  preferredDays: string[];
  preferredTimeSlot: string;
  previousExperience: string;
  notes: string;
}
