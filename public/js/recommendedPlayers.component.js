angular.module('Playing').component('recommendedPlayers', {
    bindings: {
        data: '<numPlayers',
        highlightCount: '<'
    },
    template: "<svg class=\"numPlayers\"></svg>",
    controller: function ($element) {
        var _this = this;
        this.$onChanges = function (changesObj) {
            if (changesObj.highlightCount) {
                var circleWidth = 40, circleHeight = 20;
                var radius = d3.scale.linear()
                    .domain([0, 100])
                    .range([0, 10]);
                var color = d3.scale.linear()
                    .domain([0, 100])
                    .range(['white', 'green']);
                var chart = d3.select($element.find('svg')[0])
                    .attr('width', circleWidth * _this.data.length)
                    .attr('height', 35);
                var bar = chart.selectAll("g")
                    .data(_this.data)
                    .enter().append('g')
                    .attr('transform', function (d, i) {
                    return "translate(" + ((i * circleWidth) + (circleHeight / 2)) + ", " + circleHeight / 2 + ")";
                });
                bar.append('text')
                    .attr('y', 20)
                    .attr('text-anchor', 'middle')
                    .text(function (d) {
                    return d.players;
                });
                bar.append('circle')
                    .attr('r', function (d) { return radius(Math.max(d.best, d.recommended)); })
                    .attr('fill', function (d) { return color(d.best); });
            }
        };
    }
});
