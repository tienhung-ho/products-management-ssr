
// Button status
const buttonStatus = document.querySelectorAll("[button-status]")

if (buttonStatus.length) {

    const url = new URL(window.location.href)

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute('button-status')
            if (status !== "") {
                url.searchParams.set('status', status)
            }
            else {
                url.searchParams.delete('status')
            } 
            url.searchParams.delete('page')
            window.location.href = url.href
        })
    });
}
// End button status

// Form search
const formSearch = document.querySelector('#form-search')
if (formSearch) {
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault()
        const value = e.target.elements.keyword.value
        
        const url = new URL(window.location.href)

        if (value !== "") {
            url.searchParams.set('keyword', value)
            url.searchParams.delete('page')
        }
        else {
            url.searchParams.delete('keyword')
        }

        window.location.href = url.href
    })
}
// End form search

// Pagination
const buttonPagination = document.querySelectorAll('[button-pagination]')

if (buttonPagination.length) {

    const url = new URL(window.location.href)

    buttonPagination.forEach(button => {
        button.addEventListener('click', () => {

            const page = button.getAttribute('button-pagination')

            url.searchParams.set('page', page)

            window.location.href = url.href
        })
    })
}

// End Pagination

// Button-change-status

const buttonChangeStatus = document.querySelectorAll('[button-change-status]')

if (buttonChangeStatus.length) {
    const formChangeStatus = document.querySelector('#form-change-status')
    let path = formChangeStatus.getAttribute('data-path')


    buttonChangeStatus.forEach(button => {
        button.addEventListener('click', () => {
            const currentStatus = button.getAttribute('data-status')
            const id = button.getAttribute('data-id')

            const changedStatus = currentStatus == 'active' ? 'inactive' : 'active'

            formChangeStatus.action = `${path}/${changedStatus}/${id}?_method=PATCH`

            formChangeStatus.submit()
        })
    })

}

// End button-change-status

// Multi-status
const multiCheckbox = document.querySelector('[multi-checkbox]')
if (multiCheckbox) {
    const inputCheckAll = document.querySelector("input[name='checkall']")
    const inputId = document.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener('click', () => {
        if (inputCheckAll.checked) {
            inputId.forEach(item => {
                item.checked = true
            })
        }
        else {
            inputId.forEach(item => {
                item.checked = false
            })
        }
    })

    inputId.forEach(input => {
        input.addEventListener('click', () => {
            const countChecked = multiCheckbox.querySelectorAll('input[name="id"]:checked').length
            
            if (countChecked === inputId.length) {
                inputCheckAll.checked = true
            }
            else {
                inputCheckAll.checked = false
            }
        })
    })
}

// End multi-status

// Form-change-multi
const formChangeMulti = document.querySelector('[form-change-multi]')
if (formChangeMulti) {
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault()

        const changedType = e.target.elements.type.value

        if (changedType === 'delete-all') {
            const confirmDelete = confirm('Bạn có chắc chắn muốn xoá các sản phẩm này?')
            
            if (!confirmDelete) {
                return
            }
        }

        const checkedInput = multiCheckbox.querySelectorAll('input[name="id"]:checked') 
        
        if (checkedInput.length > 0) {
            ids = []
            checkedInput.forEach(input => {
                if (changedType === 'change-position') {
                    const position = input.closest('tr').querySelector('input[name="position"]').value
                    ids.push(`${input.value}-${position}`)
                }
                else {
                    ids.push(input.value)
                }
            })

            const inputIds = formChangeMulti.querySelector('input[name="ids"]')
            inputIds.value = ids.join(', ')
            formChangeMulti.submit()
        }
        else {
            alert('Vui lòng chọn ít nhất một sản phẩm!')
        }
    })
}
// End form-change-multi

// Delete-button
const deleteButton = document.querySelectorAll('button[delete-button]')
if (deleteButton.length) {
    const formDeleteItem = document.querySelector('#form-delete-item')
    const path = formDeleteItem.getAttribute('data-path')

    deleteButton.forEach(button => {
        button.addEventListener('click', () => {

            const confirmDelete = confirm('Bạn có chắc chắn muốn xoá sản phẩm này?')
            if (confirmDelete) {
                id = button.getAttribute('data-id')
                formDeleteItem.action = `${path}/${id}?_method=DELETE`
                formDeleteItem.submit()
            }
        })
    })
}
// End delete-butotn

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

// Preview image upload
const uploadImage = document.querySelector('[upload-image]')
if (uploadImage) {
    const inputImage = uploadImage.querySelector('[input-image]')
    const previewImage = uploadImage.querySelector('[preview-image]')
    inputImage.addEventListener('change', (e) => {
        previewImage.src = URL.createObjectURL(e.target.files[0]);
        previewImage.style.display = 'block'
        previewImage.onload = function() {
            URL.revokeObjectURL(previewImage.src)
        }
    })

    if (!previewImage.getAttribute("src")) {
        previewImage.style.display = 'none'
    }
}
// End image upload