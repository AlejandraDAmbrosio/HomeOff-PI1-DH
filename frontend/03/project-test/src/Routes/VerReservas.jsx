import React, { useState, useContext, useEffect } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import { useParams } from "react-router-dom";




const VerReservas = () => {
    const { id } = useParams();
    const {
        getReservas,
        reservas,
        postReserva
      } = useContext(ContextGlobal);



    useEffect(() => {
        getReservas(id);
        postReserva();
      }, [id]);
    





    
  return (

    <div>
        
    <div>VerReservas</div>



    
    </div>
  )
}

export default VerReservas