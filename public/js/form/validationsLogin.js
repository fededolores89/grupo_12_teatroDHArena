const form = document.querySelector('.login-form');
const inputs = form.querySelectorAll('input');

inputs.forEach(input => {
  input.addEventListener('blur', e => {
    console.log('e')
    let container = input.parentElement;
    let errorSpan = container.querySelector('.error-container');
    let validations = ['valueMissing', 'typeMismatch', 'patternMismatch'];
    let errorMessages = {
      'valueMissing': {
        message: 'No puede dejar vacío este campo'
      },
      'typeMismatch': {
        message: 'Ingrese un correo electrónico válido'
      },
      'patternMismatch': {
        message: 'Su contraseña debe tener al menos una letra mayúscula, una minúscula, un número y al menos 8 carácteres. No debe incluir un caracter especial.'
      }
    }

    if(!input.validity.valid) {
      validations.forEach(validation => {
        if(input.validity[validation]) {
          errorSpan.classList.add('error');
          errorSpan.innerText = errorMessages[validation].message;
        }
      });
    } else {
      errorSpan.classList.remove('error');
      errorSpan.innerText = '';
    }
  })
});