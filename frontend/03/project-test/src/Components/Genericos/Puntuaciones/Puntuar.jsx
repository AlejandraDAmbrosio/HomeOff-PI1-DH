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
            index % 2 === 0 ? (
              <AiFillStar
                className={index <= calificacion ? "full" : "empty"}
                key={index}
                onClick={() => calificar(index)}
                style={{ fontSize: "35px", cursor: "pointer", color: "#FFD700" }}
              />
            ) : (
              <AiOutlineStar
                className={index <= calificacion ? "full" : "empty"}
                key={index}
                onClick={() => calificar(index)}
                style={{ fontSize: "35px", cursor: "pointer", color: "#FFD700" }}
              />
            )
          ))}
      </div>
      <p>Calificación: {calificacion}</p>
    </div>
  );
};

export default Puntuar;