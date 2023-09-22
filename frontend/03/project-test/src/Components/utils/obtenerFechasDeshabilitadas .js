function obtenerFechasDeshabilitadas (arrayFechasReservasXRecurso) {
    return arrayFechasReservasXRecurso.map((fecha) => new Date(fecha));
  }
  
  export default obtenerFechasDeshabilitadas ;