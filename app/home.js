const ham = document.getElementById('ham');
const menu = document.querySelector('.nav');

// Funcionalidad del botón hamburguesa para mostrar/ocultar el menú completo
ham.addEventListener('click', () => {
  menu.classList.toggle('mostrar');
});

// Selecciona todos los botones de las secciones (Herramientas y Cobros)
const navButtons = document.querySelectorAll('.nav__li-button');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Se asume que el <ul> con las opciones es el siguiente elemento hermano
    const submenu = button.nextElementSibling;
    if (submenu) {
      submenu.classList.toggle('mostrar');
      // Alterna la clase 'active' en el botón para rotar la flecha
      button.classList.toggle('active');
    }
  });
});

// Desactivar la transición al cargar la página
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Desactivar la transición durante el redimensionado
let resizeTimer;
window.addEventListener('resize', () => {
  menu.classList.add('notransition');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    menu.classList.remove('notransition');
  }, 200); // Puedes ajustar el tiempo según necesites
});
