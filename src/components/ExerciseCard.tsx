
import { Exercise } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MoveLeft } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

const ExerciseCard = ({ exercise, onClick }: ExerciseCardProps) => {
  const { name, description, bodyPart, duration, level, imageUrl } = exercise;

  // صورة افتراضية في حال عدم وجود صورة محددة
  const imageSrc = imageUrl || "https://placehold.co/600x400/f5d0e3/242038?text=تمرين+باليه";

  return (
    <Card 
      className="ballet-card overflow-hidden cursor-pointer" 
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <div className="relative">
          <h3 className="text-xl font-bold text-ballet-dark">{name}</h3>
          <div className="ballet-icon-bg">
            <MoveLeft className="h-full w-full opacity-10" />
          </div>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
        
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-ballet-pink/20 text-ballet-purple border-ballet-purple/30">
            {bodyPart}
          </Badge>
          
          <Badge variant="outline" className="bg-ballet-lavender/20 text-ballet-purple border-ballet-purple/30">
            {level}
          </Badge>
          
          <div className="flex items-center ml-auto text-sm text-gray-500">
            <Clock className="mr-1 h-4 w-4" />
            <span>{duration} دقيقة</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExerciseCard;
