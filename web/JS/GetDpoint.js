var mapZoom;
var areaWidth;
var svg;

function GetDpoint() {
	mapZoom = mapObj.getZoom();
	areaWidth = clientWidth;
	var jsonData = new Object();
	var lnglatMin = mapObj.containTolnglat(new AMap.Pixel(0, clientHeight));
	jsonData.lngMin = lnglatMin.getLng();
	jsonData.latMin = lnglatMin.getLat();
	var lnglatMax = mapObj.containTolnglat(new AMap.Pixel(clientWidth, 0));
	jsonData.lngMax = lnglatMax.getLng();
	jsonData.latMax = lnglatMax.getLat();
	
	GetDpointAjax(jsonData)
	
	
}
function GetDpointAjax(jsonData) {
	$.ajax({
		url: "GetDpoint",
		type: "POST",
		data: jsonData,
		dataType: "json",
		beforeSend: function() {
			d3.select("#loading")
				.style("visibility", "visible")
				.style("opacity", "0.5")
				.style("left", clientWidth / 2 - 200 + "px")
				.style("top", clientHeight / 2 - 150 + "px");
		
			
		},
		success: function(Ddata) {
			console.log(Ddata);
			d3.select("#loading")
			.style("visibility", "hidden");
		if(Ddata.length === 0) {
			alert("没有数据");
			return;
		}
		if(mapObj.getMapStyle() != "light") mapObj.setMapStyle("light");
		drawDData(Ddata);
		
	}
	});
}

function drawDData(Ddata) {	
	var lnglatMin = mapObj.containTolnglat(new AMap.Pixel(0, clientHeight));
	var lnglatMax = mapObj.containTolnglat(new AMap.Pixel(clientWidth, 0));
	//alert(svg);
	if(svg==null){
		mapObj.plugin("AMap.CustomLayer", function() {
			svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			d3.select(svg)
			.attr("viewBox", 0 + " " + 0 + " " + clientWidth + " " + clientHeight)
			.attr("id", "DataSvg")
			.attr("width", clientWidth)
			.attr("height", clientHeight)
			.style("position", "absolute");
			
			var cus = new AMap.CustomLayer(svg, {
				map: mapObj
			});
			cus.render = onDRender;
		});
	}
	drawDSVG();
		
		function onDRender() {
			var xyMin = mapObj.lnglatTocontainer(new AMap.LngLat(lnglatMin.getLng(), lnglatMax.getLat()));
			var xyMax = mapObj.lnglatTocontainer(new AMap.LngLat(lnglatMax.getLng(), lnglatMin.getLat()));
			d3.select(svg)
				.attr("width", xyMax.getX() - xyMin.getX())
				.attr("height", xyMax.getY() - xyMin.getY())
				.style("left", xyMin.getX() + "px")
				.style("top", xyMin.getY() + "px");
			var newZoom = mapObj.getZoom();
			//mapZoom = mapObj.getZoom();
			d3.select(svg).selectAll("#red")
			.style("r", 2 / Math.pow(1.6, newZoom - mapZoom));
			d3.select(svg).selectAll("#blue")
			.style("r", 2 / Math.pow(1.6, newZoom - mapZoom));
			d3.select(svg).selectAll("#DfromO")
			.style("r", 2 / Math.pow(1.6, newZoom - mapZoom));
			
		}

		function drawDSVG() {
			//alert("draw ddata");
			//console.log(Ddata);
			var i=0;
			 var pixdata = d3.range(Ddata.length-1).map(function(d) {
				    i++;
				    var x=mapObj.lnglatTocontainer(new AMap.LngLat(Number(Ddata[i-1][0]),Number(Ddata[i-1][1]))).getX();
				    var y=mapObj.lnglatTocontainer(new AMap.LngLat(Number(Ddata[i-1][0]),Number(Ddata[i-1][1]))).getY();
			        return [x, y];
			      });
			d3.select(svg)
			   .selectAll("circle #blue")
			   .data(pixdata)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
				   return d[0];
				  //console.log("d0="+d[0]);
				  // console.log(d);
				   //return mapObj.lnglatTocontainer(new AMap.LngLat(Number(d[0]),Number(d[1]))).getX();
			   })
			   .attr("cy", function(d) {
				   return d[1];
				   //console.log(d);
				   //return mapObj.lnglatTocontainer(new AMap.LngLat(Number(d[0]),Number(d[1]))).getY();
			   })
			   .attr("r",2)
				.attr("fill","blue")
				.attr("id", "blue")
				.attr("class", function(d, i) {return "pointD id-"+i; });;
		}
	
}

