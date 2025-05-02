
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Medicine, MedicineCategory, MedicineType } from '@/types/medicine';
import { useMedicine } from '@/contexts/MedicineContext';

interface AddMedicineFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddMedicineForm: React.FC<AddMedicineFormProps> = ({ open, onOpenChange }) => {
  const { addMedicine } = useMedicine();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MedicineCategory>('Regular');
  const [type, setType] = useState<MedicineType>('Tablet');
  const [time, setTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !category || !type || !time) {
      return;
    }
    
    const newMedicine: Omit<Medicine, 'id' | 'taken'> = {
      name,
      category,
      type,
      time,
    };
    
    // Add course-specific fields
    if (category === 'Course') {
      newMedicine.startDate = startDate;
      newMedicine.endDate = endDate;
    }
    
    addMedicine(newMedicine);
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setName('');
    setCategory('Regular');
    setType('Tablet');
    setTime('');
    setStartDate('');
    setEndDate('');
  };
  
  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Medicine</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Medicine Name*</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category*</Label>
            <Select 
              value={category} 
              onValueChange={(value) => setCategory(value as MedicineCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Regular">Regular</SelectItem>
                <SelectItem value="Course">Course</SelectItem>
                <SelectItem value="One-time">One-time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Medicine Type*</Label>
            <Select 
              value={type} 
              onValueChange={(value) => setType(value as MedicineType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tablet">Tablet</SelectItem>
                <SelectItem value="Capsule">Capsule</SelectItem>
                <SelectItem value="Syringe">Syringe</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Reminder Time*</Label>
            <Input 
              id="time" 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              required 
            />
          </div>
          
          {category === 'Course' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate" 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                />
              </div>
            </>
          )}
          
          <DialogFooter className="flex space-x-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicineForm;
