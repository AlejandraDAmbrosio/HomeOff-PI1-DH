import React from "react";
import "./Modal.css";

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay-M">
      <div className="modal-content-M">
        <div className="modal-close-button-M" onClick={onClose}>
          Cerrar X
        </div>

        {children}
        
      </div>
    </div>
  );
};

export default Modal;

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
