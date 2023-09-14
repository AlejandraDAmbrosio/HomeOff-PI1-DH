// function calculoDiasEntreFechas(fechaInicial, fechaFinal) {
//     const fechaInicialFormateada = new Date(fechaInicial.toString());
//     const fechaFinalFormateada = new Date(fechaFinal.toString());
//     console.log("fechaInicial", fechaInicialFormateada);
//     const diferenciaEnMilisegundos = fechaFinalFormateada - fechaInicialFormateada;
//     const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
//     return diferenciaEnDias;
// }

// export default calculoDiasEntreFechas;

function calculoDiasEntreFechas(fechaInicial, fechaFinal) {
 // Divide las cadenas de fecha en partes
 const partesFechaInicial = fechaInicial.split('/');
 const partesFechaFinal = fechaFinal.split('/');

 // Formatea las fechas en el formato "AAAA-MM-DD"
 const fechaInicialFormateada = `${partesFechaInicial[2]}-${partesFechaInicial[1].padStart(2, '0')}-${partesFechaInicial[0].padStart(2, '0')}`;
 const fechaFinalFormateada = `${partesFechaFinal[2]}-${partesFechaFinal[1].padStart(2, '0')}-${partesFechaFinal[0].padStart(2, '0')}`;

 // Crea objetos de fecha a partir de las fechas formateadas
 const fechaInicialObj = new Date(fechaInicialFormateada);
 const fechaFinalObj = new Date(fechaFinalFormateada);

 console.log("fechaInicial", fechaInicialObj);
 console.log("fechaFinal", fechaFinalObj);

 // Calcula la diferencia en milisegundos y luego en días
 const diferenciaEnMilisegundos = fechaFinalObj - fechaInicialObj;
 const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
 
 return diferenciaEnDias;
}

export default calculoDiasEntreFechas;
