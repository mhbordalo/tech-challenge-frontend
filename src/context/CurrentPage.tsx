import { createContext, useContext, useState, ReactNode } from 'react';

interface CurrentPageContextType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const CurrentPageContext = createContext<CurrentPageContextType | undefined>(undefined);

export function CurrentPageProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
}

export function useCurrentPage() {
  const context = useContext(CurrentPageContext);
  if (!context) {
    throw new Error('useCurrentPage deve ser usado dentro de um CurrentPageProvider');
  }
  return context;
}
