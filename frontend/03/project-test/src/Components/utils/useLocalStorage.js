// import { useState } from "react";

// export function useLocalStorage(key, initialValue) {
//   const [storedValue, SetStoredValue] = useState(() =>{

//     try {
//         const item = window.localStorage.getItem(key);
//         return item? JSON.parse(item) : initialValue;
//     } catch (error) {
//         return initialValue;
//     }
//   });

//   const setValue = (valor) => {
//     try {
//       SetStoredValue(value);
//       window.localStorage.setItem(key, JSON.stringify(valor));
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return [storedValue, setValue];
// }




/////////////////////////////////

import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error loading data from LocalStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data to LocalStorage:", error);
    }
  };

  return [storedValue, setValue];
};

///////////////////////////
