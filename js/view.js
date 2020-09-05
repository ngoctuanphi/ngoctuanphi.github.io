const view = {}

view.showComponents = function(name) {
  switch(name) {
    case 'logIn': {
      let app = document.getElementById('app')
      app.innerHTML = components.logIn

      let link = document.getElementById('log-in-form-link')
      link.onclick = linkClickHandler

      let form = document.getElementById('form-log-in')
      form.onsubmit = formSubmitHandler

      function linkClickHandler() {
        view.showComponents('register')
      }

      function formSubmitHandler(event) {
        event.preventDefault()

        // 1. get info
        // 2. validate info
        // 3. submit info >> controller.logIn(info)
        let logInInfo = {
          email: form.email.value,
          password: form.password.value
        }

        if(logInInfo.email) {
          view.setText('email-error', '')
        } else {
          view.setText('email-error', 'Invalid email!')
        }

        if(logInInfo.password) {
          view.setText('password-error', '')
        } else {
          view.setText('password-error', 'Invalid password!')
        }

        if(logInInfo.email && logInInfo.password) {
          controller.logIn(logInInfo)
        }
      }
      break
    }
    case 'register': {
      let app = document.getElementById('app')
      app.innerHTML = components.register

      let link = document.getElementById('register-form-link')
      link.onclick = linkClickHandler

      let form = document.getElementById('form-register')
      form.onsubmit = formSubmitHandler

      function linkClickHandler() {
        view.showComponents('logIn')
      }

      function formSubmitHandler(event) {
        event.preventDefault()

        // 1. get info
        let registerInfo = {
          firstname: form.firstname.value,
          lastname: form.lastname.value,
          email: form.email.value,
          password: form.password.value,
          confirmPassword: form.confirmPassword.value
        }

        // 2. validate info
        if(registerInfo.firstname) { // registerInfo.firstname != "" && registerInfo.firstname != null ...
          view.setText("firstname-error", "")
        } else {
          view.setText("firstname-error", "Invalid firstname!")
        }

        if(registerInfo.lastname) {
          view.setText("lastname-error", "")
        } else {
          view.setText("lastname-error", "Invalid lastname!")
        }

        if(registerInfo.email) {
          view.setText("email-error", "")
        } else {
          view.setText("email-error", "Invalid email!")
        }

        if(validatePassword(registerInfo.password)) {
          view.setText("password-error", "")
        } else {
          view.setText("password-error", "Invalid password!")
        }

        if(registerInfo.confirmPassword
          && registerInfo.confirmPassword == registerInfo.password) {
          view.setText("confirm-password-error", "")
        } else {
          view.setText("confirm-password-error", "Invalid confirm password!")
        }

        // 3. submit info
        if(registerInfo.firstname
          && registerInfo.lastname
          && registerInfo.email
          && registerInfo.password
          && registerInfo.password == registerInfo.confirmPassword) {
          controller.register(registerInfo)
        }
      }

      break
    }
    case 'chat': {
      let app = document.getElementById('app')
      app.innerHTML = components.nav + components.chat

      let form = document.getElementById('chat-form')
      form.onsubmit = formSubmitHandler

      let signOutBtn = document.getElementById('sign-out-btn')
      signOutBtn.onclick = signOutBtnClickHandler

      let addConversationForm = document.getElementById('add-conversation-form')
      addConversationForm.onsubmit = addConversationFormSubmitHandler

      let authUserEmailSpan = document.getElementById('auth-user-email')
      authUserEmailSpan.innerText = model.authUser.email

      function formSubmitHandler(e) {
        e.preventDefault()

        let messageContent = form.chatMessage.value.trim()
        if(messageContent && model.activeConversation) {
          let message = {
            owner: model.authUser.email,
            content: messageContent,
            createdAt: new Date().toISOString()
          }
          firebase.firestore().collection('conversations')
            .doc(model.activeConversation.id)
            .update({
              messages: firebase.firestore.FieldValue.arrayUnion(message)
            })
          form.chatMessage.value = ''
        }
      }

      function signOutBtnClickHandler() {
        firebase.auth().signOut()
      }

      function addConversationFormSubmitHandler(e) {
        e.preventDefault()
        
        let addConversationInfo = {
          friendEmail: addConversationForm.friendEmail.value,
          title: addConversationForm.title.value
        }

        controller.addConversation(addConversationInfo)
      }
      break
    }
    case 'loading': {
      let app = document.getElementById('app')
      app.innerHTML = components.loading

      break
    }
  }
}

view.setText = function(id, text) {
  document.getElementById(id).innerText = text
}

view.showActiveConversation = function() {
  if(model.activeConversation) {
    let messages = model.activeConversation.messages
    let divListMessages = document.getElementById('list-messages')
    divListMessages.innerHTML = ''
    for(let message of messages) {
      let owner = message.owner
      let content = message.content
      let className = "chat-message"
      if(owner == model.authUser.email) {
        className = "chat-message your"
      }
      let html = `
        <div class="${className}">
          <span>${content}</span>
        </div>
      `
      divListMessages.innerHTML += html
    }
    divListMessages.scrollTop = divListMessages.scrollHeight
  }
}

view.showListConversations = function () {
  // add html
  // 1. get div list-conversations
  // 2. clear html in div
  // 3. add all conversations from model.listConversations to div
  let listConversationsDiv = document.getElementById('list-conversations')
  listConversationsDiv.innerHTML = ''
  for(let conversation of model.listConversations) {
    let className = "conversation"
    if(model.activeConversation
      && model.activeConversation.id == conversation.id) {
      className += " active"
    }
    let html = `
      <div id="${conversation.id}" class="${className}">
        <span>${conversation.title}</span>
      </div>
    `
    listConversationsDiv.innerHTML += html
  }

  // add events
  for(let conversation of model.listConversations) {
    let conversationDiv = document.getElementById(conversation.id)
    conversationDiv.onclick = function() {
      model.saveActiveConversation(conversation)
    }
  }
}

view.addActiveConversation = function(conversationId) {
  let div = document.getElementById(conversationId)
  if(div) {
    div.classList.add('active')
  }
}

view.removeActiveConversation = function(conversationId) {
  let div = document.getElementById(conversationId)
  if(div) {
    div.classList.remove('active')
  }
}

function validatePassword(password) {
  return typeof password == 'string'
    && password
    && password.length >= 6
}