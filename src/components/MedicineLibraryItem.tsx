
import React from 'react';
import { Button } from "@/components/ui/button";
import { Info, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMedicine } from '@/contexts/MedicineContext';
import { toast } from "@/components/ui/use-toast";

interface IndianMedicine {
  id: string;
  name: string;
  price: string;
  is_discontinued: boolean;
  manufacturer_name: string;
  type: string;
  pack_size_label: string;
  short_composition1: string;
  short_composition2: string;
}

interface MedicineLibraryItemProps {
  medicine: IndianMedicine;
}

const MedicineLibraryItem: React.FC<MedicineLibraryItemProps> = ({ medicine }) => {
  const navigate = useNavigate();
  const { addMedicine } = useMedicine();
  
  const handleAddMedicine = () => {
    const newMedicine = {
      name: medicine.name,
      category: 'Regular' as const,
      type: 'Tablet' as const, // Default to Tablet, can be modified later
      time: new Date().toTimeString().slice(0, 5), // Current time
    };
    
    addMedicine(newMedicine);
    toast({
      title: "Medicine added to your list",
      description: `${medicine.name} has been added to your medicines.`,
    });
  };
  
  return (
    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg mb-2">
      <div className="flex flex-col">
        <span className="font-medium">{medicine.name}</span>
        <span className="text-xs text-gray-500">{medicine.manufacturer_name}</span>
        <div className="text-xs">
          <span className="text-gray-600">
            {medicine.short_composition1}
            {medicine.short_composition2 && `, ${medicine.short_composition2}`}
          </span>
        </div>
        <span className="text-xs text-gray-500">₹{medicine.price} • {medicine.pack_size_label}</span>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" onClick={handleAddMedicine} title="Add to my medicines">
          <Plus className="h-4 w-4 text-green-500" />
        </Button>
        <Button variant="ghost" size="icon" title="More info">
          <Info className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MedicineLibraryItem;
