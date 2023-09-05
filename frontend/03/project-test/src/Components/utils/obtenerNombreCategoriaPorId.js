
  function obtenerNombreCategoriaPorId(idCategoria, data, listaCategorias) {
    const categoriaEncontrada = listaCategorias.find(
      (item) => item.categoria_id == idCategoria
    );
  
    if (categoriaEncontrada) {
      return categoriaEncontrada.name;
    } else {
      return "Categoría no encontrada";
    }
  }
  export default obtenerNombreCategoriaPorId;