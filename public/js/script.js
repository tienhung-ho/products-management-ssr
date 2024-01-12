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


// Show alert 
const showAlert = document.querySelector('[show-alert]')
if (showAlert) {
  const time = parseInt(showAlert.getAttribute('data-time'))
  setTimeout(() => {
    showAlert.classList.add('alert-hidden')
  }, time)

  const closeAlert = showAlert.querySelector('[close-alert]')
  closeAlert.addEventListener('click', () => {
    showAlert.classList.add('alert-hidden')
  })
}
// End show alert


// Back button

const backButton = document.querySelectorAll('[button-go-back]')

if (backButton.length > 0) {
  backButton.forEach(button => {

    button.addEventListener('click' , () => {
      history.back()
    })

  })

}


// END back button
