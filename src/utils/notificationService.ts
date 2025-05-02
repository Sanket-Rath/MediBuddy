
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
  const [hours, minutes] = medicine.time.split(':');
  
  const notificationTime = new Date();
  notificationTime.setHours(parseInt(hours));
  notificationTime.setMinutes(parseInt(minutes));
  notificationTime.setSeconds(0);
  
  // If time has already passed today, schedule for tomorrow
  if (notificationTime < now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }
  
  const timeUntilNotification = notificationTime.getTime() - now.getTime();
  
  // Schedule notification
  setTimeout(() => {
    showNotification(medicine);
  }, timeUntilNotification);
  
  return timeUntilNotification;
};

// Function to show a notification
export const showNotification = (medicine: Medicine) => {
  // Show in-app toast notification
  toast({
    title: 'Medicine Reminder',
    description: `Time to take your ${medicine.name}`,
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
