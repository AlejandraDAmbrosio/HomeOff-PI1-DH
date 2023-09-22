const formatearFechaParaEnvioBE = (fechaOriginal) => {

    const fechaObj = new Date(fechaOriginal);
  

    const año = fechaObj.getFullYear();
    const mes = String(fechaObj.getMonth() + 1).padStart(2, "0"); // El mes está basado en 0 (enero = 0), así que agregamos 1 y formateamos con ceros a la izquierda si es necesario
    const dia = String(fechaObj.getDate()).padStart(2, "0"); // Formateamos con ceros a la izquierda si es necesario
  

    const fechaFormateada = `${año}-${mes}-${dia}`;
  
    return fechaFormateada;
  };
  
  export default formatearFechaParaEnvioBE;