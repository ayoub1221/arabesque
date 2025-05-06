
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ScheduleCalendar from '@/components/ScheduleCalendar';
import PoseVisualizer from '@/components/PoseVisualizer';
import { defaultScheduledExercises } from '@/lib/data';
import { ScheduledExercise, ToastVariant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [scheduledExercises, setScheduledExercises] = useState<ScheduledExercise[]>([]);
  
  useEffect(() => {
    // في التطبيق الحقيقي، يمكن استدعاء API أو قراءة البيانات من قاعدة بيانات
    setScheduledExercises(defaultScheduledExercises);
  }, []);
  
  // إكمال التمرين
  const handleCompleteExercise = (id: string) => {
    setScheduledExercises(prev => 
      prev.map(exercise => 
        exercise.id === id 
          ? { ...exercise, completed: !exercise.completed } 
          : exercise
      )
    );
    
    const exercise = scheduledExercises.find(ex => ex.id === id);
    if (exercise) {
      toast({
        title: exercise.completed ? "تم إلغاء إكمال التمرين" : "تم إكمال التمرين بنجاح!",
        description: exercise.name,
        variant: exercise.completed ? "default" : "success" as ToastVariant,
      });
    }
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="fixed inset-0 bg-ballet-light bg-opacity-50 -z-10"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="font-playfair text-4xl font-bold text-ballet-dark">
            جدول تمارين <span className="text-ballet-purple">الباليه</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            نظم وتتبع تمارينك للحصول على أفضل النتائج
          </p>
        </div>
        
        {/* قسم المحتوى الرئيسي */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* عمود التقويم والجدول */}
          <div className="lg:col-span-2 space-y-6">
            <ScheduleCalendar 
              scheduledExercises={scheduledExercises}
              onComplete={handleCompleteExercise}
            />
          </div>
          
          {/* عمود التصور */}
          <div>
            <PoseVisualizer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
