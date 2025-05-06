
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ExerciseCard from '@/components/ExerciseCard';
import { defaultExercises } from '@/lib/data';
import { Exercise, BodyPart, ExerciseLevel, ToastVariant } from '@/lib/types';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";

const Exercises = () => {
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bodyPartFilter, setBodyPartFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  useEffect(() => {
    // في التطبيق الحقيقي، يمكن استدعاء API أو قراءة البيانات من قاعدة بيانات
    setExercises(defaultExercises);
    setFilteredExercises(defaultExercises);
  }, []);
  
  // تطبيق الفلترة
  useEffect(() => {
    let filtered = exercises;
    
    // فلترة حسب البحث
    if (searchQuery) {
      filtered = filtered.filter(exercise => 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // فلترة حسب جزء الجسم
    if (bodyPartFilter !== 'all') {
      filtered = filtered.filter(exercise => exercise.bodyPart === bodyPartFilter);
    }
    
    // فلترة حسب المستوى
    if (levelFilter !== 'all') {
      filtered = filtered.filter(exercise => exercise.level === levelFilter);
    }
    
    setFilteredExercises(filtered);
  }, [exercises, searchQuery, bodyPartFilter, levelFilter]);
  
  // عرض تفاصيل التمرين
  const handleViewExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setOpenDialog(true);
  };
  
  // إضافة تمرين للجدول
  const handleScheduleExercise = () => {
    if (selectedExercise) {
      toast({
        title: "تمت إضافة التمرين",
        description: `تمت إضافة ${selectedExercise.name} إلى جدولك`,
        variant: "success" as ToastVariant,
      });
      setOpenDialog(false);
    }
  };
  
  // تنظيم التمارين حسب المستوى
  const exercisesByLevel = {
    beginner: filteredExercises.filter(ex => ex.level === ExerciseLevel.Beginner),
    intermediate: filteredExercises.filter(ex => ex.level === ExerciseLevel.Intermediate),
    advanced: filteredExercises.filter(ex => ex.level === ExerciseLevel.Advanced),
    professional: filteredExercises.filter(ex => ex.level === ExerciseLevel.Professional),
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="fixed inset-0 bg-ballet-light bg-opacity-50 -z-10"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="font-playfair text-4xl font-bold text-ballet-dark">
            مكتبة <span className="text-ballet-purple">التمارين</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            اكتشف مجموعة متنوعة من تمارين الباليه حسب مناطق الجسم والمستوى
          </p>
        </div>
        
        {/* أدوات البحث والفلترة */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          <Input
            placeholder="ابحث عن تمرين..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/90 border-ballet-lavender/30"
          />
          
          <Select value={bodyPartFilter} onValueChange={setBodyPartFilter}>
            <SelectTrigger className="bg-white/90 border-ballet-lavender/30">
              <SelectValue placeholder="جميع أجزاء الجسم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع أجزاء الجسم</SelectItem>
              {Object.values(BodyPart).map(part => (
                <SelectItem key={part} value={part}>{part}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="bg-white/90 border-ballet-lavender/30">
              <SelectValue placeholder="جميع المستويات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المستويات</SelectItem>
              {Object.values(ExerciseLevel).map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* عرض التمارين */}
        <Tabs defaultValue="all" className="animate-fade-in">
          <TabsList className="mb-6 bg-white/50 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-ballet-pink/20 data-[state=active]:text-ballet-purple">
              الكل ({filteredExercises.length})
            </TabsTrigger>
            <TabsTrigger value="beginner" className="data-[state=active]:bg-ballet-pink/20 data-[state=active]:text-ballet-purple">
              مبتدئ ({exercisesByLevel.beginner.length})
            </TabsTrigger>
            <TabsTrigger value="intermediate" className="data-[state=active]:bg-ballet-pink/20 data-[state=active]:text-ballet-purple">
              متوسط ({exercisesByLevel.intermediate.length})
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-ballet-pink/20 data-[state=active]:text-ballet-purple">
              متقدم ({exercisesByLevel.advanced.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map(exercise => (
                <ExerciseCard 
                  key={exercise.id} 
                  exercise={exercise} 
                  onClick={() => handleViewExercise(exercise)}
                />
              ))}
              
              {filteredExercises.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  <p className="text-lg">لم يتم العثور على تمارين تطابق معايير البحث</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {Object.keys(exercisesByLevel).map(level => (
            <TabsContent key={level} value={level} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercisesByLevel[level as keyof typeof exercisesByLevel].map(exercise => (
                  <ExerciseCard 
                    key={exercise.id} 
                    exercise={exercise} 
                    onClick={() => handleViewExercise(exercise)}
                  />
                ))}
                
                {exercisesByLevel[level as keyof typeof exercisesByLevel].length === 0 && (
                  <div className="col-span-full py-12 text-center text-gray-500">
                    <p className="text-lg">لم يتم العثور على تمارين في هذا المستوى</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      {/* حوار تفاصيل التمرين */}
      {selectedExercise && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white/95 backdrop-blur-sm max-w-3xl" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-ballet-dark">{selectedExercise.name}</DialogTitle>
              <DialogDescription className="text-gray-600 mt-2">{selectedExercise.description}</DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <img 
                  src={selectedExercise.imageUrl || "https://placehold.co/600x400/f5d0e3/242038?text=تمرين+باليه"} 
                  alt={selectedExercise.name} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">معلومات التمرين</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-ballet-pink/20 hover:bg-ballet-pink/30 text-ballet-purple border-ballet-purple/30">
                      {selectedExercise.bodyPart}
                    </Badge>
                    <Badge className="bg-ballet-lavender/20 hover:bg-ballet-lavender/30 text-ballet-purple border-ballet-purple/30">
                      {selectedExercise.level}
                    </Badge>
                    <Badge className="bg-ballet-light hover:bg-ballet-light/80 text-ballet-purple border-ballet-purple/30">
                      {selectedExercise.duration} دقيقة
                    </Badge>
                  </div>
                </div>
                
                {selectedExercise.notes && (
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">ملاحظات</h4>
                    <p className="text-gray-700">{selectedExercise.notes}</p>
                  </div>
                )}
                
                <div className="pt-4">
                  <button 
                    onClick={handleScheduleExercise}
                    className="w-full rounded-md bg-ballet-purple px-4 py-2 text-white hover:bg-ballet-purple/90 transition-colors"
                  >
                    إضافة إلى جدولي
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Exercises;
