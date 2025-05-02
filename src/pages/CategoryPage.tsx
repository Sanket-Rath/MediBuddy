
import React from 'react';
import { useParams } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import Navbar from '@/components/Navbar';
import MedicineItem from '@/components/MedicineItem';
import BottomNavigation from '@/components/BottomNavigation';
import { useMedicine } from '@/contexts/MedicineContext';
import { MedicineCategory } from '@/types/medicine';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { getMedicinesByCategory, notCompletedMedicines, completedMedicines } = useMedicine();
  
  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) as MedicineCategory : '';
  const medicines = getMedicinesByCategory(categoryTitle as MedicineCategory);
  
  // Get medicines that are not completed for today's section
  const todayMedicines = medicines.filter(med => !med.taken);
  
  // Get medicines that are completed for tomorrow's section
  const tomorrowMedicines = medicines.filter(med => med.taken);
  
  return (
    <MobileContainer>
      <div className="flex flex-col h-full pb-16">
        <Navbar showBackButton title={categoryTitle} />
        
        <div className="px-4 space-y-6 flex-1">
          <h2 className="text-lg font-semibold">{categoryTitle} Medicines</h2>
          
          {medicines.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-medibuddy-gray">No medicines here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayMedicines.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Today</h3>
                  <div className="space-y-2">
                    {todayMedicines.map((medicine) => (
                      <MedicineItem key={medicine.id} medicine={medicine} />
                    ))}
                  </div>
                </div>
              )}
              
              {tomorrowMedicines.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Tomorrow</h3>
                  <div className="space-y-2">
                    {tomorrowMedicines.map((medicine) => (
                      <MedicineItem key={medicine.id} medicine={medicine} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <BottomNavigation />
      </div>
    </MobileContainer>
  );
};

export default CategoryPage;
