
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
