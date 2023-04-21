const form = document.querySelector('.show-form');
const inputs = form.querySelectorAll('input');

inputs.forEach(input => {
  input.addEventListener('blur', e => {
    let container = input.parentElement;
    let errorSpan = container.querySelector('.error-container');
    let validations = ['valueMissing', 'typeMismatch', 'patternMismatch'];
    let errorMessages = {
      'valueMissing': {
        message: 'No puede dejar vacío este campo'
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