import React from 'react';

interface AuthTemplateProps {
  children: React.ReactNode;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center">{children}</div>
    </div>
  );
};
