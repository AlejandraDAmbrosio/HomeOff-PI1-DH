function formatearFecha(date) {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
  export default formatearFecha;