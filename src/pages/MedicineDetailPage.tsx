
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Navbar from '@/components/Navbar';
import { useMedicine } from '@/contexts/MedicineContext';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const MedicineDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { medicines, updateMedicine, emergencyContact } = useMedicine();
  const medicine = medicines.find(med => med.id === id);
  
  const [image, setImage] = useState<string | undefined>(medicine?.image);
  const [time, setTime] = useState(medicine?.time || '');
  
  useEffect(() => {
    // Update local state when medicine changes
    if (medicine) {
      setTime(medicine.time);
      setImage(medicine.image);
    }
  }, [medicine]);
  
  if (!medicine) {
    return (
      <MobileContainer>
        <Navbar showBackButton />
        <div className="flex items-center justify-center h-full">
          <p>Medicine not found</p>
        </div>
      </MobileContainer>
    );
  }
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        
        if (medicine) {
          updateMedicine({
            ...medicine,
            image: base64String
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleTimeChange = () => {
    if (medicine && time !== medicine.time) {
      updateMedicine({
        ...medicine,
        time
      });
      toast({
        title: "Time Updated",
        description: `${medicine.name} will now remind you at ${time}`,
      });
    }
  };
  
  const handleWhatsappClick = () => {
    if (emergencyContact) {
      const message = `Hey! I'm out of ${medicine.name} medicine. Can you get it for me??`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${emergencyContact}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    } else {
      toast({
        title: "No Emergency Contact",
        description: "Please add an emergency contact in the menu",
        variant: "destructive"
      });
    }
  };
  
  return (
    <MobileContainer>
      <div className="flex flex-col h-full">
        <Navbar showBackButton />
        
        <div className="px-4 space-y-6 flex-1">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden mb-2">
                  {image ? (
                    <img src={image} alt={medicine.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                
                <Label htmlFor="image-upload" className="cursor-pointer text-sm text-medibuddy-primary">
                  Upload Image
                </Label>
                <Input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                />
              </div>
              
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {medicine.name}</p>
                <p><span className="font-medium">Type:</span> {medicine.type}</p>
                
                {(medicine.category === 'Regular' || medicine.category === 'Course') && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Time:</span>
                    <Input 
                      type="time" 
                      value={time} 
                      onChange={(e) => setTime(e.target.value)} 
                      className="w-32" 
                    />
                    <Button size="sm" onClick={handleTimeChange}>
                      Update
                    </Button>
                  </div>
                )}
                
                {medicine.category === 'Course' && (
                  <>
                    {medicine.startDate && <p><span className="font-medium">Start Date:</span> {medicine.startDate}</p>}
                    {medicine.endDate && <p><span className="font-medium">End Date:</span> {medicine.endDate}</p>}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          className="rounded-full w-12 h-12 fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 p-0"
          onClick={handleWhatsappClick}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>
    </MobileContainer>
  );
};

export default MedicineDetailPage;
