buscadorNombresEnLogIn

function buscadorNombresEnLogIn(username, data) {
    const userEncontrado = data.find(
      (item) => item.categoria_id == idCategoria
    );
  
    if (categoriaEncontrada) {
      return categoriaEncontrada.name;
    } else {
      return "Categoría no encontrada";
    }
  }
  export default buscadorNombresEnLogIn;