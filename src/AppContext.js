import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [scannedValues, setScannedValues] = useState([]);

  return (
    <AppContext.Provider value={{ scannedValues, setScannedValues }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
