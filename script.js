var width = 370,
    height = 370,
    twoPi = 2 * Math.PI,
    progress = 0,
    total = 100,
    formatPercent = d3.format(".0%");

var arc = d3.svg.arc()
    .startAngle(0)
    .innerRadius(140)
    .outerRadius(170)
;

var svg = d3.select(".completion-chart").append("svg")
    .attr("width", width)
    .attr("height", height)

    .attr('fill', '#2E7AF9')
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var meter = svg.append("g")
    .attr("class", "progress-meter");

meter.append("path")
    .attr("class", "background")
    .attr("d", arc.endAngle(twoPi));

var foreground = meter.append("path")
    .attr("class", "foreground");

var text = meter.append("text")
    .attr("text-anchor", "middle");

var text2 = meter.append("text")
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .attr("class", "text2");

text2.text('progress completed');

var animate = function(percentage){
    var i = d3.interpolate(progress, percentage);

    d3.transition().duration(1200).tween("progress", function () {
        return function (t) {
            progress = i(t);
            foreground.attr("d", arc.endAngle(twoPi * progress));
            text.text(formatPercent(progress));
        };
    });
}; 

setTimeout(function () {
  animate($('#inputVal').val());
}, 500);

$('#reload').on('click', function(){
  animate($('#inputVal').val());
});