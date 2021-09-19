export function validate(input) {
    let errors = {};
  
    if (!input.name) {
      errors.name = "El nombre es obligatorio";
    } else if (!/^[a-zA-Z0-9]+$/.test(input.name)) {
      errors.name = "El nombre es invalido";
    }
    if (!input.description) {
      errors.description = "La descripcion es obligatorio";
    } else if (!/^[a-zA-Z0-9]+$/.test(input.description)) {
      errors.description = "La descripcion es invalida";
    }
    if (!input.date) {
      errors.date = "La fecha es obligatoria";
    } else if (!/^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/.test(
        input.date
      )
    ) {
      errors.date = "La fecha es invalida";
    }
  
    if (!input.rating) {
      errors.rating = "El rating es obligatorio";
    } else if (!/^[0-9]+$/.test(input.rating)) {
      errors.rating = "El rating es invalido";
    }
  
    return errors;
  }