const model = {
  authUser: null,
  listConversations: null,
  activeConversation: null
}

model.loadConversations = function(email) {
  firebase.firestore().collection('conversations')
    .where('users', 'array-contains', email)
    .onSnapshot(snapshotHandler)

  function snapshotHandler(result) {
    if(model.listConversations == null) {
      // first loading
      // result.docs >>> conversations

      // let conversations = []
      // for(let doc of result.docs) {
      //   let conversation = doc.data()
      //   conversation.id = doc.id
      //   conversations.push(conversation)
      // }
      let conversations = result.docs.map(function(doc) {
        let conversation = doc.data()
        conversation.id = doc.id
        return conversation
      })

      model.saveConversations(conversations)
      if(conversations.length) {
        model.saveActiveConversation(conversations[0])
      }
    } else {
      // update database change

      // let conversations = []
      // for(let docChange of result.docChanges()) {
      //   let conversation = docChange.doc.data()
      //   conversation.id = docChange.doc.id
      //   conversations.push(conversation)
      // }
      let conversations = result.docChanges().map(function(docChange) {
        let conversation = docChange.doc.data()
        conversation.id = docChange.doc.id
        return conversation
      })

      model.updateConversations(conversations)
    }
  }
}

model.authenticated = function(authUser) {
  model.authUser = authUser
}

model.saveConversations = function(conversations) {
  model.listConversations = conversations
  view.showListConversations()
}

model.updateConversations = function(conversations) {
  for(let conversation of conversations) {
    let foundIndex = model.listConversations.findIndex(function(element) {
      return element.id == conversation.id
    })
    if(foundIndex >= 0) {
      model.listConversations[foundIndex] = conversation
      if(model.activeConversation.id == conversation.id) {
        model.saveActiveConversation(conversation)
      }
    } else {
      model.listConversations.push(conversation)
    }
  }
  view.showListConversations()
}

model.saveActiveConversation = function(conversation) {
  if(model.activeConversation) {
    view.removeActiveConversation(model.activeConversation.id)
  }
  model.activeConversation = conversation
  view.showActiveConversation()
  view.addActiveConversation(conversation.id)
}
