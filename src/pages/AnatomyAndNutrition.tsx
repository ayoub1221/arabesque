import { useState } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { AnatomyPart, BodyPart, Injury, NutritionItem } from '@/lib/types';
import { Apple, Bandage, Bone, Utensils, Salad } from 'lucide-react';

// بيانات تشريح الجسم (ستكون في ملف البيانات لاحقاً)
const anatomyParts: AnatomyPart[] = [
  {
    id: "anat1",
    name: "عضلات القدم",
    description: "تتكون عضلات القدم من عضلات داخلية وخارجية تساعد على الحركة والتوازن، وهي أساسية لراقصي الباليه",
    relatedBodyParts: [BodyPart.Legs],
    imageUrl: "/anatomy/foot-muscles.jpg"
  },
  {
    id: "anat2",
    name: "عضلات الساق",
    description: "تشمل عضلات الساق الأمامية والخلفية، وهي ضرورية لجميع حركات الباليه خاصة القفزات والوقوف على أطراف الأصابع",
    relatedBodyParts: [BodyPart.Legs],
    imageUrl: "/anatomy/leg-muscles.jpg"
  },
  {
    id: "anat3",
    name: "عضلات الجذع",
    description: "مسؤولة عن استقرار الجسم والتوازن وتشمل عضلات البطن والظهر السفلي",
    relatedBodyParts: [BodyPart.Core, BodyPart.Back],
    imageUrl: "/anatomy/core-muscles.jpg"
  },
  {
    id: "anat4",
    name: "عضلات الذراعين والكتفين",
    description: "تساهم في تناسق الحركة والتعبير الفني في الباليه",
    relatedBodyParts: [BodyPart.Arms],
    imageUrl: "/anatomy/arm-muscles.jpg"
  }
];

