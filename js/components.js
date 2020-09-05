const components = {}

components.logIn = `
  <section class="log-in-container">
    <form id="form-log-in" class="form-log-in">
      <div class="form-header">
        <h3>Mindx Chat</h3>
      </div>
      <div class="form-content">
        <div class="input-wrapper">
          <input name="email" type="email" placeholder="Email" >
          <div id="email-error" class="message-error"></div>
        </div>
        <div class="input-wrapper">
          <input name="password" type="password" placeholder="Password" >
          <div id="password-error" class="message-error"></div>
        </div>
      </div>
      <div id="log-in-error" class="message-error"></div>
      <div class="form-footer">
        <a id="log-in-form-link" href="#">Not yet have an account? Register</a>
        <button id="log-in-btn">Log in</button>
      </div>
    </form>
  </section>
`

components.register = `
  <section class="register-container">
    <form id="form-register" class="form-register">
      <div class="form-header">
        <h3>Mindx Chat</h3>
      </div>
      <div class="form-content">
        <div class="name-wrapper">
          <div class="input-wrapper">
            <input name="firstname" type="text" placeholder="First name" >
            <div id="firstname-error" class="message-error"></div>
          </div>
          <div class="input-wrapper">
            <input name="lastname" type="text" placeholder="Last name" >
            <div id="lastname-error" class="message-error"></div>
          </div>
        </div>
        <div class="input-wrapper">
          <input name="email" type="email" placeholder="Email" >
          <div id="email-error" class="message-error"></div>
        </div>
        <div class="input-wrapper">
          <input name="password" type="password" placeholder="Password" >
          <div id="password-error" class="message-error"></div>
        </div>
        <div class="input-wrapper">
          <input name="confirmPassword" type="password" placeholder="Confirm password" >
          <div id="confirm-password-error" class="message-error"></div>
        </div>
      </div>
      <div id="register-error" class="message-error"></div>
      <div id="register-success" class="message-success"></div>
      <div class="form-footer">
        <a id="register-form-link" href="#">Already have an account? Login</a>
        <button id="register-btn">Register</button>
      </div>
    </form>
  </section>
`

components.chat = `
<section class="chat-container">
  <div class="list-conversations">
    <div id="list-conversations">
    </div>
    <form id="add-conversation-form" class="add-conversation-form">
      <div class="input-wrapper">
        <input name="friendEmail" placeholder="Your friend email" >
      </div>
      <div class="input-wrapper">
        <input name="title" placeholder="Conversation title" >
      </div>
      <div id="add-conversation-error" class="message-error"></div>
      <button id="add-conversation-btn">Add</button>
    </form>
  </div>

  <div class="current-conversation">
    <div id="list-messages" class="list-messages">
    </div>
    <form id="chat-form" class="chat-form">
      <div class="input-wrapper">
        <input type="text" name="chatMessage" placeholder="Enter your message">
      </div>
      <button id="chat-submit-btn">Send</button>
    </form>
  </div>
</section>
`

components.loading = `
  <div class="loading-container">
    <img src="./imgs/loading.gif" >
  </div>
`

components.nav = `
  <nav class="main-nav">
    <div class="user-profile">
      <span id="auth-user-email"></span>
      <button id="sign-out-btn">Sign out</button>
    </div>
  </nav>
`