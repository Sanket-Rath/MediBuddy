
export type MedicineCategory = 'Regular' | 'Course' | 'One-time';
export type MedicineType = 'Tablet' | 'Capsule' | 'Syringe';

export interface Medicine {
  id: string;
  name: string;
  category: MedicineCategory;
  type: MedicineType;
  time: string; // Format: HH:MM
  taken: boolean;
  image?: string;
  startDate?: string; // For course medicines
  endDate?: string; // For course medicines
}
