
  function nombreExiste(nombre, data) {
    return data.find((objeto) => (objeto.name  || objeto.nombre)== nombre) !== undefined;
  }
  export default nombreExiste;