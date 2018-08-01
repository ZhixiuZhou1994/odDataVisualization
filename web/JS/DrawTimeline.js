var areaChartSvg;

function drawTimeline(dataObj){
	var data=dataObj.timeline;
	console.log(data);
	
//	d3.select("#container").style("height", "50%");
//	d3.select(".areaChartBox ").style("width", "Number(clientWidth)")
//	                           .style("height","300");
	            
	var margin = {top: 10, right:40, bottom: 100, left:40},
    margin2 = {top: 230, right: 40, bottom: 20, left: 40},
    width = 1080 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
    height2 = 300 - margin2.top - margin2.bottom;

var parseDate = d3.time.format("%H:%M:%S").parse;

var color = "#27ae60";

var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brushtime = d3.svg.brush()
    .x(x2)
    .on("brush", brushedtime)
    .on("brushend", brushendtime);

var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.count); });

var line = d3.svg.line()
  .interpolate("monotone")
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.count); });

var area2 = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x2(d.date); })
    .y0(height2)
    .y1(function(d) { return y2(d.count); });

var line2 = d3.svg.line()
  .interpolate("monotone")
  .x(function(d) { return x2(d.date); })
  .y(function(d) { return y2(d.count); });

	areaChartSvg= d3.select("#areaChartBox").append("svg")
	//.attr("class","areaChartSvg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

areaChartSvg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = areaChartSvg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = areaChartSvg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");




data.forEach(function(d) {
  d.date = parseDate(d.date);
  d.count = +d.count;
});

x.domain(d3.extent(data.map(function(d) { return d.date; })));
y.domain([0, d3.max(data.map(function(d) { return d.count; }))]);
x2.domain(x.domain());
y2.domain(y.domain());

focus.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("fill", d3.rgb(color).brighter(2))
    .attr("d", area);

focus.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("stroke", color)
    .attr("d", line);

focus.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

focus.append("g")
    .attr("class", "y axis")
    .call(yAxis);

context.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("fill", d3.rgb(color).brighter(2))
    .attr("d", area2);

context.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("stroke", color)
    .attr("d", line2);

context.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height2 + ")")
    .call(xAxis2);

context.append("g")
    .attr("class", "x brush")
    .call(brushtime)
  .selectAll("rect")
    .attr("y", -6)
    .attr("height", height2 + 7);

// Statistic lines and labels
var statisticData = calcMeanSdVar(data);
var meanData = [{date: data[0].date, count: statisticData.mean}, 
                {date: data[data.length - 1].date, count: statisticData.mean}];

var lineStatistic = d3.svg.line()            
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.count); });

focus.append('path')
  .datum(meanData)
  .attr("class", "meanline")
  .attr("d", lineStatistic );

focus.append("text")
  .attr("x", 10)
  .attr("y", height - margin.top)
  .attr("dy", ".35em")
  .attr("class", "meanline-label")
  .text("Mean: " + statisticData.mean.toFixed(2) );

var sdMinData = [{date: data[0].date, count: statisticData.mean - statisticData.deviation}, 
                 {date: data[data.length - 1].date, count: statisticData.mean - statisticData.deviation}];

focus.append('path')
  .datum(sdMinData)
  .attr("class", "sdline min")
  .attr("d", lineStatistic );

var sdMaxData = [{date: data[0].date, count: statisticData.mean + statisticData.deviation}, 
                 {date: data[data.length - 1].date, count: statisticData.mean + statisticData.deviation}];

focus.append('path')
  .datum(sdMaxData)
  .attr("class", "sdline max")
  .attr("d", lineStatistic );

focus.append("text")
  .attr("x", 110)
  .attr("y", height - margin.top)
  .attr("dy", ".35em")
  .attr("class", "sdline-label")
  .text("Standard Deviation: " + statisticData.deviation.toFixed(2) );

// More statistic labels
focus.append("text")
  .attr("x", 310)
  .attr("y", height - margin.top)
  .attr("dy", ".35em")
  .attr("class", "label variance")
  .text("Variance: " + statisticData.variance.toFixed(2) );

function brushedtime() {
  x.domain(brushtime.empty() ? x2.domain() : brushtime.extent());
  focus.select(".area").attr("d", area);
  focus.select(".line").attr("d", line);
  focus.select(".x.axis").call(xAxis);
}

function brushendtime() {
  var extent = brushtime.extent();

  // Retrieve brushed data
  var extentData = data.filter(function(d) { return extent[0] <= d.date && d.date <= extent[1] });

  statisticData = calcMeanSdVar(extentData);
  meanData = [{date: extentData[0].date, count: statisticData.mean}, 
              {date: extentData[extentData.length - 1].date, count: statisticData.mean}];
  focus.select(".meanline").data([meanData]).attr("d", lineStatistic);
  focus.select(".meanline-label").text("Mean: " + statisticData.mean.toFixed(2) );

  var sdMaxData = [{date: extentData[0].date, count: statisticData.mean + statisticData.deviation}, 
                   {date: extentData[extentData.length - 1].date, count: statisticData.mean + statisticData.deviation}];
  focus.select(".max").data([sdMaxData]).attr("d", lineStatistic);

  var sdMinData = [{date: extentData[0].date, count: statisticData.mean - statisticData.deviation}, 
                   {date: extentData[extentData.length - 1].date, count: statisticData.mean - statisticData.deviation}];
  focus.select(".min").data([sdMinData]).attr("d", lineStatistic);

  focus.select(".sdline-label").text("Standard Deviation: " + statisticData.deviation.toFixed(2) );

  focus.select(".variance").text("Variance: " + statisticData.variance.toFixed(2) );
}

// Mean, standard deviation, variance
function calcMeanSdVar(values) {
  var r = {mean: 0, variance: 0, deviation: 0}, t = values.length;
  for(var m, s = 0, l = t; l--; s += parseInt(values[l].count));
  for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(parseInt(values[l].count) - m, 2));
  return r.deviation = Math.sqrt(r.variance = s / t), r;
}
}

function SetTimeline(){
	var p=document.getElementById("areaChartBox").style.display;
	console.log(p);
	if(p=="block"){d3.select("#areaChartBox").style("display", "none");}
	else{d3.select("#areaChartBox").style("display", "block");}
//	d3.select("#areaChartBox").style("display", "block");
	
	}
