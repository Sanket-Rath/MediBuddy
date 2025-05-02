
import { Medicine } from '../types/medicine';
import { toast } from '@/components/ui/use-toast';

// Function to request notification permissions
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

// Function to schedule notifications for a medicine
export const scheduleNotification = (medicine: Medicine) => {
  const now = new Date();
  const [hours, minutes] = medicine.time.split(':').map(Number);
  
  const notificationTime = new Date();
  notificationTime.setHours(hours);
  notificationTime.setMinutes(minutes);
  notificationTime.setSeconds(0);
  
  // If time has already passed today, schedule for tomorrow
  if (notificationTime < now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }
  
  const timeUntilNotification = notificationTime.getTime() - now.getTime();
  
  console.log(`Scheduled notification for ${medicine.name} at ${medicine.time} (${timeUntilNotification}ms from now)`);
  
  // Schedule notification
  const timerId = setTimeout(() => {
    showNotification(medicine);
  }, timeUntilNotification);
  
  return timerId;
};

// Function to show a notification
export const showNotification = (medicine: Medicine) => {
  // Show in-app toast notification
  toast({
    title: 'Medicine Reminder',
    description: `Time to take your ${medicine.name}`,
    duration: 10000, // Show for 10 seconds
  });
  
  // Show system notification if permission is granted
  if (Notification.permission === 'granted') {
    new Notification('MediBuddy Reminder', {
      body: `Time to take your ${medicine.name}`,
      icon: '/icon.png' // You'll need to add this icon
    });
    
    // Play a sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(error => console.log('Error playing sound', error));
  }
};

// Function to reschedule all notifications
export const scheduleAllNotifications = (medicines: Medicine[]) => {
  // Only schedule for medicines that are not taken yet
  const activeMedicines = medicines.filter(med => !med.taken);
  
  activeMedicines.forEach(medicine => {
    if (medicine.category !== 'One-time' || !medicine.taken) {
      scheduleNotification(medicine);
    }
  });
};
