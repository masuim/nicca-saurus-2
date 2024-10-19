'use client';
import React, { createContext, ReactNode, useContext, useState, useCallback } from 'react';

type FlashMessage = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

type FlashMessageContextType = {
  flashMessages: FlashMessage[];
  showFlashMessage: (message: string, type: FlashMessage['type']) => void;
  hideFlashMessage: (id: string) => void;
};

const FlashMessageContext = createContext<FlashMessageContextType | undefined>(undefined);

export const FlashMessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flashMessages, setFlashMessages] = useState<FlashMessage[]>([]);

  const showFlashMessage = useCallback((message: string, type: FlashMessage['type']) => {
    const id = Date.now().toString();
    setFlashMessages((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setFlashMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 5000);
  }, []);

  const hideFlashMessage = useCallback((id: string) => {
    setFlashMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return (
    <FlashMessageContext.Provider value={{ flashMessages, showFlashMessage, hideFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (context === undefined) {
    throw new Error('useFlashMessageはFlashMessageProviderの中で使用する必要があります');
  }
  return context;
};
