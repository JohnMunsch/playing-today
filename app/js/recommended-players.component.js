import { LitElement, svg } from 'lit-element';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

class RecommendedPlayers extends LitElement {
  static get properties() {
    return {
      players: { type: Array }
    };
  }

  updated(changedProps) {
    let circleWidth = 40,
      circleHeight = 20;

    // Create linear scales for the radius of each circle and for a color range.
    let radius = scaleLinear()
      .domain([0, 100])
      .range([0, 10]);

    let color = scaleLinear()
      .domain([0, 100])
      .range(['white', 'green']);

    let chart = select(this.getElementsByTagName('svg')[0])
      .attr('width', circleWidth * this.players.length)
      .attr('height', 35);

    let bar = chart
      .selectAll('g')
      .data(this.players)
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return `translate(${i * circleWidth +
          circleHeight / 2}, ${circleHeight / 2})`;
      });

    bar
      .append('text')
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return d.num;
      });

    bar
      .append('circle')
      .attr('r', d => {
        return radius(Math.max(d.best, d.recommended));
      })
      .attr('fill', d => {
        return color(d.best);
      });
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return svg`
      <svg class="numPlayers"></svg>
    `;
  }
}

customElements.define('recommended-players', RecommendedPlayers);
