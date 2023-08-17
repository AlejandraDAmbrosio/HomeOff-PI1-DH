import React from "react";
import "./ModalFormCrearCuenta.css";

const ModalFormCrearCuenta= ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <div className="modal-close-button" onClick={onClose}>
  
          Cerrar X
        </div>

        {children}
        
      </div>
    </div>
  );
};

export default ModalFormCrearCuenta;

// ///////////////////////
// import React from "react";
// import "./Modal.css";

// const Modal = ({ onClose, imageSrc }) => {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="modal-close-button" onClick={onClose}>
//           Cerrar X
//         </div>

//         <img
//           className="modal-img"
//           src={imageSrc}
//           alt="Imagen de previsualización"
//         />
      
        
//       </div>
//     </div>
//   );
// };

// export default Modal;
