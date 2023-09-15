

function obtenerPrecioXIdRecurso(idRecurso, data, dias) {
  // console.log(dias)
    const recursoEncontrado = data.find(
      (item) => item.idRecurso === idRecurso
    );
  
    if (recursoEncontrado) {
      return (recursoEncontrado.precioUnitario * (parseInt(dias)));
    } else {
      return console.log("Recurso "+ idRecurso +" no encontrado");
    }
  }
  export default obtenerPrecioXIdRecurso;
  