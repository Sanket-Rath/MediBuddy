
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestNotificationPermission } from '@/utils/notificationService';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Request notification permission when the app starts
    requestNotificationPermission();
    
    // Navigate to home page
    navigate('/');
  }, [navigate]);
  
  return null;
};

export default Index;
