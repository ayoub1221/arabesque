
import { BodyPart, Exercise, ExerciseLevel } from "./types";

export const defaultExercises: Exercise[] = [
  {
    id: "ex1",
    name: "تمارين البليه الأساسية",
    description: "تمارين أساسية لتحسين وضعية الجسم والتمركز",
    bodyPart: BodyPart.FullBody,
    duration: 15,
    level: ExerciseLevel.Beginner,
    imageUrl: "/exercises/plies.jpg",
    notes: "التركيز على استقامة الظهر وثبات الأكتاف"
  },
  {
    id: "ex2",
    name: "تمارين تمدد الساق",
    description: "تمارين لزيادة مرونة عضلات الساق وتحسين مدى الحركة",
    bodyPart: BodyPart.Legs,
    duration: 20,
    level: ExerciseLevel.Intermediate,
    imageUrl: "/exercises/tendu.jpg",
    notes: "التمدد التدريجي مع الحفاظ على الشكل الصحيح"
  },
  {
    id: "ex3",
    name: "تمارين الوثب",
    description: "تمارين لتقوية عضلات الساق وتحسين القدرة على الوثب",
    bodyPart: BodyPart.Legs,
    duration: 10,
    level: ExerciseLevel.Intermediate,
    imageUrl: "/exercises/jumps.jpg",
    notes: "الهبوط برفق مع ثني الركبتين"
  },
  {
    id: "ex4",
    name: "تمارين المرونة للجذع",
    description: "تمارين لزيادة مرونة الجذع والظهر",
    bodyPart: BodyPart.Core,
    duration: 15,
    level: ExerciseLevel.Beginner,
    imageUrl: "/exercises/core.jpg",
    notes: "الحفاظ على استقامة الظهر وتشغيل عضلات البطن"
  },
  {
    id: "ex5",
    name: "تمارين الدوران",
    description: "تقنيات الدوران الأساسية مع الحفاظ على التوازن",
    bodyPart: BodyPart.FullBody,
    duration: 15,
    level: ExerciseLevel.Advanced,
    imageUrl: "/exercises/pirouette.jpg",
    notes: "التركيز على نقطة ثابتة أثناء الدوران"
  },
  {
    id: "ex6",
    name: "تمارين مرونة القدم",
    description: "تمارين لتحسين قوة ومرونة القدم والكاحل",
    bodyPart: BodyPart.Legs,
    duration: 10,
    level: ExerciseLevel.Beginner,
    imageUrl: "/exercises/foot.jpg",
    notes: "الانتباه إلى شكل القدم والإمتداد الكامل للمشط"
  },
  {
    id: "ex7",
    name: "تقنيات الأرابيسك",
    description: "تمارين على وضعيات الأرابيسك المختلفة",
    bodyPart: BodyPart.FullBody,
    duration: 20,
    level: ExerciseLevel.Intermediate,
    imageUrl: "/exercises/arabesque.jpg",
    notes: "الحفاظ على استقامة الجسم والتوازن"
  },
  {
    id: "ex8",
    name: "تمارين مرونة الجسم",
    description: "تمارين شاملة لتحسين مرونة جميع أجزاء الجسم",
    bodyPart: BodyPart.Flexibility,
    duration: 25,
    level: ExerciseLevel.Intermediate,
    imageUrl: "/exercises/flexibility.jpg",
    notes: "التمدد البطيء والثابت لتجنب الإصابات"
  }
];

// تواريخ تدريب افتراضية
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

export const defaultScheduledExercises = [
  {
    ...defaultExercises[0],
    scheduledDate: today,
    completed: false
  },
  {
    ...defaultExercises[1],
    scheduledDate: today,
    completed: false
  },
  {
    ...defaultExercises[3],
    scheduledDate: today,
    completed: false
  },
  {
    ...defaultExercises[2],
    scheduledDate: tomorrow,
    completed: false
  },
  {
    ...defaultExercises[4],
    scheduledDate: tomorrow,
    completed: false
  },
  {
    ...defaultExercises[7],
    scheduledDate: tomorrow,
    completed: false
  }
];
