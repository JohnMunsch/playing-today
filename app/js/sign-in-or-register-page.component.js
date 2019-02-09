import { LitElement, html } from 'lit-element';

class SignInOrRegisterPage extends LitElement {
  createRenderRoot() {
    // This avoids us building our component with Shadow DOM so we can use Bootstrap
    // or another CSS framework (which Shadow DOM would interfere with).
    return this;
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
          <form class="register-form">
            <input type="text" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <button>
              Register
            </button>
            <p class="message">Already registered? <a>Sign In</a></p>
          </form>
          <form class="login-form">
            <input type="text" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <button>
              Sign In
            </button>
            <p class="message">
              Not registered?
              <a>Register an account</a>
            </p>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define('sign-in-or-register-page', SignInOrRegisterPage);
