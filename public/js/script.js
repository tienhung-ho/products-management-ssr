function showSubmenu(element) {
  const submenu = element.querySelector('.dropdown-menu');
  if (submenu) {
    submenu.classList.add('show');
  }
}

function hideSubmenu(element) {
  const submenu = element.querySelector('.dropdown-menu');
  if (submenu) {
    submenu.classList.remove('show');
  }
}
