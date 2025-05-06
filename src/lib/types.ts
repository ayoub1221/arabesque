
export enum BodyPart {
  Legs = "الساقين",
  Arms = "الذراعين",
  Core = "الجذع",
  Back = "الظهر",
  FullBody = "الجسم كامل",
  Flexibility = "المرونة",
  Balance = "التوازن"
}

export enum ExerciseLevel {
  Beginner = "مبتدئ",
  Intermediate = "متوسط",
  Advanced = "متقدم",
  Professional = "محترف"
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  bodyPart: BodyPart;
  duration: number; // بالدقائق
  level: ExerciseLevel;
  imageUrl?: string;
  notes?: string;
  possibleInjuries?: Injury[]; // الإصابات المحتملة
}

export interface ScheduledExercise extends Exercise {
  scheduledDate: Date;
  completed: boolean;
}

export interface DailySchedule {
  date: Date;
  exercises: ScheduledExercise[];
  totalDuration: number;
}

// الأنواع الجديدة

export interface AnatomyPart {
  id: string;
  name: string;
  description: string;
  relatedBodyParts: BodyPart[];
  imageUrl?: string;
}

export interface Injury {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  treatments: string[];
  prevention: string[];
  relatedBodyParts: BodyPart[];
  imageUrl?: string;
}

export interface NutritionItem {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  forBodyParts: BodyPart[];
  whenToConsume: string;
  imageUrl?: string;
}

export type ToastVariant = "default" | "destructive" | "success"; // إضافة "success" كنوع مقبول
