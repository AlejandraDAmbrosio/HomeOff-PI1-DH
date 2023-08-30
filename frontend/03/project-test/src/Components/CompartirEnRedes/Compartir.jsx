import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { MdShare, MdFacebook }from "react-icons/md";




const Compartir = ({ showConfirmation, closeModal, shouldClose }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const customStylesIII = {
    overlay: { zIndex: 1000 },
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div>
       
        <a
          href={`https://www.facebook.com/sharer.php?u=${location.pathname}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdFacebook />
        </a>
      
        <a
          href={`https://twitter.com/intent/tweet?text=MIEpresa&url=${location.pathname}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTwitter />
        </a>
        <a
          href={`https://www.instagram.com/sharer.php?u=${location.pathname}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsInstagram />
        </a>
      </div>
      <hr />
      <div className="">
        <h3>Link de la película</h3>
        <h3 className="modalCompartirLink">
          <a href={location.pathname}></a>
        </h3>
      </div>
      </Modal>
  );
};

export default Compartir;
