import React from "react";

const CardInfoUser = ({ idUser, nombreCompleto, correo, rol }) => {
  return (
    <div>
      <div>CardInfoUser</div>
        <p>{idUser}</p>
        <p>{nombreCompleto}</p>
        <p>{correo}</p>
        <p>{rol}</p>
        

    </div>
  );
};

export default CardInfoUser;
