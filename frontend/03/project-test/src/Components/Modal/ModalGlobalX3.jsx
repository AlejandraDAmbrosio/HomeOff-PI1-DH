import React from "react";
import "./ModalGlobalX3.css";

const ModalGlobalX3 = ({ modalName, onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* <div className="modal-close-button" onClick={() => onClose(modalName)}> */}
        <div className="modal-close-button"  onClick={onClose}>
          Cerrar X
        </div>

        {children}
        
      </div>
    </div>
  );
};

export default ModalGlobalX3;
