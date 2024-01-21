
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'





// UPLOAT IMAGE

    const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-image', {
    multiple: true,
    maxFileCount: 6,
  });


// END UPLOAD IMAGE





// CLIENT_SEND_MESS

const formSendData = document.querySelector('.chat .inner-form')

if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault()
    const content = e.target.elements.content.value
    const images = upload.cachedFileArray || []

    if (content || images) {
      socket.emit('CLIENT_SEND_MESSAGE', { 
        content,
        images
      })

      e.target.elements.content.value = ''
      upload.resetPreviewPanel(); // clear all selected images
    }
  })
}


// END CLIENT_SEND_MESS



// SERVER_SEND_MESS
socket.on('SERVER_RETURN_MESSAGE', (data) => {
  const body = document.querySelector('.chat .inner-body')
  const myid = document.querySelector('[my-id]').getAttribute('my-id')
  const boxTyping = document.querySelector('.chat .inner-list-typing')
  const div = document.createElement('div')

  let fullName = ""
  let content = ""
  let image = ""

  if (data.userId == myid) {
    div.classList.add('inner-outgoing');
  }
  else {
    div.classList.add('inner-incoming');
    fullName = `<div class='inner-name'>${data.fullName}</div>`
  }

  if (data.content) {
    content = `<div class='inner-content'>${data.content}</div>`
  }


  if (data.images.length > 0) {
    image += `<div class="inner-images"> `



    for (const img of data.images) {
      image += `<img src="${img}">`
    }
    image += `</div>`
  }

  div.innerHTML = `
  ${fullName}
  ${content}
  ${image}
  `

  body.insertBefore(div, boxTyping)
  body.scrollTop = body.scrollHeight

  const boxImage = div.querySelector('.inner-images')

  if (boxImage) { 
    const gallery = new Viewer(boxImage);
  }
})


// END SERVER_SEND_MESS

// SCROLL CHAT TO BOTTOM

const bodyChat = document.querySelector('.chat .inner-body')

if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight

}

// END SCROLL CHAT TO BOTTOM


// EMOJI

const button = document.querySelector('.button-icon')

if (button) {
  const tooltip = document.querySelector('.tooltip')
  Popper.createPopper(button, tooltip)

  button.onclick = () => {
    tooltip.classList.toggle('shown')
  }
}


// insert icon
const emojiPicker = document.querySelector('emoji-picker')
if (emojiPicker) {
  const input = document.querySelector(".chat .inner-form input[name='content']")

  emojiPicker.addEventListener('emoji-click', event => {
    typing()
    const icon = event.detail.unicode;

    const end = input.value.length
    input.setSelectionRange(end, end)
    input.focus()

    input.value = input.value + icon
  })
  // END EMOJI

}

// typing
const input = document.querySelector(".chat .inner-form input[name='content']")


input.addEventListener('input', () => {
  typing()
})
// TIMEOUT TYPING

var timeOut;

function typing () {
  socket.emit('CLIENT_SEND_TYPING', "show")
  
  clearTimeout(timeOut)
  
  timeOut = setTimeout(() => {
    socket.emit('CLIENT_SEND_TYPING', "hidden")
  }, 3000);
}

// END TIMEOUT TYPING

// socket return typing
const elementListTyping = document.querySelector('.chat .inner-list-typing')

if (elementListTyping) {
  socket.on('SERVER_RETURN_TYPING', (data) => {
    if (data.type == 'show') {

      const existedTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
  
      if (!existedTyping) {
        const boxTyping = document.createElement('div')
        boxTyping.classList.add('box-typing')
        boxTyping.setAttribute('user-id', data.userId)
    
        boxTyping.innerHTML = `
        <div class='inner-name'>${data.fullName}</div>
        <div class='inner-dots'>
          <span></span>
          <span></span> 
          <span></span> 
        </div>
      `
      elementListTyping.appendChild(boxTyping)
      bodyChat.scrollTop = bodyChat.scrollHeight
      }
    }
    else {
      const removeTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
      console.log(data.type);
      if (removeTyping) {
        elementListTyping.removeChild(removeTyping)
      }
    }

  })

}

// END socket return typing

// END typing


// SHOW FULL IMG

const chat = document.querySelector('.chat .inner-body')
if (chat) {
  const gallery = new Viewer(chat);

}

// END SHOW FULL IMG

