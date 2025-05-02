
import React, { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-[420px] h-[90vh] max-h-[800px] overflow-y-auto bg-medibuddy-background rounded-3xl shadow-lg relative">
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
