
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Medicine, MedicineCategory } from '../types/medicine';
import { scheduleAllNotifications } from '../utils/notificationService';

interface MedicineContextType {
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, 'id' | 'taken'>) => void;
  deleteMedicine: (id: string) => void;
  markAsTaken: (id: string) => void;
  updateMedicine: (medicine: Medicine) => void;
  emergencyContact: string;
  setEmergencyContact: (contact: string) => void;
  getMedicinesByCategory: (category: MedicineCategory) => Medicine[];
  searchMedicines: (query: string) => Medicine[];
  notCompletedMedicines: Medicine[];
  completedMedicines: Medicine[];
}

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

export const MedicineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const savedMedicines = localStorage.getItem('medicines');
    return savedMedicines ? JSON.parse(savedMedicines) : [];
  });
  
  const [emergencyContact, setEmergencyContact] = useState<string>(() => {
    const savedContact = localStorage.getItem('emergencyContact');
    return savedContact || '';
  });

  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
    // Reschedule all notifications when medicines are updated
    scheduleAllNotifications(medicines);
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('emergencyContact', emergencyContact);
  }, [emergencyContact]);

  const addMedicine = (medicineData: Omit<Medicine, 'id' | 'taken'>) => {
    const newMedicine: Medicine = {
      ...medicineData,
      id: Date.now().toString(),
      taken: false
    };
    setMedicines(prevMedicines => [...prevMedicines, newMedicine]);
  };

  const deleteMedicine = (id: string) => {
    setMedicines(prevMedicines => prevMedicines.filter(med => med.id !== id));
  };

  const markAsTaken = (id: string) => {
    setMedicines(prevMedicines => prevMedicines.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
    
    // If it's a one-time medicine, remove it after marking as taken
    const medicine = medicines.find(med => med.id === id);
    if (medicine && medicine.category === 'One-time') {
      setTimeout(() => {
        deleteMedicine(id);
      }, 1000);
    }
  };

  const updateMedicine = (updatedMedicine: Medicine) => {
    setMedicines(prevMedicines => prevMedicines.map(med => 
      med.id === updatedMedicine.id ? updatedMedicine : med
    ));
  };

  const getMedicinesByCategory = (category: MedicineCategory) => {
    return medicines.filter(med => med.category === category);
  };

  const searchMedicines = (query: string) => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return medicines.filter(med => 
      med.name.toLowerCase().includes(lowerQuery)
    );
  };

  // Filter medicines for today that are not taken yet
  const notCompletedMedicines = medicines.filter(med => !med.taken);
  
  // Filter medicines for tomorrow that are taken today
  const completedMedicines = medicines.filter(med => med.taken);

  // Schedule notifications when component mounts
  useEffect(() => {
    const initializeNotifications = async () => {
      // Schedule notifications for all active medicines
      scheduleAllNotifications(medicines);
    };
    
    initializeNotifications();
  }, []);

  return (
    <MedicineContext.Provider value={{
      medicines,
      addMedicine,
      deleteMedicine,
      markAsTaken,
      updateMedicine,
      emergencyContact,
      setEmergencyContact,
      getMedicinesByCategory,
      searchMedicines,
      notCompletedMedicines,
      completedMedicines
    }}>
      {children}
    </MedicineContext.Provider>
  );
};

export const useMedicine = () => {
  const context = useContext(MedicineContext);
  if (context === undefined) {
    throw new Error('useMedicine must be used within a MedicineProvider');
  }
  return context;
};
