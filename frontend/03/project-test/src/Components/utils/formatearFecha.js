const formatearFecha = (fecha) => {
  const fechaObj = new Date(fecha);

  // Obtiene los componentes de la fecha
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const año = fecha.getFullYear();

  // Construye la cadena de fecha en el formato deseado (dd-mm-yyyy)
  const fechaFormateada = `${dia}-${mes}-${año}`;

  return fechaFormateada;
};

export default formatearFecha;
