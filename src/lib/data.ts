import { BodyPart, Exercise, ExerciseLevel, Injury } from "./types";

// تعريف الإصابات المحتملة
const possibleInjuries: Injury[] = [
  {
    id: "inj1",
    name: "التهاب وتر العرقوب",
    description: "التهاب وألم في وتر العرقوب الذي يربط عضلات الساق بعظم الكعب",
    symptoms: ["ألم في الجزء الخلفي من الكاحل", "تورم", "ألم عند الضغط على المنطقة", "صعوبة عند صعود السلالم"],
    treatments: ["الراحة والثلج", "تمارين تمدد خفيفة", "أحذية داعمة", "تقليل الضغط على الكاحل"],
    prevention: ["الإحماء الجيد", "تقوية عضلات الساق", "زيادة شدة التمارين تدريجياً", "ارتداء أحذية مناسبة"],
    relatedBodyParts: [BodyPart.Legs],
    imageUrl: "/injuries/achilles-tendinitis.jpg"
  },
  {
    id: "inj2",
    name: "إصابة القدم الراقصة",
    description: "كسور إجهاد في عظام مشط القدم تحدث بسبب الضغط المتكرر",
    symptoms: ["ألم تدريجي في مقدمة القدم", "تورم وكدمات", "زيادة الألم مع الأنشطة"],
    treatments: ["الراحة لمدة 6-8 أسابيع", "حذاء طبي أو جبيرة", "العلاج الطبيعي", "التدرج في العودة للتمارين"],
    prevention: ["الراحة الكافية بين التمارين المكثفة", "تقنيات صحيحة", "تقوية عضلات القدم", "أحذية باليه مناسبة"],
    relatedBodyParts: [BodyPart.Legs],
    imageUrl: "/injuries/dancers-fracture.jpg"
  },
  {
    id: "inj3",
    name: "آلام أسفل الظهر",
    description: "آلام ناتجة عن الاستخدام المفرط أو تقنيات غير صحيحة في حركات الباليه",
    symptoms: ["ألم متواصل في أسفل الظهر", "تصلب في العضلات", "زيادة الألم مع بعض الحركات"],
    treatments: ["راحة نسبية", "تمارين تقوية عضلات الجذع", "العلاج الطبيعي", "تصحيح الوضعيات"],
    prevention: ["تقوية عضلات الجذع", "استخدام تقنية صحيحة", "الإحماء الجيد", "الاستراحة بين التمارين المكثفة"],
    relatedBodyParts: [BodyPart.Back, BodyPart.Core],
    imageUrl: "/injuries/back-pain.jpg"
  },
  {
    id: "inj4",
    name: "التواء الكاحل",
    description: "إصابة في أربطة الكاحل عند الدوران أو الوثب بشكل خاطئ",
    symptoms: ["ألم وتورم", "كدمات", "صعوبة تحريك المفصل", "عدم القدرة على تحمل الوزن"],
    treatments: ["راحة وجليد", "رباط ضاغط", "رفع القدم", "تمارين إعادة تأهيل تدريجية"],
    prevention: ["تقوية عضلات الكاحل", "تمارين التوازن", "تقنية هبوط صحيحة", "أحذية مناسبة"],
    relatedBodyParts: [BodyPart.Legs],
    imageUrl: "/injuries/ankle-sprain.jpg"
  }
];

export const defaultExercises: Exercise[] = [
  {
    id: "ex1",
    name: "تمارين البليه الأساسية",
    description: "تمارين أساسية لتحسين وضعية الجسم والتمركز",
    bodyPart: BodyPart.FullBody,
    duration: 15,
    level: ExerciseLevel.Beginner,
    imageUrl: "/exercises/plies.jpg",
    notes: "التركيز على استقامة الظهر وثبات الأكتاف",
    possibleInjuries: [possibleInjuries[2]]
  },
  {
    id: "ex2",
    name: "تمارين تمدد الساق",
    description: "تمارين لزيادة مرونة عضلات الساق وتحسين مدى الحركة",
    bodyPart: BodyPart.Legs,
    duration: 20,
    level: ExerciseLevel.Intermediate,
    imageUrl: "/exercises/tendu.jpg",
    notes: "التمدد التدريجي مع الحفاظ على الشكل الصحيح",
    possibleInjuries: [possibleInjuries[0], possibleInjuries[1]]
  },
  {
    id: "ex3",
    name: "تمارين الوثب",
    description: "تمارين لتقوية عضلات الساق وتحسين القدرة على الوثب",
    bodyPart: BodyPart.Legs,
    duration: 10,
    level: ExerciseLevel.Intermediate,
    imageUrl: "/exercises/jumps.jpg",
    notes: "الهبوط برفق مع ثني الركبتين",
    possibleInjuries: [possibleInjuries[1], possibleInjuries[3]]
  },
  {
    id: "ex4",
    name: "تمارين المرونة للجذع",
    description: "تمارين لزيادة مرونة الجذع والظهر",
    bodyPart: BodyPart.Core,
    duration: 15,
    level: ExerciseLevel.Beginner,
    imageUrl: "/exercises/core.jpg",
    notes: "الحفاظ على استقامة الظهر وتشغيل عضلات البطن",
    possibleInjuries: [possibleInjuries[2]]
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
