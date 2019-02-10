import { LitElement, html } from 'lit-element';

class SignInOrRegisterPage extends LitElement {
  static get properties() {
    return {
      model: { type: Object },
      email: { type: String },
      password: { type: String },
      login: { type: Boolean }
    };
  }

  constructor() {
    super();

    this.email = '';
    this.password = '';

    this.login = true;
  }

  createRenderRoot() {
    // This avoids us building our component with Shadow DOM so we can use Bootstrap
    // or another CSS framework (which Shadow DOM would interfere with).
    return this;
  }

  register(e) {
    e.preventDefault();

    // Perform a signup mutation using GraphQL.
    this.model.signup(this.email, this.password).then(results => {
      console.log('register', results.data.signup);
      localStorage.setItem('token', results.data.signup.token);
      this.model.init();
    });
  }

  signin(e) {
    e.preventDefault();

    // Perform a login mutation using GraphQL.
    this.model.login(this.email, this.password).then(results => {
      console.log('signin', results.data.login);
      localStorage.setItem('token', results.data.login.token);
      this.model.init();
    });
  }

  switch() {
    console.log('switch');
    this.login = !this.login;
  }

  emailChange(e) {
    this.email = e.target.value;
  }

  passwordChange(e) {
    this.password = e.target.value;
  }

  form(login) {
    if (login) {
      return html`
        <form class="login-form">
          <input
            type="text"
            placeholder="Email Address"
            @input="${this.emailChange}"
          />
          <input
            type="password"
            placeholder="Password"
            @input="${this.passwordChange}"
          />
          <button @click="${this.signin}">
            Sign In
          </button>
          <p class="message">
            Not registered?
            <a @click="${this.switch}">Register an account</a>
          </p>
        </form>
      `;
    } else {
      return html`
        <form class="register-form">
          <input
            type="text"
            placeholder="Email Address"
            @input="${this.emailChange}"
          />
          <input
            type="password"
            placeholder="Password"
            @input="${this.passwordChange}"
          />
          <button @click="${this.register}">
            Register
          </button>
          <p class="message">
            Already registered? <a @click="${this.switch}">Sign In</a>
          </p>
        </form>
      `;
    }
  }

  render() {
    return html`
      <div id="signIn">
        <div class="container">
          <div class="info">
            <h1>Sign In/Register</h1>
          </div>
        </div>
        <div class="form">
          <div class="thumbnail"><img class="logo" src="img/meeple.svg" /></div>
          ${this.form(this.login)}
        </div>
      </div>
    `;
  }
}

customElements.define('sign-in-or-register-page', SignInOrRegisterPage);
