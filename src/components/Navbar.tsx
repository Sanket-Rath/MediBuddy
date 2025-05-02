
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useMedicine } from '../contexts/MedicineContext';

interface NavbarProps {
  showBackButton?: boolean;
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ showBackButton = false, title = "" }) => {
  const navigate = useNavigate();
  const { emergencyContact, setEmergencyContact } = useMedicine();
  const [contact, setContact] = useState(emergencyContact);

  const handleSaveContact = () => {
    setEmergencyContact(contact);
  };

  return (
    <div className="flex items-center justify-between p-4">
      {showBackButton ? (
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <X className="h-6 w-6" />
        </Button>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle className="text-lg font-medium mb-4">Menu</SheetTitle>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Add Emergency Contact</h3>
                <Input
                  placeholder="WhatsApp Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <Button onClick={handleSaveContact}>Save Contact</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
      
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      
      <div className="w-10"></div> {/* This is to maintain the navbar spacing */}
    </div>
  );
};

export default Navbar;
