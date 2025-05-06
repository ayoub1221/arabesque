
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { 
  Play, Pause, RotateCcw, Timer, ChevronUp, ChevronDown, 
  VolumeX, Volume2
} from 'lucide-react';

interface ExerciseTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  exerciseName?: string;
}

const ExerciseTimer = ({ 
  initialMinutes = 5,
  initialSeconds = 0,
  exerciseName = "تمرين باليه" 
}: ExerciseTimerProps) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(100);
  const alarmSound = useRef<HTMLAudioElement | null>(null);
  
  // إجمالي الوقت بالثواني للعداد الزمني
  const totalSeconds = useRef(initialMinutes * 60 + initialSeconds);
  const remainingSeconds = useRef(totalSeconds.current);
  
  // إنشاء صوت التنبيه
  useEffect(() => {
    alarmSound.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    return () => {
      if (alarmSound.current) {
        alarmSound.current.pause();
        alarmSound.current = null;
      }
    };
  }, []);

  // تحديث المؤقت
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = window.setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsRunning(false);
            setIsCompleted(true);
            if (alarmSound.current && !isMuted) {
              alarmSound.current.play();
            }
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
        
        // تحديث الوقت المتبقي والتقدم
        remainingSeconds.current = minutes * 60 + seconds - 1;
        setProgress((remainingSeconds.current / totalSeconds.current) * 100);
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, minutes, seconds, isMuted]);

  // إعادة تعيين العداد
  const resetTimer = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    totalSeconds.current = initialMinutes * 60 + initialSeconds;
    remainingSeconds.current = totalSeconds.current;
    setProgress(100);
    if (alarmSound.current) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
    }
  };

  // زيادة/نقصان الوقت
  const adjustTime = (type: 'minutes' | 'seconds', amount: number) => {
    if (!isRunning) {
      if (type === 'minutes') {
        const newMinutes = Math.max(0, minutes + amount);
        setMinutes(newMinutes);
        totalSeconds.current = newMinutes * 60 + seconds;
      } else {
        let newSeconds = seconds + amount;
        let newMinutes = minutes;
        
        if (newSeconds >= 60) {
          newMinutes++;
          newSeconds -= 60;
        } else if (newSeconds < 0 && newMinutes > 0) {
          newMinutes--;
          newSeconds += 60;
        } else if (newSeconds < 0) {
          newSeconds = 0;
        }
        
        setSeconds(newSeconds);
        setMinutes(newMinutes);
        totalSeconds.current = newMinutes * 60 + newSeconds;
      }
      
      remainingSeconds.current = totalSeconds.current;
      setProgress(100);
    }
  };

  // تبديل حالة الصوت
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // تنسيق الوقت للعرض
  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // حساب اللون بناءً على التقدم
  const getProgressColor = () => {
    if (progress > 60) return 'bg-green-500';
    if (progress > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="max-w-md mx-auto p-6 border border-ballet-lavender/30 bg-white/90">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-ballet-dark mb-1">
          {exerciseName}
        </h2>
        <p className="text-gray-600">وقت التمرين المتبقي</p>
      </div>
      
      <div className="relative mb-8 flex justify-center">
        <div className="dance-timer-gradient absolute inset-0 rounded-full blur-xl opacity-15 animate-pulse" />
        <div className="relative text-center">
          <span className="font-playfair text-6xl font-bold text-ballet-dark">
            {formatTime(minutes, seconds)}
          </span>
        </div>
      </div>
      
      <Progress 
        value={progress} 
        className={`h-2 mb-6 ${getProgressColor()}`} 
      />
      
      {!isRunning && !isCompleted && (
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex flex-col items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => adjustTime('minutes', 1)}
              className="text-ballet-purple hover:text-ballet-purple/80 hover:bg-ballet-lavender/10"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
            <span className="text-xs text-gray-500">دقائق</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => adjustTime('minutes', -1)}
              className="text-ballet-purple hover:text-ballet-purple/80 hover:bg-ballet-lavender/10"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => adjustTime('seconds', 5)}
              className="text-ballet-purple hover:text-ballet-purple/80 hover:bg-ballet-lavender/10"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
            <span className="text-xs text-gray-500">ثواني</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => adjustTime('seconds', -5)}
              className="text-ballet-purple hover:text-ballet-purple/80 hover:bg-ballet-lavender/10"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex justify-center space-x-3 space-x-reverse">
        <Button
          variant={isRunning ? "outline" : "default"}
          onClick={() => setIsRunning(!isRunning)}
          className={isRunning 
            ? "border-ballet-purple text-ballet-purple hover:bg-ballet-pink/10" 
            : "bg-ballet-purple hover:bg-ballet-purple/90"
          }
          disabled={isCompleted || (minutes === 0 && seconds === 0)}
        >
          {isRunning ? (
            <>
              <Pause className="h-5 w-5 ml-1" />
              إيقاف
            </>
          ) : (
            <>
              <Play className="h-5 w-5 ml-1" />
              بدء
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={resetTimer}
          className="border-ballet-lavender text-ballet-purple hover:bg-ballet-pink/10"
        >
          <RotateCcw className="h-5 w-5 ml-1" />
          إعادة
        </Button>
        
        <Button
          variant="ghost"
          onClick={toggleMute}
          className="text-ballet-purple hover:text-ballet-purple/80 hover:bg-ballet-lavender/10"
          title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {isCompleted && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-center text-green-700">
          <p className="font-medium">أحسنت! لقد أكملت التمرين.</p>
        </div>
      )}
    </Card>
  );
};

export default ExerciseTimer;
