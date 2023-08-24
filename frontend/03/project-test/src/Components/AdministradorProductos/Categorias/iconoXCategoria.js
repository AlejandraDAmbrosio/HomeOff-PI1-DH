const categoriasArray = [
    {
      categoria_id: 1,
      name: "OFICINAS PRIVADAS",
      description: "Sumérgete en un oasis de productividad y tranquilidad con nuestras elegantes oficinas privadas. Diseñadas para brindarte un espacio exclusivo donde puedas concentrarte al máximo en tus tareas, nuestras oficinas privadas te ofrecen comodidad y privacidad en un entorno profesional. Con un diseño pensado para inspirar y una amplia gama de comodidades a tu disposición, esta es la elección ideal para profesionales que buscan un espacio que refleje su éxito y ambición.",
      link: "https://c2-team4-images-test-bucket.s3.amazonaws.com/24Ago2023/IconosCategorias/OficinaPrivada.png"
    },
    {
      categoria_id: 2,
      name: "COWORKING",
      description: "Únete a una comunidad dinámica de pensadores innovadores en nuestro espacio de coworking. Aquí, la colaboración cobra vida y las ideas fluyen sin cesar. Imagina un entorno donde puedes trabajar rodeado de mentes creativas, compartir conocimientos y establecer conexiones valiosas. Nuestro espacio de coworking está diseñado para fomentar la interacción mientras disfrutas de comodidades modernas y un diseño inspirador que te impulsará a alcanzar tus objetivos profesionales.",
      link: "https://c2-team4-images-test-bucket.s3.amazonaws.com/24Ago2023/IconosCategorias/Coworking.png"
    },
    {
      categoria_id: 3,
      name: "SALAS DE REUNIONES",
      description: "Eleva tus presentaciones y negociaciones a un nivel superior en nuestras salas de reuniones de vanguardia. Desde sesiones estratégicas hasta reuniones colaborativas, nuestras salas están equipadas con tecnología de última generación y un ambiente que inspira el pensamiento innovador. Encuentra el espacio perfecto para impresionar a tus clientes, cerrar acuerdos importantes y llevar a cabo discusiones productivas en un entorno profesional y confortable.",
      link: "https://c2-team4-images-test-bucket.s3.amazonaws.com/24Ago2023/IconosCategorias/SalaDeReuniones.png"
    },
    {
      categoria_id: 4,
      name: "AUDITORIO",
      description: "Descubre la elegancia y funcionalidad de nuestras Oficinas House, espacios meticulosamente diseñados para fusionar la comodidad del hogar con la eficiencia de una oficina. Aquí encontrarás un ambiente acogedor que te motiva a ser productivo mientras disfrutas de todas las comodidades modernas. Desde áreas de trabajo flexibles hasta zonas de descanso relajantes, nuestras Oficinas House son la elección perfecta para aquellos que buscan un equilibrio perfecto entre vida laboral y personal.",
      link: "https://c2-team4-images-test-bucket.s3.amazonaws.com/24Ago2023/IconosCategorias/Auditorio.png"
    },
    {
      categoria_id: 5,
      name: "OFICINA SET",
      description: "Entra en un mundo de dinamismo y energía en nuestras innovadoras Oficinas Abiertas. Este espacio te brinda la oportunidad de trabajar en un entorno colaborativo y estimulante, donde las ideas se cruzan y la creatividad fluye sin restricciones. Con un diseño moderno y elementos de diseño que promueven la interacción, nuestras Oficinas Abiertas son ideales para profesionales que desean estar inmersos en un ambiente que fomenta la innovación y la conectividad constante.",
      link: "https://c2-team4-images-test-bucket.s3.amazonaws.com/24Ago2023/IconosCategorias/OficinaSet.png"
    },
    {
      categoria_id: 6,
      name: "AREA APRENDIZAJE",
      description: "Espacio adecuado para enseñar y aprender en grupo.",
      link: "https://c2-team4-images-test-bucket.s3.amazonaws.com/24Ago2023/IconosCategorias/AreaAprendizaje.png"
    }
  ];




  function buscadorIconoCategoria(categoria_id) {
    const categoriaEncontrada = categoriasArray.find(item => item.categoria_id === categoria_id);
    
    if (categoriaEncontrada) {
      return categoriaEncontrada.link;
    } else {
      return "Categoría no encontrada";
    }
  }
  export default buscadorIconoCategoria;