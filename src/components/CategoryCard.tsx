
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Timer, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MedicineCategory } from '@/types/medicine';

interface CategoryCardProps {
  title: MedicineCategory;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, count }) => {
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (title) {
      case 'Regular':
        return <Calendar className="h-6 w-6 text-medibuddy-primary" />;
      case 'Course':
        return <Timer className="h-6 w-6 text-medibuddy-primary" />;
      case 'One-time':
        return <Hash className="h-6 w-6 text-medibuddy-primary" />;
      default:
        return <Clock className="h-6 w-6 text-medibuddy-primary" />;
    }
  };
  
  const handleCardClick = () => {
    navigate(`/category/${title.toLowerCase()}`);
  };
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleCardClick}>
      <CardContent className="p-4 flex items-start space-x-4">
        <div className="p-2 rounded-full bg-medibuddy-background">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-medibuddy-gray text-sm">{count} medicines</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
