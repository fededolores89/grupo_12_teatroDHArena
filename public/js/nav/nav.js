// Elementos
const navMobileBtn = document.querySelector('.nav-mobile-icon');
const listMobileNav = document.querySelector('.nav-mobile-menu');
const btnSearch = document.querySelector("#search-button")
const searchBar = document.querySelector(".search-bar")
// Listeners
navMobileBtn.addEventListener('click', e => {
 
  // Agregando height al menu para que sea visible
  listMobileNav.classList.toggle('show-menu');

  // Cambiando icono del boton
  cambiarDisenioIcono(navMobileBtn);
});


btnSearch.addEventListener("click", function(events){
/* searchBar.submit() */
console.log("Boton presionado");
})

// Functions
function cambiarDisenioIcono(iconContainer) {
  let burguerIcon = iconContainer.querySelector('.fa-bars');
  let closeIcon = iconContainer.querySelector('.fa-x');

  if (burguerIcon) {
    let icon = '<i class="fa-solid fa-x"></i>';
    burguerIcon.remove();

    iconContainer.innerHTML = icon;

    if (iconContainer.classList.contains('temaColor-1')) {
      iconContainer.classList.remove('temaColor-1');

      iconContainer.classList.add('temaColor-2');
    }
  } else if (closeIcon) {
    let icon = '<i class="fa-solid fa-bars"></i>';
    closeIcon.remove();

    iconContainer.innerHTML = icon;

    if (iconContainer.classList.contains('temaColor-2')) {
      iconContainer.classList.remove('temaColor-2');

      iconContainer.classList.add('temaColor-1');
    }
  }
}
