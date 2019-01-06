import { LitElement, html } from '@polymer/lit-element';

class RecommendedPlayers extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <svg class="numPlayers"></svg>
    `;
  }
}

customElements.define('recommended-players', RecommendedPlayers);
