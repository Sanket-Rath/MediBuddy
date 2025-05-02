
export const sendWhatsAppMessage = (phoneNumber: string, message: string) => {
  // Clean the phone number (remove spaces, dashes, etc.)
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // Create the WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
};
