export const Validate = (input) => {
    let errors = {};
    let required = 'Este campo es requerido';
    let rgxEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    if(!input.firstName) errors.firstName = required;
    if(!input.lastName) errors.lastName = required;

    if(!input.email){
        errors.email = required
    } else if(!rgxEmail.test(input.email)) {errors.email = 'Por favor ingrese un email válido'};

    if(!input.phone){
        errors.phone = required
    } else if(input.phone.length < 8 || input.phone.length > 10) {errors.phone = 'Por favor ingrese un número de teléfono válido'};

    if(!input.name) errors.name = required;
    if(!input.direction) errors.direction = required;

    if(!input.postal_code){
        errors.postal_code = required
    } else if(input.postal_code.length < 4) {errors.postal_code = 'Por favor ingrese un código postal válido'};

    if(!input.country) errors.country = required;
    if(!input.state) errors.state = required;
    if(!input.city) errors.city = required;

    return errors
};

export const formIsValid = (address, provider, errors) => {
    return (
        Object.values(address).some((value) => value !== '') &&
        Object.values(provider).every((value) => value !== '') &&
        Object.values(errors).every((value) => value === '')
    );
};