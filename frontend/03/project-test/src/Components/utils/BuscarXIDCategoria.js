



function buscadorXIDCategoria(idCategoria, data) {
  const categoriaEncontrada = data.find(
    (item) => item.categoria_id === idCategoria
  );

  if (categoriaEncontrada) {
    return item;
  } else {
    return console.log("Categoría no encontrada");
  }
}
export default buscadorXIDCategoria;
