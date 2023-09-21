import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Puntuar = () => {
  const [calificacion, setCalificacion] = useState(0);

  function calificar(index) {
    setCalificacion(index + 1);
  }

  return (
    <div>
      <h1>Puntuación</h1>
      <div>
        {Array(5)
          .fill()
          .map((_, index) => (
            <AiOutlineStar
              className={index < calificacion ? "full" : "empty"}
              key={index}
              onClick={() => calificar(index)}
              style={{ fontSize: "35px", cursor: "pointer" }}
            />
          ))}
      </div>
      <p>Calificación: {calificacion}</p>
    </div>
  );
};

export default Puntuar;