// بيانات الإصابات المحتملة
const injuries: Injury[] = [
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

// بيانات التغذية
const nutritionItems: NutritionItem[] = [
  {
    id: "nut1",
    name: "البروتين بعد التمرين",
    description: "ضروري لإصلاح الألياف العضلية وبناءها بعد التمارين المكثفة",
    benefits: ["إصلاح الأنسجة العضلية", "زيادة القوة والتحمل", "تسريع التعافي"],
    forBodyParts: [BodyPart.FullBody],
    whenToConsume: "خلال 30-60 دقيقة بعد التمرين",
    imageUrl: "/nutrition/protein.jpg"
  },
  {
    id: "nut2",
    name: "الكربوهيدرات المعقدة",
    description: "تعيد تخزين الجليكوجين في العضلات بعد التمرين",
    benefits: ["تجديد مخزون الطاقة", "تقليل التعب العضلي", "دعم الأداء في اليوم التالي"],
    forBodyParts: [BodyPart.FullBody],
    whenToConsume: "خلال ساعتين بعد التمرين",
    imageUrl: "/nutrition/carbs.jpg"
  },
  {
    id: "nut3",
    name: "الكالسيوم وفيتامين D",
    description: "ضروريان لصحة العظام وخاصة للراقصين الذين يضعون ضغطاً كبيراً على العظام",
    benefits: ["تقوية العظام", "منع هشاشة العظام", "تحسين وظيفة العضلات"],
    forBodyParts: [BodyPart.FullBody, BodyPart.Legs],
    whenToConsume: "بانتظام مع الوجبات اليومية",
    imageUrl: "/nutrition/calcium.jpg"
  },
  {
    id: "nut4",
    name: "مضادات الالتهاب الطبيعية",
    description: "أطعمة تساعد على تقليل الالتهاب الناتج عن التمارين المكثفة",
    benefits: ["تقليل الألم العضلي", "تسريع الشفاء", "تقليل الالتهاب"],
    forBodyParts: [BodyPart.FullBody],
    whenToConsume: "يومياً مع الوجبات",
    imageUrl: "/nutrition/anti-inflammatory.jpg"
  },
  {
    id: "nut5",
    name: "الماء والسوائل",
    description: "الترطيب ضروري لأداء مثالي ولتعويض السوائل المفقودة أثناء التمرين",
    benefits: ["منع الجفاف", "تحسين الأداء", "تسريع التعافي"],
    forBodyParts: [BodyPart.FullBody],
    whenToConsume: "قبل وأثناء وبعد التمرين، طوال اليوم",
    imageUrl: "/nutrition/hydration.jpg"
  }
];

const AnatomyAndNutrition = () => {
  const [activeTab, setActiveTab] = useState<string>('anatomy');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('all');

  // تصفية البيانات حسب جزء الجسم المختار
  const filteredAnatomy = selectedBodyPart === 'all' 
    ? anatomyParts 
    : anatomyParts.filter(part => part.relatedBodyParts.includes(selectedBodyPart as BodyPart));

  const filteredInjuries = selectedBodyPart === 'all'
    ? injuries
    : injuries.filter(injury => injury.relatedBodyParts.includes(selectedBodyPart as BodyPart));

  const filteredNutrition = selectedBodyPart === 'all'
    ? nutritionItems
    : nutritionItems.filter(item => item.forBodyParts.includes(selectedBodyPart as BodyPart));

  // تحديد الرمز حسب نوع العنصر
  const getIcon = (itemType: string) => {
    switch (itemType) {
      case 'anatomy':
        return <Bone className="h-5 w-5 ml-1" />;
      case 'bone':
        return <Bone className="h-5 w-5 ml-1" />;
      case 'injury':
        return <Bandage className="h-5 w-5 ml-1" />;
      case 'treatment':
        return <Bandage className="h-5 w-5 ml-1" />;
      case 'nutrition':
        return <Utensils className="h-5 w-5 ml-1" />;
      case 'benefits':
        return <Apple className="h-5 w-5 ml-1" />;
      case 'food':
        return <Salad className="h-5 w-5 ml-1" />;
      case 'apple':
        return <Apple className="h-5 w-5 ml-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="fixed inset-0 bg-ballet-light bg-opacity-50 -z-10"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="font-playfair text-4xl font-bold text-ballet-dark">
            التشريح والتغذية <span className="text-ballet-purple">للراقصين</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            معلومات أساسية عن تشريح الجسم، الإصابات المحتملة، والتغذية المناسبة
          </p>
        </div>

        {/* فلتر حسب أجزاء الجسم */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <Badge 
            className={`cursor-pointer text-sm px-3 py-1 ${selectedBodyPart === 'all' 
              ? 'bg-ballet-purple text-white' 
              : 'bg-white text-ballet-purple border-ballet-purple'}`}
            onClick={() => setSelectedBodyPart('all')}
          >
            كل أجزاء الجسم
          </Badge>
          
          {Object.values(BodyPart).map(part => (
            <Badge 
              key={part}
              className={`cursor-pointer text-sm px-3 py-1 ${selectedBodyPart === part 
                ? 'bg-ballet-purple text-white' 
                : 'bg-white text-ballet-purple border-ballet-purple'}`}
              onClick={() => setSelectedBodyPart(part)}
            >
              {part}
            </Badge>
          ))}
        </div>
        
        {/* علامات التبويب */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-white/50 p-1">
            <TabsTrigger 
              value="anatomy" 
              className="data-[state=active]:bg-ballet-pink/20 data-[state=active]:text-ballet-purple"
            >
              تشريح الجسم
            </TabsTrigger>
            <TabsTrigger 
              value="injuries" 
              className="data-[state=active]:bg-ballet-pink/20 data-[state=active]:text-ballet-purple"
            >
              الإصابات وعلاجها
            </TabsTrigger>
            <TabsTrigger 
              value="nutrition" 
              className="data-[state=active]:bg-ballet-pink/20 data-[state=active]:text-ballet-purple"
            >
              التغذية المناسبة
            </TabsTrigger>
          </TabsList>

          {/* محتوى تشريح الجسم */}
          <TabsContent value="anatomy" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAnatomy.map(part => (
                <Card key={part.id} className="overflow-hidden bg-white/90 border border-ballet-lavender/30">
                  <div className="p-0">
                    <img 
                      src={part.imageUrl || "/placeholder.svg"} 
                      alt={part.name} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {getIcon('anatomy')}
                      <h3 className="text-xl font-bold text-ballet-dark">{part.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{part.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {part.relatedBodyParts.map(bodyPart => (
                        <Badge key={bodyPart} className="bg-ballet-pink/20 text-ballet-purple border-ballet-purple/30">
                          {bodyPart}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
              
              {filteredAnatomy.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <p className="text-lg">لا توجد معلومات تشريحية متاحة لهذا الجزء من الجسم حالياً</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* محتوى الإصابات */}
          <TabsContent value="injuries" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              {filteredInjuries.map(injury => (
                <Card key={injury.id} className="overflow-hidden bg-white/90 border border-ballet-lavender/30">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="p-0">
                      <img 
                        src={injury.imageUrl || "/placeholder.svg"} 
                        alt={injury.name} 
                        className="w-full h-full max-h-60 object-cover"
                      />
                    </div>
                    <div className="p-4 md:col-span-2">
                      <div className="flex items-center mb-2">
                        {getIcon('injury')}
                        <h3 className="text-xl font-bold text-ballet-dark">{injury.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-3">{injury.description}</p>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="symptoms">
                          <AccordionTrigger className="text-ballet-purple font-medium">
                            الأعراض
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                              {injury.symptoms.map((symptom, index) => (
                                <li key={index}>{symptom}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="treatments">
                          <AccordionTrigger className="text-ballet-purple font-medium">
                            العلاج
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                              {injury.treatments.map((treatment, index) => (
                                <li key={index}>{treatment}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="prevention">
                          <AccordionTrigger className="text-ballet-purple font-medium">
                            الوقاية
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                              {injury.prevention.map((tip, index) => (
                                <li key={index}>{tip}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {injury.relatedBodyParts.map(bodyPart => (
                          <Badge key={bodyPart} className="bg-ballet-pink/20 text-ballet-purple border-ballet-purple/30">
                            {bodyPart}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {filteredInjuries.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <p className="text-lg">لا توجد معلومات عن إصابات متعلقة بهذا الجزء من الجسم حالياً</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* محتوى التغذية */}
          <TabsContent value="nutrition" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNutrition.map(item => (
                <Card key={item.id} className="overflow-hidden bg-white/90 border border-ballet-lavender/30">
                  <div className="p-0">
                    <img 
                      src={item.imageUrl || "/placeholder.svg"} 
                      alt={item.name} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {getIcon('food')}
                      <h3 className="text-xl font-bold text-ballet-dark">{item.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    <Accordion type="single" collapsible className="w-full mb-3">
                      <AccordionItem value="benefits">
                        <AccordionTrigger className="text-ballet-purple font-medium">
                          الفوائد
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {item.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="text-sm text-gray-700 mb-3">
                      <span className="font-medium">وقت التناول الأمثل: </span>
                      {item.whenToConsume}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.forBodyParts.map(bodyPart => (
                        <Badge key={bodyPart} className="bg-ballet-pink/20 text-ballet-purple border-ballet-purple/30">
                          {bodyPart}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
              
              {filteredNutrition.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <p className="text-lg">لا توجد معلومات غذائية متعلقة بهذا الجزء من الجسم حالياً</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AnatomyAndNutrition;
