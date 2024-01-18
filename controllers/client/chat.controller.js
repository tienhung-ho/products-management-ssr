

// [GET] /chat
module.exports.index = async (req, res) => {
  
  const userId = res.locals.user.id


  _io.on('connection', (socket) => {

    socket.on('CLIENT_SEND_MESSAGE', (content) => {
      console.log(content);
      console.log(userId);
    })

    console.log('a user connected', socket.id);
  })

  res.render('client/pages/chat', {
    titlePage: 'Chat',
  })
}
