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
function refuseRequestFriend(btn) {

  // if (refuseButtons.length > 0) {
    // refuseButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.box-user').classList.add('refuse');
        const userId = btn.getAttribute('btn-refuse-friend');
        socket.emit('CLIENT_REFUSE_FRIEND', userId);
      })
    // })
  // }

}

listRefuseFriendBtn.forEach(btn => {
  refuseRequestFriend(btn)
})

// END REFUSE REQUEST FRIEND

// ACCEPT REQUEST FRIEND

const listAcceptFriendBtn = document.querySelectorAll('[btn-accept-friend]');

function acceptRequestFriend(btn) {

  // if (acceptButtons.length > 0) {
    // acceptButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.box-user').classList.add('accepted');

        const userId = btn.getAttribute('btn-accept-friend');
        socket.emit('CLIENT_ACCEPT_FRIEND', userId);
      })
    // })
  // }

}

listAcceptFriendBtn.forEach(btn => {
  acceptRequestFriend(btn)
})


// END ACCEPT REQUEST FRIEND

// START SERVER RETURN LENGTH OF ACCEPT FRIENDS

socket.on('SERVER_RETURN_LENGTH_ACCEPT_FRIENDS', (data) => {
  const badgeUsersAccept = document.querySelector('[badge-users-accept]')
  const userId = badgeUsersAccept.getAttribute('badge-users-accept')
  if (userId == data.userId) {
    badgeUsersAccept.innerHTML = data.lengthAcceptFriends
  }


})

// END SERVER RETURN LENGTH OF ACCEPT FRIENDS

// START SERVER RETURN LENGTH OF ACCEPT FRIENDS

socket.on('SERVER_RETURN_INFO_ACCEPT_FRIENDS', (data) => {
  const badgeUsersAccept = document.querySelector('[data-users-accept]')
  // START REQUEST FRIEND PAGE
  if (badgeUsersAccept) {
    const userId = badgeUsersAccept.getAttribute('data-users-accept')
    if (userId == data.userId) {
      // display user ra giao diện
      const newBoxUser = document.createElement('div')
      newBoxUser.classList.add('col-6')
      newBoxUser.setAttribute('user-id', data.infoA._id)
  
      newBoxUser.innerHTML = `
      <div class="box-user">
          <div class="inner-avatar"><img src="/images/free-user-icon-3296-thumb.png" alt="${data.infoA.fullName}"></div>
          <div class="inner-info">
            <div class="inner-name"> ${data.infoA.fullName} </div>
            <div class="inner-buttons"><button class="btn btn-sm btn-primary me-1"
                btn-accept-friend=${data.infoA._id}>Chấp nhận</button><button class="btn btn-sm btn-secondary me-1"
                btn-refuse-friend=${data.infoA._id}>Từ chối</button><button class="btn btn-sm btn-secondary me-1"
                btn-deleted-friend="" disabled="">Đã từ chối</button><button class="btn btn-sm btn-secondary me-1"
                btn-accepted-friend="" disabled="">Đã chấp nhận</button></div>
          </div>
        </div>
      `
  
  
      badgeUsersAccept.appendChild(newBoxUser)
      // START REFUSE REQUEST FRIENDS
      const listRefuseFriendBtn = newBoxUser.querySelector('[btn-refuse-friend]');
      refuseRequestFriend(listRefuseFriendBtn)
      // END REFUSE REQUEST FRIENDS
  
      // START ACCEPT REQUEST FRIENDS
      const listAcceptFriendBtn = newBoxUser.querySelector('[btn-accept-friend]');
      acceptRequestFriend(listAcceptFriendBtn)
      // END ACCEPT REQUEST FRIENDS
  
    }
  }

  // END REQUEST FRIEND PAGE

  // START LIST USER
  const badgeUsersNotFriends = document.querySelector('[data-users-not-friend]')

  if (badgeUsersNotFriends) {
    const userId = badgeUsersNotFriends.getAttribute('data-users-not-friend')
    if (userId == data.userId) {
      const boxUserRemoved = badgeUsersNotFriends.querySelector(`[user-id='${data.infoA._id}'`)
      if (boxUserRemoved) {
        badgeUsersNotFriends.removeChild(boxUserRemoved)
      }
    }

  }

  // END LIST USER


})

// END SERVER RETURN LENGTH OF ACCEPT FRIENDS


// START SERVER RETURN USER ID CANCEL FRIENDS

socket.on('SERVER_RETURN_USER_ID_CANCEL_FRIENDS', (data) => {
  const dataUserAccept = document.querySelector('[data-users-accept]')
  if (dataUserAccept) {
    const userId = dataUserAccept.getAttribute('data-users-accept')
    if (userId == data.userId) {
      const boxUserRemoved = dataUserAccept.querySelector(`[user-id='${data.orthersId}'`)
      dataUserAccept.removeChild(boxUserRemoved)
    }
  }

})

// END SERVER RETURN USER ID CANCEL FRIENDS


// START SERVER RETURN USER ID ACCEPT FRIENDS

socket.on('SERVER_RETURN_USER_ID_ACCEPT_FRIENDS', (data) => {
  const badgeUsersNotFriends = document.querySelector('[data-users-not-friend]')
  if (badgeUsersNotFriends) {
    const userId = badgeUsersNotFriends.getAttribute('data-users-not-friend')
    if (userId == data.userId) {
      const boxUserRemoved = badgeUsersNotFriends.querySelector(`[user-id='${data.orthersId}'`)
      if (boxUserRemoved) {
        badgeUsersNotFriends.removeChild(boxUserRemoved)
      }
    }

  }
})

// END SERVER RETURN USER ID CANCEL FRIENDS

function setUserStatus (status, userId) {
  const dataUserStatus = document.querySelector('[data-users-friend]')

  if (dataUserStatus) {
    const boxUser = dataUserStatus.querySelector(`[user-id='${userId}']`)

    if (boxUser) {
      boxUser.querySelector('[status]').setAttribute('status', status)
    }
  }
}

// START SERVER RETURN USER STATUS ONLINE

socket.on('SERVER_RETURN_USER_STATUS_ONLINE', (data) => {
  setUserStatus('online', data)

})

// END SERVER RETURN USER STATUS ONLINE

// START SERVER RETURN USER STATUS OFFLINE

socket.on('SERVER_RETURN_USER_STATUS_OFFLINE', (data) => {
  setUserStatus('offline', data)

})

// END SERVER RETURN USER STATUS OFFLINE


