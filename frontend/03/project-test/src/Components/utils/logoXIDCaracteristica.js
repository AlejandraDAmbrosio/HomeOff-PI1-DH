

function logoXIDCaracteristica(idCaracteristica, data) {
    const logoCaracteristica = data.find(item => item.idCaracteristica === idCaracteristica);
    
    if (logoCaracteristica) {
      return logoCaracteristica.logoCaracteristica;
    } else {
      return "Característica no encontrada";
    }
  }
  export default logoXIDCaracteristica;