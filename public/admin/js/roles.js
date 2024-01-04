
// Permission

const tbPermissions = document.querySelector('table[tb-permissions]')
if(tbPermissions){
  const buttonSubmit = document.querySelector('button[button-submit]')
  
  buttonSubmit.addEventListener('click', () => {
    let records = []
    
    const dataNames = tbPermissions.querySelectorAll('[data-name]')

    dataNames.forEach(dataName => {
      const name = dataName.getAttribute(`data-name`)
      const inputs = dataName.querySelectorAll('input')

      if (name === 'id') {
        inputs.forEach(input => {
          let value = input.value

          records.push({
            id: value,
            permissions: []
          })

        })

      }
      else {
        inputs.forEach((input, index) => {
          let checked = input.checked

          if (input.checked) {
            records[index].permissions.push(name)
          }
        })
      }
    })
    const formChangePermissions = document.querySelector('#form-permissions')
    const inputPermissions = formChangePermissions.querySelector('.form-control')
    inputPermissions.value = JSON.stringify(records)
    formChangePermissions.submit()
  })
}

// End permissions

// Set default permissions 
const defaultPermissions = document.querySelector('[data-records]')
// const tbPermissions = document.querySelector('table[tb-permissions]')

if (defaultPermissions) {
  const records = JSON.parse(defaultPermissions.getAttribute('data-records'))
  
  records.forEach( (record, index) => {

    record.permissions.forEach((item) => {
      const trPermissions = tbPermissions.querySelector(`tr[data-name=${item}]`)
      const checkboxInputPermissions = trPermissions.querySelectorAll('input[type=checkbox]')
      if (checkboxInputPermissions[index]) {
        checkboxInputPermissions[index].checked = true

      }

    })
  })

}



// END set default permissions
