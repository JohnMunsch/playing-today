angular.module('Playing').component('recommendedPlayers', {
  bindings: {
    data: '<numPlayers',
    highlightCount: '<'
  },
  template: `<svg class="numPlayers"></svg>`,
  controller: function ($element) {
    this.$onChanges = (changesObj) => {
      if (changesObj.highlightCount) {
        var circleWidth = 40, circleHeight = 20;

        // Create linear scales for the radius of each circle and for a color range.
        var radius = d3.scale.linear()
            .domain([ 0, 100 ])
            .range([ 0, 10 ]);

        var color = d3.scale.linear()
            .domain([0, 100])
            .range([ 'white', 'green' ]);

        var chart = d3.select($element.find('svg')[0])
            .attr('width', circleWidth * this.data.length)
            .attr('height', 35);

        var bar = chart.selectAll("g")
            .data(this.data)
            .enter().append('g')
            .attr('transform', function (d, i) {
              return `translate(${ (i * circleWidth) + (circleHeight / 2) }, ${ circleHeight / 2 })`;
            });

        bar.append('text')
            .attr('y', 20)
            .attr('text-anchor', 'middle')
            .text(function (d) {
              return d.players;
            });

        bar.append('circle')
            .attr('r', d => { return radius(Math.max(d.best, d.recommended)); })
            .attr('fill', d => { return color(d.best); });
      }
    };
  }
});
