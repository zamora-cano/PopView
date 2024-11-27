import React, { createContext, useContext } from 'react'; 

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
/* URL Locales */
  const urlBackend = 'http://127.0.0.1:8000';
  // const urlFront = 'http://localhost:3000';
  const urlFront = 'http://127.0.0.1:8000';

  // const urlBackend = 'https://50ee-187-212-116-110.ngrok-free.app';
  // const urlFront = 'http://172.31.99.238:3000';

  return (
    <GlobalContext.Provider value={{ urlBackend,urlFront }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
