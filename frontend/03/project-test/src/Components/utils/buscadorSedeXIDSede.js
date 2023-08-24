

const sedesArray = [
    {
      id: 1,
      nombre: "Colombia",
      direccion: "CARRERA 100 # 15",
    },
    {
      id: 2,
      nombre: "Argentina",
      direccion: "Calle 1 y 60 La Plata",
    },
    {
      id: 3,
      nombre: "Chile",
      direccion: "Av. Libertador Bernardo O'Higgins 1449, Torre",
    },
  ];



function buscadorSedeXIDSede(idSede) {
    const sedeXID = sedesArray.find(sede => sede.id === idSede);
    console.log(idSede);
    console.log(sedeXID);

    if (sedeXID) {
      return sedeXID.nombre;
    } else {
      return "";
    }
  }
  export default buscadorSedeXIDSede;