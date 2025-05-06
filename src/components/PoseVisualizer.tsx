
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// مجموعة من صور وضعيات الباليه للتصور
const poseImages = [
  {
    id: 'pose1',
    name: 'الأرابيسك',
    image: 'https://i.pinimg.com/originals/48/76/2f/48762ff0c15c1256a5e221fd19f274e5.png',
    description: 'وضعية كلاسيكية حيث يقف الراقص على ساق واحدة بينما تمتد الساق الأخرى للخلف والذراعان ممدودتان'
  },
  {
    id: 'pose2',
    name: 'آتيتود',
    image: 'https://i.pinimg.com/originals/c9/45/d2/c945d2fab5b5bb10c41cc9a35a4ded3e.png',
    description: 'وضعية مشابهة للأرابيسك، لكن مع ثني الساق الخلفية عند الركبة'
  },
  {
    id: 'pose3',
    name: 'جراند جوتيه',
    image: 'https://i.pinimg.com/originals/23/f8/09/23f809ea4f8185c006c3cbc6cc3b43ba.png',
    description: 'قفزة واسعة حيث يفتح الراقص ساقيه في الهواء'
  },
  {
    id: 'pose4',
    name: 'بيروات',
    image: 'https://i.pinimg.com/originals/ea/ce/0a/eace0a33693c6f7c95ded56134ded717.png',
    description: 'دوران على قدم واحدة'
  },
  {
    id: 'pose5',
    name: 'غران بلييه',
    image: 'https://i.pinimg.com/originals/0c/c7/a9/0cc7a98f7d9a4c54ba0c3f04b99b33c7.png',
    description: 'انحناء عميق مع فتح القدمين'
  }
];

const PoseVisualizer = () => {
  const [currentPose, setCurrentPose] = useState(poseImages[0]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const nextPose = () => {
    const currentIndex = poseImages.findIndex(pose => pose.id === currentPose.id);
    const nextIndex = (currentIndex + 1) % poseImages.length;
    setCurrentPose(poseImages[nextIndex]);
  };

  const prevPose = () => {
    const currentIndex = poseImages.findIndex(pose => pose.id === currentPose.id);
    const prevIndex = currentIndex === 0 ? poseImages.length - 1 : currentIndex - 1;
    setCurrentPose(poseImages[prevIndex]);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="mb-6">
      <Card 
        className={`overflow-hidden border border-ballet-lavender/30 bg-white/90 transition-all duration-300 ${
          isFullScreen ? 'fixed inset-0 z-50 rounded-none' : ''
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-ballet-lavender/20">
          <h3 className="font-bold text-ballet-dark">تصور الوضعيات</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullScreen}
            className="text-ballet-purple hover:text-ballet-purple/80 hover:bg-ballet-lavender/10"
          >
            {isFullScreen ? 'تصغير' : 'تكبير'}
          </Button>
        </div>
        
        <div className={`relative ${isFullScreen ? 'h-[calc(100vh-10rem)]' : 'h-80'}`}>
          <img 
            src={currentPose.image} 
            alt={currentPose.name} 
            className="w-full h-full object-contain"
          />
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent p-6">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
              <h4 className="font-playfair text-xl font-bold text-ballet-purple">{currentPose.name}</h4>
              <p className="text-gray-600 mt-1">{currentPose.description}</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 text-ballet-dark rounded-full h-10 w-10 p-0"
            onClick={prevPose}
          >
            &#10094;
          </Button>
          
          <Button
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 text-ballet-dark rounded-full h-10 w-10 p-0"
            onClick={nextPose}
          >
            &#10095;
          </Button>
        </div>
        
        <div className="p-4 flex justify-center space-x-2 space-x-reverse">
          {poseImages.map((pose, index) => (
            <div 
              key={pose.id}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                pose.id === currentPose.id ? 'bg-ballet-purple' : 'bg-ballet-lavender/40'
              }`}
              onClick={() => setCurrentPose(pose)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PoseVisualizer;
