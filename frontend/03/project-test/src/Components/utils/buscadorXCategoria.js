

function buscadorXCategoria(idCategoria, data) {
    const categoriaEncontrada = data.find(item => item.categoria_id === idCategoria);
    
    if (categoriaEncontrada) {
      return categoriaEncontrada.name;
    } else {
      return "Categoría no encontrada";
    }
  }
  export default buscadorXCategoria;