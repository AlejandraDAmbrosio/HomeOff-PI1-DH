function obtenerIniciales(nombreCompleto) {
 
  const nombreCompletoSinEspacios = nombreCompleto.trim();
  const partes = nombreCompletoSinEspacios.split(" ");

  if (partes.length >= 2) {
    const inicialNombre = partes[0][0];
    const inicialApellido = partes[1][0];
    const iniciales = inicialNombre + inicialApellido;
    return iniciales;
  } else if (partes.length === 1) {
    // const inicialNombre = partes[0][0];
    const inicialNombre = partes[0][0].toUpperCase();
    return inicialNombre;
  } else {
    return "";
  }
}

export default obtenerIniciales;
