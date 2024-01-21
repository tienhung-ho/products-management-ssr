
const ChatModel = require('../../models/chat.model')
const UserModel = require('../../models/users.model')
const uploadToCloud = require('../../helpers/uploadToCloud')
const { use } = require('../../routes/client/users.route')


module.exports = async (res) => {

  try {

    const userId = res.locals.user.id
    const fullName = res.locals.user.fullName


    _io.once('connection', (socket) => {

      socket.on('CLIENT_ADD_FRIEND', async (orthersId) => {
        
        // add id of A for B
        const existUserAinB = await UserModel.findOne({
          _id: orthersId,
          acceptFriends: userId
        }) 

        if (!existUserAinB) {
          await UserModel.updateOne(
            { _id: orthersId }, {
              $push: { acceptFriends: userId }
            }
          )
        }

        // add id of B for A

        const existUserBinA = await UserModel.findOne({
          _id: userId,
          acceptFriends: orthersId
        }) 

        if (!existUserBinA) {
          await UserModel.updateOne(
            { _id: userId }, {
              $push: { requestFriends: orthersId }
            }
          )
        } 
      })

      // CANCEL REQUEST

      socket.on('CLIENT_CANCEL_FRIEND', async (orthersId) => {
        
        // remove id of A for B
        const existUserAinB = await UserModel.findOne({
          _id: orthersId,
          acceptFriends: userId
        }) 

        if (existUserAinB) {
          await UserModel.updateOne(
            { _id: orthersId }, {
              $pull: { acceptFriends: userId }
            }
          )
        }

        // remove id of B for A

        const existUserBinA = await UserModel.findOne({
          _id: userId,
          requestFriends: orthersId
        }) 


        if (existUserBinA) {
          await UserModel.updateOne(
            { _id: userId }, {
              $pull: { requestFriends: orthersId }
            }
          )
        } 
      })


      // CANCEL REFUSE REQUEST

      socket.on('CLIENT_REFUSE_FRIEND', async (orthersId) => {
        
        // refuse id of A for B
        const existUserAinB = await UserModel.findOne({
          _id: userId,
          acceptFriends: orthersId
        }) 

        if (existUserAinB) {
          await UserModel.updateOne(
            { _id: userId }, {
              $pull: { acceptFriends: orthersId }
            }
          )
        }

        // refuse id of B for A

        const existUserBinA = await UserModel.findOne({
          _id: orthersId,
          requestFriends: userId
        }) 


        if (existUserBinA) {
          await UserModel.updateOne(
            { _id: orthersId }, {
              $pull: { requestFriends: userId }
            }
          )
        } 
      })

      // ACCEPT REQUEST FRIEND
      

      socket.on('CLIENT_ACCEPT_FRIEND', async (orthersId) => {

        
        // refuse id of A for B
        const existUserAinB = await UserModel.findOne({
          _id: userId,
          acceptFriends: orthersId
        }) 

        if (existUserAinB) {
          await UserModel.updateOne(
            { _id: userId }, {
              $push: { friendList: {
                room_chat_id: '',
                user_id: orthersId
              } 
            },$push: { friendList: {
                room_chat_id: '',
                user_id: orthersId
              } 
            },
              $pull: { acceptFriends: orthersId }
            }
          )
        }

        // refuse id of B for A

        const existUserBinA = await UserModel.findOne({
          _id: orthersId,
          requestFriends: userId
        }) 


        if (existUserBinA) {
          await UserModel.updateOne(
            { _id: orthersId }, {
              $push: { friendList: {
                room_chat_id: '',
                user_id: userId
              } 
            },
              $pull: { requestFriends: userId }
            }
          )
        } 
      })

    })
  }
  catch (err) {
    console.log(err);
  }
}
