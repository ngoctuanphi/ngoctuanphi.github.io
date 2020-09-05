const controller = {}

// callback, Promise, async/await
// callback hell >> Promise hell >> async/await

controller.logIn = async function(logInInfo) {
  let button = document.getElementById('log-in-btn')
  button.setAttribute('disabled', true)
  view.setText('log-in-error', '')
  
  try {
    let result = await firebase.auth().signInWithEmailAndPassword(logInInfo.email
      , logInInfo.password)
    if(!result.user.emailVerified) {
      throw new Error('User must verify email!')
    }
    // else if result.user.emailVerified
    // >> trigger onAuthStateChange
    // >> show chat screen
  } catch(err) {
    view.setText('log-in-error', err.message)
    button.removeAttribute('disabled')
  }
}

controller.register = async function(registerInfo) {
  // 3. submit info
  // 3.1 create user
  // 3.2 set displayName = registerInfo.firstname + " " + registerInfo.lastname
  // 3.3 send email verification
  let button = document.getElementById('register-btn')
  button.setAttribute('disabled', true)
  view.setText('register-error', '')
  view.setText('register-success', '')
  try {
    let result = await firebase.auth().createUserWithEmailAndPassword(registerInfo.email
      , registerInfo.password)
    await result.user.updateProfile({
      displayName: registerInfo.firstname + " " + registerInfo.lastname
    })
    await result.user.sendEmailVerification()
    
    view.setText('register-success', 'An email verification has been sended to your email!')
  } catch(error) {
    view.setText('register-error', error.message)
  }
  button.removeAttribute('disabled')
}

controller.initAuth = function() {
  // 1. show loading screen
  // 2. wait for state changed
  // 3. if user already logged in >> show screen chat
  // 4. if not >> show log in screen
  view.showComponents('loading')
  firebase.auth().onAuthStateChanged(authStateChangeHandler)

  function authStateChangeHandler(user) {
    if(user && user.emailVerified) {
      model.authenticated(user)
      view.showComponents('chat')
      model.loadConversations(user.email)
    } else {
      view.showComponents('logIn')
    }
  }
}

controller.addConversation = async function(addConversationInfo) {
  // 1. friendEmail != authUser.email
  // 2. friendEmail exists
  // 3. add new conversation to db

  let addConversationForm = document.getElementById('add-conversation-form')
  let addConversationBtn = document.getElementById('add-conversation-btn')

  addConversationBtn.setAttribute('disabled', true)
  view.setText('add-conversation-error', '')
  try {
    if(addConversationInfo.friendEmail == model.authUser.email) {
      throw new Error('Can not create conversation with your email!')
    }
    let signInMethods = await firebase.auth()
      .fetchSignInMethodsForEmail(addConversationInfo.friendEmail)
    if(!signInMethods.length) {
      throw new Error(`Email '${addConversationInfo.friendEmail}' do not exists!`)
    }
    let conversation = {
      title: addConversationInfo.title,
      createdAt: new Date().toISOString(),
      users: [
        addConversationInfo.friendEmail.toLowerCase().trim(),
        model.authUser.email
      ],
      messages: []
    }
    await firebase.firestore()
      .collection('conversations')
      .add(conversation)

    addConversationForm.friendEmail.value = ''
    addConversationForm.title.value = ''
  } catch(err) {
    view.setText('add-conversation-error', err.message)
  }

  addConversationBtn.removeAttribute('disabled')
}
