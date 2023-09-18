

function obtenerImagenXIdRecurso(idRecurso, data) {
    const recursoEncontrado = data.find(
      (item) => item.idRecurso === idRecurso
    );
  
    if (recursoEncontrado) {
      return recursoEncontrado.imagenURL;
    } else {
      return console.log("Imagen no encontrada");
    }
  }
  export default obtenerImagenXIdRecurso;
  