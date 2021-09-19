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
          'https://www.hogarmania.com/archivos/201708/peluqueria-canina-corte-668x400x80xX.jpg',
        name: 'Corte y baño',
        price: 1000,
        description: `Corte y limpieza de mascota, con medidas de seguridad para el cuidado de la mascota.`,
      }).save(),
      new Services({
        image:
          'https://misanimales.com/wp-content/uploads/2017/10/problemas-veterinarios-mas-comunes.jpg',
        name: 'Revisión',
        price: 800,
        description: `Turno para revisión médica de rutina o buscando el origen a un problema particular.`,
      }).save(),
      new Services({
        image:
          'https://www.veterinarialsina.com.ar/img/sub-imagenes/alimentos_sub.png',
        name: 'Venta de productos',
        price: 0,
        description: `Venta de productos variados para la mascota dentro del local.`,
      }).save(),
      new Services({
        image:
          'https://i1.wp.com/www.universidadescr.com/blog/wp-content/uploads/14ZOOCIAL_Drupal-Main-Image.var_1523652723.jpg?fit=984%2C655&ssl=1',
        name: 'Operación - esterilización',
        price: 5000,
        description: `Operacion para prevenir infecciones uterinas, cancer y evitar la reproducción.`,
      }).save(),
      new Services({
        image:
          'https://escuelafarmacia.com/wp-content/uploads/cl%C3%ADnica-veterinaria.jpg',
        name: 'Operación - Cirugía mayor',
        price: 450,
        description: `Operaciones en cabeza, cuello, tórax, abdomen y zonas con mayor riesgo.`,
      }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
