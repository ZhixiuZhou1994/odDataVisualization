// JavaScript Document
var cont = window.document.getElementById('container');
	var clientWidth=cont.offsetWidth;
	var clientHeight=cont.offsetHeight;
//var clientWidth = document.body.clientWidth;
//var clientHeight = document.body.clientHeight;
//navigator.geolocation.getCurrentPosition(translatePoint);
//function translatePoint(position) {
//	var jsonData = new Object();
//	jsonData.currentLng = position.coords.longitude;
//	jsonData.currentLat = position.coords.latitude;
//	
////	Set temp lnglat
////	jsonData.currentLng = 120.09659;
////	jsonData.currentLat = 30.278658;
//
//
//	jsonData.userAgent = navigator.userAgent;
//	jsonData.time = new Date().toString();
//	$.ajax({
//		url: "CurrentLngLat",
//		type: "POST",
//		data: jsonData,
//		dataType: "json",
//		success: function(data) {
//			mapObj.setCenter(data);
//			marker = new AMap.Marker({
//				icon: "http://webapi.amap.com/images/marker_sprite.png",
//				position: data
//			});
//			marker.setMap(mapObj);
//		}
//	});
//}
d3.select("#keyword")
	.attr("value", "搜索")
	.style("color", "#cdcdcd")
	.on("click", function() {
		d3.select("#keyword")
			.attr("value", "")
			.style("color", "#000000");
	});
function fillzero(str) {
	var str = typeof str == "string" ? str : str.toString();
	if(str.length == 1) {
		str = "0" + str;
	}
	return str;
}
function clearbtn(type) {
	//d3.select("#container").style("height", "100%");
	if(type == "all") mapObj.setMapStyle("normal");
	mapObj.clearMap();
	clearData();
	cluster.clearMarkers( );
	
}