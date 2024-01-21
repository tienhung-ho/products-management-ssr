
const ChatModel = require('../../models/chat.model')
const UserModel = require('../../models/users.model')
const uploadToCloud = require('../../helpers/uploadToCloud')
const { use } = require('../../routes/client/users.route')


module.exports = async (res) => {

  try {

    const userId = res.locals.user.id
    const fullName = res.locals.user.fullName


    _io.once('connection', (socket) => {

      socket.on('CLIENT_ADD_FRIEND', async (data) => {
        
        // add id of A for B
        const existUserAinB = await UserModel.findOne({
          _id: data,
          acceptFriends: userId
        }) 

        if (!existUserAinB) {
          await UserModel.updateOne(
            { _id: data }, {
              $push: { acceptFriends: userId }
            }
          )
        }

        // add id of B for A

        const existUserBinA = await UserModel.findOne({
          _id: userId,
          acceptFriends: data
        }) 

        if (!existUserBinA) {
          await UserModel.updateOne(
            { _id: userId }, {
              $push: { requestFriends: data }
            }
          )
        } 
      })

      // CANCEL REQUEST

      socket.on('CLIENT_CANCEL_FRIEND', async (data) => {
        
        // remove id of A for B
        const existUserAinB = await UserModel.findOne({
          _id: data,
          acceptFriends: userId
        }) 

        if (existUserAinB) {
          await UserModel.updateOne(
            { _id: data }, {
              $pull: { acceptFriends: userId }
            }
          )
        }

        // remove id of B for A

        const existUserBinA = await UserModel.findOne({
          _id: userId,
          requestFriends: data
        }) 


        if (existUserBinA) {
          await UserModel.updateOne(
            { _id: userId }, {
              $pull: { requestFriends: data }
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
