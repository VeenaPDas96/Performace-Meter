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

    .attr('fill', '#0c44a1')
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

text2.text('Progress Completed');

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
$.getJSON('data.json', function(data) {
       var myItems = data.info;
        $('.name').html(myItems[0].name);
        $('.ecode').html(myItems[0].ecode);
        $('.etype').html(myItems[0].Employee_Type);
        $('.mlevel').html(myItems[0].Managment_Level);
        $('.timetype').html(myItems[0].Time_Type);
        $('.location').html(myItems[0].Location);
        $('#inputVal').val(myItems[0].Progress);
});
$('.front-stars').css('width',$('.inputBx').val()*100+"%");
if($('.inputBx').val()*100 <=20) 
{
  $('.rating-text').html('Failed to Meet standard');
} else if($('.inputBx').val()*100 <=40) {
  $('.rating-text').html('Partially Met Standard');
} else if($('.inputBx').val()*100 <=60) {
  $('.rating-text').html('Met Standard Submit PV on time Get more Client Appreciation Average time in office - 6 hours ( Please maintain 9 hours in office)');
} else if($('.inputBx').val()*100 <=80) {
  $('.rating-text').html('Surpassed Expected standard');
} else if($('.inputBx').val()*100 <=100) {
  $('.rating-text').html('Substantially Surpassed standard');
}
$('#reload').on('click', function(){
  animate($('#inputVal').val());
});

