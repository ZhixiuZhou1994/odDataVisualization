
function GetOpoint() {
	mapZoom = mapObj.getZoom();
	areaWidth = clientWidth;
	var jsonData = new Object();
	var lnglatMin = mapObj.containTolnglat(new AMap.Pixel(0, clientHeight));
	jsonData.lngMin = lnglatMin.getLng();
	jsonData.latMin = lnglatMin.getLat();
	var lnglatMax = mapObj.containTolnglat(new AMap.Pixel(clientWidth, 0));
	jsonData.lngMax = lnglatMax.getLng();
	jsonData.latMax = lnglatMax.getLat();
	addDateTimeSection(jsonData);
    console.log(jsonData);
	GetOpointAjax(jsonData);

	
	
}
function GetOpointAjax(jsonData) {
	$.ajax({
		url: "GetOpoint",
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
		success: function(odata) {
			console.log(odata);
			d3.select("#loading")
			.style("visibility", "hidden");
		if(odata.length === 0) {
			alert("没有数据");
			return;
		}
		if(mapObj.getMapStyle() != "light") mapObj.setMapStyle("light");
		
		drawOData(odata);
		
		
	}
	});
}
function drawOData(odata) {
	var lnglatMin = mapObj.containTolnglat(new AMap.Pixel(0, clientHeight));
	var lnglatMax = mapObj.containTolnglat(new AMap.Pixel(clientWidth, 0));
	//alert(svg);
	if(svg==null){mapObj.plugin("AMap.CustomLayer", function() {
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
		cus.render = onORender;
	});}
	
	drawOSVG();
	var d=odata.length-1;
	drawTimeline(odata[d]);
	
	
	
	
	function onORender() {
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
		.style("r", 3/ Math.pow(1.6, newZoom - mapZoom));
		
		d3.select(svg).selectAll("#blue")
		.style("r", 3/ Math.pow(1.6, newZoom - mapZoom));
		d3.select(svg).selectAll(".pointDfromO")
		.style("r", 3/ Math.pow(1.6, newZoom - mapZoom));
	}
	function drawOSVG() {
		var i=0;
		
		 var pixdata = d3.range(odata.length-1).map(function(d) {
			    var j=0;
			    var Oponit=odata[i].O;
			    var Dpoint=odata[i].D;
			    var Wpoint=odata[i].W;
			    var Otime=odata[i].Otime;
			    var Dtime=odata[i].Dtime;
			    var Ot=new Date(Otime);
			    var Dt=new Date(Dtime);
			    var cha=Dt.getTime()-Ot.getTime();
			    var minutes= cha/ (60*1000);
			    
			   // console.log(Ox);
			    var Dy=mapObj.lnglatTocontainer(new AMap.LngLat(Dpoint[0], Dpoint[1])).getY();
			    var Ox=mapObj.lnglatTocontainer(new AMap.LngLat(Oponit[0], Oponit[1])).getX();
			    var Oy=mapObj.lnglatTocontainer(new AMap.LngLat(Oponit[0], Oponit[1])).getY();
			    var Dx=mapObj.lnglatTocontainer(new AMap.LngLat(Dpoint[0], Dpoint[1])).getX();
			    i++;
		        return [Ox, Oy,Dx,Dy,Wpoint, minutes.toFixed(2)];
		      });
		 
		 
		  console.log(pixdata);
		  
		  
		d3.select(svg)
		   .selectAll("circle #red")
		   .data(pixdata)
		   .enter()
		   .append("circle")
		   .attr("cx", function(d) {
			   return d[0];
		   })
		   .attr("cy", function(d) {
			   return d[1];
		
		   })
		   .attr("r",3)
			.attr("fill","#e6470f")
			.attr("id","red")
			.attr("class", function(d, i) {return "pointO id-"+i; });
		
			
	}

}
function clearData() {
	
//	d3.select(svg).selectAll(".lensO").remove();
//	d3.select(svg).selectAll(".textO").remove();
//	d3.select(svg).selectAll(".textD").remove();
//	d3.select(svg).selectAll(".lensD").remove();
//	d3.select(svg).selectAll(".pointO").remove();
//	d3.select(svg).selectAll(".pointDfromO").remove();
//	d3.select(svg).selectAll(".line").remove();
	areaChartSvg.remove();
	
	svg.remove();
	mapObj.setStatus({dragEnable: true});
	
	
}