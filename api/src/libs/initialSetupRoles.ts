import Role from '../models/Roles';
import Services from '../models/Services';

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'provider' }).save(),
      new Role({ name: 'admin' }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};

export const createService = async () => {
  try {
    const count = await Services.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.all([
      new Services({
        image:
          'https://cdn2.chicmagazine.com.mx/uploads/media/2020/12/07/estos-son-los-cortes-de-1.jpg',
        name: 'Corte y peinado - Dama',
        price: 1000,
        description: `Corte de cabello y peinado profesional a elección. Variada selección de cortes populares para estar a la moda con las últimas tendencias: 
         - Pixie
         - Tazón
         - Melena muy mini
         - Blunt Bob
         - Media melena
         - ‘Swag’ con flequillo
         - Flequillo recto
         - Flequillo ‘baby bang’
         - Flequillo ‘waft’
         - Melena XL con las puntas desfiladas
          `,
      }).save(),
      new Services({
        image:
          'https://todoimagenesde.com/wp-content/uploads/2020/04/CorteHombre32.jpg',
        name: 'Corte y peinado - Caballero',
        price: 800,
        description: `Corte de cabello y peinado profesional a elección. Variada selección de cortes populares para estar a la moda con las últimas tendencias: 
       - Degradado & Taper.
        - Undercut
        - Pompadour
        - Copete
        - Comb over
        - Slicked back
        - Corte Buzz
        - Corte Crew
        - Bun
        - Top knot
          `,
      }).save(),
      new Services({
        image:
          'https://comoorganizarlacasa.com/wp-content/uploads/2017/09/tendencia-en-cortes-para-ninos-que-van-arrasar-este-2017-2018-26.jpg',
        name: 'Corte y peinado - Niños',
        price: 550,
        description: `Corte de cabello y peinado profesional a elección. Variada selección de cortes populares para que los chicos y chicas también estén a la moda con las últimas tendencias.`,
      }).save(),
      new Services({
        image:
          'https://s03.s3c.es/imag/_v0/770x420/a/e/3/490x_barba-Baloon111-Dreamstime.jpg',
        name: 'CorteCorte y estilo barba - Caballero',
        price: 450,
        description: `Asegurate de estar bien a la moda con los últimos estilos de corte y cuidados para tu barba.
        - Leñador
        - Vikingo
        - Spartan
        - Bandholz
        - Ancla
        - Barba corta en caja
        - Beardstache
        - Van Dyke
        - Barba real
        - El balbo
        - Barba con correa
          `,
      }).save(),
      new Services({
        image:
          'http://holamujer02.akamaized.net/wp-content/uploads/2019/04/Cabello.jpg',
        name: 'Reflejos, tintura, coloración',
        price: 4000,
        description: `Baño de color exprés que trabaja sobre las capas más superficiales del cabello, así que no modifica la raíz, sino sólo la zona previamente tratada mediante decoloración.`,
      }).save(),
      new Services({
        image:
          'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/03/07130005/perfilado-destacada.jpg',
        name: 'Cejas',
        price: 950,
        description: `Perfilado de cejas y otros tratamientos orientados a la cosmética de las cejas.`,
      }).save(),
      new Services({
        image:
          'https://tubellezapp.com/wp-content/uploads/2018/07/manicura-5.jpg',
        name: 'Manicura',
        price: 450,
        description: `Se trata de un tratamiento de belleza cosmético para las uñas y manos. En una manicura se cortan o liman los bordes de las uñas, se realizan masajes a las manos y se aplica esmalte de uñas.
        Algunos de los tratamientos específicos que tenemos, son:
        - Esmaltado
        - Gelificado
        - Parafinoterapia
        - Uñas esculpidas
        `,
      }).save(),
      new Services({
        image:
          'https://lavitanails.com/wp-content/uploads/2018/11/pedicura-completa.jpg',
        name: 'Pedicura',
        price: 750,
        description: `La pedicura es el tratamiento de las afecciones cutáneas córneas propias de los pies.​ Un pedicuro o pedicura, denominado corrientemente callista, es la persona que practica la pedicura.​ Un tratamiento de pedicura también es una manera de mejorar el aspecto estético de los pies y las uñas.`,
      }).save(),
      new Services({
        image:
          'https://iseholistico.com/wp-content/uploads/2018/11/masajes-baratos-iseholistico.jpeg',
        name: 'Masaje - relajante',
        price: 2200,
        description: `Los masajes relajantes logran un estado de calma físico y mental que muchas veces no puede obtenerse naturalmente, dándole al cuerpo un estado de tranquilidad y bienstar. Se utilizan largos movimientos con presión moderada para eliminar toxinas y la tensión muscular. Se aplica infusión de aromas en puntos clave para provocar paz y tranquilidad.
        Altamente indicado para relajar la musculatura afectada por el estrés, las malas posturas, la falta de descanso o una vida demasiado sedentaria.`,
      }).save(),
      new Services({
        image:
          'https://www.hola.com/imagenes//bienestar/20141028498/masajes-deportivos-descontracturantes-y-relajantes/0-1-212/masajes-deportistas--z.jpg',
        name: 'Masaje - descontracturante',
        price: 2200,
        description: `Tratando la capa profunda de los músculos, este masaje energiza, estimula y ayuda a incrementar el flujo de oxígeno. Varios niveles de presión de masaje liberarán y disolverán la tensión, aliviarán el dolor crónico y provocarán un bienestar general en todo el cuerpo.
        Altamente indicado para relajar la musculatura y disolver las contracturas que se producen por el estrés, las malas posturas, la falta de descanso o una vida demasiado sedentaria.`,
      }).save(),
      new Services({
        image:
          'https://sadhanamassagecenter.com/wp-content/uploads/2019/11/masaje-piedras-calientes-espalda2.jpg',
        name: 'Masaje - con piedras calientes',
        price: 2200,
        description: `El recurso terapéutico de la utilización de piedras sobre la piel alternando temperaturas frías y calientes, ayuda a combatir el dolor, lograr una relajación plena, recuperar el sueño, revitalizarse y oxigena la piel.
        Altamente indicado para relajar la musculatura y disolver las contracturas que se producen por el estrés, las malas posturas, la falta de descanso o una vida demasiado sedentaria.`,
      }).save(),
      new Services({
        image:
          'https://www.fisioterapia-madrid.es/wp-content/uploads/2018/11/fisioterapia_madrid_blog14.jpg',
        name: 'Masaje - drenaje linfático',
        price: 2200,
        description: `Consiste en un masaje suave y repetitivo, cuyo ritmo, más lento que el del masaje tradicional, y la adherencia a la piel sin la ayuda de productos, favorecen la activación de la linfa y la eliminación de los líquidos estancados.
        Linfa: Líquido coagulable, casi incoloro y débilmente alcalino, que procede de la sangre, circula por los vasos linfáticos y se vuelca en las venas, y cuya función es la de servir de intermediario en los cambios nutritivos entre la sangre y los tejidos.`,
      }).save(),
      new Services({
        image:
          'https://laestheticien.com/wp-content/uploads/2018/03/masaje-reductor.jpg',
        name: 'Masaje - reductor',
        price: 2500,
        description: `Masajes reductores con crema lipolítica y anticelulítica de Fosfatidilcolina (poderoso lipolítico), liposomas de Cafeína, L-Carnitina y Hiedra. Produce hiperemia por contacto aumentando la capacidad de respuesta a los tratamientos especialmente en casos de adiposidad compacta y fibrosa.`,
      }).save(),
      new Services({
        image:
          'https://wellnessmadrid.com/wp-content/uploads/2017/06/peeling-corporal.jpg',
        name: 'Tratamiento - exfoliante corporal y facial',
        price: 2300,
        description: `El tratamiento corporal más popular es un exfoliante corporal. A veces se hace con sal marina, pero puede hacerse con otros productos. El profesional frota una mezcla por ejemplo de sal marina, aceites aromáticos en tu piel. Esto exfolia la piel y la deja fresca y suave.
        La exfoliación sirve para eliminar las células muertas que se acumulan en la superficie de la piel, favorecer el proceso de renovación celular, activar la microcirculación y el drenaje y, en definitiva, conseguir que nuestra piel esté más bonita, más luminosa, más homogénea y más suave.`,
      }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
