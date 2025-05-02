
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, List } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white border-t h-16 flex items-center justify-around z-10">
      <Button 
        variant={isActive('/search') ? "default" : "ghost"} 
        onClick={() => navigate('/search')}
        className="flex flex-col items-center space-y-1 h-12"
      >
        <Search className="h-5 w-5" />
        <span className="text-xs">Search</span>
      </Button>
      
      <Button 
        variant={isActive('/') ? "default" : "ghost"} 
        onClick={() => navigate('/')}
        className="flex flex-col items-center space-y-1 h-12"
      >
        <List className="h-5 w-5" />
        <span className="text-xs">Listing</span>
      </Button>
    </div>
  );
};

export default BottomNavigation;
