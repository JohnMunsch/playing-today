import { LitElement, html } from 'lit-element';

class NavBar extends LitElement {
  static get properties() {
    return {
      user: { type: Object }
    };
  }

  signOut() {
    let signOutEvent = new CustomEvent('sign-out', {
      detail: { message: 'hello. a load-complete happened.' }
    });
    this.dispatchEvent(signOutEvent);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span> <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/"
              ><img class="logo" src="img/meeple.svg" />
              <div>Playing today?</div></a
            >
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <form
              class="navbar-form navbar-right"
              role="form"
              ng-if="this.user !== null"
            >
              <button
                type="submit"
                class="btn btn-success"
                @click="${this.signOut}"
              >
                Sign out
              </button>
            </form>
            <p class="navbar-text navbar-right">${this.user.email}</p>
          </div>
          <!--/.navbar-collapse -->
        </div>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
