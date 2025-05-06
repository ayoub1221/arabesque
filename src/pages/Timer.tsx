
import { useState } from 'react';
import Header from '@/components/Header';
import ExerciseTimer from '@/components/ExerciseTimer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { defaultExercises } from '@/lib/data';
import { Exercise } from '@/lib/types';

const Timer = () => {
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [exerciseName, setExerciseName] = useState("تمرين باليه");
  const [customTimerActive, setCustomTimerActive] = useState(false);
  
  // اختيار تمرين من القائمة
  const handleSelectExercise = (exercise: Exercise) => {
    setExerciseName(exercise.name);
    setTimerMinutes(exercise.duration);
    setTimerSeconds(0);
    setCustomTimerActive(true);
  };
  
  // بدء مؤقت مخصص
  const handleStartCustomTimer = () => {
    setCustomTimerActive(true);
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="fixed inset-0 bg-ballet-light bg-opacity-50 -z-10"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="font-playfair text-4xl font-bold text-ballet-dark">
            عداد <span className="text-ballet-purple">التمرين</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            تتبع وقت تمارينك للحصول على أفضل النتائج
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* عمود المؤقت */}
          <div className="lg:col-span-2">
            <div className="animate-fade-in">
              {customTimerActive ? (
                <ExerciseTimer
                  initialMinutes={timerMinutes}
                  initialSeconds={timerSeconds}
                  exerciseName={exerciseName}
                />
              ) : (
                <Card className="p-8 text-center border border-ballet-lavender/30 bg-white/90 h-96 flex flex-col items-center justify-center">
                  <h3 className="text-2xl font-bold text-ballet-dark mb-6">اختر تمريناً للبدء</h3>
                  <p className="text-gray-600 mb-6">
                    اختر من قائمة التمارين أو قم بإعداد مؤقت مخصص
                  </p>
                  <div className="flex flex-col md:flex-row gap-3">
                    <Input
                      type="number"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                      min={0}
                      max={60}
                      className="w-24 border-ballet-lavender/30"
                      placeholder="دقائق"
                    />
                    <span className="hidden md:inline text-gray-500 self-center">:</span>
                    <Input
                      type="number"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)}
                      min={0}
                      max={59}
                      className="w-24 border-ballet-lavender/30"
                      placeholder="ثواني"
                    />
                    <Input
                      value={exerciseName}
                      onChange={(e) => setExerciseName(e.target.value)}
                      className="md:w-48 border-ballet-lavender/30"
                      placeholder="اسم التمرين"
                    />
                    <Button 
                      onClick={handleStartCustomTimer}
                      className="bg-ballet-purple hover:bg-ballet-purple/90"
                    >
                      بدء
                    </Button>
                  </div>
                </Card>
              )}
            </div>
            
            {/* أزرار إعادة الضبط */}
            {customTimerActive && (
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => setCustomTimerActive(false)}
                  className="border-ballet-lavender/30 text-ballet-purple hover:bg-ballet-pink/10"
                >
                  إعداد مؤقت جديد
                </Button>
              </div>
            )}
          </div>
          
          {/* عمود التمارين المقترحة */}
          <div>
            <Card className="border border-ballet-lavender/30 bg-white/90 animate-fade-in">
              <div className="p-4 border-b border-ballet-lavender/20">
                <h3 className="font-bold text-ballet-dark">تمارين مقترحة</h3>
              </div>
              
              <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
                {defaultExercises.map(exercise => (
                  <div 
                    key={exercise.id}
                    className="p-3 rounded-md hover:bg-ballet-pink/10 cursor-pointer transition-colors"
                    onClick={() => handleSelectExercise(exercise)}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-ballet-dark">{exercise.name}</h4>
                      <span className="text-sm text-gray-500">{exercise.duration} دقيقة</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{exercise.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timer;
