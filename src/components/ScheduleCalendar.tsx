
import { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { ScheduledExercise } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Check, Clock } from 'lucide-react';

interface ScheduleCalendarProps {
  scheduledExercises: ScheduledExercise[];
  onComplete: (id: string) => void;
}

const ScheduleCalendar = ({ scheduledExercises, onComplete }: ScheduleCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // الحصول على التمارين الخاصة بالتاريخ المحدد
  const exercisesForSelectedDate = selectedDate
    ? scheduledExercises.filter(exercise => 
        isSameDay(new Date(exercise.scheduledDate), selectedDate)
      )
    : [];

  // حساب إجمالي المدة الزمنية للتمارين في اليوم المحدد
  const totalDuration = exercisesForSelectedDate.reduce(
    (total, exercise) => total + exercise.duration, 
    0
  );

  // تحديد الأيام التي تحتوي على تمارين للعرض في التقويم
  function getDaysWithExercises() {
    const uniqueDates = new Set<number>();
    scheduledExercises.forEach(exercise => {
      const date = new Date(exercise.scheduledDate);
      uniqueDates.add(date.getTime());
    });
    return Array.from(uniqueDates).map(timestamp => new Date(timestamp));
  }

  // إنشاء تمثيل مرئي للأيام التي لها تمارين في التقويم
  function dayHasExercises(day: Date) {
    return scheduledExercises.some(exercise => 
      isSameDay(new Date(exercise.scheduledDate), day)
    );
  }

  // تخصيص أسلوب عرض أيام التقويم
  function dayClassName(date: Date) {
    // التحقق ما إذا كان اليوم يحتوي على تمارين
    const hasExercises = dayHasExercises(date);
    
    if (hasExercises) {
      return "relative flex h-8 w-8 items-center justify-center rounded-full bg-ballet-pink text-white font-medium transition-colors";
    }
    
    return undefined;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 p-4 border border-ballet-lavender/30 bg-white/90">
          <h3 className="text-lg font-bold text-ballet-dark mb-2">التقويم</h3>
          <div dir="ltr">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ar}
              className="p-3 pointer-events-auto"
              modifiers={{
                booked: getDaysWithExercises()
              }}
              modifiersClassNames={{
                booked: "has-exercises"
              }}
              components={{
                DayContent: (props) => {
                  const date = props.date;
                  const dayClassName = dayHasExercises(date) 
                    ? "relative flex h-8 w-8 items-center justify-center rounded-full bg-ballet-pink text-white font-medium hover:bg-ballet-purple transition-colors" 
                    : undefined;
                  
                  return (
                    <div className={dayClassName}>
                      {props.date.getDate()}
                    </div>
                  );
                }
              }}
            />
          </div>
        </Card>

        <Card className="flex-1 p-4 border border-ballet-lavender/30 bg-white/90">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-ballet-dark">
              تمارين يوم {selectedDate ? format(selectedDate, 'EEEE d MMMM', { locale: ar }) : ''}
            </h3>
            {exercisesForSelectedDate.length > 0 && (
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{totalDuration} دقيقة</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {exercisesForSelectedDate.length > 0 ? (
              exercisesForSelectedDate.map((exercise) => (
                <div 
                  key={exercise.id} 
                  className="flex items-center justify-between p-3 rounded-md bg-ballet-light border border-ballet-lavender/20"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-ballet-dark">{exercise.name}</h4>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <Badge variant="outline" className="bg-ballet-lavender/10 border-ballet-lavender/20 text-ballet-purple">
                        {exercise.bodyPart}
                      </Badge>
                      <span className="mx-2">•</span>
                      <span>{exercise.duration} دقيقة</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => onComplete(exercise.id)}
                    variant={exercise.completed ? "default" : "outline"}
                    size="sm"
                    className={exercise.completed 
                      ? "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 border-green-200" 
                      : "border-ballet-lavender hover:border-ballet-purple"
                    }
                  >
                    {exercise.completed ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        تم
                      </>
                    ) : "إكمال"}
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>لا توجد تمارين مجدولة لهذا اليوم</p>
                <Button variant="link" className="mt-2 text-ballet-purple">
                  إضافة تمرين
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
