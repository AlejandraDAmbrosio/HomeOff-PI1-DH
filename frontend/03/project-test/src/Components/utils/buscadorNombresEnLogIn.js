

function buscadorNombresEnLogIn(username, base) {
  const userEncontrado = base.find(item => item.username  === username);
  
  if (userEncontrado) {
      console.log("Usuario encontrado" , userEncontrado);
      console.log("idUsuario encontrado" , userEncontrado.idUsuario);
    return userEncontrado.idUsuario;
  } else {
    console.log("Usuario no encontrado");
    return "User no encontrado";
  }
}
export default buscadorNombresEnLogIn;

