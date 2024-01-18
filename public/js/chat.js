

// CLIENT_SEND_MESS

const formSendData = document.querySelector('.chat .inner-form')

if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault()
    const content = e.target.elements.content.value


    if (content) {
      socket.emit('CLIENT_SEND_MESSAGE', content)
      e.target.elements.content.value = ''
    }
  })
}


// END CLIENT_SEND_MESS



// SERVER_SEND_MESS
socket.on('SERVER_RETURN_MESSAGE', (data) => {
  const body = document.querySelector('.chat .inner-body')
  const myid = document.querySelector('[my-id]').getAttribute('my-id')
  
  const div = document.createElement('div')

  let fullName = ""

  if (data.userId == myid) {
    div.classList.add('inner-outgoing');
  }
  else {
    div.classList.add('inner-incoming');
    fullName = `<div class='inner-name'>${data.fullName}</div>`
  }

  div.innerHTML = `
  ${fullName}
  <div class='inner-content'>${data.content}</div>
  `

  body.appendChild(div)
  body.scrollTop = body.scrollHeight
})


// END SERVER_SEND_MESS

// SCROLL CHAT TO BOTTOM

const bodyChat = document.querySelector('.chat .inner-body')

if(bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight

}

// END SCROLL CHAT TO BOTTOM
