
function esFavorito(idRecurso, data) {
    const favoritoEncontrado = data.find(
      (item) => item.idRecurso == idRecurso
    );
  
    if (favoritoEncontrado.favorito == 1) {
      return true;
    } else {
      return false;
    }
  }
  export default esFavorito;
  
