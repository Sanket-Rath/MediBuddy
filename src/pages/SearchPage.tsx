
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Navbar from '@/components/Navbar';
import MedicineItem from '@/components/MedicineItem';
import BottomNavigation from '@/components/BottomNavigation';
import { useMedicine } from '@/contexts/MedicineContext';

const SearchPage: React.FC = () => {
  const { searchMedicines } = useMedicine();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchMedicines>>([]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      setResults(searchMedicines(value));
    } else {
      setResults([]);
    }
  };
  
  return (
    <MobileContainer>
      <div className="flex flex-col h-full pb-16">
        <Navbar showBackButton />
        
        <div className="px-4 space-y-6 flex-1">
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
              onChange={handleSearch}
            />
          </div>
          
          <div className="space-y-2 mt-4">
            {query.trim() && results.length === 0 ? (
              <p className="text-center text-gray-500">No medicines found</p>
            ) : (
              results.map((medicine) => (
                <MedicineItem key={medicine.id} medicine={medicine} />
              ))
            )}
          </div>
        </div>
        
        <BottomNavigation />
      </div>
    </MobileContainer>
  );
};

export default SearchPage;
