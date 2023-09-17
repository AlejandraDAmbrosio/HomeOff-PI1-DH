function formateoFechas(fecha) {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
    //   weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }

  export default formateoFechas;