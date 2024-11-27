import React, { createContext, useContext } from 'react'; 

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
/* URL Locales */
  const urlBackend = 'http://localhost:8000';
  const urlFront = 'http://localhost:3000';


  return (
    <GlobalContext.Provider value={{ urlBackend,urlFront }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
