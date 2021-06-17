export const Validate = (data) => {
	let errors = {};
	if (!data.name || typeof data.race !== 'string') {
		errors.name = 'Se requiere un Nombre';
	}
	if (!data.specie) {
		errors.specie = 'Se requiere una especie';
	}
	if (!data.dateBirth) {
		errors.dateBirth = 'Inserte una fecha valida';
	}
	return errors;
};

export default Validate;