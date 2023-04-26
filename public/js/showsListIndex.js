const showsContainers = document.querySelectorAll('.Shows');

showsContainers.forEach(container => {
  let shows = container.querySelectorAll('article');

  //Si no hay shows en la categoria, agregar un estilo display none
  if(shows.length == 0) {
    container.style.display = 'none';
  }
})