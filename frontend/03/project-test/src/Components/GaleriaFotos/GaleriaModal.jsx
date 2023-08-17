import React from "react";
import "./GaleriaModal.css";

const GaleriaModal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div>Galeria</div>
        <div className="modal-close-button" onClick={onClose}>
          Cerrar X
        </div>
        {children}
      </div>
    </div>
  );
};

export default GaleriaModal;
