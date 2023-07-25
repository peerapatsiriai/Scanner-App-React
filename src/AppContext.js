// import { createContext, useState, useContext } from 'react';

// const AppContext = createContext();

// export function AppContextProvider({ children }) {
//   const [scannedValues, setScannedValues] = useState([]);

//   return (
//     <AppContext.Provider value={{ scannedValues, setScannedValues }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useAppContext() {
//   return useContext(AppContext);
// }

// AppContext.js
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  // Define your state and context logic here
  const [scannedValues, setScannedValues] = useState([]);

  const contextValue = {
    scannedValues,
    setScannedValues,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
