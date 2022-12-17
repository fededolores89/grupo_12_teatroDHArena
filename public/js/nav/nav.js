// Elementos
const navMobileBtn = document.querySelector('.nav-mobile-icon');
const listMobileNav = document.querySelector('.nav-mobile-menu');

// Listeners
navMobileBtn.addEventListener('click', e => {
  // Agregando height al menu para que sea visible
  listMobileNav.classList.toggle('show-menu');

  // Cambiando icono del boton
  cambiarIcono(navMobileBtn);
});

// Functions
function cambiarIcono(iconContainer) {
  let burguerIcon = iconContainer.querySelector('.fa-bars');
  burguerIcon.remove();

  iconContainer.innerHtml = '<i>';
}
