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
