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
          'https://www.veterinariaguadarrama.com/wp-content/uploads/2017/06/71986_head-1024x560.png',
        name: 'Corte y baño',
        price: 4500,
        description: `Corte de cabello con cuidados y precauciones adecuadas a
         las características de tu mascota.`,
      }).save(),
      new Services({
        image:
          'https://imagenes.lainformacion.com/files/image_656_370/uploads/imagenes/2018/05/25/5b07d92e563ba.jpeg',
        name: 'Revisión',
        price: 7000,
        description: `Revisión médica de rutina o buscando el origen a un problema particular.`,
      }).save(),
      new Services({
        image:
          '',
        name: 'Esterilización',
        price: 15500,
        description: `Esta operación previene la reproducción y también,
         ayuda a disminuir la posibilidad de cancer y otras enfermedades`,
      }).save(),
      new Services({
        image:
          '',
        name: 'Operación mayor',
        price: 30000,
        description: `Cirugías de cabeza, tórax y zonas de mayor riesgo`,
      }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
