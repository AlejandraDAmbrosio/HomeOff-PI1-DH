import { useState } from 'react';

export const useLocalStorageList = (key, initialValue) => {
    const [list, setList] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        const parsedItem = typeof item === "string" ? JSON.parse(item) : item;
        return parsedItem ?? initialValue;
      } catch (error) {
        console.error("Error loading data from LocalStorage:", error);
        return initialValue;
      }
    });
  
    const updateList = (newList) => {
      try {
        setList(newList);
        window.localStorage.setItem(key, JSON.stringify(newList));
      } catch (error) {
        console.error("Error saving data to LocalStorage:", error);
      }
    };
  
    return [list, updateList];
  };



// export const useLocalStorageList = (key, initialValue) => {
//     const [list, setList] = useState(() => {
//         try {
//           const item = window.localStorage.getItem(key);
//           return item ? JSON.parse(item) : initialValue;

 
//         } catch (error) {
//           console.error("Error loading data from LocalStorage:", error);
//           return initialValue;
//         }
//       });
    
//       const updateList = (newList) => {
//         try {
//           setList(newList);
//           window.localStorage.setItem(key, JSON.stringify(newList));
//         } catch (error) {
//           console.error("Error saving data to LocalStorage:", error);
//         }
//       };
    
//       return [list, updateList];
// };
