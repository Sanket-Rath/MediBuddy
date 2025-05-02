
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Navbar from '@/components/Navbar';
import MedicineItem from '@/components/MedicineItem';
import MedicineLibraryItem from '@/components/MedicineLibraryItem';
import BottomNavigation from '@/components/BottomNavigation';
import { useMedicine } from '@/contexts/MedicineContext';
import { IndianMedicine } from '@/types/indianMedicine';
import medicinesData from '@/data/indianMedicines.json';

const SearchPage: React.FC = () => {
  const { searchMedicines } = useMedicine();
  const [query, setQuery] = useState('');
  const [myMedicines, setMyMedicines] = useState<ReturnType<typeof searchMedicines>>([]);
  const [libraryResults, setLibraryResults] = useState<IndianMedicine[]>([]);
  const [activeTab, setActiveTab] = useState<'library' | 'myMedicines'>('library');
  
  useEffect(() => {
    if (query.trim()) {
      // Search in my medicines
      const myMedicinesResults = searchMedicines(query);
      setMyMedicines(myMedicinesResults);
      
      // Search in medicine library
      const librarySearchResults = medicinesData.filter(med => 
        med.name.toLowerCase().includes(query.toLowerCase()) ||
        med.manufacturer_name.toLowerCase().includes(query.toLowerCase()) ||
        med.short_composition1.toLowerCase().includes(query.toLowerCase()) ||
        med.short_composition2.toLowerCase().includes(query.toLowerCase())
      );
      setLibraryResults(librarySearchResults);
    } else {
      setMyMedicines([]);
      setLibraryResults([]);
    }
  }, [query, searchMedicines]);
  
  return (
    <MobileContainer>
      <div className="flex flex-col h-full pb-16">
        <Navbar showBackButton />
        
        <div className="px-4 space-y-4 flex-1">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-medibuddy-primary">MediBuddy</h1>
            <p className="text-medibuddy-secondary text-sm">Search Feature</p>
          </div>
          
          <div className="relative">
            <SearchIcon className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search medicines..." 
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          {query.trim() && (
            <div className="flex space-x-2 border-b">
              <button
                className={`py-2 px-4 ${activeTab === 'library' ? 'border-b-2 border-medibuddy-primary font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('library')}
              >
                Medicine Library
              </button>
              <button
                className={`py-2 px-4 ${activeTab === 'myMedicines' ? 'border-b-2 border-medibuddy-primary font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('myMedicines')}
              >
                My Medicines
              </button>
            </div>
          )}
          
          <div className="space-y-2 mt-2">
            {query.trim() ? (
              activeTab === 'library' ? (
                libraryResults.length === 0 ? (
                  <p className="text-center text-gray-500">No medicines found in library</p>
                ) : (
                  libraryResults.map((medicine) => (
                    <MedicineLibraryItem key={medicine.id} medicine={medicine} />
                  ))
                )
              ) : (
                myMedicines.length === 0 ? (
                  <p className="text-center text-gray-500">No medicines found in your list</p>
                ) : (
                  myMedicines.map((medicine) => (
                    <MedicineItem key={medicine.id} medicine={medicine} />
                  ))
                )
              )
            ) : (
              <p className="text-center text-gray-500 mt-8">
                Search for medicines by name, manufacturer, or composition
              </p>
            )}
          </div>
        </div>
        
        <BottomNavigation />
      </div>
    </MobileContainer>
  );
};

export default SearchPage;
