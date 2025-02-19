/* Variables principales */
const ham = document.getElementById('ham');
const menu = document.querySelector('.nav');

/* Funcionalidad del boton ham */

ham.addEventListener('click', () => {
    menu.classList.toggle('mostrar');
});

/* Desactivar la transicion al recargar la pagina */

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});


// Desactiva la transición durante el redimensionado
let resizeTimer;
window.addEventListener('resize', () => {
  menu.classList.add('notransition');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    menu.classList.remove('notransition');
  }, 200); // 200ms es un tiempo que puedes ajustar según necesites
});