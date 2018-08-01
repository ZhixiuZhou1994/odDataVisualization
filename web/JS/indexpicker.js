// JavaScript Document
new Kalendae(document.getElementById("datepicker0"), "pickerlabel0", {
	months: 1,
	mode: "single",
	selected: Kalendae.moment().subtract({M: 0})
});
new Kalendae(document.getElementById("datepicker1"), "pickerlabel1", {
	months: 1,
	mode: "single",
	selected: Kalendae.moment().subtract({M: 0})
});
d3.select("#hourstart")
	.selectAll("option")
	.data(d3.range(0, 24))
	.enter()
	.append("option")
	.attr("value", function(d) { return d; })
	.html(function(d) { return fillzero(d); });
d3.select("#minutestart")
	.selectAll("option")
	.data(d3.range(0, 60, 15))
	.enter()
	.append("option")
	.attr("value", function(d) { return d; })
	.html(function(d) { return fillzero(d); });
d3.select("#hourend")
	.selectAll("option")
	.data(d3.range(0, 24))
	.enter()
	.append("option")
	.attr("value", function(d) { return d; })
	.html(function(d) { return fillzero(d); });
d3.select("#minuteend")
	.selectAll("option")
	.data(d3.range(0, 60, 20))
	.enter()
	.append("option")
	.attr("value", function(d) { return d; })
	.html(function(d) { return fillzero(d); });
function getDateStart() {
	return d3.select("#pickerlabel0").text();
}
function getDateEnd() {
	return d3.select("#pickerlabel1").text();
}
function getHourStart() {
	return d3.select("#hourstart").node().value;
}
function getMinuteStart() {
	return d3.select("#minutestart").node().value;
}
function getHourEnd() {
	return d3.select("#hourend").node().value;
}
function getMinuteEnd() {
	return d3.select("#minuteend").node().value;
}
function addDateSection(jsonData) {
	jsonData.dateStart = getDateStart();
	jsonData.dateEnd = getDateEnd();
}
function addTimeSection(jsonData) {
	jsonData.hourStart = getHourStart();
	jsonData.minuteStart = getMinuteStart();
	jsonData.hourEnd = getHourEnd();
	jsonData.minuteEnd = getMinuteEnd();
}
function addDateTimeSection(jsonData) {
	addDateSection(jsonData);
	addTimeSection(jsonData);
	var timeStart=jsonData.hourStart+":"+jsonData.minuteStart+":"+"00";
	var timeEnd=jsonData.hourEnd+":"+jsonData.minuteEnd+":"+"60";
	jsonData.timeStart=timeStart;
	jsonData.timeEnd=timeEnd;
	
	
	
}