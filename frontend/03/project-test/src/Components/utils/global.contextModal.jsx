import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
    const [modals, setModals] = useState({
      modal1: false,
      modal2: false,
      modal3: false,
  });

  const openModalx3 = (modalName) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: true,
    }));
  };

  const closeModalX3 = (modalName) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: false,
    }));
  };

  return (
    <ModalContext.Provider value={{ modals, openModalx3, closeModalX3 }}>
      {children}
    </ModalContext.Provider>
  );
};
