// SEND REQUEST

const listBtnAddFriend = document.querySelectorAll('button[btn-add-friend]')

if (listBtnAddFriend.length > 0) {
  
  listBtnAddFriend.forEach(btn => {

    btn.addEventListener('click', () => {

      btn.closest('.box-user').classList.add('add')

      const userId = btn.getAttribute('btn-add-friend')

      socket.emit('CLIENT_ADD_FRIEND', userId)
    
    })
  })

}

// END SEND REQUEST

// CANCEL REQUEST

const listCancelFriendBtn = document.querySelectorAll('[btn-cancel-friend]');

if (listCancelFriendBtn.length > 0) {
  listCancelFriendBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.box-user').classList.remove('add');

      const userId = btn.getAttribute('btn-cancel-friend');
      socket.emit('CLIENT_CANCEL_FRIEND', userId);
    })
  })
}

// END CANCEL REQUEST

// REFUSE REQUEST FRIEND

const listRefuseFriendBtn = document.querySelectorAll('[btn-refuse-friend]');

if (listRefuseFriendBtn.length > 0) {
  listRefuseFriendBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.box-user').classList.add('refuse');
      const userId = btn.getAttribute('btn-refuse-friend');
      socket.emit('CLIENT_REFUSE_FRIEND', userId);
    })
  })
}

// END REFUSE REQUEST FRIEND

// ACCEPT REQUEST FRIEND

const listAcceptFriendBtn = document.querySelectorAll('[btn-accept-friend]');

if (listAcceptFriendBtn.length > 0) {
  listAcceptFriendBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.box-user').classList.add('accepted');

      const userId = btn.getAttribute('btn-accept-friend');
      socket.emit('CLIENT_ACCEPT_FRIEND', userId);
    })
  })
}

// END ACCEPT REQUEST FRIEND

// START SERVER RETURN LENGTH OF ACCEPT FRIENDS

socket.on('SERVER_RETURN_LENGTH_ACCEPT_FRIENDS', (data) => {
  const badgeUsersAccept = document.querySelector('[badge-users-accept]')
  const userId = badgeUsersAccept.getAttribute('badge-users-accept')
  console.log(userId, data.lengthAcceptFriends);
  if (userId == data.userId) {
    badgeUsersAccept.innerHTML = data.lengthAcceptFriends
  }


})

// END SERVER RETURN LENGTH OF ACCEPT FRIENDS
