//Establecer fecha anterior en datepicker del formulario
const dateInput = document.querySelector('#date');
const prevDate = dateInput.dataset.date;

dateInput.value = prevDate;