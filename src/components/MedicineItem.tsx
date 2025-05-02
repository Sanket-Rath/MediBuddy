
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, Info, Trash2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Medicine } from '@/types/medicine';
import { useMedicine } from '@/contexts/MedicineContext';

interface MedicineItemProps {
  medicine: Medicine;
}

const MedicineItem: React.FC<MedicineItemProps> = ({ medicine }) => {
  const navigate = useNavigate();
  const { deleteMedicine, markAsTaken } = useMedicine();
  
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/medicine/${medicine.id}`);
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteMedicine(medicine.id);
  };
  
  const handleCheckClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    markAsTaken(medicine.id);
  };
  
  return (
    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg mb-2">
      <div className="flex items-center" onClick={() => navigate(`/medicine/${medicine.id}`)}>
        <ChevronRight className="h-5 w-5 mr-2" />
        <div className="flex flex-col">
          <span className="font-medium">{medicine.name}</span>
          <span className="text-xs text-gray-500">{medicine.time}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" onClick={handleCheckClick} title="Mark as taken">
          <Check className="h-4 w-4 text-green-500" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleInfoClick}>
          <Info className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDeleteClick}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default MedicineItem;
