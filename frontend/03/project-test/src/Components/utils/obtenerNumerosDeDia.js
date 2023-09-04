function obtenerNumerosDeDia(fechas) {
    const numerosDeDia = [];
  
    for (const fecha of fechas) {
      if (typeof fecha === 'string') {
        const partes = fecha.split('-');
        const dia = parseInt(partes[2]);
        numerosDeDia.push(dia);
      } else if (Array.isArray(fecha)) {
        for (const rango of fecha) {
          const partesRango = rango.split(' - ');
          for (const fechaRango of partesRango) {
            const partes = fechaRango.split('-');
            const dia = parseInt(partes[2]);
            numerosDeDia.push(dia);
          }
        }
      } else if (fecha instanceof Date) {
        numerosDeDia.push(fecha.getDate());
      }
    }
  
    return numerosDeDia;
  }
  
  const marcas = [
    "2023-09-05",
    "2023-09-06",
    "2023-09-07",
    "2023-10-15 - 2023-10-25",
    ["2023-11-01", "2023-11-02"],
    new Date("2023-12-01"),
  ];

  export default obtenerNumerosDeDia;