

// Quantity of products in cart are changed

const inputQuantity = document.querySelectorAll("input[name='quantity']")

if (inputQuantity.length > 0) {
  
  inputQuantity.forEach( input => {
    input.addEventListener('change', (e) => {
      const productId = input.getAttribute("product-id")
      const value = parseInt(input.value)

      if (value > 0) {
        window.location.href = `/cart/update/${productId}/${value}`
      }

    })

  } )
}

// END Quantity of products in cart are changed
