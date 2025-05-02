
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileContainer from '@/components/MobileContainer';
import Navbar from '@/components/Navbar';
import CategoryCard from '@/components/CategoryCard';
import AddMedicineForm from '@/components/AddMedicineForm';
import BottomNavigation from '@/components/BottomNavigation';
import { useMedicine } from '@/contexts/MedicineContext';
import { requestNotificationPermission } from '@/utils/notificationService';

const HomePage: React.FC = () => {
  const { medicines, getMedicinesByCategory } = useMedicine();
  const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  
  useEffect(() => {
    // Request notification permissions when the app loads
    requestNotificationPermission();
  }, []);
  
  return (
    <MobileContainer>
      <div className="flex flex-col h-full pb-16">
        <Navbar />
        
        <div className="px-4 space-y-6 flex-1">
          <div>
            <h1 className="text-2xl font-bold text-medibuddy-primary">MediBuddy</h1>
            <p className="text-medibuddy-secondary text-sm">Worry less, Live Healthier</p>
          </div>
          
          <p className="text-medibuddy-gray font-medium">
            You have {medicines.length} Medicines
          </p>
          
          <div className="space-y-3">
            <CategoryCard 
              title="Regular" 
              count={getMedicinesByCategory('Regular').length} 
            />
            <CategoryCard 
              title="Course" 
              count={getMedicinesByCategory('Course').length} 
            />
            <CategoryCard 
              title="One-time" 
              count={getMedicinesByCategory('One-time').length} 
            />
          </div>
        </div>
        
        <Button 
          className="rounded-full w-12 h-12 fixed bottom-20 right-4 bg-medibuddy-secondary hover:bg-medibuddy-secondary/90 p-0"
          onClick={() => setIsAddMedicineOpen(true)}
        >
          <Plus className="h-5 w-5" />
        </Button>
        
        <BottomNavigation />
        
        <AddMedicineForm 
          open={isAddMedicineOpen} 
          onOpenChange={setIsAddMedicineOpen} 
        />
      </div>
    </MobileContainer>
  );
};

export default HomePage;
