

function obtenerIniciales(nombreCompleto) {
    const partes = nombreCompleto.split(" ");
    const inicialNombre = partes[0][0];
    const inicialApellido = partes[1][0];
    const iniciales = inicialNombre + inicialApellido;
    return iniciales;
  }
  
  export default obtenerIniciales;